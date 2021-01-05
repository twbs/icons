/* eslint-env browser */

/* global ClipboardJS: false */

(function () {
  'use strict'

  var btnHtml = '<div class="bd-clipboard"><button type="button" class="btn-clipboard" title="Copy to clipboard"><svg class="bi" width="1em" height="1em" fill="currentColor"><use xlink:href="/bootstrap-icons.svg#clipboard"/></svg></button></div>';

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
    var iconFirstChild = event.trigger.querySelector('.bi').firstChild
    var namespace = 'http://www.w3.org/1999/xlink'
    var originalXhref = iconFirstChild.getAttributeNS(namespace, 'href')
    var originalTitle = event.trigger.title

    event.clearSelection()
    iconFirstChild.setAttributeNS(namespace, 'href', originalXhref.replace('clipboard', 'check2'))
    event.trigger.title = "Copied!"

    setTimeout(function () {
      iconFirstChild.setAttributeNS(namespace, 'href', originalXhref)
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
  });

  // Disable empty links in docs
  [].slice.call(document.querySelectorAll('[href="#"]'))
    .forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault()
      })
    })
})()
