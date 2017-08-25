/*
 * 连续梁Echart
 */
// 全程高程偏差 Echart是否已描画（默认未描画）
var isDeltaDeviationInited = false;
// 全程中线偏差 Echart是否已描画（默认未描画）
var isMiddleLineDeviationInited = false;
// 全桥立模标高偏差 Echart是否已描画（默认未描画）
var isElevationDeviationInited = false;
// 全桥梁段错台 Echart是否已描画（默认未描画）
var isCuotaiInited = false;

//错台最大偏差值;
var maxCuotai = 5;
//错台最小偏差值
var minCuotai = -5;


/**
 * 初始化
 */
$(function(){
	
	// 点击偏差测点总数时, 显示全桥偏差超限
	$('#warncount').on('click',function(){
		
		$('.bridge-content ul li').eq(4).addClass('bridge-hover').siblings('li').removeClass('bridge-hover');
		
		$('.bridge-echart>div').eq(4).show().siblings('div').hide();
	})

})

/**
 * 初始化桥梁Echart
 * 
 * @param conBeamId
 */
function initBridgeEchart(projectId, conBeamId) {

	// 全程高程偏差
	if (!isDeltaDeviationInited) {
		
		// Echart描画
		initDeltaDeviation(projectId, conBeamId);
		// 已描画
		isDeltaDeviationInited = true;
	}
	
	/************Tab切换***********************/
	var index = 0;
	var w = $("#bridgecontent").width();
	
	$("#middleLineDeviation,#elevationDeviation,#ldCuoTai").css('width', w);
	
	$('.bridge-content ul li').on('click',function(){

		// Tab样式
		$(this).addClass('bridge-hover').siblings('li').removeClass('bridge-hover');
		
		// 描画区域
		index = $(this).index();
		$('.bridge-echart>div').eq(index).show().siblings('div').hide();
		
		// 全程中线偏差
		if(index == 1){
			
			if (!isMiddleLineDeviationInited) {
				// Echart描画
				initMiddleLineDeviation(projectId, conBeamId);
				// 已描画
				isMiddleLineDeviationInited = true;
			}
		}
		// 全桥立模标高偏差
		if(index == 2){
			
			if (!isElevationDeviationInited) {
				// Echart描画
				initElevationDeviation(projectId, conBeamId);
				// 已描画
				isElevationDeviationInited = true;
			}
		}
		// 全桥梁段错台
		if(index == 3){
			
			if (!isCuotaiInited) {
				// Echart描画
				initCuoTai(conBeamId);
				// 已描画
				isCuotaiInited = true;
			}
		}
		if(index == 4){
			getWarnInfo(conBeamId);
		}
	});
}

/**************************************************************************************************************/
/**
 * 全程高程偏差
 * 
 * @param conbeamID - 连续梁偏差
 */
function initDeltaDeviation(projectId, conbeamID){
	
	// 高程偏差的所有数据
	var warnInfo = [];
	// 梁段横坐标
	var ldXPositionList = [];
	
	// 获取高程偏差的最大临界点和最小临界点(必须同步方式获取)
	var deviationLimit = getDeviationLimit(projectId, DEVIATION_TYPE.HIGH);
	
	var url =basePath+ 'conbeam/getDeltaWarnInfo/' + conbeamID;
	// 获取高程偏差的所有数据(必须同步方式获取)
	$.ajax({
		async: false, // 必须是false, 必须同步方式获取
		type:'POST',
		url: url,
		dataType : 'json',//数据传输格式：json		
		error:function(){	
			return;
		},
		success:function(data){
			
			if (data.code != 0) {
				return "error";
			}
			
			warnInfo = data.result.deltaWarnInfoList;
//			console.log("全程高程偏差");
//			console.log(JSON.stringify(warnInfo));

		}
	});	

	// 梁段横坐标
	// Echart使用数据对象
	var warnInfoEchart = {};

	warnInfoEchart.deviationLimit = deviationLimit;
	
	
	//warnInfoEchart.deviationLimit.MaxMinLimit = getDeviationMaxMin(warnInfo,deviationLimit);

	// 必须先获取横坐标，再获取纵坐标
	// 获取横坐标相关数据
	getXPositionData(warnInfoEchart, warnInfo);
	
	// 获取纵坐标相关数据
	getYPositionData(warnInfoEchart, warnInfo);

	//console.log(warnInfoEchart);
	// 描画Echart
	var canvasId = 'hightDeviation';
	drawEchartDeltaDeviation(canvasId, warnInfoEchart);
	
	
	/*var context = showsggs(conbeamID);
	if(context != null && context != '' && context != "undefined"){
		alert(context);
	}*/
}

//施工告示牌画面表示
/*function showsggs(conbeamid){
	debugger;
	var context = '';
	//处理措施
	var url = "conbeam/showSggsLxl";
	$.ajax({
		async : false,//是否异步
		//cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
		data : {"conbeamid":conbeamid},
		url :url,//请求的action//n路径
		error : function(){
			console.log("服务器异常！");
		},
		success : function (data){
			if(data.userType != null && data.userType == '5'){
				//主跨长度
				var ml = data.sggsList.sggsList.mainkdlength;
				//桥跨组合
				var bs = data.sggsList.sggsList.beamaspan;
				if(ml == null || ml == '' || ml == "undefined"){
					context = context + '主跨长度为空,';
				}
				if(bs == null || bs == '' || bs == "undefined"){
					context = context + '桥跨组合为空,';
				}
				if(context != ''){
					context = context + '请在施工告示牌填写.';
				}
			}
		}
	})
	return context;
}*/

/**************************************************************************************************************/
/**
 * 全桥中线偏差
 */
function initMiddleLineDeviation(projectId, conBeamId){
	
	// 中线偏差的所有数据
	var warnInfo = [];
	// 梁段横坐标
	var ldXPositionList = [];

	// 获取中线偏差的最大临界点和最小临界点(必须同步方式获取)
	var deviationLimit = getDeviationLimit(projectId, DEVIATION_TYPE.MIDDLE);	
	
	var url = basePath+'conbeam/getOutlWarnInfo/' + conBeamId; 
	// 获取中线偏差的所有数据(必须同步方式获取)
	$.ajax({
		async: false, // 必须是false, 必须同步方式获取
		type:'POST',
		url: url,
		dataType : 'json',//数据传输格式：json		
		error:function(){
			return;
		},
		success:function(data){
			if (data.code != 0) {
				return "error";
			}
			
			warnInfo = data.result.outlWarnInfoList;
//			console.log("全桥中线偏差");
//			console.log(JSON.stringify(warnInfo));
		}
	});
	
	
	// 上述方法都是同步获取数据，所以可以在获取完同步执行下面方法

	// Echart使用数据对象
	var warnInfoEchart = {};
	
	// 偏差的临界点
	warnInfoEchart.deviationLimit = deviationLimit;
	//warnInfoEchart.deviationLimit.MaxMinLimit = getDeviationMaxMin(warnInfo,deviationLimit);
	// 必须先获取横坐标，再获取纵坐标
	// 获取横坐标相关数据
	getXPositionData(warnInfoEchart, warnInfo);
	// 获取中线偏差纵坐标相关数据
	getYPositionDataMiddleLine(warnInfoEchart, warnInfo);

	// 描画Echart
	var canvasId = 'middleLineDeviation';
	drawEchartMiddleLineDeviation(canvasId, warnInfoEchart);
}

/**************************************************************************************************************/
/**
 * 全桥立模标高偏差
 */
function initElevationDeviation(projectId, conBeamId){
	
	// 立模标高偏差的所有数据
	var warnInfo = [];
	// 梁段横坐标
	var ldXPositionList = [];

	// 获取立模标高偏差的最大临界点和最小临界点(必须同步方式获取)
	var deviationLimit = getDeviationLimit(projectId, DEVIATION_TYPE.VERTICAL);
	
	var url = basePath+'conbeam/getLmbgWarnInfo/' + conBeamId;
	// 获取立模标高偏差的所有数据(必须同步方式获取)
	$.ajax({
		async: false, // 必须是false, 必须同步方式获取
		type:'POST',
		url: url,
		dataType : 'json',//数据传输格式：json		
		error:function(){
			return;
		},
		success:function(data){
			if (data.code != 0) {
				return "error";
			}
			
			// 立模标高偏差
			warnInfo = data.result.lmbgWarnInfoList;
//			console.log("立模标高偏差");
//			console.log(JSON.stringify(warnInfo));
		}
	});

	// 上述方法都是同步获取数据，所以可以在获取完同步执行下面方法
	
	// Echart使用数据对象
	var warnInfoEchart = {};
	
	// 偏差的临界点
	warnInfoEchart.deviationLimit = deviationLimit;
	//warnInfoEchart.deviationLimit.MaxMinLimit = getDeviationMaxMin(warnInfo,deviationLimit);
	// 必须先获取横坐标，再获取纵坐标
	// 获取横坐标相关数据
	getXPositionData(warnInfoEchart, warnInfo);
	// 获取纵坐标相关数据
	getYPositionData(warnInfoEchart, warnInfo);

//	console.log(warnInfoEchart);
	// 描画Echart
	var canvasId = 'elevationDeviation';
	drawEchartElevationDeviation(canvasId, warnInfoEchart);
}

/**********************************************************************************/
/**
 * 全桥梁段错台
 */
function initCuoTai(conBeamId){
	
	// 错台的所有数据
	var warnInfo = [];
	// 梁段横坐标
	var ldXPositionList = [];
	
	var ldXList = [];
	var url =basePath+'conbeam/getLdctInfo/' + conBeamId;
	// 获取梁段错台的所有数据(必须同步方式获取)
	$.ajax({
		async: false, // 必须是false, 必须同步方式获取
		type:'POST',
		url: url,
		dataType : 'json',//数据传输格式：json		
		error:function(){
			return;
		},
		success:function(data){
			if (data.code != 0) {
				return "error";
			}
			// 全桥梁段错台均值
			warnInfo = data.result.ldctWarnInfoList;
//			console.log("全桥梁段错台");
//			console.log(JSON.stringify(warnInfo));
		}
	});

	// 上述方法都是同步获取数据，所以可以在获取完同步执行下面方法

	// Echart使用数据对象
	var warnInfoEchart = {};

	// 必须先获取横坐标，再获取纵坐标
	// 获取横坐标相关数据
	
	getXPositionData(warnInfoEchart, warnInfo, true);
	// 获取纵坐标相关数据
	getYPositionDataCuoTai(warnInfoEchart, warnInfo);

//	console.log(warnInfoEchart);
	// 描画Echart
	var canvasId = 'ldCuoTai';
	drawEchartCuoTai(canvasId, warnInfoEchart);
}


/**
 * 求最大与最小临界值
 * 
 * */

//function getDeviationMaxMin(warnInfo,deviationLimit){
//	
//	var limitMaxMin ={};
//	var limitMax = 0;
//	var limitMin = 0;
//	//声明一个数组
//	
//	var allPczList = new Array();
//	
//	for(var i = 0;i<warnInfo.length;i++){
//		
//		//将偏差值全部放入数组中
//		allPczList.push(warnInfo[i].pcz);
//	}
//	
//	//求数组中最大偏差值
//	var maxN ;
//	//求数组中最小偏差值
//	var minN;
//	
//	maxN = Math.max.apply(Math,allPczList);
//	
//	minN = Math.min.apply(Math,allPczList);
//	
//	var limitUpper = deviationLimit.limitUpper;
//	var limitLower = deviationLimit.limitLower;
//	
//	if (2*limitUpper < maxN){
//		limitMaxMin.limitMax = maxN;
//		
//	}else{
//		limitMaxMin.limitMax = 0;
//	}
//	
//	if(2*limitLower > minN){
//		limitMaxMin.limitMin = minN;
//	}else{
//		limitMaxMin.limitMin = 0;
//	}
//	
//	
//	if(2*limitUpper < maxN && 2*limitLower > minN){
//		limitMaxMin.code = 1;
//	}else if(2*limitUpper < maxN&& 2*limitLower < minN){
//		limitMaxMin.code = 2;
//	}else if(2*limitUpper > maxN&& 2*limitLower > minN){
//		limitMaxMin.code = 3;
//	}else{
//		limitMaxMin.code = 0;
//	}
//	
//	return limitMaxMin
//	
//}





/**
 * 获取横坐标相关数据
 *	 横坐标显示文字(梁段号)
 *	 横坐标显示文字(边合 中合)
 *	 横坐标标识ID(内部处理用)
 * 
 * @param warnInfoEchart - Echart描画用数据对象
 */
function getXPositionData(warnInfoEchart, warnInfo, isCuoTai){

	
	// 内部处理用横坐标标识ID
	warnInfoEchart.xIdList = new Array();
	// 横坐标显示文字(梁段号)
	warnInfoEchart.shortNameList = new Array();
	// 横坐标对应的梁段其它信息
	warnInfoEchart.xInfoList = new Array();
	// 根据梁段的数目判断x轴的坐标的间隔
	warnInfoEchart.dataXLd = new Array();

	// 横坐标（0号块和直线段为大小里程两个坐标，直接在JS中生成两个坐标）
	var pierSeqList = new Array();
	for (var i = 0, len = warnInfo.length; i < len; i++) {
		
		var item = warnInfo[i];
		
		// 墩号_SEQ
		var pierSeq = item.pier + "_" + item.seq;
		
		// 如果已处理的墩号_SEQ列表中已存在，则不处理
		if ($.inArray(pierSeq, pierSeqList) !== -1) {
			continue;
		}

		var xId = "";
		var text = "";
		// 直线段
		if (LD_TYPE.BKFDC == item.ldtype) {

			// 小里程坐标和显示名称
			xId = getXId(item, MILEAGE_FLAG.SMALL);
			text = '直(小)';
			// 横坐标标识ID
			warnInfoEchart.xIdList.push(xId);
			// 显示名称
			warnInfoEchart.shortNameList.push(text);

			if (isCuoTai) {
				var xInfo = {};
				// 梁段类型
				xInfo.ldtype = item.ldtype;
				// SEQ
				xInfo.seq = item.seq;
				// ShortName
				xInfo.shortname = text;
				// 大小里程
				xInfo.mileageflag = MILEAGE_FLAG.SMALL;
				// 添加到横坐标对应的梁段信息中
				warnInfoEchart.xInfoList.push(xInfo);
			}
			
			// 大里程坐标和显示名称
			xId = getXId(item, MILEAGE_FLAG.BIG);
			text = '直(大)';
			// 横坐标标识ID
			warnInfoEchart.xIdList.push(xId);
			// 显示名称
			warnInfoEchart.shortNameList.push(text);

			if (isCuoTai) {
				var xInfo = {};
				// 梁段类型
				xInfo.ldtype = item.ldtype;
				// SEQ
				xInfo.seq = item.seq;
				// ShortName
				xInfo.shortname = text;
				// 大小里程
				xInfo.mileageflag = MILEAGE_FLAG.BIG;
				// 添加到横坐标对应的梁段信息中
				warnInfoEchart.xInfoList.push(xInfo);
			}
		}
		// 0号块
		else if (LD_TYPE.ZERO == item.ldtype) {
		
			// 小里程坐标和显示名称
			xId = getXId(item, MILEAGE_FLAG.SMALL);
			text = getZeroText(item, MILEAGE_FLAG.SMALL);
			// 横坐标标识ID
			warnInfoEchart.xIdList.push(xId);
			// 显示名称
			warnInfoEchart.shortNameList.push(text);

			if (isCuoTai) {
				var xInfo = {};
				// 梁段类型
				xInfo.ldtype = item.ldtype;
				// SEQ
				xInfo.seq = item.seq;
				// ShortName
				xInfo.shortname = getShortName(item);
				// 大小里程
				xInfo.mileageflag = MILEAGE_FLAG.SMALL;
				// 添加到横坐标对应的梁段信息中
				warnInfoEchart.xInfoList.push(xInfo);
			}

			// 大里程坐标和显示名称
			xId = getXId(item, MILEAGE_FLAG.BIG);
			text = getZeroText(item, MILEAGE_FLAG.BIG);
			
			// 横坐标标识ID
			warnInfoEchart.xIdList.push(xId);
			// 显示名称
			warnInfoEchart.shortNameList.push(text);

			if (isCuoTai) {
				var xInfo = {};
				// 梁段类型
				xInfo.ldtype = item.ldtype;
				// SEQ
				xInfo.seq = item.seq;
				// ShortName
				xInfo.shortname = getShortName(item);
				// 大小里程
				xInfo.mileageflag = MILEAGE_FLAG.BIG;
				// 添加到横坐标对应的梁段信息中
				warnInfoEchart.xInfoList.push(xInfo);
			}
		}
		// 普通梁段
		else {

			// 坐标和显示名称
			xId = getXId(item, item.mileageflag);
			text = item.shortname;

			// 横坐标标识ID
			warnInfoEchart.xIdList.push(xId);
			// 显示名称
			warnInfoEchart.shortNameList.push(text);

			if (isCuoTai) {
				var xInfo = {};
				// 梁段类型
				xInfo.ldtype = item.ldtype;
				// SEQ
				xInfo.seq = item.seq;
				// ShortName
				xInfo.shortname = text;
				// 大小里程
				xInfo.mileageflag = item.mileageflag;
				// 添加到横坐标对应的梁段信息中
				warnInfoEchart.xInfoList.push(xInfo);
			}
		}
		
		// 则保存已处理的墩号_SEQ
		if ($.inArray(pierSeq, pierSeqList) == -1) {

			pierSeqList.push(pierSeq);
		}
	
	}
	
//	console.log(warnInfoEchart.xInfoList);
	
	//判断横坐标数量确定间隔数
	var shortNameList = warnInfoEchart.shortNameList;
	if(shortNameList.length < 30){
		
		for (var i = 0,len = shortNameList.length; i < len; i++){
					
			var item = shortNameList[i];
			
			warnInfoEchart.dataXLd.push(item);
		}
	} else if (30 < shortNameList.length && shortNameList.length <= 50){
		
		for (var i = 0,len = shortNameList.length; i < len; i++){
				
			var item = shortNameList[i];
			
			if(item.indexOf('直') >=0 || item.indexOf('#') >= 0 || item.indexOf('合') >= 0 ){
				warnInfoEchart.dataXLd.push(item);
			}else{
				if(i % 2 == 1){
					warnInfoEchart.dataXLd.push('');
				}else{
					warnInfoEchart.dataXLd.push(item);
				}
			}
		}
	} else if (50 < shortNameList.length && shortNameList.length <= 80){
		
		for (var i = 0,len = shortNameList.length; i < len; i++){
			
			var item = shortNameList[i];
			
			if(item.indexOf('直') >=0 || item.indexOf('#') >= 0 || item.indexOf('合') >= 0 ){
				warnInfoEchart.dataXLd.push(item);
			}else{
				if(i % 3 != 0){
					warnInfoEchart.dataXLd.push('');
				}else{
					warnInfoEchart.dataXLd.push(item);
				}
			}
		}
	} else if (80 < shortNameList.length && shortNameList.length <= 120){
		
		for (var i = 0,len = shortNameList.length; i < len; i++){
			
			var item = shortNameList[i];
			
			if(item.indexOf('直') >=0 || item.indexOf('#') >= 0 || item.indexOf('合') >= 0){
				warnInfoEchart.dataXLd.push(item);
			}else{
				if(i % 4 != 0){
					warnInfoEchart.dataXLd.push('');
				}else{
					warnInfoEchart.dataXLd.push(item);
				}
			}
		}
	} else if (shortNameList.length > 120){
		
		for (var i = 0,len = shortNameList.length; i < len; i++){
			
			var item = shortNameList[i];
			
			if(item.indexOf('直') >=0 || item.indexOf('#') >= 0 || item.indexOf('合') >= 0  ){
				warnInfoEchart.dataXLd.push(item);
			}else{
				if(i % 5 != 0){
					warnInfoEchart.dataXLd.push('');
				}else{
					warnInfoEchart.dataXLd.push(item);
				}
			}
		}
	}
}

/**
 * 获取间隔数
 */
function getXInterval(dataXLd) {

	//分割线的间隔数；
	var splitNum = 0;
	
	//判断横坐标数量确定间隔数
	if(dataXLd.length < 30){
		
		splitNum = 0;
	} else if (30 < dataXLd.length && dataXLd.length <= 50){
		
		splitNum = 1;
	} else if (50 < dataXLd.length && dataXLd.length <= 80){
		
		splitNum = 2;
	} else if (80 < dataXLd.length && dataXLd.length <= 120){
		
		splitNum = 3;
	} else if (dataXLd.length > 120){
		
		splitNum = 4;
	}
	
	return splitNum;
}

/**
 * 获取纵坐标相关数据
 *	 偏差值 最大值最小值
 *	 偏差值 所有值
 *	 无偏差值的数据
 *	 平均偏差的数据
 *	 
 * ****(必须保证Server端过来的偏差数据是按照 墩号-梁段ID-大小里程标志 排好序的)
 * 
 * @param warnInfoEchart - Echart描画用数据对象
 */
function getYPositionData(warnInfoEchart, warnInfo){
	
	// 无偏差值的数据
	warnInfoEchart.pczNoneListEchart = new Array();
	// 平均偏差的数据
	warnInfoEchart.pczAverageListEchart = new Array();

	// 偏差值 最大值最小值
	// {xId : xId, pczMinMax : {min : minPcz, max : maxPcz, pointPlacePczList : pointPlacePczList}};
	var pczMinMaxList = new Array();
	// 偏差值 所有值
	// {xId : xId, pczList : pczList};
	var pczAllList = new Array();
	
	// 根据横坐标标识ID循环
	// (必须保证Server端过来的偏差数据是按照 墩号-梁段ID-大小里程标志 排好序的)
	
	for(var i = 0, len = warnInfoEchart.xIdList.length; i < len; i++) {
		
		var xIdChart = warnInfoEchart.xIdList[i];
		
		// 无偏差值的数据 默认设为 0
		warnInfoEchart.pczNoneListEchart[i] = '0';
		// 平均偏差的数据 默认设为 ''
		warnInfoEchart.pczAverageListEchart[i] = '';

		// 遍历所有数据， 取出X坐标相同的数据
		for (var j = 0, lenData = warnInfo.length; j < lenData; j++) {

			// 横坐标标识ID
			var xId = getXId(warnInfo[j], warnInfo[j].mileageflag);
			
			var kCount = 0;
			// 横坐标标识ID相同的数据
			if (xId == xIdChart) {
				
				// 横坐标对应的所有偏差值
				var pczList = new Array();

				// 测点位置和偏差值信息列表
				var pointPlacePczList = [];
				// 测点位置和偏差值信息对象
				// { pointPlace : 1, pcz : 0.5, iswarn : 0 }
				var pointPlacePczObj = {};

				// 最小值
				var minPcz = PCZ.MIN;
				// 最大值
				var maxPcz = PCZ.MAX;
				// 求和值
				var pczTotal = 0;
				
				// 最大偏差值
				var maxValue = 5* warnInfoEchart.deviationLimit.limitUpper;
				//最小偏差值
				var minValue = 5* warnInfoEchart.deviationLimit.limitLower;
				
				// 取得所有偏差值 最大值最小值 及平均偏差值计算用和
				// (必须保证Server端过来的偏差数据是按照 墩号-SEQ 排好序的)
				for (var k = j, lenX = warnInfo.length; k < lenX; k++) {

					// 比较用
					var xIdTmp = getXId(warnInfo[k], warnInfo[k].mileageflag);
					
					// 横坐标标识ID相同的数据
					if (xId == xIdTmp) {
	
						var pczTmp = warnInfo[k].pcz;
						//console.log(warnInfo[k])
					
						if (pczTmp) {
							
							var pzcCompare = parseFloat(pczTmp);
							//判断是否超出最大值
							if(pzcCompare < maxValue && minValue < pzcCompare){
								// 最大值
								if (maxPcz < pzcCompare) { maxPcz = pzcCompare; };
								// 最小值
								if (minPcz > pzcCompare) { minPcz = pzcCompare; };
								
								// 偏差值求和 : 平均偏差值计算用
								pczTotal = pczTotal + pzcCompare;
								// 所有偏差值
								pczList.push(pzcCompare);
								
							}else if(pzcCompare > maxValue || pzcCompare < minValue){
								
								pzcCompare = '异常';
								
								pczTotal = pczTotal;
							}
							
//							// 偏差值求和 : 平均偏差值计算用
//							pczTotal = pczTotal + pzcCompare;
//							// 所有偏差值
//							pczList.push(pzcCompare);
							
							// 测点位置和偏差值信息对象
							// { pointPlace : 1, pcz : 0.5, iswarn : 0 }
							pointPlacePczObj = { pointPlace : warnInfo[k].pointplace, pcz : pzcCompare, iswarn : warnInfo[k].iswarn };
//							console.log(pointPlacePczObj);
							// 保存到测点位置和偏差值信息列表
							pointPlacePczList.push(pointPlacePczObj);
						}
						// 为了跳过已处理元素
						kCount++;
					} else {
						break;
					}
					
				}
				
				var shortName = getShortName(warnInfo[j]);
				minPcz = minPcz == PCZ.MIN ? undefined : minPcz;
				maxPcz = maxPcz == PCZ.MAX ? undefined : maxPcz;
				
				// 保存横坐标对应的偏差值的最大值最小值
				var pczMinMax = {min : minPcz, max : maxPcz, pointPlacePczList : pointPlacePczList, pier : warnInfo[j].pier,ldName : shortName};
				var pczMinMaxObj = {xId : xId, pczMinMax : pczMinMax };
				
				// 保存到最终画图对象中
				pczMinMaxList.push(pczMinMaxObj);
				
				// 保存横坐标对应的所有偏差值
				var pczListObj = {xId : xId, pczList : pczList};
				// 保存到最终画图对象中
				pczAllList.push(pczListObj);
				// 有偏差值的数据
				if (pczList.length >= 1) {

					// 无偏差值的数据
					warnInfoEchart.pczNoneListEchart[i] = '';

					// 平均偏差值
					var pcaAverage = '' + (pczTotal / pczList.length)
					warnInfoEchart.pczAverageListEchart[i] = pcaAverage;
				}
				// 没有偏差值的数据
				else {
					
					// 无偏差值的数据
					warnInfoEchart.pczNoneListEchart[i] = '0';

					// 平均偏差值
					warnInfoEchart.pczAverageListEchart[i] = '';
				}
			}
			
			j = j + kCount;
		}
	}
		
	// ********************************************************************************************************
	// 将整理后的偏差值的最大值最小值转换为Echart用的数据
	var pczMinMaxListEchart = new Array();
	for (var i = 0, len = warnInfoEchart.xIdList.length; i < len; i++) {
	
		// 横坐标标识ID
		var itemId = warnInfoEchart.xIdList[i];
		
		// 查找到横坐标标识ID相同的最大值最小值的偏差信息
		for(var j = 0, lenMinMax = pczMinMaxList.length; j < lenMinMax; j++) {
			
			// 最大值最小值的偏差信息的元素
			var itemMinMaxInfo = pczMinMaxList[j];
			//console.log(itemMinMaxInfo)
			var minMaxInfo = itemMinMaxInfo.pczMinMax;
			// 横坐标标识ID相同的数据
			if (itemMinMaxInfo.xId == itemId) {
			
				var itemMinMax = itemMinMaxInfo.pczMinMax;
//				console.log(itemMinMax)

				var minMax = new Array();
				if (itemMinMax) {
					// 有最大值最小值
					if (itemMinMax.min != undefined && itemMinMax.max != undefined) {
						
						// 转换为Echart对象
						// xId属性为了查看用,Echart中不使用.
						var minEchart = {coord: [i, itemMinMax.min], symbol: 'none'};
						// itemMinMax属性为了弹窗的测量点数据显示用
						var maxEchart = {coord: [i, itemMinMax.max], symbol: 'none', pointPlacePczList : itemMinMax.pointPlacePczList, pier : itemMinMax.pier,ldName : itemMinMax.ldName,};
						
						// 添加到Echart最大值最小值配对数组
						minMax.push(minEchart);
						minMax.push(maxEchart);
						
					}
					
				}
				// 添加到Echart对象数组
				if (minMax.length > 0) {
					pczMinMaxListEchart.push(minMax);
				}
					//console.log(pczMinMaxListEchart)
				// 一对一的关系,找到一次即可break;
				break;
			}
		}
	}
	// 追加到Echart描画用数据对象中
	warnInfoEchart.pczMinMaxListEchart = pczMinMaxListEchart;

	// ********************************************************************************************************
	// 将整理后的所有偏差值转换为Echart用的数据
	var pczAllListEchart = new Array();
	
	for (var i = 0, len = warnInfoEchart.xIdList.length; i < len; i++) {

		// 横坐标标识ID
		var itemId = warnInfoEchart.xIdList[i];
		
		// 查找到横坐标标识ID相同的的偏差信息
		for(var j = 0, lenAll = pczAllList.length; j < lenAll; j++) {
			
			// 所有偏差信息的元素
			var itemAll = pczAllList[j];

			// 横坐标标识ID相同的数据
			if (itemAll.xId == itemId && itemAll.pczList && itemAll.pczList.length > 0) {
				
				var pczTmpList = itemAll.pczList;
				for (var k = 0, lenPcz = pczTmpList.length; k < lenPcz; k++) {
			
					// 坐标点(一对横纵坐标)数组
					// 横坐标下标(0 1 2 ...)
					// 纵坐标(偏差值)
					var pointObj = [i, pczTmpList[k]];
					
					pczAllListEchart.push(pointObj);
				}

				// 一对一的关系,找到一次即可break;
				break;
			}
		}
	}
	// 追加到Echart描画用数据对象中
	warnInfoEchart.pczAllListEchart = pczAllListEchart;
	
	// ********************************************************************************************************
	// 补齐后端无数据连线
	for(var i = 0, len = warnInfoEchart.pczAverageListEchart.length; i < len - 1; i++) {
		
		var pcaAll = warnInfoEchart.pczAverageListEchart[i];
		var pcaAllNext = warnInfoEchart.pczAverageListEchart[i + 1];
		
		if (pcaAll != '' && pcaAllNext == '') {
			warnInfoEchart.pczNoneListEchart[i] = '';
		}
	}

	// 补齐前端无数据连线
	for(var i = warnInfoEchart.pczAverageListEchart.length, end = 0; i > end + 1; i--) {
		
		var pcaAll = warnInfoEchart.pczAverageListEchart[i];
		var pcaAllPrevious = warnInfoEchart.pczAverageListEchart[i - 1];
		
		if (pcaAll != '' && pcaAllPrevious == '') {
			warnInfoEchart.pczNoneListEchart[i] = '';
		}
	}
}

/**
 * 获取中线偏差纵坐标相关数据
 *	 偏差值 所有值
 *	 无偏差值的数据
 * 
 * @param warnInfoEchart - Echart描画用数据对象
 */
function getYPositionDataMiddleLine(warnInfoEchart, warnInfo){
	
	// 无偏差值的数据
	warnInfoEchart.pczNoneListEchart = new Array();
	// 偏差值 所有值
	warnInfoEchart.pczAllListEchart = new Array();
	
	var middleObjArray = new Array();
	// 根据横坐标标识ID循环(必须保证Server过来的数据已经按照 墩号（pier） 排好序)
	for(var i = 0, len = warnInfoEchart.xIdList.length; i < len; i++) {
		
		var xIdChart = warnInfoEchart.xIdList[i];

		// 无偏差值的数据 默认设为 0
		warnInfoEchart.pczNoneListEchart[i] = '0';
		// 所有偏差值的数据 默认设为 ''
		warnInfoEchart.pczAllListEchart[i] = '';
		
		
		// 遍历所有数据， 取出X坐标相同的数据
		for (var j = 0, lenData = warnInfo.length; j < lenData; j++) {
	
			// 横坐标标识ID
			var xId = getXId(warnInfo[j], warnInfo[j].mileageflag);
			
			var item = warnInfo[j];
			
			var middleLdName;
			
			
			var middlePier = warnInfo[j].pier;
//			var middleLdName =  warnInfo[j].shortname;
			// 偏差值
			var pcz = warnInfo[j].pcz;
			var maxEchart = {};

			
			// 横坐标标识ID相同的数据
			// (必须保证Server端过来的偏差数据是按照 墩号-梁段ID-大小里程标志 排好序的)
			if (xId == xIdChart) {
				var middleObj = new Array();
			
				if (pcz != null) {
					
					var shortName = getShortName(item);
					middleLdName = shortName;

					warnInfoEchart.pczNoneListEchart[i] = '';
					warnInfoEchart.pczAllListEchart[i] = pcz;
					
					//测量点数据显示用,将数据转化成echart数据;
					var	minEchart = {coord:[j+2,pcz],symbol: 'circle'};
					 maxEchart = { pier : middlePier,ldName : middleLdName,pcz:pcz, coord:[j+2,pcz],symbol: 'circle'};
					 middleObj.push(minEchart);
					 middleObj.push(maxEchart);
					
					
				} else {

					warnInfoEchart.pczNoneListEchart[i] = '0';
					warnInfoEchart.pczAllListEchart[i] = '';
				}
				
				if(middleObj.length>0){
					middleObjArray.push(middleObj);
					
				}
				break;
								
			}
						
			
		}
		
	}
	warnInfoEchart.middleObj = middleObjArray;
	// ********************************************************************************************************
	// 补齐后端无数据连线
	for(var i = 0, len = warnInfoEchart.pczAllListEchart.length; i < len - 1; i++) {
		
		var pcaAll = warnInfoEchart.pczAllListEchart[i];
		var pcaAllNext = warnInfoEchart.pczAllListEchart[i + 1];
		
		if (pcaAll != '' && pcaAllNext == '') {
			warnInfoEchart.pczNoneListEchart[i] = '';
		}
	}

	// 补齐前端无数据连线
	for(var i = warnInfoEchart.pczAllListEchart.length, end = 0; i > end + 1; i--) {
		
		var pcaAll = warnInfoEchart.pczAllListEchart[i];
		var pcaAllPrevious = warnInfoEchart.pczAllListEchart[i - 1];
		
		if (pcaAll != '' && pcaAllPrevious == '') {
			warnInfoEchart.pczNoneListEchart[i] = '';
		}
	}
}

/**
 * 获取全桥梁段错台纵坐标相关数据
 * 
 * @param warnInfoEchart
 * @param warnInfo
 */
function getYPositionDataCuoTai(warnInfoEchart, warnInfo) {

	// 偏差值信息
	var averagePczList = [];
	var minPcz =  minCuotai;				 //PCZ.MIN;
	var maxPcz =  maxCuotai;				 //PCZ.MAX;
	
	// 根据横坐标标识ID循环(必须保证Server过来的数据已经按照 墩号（pier） 排好序)
	for(var i = 0, len = warnInfoEchart.xIdList.length; i < len; i++) {
		
		var xIdChart = warnInfoEchart.xIdList[i];
		
		var nonePcz = '0'; 
		var averagePcz = '';

		var averagePczObj = {};
		// 错台信息/初始值
		averagePczObj =
			{
				xPos : i,												// 横坐标位置
				ldtype : warnInfoEchart.xInfoList[i].ldtype,			// 梁段类型
				seq : warnInfoEchart.xInfoList[i].seq,					// SEQ
				mileageflag : warnInfoEchart.xInfoList[i].mileageflag,	// 默认为无测量数据的里程标志
				shortname : warnInfoEchart.xInfoList[i].shortname,
				nonePcz : '',
				averagePcz : ''
			};
		averagePczList[i] = averagePczObj;
		
		// 遍历所有数据， 取出X坐标相同的数据
		for (var j = 0, lenData = warnInfo.length; j < lenData; j++) {
	
			// 横坐标标识ID
			var xId = getXId(warnInfo[j], warnInfo[j].mileageflag);

			var kCount = 0;
			// 横坐标标识ID相同的数据(必须保证Server过来的数据已经按照 墩号-SEQ-里程标志(测点) 排好序)
			if (xId == xIdChart) {
	
				var pczList = new Array();
				// 求和值
				var pczTotal = 0;
				
				// 取得所有偏差值 及平均偏差值计算用和
				for (var k = j, lenX = warnInfo.length; k < lenX; k++) {
					
					// 比较用
					var xIdTmp = getXId(warnInfo[k], warnInfo[k].mileageflag);
					// X坐标相同的数据(必须保证Server过来的数据已经按照 pier partid 排好序)
					if (xId == xIdTmp) {
	
						var pczTmp = warnInfo[k].pcz;
						if (pczTmp) {
							
							var pcz = parseFloat(pczTmp);

							// 偏差值求和 : 平均偏差值计算用
							pczTotal = pczTotal + pcz;
							// 所有偏差值
							pczList.push(pcz);
						}
						// 为了跳过已处理元素
						kCount++;
					} else {
						break;
					}
				}
				// 有偏差值的数据
				if (pczList.length >= 1) {
					
					// 无偏差值的数据
					nonePcz = '';
					// 平均偏差值
					var pczAverage = (pczTotal / pczList.length);

					// 最小平均偏差值
					if (minPcz > pczAverage) { minPcz = pczAverage ;}
					// 最大平均偏差值
					if (maxPcz < pczAverage) { maxPcz = pczAverage ;}
					
					averagePcz = '' + pczAverage;
				}
				// 没有偏差值的数据
				else {

					// 没有偏差值的数据
					nonePcz = '0';
					// 平均偏差值
					averagePcz = '';
				}

				// 偏差值
				averagePczObj.averagePcz = averagePcz;
				averagePczList[i] = averagePczObj;
				
			}
			
			// 为了跳过已处理错台
			j = j + kCount;
		}
	}

	var diffInfoList = [];
	// 转换为Echart描画用数据
	
	for (var i = 0, len = averagePczList.length; i < len - 1; i++) {
		//当前有偏差值的对象
		var item = averagePczList[i];
		//下一个有偏差值的对象
		var itemNext = averagePczList[i + 1];
		//当前两个有偏差值的对象
		var isCurrentNextHasValue = (item.averagePcz != '' && itemNext.averagePcz != '');
		
		// 0号块(小里程)的处理
		if (LD_TYPE.ZERO == item.ldtype && MILEAGE_FLAG.SMALL  == item.mileageflag) {

			var diffInfo = {};
			diffInfo.value = item.averagePcz;
			diffInfoList[item.xPos] = diffInfo;
		}
		
		// 直线段(大里程)
		else if (LD_TYPE.BKFDC == item.ldtype) {

			var diffInfo = {};
			diffInfo.value = item.averagePcz;
			if (!diffInfoList[item.xPos]) {
				
				diffInfoList[item.xPos] = diffInfo;
				
				
			}
			// 后一横坐标对应梁段为普通梁段
			if (LD_TYPE.XBJZ == itemNext.ldtype && isCurrentNextHasValue) {

				diffValue = item.averagePcz - itemNext.averagePcz;
				diffValue = diffValue.toFixed(2);
				diffInfo.lable = item.shortname + '梁段与' + itemNext.shortname + '梁段的错台为' + diffValue + 'mm';
				diffInfoList[item.xPos] = diffInfo;
				
			}
		
			// 后一横坐标对应梁段为边合
			if (LD_TYPE.BKHL == itemNext.ldtype && isCurrentNextHasValue) {

				diffValue = item.averagePcz - itemNext.averagePcz;
				diffValue = diffValue.toFixed(2);
				diffInfo.lable = item.shortname + '梁段与' + itemNext.shortname + '的错台为' + diffValue + 'mm';
				diffInfoList[item.xPos] = diffInfo;
			}
		}
		
		// 后一横坐标对应梁段为直线段
		else if (LD_TYPE.BKFDC == itemNext.ldtype) {

			var diffInfo = {};
			diffInfo.value = itemNext.averagePcz;
			diffInfoList[itemNext.xPos] = diffInfo;
			
			// 当前梁段为边合
			if (LD_TYPE.BKHL == item.ldtype && isCurrentNextHasValue) {

				diffValue = itemNext.averagePcz - item.averagePcz;
				diffValue = diffValue.toFixed(2);
				diffInfo.lable = itemNext.shortname + '梁段与' + item.shortname + '的错台为' + diffValue + 'mm';
				diffInfoList[itemNext.xPos] = diffInfo;
			}
			// 当前梁段为普通梁段
			if (LD_TYPE.XBJZ == item.ldtype && isCurrentNextHasValue) {

				diffValue = itemNext.averagePcz - item.averagePcz;
				diffValue = diffValue.toFixed(2);
				diffInfo.lable = itemNext.shortname + '梁段与' + item.shortname + '梁段的错台为' + diffValue + 'mm';
				diffInfoList[itemNext.xPos] = diffInfo;
			}
		}
		// 小里程
		else if (MILEAGE_FLAG.SMALL  == item.mileageflag) {

			var diffInfo = {};
			diffInfo.value = itemNext.averagePcz;
			diffInfoList[itemNext.xPos] = diffInfo;
			
			// 中合
			if (LD_TYPE.ZKHL == item.ldtype && isCurrentNextHasValue) {
				
				var diffInfo = {};
				diffValue = item.averagePcz - itemNext.averagePcz;
				diffValue = diffValue.toFixed(2);
				diffInfo.value = item.averagePcz;
				diffInfo.lable = item.shortname + '梁段与' + itemNext.shortname + '梁段的错台为' + diffValue + 'mm';
				diffInfoList[item.xPos] = diffInfo;
			}
			// 当前梁段有平均偏差值
			else if (isCurrentNextHasValue) {
				
				// 后一横坐标对应梁段有平均偏差值
				// 后一横坐标对应梁段 不是大里程
				if (MILEAGE_FLAG.BIG != itemNext.mileageflag) {
					
					var diffInfo = {};
					diffValue = item.averagePcz - itemNext.averagePcz;
					diffValue = diffValue.toFixed(2);
					diffInfo.value = item.averagePcz;
					diffInfo.lable = item.shortname + '梁段与' + itemNext.shortname + '梁段的错台为' + diffValue + 'mm';
					diffInfoList[item.xPos] = diffInfo;
				}
			}
		}
		// 大里程(后一横坐标对应梁段不是直线段)
		else if (MILEAGE_FLAG.BIG  == item.mileageflag && LD_TYPE.BKFDC != itemNext.ldtype) {

			// 0号块大里程
			if (LD_TYPE.ZERO == item.ldtype) {

				var diffInfo = {};
				diffInfo.value = item.averagePcz;
				diffInfoList[item.xPos] = diffInfo;
			}
			
			// 当前梁段有平均偏差值
			if (isCurrentNextHasValue) {

				var diffInfo = {};
				// 后一横坐标对应梁段有平均偏差值
				diffValue = itemNext.averagePcz - item.averagePcz;
				diffValue = diffValue.toFixed(2);
				diffInfo.value = itemNext.averagePcz;
				diffInfo.lable = itemNext.shortname + '梁段与' + item.shortname + '梁段的错台为' + diffValue + 'mm';

				diffInfoList[itemNext.xPos] = diffInfo;
			}
		}
		
		// 最后的横坐标
		if (i == len - 2) {

			var diffInfo = {};
			diffInfo.value = itemNext.averagePcz;
			diffInfoList[itemNext.xPos] = diffInfo;
		}
	}
	
//	minPcz == PCZ.MIN ? 0 : minPcz
//	maxPcz == PCZ.MAX ? 0 : maxPcz;
//	if (minPcz > 0 && maxPcz > 0) { minPcz = 0; }
//	if (minPcz < 0 && maxPcz < 0) { maxPcz = 0; }
//	if (Math.abs(minPcz) == Math.abs(PCZ.MIN)) { minPcz = -1; }
//	if (Math.abs(maxPcz) == Math.abs(PCZ.MAX)) { maxPcz = 1; }
	
	//判断当最小偏差值为-5时，需要向下减1，避免与极限偏差的y值重复
	if(minPcz == -5){
		minPcz = -6;
	}
	//判断当最大偏差值为5时，需要向上加1，避免与极限偏差的y值重复
	if(maxPcz == 5){
		maxPcz = 6
	}
	
	minPcz = minPcz.toFixed(2);
	maxPcz = maxPcz.toFixed(2);
	
	
	// 最小平均偏差值
	warnInfoEchart.minAveragePcz = minPcz;
	// 最大平均偏差值
	warnInfoEchart.maxAveragePcz = maxPcz;
	// 高差
	warnInfoEchart.diffInfoList = diffInfoList;
}

/**
 * 全程高程偏差Echart描画
 * 
 * @param canvasId - 画布ID
 * @param warnInfoEchart - Echart描画用数据对象
 */
function drawEchartDeltaDeviation(canvasId, warnInfoEchart) {

	// 高程偏差的最大临界点
	var limitUpper = warnInfoEchart.deviationLimit.limitUpper;
	// 高程偏差的最小临界点
	var limitLower = warnInfoEchart.deviationLimit.limitLower;
	
	//y轴最大值
	var maxLimit = 5 * limitUpper;
	//y轴最小值
	var minLimit = 5 * limitLower;
	
	//判断极限偏差是否同为正直或者同为负值
	if (limitUpper > 0 && limitLower > 0){
		minLimit = 0;
	}else if (limitUpper < 0 && limitLower < 0){
		maxLimit = 0;
	}
	
	
	// 横坐标(梁段号)
	var dataXLd = warnInfoEchart.dataXLd;
	
	//分割线的间隔数；
	var splitNum = getXInterval(dataXLd);
	
	// 横坐标显示文字(边合 中合)
	//var markListEchart = warnInfoEchart.markList;
	// 描画用偏差值的最大值最小值
	var pczMinMaxListEchart = warnInfoEchart.pczMinMaxListEchart;
	//console.log(pczMinMaxListEchart)
	
	// 描画用所有偏差值
	var pczAllListEchart = warnInfoEchart.pczAllListEchart;
	//console.log(pczAllListEchart);
	//console.log(pczAllListEchart)
	// 无偏差值的数据
	var nonePczListEchart = warnInfoEchart.pczNoneListEchart;
	// 平均偏差值
	var averagePczListEchart = warnInfoEchart.pczAverageListEchart;
	
	// 画布
	var myChart = echarts.init(document.getElementById(canvasId));
	
	

	// Echart最大值最小值连线
	var markLineOpt={		
		animation: false,
		lineStyle:{
			normal:{
				type:'solid',
				color:'#797979',
				width:3
			},
			emphasis:{
				color:'#0A33F4'
			}
		},
		data:pczMinMaxListEchart
	};

	option = {
		title:{
			text:'全桥高程偏差',
			top:10,
			left:'45%',
			textStyle:{
				fontSize:14,
				color:'#797979'
			}
		},
		color:['#D7D7D7','','#E72B42'],
		legend: {
			data:[
				  {
					  name:'无数据',
					  icon:basePath+'image://static/images/wsj.png'
					
				  },{
	  				name:'平均偏差',
					icon: basePath+'image://static/images/average.png'
				   
				},{
					  name:'极限偏差',
					  icon:basePath+ 'image://static/images/jxpc.png'
			}],
			itemHeight:1,
			right:'15%',
			top: 10
		},
		tooltip: {

			formatter: function (obj) {
//				console.log(obj);
				var pointPlacePczList = obj.data.pointPlacePczList;
//				console.log(pointPlacePczList)
				// 墩号
				var pier = obj.data.pier;
				// 梁段号
				var ldName = obj.data.ldName;
				//console.log(pointPlacePczList+":"+pier+":"+ldName)
				
				// 将五个偏差值放入对应位置，并将超出范围的偏差值字体改变颜色
				var pointVule = {};
				if (pointPlacePczList && pointPlacePczList.length > 0) {
					
					for (var i = 0, len = pointPlacePczList.length; i < len; i++) {

						var item = pointPlacePczList[i];
						
						var iPoint = item.pointPlace;
						var pcz = (item.pcz != null || item.pcz !='' || item.pcz > maxLimit || item.pcz < minLimit) ? item.pcz : "异常";
						
						var iswarn = item.iswarn;
						
						if (iPoint) {
							
							if (pcz != "" && IS_WARN_FLAG.WARN == iswarn) {
	
								pointVule[iPoint] = '<span style="color:red">' + pcz + '</span>';
							}else if('异常' == pcz){
								pointVule[iPoint] = '<span style="color:red">' + pcz + '</span>'
							}else {
	
								pointVule[iPoint] = pcz;
							}
						}
					}
					//console.log(pointVule[1] != undefined ? pointVule[1] : "");
					var pointDivHtml =  '<div style="position:relative;">'
							+ '<p id="pointValue" style="font-size:12px;color:#333;text-align:center;">'
							+ pier
							+ "#"
							+ ldName
							+ '各测点偏差值 '
							+ '</p>'
							+ '<img src = "static/images/pointPic.png">'
							+ '<span id="pointFirst">'
							+ ((pointVule[1] !=null || pointVule[1] !=undefined) ? pointVule[1] : "")
							+ '</span>'
							+ '<span id="pointSecond">'
							+ ((pointVule[2] !=null || pointVule[2] !=undefined) ? pointVule[2] : "")
							+ '</span>'
							+ '<span id="pointThird">'
							+ ((pointVule[3] !=null || pointVule[3] !=undefined) ? pointVule[3] : "")
							+ '</span>'
							+ '<span id="pointFour">'
							+ ((pointVule[4] !=null || pointVule[4] !=undefined) ? pointVule[4] : "")
							+ '</span>'
							+ '<span id="pointFifth">'
							+ ((pointVule[5] !=null || pointVule[5] !=undefined) ? pointVule[5] : "")
							+ '</span>' + '</div>';

					return pointDivHtml;
				}
				
				return;
			},
			backgroundColor: '#D7D7D7'
		},
		grid: {
			containLabel: true,
			width:'90%',
			height:'80%',
			bottom:'5%',
			left:50,
			top:40
		},
		// 梁段横坐标 大里程数据与小里程数据
		xAxis:[
				{
					type: 'category',
					name:'梁段',
					nameLocation:'middle',
					nameGap:30,
					nameTextStyle:{
						color:'#797979',
						fontSize:14
					},
					boundaryGap: false,
					data :dataXLd ,	// 描画数据 梁段
					axisLabel:{
						interval:0,	
						rotate:20,
						textStyle:{
							color:'#797979',
							fontSize:12
						}
					},
					axisTick:{
						show:true,
						alignWithLabel: true
					},
					splitLine:{
						show:true,
						interval:splitNum ,
						lineStyle:{
							opacity:0.3
						}
					},
					axisLine : {
						onZero: false,
						lineStyle:{
							color:"#797979"
						}
					},
			},

			],
		// 极限偏差(最大值 最小值)
		yAxis: [
			{
				type : 'value',
				name:'高程偏差(mm)',
				min : minLimit,		 			// 描画数据  最大值 最小临界点 * 2
				max : maxLimit,			// 描画数据  最小值 最大临界点 * 2
				splitNumber:1,
				nameLocation:'middle',
				nameGap:45,
				nameTextStyle:{						
					color:'#797979',
					fontSize:14
				},
				splitLine:{
					show:true,
					interval:1,
					lineStyle:{
						opacity:0.3
					}
				},
				axisLine:{
					lineStyle:{
						color:'#797979',
	
					}
				},
				axisTick:{
					show:false
				},
			}
		],
		dataZoom: [
				   {
					   show: true,
					   type: 'inside',
					   start: 0,
					   end: 100,
					   xAxisIndex: [0],
				   },
			   ],
	   
		series: [
				 // 无偏差值的数据
		 			{
		 			   name:'无数据',
		 				type:'line',
		 			 //  connectNulls:true,
		 				symbol:'none',
		 				   data: nonePczListEchart,	// 描画数据  无偏差值的数据
		 				   lineStyle:{
		 					   normal:{
		 						   color:'#D7D7D7',
		 						   width:2,
		 						   type:'dotted',
		 						   opacity:1
		 					   },
		 			   }
		 			},
		 		   // 平均偏差
					{name:'平均偏差',
						type:'line',
						data: averagePczListEchart,	// 描画数据 平均偏差
						symbol:'none',
						itemStyle:{
							normal:{
								color:'#00CC99'
							}
						}	
					},
					{
						type: 'scatter',
						data: pczAllListEchart,	// 描画数据 所有偏差值的数据
						markLine: markLineOpt,	// 描画数据 平均偏差值(连线)	  
						symbolSize:5,
						symbol:'circle',  	
					},
				 {
	 				// 极限偏差(最大临界点 最小临界点)
	 				name:'极限偏差',
	 				type:'line',
	 					markLine:{
	 						symbol:['none','none'],
	 						silent:true,
	 						label:{
	 							normal:{
	 								show:false
	 							}
	 						},
	 						lineStyle:{
	 							normal:{
	 								color:'#E72B42',
	 								width:2,
	 								type:'solid'
	 							}
	 						},
	 						data:[
								{yAxis : limitUpper,  // 最大分割线 最大临界点
							 	   label:{
										normal:{
											show:true,
											position:'right',
											formatter:function (p) {
												return p.value;
											},
											textStyle:{
												color:'#797979'
											}
										}
									} 
							 	   
								},
								{yAxis : limitLower, // 最小分割线 最小临界点
							 	   label:{
										normal:{
											show:true,
											position:'right',
											formatter:function (p) {
												return p.value;
											},
											textStyle:{
												color:'#797979'
											}
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

/**
 * 全程中线偏差Echart描画
 * 
 * @param canvasId - 画布ID
 * @param warnInfoEchart - Echart描画用数据对象
 */
function drawEchartMiddleLineDeviation(canvasId, warnInfoEchart) {

	var pczListObj = warnInfoEchart.middleObj;
//	console.log(pczListObj);

	// 画布
	var myChart = echarts.init(document.getElementById(canvasId));

	// 高程偏差的最大临界点
	var limitUpper = warnInfoEchart.deviationLimit.limitUpper;
	// 高程偏差的最小临界点
	var limitLower = warnInfoEchart.deviationLimit.limitLower;
	
	//y轴最大值
	var maxLimit = 5 * limitUpper;
	//y轴最小值
	var minLimit = 5 * limitLower;
	
	//判断极限偏差是否同为正直或者同为负值
	if (limitUpper > 0 && limitLower > 0){
		minLimit = 0;
	}else if (limitUpper < 0 && limitLower < 0){
		maxLimit = 0;
	}
	
	// 横坐标显示文字(梁段号)
	// 横坐标(梁段号)
	var dataXLd = warnInfoEchart.dataXLd;

	//分割线的间隔数；
	var splitNum;
	
	//判断横坐标数量确定间隔数
	var splitNum = getXInterval(dataXLd);
	
	// 横坐标显示文字(边合 中合)
	//var markListEchart = warnInfoEchart.markList;
	// 描画用所有偏差值
	var pczAllListEchart = warnInfoEchart.pczAllListEchart;
	//console.log(pczAllListEchart);
	// 无偏差值的数据
	var nonePczListEchart = warnInfoEchart.pczNoneListEchart;

	var myChart = echarts.init(document.getElementById(canvasId));
	
	var markLineOpt={		
			animation: false,
			lineStyle:{
				normal:{
					type:'solid',
					color:'#F9E095',
					width:2
				},
				emphasis:{
				    color:'#F9E095'
				}
			},
			data:pczListObj
		};
	
	option={
			
		title:{
			text:'全桥中线偏差',
			top:10,
			left:'45%',
			textStyle:{
				fontSize:14,
				color:'#797979'
			}
			
		},	
		color:['#D7D7D7','#F9DE92','#E72B42'],
		legend: {
			data: [{
				name: '无数据',
				icon:basePath+'image://static/images/wsj.png'

			}, {
				name: '偏差值',
				icon: basePath+'image://static/images/pcz.png'
				
			},{
				name: '极限偏差',
				icon:basePath+ 'image://static/images/jxpc.png'
				
			}],
			itemHeight:1,
			right:'15%',
			top: 10
			
		},
		grid: {
        	containLabel: true,
 	        width:'90%',
 	        height:'80%',
 	        bottom:'5%',
 	        left:50,
 	        top:40
        },
        //formatter的用法
        tooltip: {

            formatter: function (obj) {
//            	console.log(obj);
            	//梁段名字
            	var valueName = obj.data.ldName;
            	var pierName = obj.data.pier;
            	//梁段value值
            	var value = obj.data.pcz==0?obj.data.pcz:parseFloat(obj.data.pcz);
            	
            	return "梁段"+pierName+'#'+valueName +" 的3号测点，偏差值" + value+'mm';
        	}
        },
		xAxis:[
			{
				type: 'category',
				name:'梁段',
				nameLocation:'middle',
				nameGap:40,
				nameTextStyle:{
					color:'#797979',
					fontSize:14
				},
				boundaryGap: false,
				data : dataXLd,	// 横坐标显示文字(梁段号)
				axisLabel:{
					interval:0,
					rotate:30,
					textStyle:{
						color:'#797979',
						fontSize:12
					}
				},
				axisTick:{
					show:true,
					alignWithLabel: true
				},
				splitLine:{
					show:true,
					interval:splitNum,
					lineStyle:{
						opacity:0.3
					}
				},
				axisLine : {
					onZero: false,
					lineStyle:{
						color:"#797979"
					}
				},
			},
	   ],
		yAxis: [
			{
				type : 'value',
				splitNumber:1,
				name:'中线偏差(mm)',
				min :minLimit,	// 最小值
				max :maxLimit,	// 最大值
				nameLocation:'middle',
				nameGap:45,
				nameTextStyle:{
					color:'#797979',
					fontSize:14
				},
			   // data:['-30','-15','0','15','30'],
				splitLine:{
					show:true,
					lineStyle:{
						opacity:0.3
					}
				},
				axisLine:{
					lineStyle:{
						color:'#797979',

					}
				},
				axisTick:{
					show:false
				}
			}
		],
	  
		dataZoom: [
				   {
					   show: true,
					   type: 'inside',
					   start: 0,
					   end: 100,
					   xAxisIndex: [0],
				   },
			   ],
		series:[
			{
				name:'无数据',
				type:'line',
				symbol:'none',
				data : nonePczListEchart,
				lineStyle:{
					normal:{
						color:'#D7D7D7',
						width:2,
						type:'dotted',
						opacity:1
					},
				}
			},
			{
				name:'偏差值',
				type:'line',
				symbol:'none',
				data: pczAllListEchart,
				lineStyle:{
					normal:{
						color:'#F9DE92',
						type:'solid',
						width:2
					}
				}
			},
			{
				type: 'scatter',
				data: pczAllListEchart,
				markLine: markLineOpt,
				symbolSize:3,
				symbol:'circle',  	
				itemStyle:{
					normal:{
						color:'#F9DE92'
					}
				}
			},
			{
				name:'极限偏差',
				type:'line',
				markLine:{
					symbol:['none','none'],
					silent:true,
					label:{
						normal:{
							show:false
						}
					},
					lineStyle:{
						normal:{
							color:'#E72B42',
							width:2,
							type:'solid'
						}
					},
					data:[
						{ 
							yAxis: limitUpper,
							 label:{
									normal:{
										show:true,
										position:'right',
										formatter:function (p) {
											return p.value;
										},
										textStyle:{
											color:'#797979'
										}
									}
								} 
						},	// 最大临界值
						{ 
							yAxis: limitLower,
							 label:{
									normal:{
										show:true,
										position:'right',
										formatter:function (p) {
											return p.value;
										},
										textStyle:{
											color:'#797979'
										}
									}
								} 
							
						}   // 最小临界值

					]
				}
			},

		]
	}

	myChart.setOption(option);
}


/**
 * 全程立模标高偏差Echart描画
 * 
 * @param canvasId - 画布ID
 * @param warnInfoEchart - Echart描画用数据对象
 */
function drawEchartElevationDeviation(canvasId, warnInfoEchart) {

	// 高程偏差的最大临界点
	var limitUpper = warnInfoEchart.deviationLimit.limitUpper;
	// 高程偏差的最小临界点
	var limitLower = warnInfoEchart.deviationLimit.limitLower;
	
	//y轴最大值
	var maxLimit = 5 * limitUpper;
	//y轴最小值
	var minLimit = 5 * limitLower;
	
	//判断极限偏差是否同为正直或者同为负值
	if (limitUpper > 0 && limitLower > 0){
		minLimit = 0;
	}else if (limitUpper < 0 && limitLower < 0){
		maxLimit = 0;
	}
	
	// 横坐标显示文字(梁段号)
	// 横坐标(梁段号)
	var dataXLd = warnInfoEchart.dataXLd;
	//console.log(dataXLd);

	//分割线的间隔数；
	var splitNum = getXInterval(dataXLd);
	// 横坐标显示文字(边合 中合)
	var markListEchart = warnInfoEchart.markList;
	// 描画用偏差值的最大值最小值
	var pczMinMaxListEchart = warnInfoEchart.pczMinMaxListEchart;
	// 描画用所有偏差值
	var pczAllListEchart = warnInfoEchart.pczAllListEchart;
	
	// 无偏差值的数据
	var nonePczListEchart = warnInfoEchart.pczNoneListEchart;
	// 平均偏差值
	var averagePczListEchart = warnInfoEchart.pczAverageListEchart;
	
	// 画布
	var myChart = echarts.init(document.getElementById(canvasId));

	// Echart最大值最小值连线
	var markLineOpt={
		animation: false,
		lineStyle:{
			normal:{
				type:'solid',
				color:'#797979',
				width:3
			},
			emphasis:{
				color:'#0A33F4'
			}
		},
		
		data: pczMinMaxListEchart
	};
	
	option = {
		title:{
			text:'全桥立模标高偏差',
			top:10,
			left:'45%',
			textStyle:{
				fontSize:14,
				color:'#797979'
			}
		},
		color:['#D7D7D7','#E72B42'],
		legend: {
			data:[
				  {
					  name:'无数据',
					  icon:basePath+'image://static/images/wsj.png'
					
				  },{
					 name:'平均偏差',
					 icon: basePath+'image://static/images/average.png'
				},{
					  name:'极限偏差',
					  icon:basePath+ 'image://static/images/jxpc.png'
			}],
			itemHeight:1,
			right:'15%',
			top: 10
		},
		tooltip: {
			
			formatter : function(obj) {

				var pointPlacePczList = obj.data.pointPlacePczList;
				
				// 墩号
				var pier = obj.data.pier;
				
				// 梁段号
				var ldName = obj.data.ldName;
				
				// 将六个偏差值放入对应位置，并将超出范围的偏差值字体改变颜色
				var pointVule = {};
				if (pointPlacePczList && pointPlacePczList.length > 0) {
					
					for (var i = 0, len = pointPlacePczList.length; i < len; i++) {

						var item = pointPlacePczList[i];
						
						var iPoint = item.pointPlace;
						var pcz = (item.pcz != null || item.pcz !='' || item.pcz > maxLimit || item.pcz < minLimit) ? item.pcz : "异常";
						var iswarn = item.iswarn;
						
						if (iPoint) {
							
							if (pcz != "" && IS_WARN_FLAG.WARN == iswarn) {
	
								pointVule[iPoint] = '<span style="color:red">' + pcz + '</span>';
							}else if('异常'== pcz){
								pointVule[iPoint] = '<span style="color:red">' + pcz + '</span>';
								
							} else {
	
								pointVule[iPoint] = pcz;
							}
						}
					}

					var pointDivHtml =  '<div style="position: relative;">'
						+ '<p id="elevationPointValue" style="font-size:12px;color:#333;text-align:center;">'
						+ pier
						+ "#"
						+ ldName
						+ '各测点偏差值 '
						+ '</p>'
						+ '<img src = "static/images/hPic.png">'
						+ '<span id="elevationFirst">'
						+ ((pointVule[1] !=undefined)? pointVule[1] : "")
						+ '</span>'
						+ '<span id="elevationSecond">'
						+ ((pointVule[2] !=undefined) ? pointVule[2] : "")
						+ '</span>'
						+ '<span id="elevationThird">'
						+ ((pointVule[3] !=undefined) ? pointVule[3] : "")
						+ '</span>'
						+ '<span id="elevationFour">'
						+ ((pointVule[4] !=undefined) ? pointVule[4] : "")
						+ '</span>'
						+ '<span id="elevationFifth">'
						+ ((pointVule[5] !=undefined) ? pointVule[5] : "")
						+ '</span>'
						+ '<span id="elevationsixth">'
						+ ((pointVule[6] !=undefined) ? pointVule[6] : "")
						+ '</span>' +'</div>';
					
					return pointDivHtml;
				}
				
				return;
			},
			backgroundColor : '#D7D7D7'
		},
		grid: {
			containLabel: true,
 			width:'90%',
 			height:'80%',
 			bottom:'5%',
 			left:50,
 			top:40
		},
		xAxis:[
			{
				type: 'category',
				name:'梁段',
				nameLocation:'middle',
				nameGap:40,
				boundaryGap: false,
				nameTextStyle:{
				  fontSize:14,
				  color:'#797979'
				},
				data : dataXLd,
				axisLabel:{
					interval:0,
					rotate:30,
					textStyle:{
						color:'#797979',
						fontSize:12
					}
				},
				splitLine:{
					show:true,
					interval:splitNum,
					lineStyle:{
						opacity:0.3
					}
				},
				axisTick:{
					show:true,
					alignWithLabel: true
				},
				axisLine : {
					onZero: false,
					lineStyle:{
						color:"#797979"
					}
				},
			},
		],
		yAxis: [
			{
				type : 'value',
				splitNumber:1,
				name:'立模标高偏差(mm)',
				min : minLimit,
				max : maxLimit,
				nameLocation:'middle',
				nameGap:45,
				nameTextStyle:{
					fontSize:14,
					color:'#797979'
				},
				splitLine:{
					show:true,
					lineStyle:{
						opacity:0.3
					}
				},
				axisTick:{
					show:false
				},
				axisLine:{
					lineStyle:{
						color:'#797979',

					}
				}
			}
		],
		dataZoom: [
				   {
					   show: true,
					   type: 'inside',
					   start: 0,
					   end: 100,
					   xAxisIndex: 0,
				   },
			   ],
		series: [
				 // 无偏差值的数据
		 			{
		 			   name:'无数据',
		 				type:'line',
		 				symbol:'none',
		 				   data: nonePczListEchart,	// 描画数据  无偏差值的数据
		 				   lineStyle:{
		 					   normal:{
		 						   color:'#D7D7D7',
		 						   width:2,
		 						   type:'dotted',
		 						   opacity:1
		 					   },
		 			   }
		 			},
		 		   // 平均偏差
					{name:'平均偏差',
						type:'line',
						data: averagePczListEchart,	// 描画数据 平均偏差
						symbol:'none',
						itemStyle:{
							normal:{
								color:'#00CC99'
							}
						}
					},
					{
						type: 'scatter',
						data: pczAllListEchart,	// 描画数据 所有偏差值的数据
						markLine: markLineOpt,	// 描画数据 平均偏差值(连线)	  
						symbolSize:5,
						symbol:'circle',  
						itemStyle:{
							normal:{
								color:'#797979'
							}
						}
						
					},
				 {
	 				// 极限偏差(最大临界点 最小临界点)
	 				name:'极限偏差',
	 				type:'line',
	 					markLine:{
	 						symbol:['none','none'],
	 						silent:true,
	 						label:{
	 							normal:{
	 								show:false
	 							}
	 						},
	 						lineStyle:{
	 							normal:{
	 								color:'#E72B42',
	 								width:2,
	 								type:'solid'
	 							}
	 						},
	 						data:[
								{yAxis : limitUpper,  // 最大分割线 最大临界点
							 	   label:{
										normal:{
											show:true,
											position:'right',
											formatter:function (p) {
												return p.value;
											},
											textStyle:{
												color:'#797979'
											}
										}
									} 
							 	   
								},
								{yAxis : limitLower, // 最小分割线 最小临界点
							 	   label:{
										normal:{
											show:true,
											position:'right',
											formatter:function (p) {
												return p.value;
											},
											textStyle:{
												color:'#797979'
											}
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


/**************************************全桥错台*******************************************************/

function drawEchartCuoTai(canvasId, warnInfoEchart,tsList){	
//	console.log(warnInfoEchart)
	// 横坐标(梁段号)
	var dataXLd = warnInfoEchart.dataXLd;
	//分割线的间隔数
	var splitNum = getXInterval(dataXLd);
	// 最小偏差值
	var limitLower = warnInfoEchart.minAveragePcz;
	// 最大偏差值
	var limitUpper = warnInfoEchart.maxAveragePcz;
	// 高差
	var diffInfoList = warnInfoEchart.diffInfoList;

	
	var myChart = echarts.init(document.getElementById(canvasId));
	var option = {
		title : {
			text : '全桥梁段错台',
			top : 10,
			left : '45%',
			textStyle : {
				fontSize : 14,
				color : '#797979'
			}
		},
		legend : {
			data : [ {
				name : '错台',
				icon : basePath+'image://static/images/gc.png'
			},{
				  name:'极限偏差',
				  icon:basePath+ 'image://static/images/wsj.png'
		} ],
			itemHeight : 1,
			right : '15%',
			top : 10
		},
		tooltip : {
			show : true,
			trigger : 'item',
			formatter : function(obj) {

				return obj.data.lable;
			}
		},
		grid : {
			containLabel : true,
			width : '90%',
			height : '80%',
			bottom : '15%',
			left : 50,
			top : 40
		},
		xAxis : [ {
			type : 'category',
			name : '梁段',
			nameLocation : 'middle',
			nameGap : 40,
			nameTextStyle : {
				fontSize : 14,
				color : '#797979'
			},

			data : dataXLd,
			axisLabel : {
				interval : 0,
				rotate : 30,
				textStyle : {
					color : '#797979',
					fontSize : 12
				}
			},
			axisTick : {
				show : true,
				alignWithLabel : true
			},
			splitLine : {
				show : true,
				interval : splitNum,
				lineStyle : {
					opacity : 0.3
				}
			},
			axisLine : {
				onZero : false,
				lineStyle : {
					color : "#797979"
				}
			},
		},

		],
		yAxis : [ {
			type : 'value',
			splitNumber : 4,
			name : '错台值(mm)',
			min : limitLower ,
			max : limitUpper ,
			nameLocation : 'middle',
			nameGap : 50,
			nameTextStyle : {
				fontSize : 14,
				color : '#797979'
			},
			splitLine : {
				show : true,
				lineStyle : {
					opacity : 0.3
				}
			},
			axisLine : {
				lineStyle : {
					color : '#797979',

				}
			},

			axisTick : {
				show : false
			}
		} ],
		dataZoom : [ {
			show : true,
			type : 'inside',
			start : 0,
			end : 100,
			xAxisIndex : 0,
		}, ],
		series : [ {
			name : '错台',
			type : 'line',
			step : 'middle',
			symbol : 'emptyCircle',
			symbolSize : 4,
			itemStyle : {
				normal : {
					color : '#7CB5EC'
				}
			},
			data : diffInfoList
		},{
				// 极限偏差(最大临界点 最小临界点)
				name:'极限偏差',
				type:'line',
					markLine:{
						symbol:['none','none'],
						silent:true,
						label:{
							normal:{
								show:false
							}
						},
						lineStyle:{
							normal:{
								color:'#E72B42',
								width:2,
								type:'solid'
							}
						},
						data:[
						{yAxis : maxCuotai,  // 最大分割线 最大临界点
					 	   label:{
								normal:{
									show:true,
									position:'right',
									formatter:function (p) {
										return p.value;
									},
									textStyle:{
										color:'#797979'
									}
								}
							} 
					 	   
						},
						{yAxis : minCuotai, // 最小分割线 最小临界点
					 	   label:{
								normal:{
									show:true,
									position:'right',
									formatter:function (p) {
										return p.value;
									},
									textStyle:{
										color:'#797979'
									}
								}
							}
					 		 
						}

				 ]
			 }
		 } ]
	}

	myChart.setOption(option);
}

/**
 *  获取偏差的最大临界点和最小临界点(必须同步方式获取)
 *  
 * @param projectId - 标段ID
 * @param deviationType - 偏差类型
 *	  1：中线 2 ：高程 3 ：立模
 */
function getDeviationLimit(projectId, deviationType) {
	
	var deviation = {};
	
	// 必须同步方式获取
	$.ajax({
		async:false,
		type:'POST',
		url:basePath+'homeSection/getPccxLimit',
		data:{ projectId : projectId },
		dataType : 'json',//数据传输格式：json		
		error:function(){

			return;
		},
		success:function(data){
			
			for (var i = 0, len = data.result.deviation.length; i < len; i++) {

				var item = data.result.deviation[i];
				
				if (item.type == deviationType) {
					
					deviation.limitUpper = item.upper;
					
					deviation.limitLower = item.lower;
					
					break;
				}
			}
		}
	});
	return deviation;
}

/**
 * 横坐标标识ID ： 墩号-SEQ-里程标志(测点)
 * @param item
 * @param mileageflag
 * @returns {String}
 */
function getXId(item, mileageflag) {
	
	return item.pier + "_" + item.seq + "_" + mileageflag;
}

/**
 * 0号块显示名称
 * @param item
 * @param mileageflag
 * @returns {String}
 */
function getZeroText(item, mileageflag) {
	
	var text = "";
	var isOddPier = (item.pier % 2 == 1);
	
	// 奇数墩号 小里程
	// 偶数墩号 大里程
	// 不带[']
	if (isOddPier && MILEAGE_FLAG.SMALL == mileageflag
		|| !isOddPier && MILEAGE_FLAG.BIG == mileageflag) {
		
		text = item.pier + "#-0" ;
	}
	// 奇数墩号 小里程
	// 偶数墩号 大里程
	// 带[']
	else {

		text = item.pier + "#-0'" ;
	}
	
	return text;
}

/**
 * 显示名称
 * 
 * @param item
 * @returns {String}
 */
function getShortName(item) {
	
	// 0号块以外
	if (item.shortname != '0') {
		
		return item.shortname;
	}
	
	var shortName = "";
	var isOddPier = (item.pier % 2 == 1);
	
	// 奇数墩号 小里程
	// 偶数墩号 大里程
	// 不带[']
	if (isOddPier && MILEAGE_FLAG.SMALL == item.mileageflag
		|| !isOddPier && MILEAGE_FLAG.BIG == item.mileageflag) {
		
		shortName = "0" ;
	}
	// 奇数墩号 小里程
	// 偶数墩号 大里程
	// 带[']
	else {

		shortName = "0'" ;
	}
	
	return shortName;
}

/**
 * 计算错台差值, 返回错台偏差显示信息
 * 
 * @param infoStart - 描画的起点梁段
 * @param infoEnd - 描画的终点梁段
 */
function getDiffInfo(infoStart, infoEnd) {
	
	var diffInfo = "";

	//*******************************************************************************/
	// 计算错台差值
	// 错台差值 保留小数点后两位
	var valueStart = (infoStart.averagePcz && infoStart.averagePcz != '') ? parseFloat(infoStart.averagePcz) : 0;
	var valueEnd = (infoEnd.averagePcz && infoEnd.averagePcz != '') ? parseFloat(infoEnd.averagePcz) : 0;

	var diffValue = valueEnd - valueStart;
	// 保留两位小数
	diffValue = diffValue.toFixed(2);

	//*******************************************************************************/
	// 错台梁段信息
	// 普通梁段和普通梁段
	if (LD_TYPE.XBJZ == infoStart.ldtype && LD_TYPE.XBJZ == infoEnd.ldtype) {
		
		diffInfo = "[" + infoEnd.shortname + "]梁段与[" + infoStart.shortname + "]梁段";
	}
	// 起点梁段:直线段 终点梁段:普通梁段  (无边合)
	else if (LD_TYPE.BKFDC == infoStart.ldtype && LD_TYPE.XBJZ == infoEnd.ldtype) {

		diffInfo = "直线段与[" + infoEnd.shortname + "]梁段";
	}
	// 起点梁段:普通梁段 终点梁段:直线段  (无边合)
	else if (LD_TYPE.XBJZ == infoStart.ldtype && LD_TYPE.BKFDC == infoEnd.ldtype) {

		diffInfo = "直线段与[" + infoStart.shortname + "]梁段";
	}
	// 起点梁段:直线段 终点梁段:边合
	// 起点梁段:边合 终点梁段:直线段
	else if (LD_TYPE.BKFDC == infoStart.ldtype && LD_TYPE.BKHL == infoEnd.ldtype
		|| LD_TYPE.BKHL == infoStart.ldtype && LD_TYPE.BKFDC == infoEnd.ldtype) {

		diffInfo = "直线段与边合";
	}
	// 起点梁段:0号梁段 终点梁段:普通梁段
	else if (LD_TYPE.ZERO == infoStart.ldtype && LD_TYPE.XBJZ == infoEnd.ldtype) {

		diffInfo = "[" + infoEnd.shortname + "]梁段与0号梁段";

		if (MILEAGE_FLAG.SMALL == infoStart.mileageflag) {
			diffInfo = diffInfo + "小里程";
		}
		else if (MILEAGE_FLAG.BIG == infoStart.mileageflag) {
			diffInfo = diffInfo + "大里程";
		}
	}
	// 0号梁段 小里程/大里程
	else if (LD_TYPE.ZERO == infoStart.ldtype && LD_TYPE.ZERO == infoEnd.ldtype) {

		diffInfo = "0号梁段小里程和大里程";
	}

	//console.log('diffInfo' + diffInfo);
	//*******************************************************************************/
	// 错台差值显示信息
	// 无错台差值
	if (!infoStart.averagePcz && infoEnd.averagePcz) {

		diffInfo = "前一错台无数据, 该梁段偏差平均值为: " + valueEnd.toFixed(2);
	}
	else if (diffValue == 0) {

		diffInfo = diffInfo + "无错台差值";
	} else {

		diffInfo = diffInfo + "的错台差值: " + diffValue;
	}
	//console.log(diffInfo);
	return diffInfo;
}

/**
 * 获取错台差值 的 点
 * 
 * @param xPos - 点的横坐标
 * @param yPos - 点的纵坐标
 * @param info - 点的附加信息
 */
function getDiffPoint(xPos, yPos, info) {
	//console.log(info)
	var diffPoint = {};
	
	// Echart 坐标对(横坐标, 纵坐标)
//	diffPoint.coord = [xPos, yPos];
	// Echart 属性
	diffPoint.symbol = 'none';
	
	// 附加信息
	// 非Echart属性
	if (info) {
		diffPoint.info = info;
	}
	//console.log(diffPoint);
	return diffPoint;
}