<p align="center">
  <a href="https://getbootstrap.com/">
    <img src="https://getbootstrap.com/docs/4.3/assets/brand/bootstrap-solid.svg" alt="Bootstrap logo" width="72" height="72">
  </a>
</p>

<h3 align="center">Bootstrap Icons</h3>

<p align="center">
  Official open source SVG icon library for Bootstrap.
  <br>
  <a href="https://icons.getbootstrap.com/"><strong>Explore Bootstrap Icons »</strong></a>
  <br>
  <br>
  <a href="https://getbootstrap.com/docs/4.3/">Bootstrap</a>
  ·
  <a href="https://themes.getbootstrap.com/">Themes</a>
  ·
  <a href="https://blog.getbootstrap.com/">Blog</a>
</p>

# 500+ icons

![Bootstrap Icons full set](https://user-images.githubusercontent.com/98681/77025215-bea36900-694d-11ea-9f2d-68485c4a2543.png)

[Also available in Figma.](https://www.figma.com/file/NKZWcfR2T3FU0I7fNLqFvI/Bootstrap-Icons-v1.0.0-alpha3)

# Install

Bootstrap Icons are packaged up and published to npm. We only include the processed SVGs in this package—it's up to you and your team to implement. [Read our docs](https://icons.getbootstrap.com/) at for usage instructions.

```shell
npm i bootstrap-icons --save
```

# Development

[![Build Status](https://github.com/twbs/icons/workflows/Tests/badge.svg)](https://github.com/twbs/icons/actions?workflow=Tests)

Clone the repo, install dependencies, and start the Hugo server locally.

```shell
git clone https://github.com/twbs/icons/
cd icons
npm i
npm start
```

Then open `http://localhost:4000` in your browser.

# Adding SVGs

Once a new SVG icon has been added to the `icons` directory, you'll need to optimize them. An npm script is used to:

1. Optimize our SVGs with SVGO.
2. Modify the SVGs source HTML, removing all attributes before setting new attributes and values in our preferred order.

Use `npm run icons` to run the script, then commit the results in a new branch for updating.

# Publishing

Docs are published via an npm script that builds the Hugo site, creates a temporary Git repo, and force pushes that to our `gh-pages` branch. This circumvents issues with GitHub Pages not working with Hugo.

```shell
npm run publish
```

# License

MIT

# Author

@mdo
