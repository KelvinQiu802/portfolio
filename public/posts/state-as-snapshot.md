---
title: State as a Sanpshot 状态快照
date: 2022-09-17
---

正式开始前，先看看这两行代码：

```js
const [num, setNum] = useState(0);

setNum(num + 1);
setNum(num => num + 1);
```

问题来了，**对`setNum`的两次调用是一样的吗？**为什么第一次调用传入的是一个**值**，而第二次传入的是一个**函数**呢？

先别急，再看看下面这两段代码：

```js
const [num, setNum] = useState(0);

setNum(num + 1);
setNum(num + 1);
setNum(num + 1);
```

```js
const [num, setNum] = useState(0);

setNum(num => num + 1);
setNum(num => num + 1);
setNum(num => num + 1);
```

这两段代码的运行结果一样吗？最终`num`的结果都是`3`吗？如果真的运行一下这个程序，会发现**结果**分别是：`1`和`3`。

想要了解这其中的原理，只需要理解一个词：***快照***。

> State behaves more like a snapshot. Setting it does not change the state variable you already have, but instead triggers a re-render.
>
> 状态更像是一个快照，更新状态并不会真正改变已有的值，而是触发下一次渲染。

**换句话说：在同一次渲染中，状态的值是不会改变的。**

带着这个结论去看看第一段代码：

```js
const [num, setNum] = useState(0);

setNum(num + 1);  // 0 + 1 = 1
setNum(num + 1);  // 0 + 1 = 1
setNum(num + 1);  // 0 + 1 = 1
```

因为在*同一次渲染中，状态的值不变*，所以`num`一直是`0`，所以三个`setNum(num + 1)`中的值是相同的，都是`0 + 1= 1`，所以不论调用几遍`setNum`，结果一定都是`1`。

> You can pass a *function* that calculates the next state based on the previous one in the queue.
>
> 你可以传入一个函数，这样就可以根据前一个状态来计算当前的状态。

**官方文档中的这句话很直接的告诉我们：如果你想拿到前一个设置的状态，那你可以传入一个函数，我会把前一个的状态传给你。**

所以会看第二段代码：

```js
const [num, setNum] = useState(0);

setNum(num => num + 1);  // 0 + 1 = 1
setNum(num => num + 1);  // 1 + 1 = 2
setNum(num => num + 1);  // 2 + 1 = 3
console.log(num)  // 0
```

可以看到，这里的**每一次状态更新都是基于前一个状态的值**，所以次数的`num`才会累加，结果为`3`。

可是，这不就违背了刚才说的“**在同一次渲染中，状态的值是不会改变的**”了吗？**其实也没有**。在上面例子的最后一行，我把`num`打印出来，发现结果还是`0` 没有变。

这里我故意用了相同的变量名`num`，如果你能分清这两个`num`的区别，那就真正理解了。`setNum`函数中的`num`并**不是当前状态的快照，而是React传入的上一个状态的值**。而最后打印的那个`num`才是真正的状态快照，它在一次渲染里面是不会变的。

**总结来讲：**

1. 每一次渲染中的状态都是一个**快照**，它的值在本次渲染是**不会改变**的。
2. 如果想基于前一个状态来确定当前状态，可以给`setState`**传入一个函数**，来**获得前一个状态的值**。