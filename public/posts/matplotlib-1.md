---
title: Matplotlib数据可视化——2.绘制各类统计图
date: 2022-01-22
tags: [Python, matplotlib, 可视化]
cover: "https://imgbed.codingkelvin.fun/uPic/ZbL8Y4.png"
top_img: false
categories: [Python]
---

> Matplotlib is a comprehensive library for creating static, animated, and interactive visualizations in Python. Matplotlib makes easy things easy and hard things possible.  --**Matplotlib**

> **注：文中的例子与数据部分来自[C语言中文网](http://c.biancheng.net/matplotlib/)**

# 一. 双轴图

有时一张图上的两幅图像需要绘制两个x轴或y轴才能更加清晰的显示信息，使用Matplotlib中的 **twinx()**和**twiny()** 函数即可创建两个y轴或x轴。

![](https://imgbed.codingkelvin.fun/uPic/MXf5VQ.png)

>**根据官方文档可知twinx代表共享x轴并生成第二个y轴，同理twiny代表共享y轴并生成第二个x轴。**

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.arange(0, 10, 0.1)
fig = plt.figure()
ax1 = fig.add_axes([0.1, 0.1, 0.8, 0.8])
ax1.plot(x, np.log(x))
ax1.set_ylabel('Log')

# 添加第二个y轴
ax2 = ax1.twinx()
ax2.plot(x, np.exp(x), 'r--')
ax2.set_ylabel('Exp')

plt.show()
```

<img src="https://imgbed.codingkelvin.fun/uPic/ascqwerad adawqe.png" style="zoom:40%;" />

# 二. 柱状图

Matplotlib中的 **axes.bar()** 函数可以快速简单的绘制出柱状图，官方文档如下：

![](https://imgbed.codingkelvin.fun/uPic/IWMvaI.png)

```python
import matplotlib.pyplot as plt
import numpy as np

fig = plt.figure()
ax = fig.add_axes([0.1, 0.1, 0.8, 0.8])

langs = ['Python', 'C', 'Java', 'R', 'Go']
students = [20, 10, 19, 5, 8]
ax.bar(langs, students)  # 直接传入x和height数据即可

plt.show()
```

<img src="https://imgbed.codingkelvin.fun/uPic/zxcsqw123123424.png" style="zoom:50%;" />

## 例1: 在同一 x 轴位置绘制多个柱状图

Matplotlib本身并没有提供可以绘制多个柱状图的函数，但可以通过**设置柱状图的宽度和位置来达到这一效果**。

```
import matplotlib.pyplot as plt
import numpy as np

fig = plt.figure()
ax = fig.add_axes([0.1, 0.1, 0.8, 0.8])

data = [[30, 25, 50, 20],
        [40, 23, 51, 17],
        [35, 22, 45, 19]]
x = np.arange(4)

ax.bar(x - 0.25, data[0], width=0.25)  # 错开一个柱子的宽度
ax.bar(x, data[1], width=0.25)
ax.bar(x + 0.25, data[2], width=0.25)

ax.set_xticks([0, 1, 2, 3])
ax.set_xticklabels(['2015', '2016', '2017', '2018'])
ax.legend(['A', 'B', 'C'])

plt.show()
```

<img src="https://imgbed.codingkelvin.fun/uPic/asdqwqrqzxxwqq123.png" style="zoom:60%;" />

## 例2: 堆叠柱状图

axes.bar()函数中有一个**bottom属性**，可以自定义柱状图的底部，因此可以使用该参数绘制堆叠柱状图。

```python
import matplotlib.pyplot as plt
import numpy as np

# 数据
countries = ['USA', 'India', 'China', 'Russia', 'Germany'] 
bronzes = np.array([38, 17, 26, 19, 15]) 
silvers = np.array([37, 23, 18, 18, 10]) 
golds = np.array([46, 27, 26, 19, 17]) 
x = np.arange(5)

fig = plt.figure()
ax = fig.add_axes([0.1, 0.1, 0.8, 0.8])

ax.set_title('2019 Olympics Medal Tally')  # 图表基本信息
ax.set_xlabel('Countries')
ax.set_ylabel('Medals')

ax.bar(x, bronzes, color='#CD853F')
ax.bar(x, silvers, color='silver', bottom=bronzes)  # 银牌的底部是铜牌数量
ax.bar(x, golds, color='gold', bottom=bronzes+silvers)  # 金牌的底部是银牌+铜牌数量

ax.set_xticks([0, 1, 2, 3, 4])
ax.set_xticklabels(countries)
ax.legend(['Bronzes', 'Silvers', 'Golds'])

plt.show()
```

<img src="https://imgbed.codingkelvin.fun/uPic/sdvamedal.png" style="zoom:60%;" />

# 三. 直方图

直方图可以清晰的显示不同数据的分布情况，在Matplotlib中可以使用 **axes.hist()** 函数绘制直方图，官方文档如下：

![](https://imgbed.codingkelvin.fun/uPic/KUr7FF.png)

![](https://imgbed.codingkelvin.fun/uPic/oDluz5.png)

>- **bin代表区间值，可以直接传入bins的数量，也可以用一个列表手动划分区间。**

```python
import matplotlib.pyplot as plt
import numpy as np

fig = plt.figure()
ax = fig.add_axes([0.1, 0.1, 0.8, 0.8])

data = np.array([22,87,5,43,56,73,55,54,11,20,51,5,79,31,27])
ax.hist(data, bins=[0, 25, 50, 75, 100])  # 手动划分区间

plt.show()
```

<img src="https://imgbed.codingkelvin.fun/uPic/ascasdasd1d11d1.png" style="zoom:50%;" />

![](https://imgbed.codingkelvin.fun/uPic/V6nGoI.png)

如上，hist还有很多其他参数，比如可以设置直方图的**样式**：

```python
ax.hist(data, bins=[0, 25, 50, 75, 100], histtype='step', rwidth=0.5)
```

<img src="https://imgbed.codingkelvin.fun/uPic/asdqwqwdqwd222.png" style="zoom:50%;" />

# 四. 饼状图

使用 **axes.pie()** 即可绘制饼状图，官方文档如下：

![](https://imgbed.codingkelvin.fun/uPic/3hRjYW.png)

![](https://imgbed.codingkelvin.fun/uPic/AzHDZR.png)

>**其中比较重要的属性有：x，labels，explode，autopct，radius**，**shadow**
>
>**autopct参数可取值：**
>
>- **%d%%：整数百分比;**
>- **%0.1f：一位小数；**
>- **%0.1f%%：一位小数百分比；**
>- **%0.2f%%：两位小数百分比**
>
>**explode可传入一个由0和1组成的列表，列表中的1位置所对应的区域将被移出到圆外。**

```python
import matplotlib.pyplot as plt
import numpy as np

fig = plt.figure()
ax = fig.add_axes([0.1, 0.1, 0.8, 0.8])

langs = ['C', 'C++', 'Java', 'Python', 'PHP']
students = [23,17,35,29,12]

ax.pie(students, labels=langs, autopct='%0.1f%%', explode=[0, 0, 0, 0, 1], shadow=True)
fig.legend(langs, loc='upper left')

plt.show()
```

<img src="https://imgbed.codingkelvin.fun/uPic/phpasdashdhawuid.png" style="zoom:45%;" />

# 五. 折线图

与最简单的plot原理相同，只需用 **axes.text()** 将对应数值标注即可。

```python
import matplotlib.pyplot as plt
import numpy as np

fig = plt.figure()
ax = fig.add_axes([0.1, 0.1, 0.8, 0.8])
x = [0, 10, 15, 20]
y = [10, 5, 20, 13]

ax.plot(x, y, marker='D', markerfacecolor='orange')
for i, j in zip(x, y):  # zip函数
    ax.text(i, j, str(j), ha='center', va='bottom', fontsize=10)  # text(x, y, str)

plt.show()
```

<img src="https://imgbed.codingkelvin.fun/uPic/zhexiantuasd.png" style="zoom:55%;" />

# 六. 散点图

使用 **axes.scatter(x, y)** 可直接将(x, y)绘制在图中，配合**marker**可改变点的样式。

```python
import matplotlib.pyplot as plt
import numpy as np

fig = plt.figure()
ax = fig.add_axes([0.1, 0.1, 0.8, 0.8])

x = [0, 10, 15, 20, 7.5, 6, 15, 15]
y = [10, 5, 20, 13, 10, 14, 8, 16]
ax.scatter(x, y, marker='s')  # scatter

plt.show()
```

<img src="https://imgbed.codingkelvin.fun/uPic/scatererwsca.png" style="zoom:55%;" />

# 七. 箱形图

**箱型图**（也称为盒须图）于 1977 年由美国著名统计学家约翰·图基（John Tukey）发明。它能显示出一组数据的**最大值、最小值、中位数、及上下四分位数**。

![](https://imgbed.codingkelvin.fun/uPic/guwCKw.gif)

使用 **axes.boxplot(x)** ，仅需传入x值便可自动生成箱形图，官方文档如下：

![](https://imgbed.codingkelvin.fun/uPic/SHvHZJ.png)

> **文档中说明当x是一个二维数组时，将会自动画出其中每一组数据对应的箱形图。**

```python
import matplotlib.pyplot as plt
import numpy as np

fig = plt.figure()
ax = fig.add_axes([0.1, 0.1, 0.8, 0.8])

np.random.seed(100)
x1 = np.random.normal(100, 10, 200)
x2 = np.random.normal(80, 30, 200)
x3 = np.random.normal(90, 20, 200)
data = [x1, x2, x3]

ax.boxplot(data)

plt.show()
```

<img src="https://imgbed.codingkelvin.fun/uPic/fbdfbdfasoiajwd.png" style="zoom:55%;" />

# 附：3D绘图

- 如需更详细的3D绘图教程，可参考[C语言中文网-Matplotlib教程](http://c.biancheng.net/matplotlib/3d-plot.html)。

