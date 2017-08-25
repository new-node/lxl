 <%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>

<meta http-equiv="Content-Type" Content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
<title>连续梁线形监测系统</title>
<link rel="stylesheet" href="../static/css/mobile/header.css" type="text/css">
<link rel="stylesheet" href="../static/css/mobile/lxlmain.css" type="text/css">
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
<div id="slider">
<!-- 1 -->
	<div class="baseinfo">
<!-- 		<p>桥跨组合：<span>64+80+64</span></p> -->
		<p>梁段总数：<span id = "ldzcount"></span></p>
		<p>总测点数：<span  id = "cdzcount"></span></p>
		<p>偏差超限测点数：<span style="color: red;"  id = "warncount"></span></p>
		
	</div>
	 <!-- 2 -->
	<div class="table_box"> 
		<table class="w10 table" id="tblWarnInfo">
			<thead>
				<tr>
					<td>序号</td>
					<td>T构</td>
					<td>梁段</td>
					<td>超限施工工况</td>
					<td>偏差超限类别</td>
					<td>处置状态</td>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
	</div>
	<div class="footer">
		<a href="#" id="tolxlpage"><img alt="" src="../static/images/mobile/lxlmain_a.png">&nbsp;&nbsp;点击查看详细信息</a>
	</div>
</div>	
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
// 		$("#tolxlpage").attr("href","../mobileHomeBridge/552/24256");
		getldcdwarnInfo(id);
		getWarnInfo(id);
		$("#tolxlpage").click(function(){
		//	var url  = encodeURI(encodeURI("../mobileHomeBridge/"+id+"/"+id));
// 			$("#content").attr("src","http://www.r93535.com");
 			var url  = encodeURI(encodeURI("bridgeInfo?id="+id+"&name="+name));
			$("#content",window.parent.document).attr("src",url);
			//alert("111");
			//$("#tolxlpage1",window.parent.document).attr("href",url);
			//$("#subBtn",window.parent.document).trigger("click");
		});
		
	});
	//梁段总数，测点总数，偏差超限数的设置
	function getldcdwarnInfo(conbeamid){
		//处理措施
		$.ajax({
	        type : 'GET',//请求方式：post
	        dataType : 'json',//数据传输格式：json
	       // data : {"conbeamid":conbeamid},
	        url :"../conbeam/selectLdCdWarnByLxl/"+conbeamid,//请求的action//n路径
	        error : function(){
	        	console.log("服务器异常！");
	        },
	        success : function (data){
	        	//梁段总数
	        	$("#ldzcount").text(data.ldcount);
	        	//测点总数
	        	$("#cdzcount").text(data.cdcount);
	        }
	    })
	}
	

	function getWarnInfo(conbeamID) {
		$.ajax({
			cache : false,//是否使用缓存
			type : 'POST',//请求方式：get
			dataType : 'json',//数据传输格式：json
			url : "getWarnInfo",//请求的actio//n路径
			data : {
				"conbeamID" : conbeamID,
				"pageNo" : 1,
				"pageSize":1000,
			},
			error : function() {
				console.log("服务器异常！");
			},
			success : function(data) { //请求成功后处理函数
				if (data['code'] != 0) {
					$("#tblWarnInfo tbody").html("");
					$("#warncount").text(0);
				} else {
					var warnInfoList = data['result'].warnInfo.list;
					//偏差超限数
		        	$("#warncount").text(warnInfoList.length);
					//拼接tr
					for(var i = 0; i < warnInfoList.length; i++) {
						// 设置 梁段
						var ldName = warnInfoList[i].code.split("-");
						var mileStr;
						if(warnInfoList[i].mileageFlag == 0){
							mileStr = "小";
						}else{
							mileStr = "大";
						}
						var name = ldName[0] + "(" + mileStr + ")";
						//处置状态
						var status = "";
						if (warnInfoList[i].dealflag == 0) {
							status = "未处置";
						} else if (warnInfoList[i].dealflag == 2) {
							status = "处置中 ";
						}
						
						$("#tblWarnInfo tbody").append("<tr>"+
						"<td>"+(i+1)+"</td><td>"+ warnInfoList[i].pier +
						"</td><td>"+ name +"</td><td>"+ warnInfoList[i].content +
						"</td><td>"+ warnInfoList[i].warntypename +"</td><td>"+ status +
						"</td></tr>");
					}
				}
			}
		});
	}
	</script>
</body>
</html>