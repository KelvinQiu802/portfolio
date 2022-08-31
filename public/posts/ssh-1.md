---
title: SSH基础知识1 -【登录到远程服务器】
date: 2022-03-22
tags: [SSH]
cover: "https://imgbed.codingkelvin.fun/uPic/iAFkej (1).png"
top_img: false
categories: [文章分享]
---

# 什么是SSH？

`SSH(Secure Shell)`正如其名，它是一种<u>网络协议</u>，用于**加密**两台计算机之间的通信，它主要用于保证`远程登录`和`远程通信`的**安全**。

有兴趣的同学可以先看看下面这个视频，大致了解一下SSH:

<iframe src="//player.bilibili.com/player.html?aid=328444500&bvid=BV1GA411B7Af&cid=199145915&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="100%" height="500"> </iframe>

# 基本用法

## 安装SSH客户端

Linux系统一般都自带有`ssh(SSH客户端)`，如果没有的话需要手动<u>通过命令</u>安装：

```shell
# Ubuntu 和 Debian
$ sudo apt install openssh-client

# CentOS 和 Fedora
$ sudo dnf install openssh-clients
```

安装完成后可以使用`ssh -V`来查看ssh版本，检查ssh是否安装成功。

![8rylFv](https://imgbed.codingkelvin.fun/uPic/8rylFv.png)

## 连接远程服务器

ssh连接远程服务器的基本命令为：

```shell
$ ssh user@hostname
```

> **user**: 想要登陆的用户名；
>
> **hostname**: 可以是IP、域名，也可以是局域网内部的主机名；

假设我想连接到`192.168.56.111(www.codingkelvin.fun) `中的`kelvin`用户，我可以用这两种方式：

```shell
$ ssh kelvin@192.168.56.111
$ ssh kelvin@www.codingkelvin.fun
```

ssh默认连接服务器的`22端口`, 使用`-p`参数可以指定其他端口：

```shell
$ ssh -p 8800 kelvin@www.codingkelvin.fun
```

## 第一次连接

 当使用ssh连接远程服务器时，第一步会进行一个**验证**，验证正在连接的远程服务器是否为**陌生地址**，即<u>之前没有连接过</u>。如果是第一次连接某一服务器，ssh客户端会显示一段文字，表示<u>不认识这台主机</u>，询问是否要继续连接，这时如果**确认连接**输入`yes`即可。

![GFXR0I](https://imgbed.codingkelvin.fun/uPic/GFXR0I.png)

ssh客户端提示我们无法识别这台主机的`指纹`,当输入`yes`后，客户端将会把主机的`指纹`存在**本机**的`~/.ssh/known_hosts`文件内，看看这个文件里现在写了什么：

![8q5hea](https://imgbed.codingkelvin.fun/uPic/8q5hea.png)

果然，刚才那台服务器的`指纹`已经被写在`known_hosts`文件里了，这样当下次再连接这个服务器的时候，就不会再出现**陌生地址**的提示了。

## SSH配置免密登陆

SSH默认采用密码登陆，这种方式**效率低**且**安全性低**。所以推荐花一点点时间配置一下**密钥登陆**，这要比密码登陆方式好太多。

### 何为密钥？

> **密钥（key）是一个非常大的数字，通过加密算法得到。对称加密只需要一个密钥，非对称加密需要两个密钥成对使用，分为公钥（public key）和私钥（private key）。**
>
> **SSH 密钥登录采用的是非对称加密，每个用户通过自己的密钥登录。其中，私钥必须私密保存，不能泄漏；公钥则是公开的，可以对外发送。它们的关系是，公钥和私钥是一一对应的，每一个私钥都有且仅有一个对应的公钥，反之亦然。**
>
> **如果数据使用公钥加密，那么只有使用对应的私钥才能解密，其他密钥都不行；反过来，如果使用私钥加密（这个过程一般称为“签名”），也只有使用对应的公钥解密。**

### 具体步骤

1. 在本地主机生成`公钥`和`私钥`；
2. 将`公钥`发送**给远程服务器**；
3. SSH免密登陆；

#### 生成密钥

在本地主机生成密钥只需要一行代码：

```shell
$ ssh-keygen
```

> `-t`参数用来指定密钥的加密算法，一般会选择 DSA 算法或 RSA 算法，默认使用RSA算法；

运行上面的命令后，客户端会要求用户回答一些问题：

![KO59XL](https://imgbed.codingkelvin.fun/uPic/KO59XL.png)

**<u>第一个问题</u>**：**询问密钥保存的文件名**。默认为`id_rsa`，当然如果你想管理多个密钥的话，建议<u>更改为可读性强的文件名</u>，这里我是给我的一台CentOS虚拟机创建密钥，所以我把文件名取为`centos_rsa`。（**注意**：当没有使用默认文件名时，需要在`config`文件中**指定密钥文件**，后文会介绍到。）

**<u>第二个问题</u>**：**询问是否要为私钥文件设定密码保护。**如果为了方便，可以不设置密码，直接回车，但如果为了安全，<u>建议设置</u>。

**<u>第三个问题</u>**：**再次输入密码以确认**。如果你在第二步设定了密码，需要重新输入一遍，否则直接**回车跳过**即可。

回答完三个问题后，客户端中会显示一些奇怪的图形，此时再查看`.ssh`目录，可以发现目录下面应该<u>多了两个文件</u>：

![aFdNYB](https://imgbed.codingkelvin.fun/uPic/aFdNYB.png)

`centos_rsa`和`centos_rsa.pub`分别为**私钥**和**公钥**，下一步就是要把**公钥**发送到<u>远程服务器</u>。

### 上传公钥

上传公钥可以使用**自动**和**手动**两种方法，本文主要介绍**自动上传**的方法。

ssh提供了<u>自动上传公钥的命令</u>：

```shell
$ ssh-copy-id -i key_file user@host
```

>  `-i`参数用来指定公钥文件，`user`是所要登录的账户名，`host`是服务器地址

回到本地主机，假设我现在要将`公钥(centos_rsa.pub)`发送到`192.168.56.102`中，可以使用下面的命令：

```shell
$ ssh-copy-id -i centos_rsa kelvin@192.168.56.102
```

>  公钥文件可以不指定路径和`.pub`后缀名，`ssh-copy-id`会自动在`~/.ssh`目录里面寻找

![hFKfsv](https://imgbed.codingkelvin.fun/uPic/hFKfsv.png)

输入完密码后，ssh客户端提醒我们**一个密钥已经被添加到了远程服务器**，让我们来试试<u>能否进行免密登陆</u>吧~

![TMRjNZ](https://imgbed.codingkelvin.fun/uPic/TMRjNZ.png)

**奇怪，为什么还要密码才能登录呢？**还记不记得，前面我说过**<u>如果自定义了密钥的文件名，还需配置一下ssh的配置文件！</u>**

### SSH客户端配置文件

客户端的配置文件位于`~/.ssh/config`，如果没有这个文件可以使用命令`touch ~/.ssh/config`创建一个。

下面只介绍一些常用的配置，权威指南请参考其他文章～

```
Host remoteserver  # 自定义主机名称
     HostName remote.example.com  # 主机IP地址或域名
     User neo  # 要登陆的用户名
     Port 22  # 端口
     IdentityFile keyfile  # 密钥文件名
```

下面我用上方CentOS的例子来配置一下配置文件：

```
Host centos
    HostName 192.168.56.102
    User kelvin
    port 22
    IdentityFile ~/.ssh/centos_rsa
```

因为我们已经在配置文件中设定了**主机名**，所以在使用ssh时，可以直接使用`ssh 主机名`进行登录，这样就<u>不必再记忆服务器的IP地址</u>。

保存修改，使用**主机名**连接，再次尝试能否**免密登陆**：

![8zQIhu](https://imgbed.codingkelvin.fun/uPic/8zQIhu.png)

哈哈哈，**不用输入密码，直接连接成功！**

> 更多SSH教程请阅读下文：
>
> https://wangdoc.com/ssh/basic.html