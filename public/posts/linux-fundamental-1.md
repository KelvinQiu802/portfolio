---
title: Linux 基础命令1•基本文件和目录操作
date: 2022-03-13
tags: [Linux]
cover: "https://imgbed.codingkelvin.fun/uPic/ArVasg.png"
top_img: false
categories: [Linux]
---

# 终端命令基础

## 终端命令格式

`command [-options] [parameter]`

- `command` 命令名称
- `[-options]` 选项，可以省略
- `parameter` 参数，可以是**零个，一个或多个**

## 终端命令帮助

`command --help`

- 通过内置查询参数查询命令帮助

`man [parameter]`

- 在文档中查询指令帮助

`command --version`

- 显示版本信息

---

# 开关机重启命令

`shutdown [-options] time [message]`

- 用来系统关机命令。shutdown指令可以关闭所有程序，并依用户的需要，进行重新开机或关机的动作。

> **-r**：shutdown之后重新启动；
>
> **-h**：将系统关机；
>
> **-c** : 取消目前已经进行中的关机动作；
>
> **time** : 设定关机的时间;
>
> **message** : 传送给所有使用者的警告讯息;

```shell
$ shutdown -h now  # 立即关机
$ shutdown -h 10  # 10分钟后关机
$ shutdown -r now  # 立即重启
```

---

# 文件和目录命令

## pwd

`pwd`

- 显示当前工作目录的绝对路径

![pns1Kw](https://imgbed.codingkelvin.fun/uPic/pns1Kw.png)

## ls

`ls [-options] [parameter]`

- 显示目录内容列表

>**-a**  #列出所有文件，包括以 "." 开头的**隐藏文件**。
>
>**-l**  #以**列表**形式输出
>
>**-h**  #列出详细信息并以**可读**大小显示文件大小, 与`-l`一起使用
>
>**-r**  #**逆序**排列

![QXg6lu](https://imgbed.codingkelvin.fun/uPic/QXg6lu.png)

![IOzHED](https://imgbed.codingkelvin.fun/uPic/IOzHED.png)

![H8zAUp](https://imgbed.codingkelvin.fun/uPic/H8zAUp.png)

## tree

`tree [-options] [目录]`

- 树状图列出目录的内容

> **-a**  #显示**所有文件**和目录
>
> **-d**  #只显示**文件夹**目录

![8Y87D9](https://imgbed.codingkelvin.fun/uPic/8Y87D9.png)

## cd

`cd [目录]`

- 切换用户当前工作目录

> `cd` 与 `cd ~` 可切换到**HOME**目录
>
> `cd .` 表示前往**当前**目录
>
> `cd ..` 表示前往**上一级**目录
>
> `cd /` 表示前往**根**目录
>
> `cd -` 表示前往**上一次**工作目录

![3c4ech](https://imgbed.codingkelvin.fun/uPic/3c4ech.png)

## touch

`touch [-options] [parameter]`

- 创建新的空文件

> 在文件名前加上`.`表示**隐藏文件**

![f4vMBh](https://imgbed.codingkelvin.fun/uPic/f4vMBh.png)

## mkdir

`mkdir [-options] [parameter]`

- 用来创建目录

> **-p**  #若所要建立目录的上层目录目前尚未建立，则会**一并建立上层目录**；

![U5GyKH](https://imgbed.codingkelvin.fun/uPic/U5GyKH.png)

## rm

`rm [-options] [parameter]`

- 用于删除给定的文件和目录

> **-f**：**强制**删除文件或目录；
>
> **-d**：直接把欲删除的目录的硬连接数据删除成0，**删除该目录**；
>
> **-i**：删除已有文件或目录之前先**询问**用户；
>
> **-r**：递归处理，将指定目录下的**所有文件与子目录一并处理**；

![mZyGQD](https://imgbed.codingkelvin.fun/uPic/mZyGQD.png)

## cp

`cp [-options] [parameter]`

- 将源文件或目录复制到目标文件或目录中

> **-f**：**强行**复制文件或目录，<u>不论目标文件或目录是否已存在</u>；
>
> **-i**：覆盖既有文件之前先**询问**用户；
>
> **-r**：递归处理，将指定目录下的所有**文件与子目录一并处理**；

![g4pOyZ](https://imgbed.codingkelvin.fun/uPic/g4pOyZ.png)

## mv

`mv [-options] [parameter]`

- 用来对文件或目录重新命名

> **-f**：若目标文件或目录与现有的文件或目录重复，则**直接覆盖**现有的文件或目录；
>
> **-i**：交互式操作，覆盖前先行**询问**用户;

![aUirMa](https://imgbed.codingkelvin.fun/uPic/aUirMa.png)

## cat

`cat [-options] [files]`

- 连接多个文件并打印到标准输出。

> **-b**:   只对**非空行编号**;
>
> **-n**:   对**所有行编号**，从1开始编号;
>
> **-s**:    **压缩连续的空行**到一行;

![2FMStv](https://imgbed.codingkelvin.fun/uPic/2FMStv.png)

## more

`more [-options] [parameter]`

- 显示文件内容，每次显示一屏，适合<u>查看大文件</u>。

| 操作键  |     功能     |
| :-----: | :----------: |
| 空格键  |  显示下一屏  |
| Enter键 | 向下滚动一行 |
|    b    |   回滚一屏   |
|    f    |   前滚一屏   |
|    q    |     退出     |

## grep

`grep [-options] [content] [file]`

- 强大的文本搜索工具

> **-n**:   # 在显示符合范本样式的那一列之前，标示出该列的**编号**;
>
> **-v**:   # **反转**查找;
>
> **-i**:   # **忽略字符大小写**的差别;

![P8zxYP](https://imgbed.codingkelvin.fun/uPic/P8zxYP.png)

---

# 其他命令

## echo

`echo [-options] [parameter]`

- 输出指定的字符串或者变量

![S4YmIL](https://imgbed.codingkelvin.fun/uPic/S4YmIL.png)

## 重定向

`command > file` **输出（覆盖）**

`command >> file`  **追加**

> **使用重定向可以<u>将输出重定向到文件，在文件中写入相应内容</u>。**

![h3Bjo1](https://imgbed.codingkelvin.fun/uPic/h3Bjo1.png)

![kY78Ny](https://imgbed.codingkelvin.fun/uPic/kY78Ny.png)

## 管道

Linux使用 `｜` 连接多个命令，被称为**管道符**，<u>左边命令的输出会变成右边命令的输入</u>，只要第一个命令向标准输出写入，而第二个命令是从标准输入读取，那么这两个命令就可以形成一个管道。

**常用的管道命令有：**

`more`  **分屏显示内容**

`grep`  **在命令执行结果的基础上查询指定文本**

![87wDs4](https://imgbed.codingkelvin.fun/uPic/87wDs4.png)

