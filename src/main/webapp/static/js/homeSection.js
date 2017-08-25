/**
 * <p>Description: 标段首页</p>
 *
 * @author liuzhenya（2017年3月14日 下午15:41:55）
 *
 * @version:1.0.0
 */
//高程偏差上限
var deltaUpper = 0;
//高程偏差下限
var deltaLower = 0;
//中线偏差上限
var outlUpper = 0;
//中线偏差下限
var outlLower = 0;
//立模偏差上限
var lmpcUpper = 0;
//立模偏差下限
var lmpcLower = 0;
//工况List
var gkList;
//待办事项List
var dbsxList;
//标段ID
var sectionIdTmp = "";
//页面高度
getLdHeight()
//有权限的连续梁
var lxlListForViewTmp = "";

function placeholderSupport() {
	return 'placeholder' in document.createElement('input');
 }
function getLdHeight(){
	
	var h = document.body.scrollHeight - 99; //获取可见区域的高度

	// 设定树的高度
	/*$('#left-menu').css('height', h);*/
	document.getElementById('left-menu').style.height = h + 'px';
	
	// 右侧内容区域的高度
	/*$(".echart-region").css('height', h);*/
	document.getElementById('echartRegionFirst').style.height = h + 'px';

}
/**
 * 超限处置梁段进度
 * @param sectionId
 */
function getLdData(sectionId){
	var notDisposed;
	
	var disposal;
	var lxlList = JSON.parse(getConditionConBeamList());
	var conbeamid = "";
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
		async : false,//是否异步
		cache : false,//是否使用缓存
		type : 'POST',//请求方式：get
		dataType : 'json',//数据传输格式：json
		url : "homeSection/getPccxldCount/" + sectionId, //请求的action路径 sectionId = 777
		data : {'conbeamid': conbeamid,},
		error : function() {
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
					//暂无数据
					HOMESECTION_NODATA = $.i18n.prop('homesection.noData');
					//处置中
					HOME_INDEAL = $.i18n.prop('home.indeal');
					//未处置
					HOME_NODEAL = $.i18n.prop('home.nodeal');
					//超限处置进度
					HOMESECTION_DEALPROGRESS = $.i18n.prop('homesection.dealProgress');
				}
			});
			
			if(data.result.length == 0){
				notDisposed = 0;
				disposal = 0;
			}
			
			var cxLdList = data.result.cxLdCount;
			//超限梁段未处置的
			 notDisposed = cxLdList.warnldcountnodeal;
			//梁段超限数
			 disposal = cxLdList.warnldcount;
			 if(notDisposed == 0&&disposal==0){
					var myChart = echarts.init(document.getElementById('sectionHomeTop-main'));
					
					option = {
							color : [ '#F2F2F2' ],
							title:{
								text:HOMESECTION_NODATA,
								top:'37%',
								left:'40%',
								textStyle:{
									color:'#CACACE',
									fontSize:18
								}
							},
							
							legend: {
								orient: 'vertical',
								top:10,
								right: 10,
								selectedMode:false,
								data: [
										{
											name:HOME_NODEAL,
											icon:'image://static/images/wcz.png'
												
										},{
											name:HOME_INDEAL,
											icon:'image://static/images/czz.png'
										}
										
										]
							},
							series : [ {
								type : 'pie',
								selectedMode : 'single',
								radius : '70%',
								center : [ '50%', '45%' ],
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
						};

					myChart.setOption(option);
			 }else{
				 var myChart = echarts.init(document.getElementById('sectionHomeTop-main'));
					
					option = {
							color:['#199ED8','#C9C9C9'],							//各个饼图颜色
							tooltip : {
								trigger: 'item',
								formatter: "{a} <br/>{b} : {c} ({d}%)"
							},
							legend: {
								orient: 'vertical',
								top:10,
								right: 10,
								selectedMode:false,
								data: [
										{
											name:HOME_NODEAL,
											icon:'image://static/images/wcz.png'
												
										},{
											name:HOME_INDEAL,
											icon:'image://static/images/czz.png'
										}
										
										]
							},
							series : [
								{	
									name:HOMESECTION_DEALPROGRESS,
									type: 'pie',
									radius : '45%',									//饼图大小
									center: ['50%', '45%'],							//饼图位置
									hoverAnimation:false,
									label:{
										normal:{
											show:true,
											
											textStyle:{
												color:'#333'
											},
											formatter:'{b}\n{d}% ，{c}'
										},
										emphasis:{
											show:true,
										}
									},
									labelLine:{
										normal:{
											length:25,
											length2:10,
										}
									},
									data:[
										{ name:HOME_INDEAL,value:disposal },//处置中的数据
										
										{ name:HOME_NODEAL,value:notDisposed },//未处置的数据
									],
								  
								}
							]
						};

					myChart.setOption(option);
			 }
		}
	})
}

//待办事项取得
function getDbsxList(sectionId, lxlListForView){
	//待办事项取得
	$(function(){
		$.ajax({
			async : false,//是否异步
			cache : false,//是否使用缓存
			type : 'POST',//请求方式：get
			dataType : 'json',//数据传输格式：json
			url : "homeSection/getBdDbsxInfo",//请求的action路径
			data : {
				"sectionId" : sectionId,
				"conbeamId" : conbeamidForView
			},
			error : function() {
				return;
			},
			success : function(data) { //请求成功后处理函数
				
				if (data['code'] != 0) {
				} else {
					dbsxList = data["result"].dbsxList;
					if(dbsxList.length > 0) {
						$("#dbsxDiv").empty();
						for(var i = 0; i < 11; i++){
							if(dbsxList[i]){
								$("#dbsxDiv").append("<li class='dbsxli'>" + "• " + dbsxList[i].content +"</li>");
							}
						}
					}
				}
			}
		});
	});
}

//展示所有待办事项
function showMoreDbsx() {

	//$("#dbsxDivMore").height($(".echart-region:eq(0)").prop("scrollHeight"));
	$("#dbsxTbl").empty();
	if(dbsxList){
		for(var i = 0; i < dbsxList.length; i++){
			var dbsx = dbsxList[i];
			if(i == 0){
				$("#dbsxTbl").append("<tr><td style='width:55px'></td><td style='text-align:left;width:478px'></td><td></td></tr>");
			}else{
				$("#dbsxTbl").append("<tr><td></td><td style='text-align:left;'></td><td></td></tr>");
			}
			var tdArr = $("#dbsxTbl").find("tr:eq("+(i)+")").children();

			//序号
			tdArr.eq(0).html(i+1);
			//待办事项
			tdArr.eq(1).html(dbsx.content);
			tdArr.eq(1).attr("title",dbsx.content);
			//产生时间
			var strUpdateTime = dbsx.updatetime.toString();

			var tmpDate = strUpdateTime.substr(0, 4) +"/" + strUpdateTime.substr(4, 2) +"/" + strUpdateTime.substr(6, 2);
			tdArr.eq(2).html(tmpDate);
		}
		if(dbsxList.length > 0) {
			$("#dbsxDivMore").showModal();
		} else {
			alert("暂无关注信息！");
		}
	}
}

//超限上下限取得
function getPccxLimit(projectId){
	//超限上下限取得
	$(function(){
		$.ajax({
			async : false,//是否异步
			cache : false,//是否使用缓存
			type : 'POST',//请求方式：get
			dataType : 'json',//数据传输格式：json
			url : "homeSection/getPccxLimit",//请求的action路径
			data : {
				"projectId" : projectId
			},
			error : function() {
				return;
			},
			success : function(data) { //请求成功后处理函数
				if (data['code'] != 0) {

				} else {
					var dataTmp = data["result"].deviation;
					//取得偏差上下限
					for(var i = 0; i < dataTmp.length; i++){
						if(dataTmp[i].type == 1){ //中线偏差
							outlUpper = dataTmp[i].upper;
							outlLower = dataTmp[i].lower;
						} else if(dataTmp[i].type == 2){//高程偏差
							deltaUpper = dataTmp[i].upper;
							deltaLower = dataTmp[i].lower;
						} else if(dataTmp[i].type == 3){//立模偏差
							lmpcUpper = dataTmp[i].upper;
							lmpcLower = dataTmp[i].lower;
						}
					}
				}
			}
		});
	});
}

//工况数据取得
function getGkList(){
	//工况数据取得
	$(function(){
		$.ajax({
			async : false,//是否异步
			cache : false,//是否使用缓存
			type : 'POST',//请求方式：get
			dataType : 'json',//数据传输格式：json
			url : "homeSection/getGkList",//请求的action路径
			error : function() {
				console.log("服务器异常！");
			},
			success : function(data) { //请求成功后处理函数
				if (data['code'] != 0) {

				} else {
					gkList = data["result"].dictionary;
				}
			}
		});
	});
}

//初始化方法
function initSectionInfo(sectionId, projectId){
	$("#dbsxDivMore").hideModal();
	$("#warnInfoListDiv").hideModal();
	$("#exceptionListDiv").hideModal();

	var lxlListForView = JSON.parse(getConditionConBeamList());
	conbeamidForView = "";
	//连续梁ID
	if (lxlListForView.length > 0) {
		for(var i = 0, len = lxlListForView.length; i < len; i++){
			conbeamidForView = conbeamidForView + lxlListForView[i].orgId +',';
		}
		
		if(conbeamidForView.length > 0){
			conbeamidForView = conbeamidForView.substring(0,conbeamidForView.length-1);
		}
	}

	lxlListForViewTmp = conbeamidForView;
	//标段首页echart饼图
	getLdData(sectionId);
	//30天内上传数据连续梁
	getUploadLxlInfo();//获取最新连续梁上传数据
	//获取待办事项
	getDbsxList(sectionId, conbeamidForView);
	//获取偏差上下限
	getPccxLimit(projectId);
	//获取工况编码
	getGkList();

	sectionIdTmp = sectionId;
	//获取连续梁 信息
	getSectionInfo(sectionId, conbeamidForView);

}

//获得指定连续梁的异常
function getConbeamException(resultExceptionList, conBeamId) {
	var conBeamList = [];
	if(resultExceptionList != null && resultExceptionList != '' && resultExceptionList !='undefined')
	for (var i = 0, len = resultExceptionList.length; i < len; i++) {
		
		var item = resultExceptionList[i];
		
		if (conBeamId == item.conbeamid) {
			conBeamList.push(item);
		}
	}
	return conBeamList;
}

/**
 * 各连续梁相关信息
 * 获取 页面所需数据
 * @param sectionId
 */
function getSectionInfo(sectionId, lxlListForView) {

	$.ajax({
		async : true,//是否异步
		cache : false,//是否使用缓存
		type : 'POST',//请求方式：get
		dataType : 'json',//数据传输格式：json
		url : "homeSection/getSectionInfo/"+sectionId+"/"+conbeamidForView,//请求的action路径
//		data : {
//			"sectionId" : sectionId,
//			"conbeamId" : conbeamidForView
//		},
		error : function() {
			console.log("服务器异常！");
		},
		success : function(data) { //请求成功后处理函数
			
			var language = $.getUrlParam('locale');
			if(language=="" || language == null)
				language=jQuery.i18n.browserLang();
			jQuery.i18n.properties({//加载资浏览器语言对应的资源文件
				name:'strings', //资源文件名称
				path:'i18n/', //资源文件路径
				mode:'map', //用Map的方式使用资源文件中的值
				language:language,// 对应的语言
				callback: function() {//加载成功后设置显示内容
					//合计
					HOME_SUM = $.i18n.prop('home.sum');
					//正常
					HOMESECTION_OK = $.i18n.prop('homesection.OK');
					//异常
					HOMESECTION_NG = $.i18n.prop('homesection.NG');
					//顺利合龙
					HOMESECTION_SLHL = $.i18n.prop('homesection.slhl');
					HOMESECTION_ERROR_ERRDATA = $.i18n.prop('homesection.error.errData');
				
				}
			});
			
			if (data['code'] != 0) {
				emptyTable('sectionInfoTbl');
				$("#sectionInfoTbl").append("<tr><td colspan='2'>"+HOME_SUM+"</td><td>"+0+"</td><td>"+'——'+"</td><td>"+ 0 +"</td><td>"+ 0 +"</td><td>"+ 0 +"</td><td>"+'——'+"</td><td>"+ 0 +"</td></tr>");
			} else {
				// 请求数据后, 判断是否有异常数据
				var resultExceptionList = haveExceptionDataList(sectionId);

				var sectionInfoList = data['result'].sectionInfoList;

				//清空table数据
				emptyTable('sectionInfoTbl');
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

					$("#sectionInfoTbl").append("<tr><td></td><td style='text-align:left;'></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");

					var trIndex = i + 2;

					var tdArr = $("#sectionInfoTbl").find("tr:eq("+trIndex+")").children();

					var lxlInfo = sectionInfoList[i];
					//序号
					tdArr.eq(0).html(trIndex-1);
					//连续梁名称
					tdArr.eq(1).html(lxlInfo.name);
					tdArr.eq(1).attr("title",lxlInfo.name);
					//超限梁段未处置
					if(lxlInfo.nodealcount != 0){
						tdArr.eq(3).html("<a id='conbeam"+ lxlInfo.conbeamid +"' style='font-size:14px'>" + lxlInfo.nodealcount + "</a>");
						$("#conbeam"+lxlInfo.conbeamid).click(function(paramObj){
							return function(){
								
								// 请求数据后, 显示指定连续梁的超限梁段信息
								showWarnInfo(paramObj);
							}
						}(lxlInfo));
					} else{
						tdArr.eq(3).html(lxlInfo.nodealcount);
					}

					totalNoDeal = totalNoDeal + lxlInfo.nodealcount;
					//超限梁段处置中
					var dealingCount = lxlInfo.dealingcount;
					tdArr.eq(4).html(dealingCount);
					totalDealing = totalDealing + dealingCount;
					//当前工况
					if(lxlInfo.status != 4){
						//当前工况：梁段类型!=0,3,4或者5
						var gkListNormal = new Array();
						if(lxlInfo.normalld != '' && lxlInfo.normalld != null){
							gkListNormal = lxlInfo.normalld.split(",");
						}
						//当前工况：梁段类型=0,3,4或者5
						var gkListSpecial = new Array();
						if(lxlInfo.specialld != '' && lxlInfo.specialld != null){
							gkListSpecial = lxlInfo.specialld.split(",");
						}

						//设定工况单元格内容
						if(gkListNormal.length > 0 || gkListSpecial.length > 0){
							//合并数组
							gkListNormal.push.apply(gkListNormal,gkListSpecial);

							//去除含有AA的数据
							var gkListTmp = new Array();
							for(var j = 0; j < gkListNormal.length; j++){
								if(gkListNormal[j].indexOf('AA') == -1){
									gkListTmp.push(gkListNormal[j]);
								}
							}
							//设置单元格内容
							gkListTmp.sort();
							var ldInfo = gkListTmp[0];
							//有工况的梁段大于1的场合显示打开工况一览的图标
							if(gkListNormal.length>1){
								var gkListForTitle = "";
								var gkListForTd = "";
								for(var j = 0; j < gkListTmp.length; j++){
									gkListForTitle = gkListForTitle + "\r\n" +gkListTmp[j];
									gkListForTd = gkListForTd + "," + gkListTmp[j];
								}
								gkListForTd = gkListForTd.substr(1,gkListForTd.length -1);
								tdArr.eq(5).html(gkListForTd);

								tdArr.eq(5).attr({title:gkListForTitle});
							} else if(gkListNormal.length == 1){
								tdArr.eq(5).html(ldInfo);
							} else{
								tdArr.eq(5).html("");
							}

						}
					} else{
						//tdArr.eq(4).html("<div class='greenClor'>顺利合龙</div>"+"<img src='static/images/hlSuccess.png' class='hlSuccessImg'>");

						tdArr.eq(5).html("<div class='greenClor'>"+HOMESECTION_SLHL+"</div>");
					}

					//测点总数
					tdArr.eq(6).html(lxlInfo.cdcount);
					totalCdCount = totalCdCount + lxlInfo.cdcount;
					//工作基点总数
					tdArr.eq(7).html(lxlInfo.basecount);
					totalBaseCount = totalBaseCount + lxlInfo.basecount;
					//梁段总数
					tdArr.eq(8).html(lxlInfo.ldcount);
					totalLdCount = totalLdCount + lxlInfo.ldcount;
					//数据上传状态
					// 请求数据后, 判断是否有异常数据
					
					//悬浮事件
					tdArr.eq(9).hover(function(){
						$(this).css('text-decoration','underline');
					},function(){
						$(this).css('text-decoration','none')
					});
					
					var exceptionList = getConbeamException(resultExceptionList, lxlInfo.conbeamid);
					var resultException = haveExceptionData(exceptionList);
					//统计异常信息中没有说明的数量
					var explainCount = 0;
					if(resultException != null && resultException.length > 0){
						explainCount = haveExceptionExplain(resultException);
					}
					if(resultException != null && resultException.length > 0 && explainCount > 0){//有异常信息并且还有没说明的异常

						tdArr.eq(9).css('background','#FF6666');
						tdArr.eq(9).html("<a style='color:#0000FF;'>"+HOMESECTION_NG+"</a>");
						tdArr.eq(9).find("a:eq(0)").click(function(paramObj,name){
							return function(){
								$("#exceptionListSpan").html('');
								$("#exceptionListSpan").html(name+HOMESECTION_ERROR_ERRDATA);
								$('#exceptionListTbl').empty();
								showExceptionListDiv(paramObj, name);
							}
						}(resultException,lxlInfo.name));
					}else if(resultException != null && resultException.length > 0 && explainCount == 0){//有异常但是都有说明了就显示正常，但是保留点击入口
						tdArr.eq(9).html("<a style='color:#0000FF;'>"+HOMESECTION_OK+"</a>");
						tdArr.eq(9).find("a:eq(0)").click(function(paramObj,name){
							return function(){
								$("#exceptionListSpan").html('');
								$("#exceptionListSpan").html(name+HOMESECTION_ERROR_ERRDATA);
								$('#exceptionListTbl').empty();
								showExceptionListDiv(paramObj, name);
							}
						}(resultException,lxlInfo.name));
					}else {
						tdArr.eq(9).html("<a style='color:#0000FF;'>"+HOMESECTION_OK+"</a>");
					}

					//当前超限梁段总数
					var warnLdCount = lxlInfo.nodealcount + dealingCount;
					var percentWarnLd = warnLdCount * 100 /lxlInfo.ldcount;

					if(warnLdCount != 0){
						tdArr.eq(2).html("<div class='percentBar' style='width:"+percentWarnLd+"%;min-width:12px'>"+"<span class='percentBarSpan'>" + warnLdCount + "</span>" +"</div>");
					} else{
						tdArr.eq(2).html("");
					}

				}
				//合计值
				totalWarnCount = totalDealing + totalNoDeal;
				var totalPercentWarnLd = 100 * totalWarnCount / totalLdCount;
				if(totalWarnCount != 0) {
					$("#sectionInfoTbl").append("<tr><td colspan='2'>"+HOME_SUM+"</td><td>"+"<div class='percentBar' style='width:"+totalPercentWarnLd+"%;min-width:12px'>"+"<span class='percentBarSpan'>" + totalWarnCount + "</span>" +"</div>"+"</td><td>"+totalNoDeal+"</td><td>"+totalDealing+"</td><td>"+'——'+"</td><td>"
							+ totalCdCount +"</td><td>"+ totalBaseCount +"</td><td>"+ totalLdCount +"</td><td>"+'——'+"</td></tr>");
				} else {
					$("#sectionInfoTbl").append("<tr><td colspan='2'>"+HOME_SUM+"</td><td></td><td>"+totalNoDeal+"</td><td>"+totalDealing+"</td><td>"+'——'+"</td><td>"
							+ totalCdCount +"</td><td>"+  totalBaseCount +"</td><td>"+ totalLdCount +"</td><td>"+'——'+"</td></tr>");
				}
			}
		}
	});
}

//清空表数据
function emptyTable(tableId){
	var tblTmp;
	tblTmp = '#'+tableId;
	$(tblTmp).find("tr:gt(1)").remove();
}

//判断是否有异常数据
function haveExceptionDataList(sectionId){
	//统计有异常的数据
	var dataException = new Array();
	$.ajax({
		async : false,//是否异步
		cache : false,//是否使用缓存
		type : 'POST',//请求方式：get
		dataType : 'json',//数据传输格式：json
		url : "homeSection/getLxlExceptionInfo",//请求的action路径
		data : {
			"sectionId" : sectionId
		},
		error : function() {
			console.log("服务器异常！");
		},
		success : function(data) {
			dataException = data["result"].lxlDataException;
		}
	});
	return dataException;
}

//统计没有说明的异常数量
function haveExceptionExplain(dataException){
	var count = 0;
	for(var i = 0; i < dataException.length; i++){
		if(dataException[i].ldtype == '0' || dataException[i].ldtype == '5'){//0号梁段进行处理
			if(dataException[i].mileageFlagZero != null && dataException[i].mileageFlagZero == 1){//大里程
				if(dataException[i].upperremarks == null || dataException[i].upperremarks == '')
					count ++;
			}else{//小里程
				if(dataException[i].lowerremarks == null || dataException[i].lowerremarks == '')
					count ++;
			}
			continue;
		}
		if((dataException[i].lowerremarks == null || dataException[i].lowerremarks == '') && 
			(dataException[i].upperremarks == null || dataException[i].upperremarks == '')){
			count ++;
		}
	}
	return count;
}

//判断是否有异常数据
function haveExceptionData(lxlDataExceptionList){
	debugger;
	//统计有异常的数据
	var dataException = new Array();
	//需要分析是否有异常的数据
	var dataListTmp= new Array();
	dataListTmp = lxlDataExceptionList;
	//T构分数组
	var pierArr = new Array();
	var pierArrIndex = 0;
	var pierTmp;
	
	var isZh = {};
	for(var i = 0; i < dataListTmp.length; i++){
		
		//判断中和是否有数据
		//如果中和数据上传  提示 左右两个T构
		if(dataListTmp[i].ldtype=='3'){
			if(dataListTmp[i].lowergkbm != null && dataListTmp[i].lowergkbm != ''){
				isZh[(dataListTmp[i].pier-1)+'U']=true;
				isZh[(dataListTmp[i].pier)+'L']=true;
			}else{
				isZh[(dataListTmp[i].pier-1)+'U']=false;
				isZh[(dataListTmp[i].pier)+'L']=false;
			}
			
		}
		
		
		if(i == 0){
			pierTmp = dataListTmp[i].pier;
			pierArr[pierArrIndex] = new Array();
		}
		
		//T构不变
		if(dataListTmp[i].pier == pierTmp){
			pierArr[pierArrIndex].push(dataListTmp[i]);
		} else {
		//T构改变
			pierTmp = dataListTmp[i].pier;
			pierArrIndex++;
			pierArr[pierArrIndex] = new Array();
			pierArr[pierArrIndex].push(dataListTmp[i]);
		}
	}

	for(var n = 0; n <pierArr.length; n++){
		var pierArrTmp = pierArr[n];
		//将大里程数据和小里程数据拆分
		var sectionInfoU = new Array(); //不带'   20170809 han  大里程
		var sectionInfoL = new Array(); //带'    20170809 han  小里程
		for(var i = 0; i < pierArrTmp.length; i++){
			if(pierArrTmp[i].mileageflag==0 || (pierArrTmp[i].mileageflag==2 && pierArrTmp[i].lineflag==0)){//小里程
				sectionInfoL.push(pierArrTmp[i]);
			} else{//大里程
				sectionInfoU.push(pierArrTmp[i]);
			}
		}
		//找出有测量数据的编号最大的梁段
		var maxPartHaveDataU = -1;
		var maxPartHaveDataL = -1;
		//最大有测量数据的梁段id
		var seqU = 0;//大里程
		var typeU=0;//大里程最大seq的梁段类型
		var seqL = 0;//小里程
		var typeL=0;//小里程最大seq的梁段类型
		//获取最大的seq  小里程
		sectionInfoL= sectionInfoL.reverse();
//		for(var i = sectionInfoL.length - 1; i >= 0; i--){
		for(var i = sectionInfoL.length - 1; i >= 0; i--){
			if((sectionInfoL[i].lowergkbm != null && sectionInfoL[i].lowergkbm != '' && (/*i!=0 &&*/ sectionInfoL[i].ldtype != 5)) ||
					(sectionInfoL[i].uppergkbm != null && sectionInfoL[i].uppergkbm != '' && (/*i!=0 && */sectionInfoL[i].ldtype != 5))){
//				var sectionInfoLTmp = sectionInfoL[i].shortname.split("'");
//				maxPartHaveDataL = sectionInfoLTmp[0];
				
//				if(sectionInfoL[i].mileageflag==0 ||(sectionInfoL[i].mileageflag==2 && sectionInfoL[i].lineflag==0)){
//					seqL = sectionInfoL[i].seq;//小里程
//				}else{
//					seqU = sectionInfoU[i].seq;//大里程
//				}
				if(isZh[(sectionInfoL[i].pier)+'L']){
					seqL=sectionInfoL[sectionInfoL.length-1].seq;
				}else{
					seqL=sectionInfoL[i].seq;
				}
				
				typeL=sectionInfoL[i].ldtype;
				maxPartHaveDataL = Math.abs(seqL);
				break;
			}
		}
		//获取最大的seq  大里程
		for(var i = sectionInfoU.length - 1; i >= 0; i--){
			if((sectionInfoU[i].lowergkbm != null && sectionInfoU[i].lowergkbm != '' && (/*i!=0 && */sectionInfoU[i].ldtype != 5)) || 
					(sectionInfoU[i].uppergkbm != null && sectionInfoU[i].uppergkbm != '' && (/*i!=0 && */sectionInfoU[i].ldtype != 5))){
				if(isZh[(sectionInfoU[i].pier)+'U']){
					seqU = sectionInfoU[sectionInfoU.length - 1].seq;
				}else{
					seqU = sectionInfoU[i].seq;
				}
				
				typeU=sectionInfoU[i].ldtype;
				maxPartHaveDataU = Math.abs(seqU);
				break;
//				var sectionInfoUTmp = sectionInfoU[i].shortname.split("-");
//				if((i!=0 && sectionInfoU[i].ldtype != 5) || (i==0 && (sectionInfoU[i].uppergkbm != null && sectionInfoU[i].uppergkbm != ''))){
//					maxPartHaveDataU = sectionInfoUTmp[0];
////					seqU = sectionInfoU[i].seq;
//					if(sectionInfoU[i].mileageflag==0 ||(sectionInfoU[i].mileageflag==2 && sectionInfoU[i].lineflag==0)){
//						seqL = sectionInfoU[i].seq;//小里程
//					}else{
//						seqU = sectionInfoU[i].seq;//大里程
//					}
//					break;
//				} 
//				if(i==0 &&(sectionInfoU[i].lowergkbm != null && sectionInfoU[i].lowergkbm != '' && seqL == '')){
//					maxPartHaveDataL = sectionInfoUTmp[0];
//					seqL = sectionInfoU[i].seq;
//					break;
//				}
			}else{
				if(n<pierArr.length-1){
//					&&pierArr[n+1].ldtype==3 &&pierArr[n+1].lowergkbm!=null && pierArr[n+1].lowergkbm!=''
//					var test = pierArr[n+1];
//					var test = $.extend(true, {}, pierArr[n+1]);
					var test = new Array();
					test.push(pierArr[n+1]);
					var testTwo=new Array();
					if(test!=null && test !=undefined){
						testTwo = test[0];
					}
					for(var m = 0; m <= test.length; m++){
						var testtemp = $.extend(true, {}, testTwo[m]);
						if(testtemp.ldtype==3 && testtemp.lowergkbm!=null && testtemp.lowergkbm!=''){
							seqU = sectionInfoU[sectionInfoU.length - 1].seq;
						}else{
							continue;
						}
					}
					
				}
			}
		}

		//获取最大有测量数据的梁段的seq(绝对值)
//		var maxSeq = Math.abs(seqU) > Math.abs(seqL)?Math.abs(seqU):Math.abs(seqL);
		var maxSeqL = Math.abs(seqL);
		var maxSeqU = Math.abs(seqU);
		//T构左右两端都没有数据
		if(maxPartHaveDataU == -1 && maxPartHaveDataL == -1) {
			continue;
		}

		//拼接数组
		sectionInfoL.push.apply(sectionInfoL.reverse(),sectionInfoU);

//		if(sectionInfoL.length > 0){
//			sectionInfoL.sort(function(a,b){
//				return a.seq - b.seq;
//			});
//		}

		var dataTmp = sectionInfoL;
		//异常查找
		debugger;
		for(var i = 0; i < dataTmp.length; i++){
			var tmpLdData = dataTmp[i];
			var ldDataTmp = $.extend(true, {}, tmpLdData);//小里程
			var ldDataTmpTwo = $.extend(true, {}, tmpLdData);//大里程
			var ldDataTmpThree = $.extend(true, {}, tmpLdData);//直线段小里程
			var ldDataTmpFour = $.extend(true, {}, tmpLdData);//直线段大里程
			ldDataTmpTwo.mileageFlagZero = 1;
			
			ldDataTmp.reason = '';
			ldDataTmpTwo.reason = '';
			//直线段
			ldDataTmpThree.reason = '';
			ldDataTmpFour.reason = '';
			//0号梁段
			if(ldDataTmpTwo.ldtype == '0' && (ldDataTmpTwo.uppergkbm == null || ldDataTmpTwo.uppergkbm == '')){//大里程
				if(parseInt(Math.abs(ldDataTmpTwo.seq)) <= parseInt(Math.abs(seqU))){
					var reason = '当前梁段没有测量数据';
					ldDataTmpTwo.reason = reason;
				}
			}
			if(ldDataTmp.ldtype == '0' && (ldDataTmp.lowergkbm == null || ldDataTmp.lowergkbm == '')){//小里程
				if(parseInt(Math.abs(ldDataTmp.seq)) <= parseInt(Math.abs(seqL))){
					var reason = '当前梁段没有测量数据';
					ldDataTmp.reason = reason;
				}
			}
			//直线段
			//大里程方向直线段
			if(typeU=='4'){
				if(ldDataTmp.ldtype=='5' && (ldDataTmp.lowergkbm == null || ldDataTmp.lowergkbm == '')){//小里程
					var reason = '当前梁段没有测量数据';
					ldDataTmpThree.reason = reason;
					ldDataTmpThree.mileageFlagZero = 0;
					dataException.push(ldDataTmpThree);
				}
				if(ldDataTmp.ldtype=='5' && (ldDataTmp.uppergkbm == null || ldDataTmp.uppergkbm == '')){//大里程
					var reason = '当前梁段没有测量数据';
					ldDataTmpFour.reason = reason;
					ldDataTmpFour.mileageFlagZero = 1;
					dataException.push(ldDataTmpFour);
				}
			}
			//小里程方向直线段
			//边和有数据  大里程不为空或小里程不为空 
			if(typeL=='4'){
				if(ldDataTmp.ldtype=='5' && (ldDataTmp.uppergkbm == null || ldDataTmp.uppergkbm == '')){//大里程
					var reason = '当前梁段没有测量数据';
					ldDataTmpFour.reason = reason;
					ldDataTmpFour.mileageFlagZero = 1;
				}
				if(ldDataTmp.ldtype=='5' && (ldDataTmp.lowergkbm == null || ldDataTmp.lowergkbm == '')){//小里程
					var reason = '当前梁段没有测量数据';
					ldDataTmpThree.reason = reason;
					ldDataTmpThree.mileageFlagZero = 0;
				}
			}
			
			
			
			debugger;
			//判断是否有监测数据   直线段、小里程、大里程
			//无监测数据
			if(((ldDataTmp.lowergkbm == null || ldDataTmp.lowergkbm == '') && 
				(ldDataTmp.uppergkbm == null || ldDataTmp.uppergkbm == '') && ldDataTmp.mileageflag == 2) ||//直线段或者0号块
				((ldDataTmp.lowergkbm == null || ldDataTmp.lowergkbm == '') && ldDataTmp.mileageflag == 0) ||//小里程
				((ldDataTmp.uppergkbm == null || ldDataTmp.uppergkbm == '') && ldDataTmp.mileageflag == 1)){	//大里程
				
				/**
				 * 0号梁段
				 */
				if(ldDataTmp.ldtype=='0' && (ldDataTmp.lowergkbm == null || ldDataTmp.lowergkbm == '')&&(ldDataTmp.uppergkbm == null || ldDataTmp.uppergkbm == '')){
					if(parseInt(Math.abs(ldDataTmp.seq)) <= parseInt(Math.abs(seqL))){
						var reason = '当前梁段没有测量数据';
						ldDataTmp.reason = reason;
						dataException.push(ldDataTmp);
					}
					if(parseInt(Math.abs(ldDataTmp.seq)) <= parseInt(Math.abs(seqU))){
						var reason = '当前梁段没有测量数据';
						ldDataTmpTwo.reason = reason;
						dataException.push(ldDataTmpTwo);
					}
				}
				/**
				 * 直线段
				 */
				//大里程方向直线段
				//如果边和数据上传 提示直线段
				if(typeU=='4'){
					if(ldDataTmp.ldtype=='5' && (ldDataTmp.lowergkbm == null || ldDataTmp.lowergkbm == '')){//小里程
						var reason = '当前梁段没有测量数据';
						ldDataTmpThree.reason = reason;
						ldDataTmpThree.mileageFlagZero = 0;
						dataException.push(ldDataTmpThree);
					}
					if(ldDataTmp.ldtype=='5' && (ldDataTmp.uppergkbm == null || ldDataTmp.uppergkbm == '')){//大里程
						var reason = '当前梁段没有测量数据';
						ldDataTmpFour.reason = reason;
						ldDataTmpFour.mileageFlagZero = 1;
						dataException.push(ldDataTmpFour);
					}
				}
				//小里程方向直线段
				//边和有数据  大里程不为空或小里程不为空 
				if(typeL=='4'){
					if(ldDataTmp.ldtype=='5' && (ldDataTmp.uppergkbm == null || ldDataTmp.uppergkbm == '')){//大里程
						var reason = '当前梁段没有测量数据';
						ldDataTmpFour.reason = reason;
						ldDataTmpFour.mileageFlagZero = 1;
						dataException.push(ldDataTmpFour);
					}
					if(ldDataTmp.ldtype=='5' && (ldDataTmp.lowergkbm == null || ldDataTmp.lowergkbm == '')){//小里程
						var reason = '当前梁段没有测量数据';
						ldDataTmpThree.reason = reason;
						ldDataTmpThree.mileageFlagZero = 0;
						dataException.push(ldDataTmpThree);
					}
				}
				
				/**
				 * 普通梁段
				 */
				//小里程
				if(ldDataTmp.mileageflag == 0 && parseInt(Math.abs(ldDataTmp.seq)) <= parseInt(Math.abs(seqL))){
					var reason = '当前梁段没有测量数据';
					ldDataTmp.reason = reason;
					dataException.push(ldDataTmp);
				}
				//大里程
				if(ldDataTmp.mileageflag == 1 && parseInt(Math.abs(ldDataTmp.seq)) <= parseInt(Math.abs(seqU))){
					var reason = '当前梁段没有测量数据';
					ldDataTmp.reason = reason;
					dataException.push(ldDataTmp);
				}
				continue;
			}
			else {//有监测数据
				//取得施工阶段
				
				//小里程数据
				var dataTmpArrLower = new Array();
				if(ldDataTmp.lowergkbm != null && ldDataTmp.lowergkbm != '') {
					dataTmpArrLower = ldDataTmp.lowergkbm.split(",");
				}
				//小里程方向直线段大里程
				var dataTmpArrLineLower = new Array();
				if(ldDataTmp.ldtype=='5' && ldDataTmp.lineflag=='0' &&(ldDataTmp.uppergkbm != null && ldDataTmp.uppergkbm != '')) {
					dataTmpArrLineLower = ldDataTmp.uppergkbm.split(",");
				}

				//大里程数据
				var dataTmpArrUpper = new Array();
				if(ldDataTmp.uppergkbm != null && ldDataTmp.uppergkbm != '') {
					dataTmpArrUpper = ldDataTmp.uppergkbm.split(",");
				}
				
				//大里程方向直线段小里程
				var dataTmpArrLineUpper = new Array();
				if(ldDataTmp.ldtype=='5' && ldDataTmp.lineflag=='1' &&(ldDataTmp.lowergkbm != null && ldDataTmp.lowergkbm != '')) {
					dataTmpArrLineUpper = ldDataTmp.lowergkbm.split(",");
				}

				//判断当前梁段缺少的施工工况数据
				var sggkExceptionList = new Array();
				if(ldDataTmp.reason != '当前梁段没有测量数据'){
					ldDataTmp.reason = '缺失';
				}
				if(ldDataTmpTwo.reason != '当前梁段没有测量数据'){
					ldDataTmpTwo.reason = '缺失';
				}
				if(ldDataTmpThree.reason != '当前梁段没有测量数据'){
					ldDataTmpThree.reason = '缺失';
				}
				if(ldDataTmpFour.reason != '当前梁段没有测量数据'){
					ldDataTmpFour.reason = '缺失';
				}
				//找出缺失的施工阶段
				if(gkList!=null || gkList != undefined){//6个工况
					for(var j = 0; j < gkList.length; j++){
						//小里程数据判断    
						if((ldDataTmp.mileageflag == 0 && (ldDataTmp.lowergkbm != null && ldDataTmp.lowergkbm != ''))|| //普通梁段
								(ldDataTmp.mileageflag == 2 && 
										(ldDataTmp.ldtype==5 && ldDataTmp.lineflag == 0) 
												&& ((ldDataTmp.lowergkbm != null && ldDataTmp.lowergkbm != '') ||  (ldDataTmp.uppergkbm != null && ldDataTmp.uppergkbm != ''))||//直线段
											(ldDataTmp.mileageflag == 2 && ldDataTmp.ldtype==0 && (ldDataTmp.lowergkbm != null && ldDataTmp.lowergkbm != ''))	//0号梁段
										)) {
							//0:有缺少的数据 1：没有缺少数据
							var equalFlgLower = 0;
							var equalFlgLineLower = 0;
							if(ldDataTmp.mileageflag == 2){//直线段或者0号梁段
								if(ldDataTmp.ldtype=='5'){//直线段
									if(ldDataTmp.uppergkbm != null && ldDataTmp.uppergkbm != ''){//直线段 大里程
										for(var m = 0; m < dataTmpArrLineLower.length; m++ ){
											var gkTmp = dataTmpArrLineLower[m].split("#");
											if(gkTmp[0] == gkList[j].id){
												equalFlgLineLower = 1;
												break;
											}
										}
									}
								}
								if(ldDataTmp.lowergkbm != null && ldDataTmp.lowergkbm != ''){ //直线段 小里程  0号梁段 小里程
									for(var m = 0; m < dataTmpArrLower.length; m++ ){
										var gkTmp = dataTmpArrLower[m].split("#");
										if(gkTmp[0] == gkList[j].id){
											equalFlgLower = 1;
											break;
										}
									}
								}
							}else if(ldDataTmp.mileageflag == 0){//普通梁段
								for(var m = 0; m < dataTmpArrLower.length; m++ ){
									var gkTmp = dataTmpArrLower[m].split("#");
									if(gkTmp[0] == gkList[j].id){
										equalFlgLower = 1;
										break;
									}
								}
							}

							//把缺少的施工阶段加入到异常信息中
							if(equalFlgLower == 0 || equalFlgLineLower == 0){
								
								//最大梁段时，小于当前施工工况的追加为异常  普通梁段							
								if(ldDataTmp.mileageflag == 0 && equalFlgLower == 0) {//普通梁段
									if(maxSeqL == Math.abs(ldDataTmp.seq)){//最后一个梁段
										if(gkList[j].id < ldDataTmp.maxgkbm) {
											ldDataTmp.reason = ldDataTmp.reason + gkList[j].name + '、';
										}
									}else if(maxSeqL > Math.abs(ldDataTmp.seq)){
										ldDataTmp.reason = ldDataTmp.reason + gkList[j].name + '、';
									}
									
									
								}else if(ldDataTmp.mileageflag == 2){//直线段或者0号块
									if(ldDataTmp.ldtype=='5'){
										
										if((ldDataTmp.uppergkbm != null && ldDataTmp.uppergkbm != '' && equalFlgLineLower == 0)){//直线段大里程
											ldDataTmpFour.mileageFlagZero = 1;
											
											if(typeL=='4'){//有边合
												ldDataTmpFour.reason = ldDataTmpFour.reason + gkList[j].name + '、';
											}else{//无边合
												if(gkList[j].id < ldDataTmp.maxgkbm) {
													ldDataTmpFour.reason = ldDataTmpFour.reason + gkList[j].name + '、';
												}
											}
										}
										if((ldDataTmp.lowergkbm != null && ldDataTmp.lowergkbm != '' && equalFlgLower == 0)){//直线段小里程
											ldDataTmp.mileageFlagZero = 0;
											
											if(typeL=='4'){//有边合
												ldDataTmp.reason = ldDataTmp.reason + gkList[j].name + '、';
											}else{//无边合
												if(gkList[j].id < ldDataTmp.maxgkbm) {
													ldDataTmp.reason = ldDataTmp.reason + gkList[j].name + '、';
												}
											}
										}
									}else if(ldDataTmp.ldtype=='0' && equalFlgLower == 0){//0号梁段
										if(maxSeqL == Math.abs(ldDataTmp.seq)){//最后一个梁段
											if(gkList[j].id < ldDataTmp.maxgkbm) {
												ldDataTmp.reason = ldDataTmp.reason + gkList[j].name + '、';
											}
										}else if(maxSeqL > Math.abs(ldDataTmp.seq)){
											ldDataTmp.reason = ldDataTmp.reason + gkList[j].name + '、';
										}
									}
								}
							} else {
								equalFlgLower = 0;
							}
							//去掉最后的、
							if( (j == gkList.length - 1) && (ldDataTmp.reason != '缺失' /*|| ldDataTmpThree.reason != '缺失' */|| ldDataTmpFour.reason != '缺失')) {
								if(ldDataTmp.reason!=""){
									ldDataTmp.reason = ldDataTmp.reason.substr(0, ldDataTmp.reason.length-1) + '工况数据';
								}
								if(ldDataTmpFour.reason!="" && ldDataTmp.ldtype=='5' && (ldDataTmp.uppergkbm != null && ldDataTmp.uppergkbm != '' )){
									ldDataTmpFour.reason = ldDataTmpFour.reason.substr(0, ldDataTmpFour.reason.length-1) + '工况数据';
								}
							}
							
						}

						//大里程数据判断
						if((ldDataTmp.mileageflag == 1 && (ldDataTmp.uppergkbm != null && ldDataTmp.uppergkbm != ''))||//普通梁段
								(ldDataTmp.mileageflag == 2  && (ldDataTmp.ldtype==5 && ldDataTmp.lineflag == 1)
										&& ((ldDataTmp.lowergkbm != null && ldDataTmp.lowergkbm != '') ||  (ldDataTmp.uppergkbm != null && ldDataTmp.uppergkbm != '')))||//直线段
										(ldDataTmp.mileageflag == 2 && ldDataTmp.ldtype==0 && (ldDataTmp.uppergkbm != null && ldDataTmp.uppergkbm != ''))) {//0号梁段
							//0:有缺少的数据 1：没有缺少数据
							var equalFlgUpper = 0;
							var equalFlgLineUpper = 0;
							if(ldDataTmp.mileageflag == 2){//直线段  或者 0 号梁段
								if(ldDataTmp.uppergkbm != null && ldDataTmp.uppergkbm != ''){//直线段 大里程  0号梁段大里程
									for(var m = 0; m < dataTmpArrUpper.length; m++ ){
										var gkTmp = dataTmpArrUpper[m].split("#");
										if(gkTmp[0] == gkList[j].id){
											equalFlgUpper = 1;
											break;
										}
									}
								}
								if(ldDataTmp.ldtype=='5'){
									if(ldDataTmp.lowergkbm != null && ldDataTmp.lowergkbm != ''){ //直线段 小里程
										for(var m = 0; m < dataTmpArrLineUpper.length; m++ ){
											var gkTmp = dataTmpArrLineUpper[m].split("#");
											if(gkTmp[0] == gkList[j].id){
												equalFlgLineUpper = 1;
												break;
											}
										}
									}
								}
								
							}else{//普通梁段
								for(var m = 0; m < dataTmpArrUpper.length; m++ ){
									var gkTmp = dataTmpArrUpper[m].split("#");
									if(gkTmp[0] == gkList[j].id){
										equalFlgUpper = 1;
										break;
									}
								}
							}
							debugger;
							//把缺少的施工阶段加入到异常信息中
							if(equalFlgUpper == 0 || equalFlgLineUpper==0){
								if(ldDataTmp.mileageflag == 2) {//直线段  或者0号梁段
									if(ldDataTmp.ldtype=='5'){ //直线段
										if((ldDataTmp.uppergkbm != null && ldDataTmp.uppergkbm != '' && equalFlgUpper == 0)){//直线段大里程
											ldDataTmp.mileageFlagZero = 1;
											
											if(typeU=='4'){//有边合
												ldDataTmp.reason = ldDataTmp.reason + gkList[j].name + '、';
											}else{//无边合
												if(gkList[j].id < ldDataTmp.maxgkbm) {
													ldDataTmp.reason = ldDataTmp.reason + gkList[j].name + '、';
												}
											}
										}
										
										if((ldDataTmp.lowergkbm != null && ldDataTmp.lowergkbm != '' && equalFlgLineUpper == 0)){//直线段小里程
											ldDataTmpThree.mileageFlagZero = 0;
											
											if(typeU=='4'){//有边合
												ldDataTmpThree.reason = ldDataTmpThree.reason + gkList[j].name + '、';
											}else{//无边合
												if(gkList[j].id < ldDataTmp.maxgkbm) {
													ldDataTmpThree.reason = ldDataTmpThree.reason + gkList[j].name + '、';
												}
											}
										}
									}else if(ldDataTmp.ldtype=='0'&& equalFlgUpper == 0){ //0号梁段
										//最大梁段时，小于当前施工工况的追加为异常
										if(maxSeqU == Math.abs(ldDataTmp.seq)) {
											if(gkList[j].id < ldDataTmpTwo.maxgkbm) {
												ldDataTmpTwo.reason = ldDataTmpTwo.reason + gkList[j].name + '、';
											}
										} else {
											ldDataTmpTwo.reason = ldDataTmpTwo.reason + gkList[j].name + '、';
										}
									}	
								} else if(ldDataTmp.mileageflag == 1&& equalFlgUpper == 0){//普通梁段
									
									//最大梁段时，小于当前施工工况的追加为异常
									if(maxSeqU == Math.abs(ldDataTmp.seq)) {
										if(gkList[j].id < ldDataTmp.maxgkbm) {
											ldDataTmp.reason = ldDataTmp.reason + gkList[j].name + '、';
										}
									} else {
										ldDataTmp.reason = ldDataTmp.reason + gkList[j].name + '、';
									}
								}

							} else {
								equalFlgUpper = 0;
							}
							//去掉最后的、
							if( (j == gkList.length - 1) && (ldDataTmp.reason != '缺失' || ldDataTmpThree.reason != '缺失' || ldDataTmpTwo.reason != '缺失')) {
								if(ldDataTmp.ldtype=='5' || ldDataTmp.mileageflag == 1){//直线段大里程方向数据
									ldDataTmp.reason = ldDataTmp.reason.substr(0, ldDataTmp.reason.length-1) + '工况数据';
								}
								if(ldDataTmpThree.reason!="" && ldDataTmpThree.ldtype=='5'){//直线段 小里程测点数据
									ldDataTmpThree.reason = ldDataTmpThree.reason.substr(0, ldDataTmpThree.reason.length-1) + '工况数据';
								}
								if(ldDataTmpTwo.reason!="" && ldDataTmpTwo.ldtype=='0'){
									ldDataTmpTwo.reason = ldDataTmpTwo.reason.substr(0, ldDataTmpTwo.reason.length-1) + '工况数据';
								}
							}
						}
					}
				}
				
				/**
				 * 超过5倍极限值的异常提示
				 */
				
				//小里程数据判断
				if((ldDataTmp.mileageflag == 0 && (ldDataTmp.lowergkbm != null && ldDataTmp.lowergkbm != ''))
						|| (ldDataTmp.mileageflag == 2 && ((ldDataTmp.ldtype==5 && ldDataTmp.lineflag == 0) ||ldDataTmp.ldtype==0 )
								&& ((ldDataTmp.lowergkbm != null && ldDataTmp.lowergkbm != '') ||  (ldDataTmp.uppergkbm != null && ldDataTmp.uppergkbm != '')))) {
					
					//判断是否有高程偏差异常
					if(ldDataTmp.lowerdelta != "#" ||ldDataTmp.upperdelta != "#"){
						var pcLimtTmp = ldDataTmp.lowerdelta.split("#");
						//高程偏差的最大值
						var maxPcz = pcLimtTmp[1];
						//高程偏差的最小值
						var minPcz = pcLimtTmp[0];
						if(minPcz < deltaLower * 5 || maxPcz > deltaUpper * 5){
							//普通梁段
						if(ldDataTmp.mileageflag == 0){
								if(ldDataTmp.reason != '缺失'){
									ldDataTmp.reason = ldDataTmp.reason + "、" + "高程偏差异常";
								} else{
									ldDataTmp.reason = "高程偏差异常";
								}
						}else if(ldDataTmp.mileageflag == 2){//直线段 或 0 号梁段
							if(ldDataTmp.lowerdelta != "#"){//小里程
								ldDataTmp.mileageFlagZero = 0;
								if(ldDataTmp.reason != '缺失'){
									ldDataTmp.reason = ldDataTmp.reason + "、" + "高程偏差异常";
								} else{
									ldDataTmp.reason = "高程偏差异常";
								}
							}
							if(ldDataTmp.upperdelta != "#"){//大里程
								if( ldDataTmp.ldtype=='5'){
									ldDataTmpFour.mileageFlagZero = 1;
									if(ldDataTmpFour.reason != '缺失'){
										ldDataTmpFour.reason = ldDataTmpFour.reason + "、" + "高程偏差异常";
									} else{
										ldDataTmpFour.reason = "高程偏差异常";
									}
								}
							}
						}
					}
				}

					//判断是否有中线偏差异常
					if((ldDataTmp.loweroutl != '' && ldDataTmp.loweroutl != null) || (ldDataTmp.upperoutl != '' && ldDataTmp.upperoutl != null)){
						if(ldDataTmp.loweroutl < outlLower * 5 || ldDataTmp.loweroutl > outlUpper * 5){
							//普通梁段
							if( ldDataTmp.mileageflag == 0){
								if(ldDataTmp.reason != '缺失'){
									ldDataTmp.reason = ldDataTmp.reason + "、" + "中线偏差异常";
								} else{
									ldDataTmp.reason = "中线偏差异常";
								}
							}else if(ldDataTmp.mileageflag == 2){//直线段 或者 0号梁段
								if(ldDataTmp.loweroutl != "#"){//小里程
									
									ldDataTmp.mileageFlagZero = 0;
									
									if(ldDataTmp.reason != '缺失'){
										ldDataTmp.reason = ldDataTmp.reason + "、" + "中线偏差异常";
									} else{
										ldDataTmp.reason = "中线偏差异常";
									}
								}
								if(ldDataTmp.upperoutl != "#"){//大里程
									if(ldDataTmp.ldtype=='5'){
										ldDataTmpFour.mileageFlagZero = 1;
										if(ldDataTmpFour.reason != '缺失'){
											ldDataTmpFour.reason = ldDataTmpFour.reason + "、" + "中线偏差异常";
										} else{
											ldDataTmpFour.reason = "中线偏差异常";
										}
									}
								}
							}
						}
					}

					//判断是否有立模标高异常
					if(ldDataTmp.lowerlmpcz != "#" || ldDataTmp.upperlmpcz != "#"){
						var pcLimtTmp = ldDataTmp.lowerlmpcz.split("#");
						//立模偏差的最大值
						var maxPcz = pcLimtTmp[1];
						//立模偏差的最小值
						var minPcz = pcLimtTmp[0];
						if(minPcz < lmpcLower * 5 || maxPcz > lmpcUpper * 5){
							if(ldDataTmp.mileageflag == 0){//普通梁段
								if(ldDataTmp.reason != '缺失'){
									ldDataTmp.reason = ldDataTmp.reason + "、" + "立模标高偏差异常";
								} else{
									ldDataTmp.reason = "立模标高偏差异常";
								}
							}else if(ldDataTmp.mileageflag == 2){//直线段或者0号梁段
								if(ldDataTmp.lowerlmpcz != "#"){//小里程
									ldDataTmp.mileageFlagZero = 0;
										if(ldDataTmp.reason != '缺失'){
											ldDataTmp.reason = ldDataTmp.reason + "、" + "立模标高偏差异常";
										} else{
											ldDataTmp.reason = "立模标高偏差异常";
										}
								}
								if(ldDataTmp.upperlmpcz != "#"){//大里程
									if(ldDataTmp.ldtype=='5'){
										ldDataTmpFour.mileageFlagZero = 1;
										if(ldDataTmpFour.reason != '缺失'){
											ldDataTmpFour.reason = ldDataTmpFour.reason + "、" + "立模标高偏差异常";
										} else{
											ldDataTmpFour.reason = "立模标高偏差异常";
										}
									}
								}
							}
						}
					}
				}

				//大里程数据判断
				if((ldDataTmp.mileageflag == 1 && (ldDataTmp.uppergkbm != null && ldDataTmp.uppergkbm != ''))
						|| (ldDataTmp.mileageflag == 2  && ((ldDataTmp.ldtype==5 && ldDataTmp.lineflag == 1) ||ldDataTmp.ldtype==0 )
								&& ((ldDataTmp.lowergkbm != null && ldDataTmp.lowergkbm != '') ||  (ldDataTmp.uppergkbm != null && ldDataTmp.uppergkbm != '')))) {
					//判断是否有高程偏差异常
					if(ldDataTmp.upperdelta != "#" || ldDataTmp.lowerdelta != "#"){
						var pcLimtTmp = ldDataTmp.upperdelta.split("#");
						//高程偏差的最大值
						var maxPcz = pcLimtTmp[1];
						//高程偏差的最小值
						var minPcz = pcLimtTmp[0];
						if(minPcz < deltaLower * 5 || maxPcz > deltaUpper * 5){
							if(ldDataTmp.mileageflag == 2) {//直线段 或者0号梁段
								if(ldDataTmp.lowerdelta != "#"){//小里程
									if(ldDataTmp.ldtype=='5'){//直线段
										ldDataTmpThree.mileageFlagZero = 0;
										if(ldDataTmpThree.reason != '缺失'){
											ldDataTmpThree.reason = ldDataTmpThree.reason + "、" + "高程偏差异常";
										} else{
											ldDataTmpThree.reason = "高程偏差异常";
										}
									}
								}
								
								if(ldDataTmp.upperdelta != "#"){//大里程
									if(ldDataTmp.ldtype=='5'){//直线段
										ldDataTmp.mileageFlagZero = 1;
										if(ldDataTmp.reason != '缺失'){
											ldDataTmp.reason = ldDataTmp.reason + "、" + "高程偏差异常";
										} else{
											ldDataTmp.reason = "高程偏差异常";
										}
									}else{
										ldDataTmpTwo.mileageFlagZero = 1;
										if(ldDataTmpTwo.reason != '缺失'){
											ldDataTmpTwo.reason = ldDataTmpTwo.reason + "、" + "高程偏差异常";
										} else{
											ldDataTmpTwo.reason = "高程偏差异常";
										}
									}
									
								}
							} else {//普通梁段
									if(ldDataTmp.reason != '缺失'){
										ldDataTmp.reason = ldDataTmp.reason + "、" + "高程偏差异常";
									} else{
										ldDataTmp.reason = "高程偏差异常";
									}
							}
						}
					}

					//判断是否有中线偏差异常
					if(ldDataTmp.upperoutl != '' && ldDataTmp.upperoutl != null){
						if(ldDataTmp.upperoutl < outlLower * 5 || ldDataTmp.upperoutl > outlUpper * 5){
							if(ldDataTmp.mileageflag == 2) { //直线段 或者 0 号块
								if(ldDataTmp.loweroutl != "#"){//小里程
									if(ldDataTmp.ldtype=='5'){
										ldDataTmpThree.mileageFlagZero = 0;
										if(ldDataTmpThree.reason != '缺失'){
											ldDataTmpThree.reason = ldDataTmpThree.reason + "、" + "中线偏差异常";
										} else{
											ldDataTmpThree.reason = "中线偏差异常";
										}
									}
								}
								if(ldDataTmp.upperoutl != "#"){//大里程
									if(ldDataTmp.ldtype=='5'){ //直线段
										ldDataTmp.mileageFlagZero = 1;
										if(ldDataTmp.reason != '缺失'){
											ldDataTmp.reason = ldDataTmp.reason + "、" + "中线偏差异常";
										} else{
											ldDataTmp.reason = "中线偏差异常";
										}
									}else{
										if(ldDataTmpTwo.reason != '缺失'){
											ldDataTmpTwo.reason = ldDataTmpTwo.reason + "、" + "中线偏差异常";
										} else{
											ldDataTmpTwo.reason = "中线偏差异常";
										}
									}
								}
								
							} else { //普通梁段
									if(ldDataTmp.reason != '缺失'){
										ldDataTmp.reason = ldDataTmp.reason + "、" + "中线偏差异常";
									} else{
										ldDataTmp.reason = "中线偏差异常";
									}
							}
						}
					}

					//判断是否有立模超限异常
					if(ldDataTmp.upperlmpcz != "#" || ldDataTmp.lowerlmpcz != "#"){
						var pcLimtTmp = ldDataTmp.upperlmpcz.split("#");
						//高程偏差的最大值
						var maxPcz = pcLimtTmp[1];
						//高程偏差的最小值
						var minPcz = pcLimtTmp[0];

						if(minPcz < lmpcLower * 5 || maxPcz > lmpcUpper * 5){
							if(ldDataTmp.mileageflag == 2) { //直线段 或者 0 号块
								if(ldDataTmp.lowerlmpcz != "#"){//小里程
									if(ldDataTmp.ldtype=='5'){ //直线段
										ldDataTmpThree.mileageFlagZero = 0;
										if(ldDataTmpThree.reason != '缺失'){
											ldDataTmpThree.reason = ldDataTmpThree.reason + "、" + "立模标高偏差异常";
										} else{
											ldDataTmpThree.reason = "立模标高偏差异常";
										}
									}
								}
								if(ldDataTmp.upperlmpcz != "#"){//大里程
									if(ldDataTmp.ldtype=='5'){ //直线段
										ldDataTmp.mileageFlagZero = 1;
										if(ldDataTmp.reason != '缺失'){
											ldDataTmp.reason = ldDataTmp.reason + "、" + "立模标高偏差异常";
										} else{
											ldDataTmp.reason = "立模标高偏差异常";
										}
									}else{
										if(ldDataTmpTwo.reason != '缺失'){
											ldDataTmpTwo.reason = ldDataTmpTwo.reason + "、" + "立模标高偏差异常";
										} else{
											ldDataTmpTwo.reason = "立模标高偏差异常";
										}
									}
									
								}
								
							} else {
								if(ldDataTmp.reason != '缺失'){
									ldDataTmp.reason = ldDataTmp.reason + "、" + "立模标高偏差异常";
								} else{
									ldDataTmp.reason = "立模标高偏差异常";
								}
							}
						}
					}
				}
				//如有异常信息，追加到返回值中
				if(/*ldDataTmp.reason && */ldDataTmp.reason != null && ldDataTmp.reason != '' &&  ldDataTmp.reason != '缺失'){
					dataException.push(ldDataTmp);
				}
				//只有大于5倍的超限信息
				if(/*ldDataTmpTwo.reason && */ldDataTmpTwo.reason != null && ldDataTmpTwo.reason != '' && ldDataTmpTwo.reason != '缺失'){
					dataException.push(ldDataTmpTwo);
				}
				
				if(ldDataTmpThree.reason != null && ldDataTmpThree.reason != '' &&  ldDataTmpThree.reason != '缺失'){
					dataException.push(ldDataTmpThree);
				}
				
				if(ldDataTmpFour.reason != null && ldDataTmpFour.reason != '' &&  ldDataTmpFour.reason != '缺失'){
					dataException.push(ldDataTmpFour);
				}
			}
		}
	}

	return dataException;
}

//显示指定连续梁的超限梁段信息
function showWarnInfo(lxlInfoTmp){
	//$("#warnInfoListDiv").height($(".echart-region:eq(0)").prop("scrollHeight"));
	//20170802将超限梁段处置页详情 变成  超限梁段未处置详情
	$("#warnInfoTitleSpan").html(lxlInfoTmp.name+"超限梁段未处置详情");
	$.ajax({
		async : true,//是否异步
		cache : false,//是否使用缓存
		type : 'POST',//请求方式：get
		dataType : 'json',//数据传输格式：json
		url : "homeSection/getLxlWarnInfo",//请求的action路径
		data : {
			"conbeamID" : lxlInfoTmp.conbeamid
		},
		error : function() {
			alert("服务器异常！");
		},
		success : function(data) { //请求成功后处理函数
			if (data['code'] != 0) {
					console.log(data['msg']);
			} else {
				$('#lxlWarnInfoTbl').empty();
				var trIndex = 0;
				for(var i = 0; i < data['result'].lxlWarnInfo.length; i++){
					var warnInfo = data['result'].lxlWarnInfo[i];
					if((warnInfo.lowerwarntypes != null && warnInfo.lowerwarntypes != '') ||
							(warnInfo.upperwarntypes != null && warnInfo.upperwarntypes != '')){
						//索引判断
						if((warnInfo.lowerwarntypes != null && warnInfo.lowerwarntypes != '') &&
								(warnInfo.upperwarntypes != null && warnInfo.upperwarntypes != '')){
							//同时存在大里程和小里程偏差数据
							if(trIndex == 0) {
								$("#lxlWarnInfoTbl").append("<tr><td style='width:42px'></td><td style='width:132px'></td><td style='width:165px'></td><td style='width:98px'></td><td></td></tr>");
								$("#lxlWarnInfoTbl").append("<tr><td></td><td></td><td></td><td></td><td></td></tr>");
							} else {
								$("#lxlWarnInfoTbl").append("<tr><td></td><td></td><td></td><td></td><td></td></tr>");
								$("#lxlWarnInfoTbl").append("<tr><td></td><td></td><td></td><td></td><td></td></tr>");
							}
	
							trIndex = trIndex+2;
							//设置直线段或者0号块的偏差信息
							var tdArrOne = $("#lxlWarnInfoTbl").find("tr:eq("+(trIndex-2)+")").children();
							var tdArrTwo = $("#lxlWarnInfoTbl").find("tr:eq("+(trIndex-1)+")").children();
							//序号
							tdArrOne.eq(0).html(trIndex-1);
							tdArrTwo.eq(0).html(trIndex);
							//T构
							tdArrOne.eq(1).html(warnInfo.pier);
							tdArrTwo.eq(1).html(warnInfo.pier);
			
							//偏差超限类型
							var warnTypesTmpOne = '';
							if(warnInfo.lowerwarntypes != null && warnInfo.lowerwarntypes != '') {
								var warnTypes = warnInfo.lowerwarntypes.split(",");

								//梁段
								var ldName = warnInfo.shortname.split("-");
								var mileStr;
								if(warnTypes.length != 0){
									mileStr = "小";
									//偏差超限件数
									tdArrOne.eq(3).html(warnTypes.length);
									tdArrOne.eq(2).html(ldName[0] + "（" + mileStr + "）");
								}

								$.unique(warnTypes.sort());
								for(var j = 0; j < warnTypes.length; j++){
									warnTypesTmpOne = warnTypesTmpOne + warnTypes[j] + "、";
								}
								warnTypesTmpOne = warnTypesTmpOne.substr(0, warnTypesTmpOne.length - 1);
							}
							tdArrOne.eq(4).html(warnTypesTmpOne);

							var warnTypesTmpTwo = '';
							if(warnInfo.upperwarntypes != null && warnInfo.upperwarntypes != '') {
								var warnTypes = warnInfo.upperwarntypes.split(",");

								//梁段
								var ldName = warnInfo.shortname.split("-");
								var mileStr;
								if(warnTypes.length != 0){
									mileStr = "大";
									//偏差超限件数
									tdArrTwo.eq(3).html(warnTypes.length);
									tdArrTwo.eq(2).html(ldName[0] + "（" + mileStr + "）");
								}

								$.unique(warnTypes.sort());
								for(var j = 0; j < warnTypes.length; j++){
									warnTypesTmpTwo = warnTypesTmpTwo + warnTypes[j] + "、";
								}
								warnTypesTmpTwo = warnTypesTmpTwo.substr(0, warnTypesTmpTwo.length - 1);
							}
							tdArrTwo.eq(4).html(warnTypesTmpTwo);
						} else {
							if(trIndex == 0) {
								$("#lxlWarnInfoTbl").append("<tr><td style='width:42px'></td><td style='width:132px'></td><td style='width:165px'></td><td style='width:98px'></td><td></td></tr>");
							} else {
								$("#lxlWarnInfoTbl").append("<tr><td></td><td></td><td></td><td></td><td></td></tr>");
							}

							trIndex = trIndex+1;
							var tdArr = $("#lxlWarnInfoTbl").find("tr:eq("+(trIndex-1)+")").children();
							//序号
							tdArr.eq(0).html(trIndex);
							//T构
							tdArr.eq(1).html(warnInfo.pier);

							//偏差超限类型
							var warnTypesTmp = '';
							if(warnInfo.lowerwarntypes != null && warnInfo.lowerwarntypes != '') {
								var warnTypes = warnInfo.lowerwarntypes.split(",");

								//梁段
								var ldName = warnInfo.shortname.split("-");
								var mileStr;

								if(warnTypes.length != 0){
									mileStr = "小";
								}
								tdArr.eq(2).html(ldName[0] + "（" + mileStr + "）");

								//偏差超限件数
								tdArr.eq(3).html(warnTypes.length);

								$.unique(warnTypes.sort());
								for(var j = 0; j < warnTypes.length; j++){
									warnTypesTmp = warnTypesTmp + warnTypes[j] + "、";
								}
								warnTypesTmp = warnTypesTmp.substr(0, warnTypesTmp.length - 1);
							} else {
								var warnTypes = warnInfo.upperwarntypes.split(",");

								//梁段
								var ldName = warnInfo.shortname.split("-");
								var mileStr;
								if(warnTypes.length != 0){
									mileStr = "大";
								}
								tdArr.eq(2).html(ldName[0] + "（" + mileStr + "）");

								//偏差超限件数
								tdArr.eq(3).html(warnTypes.length);

								$.unique(warnTypes.sort());
								for(var j = 0; j < warnTypes.length; j++){
									warnTypesTmp = warnTypesTmp + warnTypes[j] + "、";
								}
								warnTypesTmp = warnTypesTmp.substr(0, warnTypesTmp.length - 1);
							}
							tdArr.eq(4).html(warnTypesTmp);
						}

					}
				}
				if(trIndex == 0){
					alert("数据不存在！");
				} else {
					$("#warnInfoListDiv").showModal();
				}
			}
		}
	});
}

//显示指定连续梁的超限梁段信息
function showExceptionListDiv(exceptionList,lxlName){
	var trIndex = 0;
	//$("#exceptionListDiv").height($(".echart-region:eq(0)").prop("scrollHeight"));
	$("#exceptionListTbl").empty();
	for(var i = 0; i < exceptionList.length; i++){
		var exceptionInfo = exceptionList[i];
		if(exceptionList.length != 0){
			if(trIndex == 0){
				$("#exceptionListTbl").append("<tr><td style='width:42px'></td><td style='width:82px'></td><td style='width:98px'></td><td style='width:260px'></td><td></td></tr>");
			}else{
				$("#exceptionListTbl").append("<tr><td></td><td></td><td></td><td></td><td></td></tr>");
			}

			trIndex = trIndex+1;
			var tdArr = $("#exceptionListTbl").find("tr:eq("+(trIndex-1)+")").children();
			//序号
			tdArr.eq(0).html(trIndex);
			//T构
			tdArr.eq(1).html(exceptionInfo.pier);
			//梁段
			var ldName = exceptionInfo.shortname.split("-");
debugger;
			if(exceptionInfo.ldtype == 0 || exceptionInfo.ldtype == 5){
				var mileStr;
				if(exceptionInfo.mileageFlagZero != 1){
					mileStr = "小";
				}else{
					mileStr = "大";
				}
			} else {

				if(exceptionInfo.mileageflag == 0){
					mileStr = "小";
				}else{
					mileStr = "大";
				}
			}
			tdArr.eq(2).html(ldName[0] + "（" + mileStr + "）");
			//异常原因
			tdArr.eq(3).html(exceptionInfo.reason );
			tdArr.eq(3).attr("title",exceptionInfo.reason);
			//说明
			if(exceptionInfo.mileageFlagZero != 1){
				exceptionInfo.mileageFlagZero = 0;
			}
			var textId = "mark" + exceptionInfo.mileageFlagZero +  exceptionInfo.mileageflag + exceptionInfo.partid;
			tdArr.eq(4).html("<input class='placeholerStyle' style='width:100%;height:100%' placeholder='最多输入200个字符' maxlength='200' type='text' id='" + textId +"' />");
			var chinese = '最多输入200个字符';
			//显示说明
			if(exceptionInfo.mileageflag == 1) {
				$("#" + textId).val(exceptionInfo.upperremarks);
			} else if(exceptionInfo.mileageflag == 0) {
				$("#" + textId).val(exceptionInfo.lowerremarks);
			} else {
				if(exceptionInfo.mileageFlagZero == 1){
					$("#" + textId).val(exceptionInfo.upperremarks);
				} else {
					$("#" + textId).val(exceptionInfo.lowerremarks);
				}
			}
			if(!placeholderSupport()){	// 判断浏览器是否支持 placeholder
			
				
				$('input.placeholerStyle').each(function(){
					
					if($(this).val()==''){
						$(this).attr('value','最多输入200个字符');
						
						$('.placeholerStyle').on('focus',function(){
							$(this).attr('value','')
							$(this).css('color','#333');
						})
					}
					if($(this).val() !=''){
						
						$('.placeholerStyle').on('blur',function(){
							if($(this).val() == ''){
								$(this).attr('value','最多输入200个字符')
							}
							if($(this).val() == chinese){
								 
								 $(this).css('color','#bbb');
							 }
							
						})
					} 
				})
				 
			}
			
			 $('input.placeholerStyle').each(function(){
				 if($(this).val() == chinese){
				 
					 $(this).css('color','#bbb');
				 }
			 })
			
		}
	}
	$("#exceptionListDiv").showModal();
}

//隐藏偏差信息模态窗口
function hideLdWrnInfoDiv(){
	$('#lxlWarnInfoTbl').empty();
	$("#warnInfoListDiv").hideModal();
}

//关闭待办事项弹出子窗口
function hideDbsxDivMore(){
	$('#dbsxTbl').empty();
	$("#dbsxDivMore").hideModal();
}

//隐藏连续梁异常数据模态窗口
function hideLdExceptionListDiv(){
	$('#exceptionListTbl').empty();
	$("#exceptionListDiv").hideModal();
}

//关闭施工阶段窗口
function hideSggkListDiv(){
	$("#sggkListDiv").hideModal();
}

//保存说明
function saveLdExceptionList(){
	$("#remarkSaveBtn").attr("disabled",true);
	var jsonList = new Array();
	$("#exceptionListTbl").find("tr").each(function(){
		var remarkTmp = $(this).find(":text").eq(0).val()
		var idTmp = $(this).find(":text").eq(0).attr("id").substr(6);
		var ldMileageZeroFlag = $(this).find(":text").eq(0).attr("id").substr(4,1);
		var ldMileageFlag = $(this).find(":text").eq(0).attr("id").substr(5,1);

		var jsonTmp = new Object();
		jsonTmp.partid=idTmp;

		//根据大小里程更新备注
		if(ldMileageFlag == 1) {
			jsonTmp.upperremarks = remarkTmp;
			jsonTmp.lowerremarks = "undefined";
		} else if(ldMileageFlag == 0) {
			jsonTmp.upperremarks = "undefined";
			jsonTmp.lowerremarks = remarkTmp;
		} else {
			if(ldMileageZeroFlag == 1){
				jsonTmp.upperremarks = remarkTmp;
				jsonTmp.lowerremarks = "undefined";
			} else {
				jsonTmp.upperremarks = "undefined";
				jsonTmp.lowerremarks = remarkTmp;
			}
		}

		//更新说明有值的记录
		jsonList.push(jsonTmp);
	} );

	//判断是否有需要更新的记录
	if(jsonList.length > 0){
		var param = JSON.stringify(jsonList);
		$.ajax({
			async : false,//是否异步
			cache : false,//是否使用缓存
			type : 'post',//请求方式：get
			dataType : 'json',//数据传输格式：json
			url : "homeSection/updateLdRemarks",//请求的action路径
			data : {
				"remarkData" :param
			},
			error : function() {
				alert("服务器异常！");
				$("#remarkSaveBtn").attr("disabled",false);
			},
			success : function(data) { //请求成功后处理函数
				$("#remarkSaveBtn").attr("disabled",false);
				if(data['code'] == 0){
					alert("更新成功！");
					hideLdExceptionListDiv();
				}else{
					alert("更新失败！");
				}
			}
		});
	}
	getSectionInfo(sectionIdTmp, lxlListForViewTmp);
}
/**
 * 获取连续梁最新上传数据
 * @returns
 */
function getUploadLxlInfo(){
	$.ajax({
		async : true,//是否异步
		cache : false,//是否使用缓存
		type : 'post',//请求方式：get
		dataType : 'json',//数据传输格式：json
		url : "homeSection/getNewLxl",//请求的action路径
		data:{"sectionid":getSectionId()},
		error : function() {
			alert("服务器异常！");
		},
		success : function(data) { //请求成功后处理函数
			$("#newLxlData ul").empty();
			if (data['code'] != 0) {
				$("#newLxlData ul").append("<li><h4 style='text-align: center;line-height:206px;font-size: 20px;color: #AEAEAE;font-weight: 600'>暂无数据</h4></li>")
			} else {
				var result = data['result'];
				for(var i=0;i<result.length;i++){
					var newLxldata = result[i];
					appendLxlData(newLxldata);
				}
			}
		}
	});
}
/**
 * 页面写入30天内新上传连续梁
 * @param newLxl 连续梁数据
 * @returns
 */
function appendLxlData(newLxl){
	$("#newLxlData ul").append("<li style='position:relative'><span style='word-break:break-all;max-width:220px;display:inline-block'>" +"•  "+newLxl.name+
			"</span><span class='newTime' style='bottom:10px;position:absolute;right:20px'>" +newLxl.newdate+"</span><div class='sectionHomeTop-third-bottom'></div></li>");
}




