'use strict'

module.exports = {
  multipass: true,
  js2svg: {
    pretty: true,
    indent: 2
  },
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeUnknownsAndDefaults: {
            keepRoleAttr: true
          },
          removeViewBox: false
        }
      }
    },
    // The next plugins are included in svgo but are not part of preset-default,
    // so we need to enable them separately
    'cleanupListOfValues',
    'sortAttrs',
    {
      name: 'removeAttrs',
      params: {
        attrs: [
          'clip-rule',
          'data-name',
          'fill'
        ]
      }
    }
  ]
}
