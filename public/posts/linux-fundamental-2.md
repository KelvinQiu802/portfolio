---
title: Linux 基础命令2•用户/组和权限管理
date: 2022-03-29
tags: [Linux]
cover: "https://imgbed.codingkelvin.fun/uPic/IJTh2M.jpg"
top_img: false
categories: [文章分享]
---
`用户`是Linux系统工作中非常重要的一环，用户包括`用户`与`组`管理。 同时，`权限`也是Linux的一个**核心概念**，Linux可以对一个**用户**设定权限，对一个**组**设定权限，甚至还可以对一个**文件或目录**设置权限。

# 了解用户权限

Linux将权限分为**三部分**：`读`、`写`与`执行`，详细见下表：

|        权限         | 缩写 | 代号 |
| :-----------------: | :--: | :--: |
|   **读（read）**    |  r   |  4   |
|   **写（write）**   |  w   |  2   |
| **执行（execute）** |  x   |  1   |

通过`ls -l`命令可以查看<u>不同用户和组对文件和目录的权限</u>：

<img src='https://imgbed.codingkelvin.fun/uPic/kaz5Fw.png' alt='kaz5Fw'/>

在之前的文章中，我们已经学会使用`ls`命令，但却没有关注前面的这些参数，其实它们**非常重要**～

现在我把上图中用红色框框起来的部分整理出来：`d` `rwx` `r-x` `r-x` `kelvin` `kelvin`

可能现在看这一串字符会毫无头绪，但请听我慢慢讲给你～

> **第五个红框**中的`kelvin`代表当前文件或目录的**拥有者**，因为这是<u>我创建的文件夹</u>，而我的用户名为`kelvin`所以<u>我便是这个文件夹的拥有者</u>；
>
> **第六个红框**代表**所属用户组**，<u>系统默认创建的组与用户同名</u>，因为我的用户名是`kelvin`所以系统自动创建了一个名为`kelvin`的组，并将我加了进去。
>
> **第一个红框**中的`d`代表这是一个**文件夹**，如果是一个文件的话，会用`-`来占位；
>
> **第二个红框**代表文件或目录**拥有者**所获得的权限，`rwx`就代表拥有者同时具有**读、写、执行**的权限。
>
> **第三个红框**代表的是**用户组内的用户**所获得的权限，案例中，**组内的成员**权限为`r-x`代表仅**可以阅读和执行**文件但**不能修改**文件内容。
>
> **第四个红框**代表**其他用户**(<u>既不是拥有者，也不在该用户组内</u>)所获得的权限，上图中权限为`r-x`，说明其他用户的权限与组内用户**权限相同**。

上面这些基本的权限知识**非常重要**，接下来的操作都会围绕这一系列权限展开。

---

# 普通用户与超级用户

Linux将用户分为`普通用户`与`超级用户(root)`，**普通用户**<u>只拥有自己和自己所在组所应有的文件权限</u>，但<u>超级用户的权限接近于无限</u>，可以修改几乎Linux的任何文件。

有一些操作`普通用户`无法进行，比如在系统层面的软件安装，新建用户，修改系统文件的权限等等。这时就需要`普通用户`临时切换到`超级用户`来执行这些命令。

## 切换到超级用户

为了能够执行`超级用户(root)`才能执行的命令，有的时候我们不得不切换到`超级用户`，这里介绍一个**切换用户**的命令：

```shell
$ su 用户名
$ su - 用户名  # 可直接进入用户的家目录
```

- 用于切换当前用户身份到其他用户身份

> **-l**：改变身份时，也同时变更工作目录；
>
> 若不输入**用户名**，则默认切换为**root**用户，<u>不建议使用默认用户</u>；

<img src='https://imgbed.codingkelvin.fun/uPic/L9YbNa.png' alt='L9YbNa'/>

## 以超级用户身份来执行命令（推荐）

上文切换用户的方法在平时用的很少，一是因为<u>切换用户比较麻烦</u>，二是切换到`root`容易做出一些**危险**操作，<u>危害系统和文件安全</u>。

这里推荐一种更常用的方法，即**不切换到root，但却以root的身份执行命令**：

```shell
$ sudo 用户名
```

> 同样，如果不输入用户名，系统默认为**root**;

`sudo`命令后会要求你**输入密码**，此时Linux会倒计时**五分钟**，在这五分钟之内，如果你再次使用`sudo`来执行命令，可以**免密**。

<img src='https://imgbed.codingkelvin.fun/uPic/mRWMxA.png' alt='mRWMxA'/>

---

# 用户组管理

当在一个多人项目中，为每个用户单独设置权限未免过于麻烦，但**用户组**的存在可以让你<u>为一个用户组设定权限</u>，并<u>将用户添加到这个用户组中</u>，这样这些用户就拥有了这个用户组所拥有的权限。

## 新建与删除用户组

**添加与管理组**均需要使用**超级用户身份**来进行：

```shell
# 新建用户组
$ groupadd 组名

# 删除用户组
$ groupdel 组名
```

现在先试试建立一个**组**，命名为`dev`，输入完命令后没有保存，但怎么才能知道**是否创建成功**了呢？现在我来给你介绍一个文件，`/etc/group`这个文件放在`etc`文件夹下，说明它与系统配置有关，没错，`/etc/group`里就存着用户组的信息，让我们看看：

<img src='https://imgbed.codingkelvin.fun/uPic/elxfw7.png' alt='elxfw7'/>

结果可能有一堆，但我们现在只关心最后两行。这里显示了两个组，`kelvin`和`dev`，`kelvin`是我在建立用户的时候系统默认创建的，而`dev`则是刚刚我手动通过命令创建的。**组名**后的数字为`GID（组标识）`，通过**GID**可知`kelvin`的组号是`1000`，`dev`的则是`1001`。

细心的你可能会发现为什么`kelvin`的组号后面还跟着一个`kelvin`，而`dev`的组号的后面只有一个冒号呢？这是因为**<u>每个组的最后一个值代表以这个组为附加组的成员</u>**，`kelvin`这个用户自然就在`kelvin`组内，而`dev`是刚刚新建的，自然就<u>没有用户在内</u>了。

在下文中我会详细介绍如何**管理组内的成员**～

---

# 用户管理

Linux是**多用户操作系统**，所以对于用户的管理也是Linux非常重要的一部分。

用户管理也属于管理员的责任，所以与用户管理有关的命令也需要以`超级用户(root)`的身份来运行。

## 基本用户管理命令

### 用户的创建和删除

基本的用户管理操作包括：`创建用户`、`设置密码`、`删除用户`。

```shell
# 创建用户
$ useradd -m -G 组名 用户名

# 设置密码
$ passwd 用户名

# 删除用户
$ userdel -r 用户名
```

> ***创建用户：***
>
> **-g** <群组>：指定用户所属的**主组**；
>
> **-G** <群组>：指定用户所属的**附加群组**；
>
> **-m**：自动建立用户的家目录；
>
> ***删除用户：***
>
> **-f**：强制删除用户，即使用户当前已登录；
>
> **-r**：删除用户的同时，删除与用户相关的所有文件；

试一下吧～现在新建一个用户`lydia`, 并将`lydia`的**附加组**设定为`dev`：

<img src='https://imgbed.codingkelvin.fun/uPic/vxWe4s.png' alt='vxWe4s'/>

此时再去看看`/etc/group的情况`：

<img src='https://imgbed.codingkelvin.fun/uPic/PkdAOI.png' alt='PkdAOI'/>

看看最后三行，果然`lydia`已经被添加到`dev`组中，并且系统也自动创建了名为`lydia`的组作为`lydia`的**主组**。

### 向组内添加或删除用户

#### usermod

```shell
# 设置用户所在组
$ usermod -G 组名 用户名
```

> **-g** <群组>：修改用户所属的**主组**；
>
> **-G** <群组>；修改用户所属的**附加群组**；
>
> 若想**加入多个组**，则可使用`,`来隔开每个组名；

试试看将`kelvin`加入`dev`用户组：

<img src='https://imgbed.codingkelvin.fun/uPic/bGNWI0.png' alt='bGNWI0'/>

成功，在`/etc/group`中已经可以看到用户信息。

> **注意：**`usermod`的功能是**设置**用户的组，并非**添加或删除**用户的组；
>
> 假设用户A已经在a组中，如果想使用`usermod`再将A添加到b组中，就必须将a、b都写上去，即`usermod -G a, b A`;
>
> 如果仅仅写成`usermod -G b A`，则用户A所属的a组会被删除。

#### gpasswd

上文提到使用`usermod`设置用户所在组**并非真正意义上的添加或删除**用户的组，使用`gpasswd`命令可以更<u>方便</u>地调整用户所在组：

`gpasswd [-options] [用户名] [组名]`

> **-a**：添加用户到组；
>
> **-d**：从组删除用户；

实战一下，现在我想把`kelvin`用户移除`dev`组，然后再把它添加回来：

```shell
# 将kelvin移除dev组
$ gpasswd -d kelvin dev

# 将kelvin加到dev组
$ gpasswd -a kelvin dev
```

先执行<u>移除</u>命令：

<img src='https://imgbed.codingkelvin.fun/uPic/QI28qC.png' alt='QI28qC'/>

果然，现在`dev`组中只剩下`lydia`了～ 再<u>加回来</u>试试看：

<img src='https://imgbed.codingkelvin.fun/uPic/BEYsqf.png' alt='BEYsqf'/>

哈哈，又加回来了！是不是使用`gpasswd`来管理用户的**附加组**要比`usermod`更方便呢？

## 查看用户信息

### 基本命令：

下面我将介绍几个<u>查看用户信息</u>的基本命令：

```shell
# 查看用户的UID(用户代号)和GID(组代号), 默认为当前用户
$ id [用户名]

# 查看用户所在的组，默认为当前用户
$ groups [用户名]

# 查看当前所有登陆的用户列表
$ who

# 查看当前登陆的用户名
$ whoami
```

动手试试看：

<img src='https://imgbed.codingkelvin.fun/uPic/WxUmc3.png' alt='WxUmc3'/>

通过**id**命令可以看到用户的`UID`、`GID`和所属**组**，可以看到`kelvin`这个用户加入了两个组，一个是`kelvin`一个是`wheel`。`wheel`是一个比较特殊的组，这个组内的成员可以有一些**特殊的权限**，比如使用`su`切换到`root`用户，或者用`sudo`以超级用户身份来执行命令。

<img src='https://imgbed.codingkelvin.fun/uPic/9Wpm5w.png' alt='9Wpm5w'/>

使用`group`来看看我现在的用户所在的组，这种方式要比去`/etc/group`里面查找方便的多。

<img src='https://imgbed.codingkelvin.fun/uPic/Ax6ERP.png' alt='Ax6ERP'/>

通过`who`命令可以查看所有登陆的用户列表，因为只有我一个人登陆，所以只有一个用户。试试再开一个终端，登陆新建立的`lydia`账户：

<img src='https://imgbed.codingkelvin.fun/uPic/UJUxDw.png' alt='UJUxDw'/>

果然，现在已登陆的用户变成了两个～

`whoami`这个命令非常好理解，就是它的英文意思“Who am I？”，我是谁？

<img src='https://imgbed.codingkelvin.fun/uPic/FuBI7D.png' alt='FuBI7D'/>

哈哈哈，果然，我就是`kelvin`。

### /etc/passwd 文件

与组的信息类似，用户的信息也存储在`etc`文件夹下：`/etc/passwd`，现在来看看这个文件里有些什么：

<img src='https://imgbed.codingkelvin.fun/uPic/wkp6L9.png' alt='wkp6L9'/>

眼熟吧，又是用`:`隔开的各种参数，我来给你解释一下它们的意思：

> 1. **用户名**
> 2. **UID**
> 3. **GID**
> 4. **用户家目录**
> 5. **Shell**

### 关于Shell

什么？你说你不懂`Shell`是什么？ 哈哈哈

**Shell**其实就是终端内运行的**软件**，比如`kelvin`这个用户使用的Shell就是`zsh`，而`lydia`使用的是`bash`。这两个Shell并<u>不会有什么本质的区别</u>，只是在一些功能上会有些不同的体验。

```shell
# 查看当前使用的Shell
$ echo $SHELL

# 查看系统中的所有Shell
$ cat /etc/shells
```

<img src='https://imgbed.codingkelvin.fun/uPic/hrcI2k.png' alt='hrcI2k'/>

这种方式与去到`/etc/passwd`里查看相比会更简单。

<img src='https://imgbed.codingkelvin.fun/uPic/BvTUkR.png' alt='BvTUkR'/>

`/etc/shells`中存储着系统中所有的Shell，如果**忘记路径或名称**可以来这里看。

```shell
# 为用户切换Shell
$ usermod -s /bin/bash 用户名
```

通过上面的命令可以**切换用户的Shell**，但每次切换之后需要用户**退出再重新登陆**才能生效。

关于Shell的详细内容以后会出文章介绍～

---

# 修改文件权限

还记得在文章的最开始我们最先讨论了`ls -l`输出的内容的详细信息吗？

<img src='https://imgbed.codingkelvin.fun/uPic/kaz5Fw.png' alt='kaz5Fw'/>

就是这张图，现在要做的是**试着修改这里面的信息**，也就是**修改文件权限**。

## 修改文件拥有者

文件的拥有者被称为`owner`，所以修改文件拥有者的命令也非常好记，即`chown（change owner）`:

`chown [用户名] [文件/目录]`

- 用来变更文件或目录的拥有者或所属群组

> **-R**: 递归处理，将指定目录下的所有文件及子目录一并处理;

![xos0JK](https://imgbed.codingkelvin.fun/uPic/xos0JK.png)

现在有一个`01.py`文件，拥有者是`kelvin`，让我们试试将文件拥有者改为`lydia`:

![9fqUL7](https://imgbed.codingkelvin.fun/uPic/9fqUL7.png)

在输入密码后，命令生效，`lydia`已经成为`01.py`的拥有者。此时`kelvin`对这个文件的权限为`r-x`，来验证一下`kelvin`是不是真的不能修改`01.py`：

![1aXtOY](https://imgbed.codingkelvin.fun/uPic/1aXtOY.png)

果然，当用Vim打开`01.py`时显示只读。

## 修改文件所属组

当修改完文件拥有者后，还可以对其**所属组**进行修改。命令同样非常好记`chgrp (change group)：`

`chgrp [组名] [文件/目录]`

- 用来变更文件或目录的所属群组

> **-R**：递归处理，将指令目录下的所有文件及子目录一并处理；

试着把`01.py`所属的组改成`dev`：

![MZMWao](https://imgbed.codingkelvin.fun/uPic/MZMWao.png)

很简单吧，现在`01.py`的所属组已经被改为`dev`。

## 修改文件权限

修改文件权限是Linux非常重要的技能，同时也体现了Linux的灵活和强大，而且更改权限的方式非常精妙，让我来给你讲讲～

文章开头有一个关于权限的表格，我现在再给搬过来：

|        权限         | 缩写 | 代号 |
| :-----------------: | :--: | :--: |
|   **读（read）**    |  r   |  4   |
|   **写（write）**   |  w   |  2   |
| **执行（execute）** |  x   |  1   |

三种权限非常容易理解，但它们的**代号**是什么意思呢？其实奥妙就在其中！

Linux使用**代号的代数和来表示权限**。举个例子，比如一个文件的权限是`rwx`那它的权限可以被表示为`7`，即4+2+1； `rw-`可以被表示为`6`，即4+2。 有没有感觉非常神奇？ 它们的代数和是**不会重复**的，所以用这种方法来表示权限真的是非常的<u>精妙</u>！

### chmod

`chmod 755 [文件/目录]`

> **-R**：递归处理，将指令目录下的所有文件及子目录一并处理；

这次我直接给你了一个例子，通过这个命令来解释`chmod`的用法。

命令中的`755`是三类权限的组合，即`拥有者` `组` `其他用户`，所以`755`的意思为`拥有者`的权限为`rwx`，`组`和`其他用户` 的权限为`r-x`。

举个例子：

将`01.py`拥有者的权限修改为`rwx`，即`7`，`组`内用户的权限设置为`--x`，即`1`，`其他用户`的权限设置为`--x`，即`1`：

![Y94lYm](https://imgbed.codingkelvin.fun/uPic/Y94lYm.png)

此时通过显示已经可以看出权限修改成功，我们来验证一下：

`kelvin`现在在`dev`组内，试试看他能不能阅读`01,py`：

![kYdbfT](https://imgbed.codingkelvin.fun/uPic/kYdbfT.png)

果然，权限不够，看来我们成功啦～

