---
aliases:
  - /font/
---

## Install

Bootstrap Icons are published to npm, but they can also be manually downloaded if needed.

<div class="row my-4">
  <div class="col-md-4">
{{< md >}}
### Package manager
Install [Bootstrap Icons](https://www.npmjs.com/package/bootstrap-icons)—including SVGs, icon sprite, and icon fonts—with npm or Composer. Then, choose how you'd like to include the icons with the [usage instructions](#usage).

{{< highlight sh >}}
npm i bootstrap-icons
{{< /highlight >}}
{{< highlight sh >}}
composer require twbs/bootstrap-icons
{{< /highlight >}}
{{< /md >}}
  </div>
  <div class="col-md-4">
{{< md >}}
### Download
[Releases are published on GitHub](https://github.com/twbs/icons/releases/) and include icon SVGs, fonts, license, and readme. Our `package.json` is also included, though our npm scripts are primarily available for our development workflows.

<a class="btn btn-outline-primary" href="https://github.com/twbs/icons/releases/latest/">Download latest ZIP</a>
{{< /md >}}
  </div>
  <div class="col-md-4">
{{< md >}}
### CDN
Include the icon fonts stylesheet—in your website `<head>` or via `@import` in CSS—from jsDelivr and get started in seconds. [See icon font docs](#icon-font) for examples.

{{< highlight html >}}
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@{{< param version >}}/font/bootstrap-icons.min.css">
{{< /highlight >}}

{{< highlight css >}}
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@{{< param version >}}/font/bootstrap-icons.min.css");
{{< /highlight >}}
{{< /md >}}
  </div>
</div>

## Usage

Bootstrap Icons are SVGs, so you can include them into your HTML in a few ways depending on how your project is setup. We recommend using a `width: 1em` (and optionally `height: 1em`) for easy resizing via `font-size`.

<div class="row my-4">
  <div class="col-md-4">
{{< md >}}
### Embedded
Embed your icons within the HTML of your page (as opposed to an external image file). Here we've used a custom `width` and `height`.
{{< /md >}}
  </div>
  <div class="col-md-8">
    {{< example >}}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-heart-eyes" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M11.315 10.014a.5.5 0 0 1 .548.736A4.498 4.498 0 0 1 7.965 13a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .548-.736h.005l.017.005.067.015.252.055c.215.046.515.108.857.169.693.124 1.522.242 2.152.242.63 0 1.46-.118 2.152-.242a26.58 26.58 0 0 0 1.109-.224l.067-.015.017-.004.005-.002zM4.756 4.566c.763-1.424 4.02-.12.952 3.434-4.496-1.596-2.35-4.298-.952-3.434zm6.488 0c1.398-.864 3.544 1.838-.952 3.434-3.067-3.554.19-4.858.952-3.434z"/></svg>{{< /example >}}
  </div>
</div>

<div class="row my-4">
  <div class="col-md-4">
{{< md >}}
### Sprite
Use the SVG sprite to insert any icon through the `<use>` element. Use the icon's filename as the fragment identifier (e.g., `toggles` is `#toggles`). SVG sprites allow you to reference an external file similar to an `<img>` element, but with the power of `currentColor` for easy theming.

**Heads up!** There's an issue with Chrome where [`<use>` doesn't work across domains](https://bugs.chromium.org/p/chromium/issues/detail?id=470601).
{{< /md >}}
  </div>
  <div class="col-md-8">

<div class="bd-example" style="font-size: 32px;">
  <i class="bi bi-heart-fill"></i>
  <i class="bi bi-toggles"></i>
  <i class="bi bi-shop"></i>
</div>
{{< highlight html >}}
<svg class="bi" width="32" height="32" fill="currentColor">
  <use xlink:href="bootstrap-icons.svg#heart-fill"/>
</svg>
<svg class="bi" width="32" height="32" fill="currentColor">
  <use xlink:href="bootstrap-icons.svg#toggles"/>
</svg>
<svg class="bi" width="32" height="32" fill="currentColor">
  <use xlink:href="bootstrap-icons.svg#shop"/>
</svg>
{{< /highlight >}}
  </div>
</div>

<div class="row my-4">
  <div class="col-md-4">
{{< md >}}
### External image
Copy the Bootstrap Icons SVGs to your directory of choice and reference them like normal images with the `<img>` element.
{{< /md >}}
  </div>
  <div class="col-md-8">
    {{< example >}}<img src="/assets/icons/bootstrap.svg" alt="Bootstrap" width="32" height="32">{{< /example >}}
  </div>
</div>

<div class="row my-4">
  <div class="col-md-4">
{{< md >}}
### Icon font
Icon fonts with classes for every icon are also included for Bootstrap Icons. Include the icon web fonts in your page via CSS, then reference the class names as needed in your HTML (e.g., `<i class="bi bi-alarm"></i>`).

Use `font-size` and `color` to change the icon appearance.
{{< /md >}}
  </div>
  <div class="col-md-8">
    {{< example >}}<i class="bi bi-alarm"></i>{{< /example >}}
    {{< example >}}<i class="bi bi-alarm" style="font-size: 2rem; color: cornflowerblue;"></i>{{< /example >}}
  </div>
</div>

<div class="row">
  <div class="col-md-4">
{{< md >}}
### CSS
You can also use the SVG within your CSS (**be sure to escape any characters**, such as `#` to `%23` when specifying hex color values). When no dimensions are specified via `width` and `height` on the `<svg>`, the icon will fill the available space.

The `viewBox` attribute is required if you wish to resize icons with `background-size`. Note that the `xmlns` attribute is required.
{{< /md >}}
  </div>
  <div class="col-md-8">
{{< highlight css >}}
.bi::before {
  display: inline-block;
  content: "";
  vertical-align: -.125em;
  background-image: url("data:image/svg+xml,<svg viewBox='0 0 16 16' fill='%23333' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z' clip-rule='evenodd'/></svg>");
  background-repeat: no-repeat;
  background-size: 1rem 1rem;
}

{{< /highlight >}}
  </div>
</div>

<div class="row my-4">
  <div class="col-md-4">
{{< md >}}
## Styling
Color can be changed by setting a `.text-*` class or custom CSS:
{{< /md >}}
  </div>
  <div class="col-md-8">
    <div class="bd-example">
      <svg class="bi bi-exclamation-triangle text-success" width="32" height="32" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
      </svg>
    </div>
{{< highlight html >}}
<svg class="bi bi-exclamation-triangle text-success" width="32" height="32" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
  ...
</svg>
{{< /highlight >}}
  </div>
</div>

<div class="row my-4">
  <div class="col-md-4">
{{< md >}}
## Accessibility
For purely decorative icons, add `aria-hidden="true"`. Otherwise, provide an appropriate text alternative. Depending on which method you're using to add the icons, and where you're using them (e.g. as standalone images, or as the only content of a button or similar control), there are various possible approaches. Here are a few examples:
{{< /md >}}
  </div>
  <div class="col-md-8">
    <div class="bd-example">
      <img src="/assets/icons/bootstrap.svg" alt="Bootstrap" width="32" height="32">
    </div>
{{< highlight html >}}
<!-- alt="..." on <img> element -->
<img src="/assets/icons/bootstrap.svg" alt="Bootstrap" ...>
{{< /highlight >}}
    <div class="bd-example">
      <i class="bi-github" role="img" style="font-size: 2em" aria-label="GitHub"></i>
      <i class="bi-tools" role="img" style="font-size: 2em" aria-label="Tools"></i>
    </div>
{{< highlight html >}}
<svg class="bi" ... role="img" aria-label="Tools">
  <use xlink:href="bootstrap-icons.svg#tools"/>
</svg>
{{< /highlight >}}
    <div class="bd-example">
      <button type="button" class="btn btn-primary" aria-label="Mute">
        <svg class="bi bi-volume-mute-fill" width="32" height="32" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6.717 3.55A.5.5 0 017 4v8a.5.5 0 01-.812.39L3.825 10.5H1.5A.5.5 0 011 10V6a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06zm7.137 2.096a.5.5 0 010 .708L12.207 8l1.647 1.646a.5.5 0 01-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 01-.708-.708L10.793 8 9.146 6.354a.5.5 0 11.708-.708L11.5 7.293l1.646-1.647a.5.5 0 01.708 0z"></path></svg>
      </button>
    </div>
{{< highlight html >}}
<!-- aria-label="..." on the control -->
<button ... aria-label="Mute">
  <svg class="bi bi-volume-mute-fill" aria-hidden="true" ...>
  ...
  </svg>
</button>
{{< /highlight >}}
  </div>
</div>

<div class="row my-4">
  <div class="col-md-4">
{{< md >}}
## Working with SVGs
SVGs are awesome to work with, but they do have some known quirks to work around. Given the numerous ways in which SVGs can be used, we haven't included these attributes and workarounds in our code.
{{< /md >}}
  </div>
  <div class="col-md-8">
{{< md >}}
Known issues include:

- **SVGs receive focus by default in Internet Explorer and Edge Legacy.** When embedding your SVGs, add `focusable="false"` to the `<svg>` element. [Learn more on Stack Overflow.](https://stackoverflow.com/questions/18646111/disable-onfocus-event-for-svg-element)

- **When using SVGs with `<img>` elements, screen readers may not announce them as images, or skip the image completely.** Include an additional `role="img"` on the `<img>` element to avoid any issues. [See this article for details.](https://web.archive.org/web/20201112013541/https://simplyaccessible.com/article/7-solutions-svgs/#acc-heading-2)

- **External SVG sprites may not function correctly in Internet Explorer.** Use the [svg4everybody](https://github.com/jonathantneal/svg4everybody) polyfill as needed.

Found another issue with SVGs we should note? Please open [an issue]({{< param repo >}}/issues) to share details.
{{< /md >}}
  </div>
</div>
