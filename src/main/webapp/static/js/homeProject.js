/**
 * 项目信息 首页
 */
//getHomeProjectTableData()

/**
 * 初始化
 */
function initProject(projectId) {

	getHomeProjectTableData(projectId);
}

/*
 * 项目首页中table中数据
 * */
function getHomeProjectTableData(projectId){  
	
	
	
	var lxlList = JSON.parse(getConditionConBeamList());
	var conbeamid = "";
	//连续梁ID
	if (lxlList.length > 0) {
		for(var i = 0, len = lxlList.length; i < len; i++){
			conbeamid = conbeamid + lxlList[i].orgId +',';
		}
		
		if(conbeamid.length > 0){
			conbeamid = conbeamid.substring(0, conbeamid.length - 1);
		}
	}
		
	$.ajax({
		async : false,//是否异步
		cache : true,//是否使用缓存
		type : 'post',//请求方式：get
		dataType : 'json',//数据传输格式：json
		url : "pro/getBiaoDuanInfo",//请求的action路径
		data : {						 
			projectid : projectId,
			conbeamid : conbeamid
		},
		error : function() {
			
			return;
		},
		success : function(data) { //请求成功后处理函数
			var language = $.getUrlParam(LOCAL_PARAM);
			if(language==null){
				language = $.i18n.browserLang();
			}
			jQuery.i18n.properties({//加载资浏览器语言对应的资源文件
				name:'strings', //资源文件名称
				path:'i18n/', //资源文件路径
				mode:'map', //用Map的方式使用资源文件中的值
				language:language,// 对应的语言
				callback: function() {//加载成功后设置显示内容
					HOME_SUM = $.i18n.prop('home.sum');
				}
			});
			
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
			var totalLdcount = 0;
			var totalCdcount = 0;
			var totalGzjdcount = 0;
			
			if(data.result.length == 0){	

				 $("#prolxlz").html(totalZcount);//连续梁监测状态统计-总数
				 $("#prolxlw").html(totalWjccount);//连续梁监测状态统计-未检测
				 $("#prolxlj").html(totalJczcount);//连续梁监测状态统计-检测中
				 $("#prolxld").html(totalDhlcount);//连续梁监测状态统计-待合龙
				 $("#prolxly").html(totalYhlcount);//连续梁监测状态统计-已合龙
				
				 //无数据时判断已测梁段数是否存在，如果true则不需增加该列，否则增加已测梁段数列
					 $('#smprojectTable tbody').append('<tr>'+
							 '<td colspan=2>'+HOME_SUM+'</td>'+'<td>'+totalZcount + '</td>'+'<td>'+totalWjccount + '</td>'+'<td>'+totalJczcount + '</td>'+'<td>'+totalDhlcount + '</td>'+'<td>'+totalYhlcount + '</td>'+'<td>'+totalWarnlxlcount + '</td>'+'<td>'+totalWarnlxlcountnodeal+'</td>'+'<td>'+totalWarnldcount + '</td>'+
							 '<td>'+totalWarnldcountnodeal+'</td>'+'<td>'+totalCdcount + '</td>'+
					 '</tr>'
							 )
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
//				//测点总数
//				var cdCount = data.result[i].cdcount ? data.result[i].cdcount : 0;
//				//工作基点总数
//				var gzjdCount = data.result[i].gzjdcount ? data.result[i].gzjdcount : 0;
				
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
			  
			 	totalLdcount += Ldcount;			// 已测梁段数
//			 	totalCdcount += cdCount;			// 测点总数
//			 	totalGzjdcount += gzjdCount;		// 工作基点个数
			 	
				// 添加DOM
				var sumI = i + 1;
				
				$('#smprojectTable tbody').append('<tr>'+
						'<td>'+sumI+'</td>'+
						'<td>' + data.result[i].section+'</td>'+
						
						'<td>' + lxlStateCount + '</td>'+	//连续梁检测状态统计 总数
						'<td>' + wjcCount + '</td>'+		//连续梁检测状态统计 未检测
						'<td>' + jczCount + '</td>'+		//连续梁检测状态统计 检测中
						'<td>' + dhlCount + '</td>'+		//连续梁检测状态统计 待合龙
						'<td>' + yhlCount + '</td>'+		//连续梁检测状态统计 已合龙
						
						'<td>' + warnlxlCount + '</td>'+		// 超限连续梁 未处置 
						'<td>' + warnlxlCountnodeal + '</td>'+	// 超限连续梁 处置中
						
						'<td>' + warnLdcount + '</td>'+		// 超限梁段 未处置
						'<td>' + warnLdcountnodeal + '</td>'+	// 超限梁段 处置中
						
						'<td>' + Ldcount + '</td>'+			// 已测梁段数
//						'<td>' + cdCount + '</td>'+			// 测点总数
//						'<td>' + gzjdCount + '</td>'+		// 工作基点个数
					'</tr>');
				}
				
			$('#smprojectTable tbody').append('<tr>'+
					 '<td colspan=2>'+HOME_SUM+'</td>'+'<td>'+totalZcount + '</td>'+'<td>'+totalWjccount + '</td>'+'<td>'+totalJczcount + '</td>'+'<td>'+totalDhlcount + '</td>'+'<td>'+totalYhlcount + '</td>'+'<td>'+totalWarnlxlcount + '</td>'+'<td>'+totalWarnlxlcountnodeal+'</td>'+'<td>'+totalWarnldcount + '</td>'+
					 '<td>'+totalWarnldcountnodeal+'</td>'
					 + '<td>'+ totalLdcount +'</td>'
//					 +'<td>'+ totalGzjdcount +'</td>'
					 + '</tr>');
			
			  $("#prolxlz").html(totalZcount);//连续梁监测状态统计-总数
				 $("#prolxlw").html(totalWjccount);//连续梁监测状态统计-未检测
				 $("#prolxlj").html(totalJczcount);//连续梁监测状态统计-检测中
				 $("#prolxld").html(totalDhlcount);//连续梁监测状态统计-待合龙
				 $("#prolxly").html(totalYhlcount);//连续梁监测状态统计-已合龙
			}
			
		});
}
