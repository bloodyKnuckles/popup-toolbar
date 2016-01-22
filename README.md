# popup-toolbar

A toolbar that fades up and fades down related to an element.

Inspired by [Toolbar.js](http://paulkinzett.github.io/toolbar/)

### example

example.html
```
<div id="toolbar-tools" class="hidden">
  <a href="#"><i class="icons icon-airplane"></i></a>
  <a href="#"><i class="icons icon-bus"></i></a>
  <a href="#"><i class="icons icon-car"></i></a>
  <a href="#"><i class="icons icon-bicycle"></i></a>
  <a href="#"><i class="icons icon-walk"></i></a>
</div>
<div id="content-option" class="toolbar-home"><i class="icons icon-cog"></i></div>
<script type="text/javascript" src="bundle.js"></script>
```

example.js
```
var toolbar = require('popup-toolbar')
//toolbar.options = {} // page toolbar option defaults

var tb = toolbar(document.querySelector('div#content-option'), 
  { // element toolbar options
    'tools': '#toolbar-tools',
    'toolsHandler': function (evt) {
      evt.preventDefault()
      console.log(this)
    }
}
```

### license

MIT
