---
title: 由Number引发的思考：如何判断用户输入的值是否为纯数字？
date: 2022-06-23
tags: [Web开发, JavaScript, 文章分享]
cover: "https://imgbed.codingkelvin.fun/uPic/fH8XrP.png"
top_img: false
categories: [文章分享, Web开发]
---

## 问题回顾

最近在阅读[现代JavaScript教程](https://javascript.info), 在Number这一章节中有这么一个**任务**：

<img src="https://imgbed.codingkelvin.fun/uPic/nGnaOT.png" alt="nGnaOT" style="zoom:50%;" />

要求程序接收用户输入的一个值，并且只有当这个值为**数字**的时候才能通过，这其实就是<u>*如何判断一个字符串是纯数字*</u>。在Python中，只需要调用`str.isdigit()`, 或者使用`try except`就可以解决这个问题，但是在JavaScript中，好像并没有一个方便的函数来处理这个问题，并且对一个非数字的字符串强制转换为数字并不会引起错误，所以无法通过捕获异常来进行处理。

## 网上搜索

通过搜索这个问题，我意识到，网上的答案真的是<u>鱼龙混杂</u>，有的完全不靠谱，却还排在很前面，让你第一个看到，简直就是浪费时间。下面的这些**答案多多少少都有问题**，我会在后面一一指出：

### 答案一：

```js
function checkInp() {
  let x = prompt('Enter a number:')
  if (isNaN(x)) 
  {
    alert("Must input numbers");
    return false;
  }
}
```

答者使用`isNaN()`来判断输入的<u>字符串</u>是否为纯字符。乍一看好像没什么问题，如果输入一个字符串`'123aaa'`，`isNaN()`会自动使用`Number()`进行强制转换，那么`123aaa`转换完的结果就是**NaN**，那么就返回**true**，没什么问题呀～

**但是！**因为`isNaN()`会自动调用`Number()`进行强制转换，也就是说，`null`、`''`和`空值`都会被转换为**0**，此时**这种方法在遇到null，空字符串的时候就失效了**。

<img src="https://imgbed.codingkelvin.fun/uPic/pbYjAJ.png" alt="pbYjAJ" style="zoom: 340%;" />

### 答案二：

```js
function readNumber() {
  let userInput;
  do {
    userInput = prompt('Enter a number:');
    if (userInput === null || userInput === '') {
      return null;
    }
  } while (isNaN(userInput));
  return +userInput;
}
```

答案二的本质跟答案一相同，还是使用`isNaN()`来进行判断，只不过它在循环体内部多进行了一次判断，把`null`和`''`的情况单独考虑，也确实能达到目的。

**但是！**`''`和`'  '`是不一样的，他们都会被`Number()`转换为**0**，所以如果遇到用户<u>输入了n个空格</u>，这个方法也就失效了。

### 答案三：

```js
function checkInp()
{
    let x = prompt('Enter a value:')
    let regex = /^[0-9]+$/;
    if (! x.match(regex))
    {
        alert("Must input numbers");
        return false;
    }
}
```

这个答案我询问了一下朋友，可能是最清晰，最推荐的写法，他使用了**正则表达式**。虽然对正则表达式还一无所知，但是通过[正则可视化工具](https://jex.im/regulex/#!flags=&re=%5E(a%7Cb)*%3F%24)也可以理解`/^[0-9]+$/`的作用：

![iItZF8](https://imgbed.codingkelvin.fun/uPic/iItZF8.png)

这个正则表达式的意思就是<u>依次检查每一个字符是否都是在0-9这个区间内，也就是纯数字</u>。如果没有通过这个测试，则可以说明它一定不是纯数字。

 ### 答案四：

因为还没有学过正则，所以有没有**不用正则**的完美方法呢？

哈哈哈，我突然想到了jQuery中的`$.isNumeric()`，它做的事就是判断输入是否为纯数字。既然有了答案，就看看jQuery源码是如何实现这个功能的：

```js
isNumeric: function( obj ) {
	return !isNaN( parseFloat( obj ) ) && isFinite( obj );
}
```

这是我直接从源码中拷贝过来的，不得不说，**确实强**！

分析一下，代码的核心逻辑就是`!isNaN( parseFloat( obj ) ) && isFinite( obj );`

假设输入一个**123aaa**：

1. parseFloat('123aaa') = 123
2. ! isNaN(123) = true
3. Number('123aaa') = NaN
4. isFinite(NaN) = false
5. 结果为 true && false = false

这就是它判断的流程，再举个例子，输入`'  '`；

1. parseFloat('  ') = NaN
2. ! isNaN = false

不论是什么奇奇怪怪的值，好像都能正确的返回，下面我来试着<u>表述一下这么实现的原理</u>：

> **首先：parseFloat() 的转换只针对字符串，所以非字符串转换出来都是NaN，这样就可以规避掉那些非字符串了。**
>
> **其次：parseFloat() 在处理以数字开头，但含有字母的字符串，如: '123aaa'时会忽略掉后面的字母，直接返回123，这其实是我们不想要的，于是jQuery机智的加入了后面的isFinite()，它在遇到'123aaa'这类的字符串时会直接返回false，这样也就规避掉了数字与字母混合的情况。**
>
> **最后：这个方法最妙的其实就是parseFloat()和isFinite()配合使用，因为他们处理字符串的逻辑不同。**