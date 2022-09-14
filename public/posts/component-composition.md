---
title: 使用组件组合优化状态传递 Component Composition
date: 2022-09-14
---

在使用React的过程中，*状态的管理和传递*一直是一个比较大的话题。当组件的嵌套达到一定的深度，但又不得不将状态定义在外层组件时，这就会导致需要将状态**通过每一层组件一直传递到目标组件(Props Drilling)**。解决状态传递的方法也有很多，比如说使用Context定义全局状态，或者借助Redux，Mobx这样的状态管理库，但这些方法都过于“**笨重**”，不适合中小型项目。本文将介绍通过**组件组合(Component Composition)**来解决或缓解这个问题。

# Component Composition 组件组合

**组件组合**是什么？其实你应该见到过它，只不过没什么印象。举个例子吧：

```jsx
function App() {
  return (
    <div className='App'>
      <Outer />
    </div>
  );
}

function Outer() {
  return (
    <div>
      <Inner />
    </div>
  );
}

function Inner() {
  return <div>Hello World</div>;
}
```

上面代码的组件结构是这样的：

- App
  - Outer
    - Inner

如果**通过组件组合的方法**实现同样的结构，是什么样子的？

```jsx
function App() {
  return (
    <div className='App'>
      <Outer>
        <Inner />
      </Outer>
    </div>
  );
}

function Outer({ children }) {
  return <div>{children}</div>;
}

function Inner() {
  return <div>Hello World</div>;
}
```

可以看到此时`Inner`并不是写在`Outer`组件的声明中，而是在引用时直接写在了`Outer`标签的内部。另外一个关键点就是`Outer`组件接收了一个`children`属性，这个属性里面就包含了`Outer`标签内部的元素。例子中，`children`里面储存了`Inner`，所以只需要在`Outer`中渲染`children`即可。

没错，这就是**组合组件(Component Composition)**，下面来看看在开发中使用它带来的优势吧。

# 使用组件组合优化状态传递

继续使用上面的例子，假设现在有一个状态`name`不得不定义在`App`组件的内部，不能下沉到`Outer`或者`Inner`，那此时`Inner`想要拿到这个状态就必须通过`Outer`来传递了。

```jsx
function App() {
  const [name, setName] = React.useState('Kelvin');
  return (
    <div className='App'>
      <Outer name={name} />
    </div>
  );
}

function Outer({ name }) {
  return (
    <div>
      <Inner name={name} />
    </div>
  );
}

function Inner({ name }) {
  return <div>Hello {name}</div>;
}
```

这段代码你一定非常熟悉了，平常我们都是这么干的。现在**尝试用上文介绍的Component Composition去解决一下这个问题**。

```jsx
function App() {
  const [name, setName] = React.useState('Kelvin');
  return (
    <div className='App'>
      <Outer>
        <Inner name={name} />
      </Outer>
    </div>
  );
}

function Outer({ children }) {
  return <div>{children}</div>;
}

function Inner({ name }) {
  return <div>Hello {name}</div>;
}
```

成功了！我们打开了`Outer`这个黑盒，成功把`Inner`暴露了出来，这样就可以不通过`Outer`给`Inner`传递状态啦！
