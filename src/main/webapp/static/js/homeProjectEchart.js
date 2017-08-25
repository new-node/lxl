/*
 * 项目首页ECharts
 */


/**
 * 初始化时间
 */

var conditionStartTime = ' ';
/**
 * 初始化时间
 */
var conditionEndTime = ' ';

var conbeamid = "";
var flag = 0;
/**
 * 初始化
 * @param projectId
 */
function initProjectEchart(projectId) {
	
	var lxlList = JSON.parse(getConditionConBeamList());
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
	
	getProjectPie1Data(projectId);
	//获取 主跨跨度分布及监测状态 60-80饼图数据
	getProjectPie2Data(projectId);
	//获取 主跨跨度分布及监测状态 80-100饼图数据
	getProjectPie3Data(projectId);
	//获取 主跨跨度分布及监测状态 100-120饼图数据
	getProjectPie4Data(projectId);
	//获取 主跨跨度分布及监测状态 120以上饼图数据
	getProjectPie5Data(projectId);
	//获取 综合总计表-片区汇总数据
	getProjectZCountData(projectId);

	getProjectLdData(projectId);
	
	getProjectTime(projectId);	
	
	
	//连续梁与梁段的进度条
	getProgressData(projectId);
	
	
}

/************************某项目首页中按时间查询js*************************************/


function time1(){
	 flag = 1;
	 
	$(".time-view-start").jcDate({

		IcoClass : "jcDateIco",

		Event : "click",

		Speed : 100,

		Left : 0,

		Top : 28,

		format : "-",

		Timeout : 100

	});
	
	//点击时间控件中今天按钮
	$('#jcDateBtn samp').unbind('click');
	$('#jcDateBtn samp').bind('click',function(){
		var date = new Date();
		var oDate =  date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
		$(".time-view-start").val(oDate);
		$('#jcDate').hide();
	});
}

function time2(){
	 flag = 2;
	$(".time-view-end").jcDate({

		IcoClass : "jcDateIco",

		Event : "click",

		Speed : 100,

		Left : 0,

		Top : 28,

		format : "-",

		Timeout : 100

	});
	$('#jcDateBtn samp').unbind('click');
	$('#jcDateBtn samp').bind('click',function(){
		var date = new Date();
		var oDate =  date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
		$(".time-view-end").val(oDate);
		$('#jcDate').hide();
	})
}


function getProjectTime(projectId){
	time1();
	time2();
	
	$('#jcDate').unbind('click');	
	$('#jcDate').bind('click',function(){
			 conditionStartTime = "";
			//终止时间	
			 conditionEndTime = "";
			//起始时间
		 if($('.time-view-start').val() != null || $('.time-view-start').val() != undefined){
				conditionStartTime = $('.time-view-start').val();
			}
//			//终止时间	
			if($('.time-view-end').val() !=null || $('.time-view-end').val() != undefined){
				conditionEndTime = $('.time-view-end').val();
			}
			console.log(conditionStartTime);
			console.log(conditionEndTime);
		 if(conditionStartTime.length > 0 && conditionEndTime.length > 0){
				var startTmp = conditionStartTime.split("-");
				var endTmp = conditionEndTime.split("-");
				var sd = new Date(startTmp[0],startTmp[1],startTmp[2]);
				var ed = new Date(endTmp[0],endTmp[1],endTmp[2]);
				
				
				if(sd.getTime() > ed.getTime()){
					alert("开始日期不能大于结束日期");
					
				   if( flag == 1) $('.time-view-start').val("");
				   
				   if( flag == 2) $('.time-view-end').val("");
					
					return;
				}
			}
		 
	});
	
	$(".timeView-btn").bind('click',function(){
		getOverrunTime(projectId);						   //获取连续梁、梁段超限个数的时间
		
	});	
	
	 $('.echart-region,#menuOrgTree').click(function () {
		
		 if($('#jcDate').is(':visible')){
			 $('#jcDate').hide();
		 }
	   });
	 
	 //点击起始日期
	 $('.time-view-start').on('click',function(){
		 
		 //判断日期插件是否显示
		 if($('#jcDate').is(':visible')){
			 //取当前月份；
			 var month = $('#jcDateTt div samp').text();
			 month = month - 1;
			 var oMonth  = 0;
			 //初始化时将向下箭头隐藏
			 $('#jcDateTt a#d_next').css('width','0');
			 
			 //点击向上箭头使向下箭头出现
			 $('#d_prev').click(function(){
				 $('#jcDateTt a#d_next').css('width','15px')
			 });
			 
			 //点击向下箭头时取到此时月份，与初始化时月份进行对比
			 $('a#d_next').click(function(){
				  oMonth = $('#jcDateTt div samp').text();
				  if(oMonth==month){
						 $('#jcDateTt a#d_next').css('width','0');
					 }
			 });
			 
			 //取到当前visited所在位置，去掉其后对象的class中jcDateColor;
			 var num = 0;
			 var dateLth = $('.dateV li');
			 for(var i = 0;i<dateLth.length;i++){
				var objDate = dateLth[i];
				 if($(objDate).hasClass('visited')){
					num = i;
					break;
				 }
			 }
			 for(var k = num+1;k<dateLth.length;k++){
				 var subDate = dateLth[k];
				 $(subDate).removeClass('jcDateColor');
			 }
		 }
	 });
	 //点击终止日期
	 $('.time-view-end').on('click',function(){
		 	
		 //判断日期插件是否显示
		 if($('#jcDate').is(':visible')){
			 //取当前月份；
			 var month = $('#jcDateTt div samp').text();
			 month = month - 1;
			 var oMonth  = 0;
			 //初始化时将向下箭头隐藏
			 $('#jcDateTt a#d_next').css('width','0');
			 
			 //点击向上箭头使向下箭头出现
			 $('#d_prev').click(function(){
				 $('#jcDateTt a#d_next').css('width','15px')
			 });
			 
			 //点击向下箭头时取到此时月份，与初始化时月份进行对比
			 $('a#d_next').click(function(){
				  oMonth = $('#jcDateTt div samp').text();
				  if(oMonth==month){
						 $('#jcDateTt a#d_next').css('width','0');
					 }
			 });
			 
			 //取到当前visited所在位置，去掉其后对象的class中jcDateColor;
			 var num = 0;
			 var dateLth = $('.dateV li');
			 for(var i = 0;i<dateLth.length;i++){
				var objDate = dateLth[i];
				 if($(objDate).hasClass('visited')){
					num = i;
					break;
				 }
			 }
			 for(var k = num+1;k<dateLth.length;k++){
				 var subDate = dateLth[k];
				 $(subDate).removeClass('jcDateColor');
			 }
		 }
		
	 });
	 
	 
}


function getOverrunTime(projectId){
	//alert($('.time-view-start').val())
	 conditionStartTime = $('.time-view-start').val();
	conditionEndTime = $('.time-view-end').val();
	
	getProjectLdData(projectId);
	 
}

function getProjectLdData(projectId){
	//console.log(conditionStartTime+":"+conditionEndTime)
	var param ={
			projectid : projectId,	// '159'
			conbeamid : conbeamid,
			sttime : conditionStartTime,
			endtime : conditionEndTime
	};

	var url = "pro/getWarnInfo";
	$.ajax({
		async:true,
		type:'POST',
		dataType:'json',
		data:param,
		url:url,
		error:function(){

			return;
		},
		success:function(data){
			
			var language = $.getUrlParam('locale');
			jQuery.i18n.properties({//加载资浏览器语言对应的资源文件
				name:'strings', //资源文件名称
				path:'i18n/', //资源文件路径
				mode:'map', //用Map的方式使用资源文件中的值
				language:language,// 对应的语言
				callback: function() {//加载成功后设置显示内容
					HOME_NOWARN = $.i18n.prop('home.nowarn');
					HOME_OVERRUNBRIDGE = $.i18n.prop('home.OverrunBridge');
					HOME_OVERRUNLD = $.i18n.prop('home.OverrunLD');
					HOME_COUNT = $.i18n.prop('home.count');
				}
			});
			
			
			var lxlAndLd = data.result ? data.result : 0 ;
			//横坐标
			var itemArray = new Array;
			//连续梁数组
			var lxlArray = new Array;
			//梁段数组
			var ldArray = new Array;
			
			//超限连续梁
			var warnlxlcount;
			
			//超限梁段
			var warnldcount;
			//console.log(data);
			if(data.code != -1 ){
				
				//$('#main').empty();

				//当数据为0或者数据异常时
				
				itemArray = [];	 //x轴的名字为空
				
				
				lxlArray = [];	 	//连续梁的数据为空
				
				ldArray = [];	   //梁段的数据为空
				if(lxlAndLd== 0){
					var myChart = echarts.init(document.getElementById('main'));					//获取id
					
					option = {
						title:{
							
							text:HOME_NOWARN,
							textStyle:{
								color:'#CCCCCC',
								fontSize:24
							},
							top:'100',
							left:'35%'
								
							},
						legend: {//标题
							data:[HOME_OVERRUNBRIDGE,HOME_OVERRUNLD],
							right:30,
							top:10,
							
						},
						grid:{//坐标轴的高度与宽度
						  width:'80%',
						  height:'200',
						  top:20,
						  boundaryGap:1,
						}, 
						xAxis: [
							{
								type: 'category',
								data: itemArray,
								axisTick:{
									show:false
								},
								splitLine:{
									show:false
								},
								axisLine:{
									show:false
								},
								axisLine:{
									show:false
								}
							}
						],
						yAxis: [
							{
								type: 'value',
								name: HOME_COUNT,
							   nameLocation:'middle',
								nameGap:20,
								nameTextStyle:{
								  fontSize:14,
									color:'#797979'
								},
								axisTick:{
									show:false
								},
								splitLine:{
									show:false
								},
								axisLine:{
									show:false
								}
							},

						],
					   
					 series: [
							{
								name:HOME_OVERRUNBRIDGE,
								type:'bar',
								itemStyle:{
								  normal:{
									  color:'#0D9EFF'
								  }
								},
								barGap:0.1,
								barCategoryGap:10,
								data:lxlArray,
								barWidth:20,
								markLine:{
									data:[
										[
										   {
											 x:'10%',
											 y:220,
											 symbol:'none',
											 lineStyle:{
												 normal:{
													  type:'solid',
													  width:1,
													  color:'#333'
													}
												}
											},{
											x:'10%',
											y:20,
											lineStyle:{
												
												normal:{
													type:'solid',
													width:1,
													color:'#333'
												}
											}
										},
											{
												lineStyle:{
													normal:{
														type:'solid',
														width:2,
														color:'#797979'
													}
												}
											}
										]
									]
								}

							},
							{
								name:HOME_OVERRUNLD,
								type:'bar',
								itemStyle:{
									normal:{
										color:'#00CC99'
									}
								},
								data:ldArray,
								barWidth:20,
								barGap:'5%',
								markLine:{
									label:{
										normal:{
											show:false
										}
									},
									data:[
										{
											yAxis:0,
											symbolSize:1,
											lineStyle:{
												normal:{
													type:'solid',
													width:2,
													color:'#797979'
												}
											}
										}
									]
								}
							},

						]
					};

					myChart.setOption(option);
					
				}else{
					
					for(var i = 0; i<lxlAndLd.length;i++){
						
						var item = lxlAndLd[i];
						
						//超限连续梁的总数
						warnlxlcount = item.warnlxlcountdeal + item.warnlxlcountnodeal;
						
						//超限梁段的总数
						warnldcount = item.warnldcountdeal + item.warnldcountnodeal;
						
						itemArray.push(item.section);
						
						lxlArray.push(warnlxlcount);//连续梁数据

						ldArray.push(warnldcount);
						//console.log(itemArray)
						/**
						 * 为了是坐标轴最右端不顶着横坐标的箭头，
						 * 给x轴添加一个空坐标
						 * */
						if(i+1 ==lxlAndLd.length){
							itemArray.push('');
							
						}
						
						var myChart = echarts.init(document.getElementById('main'));//获取id
						
						option = {
							legend: {//标题
								data:[HOME_OVERRUNBRIDGE,HOME_OVERRUNLD],	
								right:30,
								top:0,
								itemHeight:10,
								textStyle:{
									fontSize:12
								}
							},
							grid:{//坐标轴的高度与宽度
							  width:'90%',
							  height:'200',
							  top:20,
							  boundaryGap:1,
							}, 
							xAxis: [
								{
									type: 'category',
									data: itemArray,
									axisTick:{
										show:false
									},
									splitLine:{
										show:false
									},
									axisLine:{
										show:false
									},
									axisLine:{
										show:false
									}
								}
							],
							yAxis: [
								{
									type: 'value',
									name: HOME_COUNT,
								   nameLocation:'middle',
									nameGap:30,
									nameTextStyle:{
									  fontSize:14,
										color:'#797979'
									},
									axisTick:{
										show:false
									},
									splitLine:{
										show:false
									},
									axisLine:{
										show:false
									}
								},

							],
							dataZoom: [
									   {
										   show: true,
										   type: 'inside',
										   start: 0,
										   end: 100,
										   
									   }
								   ],
						 series: [
								{
									name:HOME_OVERRUNBRIDGE,
									type:'bar',
									itemStyle:{
									  normal:{
										  color:'#0D9EFF'
									  }
									},
									barGap:0.1,
									barMaxWidth :20,
									barCategoryGap:10,
									data:lxlArray,
								   // barWidth:20,
									markLine:{
										data:[
											[
											   {
												 x:'10%',
												 y:220,
												 symbol:'none',
												 lineStyle:{
													 normal:{
														  type:'solid',
														  width:1,
														  color:'#333'
														}
													}
												},{
												x:'10%',
												y:20,
												lineStyle:{
													normal:{
														type:'solid',
														width:1,
														color:'#333'
													}
												}
											},
												{
													lineStyle:{
														normal:{
															type:'solid',
															width:2,
															color:'#797979'
														}
													}
												}
											]
										]
									}

								},
								{
									name:HOME_OVERRUNLD,
									type:'bar',
									itemStyle:{
										normal:{
											color:'#00CC99'
										}
									},
									data:ldArray,
									barMaxWidth :20,
									barGap:'5%',
									markLine:{
										label:{
											normal:{
												show:false
											}
										},
										data:[
											{
												yAxis:0,
												symbolSize:1,
												lineStyle:{
													normal:{
														type:'solid',
														width:2,
														color:'#797979'
													}
												}
											}
										]
									}
								},

							]
						};

						myChart.setOption(option);
					}
					
				}
			}
		}
	})
}


/*进度条js*/
/*进度条问题的处理*/

//连续梁进度条
function getProgressData(projectId){
	
	var url="pro/getCxlxlCount";
	$.ajax({
		async:true,
		type:'POST',
		dataType:'json',
		data:{'projectid':projectId,
			  'conbeamid': conbeamid,},	// 705
		url:url,
		error:function(){
			
			return;
		},
		success:function(data){
			/*home.indeal =处置中
			home.nodeal =未处置*/
			var language = $.getUrlParam('locale');
			jQuery.i18n.properties({//加载资浏览器语言对应的资源文件
				name:'strings', //资源文件名称
				path:'i18n/', //资源文件路径
				mode:'map', //用Map的方式使用资源文件中的值
				language:language,// 对应的语言
				callback: function() {//加载成功后设置显示内容
					HOME_INDEAL= $.i18n.prop('home.indeal');
					HOME_NODEAL= $.i18n.prop('home.nodeal');
					HOME_COUNT0= $.i18n.prop('home.count0');
				}
			});
			
			
			
			if(data.code == 1){		
				$('#jqmeter-container1,#jqmeter-container2').append('<h3 style="color:#F2F2F2;">暂无数据</h3>');
				
			}else if(data.code == -1){
				$('#jqmeter-container1,#jqmeter-container2').append('<h3 style="color:#F2F2F2;">数据异常</h3>');
			}else{
				
				var lxlzcount = data.result.warnlxlcount;
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
				
				$('#jqmeter-container1').jQMeter({			
					goal: '$' + lxlzcount,
					raised: '$' + warnlxlycount,
					width: '100%',
					height: '50px',
					bgColor:'#e5e5e5',
					barColor:'#189fd9'
				});
				
				$("#lxl-overCount").append(HOME_NODEAL+": "+ warnlxlcountnodeal +" "+ HOME_COUNT0);
				$('#lxl-notDisposed').append(HOME_INDEAL +": "+ warnlxlcount +" "+ HOME_COUNT0);
				

				/**
				 * 超限梁段进度条
				 * */
				
				//梁段未处置
				
				var ldcountnodeal = data.result.warnldcountnodeal ;
				
				if(ldcountnodeal == null){
					ldcountnodeal = 0;
				};
				
				//梁段处置中
				var ldcount = data.result.warnldcountdeal;
				if(ldcount == null){
					ldcount = 0;
				};
				//梁段已处置
				var ldycount = data.result.warnldcountyesdeal;
				if(ldycount == null){
					ldycount = 0;
				};
				
				var ldzcount = data.result.warnldcount;
							
				
				$('#jqmeter-container2').jQMeter({
					goal: '$'+ldzcount,
					raised: '$'+ldycount,
					width: '100%',
					height: '50px',
					bgColor:'#e5e5e5',
					barColor:'#189fd9'
				});
				$("#overCount").append(HOME_NODEAL+": "+ ldcountnodeal + " "+ HOME_COUNT0);
				$('#notDisposed').append(HOME_INDEAL+": " + ldcount + " "+ HOME_COUNT0);
				
				
			}
			
			//console.log((ldycount * 100/ldzcount).toFix(2))
			
			
			var b2 = ldycount * 100/ ldzcount;
			var bf2 = b2.toFixed(2)+'%'
			var cl = '14.50%';
			//进度条百分数显示初始时是否显示有overflow
			
			/**
			 * progress2中进度条条件是否显示的判断
			 * */
//			if(parseInt(bf2) < parseInt(cl)){
//				$('#jqmeter-container2 .inner-therm span').css('display','none');
//				$('#jqmeter-container2 .inner-therm ').mouseover(function(){
//					$('#jqmeter-container2 .inner-therm span').show();
//					$('#jqmeter-container2 .inner-therm span').css('position','absolute')
//				})
//				$('#jqmeter-container2 .inner-therm').mouseout(function(){
//					$('#jqmeter-container2 .inner-therm span').hide();
//				})
//			}
			
			/**
			 * progress1中进度条条件是否显示的判断
			 * */
			var b1 =  warnlxlycount* 100/ lxlzcount;
			var bf1 = b1.toFixed(2)+'%';
			
//			if(parseInt(bf1) < parseInt(cl)){
//				$('#jqmeter-container1 .inner-therm span').css('display','none');
//				$('#jqmeter-container1 .inner-therm ').mouseover(function(){
//					$('#jqmeter-container1 .inner-therm span').show();
//					$('#jqmeter-container1 .inner-therm span').css('position','absolute')
//				})
//				$('#jqmeter-container1 .inner-therm').mouseout(function(){
//					$('#jqmeter-container1 .inner-therm span').hide();
//				})
//			};
			
		}
		
	})
	
}


//获取  小于60饼图数据
function getProjectPie1Data(projectId) {

//	projectId = 159;
	
	$.ajax({
		async:true,
		type:'POST',
		dataType:'json',
		data:{'projectid':projectId},
		url:'pro/select60CountByPro/'+conbeamid,
		error:function(){
		
			return;
		},
		success:function(data){
			var language = $.getUrlParam('locale');
			jQuery.i18n.properties({//加载资浏览器语言对应的资源文件
				name:'strings', //资源文件名称
				path:'i18n/', //资源文件路径
				mode:'map', //用Map的方式使用资源文件中的值
				language:language,// 对应的语言
				callback: function() {//加载成功后设置显示内容
					HOME_TOTAL= $.i18n.prop('home.total');
					HOME_MONITORED= $.i18n.prop('home.monitored');
					HOME_LESSTHAN= $.i18n.prop('home.lessThan');
				}
			});
			
			//未监测
			var wcount = parseInt(data.wcount);

			//已监测
			var ycount = parseInt(data.ycount);
			//总计
			var zcount = parseInt(data.zcount);
			//已监测百分比
			var ypercent = ((parseFloat(data.ypercent)).toString()*100).toFixed(1)+'%';
				
			
			var myChart1 = echarts.init(document.getElementById('mainPie1'));
			
				option = {
						title : {
							text : HOME_LESSTHAN+'60',
							x :50,
							y : 140,
							textStyle : {
								fontSize : '14',
								fontWeight : 'bold'
							}

						},
						
						color : [ 'rgba(79, 129, 189, 1)', 'rgba(192, 80, 77, 1)' ],
						calculable : false,
						series : [ {
							name : '饼图背景',
							type : 'pie',
							center : [ 75, 70 ],
							radius : 50,			
							hoverAnimation:false,
							itemStyle : {
								normal : {
									color : 'rgba(108, 202, 201,1)',
									label : {
										show : true,
										position : 'center',
										textStyle : {
											fontSize : '14',
											fontWeight : 'bold',
											color : '#FFFFFF'
										},
										formatter : function(params) {
											return HOME_TOTAL+':' + zcount + '\n'+HOME_MONITORED+':' + ypercent + ''
										}
									},
									labelLine : {
										show : false
									}
								},

							},
							data : [ {
								value : 335,
								name : '直达'
							} ]
						}, {
							name : '饼图-小于60',
							type : 'pie',
							center : [ 75, 70 ],
							radius : [ 50, 60 ],
							label : {
								normal:{
									show : false,
								}
							},
							labelLine : {
								normal:{
									show : true,
									length:1,
									lineStyle:{
										color:"#fff"
									}
								}},
							itemStyle : {
								normal : {
									borderColor : '#fff',
								
								},
								emphasis : {
									label : {
										show : true,
										position : 'center',
										textStyle : {
											fontSize : '14',
											fontWeight : 'bold'
										}
									}
								}
							},
							data : [ {
								value : ycount,
								//name : '已监测'
							}, {
								value : wcount,
								//name : '未监测'
							} ]
						} ]
				}
			myChart1.setOption(option);
		}
		
	})
}
//获取  60-80饼图数据
function getProjectPie2Data(projectId) {

	var language = $.getUrlParam('locale');
	jQuery.i18n.properties({//加载资浏览器语言对应的资源文件
		name:'strings', //资源文件名称
		path:'i18n/', //资源文件路径
		mode:'map', //用Map的方式使用资源文件中的值
		language:language,// 对应的语言
		callback: function() {//加载成功后设置显示内容
			HOME_TOTAL= $.i18n.prop('home.total');
			HOME_MONITORED= $.i18n.prop('home.monitored');
		}
	});
//	projectId = 159;
	
	$.ajax({
		async:true,
		type:'POST',
		dataType:'json',
		data:{'projectid':projectId},
		url:'pro/select80CountByPro/'+conbeamid,
		error:function(){
		
			return;
		},
		success:function(data){
			
			
			//未监测
			var wcount = parseInt(data.wcount);

			//已监测
			var ycount = parseInt(data.ycount);
			//总计
			var zcount = parseInt(data.zcount);
			//已监测百分比
			var ypercent = ((parseFloat(data.ypercent)).toString()*100).toFixed(1)+'%';

			var myChart2 = echarts.init(document.getElementById('mainPie2'));
			
				option = {
						title : {
							text : '60-80',
							x : 50,
							y : '140',
							textStyle : {
								fontSize : '14',
								fontWeight : 'bold'
							}
						},
						color : [ 'rgba(79, 129, 189, 1)', 'rgba(192, 80, 77, 1)' ],
						calculable : false,
						series : [ {
							name : '饼图背景',
							type : 'pie',
							center : [ 75, 70 ],
							radius : 50,
							hoverAnimation:false,			
							itemStyle : {
								normal : {
									color : 'rgba(108, 202, 201,1)',
									label : {
										show : true,
										position : 'center',
										textStyle : {
											fontSize : '14',
											fontWeight : 'bold',
											color : '#FFFFFF'
										},
										formatter : function(params) {
											return HOME_TOTAL+':' + zcount + '\n'+HOME_MONITORED+':' + ypercent + ''
										}
									},
									labelLine : {
										show : false
									}
								},

							},
							data : [ {
								value : 335,
								name : '直达'
							} ]
						}, {
							name : '饼图-60-80',
							type : 'pie',
							center : [ 75, 70 ],
							radius : [ 50, 60 ],
							label : {				
								normal:{
									show : false,
								}
							},
							labelLine : {
								normal:{
									show : true,
									length:1,
									lineStyle:{
										color:"#fff"
									}
								}},
							itemStyle : {
								normal : {
									borderColor : '#fff',
									
								},
								emphasis : {
									label : {
										show : true,
										position : 'center',
										textStyle : {
											fontSize : '14',
											fontWeight : 'bold'
										}
									}
								}
							},
							data : [ {
								value : ycount,
								
								//name : '已监测'
							}, {
								value : wcount,
								//name : '未监测'
							} ]
						} ]
				}
			myChart2.setOption(option);
		}
		
	})
}

//获取  80-100饼图数据
function getProjectPie3Data(projectId) {

//	projectId = 159;
	
	$.ajax({
		async:true,
		type:'POST',
		dataType:'json',
		data:{'projectid':projectId},
		url:'pro/select100CountByPro/'+conbeamid,
		error:function(){
		
			return;
		},
		success:function(data){
			var language = $.getUrlParam('locale');
			jQuery.i18n.properties({//加载资浏览器语言对应的资源文件
				name:'strings', //资源文件名称
				path:'i18n/', //资源文件路径
				mode:'map', //用Map的方式使用资源文件中的值
				language:language,// 对应的语言
				callback: function() {//加载成功后设置显示内容
					HOME_TOTAL= $.i18n.prop('home.total');
					HOME_MONITORED= $.i18n.prop('home.monitored');
				}
			});
			
			//未监测
			var wcount = parseInt(data.wcount);

			//已监测
			var ycount = parseInt(data.ycount);
			//总计
			var zcount = parseInt(data.zcount);
			//已监测百分比
			var ypercent = ((parseFloat(data.ypercent)).toString()*100).toFixed(1)+'%';
				
			
			var myChart3 = echarts.init(document.getElementById('mainPie3'));
			
				option = {
						title : {
							text : '80-100',
							x : 46,
							y : 140,
							textStyle : {
								fontSize : '14',
								fontWeight : 'bold'
							}
						},
						color : [ 'rgba(79, 129, 189, 1)', 'rgba(192, 80, 77, 1)' ],
						calculable : false,
						series : [ {
							name : '饼图背景',
							type : 'pie',
							center : [75, 70 ],
							radius : 50,
							hoverAnimation:false,
							itemStyle : {
								normal : {
									color : 'rgba(108, 202, 201,1)',
									label : {
										show : true,
										position : 'center',
										textStyle : {
											fontSize : '14',
											fontWeight : 'bold',
											color : '#FFFFFF'
										},
										formatter : function(params) {
											return HOME_TOTAL+':' + zcount + '\n'+HOME_MONITORED+':' + ypercent + ''
										}
									},
									labelLine : {
										show : false
									}
								},

							},
							data : [ {
								value : 335,
								name : '直达'
							} ]
						}, {
							name : '饼图-80-100',
							type : 'pie',
							center : [ 75, 70 ],
							radius : [ 50, 60 ],
							label : {				
								normal:{
									show : false,
								}
							},
							labelLine : {
								normal:{
									show : true,
									length:1,
									lineStyle:{
										color:"#fff"
									}
								}},
							itemStyle : {
								normal : {
									borderColor : '#fff',
								
								},
								emphasis : {
									label : {
										show : true,
										position : 'center',
										textStyle : {
											fontSize : '10',
											fontWeight : 'bold'
										}
									}
								}
							},
							data : [ {
								value : ycount,
								//name : '已监测'
							}, {
								value : wcount,
								//name : '未监测'
							} ]
						} ]
				}
			myChart3.setOption(option);
		}
		
	})
}

//获取  100 - 120饼图数据
function getProjectPie4Data(projectId) {


	
	$.ajax({
		async:true,
		type:'POST',
		dataType:'json',
		data:{'projectid':projectId},
		url:'pro/select120CountByPro/'+conbeamid,
		error:function(){
		
			return;
		},
		success:function(data){
			var language = $.getUrlParam('locale');
			jQuery.i18n.properties({//加载资浏览器语言对应的资源文件
				name:'strings', //资源文件名称
				path:'i18n/', //资源文件路径
				mode:'map', //用Map的方式使用资源文件中的值
				language:language,// 对应的语言
				callback: function() {//加载成功后设置显示内容
					HOME_TOTAL= $.i18n.prop('home.total');
					HOME_MONITORED= $.i18n.prop('home.monitored');
				}
			});
			
			//未监测
			var wcount = parseInt(data.wcount);

			//已监测
			var ycount = parseInt(data.ycount);
			//总计
			var zcount = parseInt(data.zcount);
			//已监测百分比
			var ypercent = ((parseFloat(data.ypercent)).toString()*100).toFixed(1)+'%';
				
			
			var myChart4 = echarts.init(document.getElementById('mainPie4'));
			
				option = {
						title : {
							text : '100-120',
							x : 40,
							y : 140,
							textStyle : {
								fontSize : '14',
								fontWeight : 'bold'
							}
						},
						color : [ 'rgba(79, 129, 189, 1)', 'rgba(192, 80, 77, 1)' ],
						calculable : false,
						series : [ {
							name : '饼图背景',
							type : 'pie',
							center : [ 75, 70 ],
							radius : 50,
							hoverAnimation:false,
							itemStyle : {
								normal : {
									color : 'rgba(108, 202, 201,1)',
									label : {
										show : true,
										position : 'center',
										textStyle : {
											fontSize : '14',
											fontWeight : 'bold',
											color : '#FFFFFF'
										},
										formatter : function(params) {
											return HOME_TOTAL+':' + zcount + '\n'+HOME_MONITORED+':' + ypercent + ''
										}
									},
									labelLine : {
										show : false
									}
								},

							},
							data : [ {
								value : 335,
								name : '直达'
							} ]
						}, {
							name : '饼图-100-120',
							type : 'pie',
							center : [ 75, 70 ],
							radius : [ 50, 60 ],
							label : {				
								normal:{
									show : false,
									position:'outside'
								}
							},
							labelLine : {
								normal:{
									show : true,
									length:1,
									lineStyle:{
										color:"#fff"
									}
								}},
							itemStyle : {
								normal : {
									borderColor : '#fff',
								
								},
								emphasis : {
									label : {
										show : true,
										position : 'center',
										textStyle : {
											fontSize : '14',
											fontWeight : 'bold'
										}
									}
								}
							},
							data : [ {
								value : ycount,
								//name : '已监测'
							}, {
								value : wcount,
								//name : '未监测'
							} ]
						} ]
				}
			myChart4.setOption(option);
		}
		
	})
}
//获取  100 - 120饼图数据
function getProjectPie5Data(projectId) {

//	projectId = 159;
	
	$.ajax({
		async:true,
		type:'POST',
		dataType:'json',
		data:{'projectid':projectId},
		url:'pro/selectElseCountByPro/'+conbeamid,
		error:function(){
		
			return;
		},
		success:function(data){
			var language = $.getUrlParam('locale');
			jQuery.i18n.properties({//加载资浏览器语言对应的资源文件
				name:'strings', //资源文件名称
				path:'i18n/', //资源文件路径
				mode:'map', //用Map的方式使用资源文件中的值
				language:language,// 对应的语言
				callback: function() {//加载成功后设置显示内容
					HOME_TOTAL= $.i18n.prop('home.total');
					HOME_MONITORED= $.i18n.prop('home.monitored');
					HOME_GREATERTHAN= $.i18n.prop('home.greaterThan');
				}
			});
			
			//未监测
			var wcount = parseInt(data.wcount);

			//已监测
			var ycount = parseInt(data.ycount);
			//总计
			var zcount = parseInt(data.zcount);
			//已监测百分比
			var ypercent = ((parseFloat(data.ypercent)).toString()*100).toFixed(1)+'%';
				
			
			var myChart5 = echarts.init(document.getElementById('mainPie5'));
			
				option = {
						title : {
							text : '120'+HOME_GREATERTHAN,
							x : 50,
							y : 140,
							textStyle : {
								fontSize : '14',
								fontWeight : 'bold'
							}
						},
						color : [ 'rgba(79, 129, 189, 1)', 'rgba(192, 80, 77, 1)' ],
						calculable : false,
						series : [ {
							name : '饼图背景',
							type : 'pie',
							center : [ 75, 70 ],
							radius : 50,
							hoverAnimation:false,
							itemStyle : {
								normal : {
									color : 'rgba(108, 202, 201,1)',
									label : {
										show : true,
										position : 'center',
										textStyle : {
											fontSize : '14',
											fontWeight : 'bold',
											color : '#FFFFFF'
										},
										formatter : function(params) {
											return HOME_TOTAL+':' + zcount + '\n'+HOME_MONITORED+':' + ypercent + ''
										}
									},
									labelLine : {
										show : false
									}
								},

							},
							data : [ {
								value : 335,
								name : '直达'
							} ]
						}, {
							name : '饼图-120以上',
							type : 'pie',
							center : [ 75, 70],
							radius : [ 50, 60 ],
							label : {				
								normal:{
									show : false,
								}
							},
							labelLine : {
								normal:{
									show : true,
									length:1,
									lineStyle:{
										color:"#fff"
									}
								}},
							itemStyle : {
								normal : {
									borderColor : '#fff',
								
								},
								emphasis : {
									label : {
										show : true,
										position : 'center',
										textStyle : {
											fontSize : '10',
											fontWeight : 'bold'
										}
									}
								}
							},
							data : [ {
								value : ycount,
								//name : '已监测'
							}, {
								value : wcount,
								//name : '未监测'
							} ]
						} ]
				}
			myChart5.setOption(option);
		}
		
	})
}

function getProjectZCountData(projectId){
	
	
	$.ajax({
		async:true,
		type:'POST',
		dataType:'json',
		data:{'projectid':projectId},
		url:'pro/selectLxlTotalCountByPro/'+conbeamid,
		error:function(){
		
			return;
		},
		success:function(data){
			var language = $.getUrlParam('locale');
			jQuery.i18n.properties({//加载资浏览器语言对应的资源文件
				name:'strings', //资源文件名称
				path:'i18n/', //资源文件路径
				mode:'map', //用Map的方式使用资源文件中的值
				language:language,// 对应的语言
				callback: function() {//加载成功后设置显示内容
					//小于
					HOME_LESSTHAN=$.i18n.prop('home.lessThan');
					//大于
					HOME_GREATERTHAN= $.i18n.prop('home.greaterThan');
					
				}
			});
			
			
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
			var elseCount = (100 - homeElse).toFixed(2)+ '%';								//>120的值
			
			//判断值是否为0,如果为0则name='';
			
			var sixtycountName ;	  //判断小于60的名字是否存在
			var eightycountName;	  //判断60-80的名字是否存在
			var hundredCountName;			//判断80-100的名字是否存在
			var hundredtwentyCountName;			//判断100-120的名字是否存在
			var elseCountName;			//判断大于120名字是否存在
			var minData = 0;  				//最小值
			var a = '5%'
			//console.log(data.sixtycount + ":" + data.eightycount + ":" + data.hundredcount + ":" + data.hundredtwentycount + ":" + data.elsecount);
				
			
			//判断value值是否为0；如果为0则name为空，否则给name增加一个参数；
			if(data.sixtycount == 0){
				sixtycountName = "";
			}else{
				if(sixty == 0.0001){
					sixtyCount = HOME_LESSTHAN+'0.01%';
					sixtycountName = HOME_LESSTHAN+'60' + '\n' + sixtyCount;
				}
				sixtycountName = HOME_LESSTHAN+'60' + '\n' + sixtyCount;
			}
			
			if(data.eightycount ==0){
				eightycountName =""
			}else{
				if(eighty == 0.0001){
					eightyCount = HOME_LESSTHAN+'0.01%'
					eightycountName = HOME_LESSTHAN+'60' + '\n' + eightyCount;
				}
				eightycountName = '60-80'+ '\n' + eightyCount;
			}
			
			if(data.hundredcount == 0){
				hundredCountName = ""
			}else{
				if(hunder == 0.0001){
					hundredCount = HOME_LESSTHAN+'0.01%'
					hundredCountName = HOME_LESSTHAN+'60' + '\n' + hundredCount;
				}
				hundredCountName = '80-100'+ '\n' + hundredCount;
			}
			
			if(data.hundredtwentycount == 0){
				hundredtwentyCountName = ""
			}else{
				if(hundredtwenty == 0.0001){
					hundredtwentyCount = HOME_LESSTHAN+'0.01%'
					hundredtwentyCountName = HOME_LESSTHAN+'60' + '\n' + hundredtwentyCount;
				}
				hundredtwentyCountName = '100-120'+ '\n' + hundredtwentyCount;
			}
			
			if(data.elsecount == 0){
				elseCountName =""
			}else{
				elseCountName ='120'+HOME_GREATERTHAN+ '\n' + elseCount;
			}
			
			var dataArr = [
						   {value:data.sixtycount,name:sixtycountName},
						   {value:data.eightycount,name:eightycountName},
						   {value:data.hundredcount,name:hundredCountName},
						   {value:data.hundredtwentycount,name:hundredtwentyCountName},
						   {value:data.elsecount,name:elseCountName}
						 ];
			if(dataArr.length > 0){
				var echartDataArr = []
				for(var i = 0;i<dataArr.length;i++){
					if(dataArr[i].value !=0){
						echartDataArr.push(dataArr[i])
					}
				}
				var myChart = echarts.init(document.getElementById('mainPie'));
					myChart.setOption({
					color : [ '#C4C4C4', '#ABABAB', '#8B8B7A', '#5E5E5E', '#454545' ],
					calculable : false,
					series : [ {
						type : 'pie',
						hoverAnimation:false,
						radius : '70%',
						center : [ '50%', '55%' ],
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
			}
		}
		
	})
	
}