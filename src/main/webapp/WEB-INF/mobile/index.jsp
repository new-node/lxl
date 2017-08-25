<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" Content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
<title>连续梁线形监测系统</title>
<link rel="stylesheet" href="../static/css/mobile/zTreeStyle/zTreeStyle.css" type="text/css">
<link rel="stylesheet" href="../static/css/mobile/index.css" type="text/css">
</head>
<body>
	
	<div class="content">
		<iframe id = "content" style="border: 0 none;"></iframe>
	</div>
	<div class="tree">
		<div class="treeBox">
			<div>
				<!-- 组织结构树 -->
				<ul id="orgTree" class="ztree orgTree"></ul>
			</div>
		</div>
	</div>
	<div id="treeIdList" style="display: none;"></div>
	<input type='hidden' id = 'loginType' value="${loginType}">
	<a href="" id="tolxlpage1" style="display: none;">
		<button class="new-btn-login" id="subBtn" type="button"></button>
	</a>
</body>
	<script src="../static/plugins/jQuery/jquery.min.js"></script>
	<script src="../static/plugins/zTree/js/jquery.ztree.core.min.js"></script>
	<script src="../static/plugins/zTree/js/jquery.ztree.exhide.min.js"></script>
 	<script src="../static/js/mobile/tree.js"></script>
	<script src="../static/js/mobile/jquery-myslider.js"></script> 
	<script type="text/javascript">
	// 加载组织结构树
	$(function(){
		loginType =$("#loginType").val();//用户级别
		var width = $(window).width();
		var height = $(window).height()-6;
		$(".tree").css({"left" :width});
		$(".tree").height(height-45);
		$("#content").height(height);
		$("#content").width(width);
		getOrgTree();
		//绑定滑动事件
// 		var obj = document.getElementById('tree');
// 		var moveObj = $(".tree");
// 		slider.init(obj,moveObj);
		//绑定滑动事件
		var moveObj = $(".tree");
		var left = moveObj.position().left;
		$(".tree").myslider("right",function(movePos) {
			moveObj.css({"left":0 + movePos.x +"px"});
		}, function(isEnd) {
			if(isEnd){
				moveObj.animate({
					"left" :  left
				}, 300);
			}else{
				moveObj.animate({
					"left" : 0
				}, 300);
			}
		});
	});
	
	function loadContent(type,id,name){
		//rec_page.push(name);
		var url = "#";
		switch (type) {
		case "0":
			url =  encodeURI(encodeURI("center?id="+id+"&name="+name));
			break;
		case "2":
			url =  encodeURI(encodeURI("projectInfo?id="+id+"&name="+name));
			break;
		case "3":
			url =  encodeURI(encodeURI("projectSection?id="+id+"&name="+name));
			break;
		case "4":
			url =  encodeURI(encodeURI("lxlmain?id="+id+"&name="+name));
			break;
		}
		$("#content").attr("src",url);
	} 
	</script> 
