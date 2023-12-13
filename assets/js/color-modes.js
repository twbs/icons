/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  const getStoredIcons = () => localStorage.getItem('width'),
    setStoredIcons = size => localStorage.setItem('width', size)
  const getStoredTheme = () => localStorage.getItem('theme'),
    setStoredTheme = theme => localStorage.setItem('theme', theme)

  const getPreferredIcons = () => {
    const StoredIcons = getStoredIcons()
    if (StoredIcons) {
      return Number(StoredIcons)
    }

    return 32
  }

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setIcons = size => {
    if (size < 32 || size > 96) {
      document.documentElement.setAttribute('data-icon-width', 48)
    } else {
      document.documentElement.setAttribute('data-icon-width', size)
    }
  }

  const setTheme = theme => {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  setIcons(getPreferredIcons())
  setTheme(getPreferredTheme())

  const showActiveIcons = (size, focus = false) => {
    const sizeSwitcher = document.querySelector('#size-icon')

    if (!sizeSwitcher) {
      return
    }

    const sizeSwitcherText = document.querySelector('#size-icon-text')
    const activeThemeIcon = document.querySelector('.size-icon-active use')
    const btnToActive = document.querySelector(`[data-icon-width-value="${size}"]`)
    const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

    document.querySelectorAll('[data-icon-width-value]').forEach(element => {
      element.classList.remove('active')
      element.setAttribute('aria-pressed', 'false')
    })

    btnToActive.classList.add('active')
    btnToActive.setAttribute('aria-pressed', 'true')
    activeThemeIcon.setAttribute('href', svgOfActiveBtn)
    const sizeSwitcherLabel = `${sizeSwitcherText.textContent} (${btnToActive.dataset.iconWidthValue})`
    sizeSwitcher.setAttribute('aria-label', sizeSwitcherLabel)

    document.querySelectorAll('.bg-body-secondary .bi').forEach(element => {
      element.setAttribute('width', `${size}`)
      element.setAttribute('height', `${size}`)
    })

    if (focus) {
      sizeSwitcher.focus()
    }
  }

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector('#bd-theme')

    if (!themeSwitcher) {
      return
    }

    const themeSwitcherText = document.querySelector('#bd-theme-text')
    const activeThemeIcon = document.querySelector('.theme-icon-active use')
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
    const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active')
      element.setAttribute('aria-pressed', 'false')
    })

    btnToActive.classList.add('active')
    btnToActive.setAttribute('aria-pressed', 'true')
    activeThemeIcon.setAttribute('href', svgOfActiveBtn)
    const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
    themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)

    if (focus) {
      themeSwitcher.focus()
    }
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    showActiveIcons(getPreferredIcons())
    showActiveTheme(getPreferredTheme())

    document.querySelectorAll('[data-icon-width-value]')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          const size = toggle.getAttribute('data-icon-width-value')
          localStorage.setItem('width', size)
          setStoredIcons(size)
          setIcons(size)
          showActiveIcons(size, true)
        })
      })
    
    document.querySelectorAll('[data-bs-theme-value]')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          const theme = toggle.getAttribute('data-bs-theme-value')
          localStorage.setItem('theme', theme)
          setStoredTheme(theme)
          setTheme(theme)
          showActiveTheme(theme, true)
        })
      })
  })
})()
