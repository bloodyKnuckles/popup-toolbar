var toolbar = require('../')
//toolbar.options = {} // page toolbar option defaults

var tb = toolbar(document.querySelector('div#content-option'), 
  { // element toolbar options
    'tools': '#toolbar-tools',
    'toolsHandler': function (evt) {
      evt.preventDefault()
      console.log(this)
    },
    'csshooks': {
      'toolbarshow': 'toolbar-show', 'toolbarhide': 'toolbar-hide',
      'toolbarcontainer': 'toolbar-container', 'arrow': 'arrow',
      'toolbartool': 'toolbar-tool', 'elemselected': 'elem-selected'
    }

  }
)
console.log(tb.toolbar)
