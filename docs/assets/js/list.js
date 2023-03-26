/* global List:false */

(function () {
  'use strict'

  new List('icons-body', {
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
})()
