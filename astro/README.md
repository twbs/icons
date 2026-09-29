# Bootstrap Icons Astro migration

This site is an additive migration alongside the production Hugo site. Hugo
remains the release and deployment fallback; the root package and published
icon files are unchanged.

The shared UI repository has no remote yet. For local verification, install
packed tarballs without saving machine-specific paths:

```sh
cd /path/to/docs-ui
npm pack
cd /path/to/bootstrap-icons/astro
npm install --no-save --package-lock=false /path/to/twbs-docs-ui-0.1.0.tgz
```

The Bootstrap 6 package can be installed from a local pack in the same way.
After both repositories have remotes, add immutable dependencies such as
`github:twbs/docs-ui#<full-commit>` and
`github:twbs/bootstrap#<full-commit>` (or immutable release tags). Do not commit
local absolute paths.

Run `npm test` to type-check and build the catalog and every icon detail route.
