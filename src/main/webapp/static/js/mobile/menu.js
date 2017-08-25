$(function(){
	//菜单按钮
	$(".menu").on("click",function(){
		var obj = $(".tree",window.parent.document);
		if($(obj).position().left==0){
			slowOut(obj);
		}else{
			slowIn(obj);
		}
	});
	$(".back").on("click",function(){
		var ifr = window.parent.window.document.getElementById("content");
		//alert(ifr.contentWindow.history);
		ifr.contentWindow.history.back();

		//history.go(-1);
	});
	//绑定滑动事件
	var moveObj = $(".tree", window.parent.document);
	var left =  moveObj.position().left;
	$("#slider").myslider("left",function(movePos) {
		moveObj.css({"left":left + movePos.x +"px"});
	}, function(isEnd) {
		if(isEnd){
			moveObj.animate({
				"left" : 0
			}, 300);
		}else{
			moveObj.animate({
				"left" :  left
			}, 300);
		}
	});
});

//淡出
function slowOut(obj){
	$(obj).animate({
		"left" :$(obj).width()
	}, 500);
}
//淡入
function slowIn(obj){
	$(obj).animate({
		"left" : 0
	}, 500);
}