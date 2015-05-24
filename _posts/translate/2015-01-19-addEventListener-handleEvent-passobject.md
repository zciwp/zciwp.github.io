---
layout: post
title: addEventListener,handleEvent and passing objects
category: translate
description: 一个js的小技巧
tags: translate
---

<div class="source">
	根据http://www.thecssninja.com/javascript/handleevent翻译，仅是本人个人理解，有不对的地方，还请大家留言指正，多谢。
</div>

直到有人告诉我 addEventListener 可以把一个对象当第二个参数然后调用一个叫[handleEvent](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventListener-handleEvent)的方法，我才知道还有这么好的一个小技巧！不需要绑定“this”，所以可以正确的传递上下文，上下文是一个对象，你只需要设置为时间监听的回调函数。

	var obj = {
		handleEvent:function(){
			alert(this.dude);
		},
		dude: "holla"
	};

	element.addEventListener("click", obj, false);


<div style="text-align: center">
	<a href="http://www.thecssninja.com/demo/handleEvent/" style="background: #2c7ad0; color: #fff; padding: 6px; text-decoration: none; border: 1px solid #4c4c4c; border-radius: 5px; box-shadow: 0 1px 0 rgba(255,255,255,0.2) inset,0 1px 2px rgba(0,0,0,0.05); border-color: rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25); text-shadow: 0 -1px 0 rgba(0,0,0,0.25); display: inline-block; *display: inline; zoom: 1; margin-bottom: 5px;">View a live demo</a>
	<a href="http://www.thecssninja.com/demo/handleEvent/" style="background: #2c7ad0; color: #fff; padding: 6px; text-decoration: none; border: 1px solid #4c4c4c; border-radius: 5px; box-shadow: 0 1px 0 rgba(255,255,255,0.2) inset,0 1px 2px rgba(0,0,0,0.05); border-color: rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25); text-shadow: 0 -1px 0 rgba(0,0,0,0.25); display: inline-block; *display: inline; zoom: 1; margin-bottom: 5px;">Download the source files</a>
</div>


###为什么这是极好的？

我们可以这样做：

	var obj = {
		init: function(){
			document.getElementById("btn").addEventListener("click", this, false);
			document.getElementById("btn").addEventListener("touchstart", this, false);
		},
		handleEvent: function(e){
			switch(e.type){
				case "click":
					this.button();
					break;
				case "touchstart":
					this.button();
					break;
			}
		},
		dude: "holla",
		button: function(){
			alert(this.dude);
		}
	};
	
	obj.init();

正如你所看见的，我们的对象有了一个绑定了所有时间和只传了“this”做为回调函数的init()方法，然后无论什么事件被触发都会交由handleEvent代理。




















