/**
 * <p>Description: 中国铁路总公司 首页</p>
 *
 * @author sunjiashu（2017年3月10日 下午15:41:55）
 *
 * @version:1.0.0
 */

//页面初始化时加载页面高度


var conbeamid="";
function initHomeCRC() {
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
	
	//alert('1111');
	//获取 连续梁监测状态统计
//	getlxlJcData();
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
	//获取 综合总计表-片区汇总数据
	getCategorySummary();
	getCategoryItem();
}



//获取 主跨跨度分布及监测状态 小于60饼图数据
function getlxlPie1Data() {
	var url = 'crc/select60Count/'+conbeamid;
	$.ajax({
		async : true,//是否异步
		cache : false,//是否使用缓存
		type : 'POST',//请求方式：get
		dataType : 'json',//数据传输格式：json
		url : url,//请求的action路径
//		data:{"conbeamid":conbeamid},
		error : function() {
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
				
			var myChart1 = echarts.init(document.getElementById('mainPie1'));
			myChart1.setOption({
				title : {
					text : '小于60',
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
									return '总计:' + zcount + '\n已监测:' + ypercent + ''
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
			})
			
			
			
		}
		
	})
}
//获取 主跨跨度分布及监测状态 60-80饼图数据
function getlxlPie2Data() {
	var url = 'crc/select80Count/'+conbeamid;
	$.ajax({
		async : true,//是否异步
		cache : false,//是否使用缓存
		type : 'POST',//请求方式：get
		dataType : 'json',//数据传输格式：json
		url : url,//请求的action路径
//		data:{"conbeamid":conbeamid},
		error : function() {
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
			myChart2.setOption({
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
									return '总计:' + zcount + '\n已监测:' + ypercent + ''
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
			})
			
		}
	})
	
}
//获取 主跨跨度分布及监测状态 80-100饼图数据
function getlxlPie3Data() {
	var url = 'crc/select100Count/'+conbeamid;
	$.ajax({
		async : true,//是否异步
		cache : false,//是否使用缓存
		type : 'POST',//请求方式：get
		dataType : 'json',//数据传输格式：json
		url : url,//请求的action路径
//		data:{"conbeamid":conbeamid},
		error : function() {
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

			var myChart2 = echarts.init(document.getElementById('mainPie3'));
			myChart2.setOption({
				title : {
					text : '80-100',
					x : 46,
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
									return '总计:' + zcount + '\n已监测:' + ypercent + ''
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
					name : '80-100',
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
			})
			
		}
	})
	
}
//获取 主跨跨度分布及监测状态 100-120饼图数据
function getlxlPie4Data() {
	var url = 'crc/select120Count/'+conbeamid;
	$.ajax({
		async : true,//是否异步
		cache : false,//是否使用缓存
		type : 'POST',//请求方式：get
		dataType : 'json',//数据传输格式：json
		url : url,//请求的action路径
//		data:{"conbeamid":conbeamid},
		error : function() {
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

			var myChart2 = echarts.init(document.getElementById('mainPie4'));
			myChart2.setOption({
				title : {
					text : '100-120',
					x : 40,
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
									return '总计:' + zcount + '\n已监测:' + ypercent + ''
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
			})
			
		}
	})
}
//获取 主跨跨度分布及监测状态 120以上饼图数据
function getlxlPie5Data() {
	var url = 'crc/selectElseCount/'+conbeamid;
	$.ajax({
		async : true,//是否异步
		cache : false,//是否使用缓存
		type : 'POST',//请求方式：get
		dataType : 'json',//数据传输格式：json
		url : url,//请求的action路径
//		data:{"conbeamid":conbeamid},
		error : function() {
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
		//	console.log(ypercent);

			var myChart2 = echarts.init(document.getElementById('mainPie5'));
			myChart2.setOption({
				title : {
					text : '120及以上',
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
									return '总计:' + zcount + '\n已监测:' + ypercent + ''
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
			})
			
		}
	})
}

//获取 主跨跨度分布及监测状态 右侧饼图
function getlxlPieData() {
	var url = 'crc/selectLxlTotalCount/'+conbeamid;
	$.ajax({
		async : true,//是否异步
		cache : false,//是否使用缓存
		type : 'POST',//请求方式：get
		dataType : 'json',//数据传输格式：json
		url : url,//请求的action路径
//		data:{"conbeamid":conbeamid},
		error : function() {
			return;
		},
		success:function(data){
				//console.log(data)
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
			
			
			/*console.log(elseCount)
			console.log(sixtyCount+':'+eightyCount+':'+hundredCount+':'+hundredtwentyCount +':' + elseCount)*/
			
			//判断值是否为0,如果为0则name='';
			
			var sixtycountName ;	  //判断小于60的名字是否存在
			var eightycountName;	  //判断60-80的名字是否存在
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
				elseCountName ='120及以上'+ '\n'  + elseCount;
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
//			if(dataArr.length > 0){
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
				
/**
 * 片区Tab点击，切换样式
 */
function changeCategoryItem(){
	var index= 0;

	// 片区Tab点击，切换样式
	$('#myTab li').on('click',function(){	

		$(this).find('a').addClass('active');
		$(this).find('a').removeClass('default');
		$(this).siblings('li').find('a').removeClass('active');
		$(this).siblings('li').find('a').addClass('default');
	});
}

/**
 * 获取片区
 */
function getCategoryItem(){
	$.ajax({
		async:true,
		type:'POST',
		dataType:'json',
		url:'crc/getCategoryItem',
		data:"",
		error:function(){
			return;
		},
		success:function(data) {
			
			// 添加片区Tab
			for(var i = 0; i < data.result.length; i++){
				
				$("ul#myTab").append('<li>'+'<a href="javascript:void(0)" class="default" onclick ="getCategoryItemData('+data.result[i].id+')" >' + data.result[i].name+'</a>'+'</li>');	
				
			}
			
			// 片区Tab点击，切换样式
			changeCategoryItem();
		}
	})
}

//片区汇总的数据
function getCategorySummary(){
	
	$.ajax({
		async:true,
		type:'POST',
		dataType:'json',
		url:'crc/selectLxlCountbyPianqu',
		data:{"conbeamid":conbeamid},
		error:function(){
			alert('服务器错误');
			return;
		},
		success:function(data){
			//console.log(data)
			$("#areaSummary tbody").empty();
			$('#areaProject').html('片区');
			
			
			//table表格中的计算（每一列）
			var totalZcount = 0;
			var totalWjccount =0;
			var totalJczcount = 0;
			var totalDhlcount = 0;
			var totalYhlcount = 0;
			var totalWarnlxlcount = 0;
			var totalWarnlxlcountnodeal = 0;
			var totalWarnldcount = 0;
			var totalWarnldcountnodeal = 0;
			var totalLdcount = 0;
//			var totalCdcount = 0;
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
				
				//梁段总数
//				var Ldcount = data.result[i].ldcount ? data.result[i].ldcount : 0;
				//测点总数
//				var cdCount = data.result[i].cdcount ? data.result[i].cdcount : 0;
				//工作基点总数
//				var gzjdCount = data.result[i].gzjdcount ? data.result[i].gzjdcount : 0;
				
				// 连续梁监测状态统计 总数
				lxlStateCount = wjcCount + jczCount + dhlCount + yhlCount;
				
				// 各项总数
			 	totalZcount += lxlStateCount; // 连续梁监测状态统计 总数
			 	totalWjccount += wjcCount;	// 连续梁监测状态统计 未监测
			 	totalJczcount += jczCount;	// 连续梁监测状态统计 监测中
			 	totalDhlcount += dhlCount;	// 连续梁监测状态统计 待合龙
			 	totalYhlcount += yhlCount;	// 连续梁监测状态统计 已合龙
			  
			 	totalWarnlxlcount += warnlxlCount;				// 超限连续梁 未处置 
			 	totalWarnlxlcountnodeal += warnlxlCountnodeal;	// 超限连续梁 处置中
			  
			 	totalWarnldcount += warnLdcount;				// 超限梁段 未处置
			 	totalWarnldcountnodeal += warnLdcountnodeal;	// 超限梁段 处置中
			  
//			 	totalLdcount += Ldcount;			// 梁段总数
//			 	totalCdcount += cdCount;			// 测点总数
//			 	totalGzjdcount += gzjdCount;		// 工作基点个数
			 	
			 	// 添加DOM
				var sumI = i + 1;
				$('#areaSummary tbody').append('<tr>'+
					'<td>'+sumI+'</td>'+
					'<td>' + data.result[i].categoryname+'</td>'+
					
					'<td>' + lxlStateCount + '</td>'+	//连续梁监测状态统计 总数
					'<td>' + wjcCount + '</td>'+		//连续梁监测状态统计 未监测
					'<td>' + jczCount + '</td>'+		//连续梁监测状态统计 监测中
					'<td>' + dhlCount + '</td>'+		//连续梁监测状态统计 待合龙
					'<td>' + yhlCount + '</td>'+		//连续梁监测状态统计 已合龙
					
					'<td>' + warnlxlCount + '</td>'+		// 超限连续梁 未处置 
					'<td>' + warnlxlCountnodeal + '</td>'+	// 超限连续梁 处置中
					
					'<td>' + warnLdcount + '</td>'+		// 超限梁段 未处置
					'<td>' + warnLdcountnodeal + '</td>'+	// 超限梁段 处置中
					
//					'<td>' + Ldcount + '</td>'+			// 梁段总数
//					'<td>' + cdCount + '</td>'+			// 测点总数
//					'<td>' + gzjdCount + '</td>'+		// 工作基点个数
					'</tr>');
			}	
			
			 $('#areaSummary tbody').append('<tr>'+
					 '<td colspan=2>'+'合计'+'</td>'+'<td>'+totalZcount + '</td>'+'<td>'+totalWjccount + '</td>'+'<td>'+totalJczcount + '</td>'+'<td>'+totalDhlcount + '</td>'+'<td>'+totalYhlcount + '</td>'+'<td>'+totalWarnlxlcount + '</td>'+'<td>'+totalWarnlxlcountnodeal+'</td>'+'<td>'+totalWarnldcount + '</td>'+
					 '<td>'+totalWarnldcountnodeal+'</td>'
//					 + '<td>'+totalLdcount+'</td>'+'<td>'+totalGzjdcount+'</td>'
					 + '</tr>')		
			 
			 $("#lxlz").html(totalZcount);//连续梁监测状态统计-总数
			$("#lxlw").html(totalWjccount);//连续梁监测状态统计-未监测
			$("#lxlj").html(totalJczcount);//连续梁监测状态统计-监测中
			$("#lxld").html(totalDhlcount);//连续梁监测状态统计-待合龙
			$("#lxly").html(totalYhlcount);//连续梁监测状态统计-已合龙
			 changeCategoryItem();
			}			
	});
}

/**
 * 各地区片区
 * @param id
 */
function getCategoryItemData(id){
	
	var url = "crc/selectLxlCountbyProject/";
	$.ajax({
		async:true,
		type:'POST',
		dataType:'json',
		data:{"id":id,
			 "conbeamid":conbeamid},
		url:url,
		error:function(){
			alert('首页服务器错误')
			return;
		},
		success : function(data){

			$('#areaSummary tbody').empty();
			
			$('#areaProject').html('项目')
			
			//table表格中的计算（每一列）
			var totalZcount = 0;
			var totalWjccount =0;
			var totalJczcount = 0;
			var totalDhlcount = 0;
			var totalYhlcount = 0;
			var totalWarnlxlcount = 0;
			var totalWarnlxlcountnodeal = 0;
			var totalWarnldcount = 0;
			var totalWarnldcountnodeal = 0;
			var totalLdcount = 0;
//			var totalCdcount = 0;
			var totalGzjdcount = 0;
			
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
				
				//梁段总数
				var Ldcount = data.result[i].ldcount ? data.result[i].ldcount : 0;
				//测点总数
//				var cdCount = data.result[i].cdcount ? data.result[i].cdcount : 0;
				//工作基点总数
				var gzjdCount = data.result[i].gzjdcount ? data.result[i].gzjdcount : 0;
				
				// 连续梁监测状态统计 总数
				lxlStateCount = wjcCount + jczCount + dhlCount + yhlCount;
				
				// 各项总数
			 	totalZcount += lxlStateCount; // 连续梁监测状态统计 总数
			 	totalWjccount += wjcCount;	// 连续梁监测状态统计 未监测
			 	totalJczcount += jczCount;	// 连续梁监测状态统计 监测中
			 	totalDhlcount += dhlCount;	// 连续梁监测状态统计 待合龙
			 	totalYhlcount += yhlCount;	// 连续梁监测状态统计 已合龙
			 	totalWarnlxlcount += warnlxlCount;				// 超限连续梁 未处置 
			 	totalWarnlxlcountnodeal += warnlxlCountnodeal;	// 超限连续梁 处置中
			
			 	totalWarnldcount += warnLdcount;// 超限梁段 未处置
			 	totalWarnldcountnodeal += warnLdcountnodeal;	// 超限梁段 处置中
			 
//			 	totalLdcount += Ldcount;			// 梁段总数
//			 	totalCdcount += cdCount;			// 测点总数
//			 	totalGzjdcount += gzjdCount;		// 工作基点个数
				
				var sumR = i+1;
				
				//如果有数据时当已测数据存在时，无需增加已测数据列
				
					$('#areaSummary tbody').append('<tr>'+
							'<td>'+sumR+'</td>'+'<td>' + data.result[i].itemname+'</td>'+'<td>' + lxlStateCount + '</td>'+'<td>' + wjcCount + '</td>'+'<td>' + jczCount + '</td>'+'<td>' + dhlCount + '</td>'+'<td>' + yhlCount + '</td>'+
							'<td>' + warnlxlCount + '</td>' + '<td>' + warnlxlCountnodeal + '</td>'+'<td>' + warnLdcount + '</td>'+'<td>' + warnLdcountnodeal + '</td>'
//							+ '<td>' + Ldcount+'</td>' +'<td>'+ gzjdCount +  '</td>'
							+ '</tr>');
				
			}
			//当无数据时判断已测列是否存在，如果已存在则无需增加已测数据列
				$('#areaSummary tbody').append('<tr>'+
						 '<td colspan=2>'+'合计'+'</td>'+'<td>'+totalZcount + '</td>'+'<td>'+totalWjccount + '</td>'+'<td>'+totalJczcount + '</td>'+'<td>'+totalDhlcount + '</td>'+'<td>'+totalYhlcount + '</td>'+'<td>'+totalWarnlxlcount + '</td>'+'<td>'+totalWarnlxlcountnodeal+'</td>'+'<td>'+totalWarnldcount + '</td>'+
						 '<td>'+totalWarnldcountnodeal+'</td>'
//						 + '<td>' + totalLdcount + '</td>' + '<td>' + totalGzjdcount
						 + '</td>' + '</tr>')
			 
			}
			
		})
	}



//@ sourceURL=homeCRC.js