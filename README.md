<p align="center">
  <a href="https://v5.getbootstrap.com/">
    <img src="https://v5.getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo-shadow.png" alt="Bootstrap logo" width="200" height="165">
  </a>
</p>

<h3 align="center">Bootstrap Icons</h3>

<p align="center">
  Official open source SVG icon library for Bootstrap.
  <br>
  <a href="https://icons.getbootstrap.com/"><strong>Explore Bootstrap Icons »</strong></a>
  <br>
  <br>
  <a href="https://getbootstrap.com/docs/4.5/">Bootstrap</a>
  ·
  <a href="https://themes.getbootstrap.com/">Themes</a>
  ·
  <a href="https://blog.getbootstrap.com/">Blog</a>
</p>

## 1,000+ icons

![Bootstrap Icons full set](https://user-images.githubusercontent.com/98681/85891337-be640680-b7a3-11ea-84a0-0a103fce118c.png)

[Also available in Figma.](https://www.figma.com/file/hTJtQ2MrMTeNVmYrVBqNZZ/Bootstrap-Icons-v1.0.0-alpha5?node-id=0%3A1)

## Install

Bootstrap Icons are packaged up and published to npm. We only include the processed SVGs in this package—it's up to you and your team to implement. [Read our docs](https://icons.getbootstrap.com/) at for usage instructions.

```shell
npm i bootstrap-icons --save
```

## Usage

Depending on your setup, you can include Bootstrap Icons in a handful of ways.

- Copy-paste SVGs as embedded HTML
- Reference via `<img>` element
- Use the SVG sprite
- Include via CSS

[See the docs for more information.](https://icons.getbootstrap.com/#usage)

## Development

[![Build Status](https://github.com/twbs/icons/workflows/Tests/badge.svg)](https://github.com/twbs/icons/actions?workflow=Tests)

Clone the repo, install dependencies, and start the Hugo server locally.

```shell
git clone https://github.com/twbs/icons/
cd icons
npm i
npm start
```

Then open `http://localhost:4000` in your browser.

### npm scripts

Here are some key scripts you'll use during development. Be sure to look to our `package.json` for a complete list of scripts.

| Script | Description |
| --- | --- |
| `start` | Alias for running `docs-serve` |
| `docs-serve` | Starts a local Hugo server |
| `pages` | Generates permalink pages for each icon with template Markdown |
| `icons` | Processes and optimizes SVGs in `icons` directory |

## Adding SVGs

Once a new SVG icon has been added to the `icons` directory, you'll need to optimize them. An npm script is used to:

1. Optimize our SVGs with SVGO.
2. Modify the SVGs source HTML, removing all attributes before setting new attributes and values in our preferred order.

Use `npm run icons` to run the script, run `npm run pages` to build permalink pages, complete those pages, and, finally, commit the results in a new branch for updating.

## Publishing

Documentation is published automatically when a new Git tag is published. See our GitHub Actions and `package.json` for more information.

## License

MIT

## Author

[@mdo](https://github.com/mdo)
