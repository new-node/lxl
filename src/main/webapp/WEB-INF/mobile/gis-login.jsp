<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" Content="text/html; charset=utf-8">
<title>连续梁线形监测系统</title>
</head>
<body>
	<input type = 'hidden' id = "projectId" value="${projectId}">
	<input type = 'hidden' id = "bid" value="${id}">
	<script src="../../../static/plugins/jQuery/jquery.min.js"></script>
	<script type="text/javascript">
	$(function(){
		var projectId = $("#projectId").val();
		var bid = $("#bid").val();
		alert(123);
		document.location.href = "../../../mobileHomeBridge/"+projectId+"/"+bid;
	});
	</script>
</body>
</html>