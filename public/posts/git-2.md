---
title: Git基础教程2 -【查缺补漏】
date: 2022-04-11
tags: [Git, 文章分享]
cover: "https://imgbed.codingkelvin.fun/uPic/Uq3Zrg.jpg"
top_img: false
categories: [文章分享]
---

当我重读廖哥的[Git教程](https://www.liaoxuefeng.com/wiki/896043488029600)时发现之前没注意到的一些`命令`和`技巧`，本文是作为[Git基础教程1](https://codingkelvin.fun/2022/03/18/git1/)的补充，若想要了解Git的核心思想和方法，还请阅读之前的文章。



# Fast Forward 模式

> 当master分支在创建dev分支之后**并未产生任何新的commit**，此时的合并就叫`Fast Forward`。
>
> 但在`Fast Forward`模式下，删除分支后，会**丢掉分支信息**。

- 如果想要**保留分支信息**，就需要强制禁用`Fast Forward`，此时Git就会在merge时**生成一个新的commit**，这样，从<u>分支历史上就可以看出分支信息</u>。

下图为`Fast Forward`和`no Fast Forward`的对比图，非常直观：

<img src="https://imgbed.codingkelvin.fun/uPic/YGbtIk.png" alt="YGbtIk" style="zoom:60%;" />

想要强制禁用`Fast Forward`模式非常简单，只需要在`merge`命令后添加`--no-ff`，并且附上`commit`的名称：

```shell
$ git merge --no-ff -m "merge with no-ff" dev
```

实战一下， 使用`git log --graph`看看提交后的效果：

<img src="https://imgbed.codingkelvin.fun/uPic/tODx7d.png" alt="tODx7d" style="zoom:450%;" />

![Q8En5j](https://imgbed.codingkelvin.fun/uPic/Q8En5j.png)

果然，无论是在终端还是在开发工具中，都可以看到强制禁用`Fast Forward`模式后，Git确实**保留了分支的信息**。

---

# switch

使用`git checkout [分支]`可以切换分支，但`git checkout --[file]`又可以撤销暂存区内文件的修改。**一个命令，两个完全不同的用途**，用起来多少有些不舒服吧。

所有Git贴心的为我们添加了一个命令：`git switch`

```shell
# 创建并切换到分支
$ git switch -c [分支名]

# 切换分支
$ git switch [分支名]
```

---

# 保存未提交的分支

想象一个场景，当你正在忙碌软件的开发，并且当前的开发还没有达到可以commit的标准，此时老板突然让你新建一个分支`issue-001`去修复一个bug，这时候怎么办？**怎么把当前分支没有提交的内容保存**？

Git为我们提供了一个`git stash`命令来储存<u>未提交的工作区</u>：

```shell
# 保存当前工作区的修改
$ git stash

# 查看当前stash中的内容
$ git stash list

# 将当前stash中的内容弹出，并应用到当前分支对应的工作目录上
$ git stash pop
```

保存后查看`git status`应当是一个**干净的工作区**。当处理完bug后，回到没有提交的分支上，只需执行`git stash pop`即可恢复之前的修改。

---

# 标签管理

> **发布一个版本时，我们通常先在版本库中打一个标签（tag），这样，就唯一确定了打标签时刻的版本。将来无论什么时候，取某个标签的版本，就是把那个打标签的时刻的历史版本取出来。所以，标签也是版本库的一个快照。**

```shell
# 查看已存在标签
$ git tag

# 打一个新标签 (默认标签是打在最新提交的commit上的)
$ git tag <name>

# 在之前的commit上打标签
$ git tag <name> <commit_id>

# 查看标签信息
$ git show <name>

# 删除标签
$ git tag -d <name>
```

