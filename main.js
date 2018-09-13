/**
 * Created by JianBo.Wang on 2017/9/14.
 */
// 1.AJAX--GET
var request = new XMLHttpRequest()
request.open('GET', '/my/url', true)

request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    var data = JSON.parse(request.responseText)
  } else {
    // We reached our target server, but it returned an error
  }
}

request.onerror = function () {
  // There was a connection error of some sort
}
request.send()
request = null

jQuery写法
$.getJSON('/my/url', function (data) {

})

// 2.AJAX--POST
var request = new XMLHttpRequest()
request.open('POST', '/my/url', true)
request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
request.send(data)

jQuery写法
$.ajax({
  type: 'POST',
  url: '/my/url',
  data: data,
  success: function (resp) {

  },
  error: function () {

  }
})

// 3.FADEIN
function fadeIn(el) {
  el.style.opacity = 0
  var last = +new Date()
  var tick = function () {
    el.style.opacity = +el.style.opacity + (new Date() - last) / 400
    last = +new Date()

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
    }
  }
  tick()
}

fadeIn(el)

$(el).fadeIn()

IE10写法:
el.classList.add('show')
el.classList.remove('hide')

.show {
  transition: opacity 400ms;
}
.hide {
  opacity: 0;
}

IE8写法:
function fadeIn(el) {
  var opacity = 0
  el.style.opacity = 0
  el.style.filter = ''

  var last = +new Date()
  var tick = function () {
    opacity += (new Date() - last) / 400
    el.style.opacity = opacity
    el.style.filter = 'alpha(opacity=' + (100 * opacity) | 0 + ')'

    last = +new Date()
    if(opacity < 1) {
      window.requestAnimationFrame && requestAnimationFrame(tick) || setTimeout(tick, 16)
    }
  }
  tick()
}

fadeIn(el)

// 4.HIDE
el.style.display = 'none'

$(el).hide()

// 5.SHOW
el.style.display = ''

$(el).show()

// 6.ADD CLASS
if (el.classList) {
  el.classList.add(className)
} else {
  el.classList += ' ' + className
}

$(el).addClass(className)

IE10写法:
el.classList.add(className)

// 7.AFTER
el.insertAdjacentHTML('afterend', htmlString)

$(el).after(htmlString)

// 8.APPEND
parent.appendChild(el)

$(parent).append(el)

// 9.BEFORE
el.insertAdjacentHTML('beforebegin', htmlString)

$(el).before(htmlString)

// 10.CHILDREN
el.children

$(el).children()

var children = []
for (var i = el.children.length; i--;) {
  if(el.children[i].nodeType != 8) {
    children.unshift(el.children[i])
  }
}

// 11.CLONENODE
el.cloneNode(true)

$(el).clone()

// 12.CONTAINS
el !== child && el.contains(child)

$.contains(el, child)

// 13.CONTAINS SELECTOR
el.querySelector(selector) !== null

$(el).find(selector).length

// 14.EACH
var elements = document.querySelectorAll(selector)
Array.prototype.forEach.call(elements, function (el, i) {

})

$(selector).each(function (i, el) {

})

var elements = document.querySelectorAll(selector)
for (var i = 0; i < elements.length; i++) {
  fn(elements[i], i)
}

// 15.EMPTY
el.innerHTML = ''

$(el).empty()

while(el.firstChild) {
  el.removeChild(el.firstChild)
}

// 16.Filter
Array.prototype.filter.call(document.querySelectorAll(selector), filterFn)

$(selector).filter(filterFn)

// 17.Find Children
el.querySelectorAll(selector)

$(el).find(selector)

// 18.Find Elements
document.querySelectorAll('.my #awesome seletor')

$('.my #awesome selector')

// 19.Get Attributes
el.getAttribute('tabindex')

$(el).attr('tabindex')

// 20.Get Html
el.innerHTML

$(el).html()

// 21.Get Outer Html
el.outerHTML

$('<div>').append($(el).clone()).html()

// 22.Get Style
getComputedStyle(el)[ruleName]

$(el).css(ruleName)

// 23.Get Text
el.textContent

$(el).text()

el.textContent || el.innerText

// 24.Has Class
if (el.classList) {
  el.classList.contains(className)
} else {
  new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className)
}

$(el).hasClass(className)

// 25.Matches
el === otherEl

$(el).is($(otherEl))

// 26.Matches Selector
var matches = function (el, selector) {
  return (el.matches || el.matchesSelector || el.msMatchSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector)
}

matches(el, '.ma-class')

$(el).is('.my-class')

var nodes = el.parentNode.querySelectorAll(selector)
for (var i = nodes.length; i--;) {
  if (nodes[i] === el) {
    return true
  }
}
return false

// 27.Next
el.nextElementSibling

$(el).next()

function nextElementSibling (el) {
  do {
    el = el.nextSibling
  } while (el && el.nodeType !== 1)
  return el
}
el.nextElementSibling || nextElementSibling(el)

// 28.Offset
var rect = el.getBoundingClientRect
{
  top: rect.top + document.body.scrollTop,
  left: rect.left + document.body.scrollLeft
}

$(el).offset()

// 29.Offset Parent
el.offsetParent || el

$(el).offsetParent()

// 30.Outer Height
el.offsetHeight

$(el).outerHeight()

// 31.Outer Height With Margin
function outerHeight(el) {
  var height = el.offsetHeight
  var style = getComputedStyle(el)

  height += parseInt(style.marginTop) + parseInt(style.marginBottom)
  return height
}

outerHeight(el)

$(el).outerHeight(true)

function outerHeight(el) {
  var height = el.offsetHeight
  var style = el.currentStyle || getComputedStyle(el)

  height += parseInt(style.marginTop) + parseInt(style.marginBottom)
  return height
}

// 32.Outer Width
el.offsetWidth

$(el).outerWidth()

// 33.Outer Width With Margin
function OutWidth(el) {
  var width = el.offsetWidth
  var style = getComputedStyle(el)

  width += parseInt(style.marginLeft) + parseInt(style.marginRight)
  return width
}

OuterWidth(el)

$(el).outerWidth(true)

// 34.Parent
el.parentNode

$(el).parent()

// 35.Position
{
  left: el.offsetLeft,
  top: el.offsetTop
}

$(el).position()

// 36.Position Relative To Viewport
el.getBoundingClientRect()

var offset = el.offset()
{
  top: offset.top - document.body.scrollTop,
  left: offset.left - document.body.scrollLeft
}

// 37.Prepend
parent.insertBefore(el, parent.firstChild)

$(parent).prepend(el)

// 38.Prev
el.previousElementSibling

$(el).prev()

// 39.Remove
el.parentNode.removeChild(el)

$(el).remove()

// 40.Remove Class
if (el.classList) {
  el.classList.remove(className)
} else {
  el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
}

$(el).removeClass(className)

// 41.Replace From Html
el.outerHTML = string

$(el).replaceWith(string)

// 42.Set Attributes
el.setAttribute('tabindex', 3)

$(el).attr('tabindex', 3)

// 43.Set Html
el.innerHTML = string

$(el).html()

// 44.Set Style
el.style.borderWidth = '20px'

$(el).css('border-width', '20px')

// 45.Set Text
el.textContent = string

$(el).text(string)

// 46.Siblings
Arra.prototype.filter.call(el.parentNode.children, function (child) {
  return child !== el
})

$(el).siblings()

var siblings = Array.prototype.slice.call(el.parentNode.children)
for (var i = siblings.length; i--;) {
  if (siblings[i] === el) {
    siblings.aplice(i, 1);
    break
  }
}

// 47.Toggle Class
if (el.classList) {
  el.classList.toggle(className)
} else {
  var classes = el.className.split(' ')
  var existingIndex = classes.indexOf(className)

  if (existingIndex >= 0) {
    classes.splice(existingIndex, 1)
  } else {
    classes.push(className)
  }

  el.className = classes.join(' ')
}

$(el).toggleClass(className)

// 48.Off
el.removeEventListener(eventName, eventHandler)

$(el).off(eventName, eventHandler)

function removeEventListener(el, eventName, handler) {
  if (el.removeEventListener) {
    el.removeEventListener(eventName, handler)
  } else {
    el.detachEvent('on' + eventName, handler)
  }
}

// 49.On
el.addEventListener(eventName, eventHandler)

$(el).on(eventName, eventHandler)

function addEventListener(el, eventName, handler) {
  if (el.addEventListener) {
    el.addEventListener(eventName, handler)
  } else {
    el.attachEvent('on' + eventName, function () {
      handler.call(el)
    })
  }
}

// 50.Ready
function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

$(document).ready(function () {

})

function ready(fn) {
  if (document.readyState != 'loading') {
    fn()
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn)
  } else {
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState != 'loading') {
        fn()
      }
    })
  }
}

// 51.Trigger Custom
if (window.CustomEvent) {
  var event = new CustomEvent('my-event', {detail: {some: 'data'}})
} else {
  var event = document.createEvent('CustomEvent')
  event.initCustomEvent('my-event', true, true, {some: 'data'})
}
el.dispatchEvent(event)

$(el).trigger('my-event', {some: 'data'})

// 52.Trigger Native
var event  = document.createEvent('HTMLEvents')
event.initEvent('change', true, false)
el.dispatchEvent(event)

$(el).trigger('change')

if (document.createEvent) {
  var event = document.createEvent('HTMLEvents')
  event.initEvent('change', true, false)
  el.dispatchEvent(event)
} else {
  el.fireEvent('onchange')
}

// 53.Bind
fn.bind(context)

$.proxy(fn, context)

fn.apply(context, arguments)

// 54.Array Each
array.forEach(function (item, i) {

})

function forEach(array, fn) {
  for (var i = 0; i < array.length; i++) {
    fn(array[i], i)
  }
}

forEach(array, function (item, i) {

})

$.each(array, function (i, item) {

})

// 55.Deep Extend
var deepExtend = function (out) {
  out = out || {}
  for (var i = 1; i < arguments.length; i ++) {
    var obj = arguments[i]
    if(!obj) {
      continue
    }
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') {
          out[key] = deepExtend(out[key], obj[key])
        } else {
          out[key] = obj[]
        }
      }
    }
  }
  return out
}

deepExtend({}, objA, objB)

$.extend(true, {}, objA, objB)

// 56.Extend
var extend = function (out) {
  out = out || {}
  for (var i = 1; i < arguments.length; i ++) {
    if (!arguments[i]) {
      continue
    }
    for (var key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key)) {
        out[key] = arguments[i][key]
      }
    }
  }
  return out
}
extend({}, objA, objB)

$.extend({}, objA, objB)

// 57.Index Of
array.indexOf(item)

$.inArray(item, array)

// 58.Is Array
Array.isArray(arr)

$.isArray(arr)

// 59.Map
array.map(function (value, index) {

})

$.map(array, function (value, index) {

})

// 60.Now
Date.now()

$.now()

// 61.Parse Html
var parseHTML = function (str) {
  var tmp = document.implementation.createHTMLDocument()
  tmp.body.innerHTML = str
  return tmp.body.children
}
parseHTML(htmlString)

$.parseHTML(htmlString)

// 62.Parse Json
JSON.parse(string)

$.parseJSON(string)

// 63.Trim
string.trim()

$.trim(string)

// 64.Type
Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase()

$.type(obj)


jQuery and its consins are great, and by all means use them if it makes it easise to develop your application.
if you are developing a library on the other hand, please take a moment to consider if you actually need jQuery as dependency. Maybe you can include a few lines of utility code ...


var request = new XMLHttpRequest();
request.open('GET', '/my/url', true);
request.onreadystatechange = function () {
  if (this.readyState === 4) {
    if (this.status >= 200 && this.status < 400) {
      var data = JSON.parse(this.responseText);
    } else {

    }
  }
}

request.send();
request = null;

var request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState === 4) {
    if (this.status >= 200 && this.status < 400) {
      var resp = this.responseText;
    } else {

    }
  }
}

request.send();
request = null;

function fadeIn(el) {
  var opacity = 0;
  el.style.opacity = 0;
  el.style.filter = '';
  var last = +new Date();
  var tick = function () {
    opacity += (new Date() - last) / 400;
    el.style.opcity = opacity;
    el.style.filter = 'alpha(opacity=' + (100 * opacity) | 0 +')';

    last = +new Date();
    if (opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  }
  tick();
}
fadeIn(el);

el.style.display = 'none';

el.style.display = '';

if(el.classList) {
  el.classList.add(className);
} else {
  el.className += ' ' + className;
}

el.insertAdjacentHTML('afterend', htmlString);

parent.appendChild(el)

el.insertAdjacentHTML('beforebegin', htmlString);

var children = [];
for (var i = el.children.length; i--; ) {
  if (el.children[i].nodeType != 8) {
    children.unshift(el.children[i]);
  }
}

el.cloneNode(true);

el !== child && el.contains(child);

el.querySelector(selector) !== null;

function forEachElement(selector, fn) {
  var elements = document.querySelectorAll(selector);
  for (var i = 0; i < elements.length; i++) {
    fn(elements[i], i);
  }
}

forEachElement(selector, function (el, i) {

});

while(el.firstChild) {
  el.removeChild(el.firstChild);
}

function filter(selector, filterFn) {
  var elements = document.querySelectorAll(selector);
  var out = [];
  for (var i = elements.length; i--; ) {
    if (filterFn(elements[i])) {
      out.unshift(elements[i]);
    }
  }
}
filter(selector, filterFn);

el.querySelectorAll(selector);

document.querySelectorAll('.my #awesome selector');

el.getAttribute('tabindex');

el.innerHTML

el.outerHTML

el.textContent || el.innerText

if (el.classList) {
  el.classList.contains(className);
} else {
  new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}

el === otherEl

var matches = function (el, selector) {
  var _matches = (el.matches || el.matchesSelector || el.msMatchSelector || el.mozMatchSelector || el.webkitMatchSelector || el.oMatchesSeletor);

  if (_matches) {
    return _matches.call(el, seletor);
  } else {
    var nodes = el.parentNode.querySeletorAll(selector);
    for (var i = nodes.length; i--; ) {
      if (nodes[i] === el) {
        return true;
      }
    }
    return false;
  }
}

matches(el, '.my-class');

function nextElementSibling(el) {
  do {
    el = el.nextSibling;
  } while (el && el.nodeType !== 1)
  return el;
}

el.nextElementSibling || nextElementSibling(el)

var rect = el.getBoundingClientRect();
{
  top: rect.top + document.body.scrollTop,
  left: rect.left + document.body.scrollLeft
}

el.offsetParent || el

el.offsetHeight

function outerHeight(el) {
  var height = el.offsetHeight;
  var style = el.currentStyle || getComputedStyle(el);

  height += parseInt(style.marginTop) + parseInt(style.marginBottom) +
  return height;
}
outerHeight(el);

el.offsetWidth

function outerWidth(el) {
  var width = el.offsetWidth;
  var style = el.currentStyle || getComputedStyle(el);
  width += parseInt(style.marginLeft) + parseInt(style.marginRight);
  return width;
}
outerWidth(el);

el.parentNode

{
  left: el.offsetLeft;
  top: el.offsetTop
}

el.getBoundingClientRect();

parent.insertBefore(el, parent.firstChild);

function previousELementSibling(el) {
  do {
    el = el.previousSibling;
  } while (el && el.nodeType !== 1)
  return el;
}
el.previousElementSibling || previousElementSibling(el);

el.parentNode.removeChild(el);

if (el.classList) {
  el.classList.remove(className)
} else {
  el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

el.outerHTML = string;

el.setAttribute('tabindex', 3);

el.innerHTML = string;

el.style.borderWidth = '20px';

if (el.textContent !== undefined) {
  el.textContent = string;
} else {
  el.innerText = string;
}

var siblings = Array.prototype.slice.call(el.parentNode.children);

for (var i = siblings.length; i--; ) {
  if (siblings[i] === el) {
    siblings.splice(i, 1);
    break;
  }
}

if (el.classList) {
  el.classList.toggle(className);
} else {
  var classes = el.className.split(' ');
  var existingIndex = -1;
  for (var i = classes.length; i--; ) {
    if (classes[i] === className) {
      existingIndex = i;
    }
  }

  if (existingIndex >= 0) {
    classes.splice(existingIndex, 1);
  } else {
    classes.push(className);
  }

  el.className = classes.join(' ');
}

function removeEventListener(el, eventName, handler) {
  if (el.removeEventListener) {
    el.removeEventListener(eventName, handler);
  } else {
    el.detachEvent('on' + eventName, handler);
  }
}

removeEventListener(el, eventName, handler);

function addEventListener(el, eventName, handler) {
  if (el.addEventListener) {
    el.addEventListener(eventName, handler)
  } else {
    el.attachEvent('on' + eventName, function () {
      handler.call(el);
    })
  }
}

addEventListener(el, eventName, handler);

function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState != 'loading') {
        fn();
      }
    });
  }
}

if (document.createEvent) {
  var event = document.createEvent('HTMLEvents');
  event.initEvent('change', true, false);
  el.dispatchEvent(event);
} else {
  el.fireEvent('onchange');
}

fn.apply(context, arguments);

function forEach(array, fn) {
  for (var i = 0; i < array.length; i++) {
    fn(array[i], i);
  }
}
forEach(array, function(item, i) {

});

var deepExtend = function (out) {
  out = out || {};
  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i];
    if (!obj) {
      continue;
    }
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') {
          out[key] = deepExtend(out[key], obj[key]);
        } else {
          out[key] = obj[key];
        }
      }
    }
  }
  return out;
};
deepExtend({}, objA, objB);

var extend = function (out) {
  out = out || {};
  for (var i = 1; i < arguments.length; i++) {
    if (!arguments[i]) {
      continue;
    }
    for (var key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key)) {
        out[key] = arguments[i][key];
      }
    }
  }
  return out;
};
extend({}, objA, objB);

function indexOf(array, item) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === item) {
      return i;
    }
  }
  return -1;
}
indexOf(array, item);

isArray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};
isArray(arr);

function map(arr, fn) {
  var results = [];
  for (var i = 0; i < arr.length; i++) {
    results.push(fn(arr[i], i));
  }
  return results;
}
map(array, function (value, index) {

});

new Date().getTime();

var parseHTML = function (str) {
  var el = document.createElement('div');
  el.innerHTML = str;
  return el.children;
};
parseHTML(htmlString);

JSON.parse(string);

string.replace(/^\s+|\s+$/g, '');

Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();



// ---------------------------------------------------------------------------------------------
Promise

React

SPA-单页模型
--挑战：保持数据与UI同步更新，如何提高DOM操作的效率，使用HTML开发UI界面异常复杂
依赖JS开发UI界面

ReactDOM.render(
    <h1></h1>
)

React组件化思维

React组件的样式设计
this.props.children
className

style = {letterStyle}

sans-serif

getInitialState: function () {
  return {

  }
}
componentDidMount

var counterStyle = {
  emphasis
}

React组件的生命周期:

componentWillMount

componentDidMount

componentWillUnmount

componentWillUpdate

getDefaultProps:

getInitialState:

render:

shouldComponentUpdate:

componentDidUpdate:

ReactDOM.unmountComponentAtNode

ComponentWillReceiveProps: function(newProps) {}

shouldComponentUpdate



//----------------------------------------------------------------------------------------------------

AJAX跨越完全讲解

发生跨越AJAX跨域:
浏览器限制
跨域
XHR(XMLHttpRequest)请求

解决思路:
XHR-JSONP
跨域-被调用方-调用方



1.浏览器禁止检查
disable-web-security

2.JSONP如何解决跨域
JSON for pending

JSONP有什么弊端
服务器需要改动代码支持
只支持get方法

最常见的JAVAEE架构:
被调用方解决
调用方解决

Access-Control-Allow-Origin
Access-Control-Allow-Methods
Access-Control-Allow-Headers
Access-Control-Max-Age
Access-Control-Allow-Credentials

工作中常见的简单请求
方法为-GET HEAD POST
请求header里面-无自定义头-Content-Type为text/plain multipart/form-data application/x-www-form-urlencoded

工作中常见的非简单请求
put delete方法的ajax请求
发送json格式的ajax请求
带自定义头的ajax请求

带cookie的跨域

带自定义头的跨域

NGINX配置方案
vhost

APACHE解决方案

SPRING框架解决方案

调用方解决-隐藏跨域-NGINX&APACHE解决方案



//---------------------------------------------------------------------------------------------------------------------
Weex

支持ES6规范

weexplayground

weex开发环境搭建
npm install -g weex-toolkit
weex init
npm run server npm run dev

Weex通用样式
Weex只支持像素值单位
border background 等不支持简写
weex支持position定位 relative absolute fixed sticky
不支持z-index不能设定层级关系
如果定位元素超过容器边界，
支持linear-gradient
不支持radial-gradient
box-shadow仅仅支持iOS
<image>组件不支持一个角或几个角的border-radius
在weex中，flexbox是默认并且唯一的布局模型，每个元素都默认拥有了display flex属性

<a>定义了指向weex页面打包后的一个js地址
组件中无法添加文本，需要在其中添加text组件才能添加文本
此组件支持除了自己外的所有Weex组件作为子组件


//----------------------------NodeJS----------------------------------------

Node.js API

URL--url.parse() url.format() url.resolve()

querystring--querystring.stringify({}) querystring.parse() querystring.escape() querystring.unescape()

HTTP--http客户端发起请求，创建端口

DNS解析
http三次握手

GET
POST
PUT
DELETE
HEAD

HTTP概念进阶:

Promise

//-----------------------------Websocket 火拼俄罗斯-----------------------------

websocket，sever和client可以相互发送消息 本质是TCP连接
var websocket = new WebSocket("ws://echo.websocket.org/");
websocket.open = function () {
  console.log('websocket open');
}
websocke.onclose = function () {
  console.log('close');
}
websocket.onmessage = function (e) {
  console.log(e.data);
}

nodejs-websocket

server.connections

connection.sendTxt

div.style.color

socket.io
可以发送对象
socket可以on类型
socket.emit('type', str)

允许浏览器和服务器建立持久连接
nodejs-websocket
socket.io
HTML5的websocket API

//---------------------------ES6----------------------
touch

ES3-ES5-ES6
Git-Webpack-JS

const
Object.defineProperty()

let
箭头函数
箭头函数中this指向定义时的this的

默认参数
Array.prototype.slice.call(arguments)

...a

对象代理
es3 构造函数闭包的方式
es5 用Object.defineProperty()
es6 proxy

@observable @observer 被观察者 被观察者
使用@observable 可以观察类的值
这里使用@observable 将Store的todos变为一个被观察的值

observable

import {observable} from 'mobx'
class Store {
  @observable todos = [{
    title: "todo标题",
    done: false
  }]
}

observer

mobx组件
使用@observer，将组件变为观察者，响应todos状态变化
当状态变化时，组件也会做相应的更新

import {observer} from 'mobx-react'
@observer
class TodoBox extends Component {
  render() {
    return (
      <ul>
        {this.props.store.todos.map(todo => <li>todo.title</li>)}
      </ul>
    )
  }
}

import React, {Component} from 'react'

--------------Mobx----------------------


-------------这一次，彻底弄懂JavaScript的执行机制--------------

javascript是一门单线程语言，按照语句出现的顺序执行
















































// 设置VIEWPORT
// var deviceWidth = parseInt(window.screen.width);  //获取当前设备的屏幕宽度
// var deviceScale = deviceWidth / 1366;  //得到当前设备屏幕与640之间的比例，之后我们就可以将网页宽度固定为640px
// document.write('<meta name="viewport" content="width=1366,initial-scale=' + deviceScale + ', minimum-scale = ' + deviceScale + ', maximum-scale = ' + deviceScale + ', target-densitydpi=device-dpi, user-scalable=no">');

// var deviceWidth = parseInt(window.screen.width);
// var deviceScale = deviceWidth / 1366;
// document.write('<meta name="viewport" content="width=1366,initial-scale=' + deviceScale + ', minimum-scale = ' + deviceScale + ', maximum-scale = ' + deviceScale + ', target-densitydpi=device-dpi, user-scalable=no">');














































