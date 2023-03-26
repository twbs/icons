/* global List:false */

(function () {
  'use strict'

  const searchInput = document.querySelector('#icons-body #search')
  const query = new URLSearchParams(window.location.search).get('q')
  const iconList = new List('icons-body', {
    searchDelay: 250,
    valueNames: [
      'name', {
        data: [
          'tags',
          'categories'
        ]
      }
    ]
  })

  if (query) {
    document.querySelector('#content').scrollIntoView()
    searchInput.value = query
    iconList.search(query)
  }

  iconList.on('searchComplete', () => {
    const searchTerm = searchInput.value
    const newUrl = new URL(window.location)

    if (searchTerm.length > 0) {
      newUrl.searchParams.set('q', searchTerm)
    } else {
      newUrl.searchParams.delete('q')
    }

    window.history.replaceState(null, null, newUrl)
  })
})()
