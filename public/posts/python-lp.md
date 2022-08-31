---
title: Python实现线性规划模型(LP)
date: 2022-01-17
tags: [Python, 建模, 背景]
cover: "https://imgbed.codingkelvin.fun/uPic/008i3skNly1gyh0oz02swj30p70mvmzn.jpg"
top_img: false
categories: [Python]
---

**官方文档：**[scipy.optimize.linprog](httpss://scipy.github.io/devdocs/reference/generated/scipy.optimize.linprog.html?highlight=linprog#scipy.optimize.linprog)

## 一. 官方文档

使用SciPy中的optimize.linprog()函数计算线规划问题，以下为官方文档：

![截屏2022-01-17 下午9.49.14](https://imgbed.codingkelvin.fun/uPic/008i3skNly1gyh0oz02swj30p70mvmzn.jpg)

文档中红色方框内为线性规划算法的标准形式，其中最上方的函数称之为**目标函数**，变量x称之为**决策变量**，下方的等式与不等式称为**约束条件**。值得注意的是此时模型**所求为最小值，并且*不等式约束*中的不等号均为小于等于号**，所以如果想要**计算最大值，则需将c矩阵中所有数值取负，同时因为结果为负数，结果也需要取负变为正**即可得到最大值，如果所求**含有大于等于号，则需在不等式两边同时取负**，改变符号为小于等于。

![截屏2022-01-17 下午10.01.12](https://imgbed.codingkelvin.fun/uPic/008i3skNly1gyh0oxgirvj30nv0iomzg.jpg)

上表为传入参数的具体说明，其中需要注意的是：

>- **A_ub 与 A_eq 均为二维矩阵**
>- **c, b_ub, b_eq 均为一维矩阵**
>- **bounds用来限制变量的范围，格式为(min, max)，如果没有上限或下限可用None替位**

## 二. 举例

### 例1:

<img src="https://imgbed.codingkelvin.fun/uPic/008i3skNly1gyh206uoeij30db09jt91.jpg" alt="截屏2022-01-17 下午10.07.13" style="zoom:70%;" />

此题所求为**最大值**，并且存在一个符号为**大于等于号**的不等约束，应先根据标准公式进行变形，代码如下：

```python
import numpy as np
from scipy import optimize as op

c = np.array([-2, -3, 5])
A_eq = np.array([[1, 1, 1]])
b_eq = np.array([7])
A_ub = np.array([[-2, 5, -1], [1, 3, 1]])
b_ub = np.array([-10, 12])
x1 = (0, 7)
x2 = (0, 7)
x3 = (0, 7)

res = op.linprog(c, A_ub, b_ub, A_eq, b_eq, bounds=(x1, x2, x3))
print(res)
```

得到的结果为：

>con: array([1.19830306e-08])
>
>**fun: -14.57142854231215**
>
>message: 'Optimization terminated successfully.'
>
>nit: 5
>
>slack: array([-3.70231543e-08, 3.85714287e+00])
>
>status: 0
>
>success: True
>
>**x: array([6.42857141e+00, 5.71428573e-01, 9.82192085e-10])**

根据官方文档，x代表最终各个x的取值，fun则代表最终结果。

![截屏2022-01-17 下午10.15.25](https://imgbed.codingkelvin.fun/uPic/008i3skNly1gyh12l37vvj30ok06jmxn.jpg)

---

### 例2：

<img src="https://imgbed.codingkelvin.fun/uPic/008i3skNly1gyh1xtqoaqj30ok0bxwf4.jpg" alt="截屏2022-01-17 下午10.18.15" style="zoom:70%;" />

此题中有两个未知变量，x与a，当遇到两个变量时可先**将一个变量固定，单独研究一个决策变量**。

本题假设固定a，将a的初始值设为0.001，并以0.001位步长，研究分析a从0.001到0.05之间的结果变化，并画出图表。

```python
import numpy as np
from scipy import optimize as op
import matplotlib.pyplot as plt

a = 0.001
c = np.array([-0.05, -0.27, -0.19, -0.185, -0.185])
A_eq = np.array([[1, 1.01, 1.02, 1.045, 1.065]])
b_eq = np.array([1])
A_ub = np.array([[0, 0, 0, 0, 0],  # 因为式中没有关于X0的不等式约束，所以第一行取0
                [0, 0.025, 0, 0, 0],
                [0, 0, 0.015, 0, 0],
                [0, 0, 0, 0.055, 0],
                [0, 0, 0, 0, 0.026]])

while a < 0.05:
    b_ub = np.array([0, a, a, a, a])
    res = op.linprog(c, A_ub, b_ub, A_eq, b_eq, bounds=(0, None))
    plt.scatter(a, -res["fun"])
    a += 0.001

plt.show()
```

结果如下：

<img src="https://imgbed.codingkelvin.fun/uPic/008i3skNly1gyh1xzcmdrj30hs0dcq38.jpg" alt="Figure_1" style="zoom:80%;" />
