# Bootstrap Icons Astro migration

This site is an additive migration alongside the production Hugo site. Hugo
remains the release and deployment fallback; the root package and published
icon files are unchanged.

## Local dependencies

The shared UI branch and Bootstrap 6 branch do not have immutable remote
revisions yet, so they are intentionally not recorded as dependencies. Install
the regular Astro dependencies, then link both local checkouts without saving
machine-specific paths:

```sh
cd /path/to/bootstrap-icons/astro
npm install
npm link --no-save /path/to/docs-ui /path/to/bootstrap
```

Packed tarballs installed with `npm install --no-save --package-lock=false`
work as well. Never commit the generated links or an absolute `file:` path.

After both repositories have remotes, replace the temporary links with
immutable dependencies such as
`github:twbs/docs-ui#<full-commit>` and
`github:twbs/bootstrap#<full-commit>` (or immutable release tags), then commit
the updated lockfile.

## Commands

From the Icons repository root:

```sh
npm run docs-astro-serve -- --host 127.0.0.1 --port 4200
npm run docs-astro-check
npm run docs-astro-build
npm run docs-astro-test
```

The static production output is `_site-astro/`. `docs-astro-test` runs Astro
type checking, generates every catalog/detail/asset route, and validates local
links, fragment targets, redirects, sitemap/robots metadata, byte-identical
icon assets, and HTML. Builds report elapsed time and enforce a 60-second
budget; override it with `ASTRO_BUILD_BUDGET_MS` when diagnosing slower
machines.

For the complete local Stage 5 audit, run:

```sh
npm run docs-astro-audit
```

That command builds and validates Hugo and Astro, verifies every Hugo HTML
route exists in the Astro output, compares deploy-critical assets byte for
byte, and checks both the npm package file list and release ZIP contents. It
requires the local dependency links above and a working Hugo installation.
The individual comparison commands are `docs-astro-compare` and
`docs-astro-release-check`.

Set `PUBLIC_FATHOM_SITE_ID` at build time to enable analytics. No analytics
request is emitted when it is unset.

## Production cutover

CI and deployment remain on Hugo until immutable shared dependencies exist.
At cutover:

1. Add and lock those immutable dependencies in this package.
2. Run `npm run docs-astro-test` beside the existing Hugo test in CI.
3. Run `npm run docs-astro-compare` and the existing external link check
   against `_site-astro/`.
4. Change the deploy job's `publish_dir` from `./_site/` to `./_site-astro/`.

Do not remove Hugo until the Astro deploy has been verified in production.
