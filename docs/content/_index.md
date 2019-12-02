---
layout: default
---

## Install

Bootstrap Icons are published to npm, but they can also be manually downloaded if needed.

<div class="row my-4">
  <div class="col-md-6">
{{< md >}}
### npm
Install Bootstrap Icons via command line with npm.

{{< highlight shell >}}
npm install bootstrap-icons
{{< /highlight >}}
{{< /md >}}
  </div>
  <div class="col-md-6">
{{< md >}}
### Download
Our [releases](https://github.com/twbs/icons/releases/) are published to GitHub. All icon SVGs are included in the bundle, as well as license and readme files. Our `package.json` is also included, though our npm scripts are primarily available for our development workflows.

<a class="btn btn-outline-primary" href="https://github.com/twbs/icons/releases/latest/">Download latest ZIP</a>
{{< /md >}}
  </div>
</div>

## Usage

Bootstrap Icons are SVGs, so you can include them into your HTML in a few ways depending on how your project is setup. Bootstrap Icons include a `width` and `height` of `1em` by default to allow for easy resizing via `font-size`.

<div class="row my-4">
  <div class="col-md-4 col-xl-3">
{{< md >}}
### Embedded
Embed your icons within the HTML of your page (as opposed to an external image file). Here we've used a custom `width` and `height`.
{{< /md >}}
  </div>
  <div class="col-md-8 col-xl-9">
    {{< example >}}<svg class="bi bi-chevron-right" width="32" height="32" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z" clip-rule="evenodd"/></svg>{{< /example >}}
  </div>
</div>

<div class="row my-4">
  <div class="col-md-4 col-xl-3">
{{< md >}}
### External image
Copy the Bootstrap icons SVGs to your directory of choice and reference them like normal images with the `<img>` element.
{{< /md >}}
  </div>
  <div class="col-md-8 col-xl-9">
    {{< example >}}<img src="/assets/img/bootstrap.svg" alt="" width="32" height="32" title="Bootstrap">{{< /example >}}
  </div>
</div>

<div class="row">
  <div class="col-md-4 col-xl-3">
{{< md >}}
### CSS
You can also use the SVG within your CSS (**be sure to escape any characters**, such as `#` to `%23` when specifying hex color values). When no dimensions are specified via `width` and `height` on the `<svg>`, the icon will fill the available space.

The `viewBox` attribute is required if you wish to resize icons with `background-size`. Note that the `xmlns` attribute is required.
{{< /md >}}
  </div>
  <div class="col-md-8 col-xl-9">
{{< highlight css >}}
.bi::before {
  display: inline-block;
  content: "";
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='%23333' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/></svg>");
  background-repeat: no-repeat;
  background-size: 1rem 1rem;
}
{{< /highlight >}}
  </div>
</div>

<div class="row my-4">
  <div class="col-md-4 col-xl-3">
{{< md >}}
## Styling
Color can be changed by setting a `.text-*` class or custom CSS:
{{< /md >}}
  </div>
  <div class="col-md-8 col-xl-9">
    <div class="bd-example">
      <svg class="bi bi-alert-triangle text-success" width="32" height="32" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M9.938 4.016a.146.146 0 00-.054.057L3.027 15.74a.176.176 0 00-.002.183c.016.03.037.05.054.06.015.01.034.017.066.017h13.713a.12.12 0 00.066-.017.163.163 0 00.055-.06.176.176 0 00-.003-.183L10.12 4.073a.146.146 0 00-.054-.057.13.13 0 00-.063-.016.13.13 0 00-.064.016zm1.043-.45a1.13 1.13 0 00-1.96 0L2.166 15.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L10.982 3.566z" clip-rule="evenodd"/>
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

## Working with SVGs

SVGs are awesome to work with, but they do have some known quirks to work around. Given the numerous ways in which SVGs can be used, we haven't included these attributes and workarounds in our code.

- **Focus handling is broken in Internet Explorer and Edge.** When embedding your SVGs, add `focusable="false"` to the `<svg>` element. [Learn more on Stack Overflow.](https://stackoverflow.com/questions/18646111/disable-onfocus-event-for-svg-element)

- **Browsers inconsistently announce SVGs as `<img>` tags with voice assistance.** Include `role="img"` when possible to avoid any issues. [See this article for details.](https://simplyaccessible.com/article/7-solutions-svgs/#acc-heading-2)

- **Safari skips `aria-label` when used non-focusable SVGs.** As such, use `aria-hidden="true"` when embedding the `<svg>` file and use CSS to visually hidden an equivalent label. [More details here.](https://simplyaccessible.com/article/7-solutions-svgs/#acc-heading-6)

Found another issue with SVGs we should note? Please open an issue to share details.
