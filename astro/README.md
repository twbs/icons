# Bootstrap Icons documentation

The production Bootstrap Icons documentation site is built with Astro.

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
npm run docs-serve -- --host 127.0.0.1 --port 4200
npm run docs-check
npm run docs-build
npm run docs-test
```

The static production output is `_site/`. `docs-test` runs Astro
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

For the complete local audit, run:

```sh
npm test
npm run docs-test
npm run release-check
```

These commands lint and validate the project, build every documentation route,
check local links and HTML, and verify both the npm package file list and
release ZIP contents.

Set `PUBLIC_FATHOM_SITE_ID` at build time to enable analytics. No analytics
request is emitted when it is unset.

## Production deployment

CI builds and validates the Astro site and checks the release archive. Release
deployment publishes `_site/`.
