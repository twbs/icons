/* eslint-env browser */

/* global ClipboardJS:false */

(function () {
  'use strict'

  var btnHtml = '<div class="bd-clipboard"><button type="button" class="btn-clipboard" title="Copy to clipboard"><i class="bi bi-clipboard" aria-hidden="true"></i></button></div>';

  [].slice.call(document.querySelectorAll('div.highlight'))
    .forEach(function (element) {
      element.insertAdjacentHTML('beforebegin', btnHtml)
    })

  var clipboard = new ClipboardJS('.btn-clipboard', {
    target: function (trigger) {
      return trigger.parentNode.nextElementSibling
    }
  })

  clipboard.on('success', function (event) {
    var icon = event.trigger.querySelector('.bi')
    var originalTitle = event.trigger.title

    event.clearSelection()
    icon.classList.replace('bi-clipboard', 'bi-check2')
    event.trigger.title = 'Copied!'

    setTimeout(function () {
      icon.classList.replace('bi-check2', 'bi-clipboard')
      event.trigger.title = originalTitle
    }, 2000)
  })

  clipboard.on('error', function () {
    var modifierKey = /mac/i.test(navigator.userAgent) ? '\u2318' : 'Ctrl-'
    var fallbackMsg = 'Press ' + modifierKey + 'C to copy'
    var errorElement = document.getElementById('copy-error-callout')

    if (!errorElement) {
      return
    }

    errorElement.classList.remove('d-none')
    errorElement.insertAdjacentHTML('afterbegin', fallbackMsg)
  })

  var searchInput = document.getElementById('search')
  if (searchInput) {
    searchInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault()
      }
    })
  }

  // Disable empty links in docs
  [].slice.call(document.querySelectorAll('[href="#"]'))
    .forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault()
      })
    })
})()
