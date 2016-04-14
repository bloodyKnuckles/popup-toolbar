# popup-toolbar

Load a toolbar as shown below with icons and event handlers, which fades up when activated and fades
down when deactivated in relation to action on a specified element.

Inspired by [Toolbar.js](http://paulkinzett.github.io/toolbar/)

### example

example.html
```
<html>
<head>
<link href="example.css" rel="stylesheet">
<link href="icons.css" rel="stylesheet">
</head>
<body>

<div id="toolbar-tools" class="hidden">
  <a href="#"><i class="icons icon-airplane"></i></a>
  <a href="#"><i class="icons icon-bus"></i></a>
  <a href="#"><i class="icons icon-car"></i></a>
  <a href="#"><i class="icons icon-bicycle"></i></a>
  <a href="#"><i class="icons icon-walk"></i></a>
</div>
<div id="content-option" class="toolbar-home"><i class="icons icon-cog"></i></div>
<script type="text/javascript" src="example.bundle.js"></script>

</body>
</html>
```

example.js (before bundling)
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
)
```

[Demo 1](http://bloodyknuckles.neocities.org/popuptoolbar/),
[Demo 2](http://bloodyknuckles.neocities.org/popuptoolbar/toolbarpopup.html)

### license

MIT
