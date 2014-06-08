---
layout: post
title: Sass教学指导：用Saas和Compass建立一个在线联系的名片
category: translate
description: 通过制作一个在线联系的名片的实例，来学习Sass和Compass的用法。
tags: translate
---

<div class="source">
	根据http://www.hongkiat.com/blog/sass-compass-vcard/翻译，仅是本人个人理解，有不对的地方，还请大家留言指正，多谢。
</div>

今天我们接着讨论Sass，并且这将是Sass系列课程的最后一讲。这时，我们就不要仅仅是理论方法了，还需要你自己多一些动手实践。我们将使用Sass和Compass来创建一个在线联系的名片。

这个名片在颜色，大小上应该是可以很容易调整的。在创建的过程中，我们会使用Sass或Compass的一些特性，如：**变量，Mixins，运算，选择器继承，嵌套**和**Compass助手**。如果你错过了我们前面讲的这个系列的文章，我们建议你先去看看前面的那些文章然后再继续本章的阅读。

##规划并画线框图

当使用Sass和Compass时，**规划是基本的工作**。我们通常会在最终要放置的地方（例如：页面或者网站）占据一大块地方。这样对于浏览像Behance或者Dribbble这样的网站时获得关注是有益的。我们可以将我们的想法或者名片设计的结构在纸上打草稿，就像下面的例子这样。

![Alt vcard-draft](../images/blog/compass-vcard/sass-vcard.jpg)

正如你上面看到的图片一样，我们的vCard（在线联系名片）包含了关于John的联系信息-一行照片，一些关于John的信息，例如：他的名字，email地址，电话号码和关于他是谁，他是干什么的简短的介绍，这都是我们的“bio”部分。

下面是与他在社交网站中联系的按钮，这将是我们的“社交”部分。

##准备工作

在我们开始编写代码前，还有一些基础的东西需要准备。你现在时候在你的机器上安装好了Sass和Compass。

（如果你不确定是否已经安装好了他们，你可以通过终端或者命令提示窗口再或者如果你更喜欢使用GUI的话，你可以使用如[Scout App](http://mhs.github.io/scout-app/)这类桌面程序来运行<span class="code">sass -v</span>或者<span class="code">compass -v</span>命令。）

我们还需要一些如字体icon和社交媒体icon的资源，这些资源我们可以从类似于[ModernPictograms](http://www.fontsquirrel.com/fonts/modern-pictograms)和[Social Media Icons](http://www.premiumpixels.com/freebies/41-social-media-icons-png/)的网站获得。

最后，因为在这篇文章中我们使用的事命令提示窗口/终端，所以，我们需要导航到我们的目录，然后使用<span class="code">compass init</span>和<span class="code">compass watch</span>两个命令来运行Compass项目。

![Alt vcard-draft](../images/blog/compass-vcard/compass-watch.jpg)

##HTML标记

以下是我们vCard的HTML结构，它非常的简单。所有的东西都被包含在了HTML的<span class="code">&lt;section&gt;</span>标签之内。

	<div class="vcard">  
		<section class="bio cf">  
		    <img src="images/me.jpg" width="80" height="80">  
		    <div class="detail">  
		        <ul>  
		            <li class="name">Thoriq Firdaus</li>  
		            <li class="email">me@email.com</li>  
		            <li class="phone">(+62)1.2345.678.9</li>  
		            <li class="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dolor neque, eleifend at pellentesque quis, convallis sit amet tellus. Etiam et auctor arcu.</li>  
		        </ul>  
		    </div>  
		</section>  
		<section class="social cf">  
		    <ul>  
		        <li class="social-facebook"><a href="#">Facebook</a></li>  
		        <li class="social-twitter"><a href="#"> Twitter</a></li>  
		        <li class="social-google"><a href="#">Google+</a></li>  
		        <li class="social-dribbble"><a href="#">Dribbble</a></li>  
		    </ul>  
		</section>  
	</div>  

正如你上面看到的，社交信息包含在了“social”的section标签结构内的列表元素中，这使得我们可以很容易的让他们并排显示。每一个li标签都给一个class，如：<span class="code">social-facebook</span>，<span class="code">social-twitter</span>，<span class="code">social-google</span>等等。

##Compass配置

我们需要在<span class="code">config.rb</span>文件中配置一些Compass的uncomment。如下：

	# You can select your preferred output style here (can be overridden via the command line):
	output_style = :expanded

	# To enable relative paths to assets via compass helper functions. Uncomment:
	relative_assets = true

	# To disable debugging comments that display the original location of your selectors. Uncomment:
	line_comments = false

如果你没有找到<span class="code">config.rb</span>文件，那么你可能没有在项目目录中执行<span class="code">compass init</span>命令。

##导入文件

因为我们要使用Compass，所以我们要先导入它：

	@import "compass";

根据我个人喜好来重置浏览器的默认样式，会使输出渲染的更一致。在Compass中有一个[Reset模块](http://compass-style.org/reference/compass/reset/)，这个模块是基于[Eric Meyer的CSS reset](http://meyerweb.com/eric/tools/css/reset/)，我们可以这样将它导入：

	@import "compass/reset";

不管怎样，我更喜欢使用[Normalize](http://necolas.github.com/normalize.css/)的版本。[点此下载文件](https://github.com/JohnAlbin/normalize-scss)，将它保存到sass工作目录，并将它导入我们的样式表。

	@import "normalize";

<div class="suggest">建议阅读：<a href="http://www.hongkiat.com/blog/css-priority-level/">复习CSS样式表优先级</a></div>

##变量

我们在样式表中肯定有一些常量值，因此我们会把它们存储在变量中。下面这两个变量将会定义我们vCard的基本颜色。

	$base: #fff;  
	$dark: darken($base, 10%); 

下面<span class="code">$width</span>表示我们页面的宽度，同时它也作为定义其他元素的尺寸的基础。

	$width: 500px;  
	$space: $width / 25; // = 20px

上面看到的<span class="code">$space</span>变量，是用来定义默认每一列的大小的，在这个例子中是20px。

![Alt sass-column](../images/blog/compass-vcard/sass-column.jpg)

Compass也有辅助来检测图片的工具，我们可以使用这个特性在我们的图片上，就像下面这样：

	$img:image-width("me.jpg") + (($space / 4) * 2);

上面代码中额外添加的<span class="code">(($space / 4) * 2)</span>，是用来计算图片的总宽度的，包括了图片的边框。一个框有4条边，上下和左右，这就是为什么我们要将除完的结果再乘以2.

##选择器继承

在我们的样式表中会有很多有一样样式的规则。为了避免代码的冗余，我们需要在开始阶段就指定这些样式，然后在需要使用的地方使用<span class="code">@extend</span>命令来调用。在Sass中，我们称这种方法为**选择器继承**，但这么有用的特性在LESS中却没有。

	.float-left {
		float: left;
	}  
	.box-sizing {
		@include box-sizing(border-box);
	}  

##样式

当所有的需要的东西都安装好后，接下来就可以开始书写我们vCard的样式了，我们先为HTML文档写上背景色。

	html {
		height: 100%;
		background-color: $base;
	}  

###vCard

接下来定义vCard容器的样式。如果你之前有使用过LESS，那么下面这段代码你会觉得很熟悉，而且很容易理解。

	.vcard {
		width: $width;
		margin: 50px auto;
		background-color: darken($base, 5%);
		border: 1px solid $dark;
		@include border-radius(3px);
		ul {
			padding: 0;
			margin: 0;
			li {
				list-style: none;
			}
		}
	}  	

这个容器的宽度继承了变量<span class="code">$width</span>的值。背景颜色要比基础色深了5%，同时，边框的颜色比基础色深了10%。颜色的获取使用了[Sass的颜色函数](http://sass-lang.com/documentation/Sass/Script/Functions.html)。

vCard还会有一个3像素的圆角，使用的是[Compass的CSS3的Mixin](http://compass-style.org/reference/compass/css3/)：<span class="code">border-radius(3px)</span>

##Bio部分

正如我们在这篇教学指导前面提到的，vCard分为了两部分。下面嵌套的样式定义了第一部分，包括头像区域和一些详细信息（姓名，email，手机号）。

	.bio {
		border-bottom: 1px solid $dark;
		padding: $space;
		@extend .box-sizing;
		img {
			@extend .float-left;
			display: block;
			border: ($space / 4) solid #ffffff;
		}
		.detail {
			@extend .float-left;
			@extend .box-sizing;
			color: darken($base, 50%);
			margin: {
				left: $space;
				bottombottom: $space / 2;
			}
			width: $width - (($space * 3) + $img);
			li {
				&:before {
					width: $space;
					height: $space;
					margin-right: $space;
					font-family: "ModernPictogramsNormal";
				}
				&.name:before {
					content: "f";
				}
				&.email:before {
					content: "m";
				}
				&.phone:before {
					content: "N";
				}
			}
		}
	}  

上面这段代码中，我们觉得你需要注意一点。<span class="code">.detail</span>的宽度是使用<span class="code">$width - (($space * 3) + $img)</span>这个算式计算得出的。

这个算式通过从vCard的总宽中减去头像的宽和空隙（padding和margin）来动态计算出详细信息的宽度。

![Alt sass-equation](../images/blog/compass-vcard/sass-equation.jpg)

##社交部分

下面这些样式是vCard的第二部分。实际上这些和传统手写样式没有不同，只不过现在是嵌套展示了，并且有些值是通过变量定义的。

	.social {
		background-color: $dark;
		width: 100%;
		padding: $space;
		@extend .box-sizing;
		ul {
			text-align: center;
			li {
				display: inline-block;
				width: 32px;
				height: 32px;
				a {
					text-decoration: none;
					display: inline-block;
					width: 100%;
					height: 100%;
					text-indent: 100%;
					whitewhite-space: nowrap;
					overflow: hidden;
				}
			}
		}
	}  

在这部分，我们将使用图片的sprite技术来展示我们的社交媒体的icon，Compass中的一些特性可以帮我们更快的完成。

首先，我们需要将我们的icon放到一个指定的文件夹-例如：我们命名这个文件夹为**/social/**。回到样式表中，使用<span class="code">@import</span>规则将icon拼接成一张图片。

	@import "social/*.png";

上面的<span class="code">sccial</span>文件夹会参考我们存放icon的的文件夹。这个文件夹应该放在图片文件夹下。现在，如果我们在图片文件夹下查看的话，应该会看到类似于**social-sc805f18607.png**这样用随机字符生成的sprite图片。到目前为止，前端什么都没发生，直到我们在样式中使用了下面的语句。

	@include all-social-sprites;

##最终结果

最终，在我们辛苦工作后，我们看到的结果就像下面这样：

![Alt sass-vcard-final](../images/blog/compass-vcard/sass-vcard-final.jpg)

在这个例子中，我们后来觉得<span class="code">500px</span>太宽了，我们只需要更改变量<span class="code">$width</span>的数值-例如：350px，然后里面的元素就会神奇的自适应。你也可以尝试更改颜色的值。

![Alt sass-vcard-final-blue](../images/blog/compass-vcard/sass-vcard-final-blue.jpg)

[查看Demo](http://demo.hongkiat.com/sass-compass-vcard/index.html)

[下载源码](http://demo.hongkiat.com/sass-compass-vcard/source.zip)

##总结

在这篇教学指导中，我们向你展示了如何使用Sass和Compass来建立一个简单的在线的vcard。尽管这只是一个例子，但Sass和Compass的确是一个强有力的工具，但有时它也不是必须得。例如，当我们的网站只有少数几个页面并且只有很少的几行样式代码事，那么就需要仔细考虑是否使用Sass和Compass了。

这篇文章是Sass系列的最后一篇，我们希望你喜欢这个系列的文章。













