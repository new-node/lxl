 
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>

<meta http-equiv="Content-Type" Content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
<title>连续梁线形监测系统</title>
<link rel="stylesheet" href="../static/css/mobile/header.css" type="text/css">
<link rel="stylesheet" href="../static/css/mobile/projectSection.css" type="text/css">
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
<div id = "slider">
	<div><!-- 1 -->
			<div class="c_header">
				<label>关注信息</label>
			</div>
			<div>
				<div id="careQuestion">
				</div>
				<div class="no_data">
					<img alt="" src="../static/images/mobile/projectSection_nodata.png">
					<br>
					<span class="no_data_txt">暂无关注信息！</span>
				</div>
			</div>
		</div>
		<div><!-- 2 -->
			<div class="c_header">
				<label>梁段超限处置进度</label>
			</div>
			<div class="table_box"> 
				<div class="cxczjd">
					<div id="czz"></div>
					<div id="wcz"></div>
				</div>
				<table class="w10 table" style="border: 0;margin-bottom: 10px;">
					<tr>
						<td style="border: 0">
							<div class="legend" style="background-color: #199ED8"></div>&nbsp;处置中:<span id = "czz_txt"></span>
						</td>
						<td style="border: 0">
							<div class="legend" style="background-color: #C9C9C9"></div>&nbsp;未处置:<span id = "wcz_txt"></span>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div> <!-- 3 -->
			<div class="c_header">
				<label>监测数据缺失</label>
			</div>
			<div class="table_box"> 
				<table class="w10 table" id="qsld">
					<thead>
						<tr>
							<td>序号</td>
							<td>连续梁名称</td>
							<td>缺失梁段数</td>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
		
		<div><!-- 4 -->
			<div class="c_header">
				<label>各连续梁相关信息</label>
			</div>
			<div class="table_box"> 
				<table class="w10 table" id="sectionInfoTbl">
					<thead>
						<tr>
							<td rowspan="2">连续梁</td>
							<td colspan="2">超限梁段</td>
							<td rowspan="2">已测<br>梁段<br>数</td>
							<td rowspan="2">已测<br>测点<br>数</td>
							<td rowspan="2">已测<br>基点<br>数</td>
						</tr>
						<tr>
							<td>处置中</td>
							<td>未处置</td>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
		<div class="modal_box">
			<div class="vertical-center">
				<div class="modal_content"> 
					<div class="m_header">
						<span id="m_header"></span>
					</div>
					<div class="m_body">
						<table class="w10 table" id="qsldInfo">
							<thead>
								<tr>
									<td>序号</td>
									<td>梁段号</td>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
					<div class="m_footer">
						<div class="close_btt">关闭</div>
					</div>		
				</div>
			</div>
			<div class="modal_shadow"></div>
		</div>
	</div>
<script src="../static/plugins/jQuery/jquery.min.js"></script>
<script src="../static/js/mobile/jquery-myslider.js"></script> 
<script src="../static/js/mobile/menu.js"></script> 
<script type="text/javascript">
$(function(){
	$(".close_btt").on("click",function(){
		$(".modal_box").hide();
	});
	var idsList = JSON.parse($("#treeIdList",window.parent.document).html());
	var lxlList = idsList.conBeamList;
	conbeamid = "";
	//连续梁ID
	if (lxlList.length > 0) {
		for(var i = 0, len = lxlList.length; i < len; i++){
			conbeamid = conbeamid + lxlList[i].orgId +',';
		}
		if(conbeamid.length > 0){
			conbeamid = conbeamid.substring(0,conbeamid.length-1);
		}
	}
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
	//获取连续梁 信息
	getDbsxList(id);
	getLdData(id);
	getqsldList(id);
	getSectionInfo(id);
	
});
	

//待办事项取得
function getDbsxList(sectionId){
	//待办事项取得
		$.ajax({
			async : false,//是否异步
			cache : false,//是否使用缓存
			type : 'POST',//请求方式：get
			dataType : 'json',//数据传输格式：json
			url : "../homeSection/getBdDbsxInfo",//请求的action路径
			data : {
				"sectionId" : sectionId,
				"conbeamId" : conbeamid
			},
			error : function() {
				return;
			},
			success : function(data) { //请求成功后处理函数
				if (data['code'] == 0) {
					dbsxList = data["result"].dbsxList;
					if(dbsxList.length > 0) {
						var ul = $("<ul></ul>");
						$.each(dbsxList,function(i,item){
							ul.append("<li><span>•&nbsp;</span>"+item.content+"</li>");
						});
						$("#careQuestion").html(ul);
					}else{
						$(".no_data").show();
					}
				}else{
					$(".no_data").show();
				}
			}
	});
}

/**
 * 梁段超限处置进度
 */
function getLdData(sectionId){
	var notDisposed = 0;//未处置的数据
	var disposal = 0;//处置中的数据
	
	$.ajax({
		async : false,//是否异步
		cache : false,//是否使用缓存
		type : 'POST',//请求方式：get
		dataType : 'json',//数据传输格式：json
		url : "../homeSection/getPccxldCount/" + sectionId, //请求的action路径 sectionId = 777
		data:{'conbeamid':conbeamid},
		error : function() {
			return;
		},
		success:function(data){
			if(data.code === 0){
				var cxLdList = data.result.cxLdCount;
				disposal = cxLdList.warnldcount;//处置中的数据
				notDisposed = cxLdList.warnldcountnodeal;//未处置的数据
				$("#czz_txt").html(disposal);
				$("#wcz_txt").html(notDisposed);
			}
			var total = disposal + notDisposed;
			if(total > 0){
				var w_czz = (disposal * 100 / total).toFixed(2) ;
				var w_wcz = 100-w_czz ;
				$("#czz").css({"width": w_czz +"%"}).html(w_czz +"%");
				$("#wcz").css({"width": w_wcz +"%"}).html(w_wcz +"%");
			}else{
				$("#czz_txt").html(0);
				$("#wcz_txt").html(0);
			}
		}
	})
}


/*
 * 缺失梁段信息table中数据
 * */
function getqsldList(sectionId){  
	
	$.ajax({
		type : 'post',//请求方式：get
		dataType : 'json',//数据传输格式：json
		url : "qsldList",//请求的action路径
		data : {    
			id : sectionId,
			type : 2,
			conbeamid:conbeamid
		},
		error : function() {
			return;
		},
		success : function(data) { //请求成功后处理函数
			$("#qsld tbody").html("");
			if(data.code == 0){
				$.each(data.result,function(i,item){
					$("#qsld tbody").append("<tr><td>"
							+(i+1)+"</td><td>"
							+item.name+"</td><td><a data = '"
							+item.name+"' id='"+item.conbeamid+
							"' onclick= 'infoByid(this)' >"
							+item.cou+"</td></tr>");
				});
			}
		}
	});
}
/**
 * 根据连续梁ID获取缺失梁段数据详情
 */
function infoByid(obj){
	var conbeamid = $(obj).attr("id");
	var conbeamName = $(obj).attr("data");
	$.ajax({
		type : 'post',//请求方式：get
		dataType : 'json',//数据传输格式：json
		url : "qsldInfo",//请求的action路径
		data : {    
			conbeamName : conbeamName,
			conbeamid:conbeamid
		},
		error : function() {
			return;
		},
		success : function(data) { //请求成功后处理函数
			$("#qsldInfo tbody").html("");
			if(data.code == 0){
				$("#m_header").html(data.msg);
				$.each(data.result,function(i,item){
					$("#qsldInfo tbody").append("<tr><td>"
							+(i+1)+"</td><td>"
							+item+"</td></tr>");
				});
				$(".modal_box").show();
			}
		}
	});
}
/**
 * 各连续梁相关信息
 * 获取 页面所需数据
 * @param sectionId
 */
function getSectionInfo(sectionId) {

	$.ajax({
		async : true,//是否异步
		cache : false,//是否使用缓存
		type : 'POST',//请求方式：get
		dataType : 'json',//数据传输格式：json
		url : "../homeSection/getSectionInfo/"+sectionId+"/"+conbeamid,//请求的action路径
// 		data : {
// 			"sectionId" : sectionId,
// 			"conbeamId" : conbeamid
// 		},
		error : function() {
			return;
		},
		success : function(data) { //请求成功后处理函数
			
			if (data['code'] == 0) {
				// 请求数据后, 判断是否有异常数据
				var sectionInfoList = data['result'].sectionInfoList;
				
				//清空table数据
				$("#sectionInfoTbl tbody").html("");
				//设置一览的数据
				//未处理的偏差超限总数
				var totalNoDeal = 0;
				//处理中的偏差超限总数
				var totalDealing = 0;
				//处理中和未处理的偏差超限总数
				var totalWarnCount = 0;
				//梁段总数
				var totalLdCount = 0;
				//测点总数
				var totalCdCount = 0;
				//工作基点总数
				var totalBaseCount = 0;

				for(var i = 0; i < sectionInfoList.length; i++){
					var lxlInfo = sectionInfoList[i];
					//超限梁段未处置
					totalNoDeal = totalNoDeal + lxlInfo.nodealcount;
					//超限梁段处置中
					totalDealing = totalDealing + lxlInfo.dealingcount;
					//测点总数
					totalCdCount = totalCdCount + lxlInfo.cdcount;
					//工作基点总数
					totalBaseCount = totalBaseCount + lxlInfo.basecount;
					//梁段总数
					totalLdCount = totalLdCount + lxlInfo.ldcount;
					
					$("#sectionInfoTbl tbody").append("<tr><td><a id='"
							+ lxlInfo.conbeamid+"' onclick='tolxlInfo(this)'>"
							+ lxlInfo.name+"</a></td><td>"
							+ lxlInfo.nodealcount+"</td><td>"
							+ lxlInfo.dealingcount+"</td><td>"
							+ lxlInfo.ldcount +"</td><td>"
							+ lxlInfo.cdcount +"</td><td>"
							+ lxlInfo.basecount +"</td></tr>");
					
				}
				//合计值
				$("#sectionInfoTbl tbody").append("<tr><td>合计</td><td>"+totalNoDeal+"</td><td>"+totalDealing+"</td><td>"
						+ totalLdCount +"</td><td>"+  totalCdCount +"</td><td>"+ totalBaseCount +"</td></tr>");
			}
		}
	});
}

/**
*跳转到连续梁详情
*/
function tolxlInfo(obj){
	var id = obj.id;
	var name = $(obj).html();
	var url  = encodeURI(encodeURI("lxlmain?id="+id+"&name="+name));
	$("#content",window.parent.document).attr("src",url);
}
</script>
</body>
</html>