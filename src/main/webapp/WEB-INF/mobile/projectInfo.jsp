 
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" Content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
<title>连续梁线形监测系统</title>
<link rel="stylesheet" href="../static/css/mobile/header.css" type="text/css">
<link rel="stylesheet" href="../static/css/mobile/projectInfo.css" type="text/css">
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
	<div>
		<div class="c_header">
			<label>监测数据缺失</label>
		</div>
		<div class="table_box"> 
			<div>
				<table class="w10 table" id="qsld">
				<thead>
					<tr>
						<td>序号</td>
						<td>标段</td>
						<td>连续梁名称</td>
						<td>缺失梁段数</td>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
			</div>
			<div class="w4"></div>
		</div>
	</div>
	<div><!-- 2 -->
		<div class="c_header">
			<label>超限处置进度</label>
			<div class="legend_box">
				<div class="legend" style="background-color: #199ED8"></div>
				<span>&nbsp;已处置</span>
			</div>
		</div>
		<div class="cxczjd"> 
			<div class="cxczjd_1">
				<div class="cxczjd_total">
					<div id="cxczjd_lxl"></div>
				</div>
			</div>
			<div  class="cxczjd_2">
				<div style="float: right;">
					处置中:<span id = "lxl-notDisposed"></span>个&nbsp;&nbsp;
					未处置:<span id = "lxl-overCount"></span>个</div>  
				<div>超限连续梁</div>
			</div>
		</div>
		<div class="cxczjd"> 
			<div class="cxczjd_1">
				<div class="cxczjd_total">
					<div id="cxczjd_ld"></div>
				</div>
			</div>
			<div  class="cxczjd_2">
				<div style="float: right;">
					处置中:<span id = "notDisposed"></span>个&nbsp;&nbsp;
					未处置:<span id = "overCount"></span>个</div>  
				<div>超限梁段</div>
			</div>
		</div>
	</div>
	<div><!-- 3 -->
		<div class="c_header">
			<label>连续梁监测状态统计</label>
		</div>
		<div class="body1">
			<div class="body1_box1 h10">
				<div class="bF2 w5 right h10" id="prolxlz"></div>
				<div class="black w5 h10" style="background-color: #6CCAC9" >总数</div>
			</div> 
			<div class="body1_box3">
				<div style="line-height: 22px">
					<div class="bF2 w5 right" id="prolxlj"></div>
					<div class="black w5 h10" style="background-color: #F8D347">监测中</div>
				</div>
				<div style="line-height: 22px;margin-top: 6px">
					<div class="bF2 w5 right" id="prolxly"></div>
					<div class="black w5 h10" style="background-color: #A9D86E">已合龙</div>
				</div>
			</div>
			<div class="body1_box2">
				<div style="line-height: 22px">
					<div class="bF2 w5 right" id="prolxlw"></div>
					<div class="black w5 h10" style="background-color: #FF6C60">未监测</div>
				</div>
				<div style="line-height: 22px;margin-top: 6px">
					<div class="bF2 w5 right" id="prolxld"></div>
					<div class="black w5 h10" style="background-color: #57C8F2">待合龙</div>
				</div>
			</div>
		</div>
	</div>
	<div><!-- 4 -->
		<div class="c_header">
			<label>标段信息统计表</label>
		</div>
		<div class="table_box"> 
			<table class="w10 table" id="smprojectTable">
				<thead>
					<tr>
						<td rowspan="2">标段</td>
						<td colspan="2">超限连续梁</td>
						<td colspan="2">超限梁段</td>
					</tr>
					<tr>
						<td>处置中</td>
						<td>未处置</td>
						<td>处置中</td>
						<td>未处置</td>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
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
</body>
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
	getHomeProjectTableData(id);
	getProgressData(id);
	getqsldList(id);
	
});

/*
 * 项目首页中缺失梁段信息table中数据
 * */
function getqsldList(projectId){  
	
	$.ajax({
		type : 'post',//请求方式：get
		dataType : 'json',//数据传输格式：json
		url : "qsldList",//请求的action路径
		data : {                         
			id : projectId,
			type : 1,
			conbeamid : conbeamid
		},
		error : function() {
			return;
		},
		success : function(data) { //请求成功后处理函数
			$("#qsld body").html("");
			if(data.code == 0){
				$.each(data.result,function(i,item){
					$("#qsld tbody").append("<tr><td>"
							+(i+1)+"</td><td>"
							+item.sectionName+"</td><td>"
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
/*
 * 项目首页中table中数据
 * */
function getHomeProjectTableData(projectId){  
	
	$.ajax({
		async : false,//是否异步
		cache : true,//是否使用缓存
		type : 'post',//请求方式：get
		dataType : 'json',//数据传输格式：json
		url : "../pro/getBiaoDuanInfo",//请求的action路径
		data : {                         
			projectid : projectId,
			conbeamid : conbeamid
		},
		error : function() {
			return;
		},
		success : function(data) { //请求成功后处理函数
			$('#smprojectTable tbody').html("");
			//合计每一列的总数
			var totalZcount = 0;
			var totalWjccount =0;
			var totalJczcount = 0;
			var totalDhlcount = 0;
			var totalYhlcount = 0;
			var totalWarnlxlcount = 0;
			var totalWarnlxlcountnodeal = 0;
			var totalWarnldcount = 0;
			var totalWarnldcountnodeal = 0;
			if(data.result.length == 0){		
				 $("#prolxlz").html(totalZcount);//连续梁监测状态统计-总数
				 $("#prolxlw").html(totalWjccount);//连续梁监测状态统计-未检测
				 $("#prolxlj").html(totalJczcount);//连续梁监测状态统计-检测中
				 $("#prolxld").html(totalDhlcount);//连续梁监测状态统计-待合龙
				 $("#prolxly").html(totalYhlcount);//连续梁监测状态统计-已合龙
				 //无数据时判断已测梁段数是否存在，如果true则不需增加该列，否则增加已测梁段数列
					 $('#smprojectTable tbody').append('<tr>'+
							 '<td>'+'合计'+'</td>'+
							 '<td>'+totalWarnlxlcount + '</td>'+
							 '<td>'+totalWarnlxlcountnodeal+'</td>'+
							 '<td>'+totalWarnldcount + '</td>'+
							 '<td>'+totalWarnldcountnodeal+'</td>'+
					 '</tr>'
							 );
				return;
			}
			
			//连续梁检测状态统计 总数
			var lxlStateCount = 0;	
			for(var i = 0; i < data.result.length;i++){
				// 连续梁检测状态统计 未检测
				var wjcCount = data.result[i].wjccount ? data.result[i].wjccount : 0;
				// 连续梁检测状态统计 检测中
				var jczCount = data.result[i].jczcount ? data.result[i].jczcount : 0;
				// 连续梁检测状态统计 待合龙
				var dhlCount = data.result[i].dhlcount ? data.result[i].dhlcount : 0;
				// 连续梁检测状态统计 已合龙
				var yhlCount = data.result[i].yhlcount ? data.result[i].yhlcount : 0;
				//连续梁处置中
				var warnlxlCount = data.result[i].warnlxlcountdeal ? data.result[i].warnlxlcountdeal : 0;
				//连续梁未处置
				var warnlxlCountnodeal = data.result[i].warnlxlcountnodeal ? data.result[i].warnlxlcountnodeal : 0; 
				//梁段处置中
				var warnLdcount = data.result[i].warnldcountdeal ? data.result[i].warnldcountdeal : 0;
				//梁段未处置
				var warnLdcountnodeal = data.result[i].warnldcountnodeal ? data.result[i].warnldcountnodeal : 0;
				//已测梁段数
				var Ldcount = data.result[i].ldcount ? data.result[i].ldcount : 0;
				// 连续梁检测状态统计 总数
				lxlStateCount = wjcCount + jczCount + dhlCount + yhlCount;
				// 各项总数
			 	totalZcount += lxlStateCount; // 连续梁检测状态统计 总数
			 	totalWjccount += wjcCount;	// 连续梁检测状态统计 未检测
			 	totalJczcount += jczCount;	// 连续梁检测状态统计 检测中
			 	totalDhlcount += dhlCount;	// 连续梁检测状态统计 待合龙
			 	totalYhlcount += yhlCount;	// 连续梁检测状态统计 已合龙
			 	totalWarnlxlcount += warnlxlCount;				// 超限连续梁 未处置 
			 	totalWarnlxlcountnodeal += warnlxlCountnodeal;	// 超限连续梁 处置中
			 	totalWarnldcount += warnLdcount;				// 超限梁段 未处置
			 	totalWarnldcountnodeal += warnLdcountnodeal;	// 超限梁段 处置中
				// 添加DOM
				$('#smprojectTable tbody').append('<tr>'+
		                '<td><a id = "'+ data.result[i].sectionId +
		                '" onclick="toSectionInfo(this)">' + 
		                	data.result[i].section+'</a></td>'+
						'<td>' + warnlxlCount + '</td>'+		// 超限连续梁 未处置 
						'<td>' + warnlxlCountnodeal + '</td>'+	// 超限连续梁 处置中
						'<td>' + warnLdcount + '</td>'+		// 超限梁段 未处置
						'<td>' + warnLdcountnodeal + '</td>'+	// 超限梁段 处置中
					'</tr>');
				}
			$('#smprojectTable tbody').append('<tr>'+
					 '<td>'+'合计'+'</td>'+
					 '<td>'+totalWarnlxlcount + '</td>'+
					 '<td>'+totalWarnlxlcountnodeal+'</td>'+
					 '<td>'+totalWarnldcount + '</td>'+
					 '<td>'+totalWarnldcountnodeal+'</td>'
					 + '</tr>');
			
			  $("#prolxlz").html(totalZcount);//连续梁监测状态统计-总数
				 $("#prolxlw").html(totalWjccount);//连续梁监测状态统计-未检测
				 $("#prolxlj").html(totalJczcount);//连续梁监测状态统计-检测中
				 $("#prolxld").html(totalDhlcount);//连续梁监测状态统计-待合龙
				 $("#prolxly").html(totalYhlcount);//连续梁监测状态统计-已合龙
			}
			
		});
}


/*进度条js*/
/*进度条问题的处理*/

//连续梁进度条
function getProgressData(projectId){
	
	$.ajax({
		async:true,
		type:'POST',
		dataType:'json',
		data:{'projectid':projectId,
			  'conbeamid': conbeamid,},	// 705
		url:"../pro/getCxlxlCount",
		error:function(){
			return;
		},
		success:function(data){
			if(data.code == 0){		
				var lxlzcount = data.result.warnlxlcount == null ? 0 : data.result.warnlxlcount;
				//连续梁未处置
				var warnlxlcountnodeal = data.result.warnlxlcountnodeal;
				if(warnlxlcountnodeal == null){
					warnlxlcountnodeal = 0;
				};
				//连续梁处置中
				var warnlxlcount = data.result.warnlxlcountdeal;
				if(warnlxlcount == null){
					warnlxlcount = 0;
				};
				//连续梁已处置
				var warnlxlycount = data.result.warnlxlcountyesdeal;
				if(warnlxlycount == null){
					warnlxlycount = 0;
				};
				$("#lxl-overCount").html(warnlxlcountnodeal);
				$('#lxl-notDisposed').html(warnlxlcount)
				var w1 = lxlzcount == 0? 0 : (warnlxlycount * 100/ lxlzcount);
				var wbf1 = w1.toFixed(2)+'%'
				if(w1 != 0)$("#cxczjd_lxl").html(wbf1);
				$("#cxczjd_lxl").css({"width":wbf1});
				/**
				 * 超限梁段进度条
				 * */
				var ldzcount = data.result.warnldcount == null ? 0: data.result.warnldcount ;
				//梁段未处置
				var ldcountnodeal = data.result.warnldcountnodeal == null ? 0 : data.result.warnldcountnodeal ;
				//梁段处置中
				var ldcount = data.result.warnldcountdeal == null ? 0 : data.result.warnldcountdeal ;
				//梁段已处置
				var ldycount = data.result.warnldcountyesdeal == null ? 0 : data.result.warnldcountyesdeal;
				
				$("#overCount").html(ldcountnodeal);
				$('#notDisposed').html(ldcount);
				var w2 = ldzcount == 0 ? 0 : (ldycount * 100/ ldzcount);
				var wbf2 = w2.toFixed(2)+'%'
				if(w2 != 0)$("#cxczjd_ld").html(wbf2);
				$("#cxczjd_ld").css({"width":wbf2});
			}
		}
	})
}

/**
*跳转到标段详情
*/
function toSectionInfo(obj){
	var id = obj.id;
	var name = $(obj).html();
	var url  = encodeURI(encodeURI("projectSection?id="+id+"&name="+name));
	$("#content",window.parent.document).attr("src",url);
}
</script>
</html>