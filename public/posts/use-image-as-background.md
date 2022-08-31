---
title: 将图片或相册作为网页背景
date: 2022-01-15
tags: [前端, 教程, 背景]
cover: "https://imgbed.codingkelvin.fun/uPic/008i3skNly1gyfse876oyj31k70u0tm4.jpg"
top_img: false
keywords: [前端, 教程, 背景]
categories: [Web开发]
---

网站的背景很大程度上决定了网站的美观程度，尤其是内容较少，背景突出的站点。 将图片作为网站的背景既美观又方便，省去了在CSS中费力创作背景的麻烦。

## 一. 选择合适的图片

选择一张合适的图片看起来最简单，但其中的很多细节往往被忽略。

> 选择图片时要注意：**版权**， **图片比例**， **清晰度**， **图片内容**， **图片体积**

### 1. 图片版权

首先，不是所有图片都可以被拿来当作网站的背景，尤其是您的网站涉及商业用途， 下文中我将推荐两个可以免费下载并使用的优质图片网站。

---

#### [Pexels](httpss://www.pexels.com/zh-cn/)

Pexels拥有巨大的图片素材库，并且自带中文站点，使用及其友好，无需登录即可一键下载原图。Pexel官网中也明确标注了所有的图片与视频都可以免费使用，下图是官方给出的免费使用范围：

<img src="https://imgbed.codingkelvin.fun/uPic/008i3skNly1gyfsello3wj30rx09s0tv.jpg"  style="zoom:67%;" />

<img src="https://imgbed.codingkelvin.fun/uPic/008i3skNly1gyfsejdeeij30ie0jx75y.jpg"  style="zoom:50%;" />

从图中可以看出Pexles上的图片与视频都可免费使用，甚至无需标注原作者并且允许自由修改与创造。 **良心！**

---

#### [Unsplash](httpss://unsplash.com/)

与Pexels类似，Unsplash也提供可免费使用的图片，唯一的小缺点就是没有中文站点，国内访问速度可能较慢。Unsplash也同样给出了具体的免费使用条款：

<img src="https://imgbed.codingkelvin.fun/uPic/008i3skNly1gyfsehpbuzj30rx09smxu.jpg"  style="zoom:67%;" />

<img src="https://imgbed.codingkelvin.fun/uPic/008i3skNly1gyfseg6105j30hh09st9d.jpg"  style="zoom:90%;" />

>✅ 所有图片可以免费下载使用
>
>✅ 商业及非商业用途都可使用
>
>✅ 无需任何许可
>
>🚫 禁止在没有对图片进行重大二次创作的前提下售卖
>
>🚫 禁止用Unplash的图片抢他们的生意...

Unplash的使用协议多了一条**“商业及非商业用途都可使用”**，如果涉及商业用途的网站可以优先考虑Unplash。

### 2. 图片比例及内容

- 如果网站主要运行在网页端，建议选择接近**16:9**大小的图片，因为标准的4K/2K/1080P的比例都是16:9，可以保证只对图片进行最小程度的变形。
- 如果网站即要在网页端也在移动端运行，背景图片的压缩变形是不可避免的了，此时就要选择**图片中尽量少出现人，车，动物，家具等形状复杂的物体，因为这些物体一旦变形，对视觉的影响非常大**。大自然的风光图片很适合用来当作背景，因为它们清晰度高，景别大，复杂的物体少。

### 3. 图片体积

为了优化用户体验，一定要在保证对图片质量损失最小的情况下，尽可能压缩图片体积。压缩图片的工具非常多，这里推荐[**Doc Small**](httpss://docsmall.com/image-compress)。

<img src="https://imgbed.codingkelvin.fun/uPic/008i3skNly1gyfsedr6kbj30rx09sglw.jpg" style="zoom:75%;" />

---

## 二. 制作网站

下面将以这张图片作为例子：

<img src="https://imgbed.codingkelvin.fun/uPic/008i3skNly1gyfsebhyi7j31900u0n5c.jpg"  style="zoom:40%" />

首先创建一个div容器用来放置背景图片：

```html
  <style>
    .bg-image{
      background-image: url(bg.jpg);
      height: 100vh;
      width: 100vw;
    }
  </style>
  
  <div class="bg-image"></div>
```

此时，图片充满了整个屏幕，但却没有显示完整，解决方法可以使用 **background-size: cover;** 让图片自动拉伸，适应屏幕大小。 为了防止图片循环重复，加上一句 **background-repeat: no-repeat;** 会更保险。

```html
  <style>
    .bg-image{
      background-image: url(bg.jpg);
      background-repeat: no-repeat;
      background-size: cover;
      height: 100vh;
      width: 100vw;
    }
  </style>

  <div class="bg-image"></div>
```

<img src="https://imgbed.codingkelvin.fun/uPic/008i3skNly1gyfse876oyj31k70u0tm4.jpg" style="zoom:90%;" />

现在的图片已经完全充满屏幕，并且能够根据屏幕的大小自动拉伸调整，但是图片四周却存在白色间隙，通过浏览器调试可以发现这个白色间隙是body的边缘(margin)，此时的数值是8，将它修改到0即可解决问题。

```html
  <style>
    body{
      margin: 0;
    }
    .bg-image{
      background-image: url(bg.jpg);
      background-repeat: no-repeat;
      background-size: cover;
      height: 100vh;
      width: 100vw;
    }
  </style>

  <div class="bg-image"></div>
```

给网页加上些内容，另一个问题又出现了，当内容的长度大于图片的高度时，背景有会恢复位白色，因为此时图片已经完全显示完毕，不会再自动延伸。

<img src="https://imgbed.codingkelvin.fun/uPic/008i3skNly1gyfse2j4gbj30rx09s76a.jpg"  style="zoom:67%;" />

这里只需要将背景图片的定位元素改为fixed，并将图片置于最下层，图片就会永远停留在屏幕上。

```html
  <style>
    body{
      margin: 0;
    }
    .bg-image{
      position: fixed;
      top: 0;
      left: 0;
      background-image: url(bg.jpg);
      background-repeat: no-repeat;
      background-size: cover;
      height: 100vh;
      width: 100vw;
      z-index: -100;
    }
  </style>

  <div class="bg-image"></div>
```

---

## 三. 使用Bootstrap相册作为背景

想要获得更好的视觉效果，可以让背景中的照片滚的起来，下面是我个人网站的例子，可以看到用户甚至可以使用页面下方的bar来自由选择背景照片。

<img src="https://imgbed.codingkelvin.fun/uPic/008i3skNly1gyfsdwfn0uj31hb0nvdks.jpg"  style="zoom:60%;" />

代码直接套用Bootstrap的滚动相册，原理与上述相同：

```html
<!--Back Ground Carousel-->
<div id="carouselExampleIndicators" class="carousel slide vh-100 vw-100" data-bs-ride="carousel"
  style="position: fixed; z-index: -100">
  <div class="carousel-inner">
    <div class="carousel-item active vh-100">
      <img src="bg1" class="d-block vh-100 vw-100" alt="..." />
    </div>
    <div class="carousel-item vh-100">
      <img src="bg2" class="d-block vh-100 vw-100" alt="..." />
    </div>
    <div class="carousel-item vh-100">
      <img src="bg3" class="d-block vh-100 vw-100" alt="..." />
    </div>
    <div class="carousel-item vh-100">
      <img src="bg4" class="d-block vh-100 vw-100" alt="..." />
    </div>
    <div class="carousel-item vh-100">
      <img src="bg5" class="d-block vh-100 vw-100" alt="..." />
    </div>
  </div>
</div>
```

