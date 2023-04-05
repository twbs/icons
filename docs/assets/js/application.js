/* global bootstrap:false */

import ClipboardJS from 'clipboard'

(function () {
  const btnTitle = 'Copy to clipboard'
  const btnHtml = [
  '<div class="bd-clipboard">',
    `<button type="button" class="btn-clipboard" title="${btnTitle}">`,
      '<i class="bi bi-clipboard" aria-hidden="true"></i>',
    '</button>',
  '</div>'].join('')

  document.querySelectorAll('div.highlight')
    .forEach(element => {
      element.insertAdjacentHTML('beforebegin', btnHtml)
    })

  window.addEventListener('load', () => {
    document.querySelectorAll('.btn-clipboard').forEach(btn => {
      bootstrap.Tooltip.getOrCreateInstance(btn, { btnTitle })
    })
  })

  const clipboard = new ClipboardJS('.btn-clipboard', {
    target: trigger => trigger.parentNode.nextElementSibling,
    text: trigger => trigger.parentNode.nextElementSibling.textContent.trimEnd()
  })

  clipboard.on('success', (event) => {
    const icon = event.trigger.querySelector('.bi')
    const tooltipBtn = bootstrap.Tooltip.getInstance(event.trigger)

    tooltipBtn.setContent({ '.tooltip-inner': 'Copied!' })
    event.trigger.addEventListener('hidden.bs.tooltip', () => {
      tooltipBtn.setContent({ '.tooltip-inner': btnTitle })
    }, { once: true })
    event.clearSelection()
    icon.classList.replace('bi-clipboard', 'bi-check2')

    setTimeout(() => {
      icon.classList.replace('bi-check2', 'bi-clipboard')
      tooltipBtn.hide()
    }, 2000)
  })

  clipboard.on('error', event => {
    const modifierKey = /mac/i.test(navigator.userAgent) ? '\u2318' : 'Ctrl-'
    const fallbackMsg = `Press ${modifierKey}C to copy`
    const tooltipBtn = bootstrap.Tooltip.getInstance(event.trigger)

    tooltipBtn.setContent({ '.tooltip-inner': fallbackMsg })
    event.trigger.addEventListener('hidden.bs.tooltip', () => {
      tooltipBtn.setContent({ '.tooltip-inner': btnTitle })
    }, { once: true })
  })

  const searchInput = document.getElementById('search')
  if (searchInput) {
    searchInput.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault()
      }
    })
  }

  // Disable empty links in docs
  document.querySelectorAll('[href="#"]')
    .forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault()
      })
    })
})()
