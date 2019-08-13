---
layout: default
---

## Usage

Bootstrap icons are SVGs, so you can include them into your HTML in a few ways depending on how your project is setup.

### Embedded

For example, you can use the SVG as HTML (remember to specify a `width` and `height`).

{{< example >}}
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="bi bi-chevron-right" viewBox="0 0 16 16"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 14l6-6-6-6"/></svg>
{{< /example >}}

### External image

Copy the Bootstrap icons SVGs to your directory of choice and reference them like normal images with the `<img>` element.

{{< highlight html >}}
<img src="assets/images/bi-bootstrap.svg" width="24" height="24" title="Bootstrap">
{{< /highlight >}}

### CSS

You can also use the SVG within your CSS (**be sure to escape any characters**, such as `#` to `%23` when specifying hex color values):

{{< highlight css >}}
.bi::before {
  display: inline-block;
  content: "";
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='%23333' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/></svg>");
  background-repeat: no-repeat;
  background-size: 1rem 1rem;
}
{{< /highlight >}}

### Customizing

Depending on the icon, you may add `.bi-light` (`1px`) or `.bi-bold` (`3px`) to make an icon's `stroke-width` lighter or bold. Most Bootstrap icons have a `2px` stroke.

{{< example >}}
<svg class="bi bi-resize bi-light" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" d="M11.5 8.5L15 5l-3.5 3.5zM12 4h4-4zm4 4V4v4zm-7.5 3.5L5 15l3.5-3.5zM8 16H4h4zm-4-4v4-4z"></path></svg>

<svg class="bi bi-resize" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" d="M11.5 8.5L15 5l-3.5 3.5zM12 4h4-4zm4 4V4v4zm-7.5 3.5L5 15l3.5-3.5zM8 16H4h4zm-4-4v4-4z"></path></svg>

<svg class="bi bi-resize bi-bold" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" d="M11.5 8.5L15 5l-3.5 3.5zM12 4h4-4zm4 4V4v4zm-7.5 3.5L5 15l3.5-3.5zM8 16H4h4zm-4-4v4-4z"></path></svg>
{{< /example >}}

Color can be changed by setting a `.text-*` class or custom CSS:

{{< example >}}
<div class="text-success">
  <svg class="bi bi-resize" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" d="M11.5 8.5L15 5l-3.5 3.5zM12 4h4-4zm4 4V4v4zm-7.5 3.5L5 15l3.5-3.5zM8 16H4h4zm-4-4v4-4z"></path></svg>
</div>
{{< /example >}}

## Styling

## Examples

<button class="btn btn-primary mb-4" type="button">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="bi bi-house-fill" viewBox="0 0 20 20">
    <g fill-rule="evenodd" fill="currentColor">
      <path fill-rule="nonzero" d="M8.5 12.995V16.5a.5.5 0 0 1-.5.5H4a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5V13c0-.25-.25-.5-.5-.5H9c-.25 0-.5.25-.5.495z"/>
      <path d="M15 4.5V8l-2-2V4.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
    </g>
  </svg>
  Back home
</button>

<div class="btn-group mb-4">
  <button class="btn btn-primary active" type="button">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="bi bi-house-fill" viewBox="0 0 20 20">
      <g fill-rule="evenodd" fill="currentColor">
        <path fill-rule="nonzero" d="M8.5 12.995V16.5a.5.5 0 0 1-.5.5H4a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5V13c0-.25-.25-.5-.5-.5H9c-.25 0-.5.25-.5.495z"/>
        <path d="M15 4.5V8l-2-2V4.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
      </g>
    </svg>
    <span class="sr-only">Back home</span>
  </button>
  <button class="btn btn-primary" type="button">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="bi bi-gear" viewBox="0 0 20 20">
      <g fill="none" fill-rule="evenodd" stroke="currentColor" transform="translate(3 3)">
        <path stroke-linejoin="round" d="M11.34 9.486l1.317 1.757-1.414 1.414-1.757-1.318a4.97 4.97 0 0 1-1.175.487L8 14H6l-.31-2.174a4.97 4.97 0 0 1-1.176-.487l-1.757 1.318-1.414-1.414 1.318-1.757a4.97 4.97 0 0 1-.487-1.175L0 8V6l2.174-.31a4.97 4.97 0 0 1 .487-1.176L1.343 2.757l1.414-1.414 1.757 1.318a4.97 4.97 0 0 1 1.175-.487L6 0h2l.31 2.174c.416.112.81.277 1.176.487l1.757-1.318 1.414 1.414-1.318 1.757c.21.365.375.76.487 1.175L14 6v2l-2.174.31a4.97 4.97 0 0 1-.487 1.176h0z"/>
        <circle cx="7" cy="7" r="2"/>
      </g>
    </svg>
    <span class="sr-only">Settings</span>
  </button>
  <button class="btn btn-primary" type="button">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="bi bi-star-outline" viewBox="0 0 20 20">
      <path d="M5.612 17.443c-.386.198-.824-.149-.746-.592l.83-4.73-3.522-3.356c-.33-.314-.16-.888.282-.95l4.898-.696 2.184-4.327c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L10 15.187l-4.389 2.256zm.473-1.466l3.686-1.894a.503.503 0 0 1 .461 0l3.686 1.894-.694-3.957a.565.565 0 0 1 .163-.505l2.906-2.77-4.052-.576a.525.525 0 0 1-.393-.288l-1.846-3.658-1.847 3.658a.525.525 0 0 1-.393.288l-4.052.575 2.906 2.77a.565.565 0 0 1 .163.506l-.694 3.957z"/>
    </svg>
    <span class="sr-only">Starred</span>
  </button>
</div>

<div class="list-group mb-4 mx-auto">
  <div class="list-group-item d-flex align-items-center">
    <div class="mb-0">Item with switch</div>
    <div class="form-check form-switch ml-auto" style="font-size: 1.25rem;">
      <input class="form-check-input ml-0" type="checkbox" id="playgroundSwitch1" checked>
      <label class="sr-only" for="playgroundSwitch1">Switch label</label>
    </div>
  </div>
  <div class="list-group-item d-flex align-items-center">
    <div class="mb-0">Another with switch</div>
    <div class="form-check form-switch ml-auto" style="font-size: 1.25rem;">
      <input class="form-check-input ml-0" type="checkbox" id="playgroundSwitch2">
      <label class="sr-only" for="playgroundSwitch2">Another switch label</label>
    </div>
  </div>
  <div class="list-group-item d-flex align-items-center">
    <div class="mb-0">Choose an option</div>
    <div class="d-flex align-items-center ml-auto">
      <span class="text-muted">Selected</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="bi bi-chevron-right" viewBox="0 0 20 20">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l6-6-6-6"/>
      </svg>
    </div>
  </div>
</div>

<div class="list-group mb-4 mx-auto">
  <div class="list-group-item d-flex align-items-center">
    <div class="mb-0">Item with switch</div>
    <div class="form-check form-switch ml-auto" style="font-size: 1.25rem;">
      <input class="form-check-input ml-0" type="checkbox" id="playgroundSwitch3" checked>
      <label class="sr-only" for="playgroundSwitch3">Switch label</label>
    </div>
  </div>
  <div class="list-group-item d-flex align-items-center">
    <div class="mb-0">Another with switch</div>
    <div class="form-check form-switch ml-auto" style="font-size: 1.25rem;">
      <input class="form-check-input ml-0" type="checkbox" id="playgroundSwitch4">
      <label class="sr-only" for="playgroundSwitch4">Another switch label</label>
    </div>
  </div>
  <div class="list-group-item d-flex align-items-center">
    <div class="mb-0">Choose an option</div>
    <div class="d-flex align-items-center ml-auto">
      <span class="text-muted">Selected</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="bi bi-chevron-right" viewBox="0 0 20 20">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l6-6-6-6"/>
      </svg>
    </div>
  </div>
</div>
