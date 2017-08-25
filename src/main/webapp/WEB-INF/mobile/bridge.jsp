 <%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
 <%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html>
<head>
	<title>连续梁线形监测系统</title>
	<meta http-equiv="Content-Type" Content="text/html; charset=utf-8">
<!-- 	<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no"> -->
	<link href="<%=basePath %>static/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
	<!-- zTree -->
	<link rel="stylesheet" href="<%=basePath %>static/plugins/zTree/css/zTreeStyle/zTreeStyle.css" type="text/css">
	<link rel="stylesheet" href="<%=basePath %>static/css/total.css">
	<link rel="stylesheet" href="<%=basePath %>static/css/jcDate.css">
	<script type="text/javascript">
			var basePath="<%=basePath%>";
	</script>
</head>

<body style="width: 1366px;">
		<div id="tuliDiv" class='mobile-tuliDiv'>
			<ul id="tuliImg">
				<li><div class="sgover"></div>&nbsp;<span>已完工</span>&nbsp;&nbsp;&nbsp;&nbsp;</li>
				<li><div class="sging"></div>&nbsp;<span>施工中</span>&nbsp;&nbsp;&nbsp;&nbsp;</li>
				<li><div class="weisg"></div>&nbsp;<span>未施工</span>&nbsp;&nbsp;&nbsp;&nbsp;</li>
				<li><div class="warn"></div>&nbsp;<span>超限</span></li>
			</ul>
			<ul class="addReduce" id="zoombtn">
				<li><button class="huaiyuan" onclick="huanyuan()">还原</button></li>
				<li><button class="add" onclick="fangda()">+</button></li>
				<li><button class="reduce" onclick="suoxiao()">-</button></li>
			</ul>
		</div>
		<div id="bridgediv" style="border: 1px solid black">
			<div id = "canvasDiv"> 
				<canvas id="lxlbridge" ></canvas>
			</div>
		</div>
		
		<div class="bridge-content" id="bridgecontent">
			<ul>
				<li class="bridge-hover"><a href="javascript:">全桥高程偏差</a></li>
				<li><a href="javascript:">全桥中线偏差</a></li>
				<li><a href="javascript:">全桥立模标高偏差</a></li>
				<li><a href="javascript:">全桥梁段错台</a></li>
				<li><a href="javascript:">全桥偏差超限</a></li>
			</ul>
			<div class="bridge-echart">
				<div class="altitude">
					<div id="hightDeviation"></div>
				</div>
				<div class="centerLine">
					
					<div id='middleLineDeviation'></div> 
				</div>
				<div class="verticalMold">
					<div id='elevationDeviation'></div> 
				</div>
				<div class="ld">
					<div id='ldCuoTai'></div>
				</div>
				<div class="deviation-region">
					<div class="brige-table" >
						<table class="table table-bordered table-responsive"
							id="tblWarnInfo">
							<thead>
								<tr>
									<td>序号</td>
									<td>T构</td>
									<td>梁段</td>
									<td>超限测点编号</td>
									<td>超限偏差(mm)</td>
									<td>正常偏差范围</td>
									<td>超限施工工况</td>
									<td>超限日期</td>
									<td>超限偏差类别</td>
									<td>处置状态</td>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
					<div class="tableinfo" id="tableinfo"></div>
				</div>
			</div>
		</div>
		<div class = "bridge-content" id="cediancontent">
			<div>
					<span>施工工况：</span>
					<select name="condition" id="condition" onchange="shigongchange()">
						<option value="" >全部</option>
					</select>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					 <span class="shikuang">天气：</span>
					 <span class="shikuang" id="tianqi">调取当地气象信息</span>
					 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					 <span class="shikuang">温度：</span>
					 <span class="shikuang" id="wendu"></span>
					 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					 <span class="shikuang">气压：</span>
					 <span class="shikuang" id="qiya"></span>
					 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					 <span class="tipText">提示：</span>
					 <span class="tipText" id="tipinfo"></span>
			</div>
			<div class="hrdiv"></div>
			<div>
				<table id="cediantable" class="table table-bordered table-responsive">
					<thead>
						<tr>
							<th>序号</th>
							<th>测点</th>
							<th>施工工况</th>
							<th>测点类型</th>
							<th>测量时间</th>
							<th>理论高程(m)</th>
							<th>实测高程(m)</th>
							<th>高程偏差(mm)</th>
							<th>理论坐标X</th>
							<th>实测坐标X</th>
							<th>X偏差(mm)</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		</div>
<div style="display:none">
	<img id="warnimg" src="<%=basePath %>static/images/warn.png"/>
</div>
		<div  style="display:none" id="ldinfo">
			<div class="managementPage ">
				<div class="managementBody">
					<div>
						<span>当前选中梁段：</span><span id="ldname"></span>
						&nbsp;&nbsp;&nbsp;<input type="radio" name="licheng" value="0" checked class="licheng" onchange="lichengChange()" id="xlicheng" /><span class="xlicheng">小里程</span>
						<input type="radio" name="licheng" class="licheng" value="1" onchange="lichengChange()" id="dalicheng"  /><span class="dalicheng">大里程</span>
						<div id="back" onclick="back()">
							<img src="<%=basePath %>static/images/back.png"/>
							
		<!-- 					<span class="back">返回全桥</span> -->
						</div>
					</div>
				<div>
					<canvas id = "cedian" width="360px" height="210px"></canvas>
				</div>
				</div>
			</div>
		</div>

	</div>
	
	<input type="hidden" id="projectId" value="${projectId }">
	<input type="hidden" id="conbeamId" value="${conbeamId }">

	<script type="text/javascript" src="<%=basePath %>static/plugins/jQuery/jquery-2.1.4.js"></script>
	<script type="text/javascript" src="<%=basePath %>static/plugins/jQuery/jquery.min.js"></script>



	<script type="text/javascript" src="<%=basePath %>static/plugins/jQueryUI/jquery-ui-1.10.3.min.js"></script>
	<script type="text/javascript" src="<%=basePath %>static/plugins/datepicker/jQuery-jcDate.js"></script>
	<script type="text/javascript" src="<%=basePath %>static/plugins/jqmeter/jqmeter.js"></script>
	
	<!-- echarts2.0 -->
	<script src="<%=basePath %>static/plugins/echarts2.0/echarts.js" type="text/javascript"></script>
	<!-- bootstrap -->
	<script src="<%=basePath %>static/plugins/bootstrap/js/bootstrap.min.js"></script>
	<script src="<%=basePath %>static/js/common.js"></script>
	<script src="<%=basePath %>static/js/menuNav.js"></script>
	<script src="<%=basePath %>static/js/homeProjectEchart.js"></script>
	<script src="<%=basePath %>static/js/homeCRC.js"></script>
	<script src="<%=basePath %>static/js/home.js"></script>
	
	<script src="<%=basePath %>static/js/mobile/homeBridge.js"></script>
	<script src="<%=basePath %>static/js/mobile/homeBridgeEchart.js"></script>
	<script type="text/javascript">
	
	var projectId=$("#projectId").val();
	var conbeamId = $("#conbeamId").val();

		$(function(){
				// 连续梁形象描画
				eval('initBridge(' + conbeamId + ')');
				// 连续梁偏差描画
				eval('initBridgeEchart(' + projectId + ', ' + conbeamId + ')');
				//return;
			//}); 
		});	
	</script>
</body>
</html>