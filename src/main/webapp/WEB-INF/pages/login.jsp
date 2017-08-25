<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html>
<head>
	<title></title>
	<script src="<%=basePath%>static/plugins/jQuery/jquery-2.1.4.js"></script>
	<script src="<%=basePath%>static/js/login.js"></script>
</head>
<body>
<div>
	<input type="hidden" id="loginAccount" value="${ loginAccount }" />
	<input type="hidden" id="basePath" value="<%=basePath%>" />
</div>
</body>
</html>
