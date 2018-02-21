# diy_api
Basic todo app API. Built with MongoDB/Node/Express. See the different branches for different methods. 

### jQuery (master branch)

Pros:
  - Easiest to use syntax with $.ajax & the shortcut methods ($.get, $.post)
  - Magically handles headers and different body types
  - Widely supported across browsers
  - Handles 
  
Cons:
  - Heavy to import all of jQuery just for AJAX
  
### Fetch (fetch branch)

Pros:
  - Lightweight
  - Promise based
  - Lots of control 
 
Cons:
  - Requires more low level knowledge
  - parsing the body can be a pain without shortcut methods
  - Less support (78% of browser share as of 11/2017)
  
### Axios (axios branch)

Pros:
  - easy API to use with JSON
  - promise based flow
  - XMLHR based (no polyfill necessary)
  - can be required into Node code for bundling
  
Cons:
  - extra require or script tag needed, naturally

### XMLHttpRequest (tbd)
  
