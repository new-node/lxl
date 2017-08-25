<%@ page language="java" contentType="text/html; charset=utf-8" import="com.tky.lxl.platform.utils.TokenVerify"
	pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<%-- <%
 String key=TokenVerify.getTokenKey(request);
%>
<%=key %> --%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>铁路工程管理平台(REMPLAT)--登录</title>
<style type="text/css">
/* header */
.frame-top {
	height: 60px; width:100%; background:#1b437e;
}
.headerLogo{
	height: 60px; float:left; width:346px;
}
.headerLogo a{
	height: 60px; float:left; width:591px; font-weight:700; display:block; background:url(static/images/temp/logo_new.gif) no-repeat; padding-left:55px; color:#fff; font-size:20px; line-height:60px;
}
.rt-col {
	position: absolute;top: 18px;right: 30px;height: 14px; line-height:14px; z-index: 10;
}
.rt-col a{
	color:#fff; font-family:"Microsoft YaHei"; padding:0 5px;
}
.rt-col img{
	vertical-align:middle;
}

/* header */
.header{width:1004px;height:85px;position:relative;margin:0 auto;z-index:2;overflow:hidden; text-align:left; }
.headerLogo{width:1004px;height:85px;}
.headerLogo a{display:block; height:85px; line-height:85px; padding-left:52px; font-size:30px; color:#1b447e; background:url(static/images/temp/logo_login.png) no-repeat left center;}

/* main */
.main{height:570px; min-width: 1004px;}
.w1004{width:1004px; margin:0 auto;position: relative;}
.login{width:308px;height:350px;top:105px;right:26px;text-align:left;position:absolute;z-index:2;background:url(static/images/temp/login_box.png) no-repeat;-background-image:url(static/images/temp/login_box.gif);}
.loginForm{position:relative;padding:98px 30px 0;}
.loginForm .loginTdIpt{width:250px; height:44px;display:block; margin-bottom:18px; position:relative;background:url(static/images/temp/login_v1.png) no-repeat 0 0;z-index:0;}
.loginForm .loginPwdIpt{width:250px; height:44px;display:block; margin-bottom:18px; position:relative;background:url(static/images/temp/login_v1.png) no-repeat 0 -45px;z-index:0;}
.loginForm .loginCodeIpt{width:250px; height:40px;display:block; margin-bottom:18px; position:relative;background:url(static/images/temp/login_v1.png) no-repeat 0 -133px;z-index:0;}
.loginForm .loginTdIpt span{position:absolute;line-height:14px;left:30px; top:15px; color:#BCBCBC;cursor:text;} 
.loginForm .loginPwdIpt span{position:absolute;line-height:14px;left:30px; top:15px;color:#BCBCBC;cursor:text;} 
.loginForm .loginCodeIpt span{position:absolute;line-height:14px;left:10px; top:15px;color:#BCBCBC;cursor:text;} 
.loginForm input{width:240px; height:44px; padding-left:30px; line-height:44px; background:transparent; border:none; font-family:"Microsoft YaHei"; color: #909090;}
.loginForm .loginCodeIpt input{width:105px; height:40px; padding-left:10px; margin-right:25px; line-height:44px; background:transparent; border:none; font-family:"Microsoft YaHei"; color: #909090;}
.loginForm .loginCodeIpt img{width:67px; height:29px; vertical-align:middle;}
.loginForm .BtnLine{height:67px; padding-top:6px; text-align:center;}
.loginForm .btn-login{width:165px; height:42px; line-height:42px; background:url(static/images/temp/login_v1.png) no-repeat 0 -90px; border:none; font-family:"Microsoft YaHei"; font-size:14px; color:#333;}
/* footer */
.footer{height:66px;width:978px;margin:0 auto; padding-right:26px;}
.copyright{ text-align:right; color:#666666; font-family:"Microsoft YaHei"; line-height:36px; font-size:12px;}
</style>
<script src="static/js/md5.js"></script>
<script language="javascript" for="document" event="onkeydown">
	var keyCode = event.keyCode ? event.keyCode : event.which ? event.which
			: event.charCode;
	if (keyCode == 13) {
		login();
	}
</script>
<script type="text/javascript">
	var basePath = "<%=basePath %>";
	function login() {
		var account = strTrim(document.getElementById("account").value);
		var vcodepass = 0;  // 是否跳过vcode的校验，0：正常校验；1：跳过校验
		if (account.length == 0) {
			alert("\"用户名\"不能为空,请输入!");
			document.getElementById("account").value = "";
			document.getElementById("account").focus();
			return false;
		}
		var pwd = strTrim(document.getElementById("pwd").value);
		if (pwd.length == 0) {
			document.getElementById("pwd").value = "";
			alert("\"密码\"不能为空,请输入!");
			document.getElementById("pwd").focus();
			return false;
		}
		pwd = hex_md5(pwd);
		
		var token_key = strTrim(document.getElementById("token_key").value);
		var token_value = strTrim(document.getElementById("token_value").value);
		/* alert("pwd="+pwd); */
		/* document.write("<form action='login/temp_login' method='post' name='form_login' style='display:none'>");  
		document.write("<input type='text' name='aka' value='"+account+"'/>");
		document.write("<input type='text' name='p4p' value='"+pwd+"'/>");
		document.write("</form>");
		document.form_login.submit(); */
		/* var url=basePath+"login/temp_login?aka="+account+"&p4p="+pwd+"&_t="+new Date().getTime(); */
		var url=basePath+"login/temp_login/"+account+"/"+pwd+"/"+token_key+"/"+token_value;
		window.location.href=url;
		return false;
	}

	function resetFrm() {
		document.getElementById("account").value = "";
		document.getElementById("pwd").value = "";
		return false;
	}

	function strTrim(str) {
		return str.replace(/(^\s*)|(\s*$)/g, "");
		//return this.replace(/(^\s*)/g, ""); 去除左空格
		//return this.replace(/(\s*$)/g, ""); 去除右空格
	}

	document.onkeydown = function (e) { 
		var theEvent = window.event || e; 
		var code = theEvent.keyCode || theEvent.which; 
		if (code == 13) { 
			login(); 
		} 
	}

</script>
</head>

<body>
	<div class="header">
		<div class="headerLogo">
			<a></a>
		</div>
	</div>
	<table width="100%" height="100%" border="0" cellspacing="0"
		cellpadding="0">
		<tr>
			<td vAlign=center align="center"><div class="main"
					style="background:url(static/images/temp/login_bg.jpg) no-repeat 50% 0%;">
					<div class="w1004">
						<!--登录框-->
						<div id="loginBlock" class="login">
							<div class="loginForm">
								<form action="" method="post" name="loginForm" id="keydown">
									<label class="loginTdIpt"> 
										<input type="text" id="account" placeholder='用户名'  name="id" class="input_txt "/>
									</label> 
									<label class="loginPwdIpt"> 
										<input type="password" id="pwd" placeholder='密码' name="password" class="input_txt"/>
										<input type = "hidden" id="token_key" name = "token_key" value = "<%=TokenVerify.getTokenKey(request) %>" />  
										<input type = "hidden" id="token_value" name = "token_value" value = "<%=TokenVerify.getTokenValue(request) %>" /> 
									</label>
									<!-- <label class="loginVerifyIpt"> 
										<input type="text" id="ValidateCode" placeholder='验证码'  name="ValidateCode" class="input_txt "/><img alt="看不清，换一张" src="makeCertPic.jsp">
									</label>  -->
									<div class="BtnLine">
										<button class="btn-login" tabindex="6" type="button"
											onclick="javascript:login();">登&nbsp;&nbsp;录</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div id="footer" class="footer">
					<p class="copyright">版权所有：中国铁路总公司工程管理中心</p>
				</div></td>
		</tr>
	</table>
</body>
</html>
<%
request.getSession().invalidate();//清空session
Cookie[] cookies = request.getCookies();//获取cookie
if(cookies!=null&&cookies.length>0){
  cookies[0].setMaxAge(0);//让cookie过期
  cookies[0].setSecure(true);
}
%> 
