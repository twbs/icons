'use strict'

const { extendDefaultPlugins } = require('svgo')

module.exports = {
  multipass: true,
  js2svg: {
    pretty: true,
    indent: 2
  },
  plugins: extendDefaultPlugins([
    {
      name: 'cleanupListOfValues'
    },
    {
      name: 'removeAttrs',
      params: {
        attrs: [
          'data-name',
          'fill',
          'clip-rule'
        ]
      }
    },
    {
      name: 'removeUnknownsAndDefaults',
      params: {
        keepRoleAttr: true
      }
    },
    {
      name: 'removeViewBox',
      active: false
    },
    {
      name: 'sortAttrs'
    }
  ])
}
