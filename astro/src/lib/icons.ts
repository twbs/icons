import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd(), "..");
const iconsDir = path.join(root, "icons");
const contentDir = path.join(root, "docs/content/icons");
const codepointsPath = path.join(root, "font/bootstrap-icons.json");
const packagePath = path.join(root, "package.json");

export interface IconMeta {
  name: string;
  title: string;
  tags: string[];
  categories: string[];
  aliases: string[];
  codepoint?: number;
  svg: string;
  decorativeSvg: string;
}

export interface PackageMeta {
  version: string;
}

export interface IconCategory {
  name: string;
  slug: string;
  count: number;
  icons: IconMeta[];
}

export interface CatalogItem {
  n: string;
  s: string;
  c: string[];
}

export const CATALOG_PAGE_SIZE = 48;

let iconsCache: IconMeta[] | undefined;
let categoriesCache:
  { icons: IconMeta[]; categories: IconCategory[] } | undefined;

const titleize = (name: string) =>
  name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const readList = (source: string, key: string): string[] => {
  const inline = source.match(new RegExp(`^${key}:\\s*\\[(.*)\\]`, "m"))?.[1];
  if (inline)
    return inline
      .split(",")
      .map((item) => item.trim().replace(/^['"]|['"]$/g, ""))
      .filter(Boolean);
  const block = source.match(
    new RegExp(`^${key}:\\s*\\n((?:\\s+- .+\\n?)+)`, "m"),
  )?.[1];
  return block
    ? [...block.matchAll(/^\s+-\s+(.+)$/gm)].map((match) => match[1].trim())
    : [];
};

export function getIcons(): IconMeta[] {
  if (iconsCache) return iconsCache;

  const codepoints = fs.existsSync(codepointsPath)
    ? (JSON.parse(fs.readFileSync(codepointsPath, "utf8")) as Record<
        string,
        number
      >)
    : {};

  iconsCache = fs
    .readdirSync(iconsDir)
    .filter((file) => file.endsWith(".svg"))
    .map((file) => {
      const name = path.basename(file, ".svg");
      const markdownPath = path.join(contentDir, `${name}.md`);
      const markdown = fs.existsSync(markdownPath)
        ? fs.readFileSync(markdownPath, "utf8")
        : "";
      const title =
        markdown.match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1] ?? titleize(name);
      const svg = fs.readFileSync(path.join(iconsDir, file), "utf8").trim();
      return {
        name,
        title,
        tags: readList(markdown, "tags"),
        categories: readList(markdown, "categories"),
        aliases: readList(markdown, "aliases"),
        codepoint: codepoints[name],
        svg,
        decorativeSvg: svg.replace(
          "<svg ",
          '<svg aria-hidden="true" focusable="false" ',
        ),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return iconsCache;
}

export function getPackageMeta(): PackageMeta {
  return JSON.parse(fs.readFileSync(packagePath, "utf8")) as PackageMeta;
}

export const slugifyCategory = (category: string) =>
  category
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function getCategories(icons = getIcons()): IconCategory[] {
  if (categoriesCache?.icons === icons) return categoriesCache.categories;

  const categories = new Map<
    string,
    { labels: Map<string, number>; icons: IconMeta[] }
  >();

  for (const icon of icons) {
    const iconCategories = new Set<string>();

    for (const name of icon.categories) {
      const slug = slugifyCategory(name);
      if (!slug || iconCategories.has(slug)) continue;
      iconCategories.add(slug);

      const category = categories.get(slug) ?? {
        labels: new Map<string, number>(),
        icons: [],
      };
      category.labels.set(name, (category.labels.get(name) ?? 0) + 1);
      category.icons.push(icon);
      categories.set(slug, category);
    }
  }

  const sortedCategories = [...categories]
    .map(([slug, category]) => {
      const name = [...category.labels].sort(
        ([labelA, countA], [labelB, countB]) =>
          countB - countA || labelA.localeCompare(labelB),
      )[0][0];

      return {
        name,
        slug,
        count: category.icons.length,
        icons: category.icons,
      };
    })
    .sort(
      (categoryA, categoryB) =>
        categoryA.name.localeCompare(categoryB.name, "en", {
          sensitivity: "base",
        }) || categoryA.slug.localeCompare(categoryB.slug),
    );

  categoriesCache = { icons, categories: sortedCategories };
  return sortedCategories;
}

export function getCatalogIndex(icons = getIcons()): CatalogItem[] {
  return icons.map((icon) => ({
    n: icon.name,
    s: [
      icon.name,
      icon.title,
      ...icon.tags,
      ...icon.categories,
      ...icon.aliases,
    ]
      .join(" ")
      .toLowerCase(),
    c: [...new Set(icon.categories.map(slugifyCategory).filter(Boolean))],
  }));
}

export const getPageCount = (itemCount: number) =>
  Math.max(1, Math.ceil(itemCount / CATALOG_PAGE_SIZE));

export const getPageItems = <Item>(items: Item[], page: number) =>
  items.slice((page - 1) * CATALOG_PAGE_SIZE, page * CATALOG_PAGE_SIZE);
