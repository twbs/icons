# Bootstrap Icons Astro migration

This site is an additive migration alongside the production Hugo site. Hugo
remains the release and deployment fallback; the root package and published
icon files are unchanged.

## Dependencies

The Astro site installs `@twbs/bui@^0.1.1` from npm and Bootstrap 6 from the
`v6-dev` branch on GitHub:

```sh
cd /path/to/bootstrap-icons/astro
npm ci
```

For local iteration across repositories, use `npm link --no-save` or install a
packed tarball without updating the lockfile. Never commit generated links or
an absolute `file:` path.

## Commands

From the Icons repository root:

```sh
npm run docs-astro-serve -- --host 127.0.0.1 --port 4200
npm run docs-astro-check
npm run docs-astro-build
npm run docs-astro-test
```

The static production output is `_site-astro/`. `docs-astro-test` runs Astro
type checking, generates every catalog/detail/category/asset route, and
validates local links, fragment targets, redirects, sitemap/robots metadata,
byte-identical icon assets, and HTML. Category routes use
`/icons/category/<slug>/`; their labels, deterministic slugs, counts, and icon
sets all come from the icon front matter through `src/lib/icons.ts`. Builds
report elapsed time and enforce a 60-second budget; override it with
`ASTRO_BUILD_BUDGET_MS` when diagnosing slower machines.

### Icon taxonomy

Each icon must have exactly one category from the canonical list in
`src/lib/icons.ts` and at least one tag. Categories are broad browsing
destinations; tags describe narrower subjects, visual variants, synonyms, and
cross-cutting concepts such as `love`, `sort`, or `filter`. The Astro build
rejects missing or unknown categories, missing tags, duplicate tags, and
category labels that differ only in spelling or capitalization.

The main documentation lives in the repository's root `README.md`; `/docs/`
redirects there for compatibility. Detailed installation and SVG guidance
remains at `/usage/`, sprite guidance at `/sprite/`, and icon font guidance at
`/font/`.

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

CI builds and validates both Hugo and Astro, compares their deploy-critical
routes and assets, and checks the release archive. Release deployment publishes
`_site-astro/`.

Hugo remains the fallback until the Astro deployment has been verified in
production. Do not remove it as part of this migration.
