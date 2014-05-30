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

**对角线排列例子**

	$browsers-layout:diagonal;  
	@import "browsers/*.png";  

![Alt image-sprite-horizontal](../images/blog/compass-sprite/image-sprite-diagonal.jpg)

##在样式表中添加图片

一旦我们将图片合并完，我们就可以在样式表中的背景图中调用它了。我们用传统的做法就可以了。

	.chrome {
		background-position: 0 0; width: 128px; height: 128px; 
	}   
	.firefox { 
		background-position: 0 -133px; width: 128px; height: 128px;
	}   
	.ie { 
		background-position: 0 -266px; width: 128px; height: 128px;
	}   
	.opera { 
		background-position: 0 -399px; width: 128px; height: 128px;
	}   
	.safari { 
		background-position: 0 -532px; width: 128px; height: 128px;
	}   

在Compass中，我们有更简单的的方法。首先，我们用@include <span class="code">all-map-sprites</span>这个语法来生成一些CSS规则，其中，将map替换成我们存放图片的文件夹名称。

	@include  all-browsers-sprites; 

当上面这行编译成正常的CSS时，除了会生成背景图的声明，还有对应的位置，正如下面展示的。

	.browsers-sprite, .browsers-chrome, .browsers-firefox, .browsers-ie, .browsers-opera, .browsers-safari { 
		background: url('/images/browsers-sad8e949931.png') no-repeat;  
	}  
	.browsers-chrome { 
		background-position: 0 0;  
	}  
	.browsers-firefox {
		background-position: 0 -128px;
	}  
	.browsers-ie { 
		background-position: 0 -256px;  
	}
	.browsers-opera {
		background-position: 0 -384px;
	}  
	.browsers-safari {
		background-position: 0 -512px;
	}  

或者，我们也可以用<span class="code">@include map-sprite(image-naem)</span>语法将背景图中的某一个对应的位置图片传给指定的选择器：和前面的代码一样，只需要将map替换成存储图片的文件夹名字即可。下面是一个例子。

	li {
		@include browsers-sprite(safari);
	}  

然后，Compass会聪明的识别出背景的位置，不用我们明确指定。在正常的CSS中，上面那行代码会转换成：

	.browsers-sprite, li {
		background: url('/images/browsers-sad8e949931.png') no-repeat;
	}  
	li {
		background-position: 0 -512px;
	}  

##指定容器的尺寸

最后我们需要做的就是指定需要显示背景图容器的宽高属性。我们传统的做法是手动查看图片的宽和高（绝大多数情况是通过查看图片信息或图片属性获得）。

使用Compass，我们就可以使用 <span class="code">map-sprite-height(image-name)</span> 或者 <span class="code">map-sprite-width(image-name)</span> 函数来获取到图片的宽和高。在下面这个例子中，我们会获取其中一个图片的宽和高，并将值存储给变量。再使用@include指令获得分配背景图。

	$height: browsers-sprite-height(safari);  
	$width: browsers-sprite-width(safari);  
	li {
		display: inline-block;
		height: $height;
		width: $width;
		@include browsers-sprite(safari);
	} 

当我们编译上面这些代码，他就会转成下面这些正常的CSS。

	.browsers-sprite, li {
		background: url('/images/browsers-sad8e949931.png') no-repeat;
	}
	li {
		display: inline-block;
		height: 128px;
		width: 128px;
		background-position: 0 -512px;
	}  

##结论

实际上，Compass除了这些创建CSS雪碧图的基本函数，Compass还有很多有用的函数可以使用。然而，如果你是Compass的新手，我们建议你关注我们之前写的关于[Sass和Compass](http://www.hongkiat.com/blog/tag/sass/)的文章。我们希望这些文章对你有所帮助。


















































