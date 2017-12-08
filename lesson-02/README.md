# Lesson 02 TODO List

实现一个简单的 GTD（Get Thing Done） 任务列表。

参照示例 [TodoMvc Vue Demo](http://todomvc.com/examples/vue/)。

## 基础知识

### HTML

- DOM 结构
- css ／ js 引入方式
- 常用标签
  - 块级元素
    - div
    - p
    - form
    - ul
    - li
    - h[1-5]
  - 非块级元素
    - span
    - img
    - small

### CSS

- 选择器
  - 类选择器
  - id 选择器
  - 后代选择器
- 伪类
  - :hover
  - :focus
  - :active
- [继承属性](https://segmentfault.com/q/1010000000269211)
- [盒模型](http://www.w3school.com.cn/css/css_boxmodel.asp)

### HTML DOM

- [简介](http://www.w3school.com.cn/htmldom/index.asp)
- 常用方法
  - `getElementById`
  - `getElementsByTagName`
  - `appendChild`
  - `querySelector`
  - `querySelectorAll`
  - [更多方法参考](http://www.runoob.com/jsref/dom-obj-all.html)

### Ajax

- [简介](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434499861493e7c35be5e0864769a2c06afb4754acc6000)

```js
const request = new XMLHttpRequest(); // 新建XMLHttpRequest对象
const data = '';

request.onreadystatechange = function () { // 状态发生变化时，函数被回调
  if (request.readyState === 4) { // 成功完成
    // 判断响应结果:
    if (request.status === 200) {
      // 成功，通过responseText拿到响应的文本:
      console.log(request.responseText);
    } else {
      // 失败，根据响应码判断失败原因:
      console.log(request.status);
    }
  } else {
    // HTTP请求还在继续...
  }
}

// 发送请求:
request.open('GET', '/api/todos', true);
request.send(data);
```

### Event

```js
element.addEventListener('click', (e) => {
  // event handler
})
```
