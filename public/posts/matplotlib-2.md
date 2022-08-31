---
title: Matplotlib数据可视化——1.绘图基础
date: 2022-01-19
tags: [Python, matplotlib, 可视化]
cover: "https://imgbed.codingkelvin.fun/uPic/ZbL8Y4.png"
top_img: false
categories: [Python]
---

> Matplotlib is a comprehensive library for creating static, animated, and interactive visualizations in Python. Matplotlib makes easy things easy and hard things possible.  --**Matplotlib**

- [官方文档](httpss://matplotlib.org/stable/api/index)

# 一. Figure对象与axes

Matplotlib中的figure可以被形象的理解为一块画布，所有的图表都要画在这张画布上，所以画图的第一步就是创建一个figure对象

```python
import matplotlib.pyplot as plt

fig = plt.figure(figsize=[8, 6])
```

![](https://imgbed.codingkelvin.fun/uPic/yRa4sb.png)

上图为figure的所有属性，最常用的就是**figsize**，推荐单张图表以(6, 4)为大小，单位均为英尺。

创建完figure对象后，程序中已经生成了一块画布，那么现在就可以选定figure的一块区域来做图，在matplotlib中**axes**对象表示figure中的一幅图，接下来就是要在刚刚创建的figure中新建一个axes。

```python
import matplotlib.pyplot as plt

fig = plt.figure(figsize=(6, 4))
ax1 = fig.add_axes([0.1, 0.1, 0.8, 0.8])
```

使用**add_axes**方法可以在figure中添加一个axes，其中的参数为一个列表，列表中四个值代表的意义为**【起点坐标x值，起点坐标y值，宽度，高度】**，四个数的**取值范围均为0-1**， 1代表与figure大小相同，0.5则代表figure大小的一半，下方为官方文档的表述：

![](https://imgbed.codingkelvin.fun/uPic/qce7tZ.png)

此时当添加上一句**plt.show()**将图像显示在屏幕上，因为是刚刚创建图像，所以图像上没有任何内容，如下图：

<img src="https://imgbed.codingkelvin.fun/uPic/Figure_1.png" style="zoom:50%;" />

## 附1：理解Figure，Axes，Axis，Subplot之间的关系

<img src="https://imgbed.codingkelvin.fun/uPic/9NJ4mZ.jpg" style="zoom: 50%;" />

# 二. 设置图表基本信息

一张图表可以自定义的基本信息非常多，如：**标题**，**坐标轴名称**等等，具体可以参考[官方文档](httpss://matplotlib.org/stable/api/_as_gen/mpl_toolkits.axes_grid1.mpl_axes.Axes.html#mpl_toolkits.axes_grid1.mpl_axes.Axes)。

```python
ax.set_title('Hello Matplotlib')
ax.set_xlabel('This is x-axis')
ax.set_ylabel('This is y-axis')
```

<img src="https://imgbed.codingkelvin.fun/uPic/asdqw.png" style="zoom:72%;" />

## 附2：自定义字体

在matplotlib中改变字体大小一般使用**fontdict**，具体方法可参照[官方文档](httpss://matplotlib.org/3.1.0/gallery/text_labels_and_annotations/text_fontdict.html)

```python
font = {'family': 'serif',
        'color':  'darkred',
        'weight': 'normal',
        'size': 16,
        }
plt.xlabel('myFont', fontdict=font)
```

# 三. 简单画个图

在matplotlib中，使用 **plot()** 函数就可以画出最简单的曲线。plot对数据的要求很简单，可以使用numpy来生成两个一维数组传入plot。

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.arange(-10, 10, 0.1)
fig = plt.figure()
ax = fig.add_axes([0.1, 0.1, 0.8, 0.8])
ax.set_title('Hello Matplotlib')
ax.plot(x, x**2)  
ax.plot(x, x**3)	
ax.legend(['x^2', 'x^3'])  # 加上图例
plt.show()
```

<img src="https://imgbed.codingkelvin.fun/uPic/wefedrfg.png" style="zoom:80%;" />

当然为了使图表观赏性更强，plot函数内还有众多参数可以更改，具体可以见[官方文档](httpss://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.plot.html?highlight=plot#matplotlib.pyplot.plot)，一下只列出常用属性：

|      属性      |   描述   |      属性       | 描述  |
| :------------: | :------: | :-------------: | :---: |
|     alpha      |   bool   | markeredgecolor | color |
|   color (c)    | 'orange' | markeredgewidth | float |
| linestyle (ls) | *见下文* | markerfacecolor | color |
| linewidth (lw) |  float   |   markersize    | float |
|     marker     | *见下文* |     visible     | Bool  |

使用**marker**属性将数据点标记出来：

<img src="https://imgbed.codingkelvin.fun/uPic/qwdqwefqewf.png" style="zoom:80%;" />

## 附3: linestyle、marker 和 legend loc

### Linestyle

![](https://imgbed.codingkelvin.fun/uPic/xwIiTW.png)

---

### Markerstyle

| 符号 |      描述      | 符号 |     描述     |
| :--: | :------------: | :--: | :----------: |
| '.'  |     point      | '1'  |   tri_down   |
| ','  |     pixel      | '2'  |    tri_up    |
| 'o'  |     circle     | '3'  |   tri_left   |
| 'v'  | triangle_down  | '4'  |  tri_right   |
| '^'  |  triangle_up   | 's'  |    square    |
| '<'  | triangle_left  | 'p'  |   pentagon   |
| '>'  | triangle_right | '*'  |     star     |
| 'h'  |    hexagon1    | 'D'  |   diamond    |
| 'H'  |    hexagon2    | 'd'  | thin_diamond |
| '+'  |      plus      | '\|' |    vline     |
| 'x'  |       x        | '_'  |    hline     |

---

### Legend loc

![](https://imgbed.codingkelvin.fun/uPic/EsnVSd.png)

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.arange(-10, 10, 1)
fig = plt.figure()
ax = fig.add_axes([0.1, 0.1, 0.8, 0.8])
ax.set_title('Hello Matplotlib')
ax.plot(x, x**2, ls='--', marker='H', markerfacecolor='blue')
ax.plot(x, x**3, ls=':', marker='D', markerfacecolor='red')
ax.legend(['x^2', 'x^3'])
plt.show()
```

<img src="https://imgbed.codingkelvin.fun/uPic/sdvsdvad.png" style="zoom:80%;" />

# 四. 添加多个axes实现图中图

```python
import math
import matplotlib.pyplot as plt
import numpy as np

y = [1, 4, 9, 16, 25, 36, 49, 64]
x1 = [1, 16, 30, 42, 55, 68, 77, 88]
x2 = [1, 6, 12, 18, 28, 40, 52, 65]

fig1 = plt.figure()
ax2 = fig1.add_axes([0.1, 0.1, 0.8, 0.8])
ax2.set_xlabel('Medium')
ax2.set_ylabel('Size')
ax2.set_title('Ads Effect on Sales')
ax2.plot(x1, y, '--', marker='o')
ax2.plot(x2, y, '-', marker='o')
ax2.legend(labels=['TV', 'Phone'], loc='lower right')

# 添加第二个axes
ax3 = fig1.add_axes([0.15, 0.62, 0.3, 0.2])
x = np.arange(0, 2*math.pi, 0.5)
y = np.sin(x)
ax3.plot(x, y, 'r--', marker='x')
ax3.axhline(0, alpha=0.5)
plt.show()
```

<img src="https://imgbed.codingkelvin.fun/uPic/sdvsdvasd.png" style="zoom:80%;" />

# 五. 子图布局的两种方法

## 1. subplots() 实现方形布局

使用**subplots**进行子图布局可以实现**规则的矩形布局**，具体方法如下：

```python
import matplotlib.pyplot as plt
import numpy as np
x = np.arange(-10, 10, 0.5)
# 格式
fig, axes = plt.subplots(2, 2, figsize=(10, 10))  # 注意subplots会返回figure和axes

axes[0][0].plot(x, y1)  # 使用[x][y]来定位子图在图中的位置
axes[0][1].plot(x, y2)
axes[1][0].plot(x, y3)
axes[1][1].plot(x, y4)
plt.show()
```

![](https://imgbed.codingkelvin.fun/uPic/p3hMFd.png)

<img src="https://imgbed.codingkelvin.fun/uPic/ascacawfafr.png" style="zoom:60%;" />

## 2. subplot2grid() 实现Grid布局

grid布局与上方的subplots不同的是grid可以调整每个子图在figure中所占的行和列(**span**)。具体使用方法如下：

![](https://imgbed.codingkelvin.fun/uPic/WYbVhP.png)

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.arange(-10, 10, 0.5)

fig = plt.figure(figsize=(10, 8))

a1 = plt.subplot2grid((3, 3), (0, 0), colspan=2, fig=fig)
a1.plot(x, x)
a2 = plt.subplot2grid((3, 3), (1, 0), colspan=2, rowspan=2)
a2.plot(x, x**2)
a3 = plt.subplot2grid((3, 3), (0, 2), rowspan=3)
a3.plot(x, x**3)
plt.show()
```

> **拿出一行代码仔细分析：**
>
> **a1 = plt.subplot2grid((3, 3), (0, 0), colspan=2, fig=fig)**
>
> **从官方文档中可知subplot2grid会返回一个axes，这里将axes赋值给a1。(3, 3)代表将一个方形分为3*3。(0, 0)代表图表的起点， rowspan和colspan代表跨越的行和列，fig=fig意思是将这一组子图放到fig这个画布中。**

<img src="https://imgbed.codingkelvin.fun/uPic/qweqweds.png" style="zoom:60%;" />

# 六. 设置图表网格样式

Matplotlib中设置网格样式的属性有很多，具体可以参考[官方文档](httpss://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.grid.html?highlight=matplotlib%20axes%20axes%20grid#matplotlib.axes.Axes.grid)，下文将介绍最常用的几种。

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.arange(0, 10, 0.5)

fig = plt.figure(figsize=(8, 6))
ax = fig.add_axes([0.1, 0.1, 0.8, 0.8])
ax.plot(x, x**2)
# 设置网格
ax.grid(visible=True ,  # 网格可见
        color='red',   # 颜色
        ls=':',   # linestyle
        alpha=0.8,   # alpha值
        lw=0.5)  # 线宽
plt.show()
```

<img src="https://imgbed.codingkelvin.fun/uPic/asdascaqw.png" style="zoom:80%;" />

# 七. 设置坐标轴

## 1. 坐标轴外观及边界

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.arange(0, 10, 0.1)
fig = plt.figure(figsize=(8, 6))
ax = fig.add_axes([0.1, 0.1, 0.7, 0.7])
ax.plot(x, x**2)

# 设置y轴为对数
ax.set_yscale('log')  # value{"linear", "log", "symlog", "logit", ...} 

# 设置其他轴（边界）
ax.spines['top'].set_color('None')
ax.spines['right'].set_color('None')
ax.spines['left'].set_color('blue')
ax.spines['left'].set_lw(2)
ax.spines['bottom'].set_color('red')
ax.spines['bottom'].set_lw(3)

plt.show()
```



<img src="https://imgbed.codingkelvin.fun/uPic/dFEvBE.png" style="zoom:30%;" />

## 2. 设置坐标轴范围

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.arange(0, 10, 0.1)
fig = plt.figure(figsize=(8, 6))
ax = fig.add_axes([0.1, 0.1, 0.8, 0.8])
ax.plot(x, x**2)

# 设置坐标轴范围
ax.set_xlim(2, 5)
ax.set_ylim(5, 30)

plt.show()
```

<img src="https://imgbed.codingkelvin.fun/uPic/dvsdvsdvads.png" style="zoom:65%;" />

## 3. 设置坐标轴刻度和刻度标签

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.arange(0, 10, 0.1)
fig = plt.figure(figsize=(8, 6))
ax = fig.add_axes([0.1, 0.1, 0.8, 0.8])
ax.plot(x, x**2)

# 设置坐标轴刻度
ax.set_xticks([1, 2, 3, 5, 7, 9, 15])
ax.set_yticks([1, 10, 20, 100])
ax.set_yticklabels(['A', 'B', 'C', 'D', 'E'])  # 在对应位置设置刻度标签，必须在之前定义好刻度

plt.show()
```

<img src="https://imgbed.codingkelvin.fun/uPic/asdcqwefr e.png" style="zoom:80%;" />