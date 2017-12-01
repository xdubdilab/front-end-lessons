# Lesson 01 Node & JavaScript

## 任务

实现一个简单的 JavaScript 模板解析引擎。

说明：

1. 用 `http` 模块实现一个 web server
1. 监听请求，响应 `text/html`
1. 实现响应单独的 html 文件
1. 实现 html 模板代码的简单替换
1. 实现 `ModelAndView`

```js
function render(template, data) {
  // TODO
}

const data = {
  title: 'Lesson 01',
  content: {
    head: 'A Simple Template',
    paragraph: 'Good artists copy; great artists steal — Pablo Picasso',
  },
}

const template = fs.readFileSync('./views/index.template')

const html = render(template, data)
```

模板文件 (`./views/index.template`):

```html
<html>
  <head>
    <meta charset="utf-8"/>
    <title>{{title}}</title>
  </head>
  <body>
    <h2>{{content.head}}</h2>
    <p>{{content.paragraph}}</p>
  </body>
</html>
```

渲染结果：

```html
<html>
  <head>
    <meta charset="utf-8"/>
    <title>Lesson 01</title>
  </head>
  <body>
    <h2>A Simple Template</h2>
    <p>Good artists copy; great artists steal — Pablo Picasso</p>
  </body>
</html>
```

## 基础知识

### [Node](https://nodejs.org/dist/latest-v8.x/docs/api/)

Node 可以理解为一个 JavaScript 的虚拟机或者解释器，作用是翻译并执行 JavaScript 代码，并提供了大量与操作系统交互的接口，跳出了浏览器的局限。

- 项目配置文件：`package.json`
- 模块
  - 内置模块
    - [`http`](https://nodejs.org/dist/latest-v8.x/docs/api/http.html)
    - [`fs`](https://nodejs.org/dist/latest-v8.x/docs/api/fs.html)
  - 第三方模块
  - 自定义模块

#### API 参考

读取本地文件

```js
const fs = require('fs')
// API 返回的是 Buffer 对象
const buffer = fs.readFileSync('./somefile')
const content = buffer.toString()
```

### [ECMAScript 2015 (ES6)](http://es6-features.org)

ECMA 是欧洲一个标准制定委员会，JavaScript 被网景公司开发出来后被提交至此委员会进行标准化。

标准委员会每年会出一个版本对语言特性进行更新，所以有了 ES2015, ES2016, ES2017...

从 ES2015 开始，JavaScript 引入了一些非常有用的特性，使得以前存在的语言缺陷和问题得以改善。如常量，局部变量和箭头函数等。

#### 常量

```js
const PI = 3.1415
PI = 1 // error
```

#### 局部变量

```js
const xs = [1, 2, 3]
const ys = '123'

for (const x of xs) {
  let z = x + 1
}
for (const y of ys) {
  let z = Number(y) + 1
}
```

#### eval 函数

`eval` 函数是 JavaScript 中危险的方法，不建议使用。

```js
eval('1 + 1') // 2
const PI = 3.14159
eval('PI * 100') // 314.159
eval('"PI = " + PI')
```

#### [String API](http://javascript.ruanyifeng.com/stdlib/string.html)

```js
let str = 'This is a string.'
str.length // 17
str.charAt(0) // "T"
str.slice(5, 7) // "is"
str.slice(10) // "string."
str.split(' ') // ["This", "is", "a", "string."]
str.replace('string', 'new string')
// "This is a new string."
str.replace(/s/g, '$') // "Thi$ i$ a $tring."
```

### [JavaScript 正则表达式](http://javascript.ruanyifeng.com/stdlib/regexp.html)

正则表达式可以大大提高处理字符串的能力，学会对编程很有裨益。
