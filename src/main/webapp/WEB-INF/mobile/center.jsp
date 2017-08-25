 <%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" Content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
<title>连续梁线形监测系统</title>
<link rel="stylesheet" href="../static/css/mobile/header.css" type="text/css">
<link rel="stylesheet" href="../static/css/mobile/center.css" type="text/css">

</head>
<body>
<div class="header">
		<div class="back">
			<img alt="返回" src="../static/images/mobile/index_back.png">
		</div>
		
		<div class="menu">
			<img alt="菜单" src="../static/images/mobile/index_menu.png">
		</div>
		<div class="font"><label id="titleName">中国铁路总公司</label></div>
</div>
<div style="height: 44px"></div>
<div  id = "slider" >
	<div class="content1">
		<div class="c_header">
			<label>连续梁监测状态统计</label>
		</div>
		<div class="body1 bold">
			<div class="body1_box1 h10">
				<div class="bF2 w5 right h10" id="lxlz"></div>
				<div class="white w5 h10" style="background-color: #6CCAC9">总数</div>
			</div> 
			<div class="body1_box3">
				<div style="line-height: 22px">
					<div class="bF2 w5 right" id="lxlj"></div>
					<div class="white w5 h10" style="background-color: #F8D347">监测中</div>
				</div>
				<div style="line-height: 22px;margin-top: 6px">
					<div class="bF2 w5 right" id="lxly"></div>
					<div class="white w5 h10" style="background-color: #A9D86E">已合龙</div>
				</div>
			</div>
			<div class="body1_box2">
				<div style="line-height: 22px">
					<div class="bF2 w5 right" id="lxlw"></div>
					<div class="white w5 h10" style="background-color: #FF6C60">未监测</div>
				</div>
				<div style="line-height: 22px;margin-top: 6px">
					<div class="bF2 w5 right" id="lxld"></div>
					<div class="white w5 h10" style="background-color: #57C8F2">待合龙</div>
				</div>
			</div>
		</div>
	</div>
	<div class="content2">
		<div class="c_header">
			<label>综合统计表</label>
		</div>
		<div class="content2_box"> 
			<table class="w10 table" id="areaSummary">
				<thead>
					<tr>
						<td rowspan="2">片区/项目</td>
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
	<div class="content3">
		<div class="c_header">
			<label>主跨跨度分布及监测状态</label>
		</div>
		<div class="content3_box"> 
			<!-- <div style="float: left;width: 55%"> -->
				<table class="w10 table" style="line-height: 22px" id="zkkdfbzt">
				<thead>
					<tr>
						<td>跨度</td>
						<td>数量</td>
						<td>已监测</td>
						<td>未监测</td>
						<td>跨度占比</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>小于60</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>60-80</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>80-100</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>100-120</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>120及以上</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>合计</td>
						<td id="total">0</td>
						<td id="monitor">0</td>
						<td id="not_monitor">0</td>
						<td>100%</td>
					</tr>
				</tbody>
			</table>
			<!-- </div>
			<div style="height: 135px;float: left;width: 45%" id='mainPie'></div> -->
			<div style="clear: both;"></div>
		</div>
	</div>
</div>
	<script src="../static/plugins/jQuery/jquery.min.js"></script>
<!-- 	<script src="../static/plugins/echarts2.0/echarts.js" type="text/javascript"></script> -->
 	<script src="../static/js/mobile/jquery-myslider.js"></script> 
 	<script src="../static/js/mobile/menu.js"></script> 
	<script type="text/javascript">
	$(function(){
		//获取 综合总计表-片区汇总数据
		getCategorySummary();
		//获取 主跨跨度分布及监测状态 右侧饼图
		getlxlPieData();
		//获取 主跨跨度分布及监测状态 小于60饼图数据
		getlxlPie1Data();
		//获取 主跨跨度分布及监测状态 60-80饼图数据
		getlxlPie2Data();
		//获取 主跨跨度分布及监测状态 80-100饼图数据
		getlxlPie3Data();
		//获取 主跨跨度分布及监测状态 100-120饼图数据
		getlxlPie4Data();
		//获取 主跨跨度分布及监测状态 120以上饼图数据
		getlxlPie5Data();
	});
	
	//片区汇总的数据
	function getCategorySummary(){
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
		
		$.ajax({
			async:true,
			type:'POST',
			dataType:'json',
			url:'../crc/selectLxlCountbyPianqu',
			data:{"conbeamid":conbeamid},
			error:function(){
				alert('服务器错误');
				return;
			},
			success:function(data){
				//table表格中的计算（每一列）
				var totalZcount = 0;
				var totalWjccount =0;
				var totalJczcount = 0;
				var totalDhlcount = 0;
				var totalYhlcount = 0;
				var totalLdcount = 0;
				var totalGzjdcount = 0;
				if(data.result.length == 0){
					$("#lxlz").html(totalZcount);//连续梁监测状态统计-总数
					$("#lxlw").html(totalWjccount);//连续梁监测状态统计-未监测
					$("#lxlj").html(totalJczcount);//连续梁监测状态统计-监测中
					$("#lxld").html(totalDhlcount);//连续梁监测状态统计-待合龙
					$("#lxly").html(totalYhlcount);//连续梁监测状态统计-已合龙
				}
				//连续梁监测状态统计 总数
				var lxlStateCount = 0;	
				for(var i = 0; i < data.result.length;i++){
					// 连续梁监测状态统计 未监测
					var wjcCount = data.result[i].wjccount ? data.result[i].wjccount : 0;
					// 连续梁监测状态统计 监测中
					var jczCount = data.result[i].jczcount ? data.result[i].jczcount : 0;
					// 连续梁监测状态统计 待合龙
					var dhlCount = data.result[i].dhlcount ? data.result[i].dhlcount : 0;
					// 连续梁监测状态统计 已合龙
					var yhlCount = data.result[i].yhlcount ? data.result[i].yhlcount : 0;
					//连续梁处置中
					var warnlxlCount = data.result[i].warnlxlcountdeal ? data.result[i].warnlxlcountdeal : 0;
					//连续梁未处置
					var warnlxlCountnodeal = data.result[i].warnlxlcountnodeal ? data.result[i].warnlxlcountnodeal : 0; 
					//梁段处置中
					var warnLdcount = data.result[i].warnldcountdeal ? data.result[i].warnldcountdeal : 0;
					//梁段未处置
					var warnLdcountnodeal = data.result[i].warnldcountnodeal ? data.result[i].warnldcountnodeal : 0;
					// 连续梁监测状态统计 总数
					lxlStateCount = wjcCount + jczCount + dhlCount + yhlCount;
					
					// 各项总数
				 	totalZcount += lxlStateCount; // 连续梁监测状态统计 总数
				 	totalWjccount += wjcCount;	// 连续梁监测状态统计 未监测
				 	totalJczcount += jczCount;	// 连续梁监测状态统计 监测中
				 	totalDhlcount += dhlCount;	// 连续梁监测状态统计 待合龙
				 	totalYhlcount += yhlCount;	// 连续梁监测状态统计 已合龙
				  
				 	// 添加DOM
					$('#areaSummary tbody').append('<tr>'+
		                '<td><div data="0" class="pq_div"><span class="icon r"></span>'+
		                '<span id= "'+data.result[i].categoryid+'">&nbsp;' + 
		                	data.result[i].categoryname+'</span></div></td>'+
						'<td>' + warnlxlCount + '</td>'+		// 超限连续梁 未处置 
						'<td>' + warnlxlCountnodeal + '</td>'+	// 超限连续梁 处置中
						'<td>' + warnLdcount + '</td>'+		// 超限梁段 未处置
						'<td>' + warnLdcountnodeal + '</td>'+	// 超限梁段 处置中
						'</tr><tr>'+
						'<td colspan="5" style="border:0"></td></tr>');
				}
				$("#lxlz").html(totalZcount);//连续梁监测状态统计-总数
				$("#lxlw").html(totalWjccount);//连续梁监测状态统计-未监测
				$("#lxlj").html(totalJczcount);//连续梁监测状态统计-监测中
				$("#lxld").html(totalDhlcount);//连续梁监测状态统计-待合龙
				$("#lxly").html(totalYhlcount);//连续梁监测状态统计-已合龙
				loadProjectList();
			   }			
		});
	}

	//获取 主跨跨度分布及监测状态 右侧饼图
	function getlxlPieData_old() {
		var url = '../crc/selectLxlTotalCount';
		$.ajax({
			async : true,//是否异步
			cache : false,//是否使用缓存
			type : 'GET',//请求方式：get
			dataType : 'json',//数据传输格式：json
			url : url,//请求的action路径
			data:{"conbeamid":conbeamid},
			error : function() {
				return;
			},
			success:function(data){
				var sixty = data.sixtycount * 100/ data.zcount;
				//判断百分数是否小于0.01%，如果小于则将其赋值0.0001
					if(sixty < 0.0001){
						sixty =0.0001
					}
				var sixtyCount = sixty.toFixed(2) + '%';										 //小于60的值
				var six = parseFloat(sixty.toFixed(2));
				
				var eighty = data.eightycount * 100 / data.zcount;
				//判断百分数是否小于0.01%，如果小于则将其赋值0.0001
				if(eighty < 0.0001){
					eighty =0.0001
				}
				var eightyCount = eighty.toFixed(2)+ '%';										//60-80之间的值
				var eight = parseFloat(eighty.toFixed(2));
				
				var hunder = data.hundredcount * 100 / data.zcount;
				//判断百分数是否小于0.01%，如果小于则将其赋值0.0001
				if(hunder < 0.0001){
					hunder =0.0001
				}
				var hundredCount = hunder.toFixed(2) + '%';									//80-100之间的值
				var h = parseFloat(hunder.toFixed(2));
				
				var hundredtwenty = data.hundredtwentycount *100 / data.zcount;  				 //100-120之间的值
				//判断百分数是否小于0.01%，如果小于则将其赋值0.0001
				if(hundredtwenty < 0.0001){
					hundredtwenty = 0.0001
				}
				var hundredtwentyCount= hundredtwenty.toFixed(2) +'%';
				var hun = 	parseFloat(hundredtwenty.toFixed(2));
				
				var homeElse = (six +eight+h +hun).toFixed(2);
				var elseCount = (100 - homeElse).toFixed(2)+'%';								//>120的值
				
				var sixtycountName ;      //判断小于60的名字是否存在
				var eightycountName;      //判断60-80的名字是否存在
				var hundredCountName;			//判断80-100的名字是否存在
				var hundredtwentyCountName;			//判断100-120的名字是否存在
				var elseCountName;			//判断大于120名字是否存在
				var minData = 0;  				//最小值
				var a = '5%'					//设一个常量
				
				//判断value值是否为0；如果为0则name为空，否则给name增加一个参数；
				if(data.sixtycount == 0){
					sixtycountName = "";
				}else{
					if(sixty == 0.0001){
						sixtyCount = '小于0.01%'
						sixtycountName = '小于60' + '\n' + sixtyCount;
					}
					sixtycountName = '小于60' + '\n' +sixtyCount;
				}
				
				if(data.eightycount ==0){
					eightycountName =""
				}else{
					if(eighty == 0.0001){
						eightyCount = '小于0.01%'
						eightycountName = '小于60' + '\n' + eightyCount;
					}
					eightycountName = '60-80'+ '\n'  + eightyCount;
				}
				
				if(data.hundredcount == 0){
					hundredCountName = ""
				}else{
					if(hunder == 0.0001){
						hundredCount = '小于0.01%'
						hundredCountName = '小于60' + '\n' + hundredCount;
					}
					
					hundredCountName = '80-100'+ '\n'  + hundredCount;
				}
				
				if(data.hundredtwentycount == 0){
					hundredtwentyCountName = ""
				}else{
					if(hundredtwenty == 0.0001){
						hundredtwentyCount = '小于0.01%'
						hundredtwentyCountName = '小于60' + '\n' + hundredtwentyCount;
					}
					
					hundredtwentyCountName = '100-120'+ '\n'  + hundredtwentyCount;
				}
				
				if(data.elsecount == 0){
					elseCountName =""
				}else{
					elseCountName ='大于120'+ '\n'  + elseCount;
				}
				
				//将data中的值组成一个数组
				var dataArr = [
				               {value:data.sixtycount,name:sixtycountName},
				               {value:data.eightycount,name:eightycountName},
				               {value:data.hundredcount,name:hundredCountName},
				               {value:data.hundredtwentycount,name:hundredtwentyCountName},
				               {value:data.elsecount,name:elseCountName}
				             ];
				//将数组中value为0的对象去除
				//将数组中第一个数赋值给一个常量用于取最小值
//				if(dataArr.length > 0){
					var echartDataArr = []
					for(var i = 0;i<dataArr.length;i++){
						if(dataArr[i].value !=0){
							echartDataArr.push(dataArr[i])
						}
					}
				//判断所有数值都为0的情况
				if(data.sixtycount == 0 && data.eightycount == 0 && data.hundredcount== 0 && data.hundredtwentycount== 0 && data.elsecount== 0)
				{
					var myChart6 = echarts.init(document.getElementById('mainPie'));
					option = {
							title:{
								text:'暂无数据',
								top:90,
								left:'35%',
								textStyle:{
									color:'#333'
								}
							},
							color : [ '#F2F2F2' ],
							calculable : false,
							series : [ {
								type : 'pie',
								radius : '90%',
								center : [ '50%', '50%' ],
								position : 'right',
								hoverAnimation:false,
								labelLine:{
									normal:{
										show:false,
									}
								},
								itemStyle : {
									normal : {
										color:'#F2F2F2'
									},
									emphasis:{
										color:'#F2F2F2'
									}
								},
								data : [{
									value : 0
								}]
							} ]
						}
					myChart6.setOption(option);
					
					}else{
						
						var myChart = echarts.init(document.getElementById('mainPie'));
						myChart.setOption({
						color : [ '#C4C4C4', '#ABABAB', '#8B8B7A', '#5E5E5E', '#454545' ],
						calculable : false,
						series : [ {
							name : '访问来源',
							type : 'pie',
							hoverAnimation:false,
							radius : '70%',
							center : [ '50%', '55%%' ],
							position : 'right',
							labelLine:{
								normal:{
									show:true,
									length:10,
									length2:10,
								}
							},
							
							data : echartDataArr
						} ]
					  });
					}
				}

			})		
		}
		//获取 主跨跨度分布及监测状态 代替右侧饼图
		function getlxlPieData() {
			var url = '../crc/selectLxlTotalCount/'+conbeamid;
			$.ajax({
				async : true,//是否异步
				cache : false,//是否使用缓存
				type : 'POST',//请求方式：get
				dataType : 'json',//数据传输格式：json
				url : url,//请求的action路径
				//data:{"conbeamid":conbeamid},
				error : function() {
					return;
				},
				success:function(data){
					var zcount = data.zcount;
					var sixtycount = data.sixtycount * 100;//小于60
					$("#zkkdfbzt tbody tr").eq(0).children("td").eq(4).html((sixtycount/zcount).toFixed(1)+'%');
					var eightycount = data.eightycount * 100;// 60-80
					$("#zkkdfbzt tbody tr").eq(1).children("td").eq(4).html((eightycount/zcount).toFixed(1)+'%');
					var hundredcount = data.hundredcount * 100;// 80-100
					$("#zkkdfbzt tbody tr").eq(2).children("td").eq(4).html((hundredcount/zcount).toFixed(1)+'%');
					var hundredtwentycount = data.hundredtwentycount * 100;// 100-120
					$("#zkkdfbzt tbody tr").eq(3).children("td").eq(4).html((hundredtwentycount/zcount).toFixed(1)+'%');
					var elsecount = data.elsecount * 100;// 120以上
					$("#zkkdfbzt tbody tr").eq(4).children("td").eq(4).html((elsecount/zcount).toFixed(1)+'%');
					}
				
				})		
			}
			
		//获取 主跨跨度分布及监测状态 小于60饼图数据
		function getlxlPie1Data() {
			var url = '../crc/select60Count/'+conbeamid;
			$.ajax({
				async : true,//是否异步
				cache : false,//是否使用缓存
				type : 'POST',//请求方式：POST
				dataType : 'json',//数据传输格式：json
				url : url,//请求的action路径
				//data:{"conbeamid":conbeamid},
				error : function() {
					return;
				},
				success:function(data){
					var tds = $("#zkkdfbzt tbody tr").eq(0).children("td");
					//总计
					tds.eq(1).html(data.zcount);
					//已监测
					tds.eq(2).html(data.ycount);
					//未监测
					tds.eq(3).html(data.wcount);
					//合计
					refreshMonitor(data.zcount,data.ycount,data.wcount);
				}
			})
		}
		//获取 主跨跨度分布及监测状态 60-80饼图数据
		function getlxlPie2Data() {
			var url = '../crc/select80Count/'+conbeamid;
			$.ajax({
				async : true,//是否异步
				cache : false,//是否使用缓存
				type : 'POST',//请求方式：POST
				dataType : 'json',//数据传输格式：json
				url : url,//请求的action路径
				//data:{"conbeamid":conbeamid},
				error : function() {
					return;
				},
				success:function(data){
					var tds = $("#zkkdfbzt tbody tr").eq(1).children("td");
					//总计
					tds.eq(1).html(data.zcount);
					//已监测
					tds.eq(2).html(data.ycount);
					//未监测
					tds.eq(3).html(data.wcount);
					//合计
					refreshMonitor(data.zcount,data.ycount,data.wcount);
				}
			})
			
		}
		//获取 主跨跨度分布及监测状态 80-100饼图数据
		function getlxlPie3Data() {
			var url = '../crc/select100Count/'+conbeamid;
			$.ajax({
				async : true,//是否异步
				cache : false,//是否使用缓存
				type : 'POST',//请求方式：POST
				dataType : 'json',//数据传输格式：json
				url : url,//请求的action路径
				//data:{"conbeamid":conbeamid},
				error : function() {
					return;
				},
				success:function(data){
					var tds = $("#zkkdfbzt tbody tr").eq(2).children("td");
					//总计
					tds.eq(1).html(data.zcount);
					//已监测
					tds.eq(2).html(data.ycount);
					//未监测
					tds.eq(3).html(data.wcount);
					//合计
					refreshMonitor(data.zcount,data.ycount,data.wcount);
				}
			})
			
		}
		//获取 主跨跨度分布及监测状态 100-120饼图数据
		function getlxlPie4Data() {
			var url = '../crc/select120Count/'+conbeamid;
			$.ajax({
				async : true,//是否异步
				cache : false,//是否使用缓存
				type : 'POST',//请求方式：get
				dataType : 'json',//数据传输格式：json
				url : url,//请求的action路径
				//data:{"conbeamid":conbeamid},
				error : function() {
					return;
				},
				success:function(data){
					var tds = $("#zkkdfbzt tbody tr").eq(3).children("td");
					//总计
					tds.eq(1).html(data.zcount);
					//已监测
					tds.eq(2).html(data.ycount);
					//未监测
					tds.eq(3).html(data.wcount);
					//合计
					refreshMonitor(data.zcount,data.ycount,data.wcount);
				}
			})
		}
		//获取 主跨跨度分布及监测状态 120以上饼图数据
		function getlxlPie5Data() {
			var url = '../crc/selectElseCount/'+conbeamid;
			$.ajax({
				async : true,//是否异步
				cache : false,//是否使用缓存
				type : 'POST',//请求方式：POST
				dataType : 'json',//数据传输格式：json
				url : url,//请求的action路径
				//data:{"conbeamid":conbeamid},
				error : function() {
					return;
				},
				success:function(data){
					var tds = $("#zkkdfbzt tbody tr").eq(4).children("td");
					//总计
					tds.eq(1).html(data.zcount);
					//已监测
					tds.eq(2).html(data.ycount);
					//未监测
					tds.eq(3).html(data.wcount);
					//合计
					refreshMonitor(data.zcount,data.ycount,data.wcount);
				}
			})
		}
		
		//加载项目列表
		function loadProjectList(){
			$(".pq_div").on("click",function(){
				//用来判断是否加载过				
				var isload = $(this).parent().parent().next("tr").children("td").html();
				if($(this).attr("data")==0){
					if(isload==null || isload==""){ //请求过的就不在请求服务器
						var pianquid = $(this).children("span").eq(1).attr('id');
						var wArr = [];
						$(this).parent().parent().children("td").each(function(){
							wArr.push($(this).width()+1);
						});
						var tableobj = getCategoryItemData(pianquid,wArr);
						$(this).parent().parent().next("tr").children("td").html(tableobj);
					}
					$(this).attr("data",1);
					$(this).find("span").eq(0).removeClass("r").addClass("d");
					$(this).parent().parent().next("tr").children("td").find("div").show();
				}else{
					$(this).find("span").eq(0).removeClass("d").addClass("r");
					$(this).attr("data",0);
					$(this).parent().parent().next("tr").children("td").find("div").hide();
					//$(this).parent().parent().next("tr").css({"border":0});
				}
			});	
		};
		

		/**
		 * 各地区片区
		 * @param id
		 */
		function getCategoryItemData(id,wArr){
			var tableobj = $("<table class='projectList'></table>");
			$.ajax({
				async:false,
				type:'POST',
				dataType:'json',
				data:{"id":id,
					  "conbeamid":conbeamid},
				url:"../crc/selectLxlCountbyProject/",
				error:function(){
					alert('首页服务器错误')
					return;
				},
				success : function(data){
					//table表格中的计算（每一列）
					for(var i = 0; i < data.result.length;i++){
						//连续梁处置中
						var warnlxlCount = data.result[i].warnlxlcountdeal ? data.result[i].warnlxlcountdeal : 0;
						//连续梁未处置
						var warnlxlCountnodeal = data.result[i].warnlxlcountnodeal ? data.result[i].warnlxlcountnodeal : 0; 
						//梁段处置中
						var warnLdcount = data.result[i].warnldcountdeal ? data.result[i].warnldcountdeal : 0;
						//梁段未处置
						var warnLdcountnodeal = data.result[i].warnldcountnodeal ? data.result[i].warnldcountnodeal : 0;
					 	tableobj.append('<tr><td class="f_td" width = "'+wArr[0]+
					 			'"><a id="'+data.result[i].itemid+
					 			'" onclick=toProjectinfo(this)>' + data.result[i].itemname+
								'</a></td><td width = "'+wArr[1]+'">' + warnlxlCount + 
								'</td><td style="width: '+wArr[2]+'px">' + warnlxlCountnodeal + 
								'</td><td width = "'+wArr[3]+'">' + warnLdcount + 
								'</td><td class="last_td" width = "'+wArr[4]+'">' + warnLdcountnodeal + 
								'</td></tr>');
					}
				}
			})
			return $("<div style='width:100%;border:0'></div>").append(tableobj);
		}
		/**
		*主跨跨度分布及监测状态  合计
		*/
		function refreshMonitor(total,monitor,not_monitor){
			$("#total").html(Number($("#total").html()) + Number(total));
			$("#monitor").html(Number($("#monitor").html()) + Number(monitor));
			$("#not_monitor").html(Number($("#not_monitor").html()) + Number(not_monitor));
		}
		/**
		*跳转到项目详情
		*/
		function toProjectinfo(obj){
			var id = obj.id;
			var name = $(obj).html();
			var url  = encodeURI(encodeURI("projectInfo?id="+id+"&name="+name));
			$("#content",window.parent.document).attr("src",url);
		}
	</script>
	
</body>
</html>