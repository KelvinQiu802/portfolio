---
title: DSA in Python - Recursion【递归】
date: 2022-03-10
tags: [Python, 数据结构与算法]
cover: "https://imgbed.codingkelvin.fun/uPic/aqpArn.jpg"
top_img: false
categories: [Python, 数据结构与算法]
---

> **开始前，先看几个关于递归的玩笑：**
>
> - In order to understand recursion, one must first understand recursion.
> - Reminds me of what happens when you google "recursion"
>
> <img src="https://imgbed.codingkelvin.fun/uPic/UbxUa5.jpg" style="zoom:50%;" />
>
> - I like my coffee like I like my coffee......
> - The recursive centaur:
>
> <img src="https://imgbed.codingkelvin.fun/uPic/HuOcPz.jpg" style="zoom:67%;" />

# 什么是递归？

一个最简单的例子，俄罗斯套娃。想要完全展开一个俄罗斯套娃，就需要**不断重复**拆开大的拿出小的，直到拆到最小的**为止**。 没错，俄罗斯套娃已经包含了递归最基本的两个特征：`重复操作` 和 `结束条件`。

<img src="https://imgbed.codingkelvin.fun/uPic/aqpArn.jpg" style="zoom:67%;" />

下面用简单的几句话来描述一下递归的特点：

> - Making problem smaller and smaller.
> - Performe the same operation mutiple times.
> - Ever step have smaller input to make problem smaller.
> - Base condition is needed to STOP the recursion.

# STACK 栈

我第一次听到stack的反应是stack overflow，一个编程答疑交流社区。没错，stack overflow的意思是栈溢出，而其中的stack就是今天要简单介绍的一种数据结构，**栈**。

栈有一个特点，`Last in, first out`，即**先进者后出**。想象一下，当把书叠起来存放时，最先被放在底下的书要最后才能拿出来，而最后放上去的书可以第一个就拿到，这就是一种栈结构。

下面通过几个简单的函数调用来理解一下栈：

```python
def func1():
    func2()
    print("I'am func1")

def func2():
    func3()
    print("I'am func2")

def func3():
    func4()
    print("I'am func3")

def func4():
    print("I'am func4")

func1()

# Result:
I'am func4
I'am func3
I'am func2
I'am func1
```

从结果可以看出，最后被调用的`func4`第一个输出，而第一个调用的`func1`最后一个输出，这符合**先进者后出**的规则。从下面这张图可以更直观的了解栈的结构。

<img src="https://imgbed.codingkelvin.fun/uPic/1A8PwU.png" style="zoom:80%;" />

# 什么时候用递归？

下面的两段程序分别用`递归(recursion)`和`迭代(iteration)`的方法计算**2的n次幂**：

```python
	# With Recursion
	def powerOfTwoRecursion(n):
    if n == 0:
        return 1
    else:
        return 2 * powerOfTwoRecursion(n - 1)
```

```python
# With Iteration
def powerOfTwo(n):
    result = 1
    while n > 0:
        result = result * 2
        n = n - 1
    return result
```

直观来看，递归要比迭代的代码更**简洁**，**直观**，但因为递归每调用一个函数就要存在栈内存中，所以在完成同一件事时会占用更多的内存，耗费更长的时间。按照下面几条可以大致判断出是否要用递归来解决这个问题：

> **When to use recursion?**
>
> - When we can easily breakdown a problem into similar subproblem.
> - When we are fine with extra overhead (both time and space) that comes with it.
> - When we need a quick working solution instead of efficient one.
> - When traverse a tree.
> - When we use memoization in recursion.
>
> **When to avoid it?**
>
> - If time and space complexity matters for us.
> - Recursion uses more memory. If we use embedded memory. For example an application
>   that takes more memory in the phone is not efficient.
> - Recursion can be slow.

# 三步完成一个递归

**下面以`阶乘(Factorial)`为例说明一下构造一个递归的基本三步：**

>**Step1: Recursive Case - the Flow**
>
>**Step2: Base Case - the Stopping Criterion**
>
>**Step3: Unintentional Case - the Constraint**

## Step1: Recursive Case - the Flow

n的阶乘写作`n!`，定义为 `n!=n×(n-1)×...×3×2×1`，也可以写为 `n!=n×(n-1)!` ，没错，从这个式子中已经可以看出递归的影子了，假设把阶乘看为一个函数，那么在第二个式子中，n的阶乘函数调用了n-1的阶乘函数，同时也把`n!`的问题转变为了`(n-1)!`。按照这个思路，`(n-1)!` 又可以转变为 `(n-2)！`的问题，此时问题正在不断的变小。

<img src="https://imgbed.codingkelvin.fun/uPic/截屏2022-03-10 下午9.56.13.png" style="zoom:40%;" />

把上面这个过程用公式表示出来是这样的：`f(n)=n×f(n-1)`， 至此就得到了递归函数的基本公式。

```python
def factorial(n):
        return n * factorial(n - 1)
# 此时只考虑了建立递归的第一步，所以这段代码会陷入无限递归
```

## Step2: Base Case - the Stopping Criterion

`Base Case` 可以被称之为递归的**终止条件**，如果缺少或者终止条件不正确，则会陷入无限递归。寻找递归的终止条件往往需要参考最为特殊的那个条件。比如在阶乘这个例子中，0是所有阶乘最后一个乘数，并且`0!=1`，所以可以很自然地想到当`n=0`时，只需返回一个`1`，就可以结束这个递归，这样就找到了递归的`终止条件`。

```python
def factorial(n):
    if n == 0:  # 加入终止条件使递归可以正常停止
        return 1
    else:
        return n * factorial(n - 1)
```

## Step3: Unintentional Case - the Constraint

在一些递归中，还需要考虑其他可能导致程序崩溃的错误比如输入是否可以是负数，是否可以是小数等等。为了使不合法的参数在被输入时能及时被人们修正，可以使用`assert断言语句`在函数中规定好参数的取值范围，这样就可以在遇到不和法的输入时及时报错。

因为阶乘是定义在大于0的自然数上，所以`负数和小数都不应该被考虑`，这就是我们要找的`束缚条件`。

```python
def factorial(n):
		# 当输入为非正整数时，报错。
    assert n >= 0 and int(n) == n, 'The number must be positive interger!'
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)
```

# 一些例子

## Fibonacci Numbers

>**Step1: f(n) = f(n - 1) + f(n - 2)**
>
>**Step2: f(0) = 0, f(1) = 1**
>
>**Step3: Positive Integer Only**

```python
def fibonachi(n):
    if n in [0, 1]:
        return n
    else:
        return fibonachi(n - 1) + fibonachi(n - 2)
```

## The Sum of Digit (Positive Interger)

>**Step1: f(n) = n%10 + f(n // 10)**
>
>**Step2: When n < 10, return n**
>
>**Step3: Positive Integer Only**

```python
def sumOfDigit(n):
    assert n >= 0 and int(n) == n, 'The number must be a positive interger!'
    if n < 10:
        return n
    else:
        return (n % 10) + sumOfDigit(n // 10
```

## Power of Number

> **Step1: x^n = x * x^(n-1)**
>
> **Step2: When exp=0, return 1**
>
> **Step3: Positive Integer Only**

```python
def power(base, exp):
    assert exp >= 0 and int(exp) == exp, 'The exponent must be a positive integer!'
    if exp == 0:
        return 1
    else:
        return base * power(base, exp - 1)
```

Also, it's not difficult to include the negative integer in the program:

```python
def powerAdvanced(base, exp):
    assert int(exp) == exp, 'The exponent must be an interger!'
    if exp == 0:
        return 1
    if exp < 0:
        return 1 / base * powerAdvanced(base, exp + 1)
    else:
        return base * powerAdvanced(base, exp - 1)
```

## GCD (Greatest Common Divisor)

Using `Euclidean Algorithm（辗转相除法）`.

> **Step1: gcd(a, b) = gcd(b, a%b)**
>
> **Step2: When b == 0, return a**
>
> **Step3: Positive Integer Only**

<img src="https://imgbed.codingkelvin.fun/uPic/截屏2022-03-10 下午10.22.50.png"  style="zoom:45%;" />

```python
# the Euclidean algorithm, or Euclid's algorithm, 
# is an efficient method for computing the greatest common divisor (GCD) 
# of two positive integers

def gcd(a, b):
    assert int(a) == a and int(b) == b, 'The numbers must be interger only!'
    if a < 0:
        a = -1 * a
    if b < 0:
        b = -1 * b
        
    if b == 0:
        return a
    else:
        return gcd(b, a % b)
```

## Decimal 2 Binary

> **Step1: f(n) = n%2 + 10*f(n // 2)**
>
> **Step2: When n=0, return 0**
>
> **Step3: Positive Integer Only**

<img src="https://imgbed.codingkelvin.fun/uPic/截屏2022-03-10 下午10.22.42.png"  style="zoom:40%;" />

```python
def decimal2Binary(n):
    assert int(n) == n and n > 0, 'The number a non-negative interger only!'
    if n == 0:
        return 0
    else:
        return (n % 2) + 10 * decimal2Binary(n // 2)
```

