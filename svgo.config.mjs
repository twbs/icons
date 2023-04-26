import path from 'node:path'

export default {
  multipass: true,
  js2svg: {
    pretty: true,
    indent: 2,
    eol: 'lf'
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
    {
      name: 'removeAttrs',
      params: {
        attrs: [
          'clip-rule',
          'data-name',
          'fill'
        ]
      }
    },
    // Custom plugin which resets the SVG attributes to explicit values
    {
      name: 'explicitAttrs',
      type: 'visitor',
      params: {
        attributes: {
          xmlns: 'http://www.w3.org/2000/svg',
          width: '16',
          height: '16',
          fill: 'currentColor',
          class: '', // We replace the class with the correct one based on filename later
          viewBox: '0 0 16 16'
        }
      },
      fn(_root, params, info) {
        if (!params.attributes) {
          return null
        }

        const basename = path.basename(info.path, '.svg')

        return {
          element: {
            enter(node, parentNode) {
              if (node.name === 'svg' && parentNode.type === 'root') {
                // We set the `svgAttributes` in the order we want to,
                // hence why we remove the attributes and add them back
                node.attributes = {}
                for (const [key, value] of Object.entries(params.attributes)) {
                  node.attributes[key] = key === 'class' ? `bi bi-${basename}` : value
                }
              }
            }
          }
        }
      }
    }
  ]
}
