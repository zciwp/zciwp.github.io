$(function(){
	console.log("123");
    $("div.holder").jPages({
        containerID:"itemContainer",
        minHeight:false,
        previous: "上一页",
        next: "下一页"
    });
});