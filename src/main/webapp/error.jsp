<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html>
<head>
	<base href="<%=basePath%>">
	<title>连续梁线形监测系统登录</title>
	<style>
		/*404页面样式*/
		.login-box{
			width:100%;
			height:100%;
		}
		.login-box-body{
			width:55%;
			height:500px;
			margin:45px auto;
			position:relative;
		}
		.imgBody{
			width:71%;
			height:300px;
			background:url('static/images/error.png') center no-repeat;
			background-size:55%;
			position:absolute;
			left:27px;
		}
		.problemScript{
			width:63%;
			height:300px;
			text-align:center;
			position:absolute;
			top:74px;
			right:30px;
			
		}
		.problemScript h3{
			color:#919495;
			height:30px;
			
		}
		h4{
			display:inline-block;
			position:absolute;
			bottom:78px;
			left:45%;
			color:#919495;
		}
		
	</style>
  
</head>

<body class="hold-transition login-page">
	<div class="login-box">

		 <div class="login-box-body">
		 	<div class="imgBody"></div>
		 	<div class="problemScript">
		 		<h3>抱歉，您访问的页面不存在，</h3>
		 		
		 		<h3>请重新登录</h3>
		 	</div>
		 </div>
	</div>
</body>
</html>
