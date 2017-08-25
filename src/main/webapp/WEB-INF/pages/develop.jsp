<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!-- For Develo -->
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>连续梁线形监测系统</title>
	<meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
</head>
<style>
	.content-header{margin-right: -50px}
	.self-nav{margin-left: -30px;margin-top: -8px;height: 50px}
</style>
<body>
 	<div style="width:800px;height:500px;align:center;padding-left:60px;padding-right:60px;padding-top:60px;">

 		<span>基础平台数据 同步</span>
 		<input type="button" onclick="sync(0)" value="用户" style="width:80px;height:24px;" />
 		<input type="button" onclick="sync(1)" value="部门" style="width:80px;height:24px;" />
 		<input type="button" onclick="sync(2)" value="片区" style="width:80px;height:24px;" />
 		<input type="button" onclick="sync(3)" value="项目信息" style="width:80px;height:24px;" />
 		<input type="button" onclick="sync(4)" value="标段" style="width:80px;height:24px;" />
 		<input type="button" onclick="sync(5)" value="连续梁" style="width:80px;height:24px;" />
 		<br>
 		<br>
 		
 		<span>桥梁形象化 同步</span>
 		<input type="button" onclick="sync(11)" value="同步特殊结构" style="width:80px;height:24px;" />
 		<input type="button" onclick="sync(12)" value="构件-中跨" style="width:80px;height:24px;" />
 		<input type="button" onclick="sync(13)" value="构件-T构" style="width:80px;height:24px;" />
 		<input type="button" onclick="sync(14)" value="构件-墩" style="width:80px;height:24px;" />
 		<br>
 		<br>
 		
 		<span>桥梁形象化 参照</span>
 		<input type="button" onclick="referData()" value="取得描画数据" style="width:100px;height:24px;" />
 		<br>
 		<br>
 		
 		<span>组织结构树</span>
 		<input type="button" onclick="getTree()" value="组织结构树" style="width:100px;height:24px;" />
 		<br>
 		<br>
 		
 		<span>登录画面</span>
 		<input type="button" onclick="showLogin()" value="登录" style="width:100px;height:24px;" />
 		<br>
 		<br>
 		
	  	<div id="info"></div>
  	</div>
  	
	<script src="static/js/develop.js"></script>
</body>
</html>
