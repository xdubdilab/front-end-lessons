# Lesson-00 Warm Up

## 任务

1. 搭建基本开发环境
1. 使用nodejs创建一个web容器
1. 实现一个`Hello World!`
1. 实现`Hello, ${name}`，name通过查询字符串回显

note: 不得使用第三方库

## 搭建基本开发环境

### 依赖的软件/工具包括但不限于：

- [git](https://git-scm.com/)
- [VSCode](https://code.visualstudio.com/)
- [nodejs](http://nodejs.org/)
- [cnpm](https://npm.taobao.org/)
- [yarn](https://yarnpkg.com/)

### 基础知识

- JavaScript(ES6)
  - 定义常量
    - `const number = 1`
  - 定义变量
    - `let count = 1`
  - 箭头函数 
    - `() => {}`
  - 打印日志
    - `console.log('Hello World!')`
  - 遍历数组
    - `array.forEach(item => console.log(item))`
- 使用node提供的模块
  - `require('http')`
  - `require('url')`

### Git

#### Simple Usage

```bash
# 克隆远程仓库到本地
git clone https://github.com/xdsselab/front-end-lessons.git
# 获取远程仓库的更新
git pull
# 添加修改的文件到暂存区
git add <file>
# 提交暂存区的修改到本地仓库
git commit -m "[commit message]"
# 将本地仓库的修改更新到远程仓库
git push
# 将文件移出暂存区
git checkout -- <file>
# 撤销暂存区最近一次提交
git reset HEAD
```

note: 所有操作默认`master`分支。

#### Reference

- [git-简明指南](http://rogerdudler.github.io/git-guide/index.zh.html)
- [git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)

### nodejs

#### Simple Usage

```bash
# 查看版本
node -v
npm -v
# 安装依赖
npm install [--save]
# 运行脚本
npm run <script>
# 运行js文件
node <file>
```

```js
const http = require('http');

const hostname = '127.0.0.1';
const port = 1308;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

#### Reference

- [node-cli](https://nodejs.org/api/cli.html)
- [getting-started-guide](https://nodejs.org/en/docs/guides/getting-started-guide/)
- [http api docs](https://nodejs.org/dist/latest-v8.x/docs/api/http.html)
- [url parse api docs](https://nodejs.org/dist/latest-v8.x/docs/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost)
