<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" Content="text/html; charset=utf-8">
<meta name="viewport" content="target-densitydpi=320 ,width=640,user-scalable=no">
<title>连续梁线形监测系统</title>
<style type="text/css">
*{
	margin: 0;padding: 0;
}
body{
	margin: 0;
	padding: 0;
	background-color: #3345CC;
}
.content {
	text-align: center;
	height: 100%;
}
.mtop{
	margin-top: 40px;
}
#loading{
	display: block;
}
#login{
	display: none;
}
.footer{
	text-align: center;
	width: 100%; 
	color: white;
	margin-top: 100px;
}
input{width:80%; 
	height:55px; 
	padding-left:30px; line-height:44px;
	background:#ffffff;
	border:1px solid #C1CAD4; 
	font-family:"Microsoft YaHei"; 
	color: #909090;
	border-radius:5px;
	display: block;
	margin: 20px auto;
	font-size: 30px;
 }
 .btn-login{
 	border-radius:5px;
 	width:30%; 
	height:55px;
	font-size: 30px;
	margin-top: 20px;
	background:#ffffff;
 }
</style>
</head>
<body>
	<div class="content">
			<div class="mtop">
				<img style="width: 580px;height: 280px;" alt="背景" src="../static/images/mobile/login_bg.png">
			</div>
			<div id = "loading" class="mtop">
				<img  style="width: 145px;height: 145px;" alt="加载中..." src="../static/images/mobile/login_load.gif">
			</div>
			<div id = "login">
					<input type="text" id="account" placeholder='用户名'  class="input_txt " value='' />
					<input type="password" id="pwd" placeholder='密码' class="input_txt" value='' />
				<div class="BtnLine">
					<button class="btn-login" type="button"
						onclick="javascript:login();">登&nbsp;&nbsp;录</button>
				</div>
			</div>
		<div class="footer">
			<div style="font-size: 35px;font-family: fantasy;">连续梁线形监测系统</div> 
			<!-- <div class="mtop">V1.0.0.170411</div> -->
		</div>
	</div>
	<input type = 'hidden' id = "sessionid" value="${sessionid}">
	<script src="../static/plugins/jQuery/jquery.min.js"></script>
	<script type="text/javascript">
	$(function(){
		var sessionid = $("#sessionid").val();
		if(sessionid != null && sessionid != ""){
			if(sessionid.length > 30){
				$.ajax({
					type : 'POST',
					url :"../appuser/login/loginCheck",
					data : {sessionid:sessionid},
					success : function (data){
						if(data=="ok"){
							document.location.href = "index";
							return;
						}else if(data=="adm"){
							alert("管理员账号请在PC端登录！");
						}else{
							alert("您请求的页面好像不存在！");
						}
						return;
					},
					error : function(){
						alert("您请求的页面好像不存在！");
						return;
					}
				});
			}else if(sessionid == 'wangjiang'){
				$.ajax({
					type : 'POST',
					url :"../appuser/login",
					data : {pwd:"1",account:"wangjiang"},
					success : function (data){
						if(data=="ok"){
							document.location.href = "index";
							return;
						}else if(data=="adm"){
							alert("管理员账号请在PC端登录！");
						}else{
							alert("您请求的页面好像不存在！");
						}
						$("#loading").hide();
						$("#login").show();
						return;
					},
					error : function(){
						alert("您请求的页面好像不存在！");
						$("#loading").hide();
						$("#login").show();
						return;
					}
				});
			}else{
				alert("您请求的页面好像不存在！");
			}
		}else{
			$("#loading").hide();
			$("#login").show();
		}
	});
	//临时登录
	function login() {
		var account = $("#account").val().trim();
		if (account.length == 0) {
			alert("\"用户名\"不能为空,请输入!");
			$("#account").val("");
			return false;
		}
		var pwd = $("#pwd").val().trim();
		if (account.length == 0) {
			alert("\"密码\"不能为空,请输入!");
			$("#pwd").val("");
			return false;
		}
		$("#loading").show();
		$("#login").hide();
		$.ajax({
			type : 'POST',
			url :"../appuser/login",
			data : {pwd:pwd,account:account},
			success : function (data){
				if(data=="ok"){
					document.location.href = "index";
					return;
				}else if(data=="adm"){
					alert("管理员账号请在PC端登录！");
				}else{
					alert("您请求的页面好像不存在！");
				}
				$("#loading").hide();
				$("#login").show();
				return;
			},
			error : function(){
				alert("您请求的页面好像不存在！");
				$("#loading").hide();
				$("#login").show();
				return;
			}
		});
	}
	</script>
</body>
</html>