<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html>
<head>
	<title>连续梁线性监测系统</title>
</head>
<body>
	<input type="hidden" id="basePath" value="<%=basePath%>" />
	<script type="text/javascript">
	
		initHomeManager();
		
		// 初始化管理员页面
		function initHomeManager() {

			var ctrlBasePath = document.getElementById('basePath');
			// 取得URL
			var basePath = ctrlBasePath.value;
			// 显示主页
			window.location.href = basePath + "homeManager"; 
		}
	</script>
</body>
</html>
