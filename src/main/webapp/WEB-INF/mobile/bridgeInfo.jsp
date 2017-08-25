 <%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>

<meta http-equiv="Content-Type" Content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=yes">
<title>连续梁线形监测系统</title>
<link rel="stylesheet" href="../static/css/mobile/header.css" type="text/css">
<style type="text/css">
* ,html,body{margin: 0;padding: 0}
</style>
</head>
<body>
<div class="header">
		<div class="back">
			<img alt="返回" src="../static/images/mobile/index_back.png">
		</div>
		
		<div class="menu">
			<img alt="菜单" src="../static/images/mobile/index_menu.png">
		</div>
		<div class="font"><label id="titleName"></label></div>
</div>
<div style="height: 44px"></div>
<div class="content">
		<iframe id = "content" style="border: 0 none;"></iframe>
</div>
<input type="hidden" id="projectId" value="${projectId}">
	<script src="../static/plugins/jQuery/jquery.min.js"></script>
		<script src="../static/js/mobile/jquery-myslider.js"></script> 
	<script src="../static/js/mobile/menu.js"></script> 
	<script type="text/javascript">

	$(function(){
		//获取url中的参数
		$.getUrlParam = function (name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) 
				return decodeURI(decodeURI(unescape(r[2]))); 
			return null;
		}
		var id = $.getUrlParam('id');
		var name = $.getUrlParam('name');
		$("#titleName").html(name);
		var width =  window.screen.width
		var height = $(window).height()-50;
		$("#content").height(height);
		$("#content").width(width);
		var projectId = $("#projectId").val();
		var url  = encodeURI(encodeURI("../mobileHomeBridge/"+projectId+"/"+id));
		$("#content").attr("src",url);
		//$("#content").attr("src",url);
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
			history.go(-1);
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
	</script>
</body>
</html>