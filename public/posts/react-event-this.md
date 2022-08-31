---
title: React-事件回调函数this指向问题
date: 2022-05-13
tags: [Web开发, React]
cover: "https://imgbed.codingkelvin.fun/uPic/CME7bN.png"
top_img: false
categories: [Web开发]
---

初学React时，往往会被组件中的**事件回调函数中的this指向**问题搞得头晕。本文是我的一些*自言自语*，希望自己能给自己讲清楚这个问题。

# 问题分析

故事的开始要从这个<u>错误</u>说起：

![](https://imgbed.codingkelvin.fun/uPic/cNGftU.png)

> **无法从undefined中读取值？**

来看看**源代码**:

```jsx
class Toggle extends React.Component{
  constructor (props) {
    super(props);
    this.state = {isOn: true};
  }
  render() {
    return (
      <h1 onClick={this.switch}>{this.state.isOn ? 'On' : 'OFF'}</h1>
    )
  }
  switch () {
    // 通过上面的报错，问题显然出在这里!
    this.setState((prevState) => {
      return {isOn : ! prevState.isOn};
    });
  }
}
ReactDOM.render(<Toggle/>, document.querySelector('.test'));
```

定义了一个`Toggle`组件，当单击`h1`时，会调用一个事件回调函数switch用于取反`state`中`isOn`属性的值，这样`h1`中的文字就会随着鼠标的点击而变化。

通过报错定位问题，显然问题出在第13行的`this.setState()`上面，报错显示不能从undefined中读取数据，这就是在告诉我们**这里的`this`是undefined**。

冷静分析一下，switch是`Toggle`类中的一个方法，那它里面的`this`就应该指向它的实例化对象，此时的`this`就不应该是undefined。 但是，代码中的switch真的是通过实例化对象调用的吗？*好像不是吧～*

案例中，switch方法**只是被作为一个表达式传入了`h1`的`onClick={}`中，也就是说它是作为`h1`点击事件的回调函数，并没有被`Toggle`的实例对象调用**，这也就导致switch中的值会在它真正被调用的时候确定。

按照这个思路，switch会在`h1`被点击的时候调用，此时`this`也会被定义，那这样的话，`this`更应该指向`windows`才对呀。 这么想其实是正确的，但只在JS的非严格模式中正确。**在严格模式中，`this`禁止指向全局(`windows`)，**指向`windows`的`this`一律为变为undefined。而Babel在转换我们的代码时，会开启严格模式，这也就解释清了为什么switch中的`this`会变为undefined。

# 解决方法

## 1. 使用bind()绑定this指向

既然我们不想`this`因为被谁调用，在哪里调用的问题而改变，所以不如使用`bind()`方法来绑定`this`的指向。

具体代码如下：

```jsx
...
constructor (props) {
  super(props);
  this.state = {isOn: true};
  this.switch = this.switch.bind(this);  // 此时的this就是Toggle
}
...
```

在类中使用`方法名(){}`创建的方法会被添加的这个类的原型中(`Prototype`)，那这个语句的操作就是：**在Toggle类中新建一个方法，这个方法也叫switch，它其实就是经过绑定this后的原型类中的switch。**这样来看，Toggle对象中应该有一个switch，并且在它的原型中还有一个switch。

![](https://imgbed.codingkelvin.fun/uPic/Q5FSTF.png)

不出所料，果然是这样。

> **这种方法并不是最佳实践。首先，它并不直观，方法代码块和修改this指向的代码被分离了。其次，一次只能绑定一个事件函数，那如果你有10个事件函数呢？**

## 2. 使用箭头函数定义方法

**箭头函数**是ES6的新特性，它的特点是<u>自身没有this，它的this由上下文决定</u>。既然没有this，也就不用担心this会被改变的问题。并且方法都定义在类中，那**用箭头函数定义的方法的上下文其实就是这个类的内部，那么这个this也就指向这个类。**

```jsx
...
switch = () => {
  this.setState((prevState) => {
    return {isOn: !prevState.isOn};
  })
}
render() {
  return (
    <h1 onClick={this.switch}>{this.state.isOn ? 'On' : 'OFF'}</h1>
  )
}
...
```

或者，也可以这么写：

```jsx
...
switch () {
  this.setState((prevState) => {
  	return {isOn : ! prevState.isOn};
  });
}
render() {
  return (
    <h1 onClick={() => this.switch()}>{this.state.isOn ? 'On' : 'OFF'}</h1>
  )
}
...
```

> **第二种方式的缺点是，每一次调用都会新生成一个回调函数，所以更推荐使用第一种。**

# 最佳实践

解决上面的问题，并优化代码，看看最终的结果：

```jsx
class Toggle extends React.Component {
  state = {isOn: true};
  render() {
    return (
      <h1 onClick={ this.switch }>{ this.state.isOn ? "On" : "OFF" }</h1>
    );
  }
  switch = () => {
    this.setState((prevState) => ({isOn: !prevState.isOn}));
  }
}
ReactDOM.render(<Toggle />, document.querySelector(".test"));
```

> **推荐阅读：**
>
> - [React Official Guide: Handling Events](https://reactjs.org/docs/handling-events.html)

