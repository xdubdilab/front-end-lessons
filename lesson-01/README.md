# Lesson 01 NodeJS & JavaScript

实现一个简单的html模板解析引擎。

## 任务

实现一个简单的 JS 模板解析引擎。

说明：

1. 用 `http` 模块实现一个web容器
1. 监听请求，响应 `text/html`
1. 实现响应单独的 html 文件
1. 实现 html 模板代码的简单替换
1. 实现 JS 表达式
1. 实现条件选择
1. 实现循环体

## 基础知识

### [NodeJS](https://nodejs.org/dist/latest-v8.x/docs/api/)

NodeJS 可以理解为一个 JavaScript 的虚拟机或者解释器，作用是翻译并执行 JavaScript 代码，并提供了大量与操作系统交互的接口，这些接口由C++等编译型语言实现再映射至 JS，大大扩充了 JS 语言的能力，跳出了浏览器的局限。

- 包描述符：`package.json`
- 模块化
  - [`AMD`](https://github.com/amdjs/amdjs-api/wiki/AMD) / [`CMD`](https://github.com/seajs/seajs/issues/242) [区别](https://www.zhihu.com/question/20351507)
  - 内置模块
    - [`http`](https://nodejs.org/dist/latest-v8.x/docs/api/http.html)
    - [`fs`](https://nodejs.org/dist/latest-v8.x/docs/api/fs.html)
  - 第三方模块
  - 自定义模块

#### API 参考

读取本地文件

```js
const fs = require('fs');
// API 返回的是 Buffer 对象
const buffer = fs.readFileSync('./somefile');
const content = buffer.toString();
```

### [ECMAScript6(2016)](http://es6-features.org)

ECMA 是欧洲一个标准制定委员会，JavaScript 被网景公司开发出来后被提交至此委员会进行标准化。

标准委员会每年会出一个版本对语言特性进行更新，所以有了 ES5, ES6, ES7...

从 ES6 开始，JS 引入了一些非常有用的特性，使得以前存在的语言缺陷和问题得以改善。如常量，局部变量和箭头函数等。

#### 常量

```js
const PI = 3.1415
PI = 1 // error
```

#### 局部变量

```js
for (let i = 0; i < a.length; i++) {
    let x = a[i]
}
for (let i = 0; i < b.length; i++) {
    let y = b[i]
}
```

#### eval 函数

`eval` 函数是 JS 中最危险的方法，非常不建议使用。但是在模板引擎中却能提供非常简洁便利的实现，以至于不得不小心地使用它来实现。

```js
eval('1+1') // 2
const PI = 3.14159
eval('PI * 100') // 314.159
eval('"PI=" + PI')
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

### [JS 正则表达式](http://javascript.ruanyifeng.com/stdlib/regexp.html)

正则表达式可以大大提高处理字符串的能力，学会对编程很有裨益。
