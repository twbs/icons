import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(fileURLToPath(new URL('../', import.meta.url)))
const packageJson = JSON.parse(
  fs.readFileSync(path.join(root, 'package.json'), 'utf8')
)

const listFiles = (directory, prefix = '') => {
  const files = []
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.DS_Store') continue
    const relative = path.posix.join(prefix, entry.name)
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...listFiles(fullPath, relative))
    else files.push(relative)
  }
  return files
}

const expectedPackageFiles = [
  'LICENSE',
  'README.md',
  'package.json',
  'bootstrap-icons.svg',
  ...listFiles(path.join(root, 'font'), 'font'),
  ...listFiles(path.join(root, 'icons'), 'icons')
].sort()

const pack = spawnSync('npm', ['pack', '--dry-run', '--json'], {
  cwd: root,
  encoding: 'utf8'
})
if (pack.status !== 0) {
  throw new Error(pack.stderr || 'npm pack --dry-run failed.')
}
const packResult = JSON.parse(pack.stdout)
const packageResult = Array.isArray(packResult)
  ? packResult[0]
  : packResult[packageJson.name]
const packedFiles = packageResult.files
  .map(({ path: file }) => file)
  .sort()
if (
  packedFiles.length !== expectedPackageFiles.length ||
  expectedPackageFiles.some((file, index) => packedFiles[index] !== file)
) {
  throw new Error('The npm package file contract changed.')
}

const archiveName = `bootstrap-icons-${packageJson.version}.zip`
const archivePath = path.join(root, archiveName)
if (!fs.existsSync(archivePath)) {
  throw new Error(`Missing release archive: ${archiveName}`)
}

const temporaryDirectory = fs.mkdtempSync(
  path.join(os.tmpdir(), 'bootstrap-icons-release-')
)
try {
  const unzip = spawnSync('unzip', ['-qq', archivePath, '-d', temporaryDirectory])
  if (unzip.status !== 0) {
    throw new Error(unzip.stderr?.toString() || 'Unable to inspect release ZIP.')
  }

  const archiveRoot = path.join(
    temporaryDirectory,
    `bootstrap-icons-${packageJson.version}`
  )
  const expectedArchiveFiles = [
    'bootstrap-icons.svg',
    ...listFiles(path.join(root, 'font')),
    ...listFiles(path.join(root, 'icons'))
  ].sort()
  const archiveFiles = listFiles(archiveRoot).sort()

  if (
    archiveFiles.length !== expectedArchiveFiles.length ||
    expectedArchiveFiles.some((file, index) => archiveFiles[index] !== file)
  ) {
    throw new Error('The release ZIP file contract changed.')
  }

  for (const file of expectedArchiveFiles) {
    const fontSource = path.join(root, 'font', file)
    const source = fs.existsSync(fontSource)
      ? fontSource
      : file === 'bootstrap-icons.svg'
        ? path.join(root, file)
        : path.join(root, 'icons', file)
    if (
      !fs
        .readFileSync(source)
        .equals(fs.readFileSync(path.join(archiveRoot, file)))
    ) {
      throw new Error(`The release ZIP changed ${file}.`)
    }
  }
} finally {
  fs.rmSync(temporaryDirectory, { recursive: true, force: true })
}

console.log(
  `Validated ${packedFiles.length.toLocaleString()} npm files and ${(
    packedFiles.length - 3
  ).toLocaleString()} byte-identical release ZIP files.`
)
