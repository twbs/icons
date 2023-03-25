/* global ClipboardJS:false */

(function () {
  'use strict'

  const btnHtml = '<div class="bd-clipboard"><button type="button" class="btn-clipboard" title="Copy to clipboard"><i class="bi bi-clipboard" aria-hidden="true"></i></button></div>'

  Array.prototype.slice.call(document.querySelectorAll('div.highlight'))
    .forEach(element => {
      element.insertAdjacentHTML('beforebegin', btnHtml)
    })

  const clipboard = new ClipboardJS('.btn-clipboard', {
    target(trigger) {
      return trigger.parentNode.nextElementSibling
    }
  })

  clipboard.on('success', event => {
    const icon = event.trigger.querySelector('.bi')
    const originalTitle = event.trigger.title

    event.clearSelection()
    icon.classList.replace('bi-clipboard', 'bi-check2')
    event.trigger.title = 'Copied!'

    setTimeout(() => {
      icon.classList.replace('bi-check2', 'bi-clipboard')
      event.trigger.title = originalTitle
    }, 2000)
  })

  clipboard.on('error', () => {
    const modifierKey = /mac/i.test(navigator.userAgent) ? '\u2318' : 'Ctrl-'
    const fallbackMsg = `Press ${modifierKey}C to copy`
    const errorElement = document.getElementById('copy-error-callout')

    if (!errorElement) {
      return
    }

    errorElement.classList.remove('d-none')
    errorElement.insertAdjacentHTML('afterbegin', fallbackMsg)
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
  Array.prototype.slice.call(document.querySelectorAll('[href="#"]'))
    .forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault()
      })
    })
})()
