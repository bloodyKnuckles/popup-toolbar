(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// inspired by http://paulkinzett.github.io/toolbar/

module.exports = function (elem, options) {

  var Toolbar = {
    init: function (elem, options) {
      var self = this
      self.elem = elem
      self.options = extend({ // module toolbar defaults
        'position': 'top', 'zIndex': 120, 'adjustment': 10,
        'toolsHandler': function (evt) { evt.preventDefault() },
        'csshooks': {
          'toolbarshow': 'toolbar-show', 'toolbarhide': 'toolbar-hide', 'elemselected': 'elem-selected',
          'toolbarcontainer': 'toolbar-container', 'arrow': 'arrow',
          'toolbartool': 'toolbar-tool'
        }
      }, toolbar.options, options)
      self.toolbarShowCSS = {'display': '', 'opacity': 1}
      self.toolbarHideCSS = {'display': 'none', 'opacity': 0}

      self.toolbar = document.createElement('div')
      addClass(self.toolbar, self.options.csshooks.toolbarcontainer)
      addClass(self.toolbar, 'toolbar-' + self.options.position)

      var toolscontainer = document.createElement('div')
      self.toolbar.appendChild(toolscontainer)
      var arrow = document.createElement('div')
      addClass(arrow, self.options.csshooks.arrow)
      self.toolbar.appendChild(arrow)

      document.body.appendChild(self.toolbar)

      var tools = document.querySelector(self.options.tools).cloneNode(true).querySelectorAll('a')
      Array.prototype.forEach.call(tools, function (tool) {
        addClass(tool, self.options.csshooks.toolbartool)
        tool.addEventListener('click', self.options.toolsHandler)
        toolscontainer.appendChild(tool)
      })

      var moveTime
      function decideTimeout() {
        if (hasClass(self.elem, self.options.csshooks.selected)) {
          moveTime = setTimeout(function () {
            self.hide()
          }, 150)
        }
        else { clearTimeout(moveTime) }
      }

      self.elem.addEventListener('mouseenter', function (evt) {
        if (hasClass(self.elem, self.options.csshooks.selected)) {
          clearTimeout(moveTime)
        }
        else { self.show() }
      })

      self.elem.addEventListener('mouseleave', function (evt) {
        decideTimeout()
      })
      document.addEventListener('click', function (evt) {
        removeClass(self.elem, self.options.csshooks.selected)
        objectStyle(self.toolbar, self.toolbarHideCSS)
      }, false)

      self.toolbar.addEventListener('mouseenter', function (evt) {
        clearTimeout(moveTime)
      })
      self.toolbar.addEventListener('mouseleave', function (evt) {
        decideTimeout()
      })

      self.toolbar.width = self.toolbar.offsetWidth
      self.toolbar.height = self.toolbar.offsetHeight

      var box = self.elem.getBoundingClientRect ? self.elem.getBoundingClientRect() : {
        top: 0, left: 0
      }
      self.coordinates = {
        left: box.left + (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0),
        top: box.top + (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0)
      }

      switch (self.options.position) {
        case 'top': self.toolbarCoord =  {
            left: (self.coordinates.left - (self.toolbar.width / 2) + (self.elem.offsetWidth / 2)) + 'px',
            top: (self.coordinates.top - self.elem.offsetHeight - self.options.adjustment) + 'px',
          }
          break
        case 'left': self.toolbarCoord =  {
            left: (self.coordinates.left - (self.toolbar.width / 2) - (self.elem.offsetWidth / 2) - self.options.adjustment) + 'px',
            top: (self.coordinates.top - (self.toolbar.height / 2) + (self.elem.offsetHeight / 2)) + 'px',
          }
          break
        case 'right': self.toolbarCoord =  {
            left: (self.coordinates.left + (self.toolbar.width / 2) + (self.elem.offsetWidth / 2) + self.options.adjustment) + 'px',
            top: (self.coordinates.top - (self.toolbar.height / 2) + (self.elem.offsetHeight / 2)) + 'px',
          }
          break
        case 'bottom': self.toolbarCoord =  {
            left: (self.coordinates.left - (self.toolbar.width / 2) + (self.elem.offsetWidth / 2)) + 'px',
            top: (self.coordinates.top + self.elem.offsetHeight + self.options.adjustment) + 'px',
          }
          break
      }
      self.toolbarCoord.right = 'auto'
      objectStyle(self.toolbar, self.toolbarCoord, self.toolbarHideCSS)

      return self
    },

    show: function () {
      var self = this
      addClass(self.elem, self.options.csshooks.selected)
      removeClass(self.toolbar, self.options.csshooks.toolbarhide)
      addClass(self.toolbar, self.options.csshooks.toolbarshow)
      objectStyle(self.toolbar, self.toolbarShowCSS)
    },

    hide: function () {
      var self = this
      removeClass(self.elem, self.options.csshooks.selected)
      removeClass(self.toolbar, self.options.csshooks.toolbarshow)
      addClass(self.toolbar, self.options.csshooks.toolbarhide)
      setTimeout(function () {
        objectStyle(self.toolbar, self.toolbarHideCSS)
      }, 250)
    }

  } // end Toolbar

  return Object.create(Toolbar).init(elem, options)
  

  function hasClass (el, className) {
    if (el.classList) {
      return el.classList.contains(className)
    }
    else {
      return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
    }
  }

  function addClass (el, className) {
    if (el.classList) {
      el.classList.add(className)
    }
    else if ( !hasClass(el, className) ) { el.className += ' ' + className }
  }

  function removeClass (el, className) {
    if (el.classList) {
      el.classList.remove(className)
    }
    else if (hasClass(el, className)) {
      el.className = el.className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ')
    }
  }

  function extend (out) {
    out = out || {}
    Array.prototype.forEach.call(arguments, function (obj) {
      if ( !obj ) { return }
      Object.keys(obj).forEach(function (key) {
        if ( obj.hasOwnProperty(key) ) {
          out[key] = obj[key]
        }
      })
    })
    return out
  }

  function objectStyle (elem) {
    Array.prototype.slice.call(arguments, 1).forEach(function (obj) {
      elem.style && obj && Object.keys(obj).forEach(function (key) {
        elem.style[key] = obj[key]
      })
    })
  }

}

},{}],2:[function(require,module,exports){
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

},{"../":1}]},{},[2]);
