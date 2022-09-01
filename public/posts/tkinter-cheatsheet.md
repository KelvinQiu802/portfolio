---
title: Tkinter内置属性及方法速查表
date: 2022-03-02
tags: [Python, Tkinter, GUI]
cover: "https://imgbed.codingkelvin.fun/uPic/kXXYdu.png"
top_img: false
categories: [Python]
---

> [*Tkinter* 8.5 reference: a GUI for Python](https://anzeljg.github.io/rin2/book2/2405/docs/tkinter/index.html)

# Grid

```python
a.grid(row=0, column=0)
b.grid(row=1, column=1)
c.grid(row=2, column=0, columnspan=2)
d.grid(row=0, column=2, rowspan=2)
```

[Grid Ref](https://anzeljg.github.io/rin2/book2/2405/docs/tkinter/grid.html)

# Window

```python
window = tk.Tk()
window.title()
window.geometry()
window.resizable()
window.config()
```

# Label

```python
label = tk.Label(window, 
                text="", 
                width=10, 
                height=10, 
                font=(),
                bg='orange')
```

[Label Ref](https://anzeljg.github.io/rin2/book2/2405/docs/tkinter/label.html)

# Button

```python
button = tk.Button(window, 
                   text="", 
                   width=10, 
                   height=10, 
                   state=tk.ACTIVE, 
                   image="",
                   command=abc)
```

[Button Ref](https://anzeljg.github.io/rin2/book2/2405/docs/tkinter/button.html)

# Entry

```python
entry = tk.Entry(window, 
                 width=10, 
                 fg='red', 
                 bg='blue', 
                 font=())
entry.delete()
entry.get()
entry.insert(index, string)
```

[Entry Ref](https://anzeljg.github.io/rin2/book2/2405/docs/tkinter/entry.html)

# Checkbutton

```python
checkbutton = tk.Checkbutton(window, 
                             text="", 
                             textvariable=a, 
                             variable=b,
                             offvalue=c,
                             onvalue=d,
                             command=abc)
checkbutton.deselect()
checkbutton.select()
```

[Checkbutton Ref](https://anzeljg.github.io/rin2/book2/2405/docs/tkinter/checkbutton.html)

# Radiobutton

```python
radiobutton = tk.Radiobutton(window, 
                             text="", 
                             value=a, 
                             variable=b, 
                             command=abc)
radiobutton.select()
radiobutton.deselect()
```

[Radiobutton Ref](https://anzeljg.github.io/rin2/book2/2405/docs/tkinter/radiobutton.html)

# Scale

```python
scale = tk.Scale(window, 
                 resolution=0.5, 
                 sliderlength=30, 
                 variable=a, 
                 command=abc)
scale.get()
scale.set(value)
```

[Scale Ref](https://anzeljg.github.io/rin2/book2/2405/docs/tkinter/scale.html)

# Listbox

```python
listbox = tk.Listbox(window, 
                     activestyle='underline')
listbox.activate(index)
listbox.curselection()
listbox.delete(first)
listbox.get(first)
listbox.insert(index, text)
listbox.size()
```

[Listbox Ref](https://anzeljg.github.io/rin2/book2/2405/docs/tkinter/listbox.html)

# Messagebox

```python
from tkinter import messagebox
a = messagebox.askokcancel(title, message, options)
b = messagebox.askquestion(title, message, options)
c = messagebox.askretrycancel(title, message, options)
d = messagebox.askyesno(title, message, options)
e = messagebox.showerror(title, message, options)
f = messagebox.showinfo(title, message, options)
g = messagebox.showwarning(title, message, options)
```

[Messagebox Ref](https://anzeljg.github.io/rin2/book2/2405/docs/tkinter/tkMessageBox.html)

# ColorChooser

```python
from tkinter import colorchooser
color = colorchooser.askcolor(color, title, parent)
```

[ColorChooser Ref](https://anzeljg.github.io/rin2/book2/2405/docs/tkinter/tkColorChooser.html)

# Text

```python
text = tk.Text(window, width, height)
text.get(index1)
text.insert(index, chars)
```

[Text Ref](https://anzeljg.github.io/rin2/book2/2405/docs/tkinter/text.html) / [Text Methods](https://anzeljg.github.io/rin2/book2/2405/docs/tkinter/text-methods.html)

# FileDialog

```python
from tkinter import filedialog
open1 = filedialog.askopenfilename(option)
open2 = filedialog.askdirectory(option)
save1 = filedialog.asksaveasfilename(option)

# /option/
# defaultextension='.txt'
# filetypes=[('PNG', '*.png'), (label2, pattern2), ...]
# initialdir=D
# initialfile=F
# title=T
# parent=W
```

[FileDialog Ref](https://anzeljg.github.io/rin2/book2/2405/docs/tkinter/tkFileDialog.html)

# Menu

```python
# Example
menubar = ttk.Menu(window)
window.config(menu=menubar)

fileMenu = ttk.Menu(menubar)
menubar.add_cascade(label='File', menu=fileMenu)
fileMenu.add_command(label='Open', command=openFile)
fileMenu.add_command(label='Save', command=saveFile)
fileMenu.add_separator()
fileMenu.add_command(label='Exit', command=quit)

editMenu = ttk.Menu(menubar)
menubar.add_cascade(label='Edit', menu=editMenu)
editMenu.add_command(label='Cut')
editMenu.add_command(label='Copy')
editMenu.add_command(label='Paste')
```

[Menu Ref](https://anzeljg.github.io/rin2/book2/2405/docs/tkinter/menu.html)

# Frame

```python
frame = tk.Frame(window, 
                 width, 
                 height, 
                 bg)
# Example
frame = ttk.Frame(window, bootstyle=WARNING)
frame.pack()

ttk.Button(frame, text='W', width=3).pack(side=TOP)
ttk.Button(frame, text='A', width=3).pack(side=LEFT)
ttk.Button(frame, text='S', width=3).pack(side=LEFT)
ttk.Button(frame, text='D', width=3).pack(side=LEFT)
```

[Frame Ref](https://anzeljg.github.io/rin2/book2/2405/docs/tkinter/frame.html)

# TopLevel

```python
newWindow = tk.Toplevel()
```

[TopLevle Ref](https://anzeljg.github.io/rin2/book2/2405/docs/tkinter/toplevel.html)

# Notebook

```python
# Example
noteBook = ttk.Notebook(window, bootstyle=INFO)

tab1 = ttk.Frame(noteBook)
tab2 = ttk.Frame(noteBook)

noteBook.add(tab1, text='Tab1')
noteBook.add(tab2, text='Tab2')
noteBook.pack()

tk.Label(tab1, text='Hello Tab1', width=50, height=10).pack()
tk.Label(tab2, text="Hello Tab2", width=50, height=10).pack()
```

[NoteBook Ref](https://anzeljg.github.io/rin2/book2/2405/docs/tkinter/ttk-Notebook.html)

