import Fuse from 'fuse.js'

(function () {
  const iconsBody = document.querySelector('#icons-body')

  if (!iconsBody) return

  const searchInput = iconsBody.querySelector('#search')
  const iconListContainer = iconsBody.querySelector('#icons-list')
  const iconElementList = Array.from(iconListContainer.children)

  const iconDataList = iconElementList.map(element => ({
    name: element.dataset.name,
    categories: element.dataset.categories.split(' '),
    tags: element.dataset.tags.split(' ')
  }))

  const fuse = new Fuse(iconDataList, {
    ignoreLocation: true,
    useExtendedSearch: true,
    shouldSort: false,
    keys: ['name', 'categories', 'tags'],
    threshold: 0
  })

  function search(searchTerm) {
    const searchResult = fuse.search(searchTerm)

    iconListContainer.innerHTML = ''
    if (searchTerm.length > 0) {
      const resultElements = searchResult.map(result => iconElementList[result.refIndex])
      iconListContainer.append(...resultElements)
    } else {
      iconListContainer.append(...iconElementList)
    }

    const newUrl = new URL(window.location)
    if (searchTerm.length > 0) {
      newUrl.searchParams.set('q', searchTerm)
    } else {
      newUrl.searchParams.delete('q')
    }

    window.history.replaceState(null, null, newUrl)
  }

  let timeout
  searchInput.addEventListener('input', () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => search(searchInput.value), 250)
  })

  const query = new URLSearchParams(window.location.search).get('q')
  if (query) {
    search(query)
    searchInput.value = query
    document.querySelector('#content').scrollIntoView()
  }
})()
