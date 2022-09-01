---
title: Git基础教程1 -【本地版本控制】
date: 2022-03-18
tags: [Git, 文章分享]
cover: "https://imgbed.codingkelvin.fun/uPic/Uq3Zrg.jpg"
top_img: false
categories: [文章分享]
---

# Git是什么？

> Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.
>
> Git是一个免费的、开源的分布式版本控制系统，旨在以快速高效的方式处理从小型到大型的所有项目。

## 什么是版本控制工具？

### 为什么需要版本控制工具？

不论是在开发过程中或是日常办公中，`版本控制`都是不可忽略的一环，每一次代码版本的迭代都应该记录在`日志`中，并且能随时在版本之间穿梭。其实在使用版本工具之前，大部分朋友也都有了版本控制的思想，比如说下面这位：

<img src="https://imgbed.codingkelvin.fun/uPic/Jk2Wa2.png" style="zoom:50%;" />

虽然说这确实是一种版本控制的方法，但效率极低，也只可能用于个人。`软件工程`绝大多数需要团队合作开发，所以就更需要一个方便可靠的版本管理工具来管理整个团队的项目。

### 集中式版本控制工具

`集中式版本控制工具`需要一台集中管理的服务器，这台服务器里存储了程序所有版本的完整信息，而每一个团队内的人员需要连接到这台服务器取出最新的程序版本。

比较著名的集中式版本控制工具有CVS，SVN…


> - **优势:**
> - 拥有一个`集中管理的服务器`
> - 容易维护，容易管理
> - **缺点:**
> - 当发生服务器`单点故障`时，有丢失全部文件的风险
> - 需要开发者全程联网开发

### 分布式版本控制工具

与集中式不同，`分布式管理工具`在每一个用户的电脑中都存放有程序完整的历史记录，也就是说每一个开发者的电脑中都有与服务器中相同的版本数据，这样不仅方便开发者进行每个 版本之间的查看和管理，还减少了服务器出现故障时的损失。

![](https://imgbed.codingkelvin.fun/uPic/CpW5VZ.png)

`Git`就是一个分布式版本控制工具，它的优点有：`强大的分支系统`，`支持离线工作`， `本地仓库也包含项目完整历史版本`。

------

# Git基础

## 安装Git

Git的安装非常简单，只需前往[Git官网](https://git-scm.com/)选择相应系统下载对应文件即可。

mac用户推荐使用`homebrew`一键安装，在此不多赘述。

安装过程结束后可在`终端`输入`git --version`来检查是否安装成功：

![](https://imgbed.codingkelvin.fun/uPic/ydyfE8.png)

## 文件的状态和工作区域

在Git内，文件被分为三种状态：`已修改(modified)`，`已暂存(staged)`，`已提交(committed)`。

在Git管理项目时的三个工作区域：`工作目录`，`暂存区域`，`本地仓库`。

暂存已修改文件提交暂存区文件工作目录暂存区本地仓库

> **基本的 Git 工作流程如下：**
>
> 1. 在工作目录中修改某些文件。
> 2. 对修改后的文件进行快照，然后保存到暂存区域。
> 3. 提交更新，将保存在暂存区域的文件快照永久转储到 Git 目录中。

------

# 使用Git

## 初次运行Git前的配置

当你在系统上第一次安装Git后都需要进行一次简单的配置，主要的配置内容为`用户名`和`电子邮件地址`，目的是为了让团队内的其他成员知道你是谁。

```
SHELL$ git config --global user.name 用户名
$ git config --global user.email 你的邮箱
```

`--global`选项代表此次设置好的配置将会应用于之后**所有的项目**，当然也可以对单独项目修改不同的用户名和邮箱。

![](https://imgbed.codingkelvin.fun/uPic/LFAKXq.png)

## 在工作目录中初始化新仓库

想要在目录中初始化一个新仓库时要**先将工作目录移动到项目文件夹下**，然后运行初始化命令。

```
SHELL$ git init
```

初始化后，Git会在当前项目目录下生成一个隐藏文件夹`.git`，这里面存储了Git所需要的所有数据和资源，不要轻易删除或改动。

![](https://imgbed.codingkelvin.fun/uPic/UOpiM3.png)

## 跟踪新文件

初始化好一个仓库后可以创建一个`README.md`来当作项目文件，并使用`status`命令来看看现在**仓库的状态**：

```
SHELL$ git status
```

![](https://imgbed.codingkelvin.fun/uPic/by97yW.png)

Git提示有一个文件没有被跟踪，此时就要告诉Git哪些文件是需要**跟踪**的，这样Git才会帮助我们跟踪文件是否有改动。

```
SHELL$ git add [文件名]
$ git status
```

当想要跟踪项目文件夹下的**所有文件**时，使用`git add .`即可。

![](https://imgbed.codingkelvin.fun/uPic/gfTM2h.png)

此时Git提醒我们使用`git rm --cached [文件]`可以**取消暂存**，试试看：

```
SHELL$ git rm --cached [文件]  # 取消暂存，不会删除原文件
$ git rm [文件]  # 取消暂存的同时删除原文件
```

![](https://imgbed.codingkelvin.fun/uPic/by97yW.png)

Git确实将已跟踪的文件移除了，让我们再把它加回来～

此时查看仓库状态时应该与下图相同，Git提示我们**有要提交的变更**。并且Git没有再提示存在没有被跟踪的文件，说明现在我们项目文件夹下的所有文件都已经被Git跟踪。也就是说，现在项目文件夹下的所有文件都已经从`工作目录`进入`暂存区`。

![](https://imgbed.codingkelvin.fun/uPic/WXMTel.png)

## 修改已暂存文件

当要对已经暂存的文件修改时，可以直接修改，但修改之后的文件会变为`已修改`状态，需要我们再次将它添加到`已暂存`。

现在在`README.md`里随便写点东西，然后再用`git status`命令查看仓库状态：

![](https://imgbed.codingkelvin.fun/uPic/15SIVG.png)

![](https://imgbed.codingkelvin.fun/uPic/6lDMkm.png)

此时Git提醒我们有**尚未储存的变更**，需要我们把最新的版本暂存起来。

![](https://imgbed.codingkelvin.fun/uPic/MccOX8.png)

暂存后，再次检查状态，现在一切正常。**所以当每次修改完暂存区内的文件后都需要再次将最新版本的文件添加到暂存区。**

## 提交更新到本地库

### 提交更新

当项目中的所有文件都被添加到`暂存区`，并且是`已暂存`状态时，就可以正式的将代码提交到`本地库`。注意本地库中的代码提交记录是**无法被修改**的，所以每一次对代码的任何操作都会被记录在`日志`内。

使用`commit`命令提交代码：

```
SHELL$ git commit -m "提交说明"
```

也可以使用`git commit`提交，在弹出的编辑器窗口中输入`提交说明`。

![](https://imgbed.codingkelvin.fun/uPic/z4n5a8.png)

可以看到此时已经提交成功，并且Git提示我们：**一个文件被修改，添加一行内容**。

此时再查看仓库状态，Git提示无文件要提交，干净的工作区。

![](https://imgbed.codingkelvin.fun/uPic/D1twXC.png)

在提交完更新后可以通过`日志`查看**提交历史**。

```
SHELL$ git log  # 显示所有提交过的版本信息
$ git reflog  # 方便查看每个操作步骤所在的版本,可以根据版本号自由前进后退
```

- log

![](https://imgbed.codingkelvin.fun/uPic/jVifIR.png)

- reflog

![](https://imgbed.codingkelvin.fun/uPic/cftdLS.png)

`reflog`前的7位字母和数字就是这次提交的`版本号`，比如我这次提交的版本号为`c5a2bdb`。

### 查看日志

现在让我们多进行几次修改并提交，看看`日志`会发生什么变化：

![](https://imgbed.codingkelvin.fun/uPic/Z5ZFry.png)

可以看到现在项目已经有了三个历史版本，当前版本为`ThridCommit`（master分支所在处）。

如果你有IDE或者VSCode这样的文本编辑器，也可以在图形化界面中看到**日志信息**：

![](https://imgbed.codingkelvin.fun/uPic/oxn14O.png)

### 版本穿梭

当你突然后悔对现在版本的修改，或者认为之前的版本更优秀时，就需要在版本之间穿梭，这就要用到Git的`reset`命令。

```
SHELL$ git reset --hard [版本号]
```

举个例子，我现在突然发现第二个版本中的一段代码是个天才之作，但在第三个版本已经被删改了，所以我要想尽办法退回到第二个版本，可能这个操作在其他版本管理工具中实现起来很复杂，但在Git中真的非常简单。

只需先在`日志`中复制第二个版本的版本号，然后使用`reset`命令就可以回到上一个版本，此时再查看`日志`就可以发现`master`分支已经指向了第二个版本。

![](https://imgbed.codingkelvin.fun/uPic/PYFKc6.png)

![](https://imgbed.codingkelvin.fun/uPic/wPYfD5.png)

## 分支

### 什么是分支

`分支（Brench）`，其实就是字面意思，从`主线`上分离出来的分支。开发自己的分支不会影响主线分支的运行，同时并行推进多个版本的开发可以做到互不影响，一个分支出现问题不会影响其他分支。并且当一个分支的任务完成时就可以将这个分支`合并`到主线并删除这个分支。

![](https://imgbed.codingkelvin.fun/uPic/Dvb0Ko.png)

如上图，中间的主干就是`主线（master）`，从主线上分离的两个分支`Feature-1`和`Feature-2`可以同步进行两个不同功能的开发，当分别开发完成后再`合并`到`主线`，这就是分支厉害的地方。

### 新建一个分支

在Git中新建一个分支非常简单，只需要使用`branch`命令新建分支，并使用`checkout`切换分支。

```
SHELL$ git branch [分支名]
$ git branch -v  # 查看已存在分支
$ git checkout [分支名]
```

假设现在我们要开发一个新的需求(Feature_1)，就需要在一个新的分支上进行开发：

![](https://imgbed.codingkelvin.fun/uPic/s2Jbb9.png)

![](https://imgbed.codingkelvin.fun/uPic/ogaD90.png)

此时还没有进行`分支切换`，所以master的前面有一个`*`代表我们目前还在`master`这个分支上进行开发，现在使用`checkout`命令切换分支：

![](https://imgbed.codingkelvin.fun/uPic/4FIiVE.png)

![](https://imgbed.codingkelvin.fun/uPic/aK9N5q.png)

现在我们已经成功切换到了`feature_1`分支。

### 在分支上进行编辑

在分支上编辑和在主干上没什么两样，同样需要暂存文件并提交到工作目录。

假设现在我在`feature_1`这个分支上编辑`README.md`这个文件，它并不会影响到主干，所以我们可以像在主干上一样操作，迭代多个版本，最终再把分支合并到主干。

现在我们来试试看，在`feature_1`分支上对`README.md`进行两次版本更新：

![](https://imgbed.codingkelvin.fun/uPic/41AehR.png)

从日志中可以看出我们已经在`feature_1`分支上做了两次更新，更新后的文件内容可以使用`cat`命令查看：

![](https://imgbed.codingkelvin.fun/uPic/5KaNo4.png)

第一次更新新增了倒数第二行文本，第二次更新新增了倒数第一行文本。

现在我们已经完成了在`feature_1`分支上的编辑，下面就要将`feature_1`合并到`master`。

### 分支的合并

接下来，也到了最后一步，就是将`feature_1`和`master`分支合并。想要将A分支合并到B分支，需要先切换到B分支，然后使用`merge`命令进行合并。

回到案例，想要将`feature_1`合并到`master`分支中，就要先切换到`master`：

![](https://imgbed.codingkelvin.fun/uPic/pbl0pr.png)

切换到`master`后，使用`merge`命令合并两个分支：

```
SHELL$ git merge [分支名]
```

![](https://imgbed.codingkelvin.fun/uPic/OKiULc.png)

输入命令后，Git提示我们`README.md`文件中新增了两行内容，此时分支合并就成功了，让我们来看一下现在主干中的`README.md`文件：

![](https://imgbed.codingkelvin.fun/uPic/PGN1On.png)

果然和想象的一样，主干中的`README.md`确实与`feature_1`中的合并成功了！

### 删除分支

当一个分支的任务完成时，而且已经合并到了主干当中后，就可以将这个分支删除。

```
SHELL$ git branch -d [分支名]
```

![](https://imgbed.codingkelvin.fun/uPic/A2koQ2.png)

此时Git提醒我们`feature_1`已被删除。

### 遇到冲突时的分支合并

当要合并的两个分支**在同一个文件的同一行有着两种完全不相同的修改时**，Git就无法自动将文件合并，此时需要人工审查代码决定谁去谁留。

举例，现在我们创建一个`feature_2`分支，并修改`README.md`文件中的第一行：

![](https://imgbed.codingkelvin.fun/uPic/BlXHOU.png)

现在回到`master`分支中同样修改`README.md`的第一行：

![](https://imgbed.codingkelvin.fun/uPic/Fkpt6e.png)

还记得吗？在`master`中的`README.md`第一行是“# Hello Git! Here is Master”, 而我们在`feature_2`分支中将第一行修改为”# Hello Git! Here is Feature_2!!”，很明显，两次修改不一样，这就制造了一个代码冲突，下面试试看将`feature_2`合并到主干会发生什么。

![](https://imgbed.codingkelvin.fun/uPic/issehi.png)

![](https://imgbed.codingkelvin.fun/uPic/9xtj6X.png)

Git提示我们自动合并失败，需要我们**手动修正**冲突后合并。手动修正冲突的方法简单粗暴，**直接在当前分支进入要修改的文件修改即可**。

现在进入`README.md`中看看到底发生了什么～

![](https://imgbed.codingkelvin.fun/uPic/XIHAsT.png)

Git自动用`<<<<<<<`,`=======`和`>>>>>>>`将两个文件冲突的地方区分了出来，现在要做的就是**手动决定谁去谁留**，并**删除Git添加的这些间隔符**。在此我决定留下`feature_2`的修改：

![](https://imgbed.codingkelvin.fun/uPic/daj1AZ.png)

当人工修改完冲突时，需要再次使用`add`命令将文件添加到暂存区，最后使用`commmit`来完成这此合并的提交。

![](https://imgbed.codingkelvin.fun/uPic/AJqnBk.png)

最后一步，删除`feature_2`分支，大功告成！

> **推荐阅读：**
>
> - [Pro Git](https://gitee.com/progit/1-起步.html)
> - [A Visual Git Reference](https://marklodato.github.io/visual-git-guide/index-en.html#diff)
> - [learnGitBranching](https://github.com/pcottle/learnGitBranching)