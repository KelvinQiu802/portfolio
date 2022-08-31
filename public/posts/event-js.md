---
title: JavaScript-[事件]-学习与总结
date: 2022-05-03
tags: [JavaScript, Web开发]
cover: "https://imgbed.codingkelvin.fun/uPic/qSnOf3.png"
top_img: false
categories: [Web开发]
---

> `JavaScript`与`HTML`的交互是通过**事件**实现的，事件代表文档或浏览器窗口中某个有意义的时刻。

# 注册与解绑事件

## 传统方法

在JavaScript中指定事件处理程序的传统方法是**<u>把一个函数赋值给DOM元素的一个事件处理程序</u>**。

> `事件处理程序`的名字以`on`开头，因此`click`的事件处理程序叫做`onclick`；

```js
let btn = document.querySelector('button');
btn.onclick = function() {
  alert('Clicked!');
}
```

同理，如果想**解绑**一个使用传统方法设置的事件，只需要**把事件处理程序赋值为**`null`。

```js
btn.onclick = null;
```

- **唯一性**：**同一个DOM元素**对于**同一事件**只可以设置一个**处理函数**。

## 监听注册方式（推荐）

DOM2 为事件处理程序的赋值和移除定义了两个新方法: `addEventListener()` 和 `removeEventListener()`。

- **element.addEventListener(type, listener [, useCapture]);**
  - **type:** 事件类型字符串
    - 注意事件类型前不加`on`
  - **listener:** 事件处理函数
  - **useCapture:**
    - `true`为使用**事件捕获**
    - `false`或默认为使用**事件冒泡**

```js
let btn = document.querySelector('button');
btn.addEventListener('click', function() {
  alert('Clicked!');
});
```

这么看可能无法感觉出监听注册方式的优势，但它最大的优势就是在于**可以对于同一个事件，设置多个处理函数**：

```js
<button>Click Me!</button>

let btn = document.querySelector('button');
btn.addEventListener('click', () => alert('First'));
btn.addEventListener('click', () => alert('Second'));
btn.addEventListener('click', () => alert('Third'));

// First
// Second
// Third
```

如果点击这个**按钮**，可以看到总共有**三个对话框弹出**，说明已经成功在这个按钮的`click`事件上设置多个处理函数。

当想要解绑一个使用监听注册方式注册的事件时，只可以使用`removeEventListener()`。

此时需要注意，**使用匿名函数作为事件处理函数的事件则无法被删除**：

```js
let btn = document.querySelector('button');
btn.addEventListener('click', function() {
  alert('Clicked!');
});
// 下面这样是错误的
btn.removeEventListener('click', function() {
	alert('Clicked!');
})
```

看似这两个方法内的处理函数是相同的，但它们**是两个完全不同的函数对象**。

```js
let btn = document.querySelector('button');
function sayHello () {
	alert('Hello');
}
btn.addEventListener('click', sayHello);
// 这样才对
btn.removeEventListener('click', sayHello)
```

# DOM事件流

> **事件流描述了页面接受事件的顺序。**

当你点击一个按钮时，实际上不光点击了这个按钮，还点击了它的容器以及整个页面，那么**事件触发的顺序**会是怎么样？

现代主流浏览器都支持**两种事件流模型**：`事件冒泡` 和 `事件捕获`，下文将详细阐述二者的区别。

<img src="https://imgbed.codingkelvin.fun/uPic/e7NtAE.tif" alt="DOM事件流" style="zoom:40%;" />

## 事件冒泡

**事件冒泡**是IE提出的模型，即**从内到外，从深到浅触发事件**，就像一个泡泡从水底一直上升到水面。

<u>举个例子</u>：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Document</title>
  </head>
  <body>
    <div>Click Me</div>
  </body>
</html>
```

在点击页面中的`<div>`后，`click`事件会如以下事件发生：

1. `<div>`
2. `<body>`
3. `<html>`
4. `document`

也就是说，点击`div`后，`click`事件沿着DOM树一路向上，在经过的每个节点依次触发，直至到达document对象。

```js
<div class="father">
	<div class="son"></div>
</div>

let father = document.querySelector('.father');
let son = father.firstElementChild;

father.addEventListener('click', () => console.log('Father'));
son.addEventListener('click', () => console.log('Son'));

// Son
// Father
```

## 事件捕获

**事件捕获**是网景提出的另外一种模型，与事件执行顺序**事件冒泡相反**，即**从外到内，从浅到深**，就像一颗石头掉入水，被水捕获。

同样使用上方的例子，在捕获模型中的执行顺序是：

1. `document`
2. `<html>`
3. `<body>`
4. `<div>`

> **由于旧版本浏览器不支持，通常建议使用事件冒泡，特殊情况下可以使用事件捕获。**

```js
<div class="father">
	<div class="son"></div>
</div>

let father = document.querySelector('.father');
let son = father.firstElementChild;

father.addEventListener('click', () => console.log('Father'), true);
son.addEventListener('click', () => console.log('Son'), true);

// Father
// Son
// 与事件冒泡输出的顺序相反
```

# 事件对象

在浏览器中，`event`对象是传给事件处理程序的唯一参数。

事件对象包含了事件的**基本信息**，比如导致事件的元素，发生的事件类型，鼠标的坐标，键盘的按键等等....

先简单输出一个`click`事件的事件对象看看：

```js
let btn = document.querySelector('button');
btn.addEventListener('click', event => console.log(event));
```

<img src="https://imgbed.codingkelvin.fun/uPic/YDcESb.png" style="zoom:30%;" />

可以看到有这么一大堆属性，本文将会选几个最重要最常用的进行说明。

- **event.target** 返回**触发事件**的对象
  - `this` 返回的是**绑定事件的对象**
  - `event.currentTarget` 与 `this` 功能相同，返回**绑定该事件的对象**
- **event.type** 返回**事件类型**
  - `click`, `mouseon`, `keydown` 等等
- **event.preventDefault()**  **阻止默认事件**
  - 禁用链接跳转
  - 禁用提交按钮提交数据
- **event.stopPropagation()**  **阻止事件冒泡**

```js
// 阻止链接跳转
<a href="www.google.com">Google</a>

let a = document.querySelector('a');
a.addEventListener('click', e => e.preventDefault());
```

```js
// 阻止事件冒泡
<div class="father">
	<div class="son"></div>
</div>

let father = document.querySelector('.father');
let son = father.firstElementChild;

father.addEventListener('click', e => console.log('Father'));
son.addEventListener('click', e => {
  console.log('Son');
  e.stopPropagation();
});

// Son [不会输出Father] 
```

# 事件委托

如果我们页面中有非常多的按钮，每一个按钮都需要绑定一个`click`事件，这样生成的每一个事件处理函数都是一个对象，都占用内存空间，对象越多，性能越差。

为了解决这个问题，可以利用**事件委托**。事件委托利用**事件冒泡**，可以**只用一个事件处理程序来管理一种类型**的事件。

- 使用事件委托，只要<u>**给所用元素共同的祖先节点添加**</u>一个事件处理程序即可。

**例:**

```js
<ul>
  <li id="one">Click</li>
  <li id="two">Click</li>
  <li id="three">Click</li>
</ul>

let ul = document.querySelector('ul');
ul.addEventListener('click', function (e) {
  switch (e.target.id) {
    case 'one':
      // do something
      break;
    case 'two':
      // do something
      break;
    case 'three':
      // do something
  }
});
```

# 事件类型

由于Web浏览器中可以发生的事件有太多太多，在此只列举最常用的一些，具体还请参考官方文档[事件参考](https://developer.mozilla.org/zh-CN/docs/Web/Events)。

## 鼠标事件

<img src="https://imgbed.codingkelvin.fun/uPic/a1KpnQ.png" style="zoom:40%;" />

- **contextmenu 禁用右键菜单**

```js
document.addEventListener('contextmenu', e => e.preventDefault());
```

- **selectstart 禁止鼠标选中**

```js
document.addEventListener('selectstart', e => e.preventDefault());
```

<img src="https://imgbed.codingkelvin.fun/uPic/8GW35L.png" style="zoom:40%;" />

## 键盘事件

- **onkeyup**  松开时触发
- **onkeydown**  按下时触发
- **onekypress**  按下时触发 （**不能识别功能键**） 
- **e.key**  获得被触发的键

>  **执行顺序：先keydown，再keypress，最后keyup**
>
> **keydown 和 keypress在文本框中，先触发，然后文字才被输入**