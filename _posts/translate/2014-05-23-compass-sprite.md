---
layout: post
title: 网站设计：使用compass来拼合css雪碧(sprite)图
category: translate
description: 使用compass来拼合css雪碧(sprite)图
tags: translate
---

<div class="source">
	根据http://www.hongkiat.com/blog/compass-image-sprite/翻译，仅是本人个人理解，有不对的地方，还请大家留言指正，多谢。
</div>

CSS雪碧图是将几个图片拼合成一张图片，以此来减少HTTP请求的方法，并且可以提升网站加载性能。除了使用传统方法在Photoshop中手动拼合，还有一些简便的方法和便捷的工具来帮助我们完成这项工作。

![Alt compassLogo](../images/blog/compass-sprite/compass-cover.jpg)

但是，以我处理CSS雪碧图的经验来说，没有哪种方法比使用Compass的Sprite函数更轻松容易的了。现在就让我们来看看他是如何工作的。

<div class="suggest">建议开始本章前先阅读：<a href="http://www.hongkiat.com/blog/saas-compass">完美的样式语法：在sass中使用Compass</a></div>

##开始使用Compass

在使用Compass工作之前，我们需要创建一个Compass的项目然后监视它。这样，当这个项目中包含的图片和<span class="code">.scss</span>一发生改变，Compass就会编译成合适的形式。

让我们打开你的终端或者命令行窗口（如果你使用的是Windows），然后运行下面的这段命令。

	compass create /path/to/project
	cd /path/to/project
	compass watch

##合并图片

正如我们上面提到的，你可以使用Photoshop来手动增减图片或者你也可以使用一些便捷的工具，例如：[SpriteBox](http://www.spritebox.net/)或者[SpriteMe](http://spriteme.org/)。Compass将这些功能整合成一个函数。我们在**images/browsers/**这个文件夹下有一些icon图片，命名为XXX.png。

![Alt browsers](../images/blog/compass-sprite/browsers.jpg)

这些icon是通过[Futurosoft](http://kde-look.org/usermanager/search.php?username=Sephiroth6779)得来的。

在Compass中添加这些icon，我们可以在<span class="code">.scss</span>文件中使用<span class="code">@import</span>语法指向图片文件夹下的所有png扩展名的图片。就像下面这样：

	@import "browsers/*.png";

保存文件后，Compass将会将这些图片进行合并，然后生成一个新的图片文件，如下：

![Alt image-sprite](../images/blog/compass-sprite/image-sprite.jpg)

###雪碧图陈列方向（即合并完后的图片是横向排列还是纵向排列）

此外，我们还可以设置雪碧图排列的方向。正如你之前看到的图片截屏，图片默认排列是纵向的。假设纵向排列不能适应当前的情况下，我们可以使用<span class="code">$map-layout: horizontal;</span>或者<span class="code">$map-layout: diagonal;</span>变量来指定他们水平排列或者对角线排列，将变量中的<span class="code">map</span>替换成你存储图片的文件夹的名字。

**水平排列例子**

	$browsers-layout:horizontal;  
	@import "browsers/*.png";  

![Alt image-sprite-horizontal](../images/blog/compass-sprite/image-sprite-horizontal.jpg)









































































