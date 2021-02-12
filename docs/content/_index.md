---
---

## Install

Bootstrap Icons are published to npm, but they can also be manually downloaded if needed.

<div class="row my-4">
  <div class="col-md-4">
{{< md >}}
### npm
Install [Bootstrap Icons](https://www.npmjs.com/package/bootstrap-icons)—including SVGs, icon sprite, and icon fonts—with npm. Then, choose who you'd like to include the icons with the [usage instructions](#usage).

{{< highlight sh >}}
npm i bootstrap-icons
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
Include the icon fonts stylesheet—in your website `<head>` or via `@import` in CSS—from our CDN and get started in seconds. [See icon font docs](#icon-font) for examples.

{{< highlight html >}}
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@{{< param version >}}/font/bootstrap-icons.css">
{{< /highlight >}}

{{< highlight css >}}
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@{{< param version >}}/font/bootstrap-icons.css");
{{< /highlight >}}
{{< /md >}}
  </div>
</div>

## Usage

Bootstrap Icons are SVGs, so you can include them into your HTML in a few ways depending on how your project is setup. Bootstrap Icons include a `width` and `height` of `1em` by default to allow for easy resizing via `font-size`.

<div class="row my-4">
  <div class="col-md-4">
{{< md >}}
### Embedded
Embed your icons within the HTML of your page (as opposed to an external image file). Here we've used a custom `width` and `height`.
{{< /md >}}
  </div>
  <div class="col-md-8">
    {{< example >}}<svg class="bi bi-chevron-right" width="32" height="32" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z"/></svg>{{< /example >}}
  </div>
</div>

<div class="row my-4">
  <div class="col-md-4">
{{< md >}}
### Sprite
Use the SVG sprite to insert any icon through the `<use>` element. Use the icon's filename as the fragment identifier (e.g., `toggles` is `#toggles`). SVG sprites allow you to reference an external file similar to an `<img>` element, but with the power of `currentColor` for easy theming.
{{< /md >}}
  </div>
  <div class="col-md-8">
{{< example >}}
<svg class="bi" width="32" height="32" fill="currentColor">
  <use xlink:href="bootstrap-icons.svg#heart-fill"/>
</svg>
<svg class="bi" width="32" height="32" fill="currentColor">
  <use xlink:href="bootstrap-icons.svg#toggles"/>
</svg>
<svg class="bi" width="32" height="32" fill="currentColor">
  <use xlink:href="bootstrap-icons.svg#shop"/>
</svg>
{{< /example >}}
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
    {{< example >}}<img src="/assets/img/bootstrap.svg" alt="Bootstrap" width="32" height="32">{{< /example >}}
  </div>
</div>

<div class="row my-4">
  <div class="col-md-4">
{{< md >}}
### Icon font
Icon fonts with classes for every icon are also included for Bootstrap Icons. Include the icon web fonts in your page via CSS, then reference the class names as needed in your HTML (e.g., `<i class="bi-alarm-clock"></i>`).

Use `font-size` and `color` to change the icon appearance.
{{< /md >}}
  </div>
  <div class="col-md-8">
    {{< example >}}<i class="bi-alarm"></i>{{< /example >}}
    {{< example >}}<i class="bi-alarm" style="font-size: 2rem; color: cornflowerblue;"></i>{{< /example >}}
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
      <svg class="bi bi-alert-triangle text-success" width="32" height="32" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M9.938 4.016a.146.146 0 00-.054.057L3.027 15.74a.176.176 0 00-.002.183c.016.03.037.05.054.06.015.01.034.017.066.017h13.713a.12.12 0 00.066-.017.163.163 0 00.055-.06.176.176 0 00-.003-.183L10.12 4.073a.146.146 0 00-.054-.057.13.13 0 00-.063-.016.13.13 0 00-.064.016zm1.043-.45a1.13 1.13 0 00-1.96 0L2.166 15.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L10.982 3.566z"/>
        <rect width="2" height="2" x="9.002" y="13" rx="1"/>
        <path d="M9.1 7.995a.905.905 0 111.8 0l-.35 3.507a.553.553 0 01-1.1 0L9.1 7.995z"/>
      </svg>
    </div>
{{< highlight html >}}
<svg class="bi bi-alert-triangle text-success" width="32" height="32" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  ...
</svg>
{{< /highlight >}}
  </div>
</div>

<div class="row my-4">
  <div class="col-md-4">
{{< md >}}
## Accessibility
If the icons are not purely decorative, make sure you provide an appropriate text alternative. Depending on which method you're using to add the icons, and where you're using them (e.g. as standalone images, or as the only content of a button or similar control), there are various possible approaches. Here are a few examples:
{{< /md >}}
  </div>
  <div class="col-md-8">
    <div class="bd-example">
      <img src="/assets/img/bootstrap.svg" alt="Bootstrap" width="32" height="32">
    </div>
{{< highlight html >}}
<!-- alt="..." on <img> element -->
<img src="/assets/img/bootstrap.svg" alt="Bootstrap" ...>
{{< /highlight >}}
    <div class="bd-example">
      <i class="bi-github" role="img" style="font-size: 2em" aria-label="GitHub"></i>
      <svg class="bi" width="32" height="32" fill="currentColor" role="img" aria-label="Tools">
        <use xlink:href="bootstrap-icons.svg#tools"/>
      </svg>
    </div>
{{< highlight html >}}
<!-- role="img" and aria-label="..." -->
<i class="bi-github" role="img" aria-label="GitHub"></i>
<svg class="bi" ... role="img" aria-label="Tools">
  <use xlink:href="bootstrap-icons.svg#tools"/>
</svg>
{{< /highlight >}}
    <div class="bd-example">
      <button type="button" class="btn btn-primary" aria-label="Mute">
        <svg class="bi bi-volume-mute-fill" width="32" height="32" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M6.717 3.55A.5.5 0 017 4v8a.5.5 0 01-.812.39L3.825 10.5H1.5A.5.5 0 011 10V6a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06zm7.137 2.096a.5.5 0 010 .708L12.207 8l1.647 1.646a.5.5 0 01-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 01-.708-.708L10.793 8 9.146 6.354a.5.5 0 11.708-.708L11.5 7.293l1.646-1.647a.5.5 0 01.708 0z"></path></svg>
      </button>
    </div>
{{< highlight html >}}
<!-- aria-label="..." on the control -->
<button ... aria-label="Mute">
  <svg class="bi bi-volume-mute-fill" ...>
  ...
</svg>
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

- **When using SVGs with `<img>` elements, screen readers may not announce them as images, or skip the image completely.** Include an additional `role="img"` on the `<img>` element to avoid any issues. [See this article for details.](https://simplyaccessible.com/article/7-solutions-svgs/#acc-heading-2)

- **External SVG sprites may not function correctly in Internet Explorer.** Use the [svg4everybody](https://github.com/jonathantneal/svg4everybody) polyfill as needed.

Found another issue with SVGs we should note? Please open [an issue]({{< param repo >}}/issues) to share details.
{{< /md >}}
  </div>
</div>
