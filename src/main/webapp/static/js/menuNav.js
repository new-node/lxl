/**
 * 页面上部菜单导航
 */
var preTime = 0 ;
var cId="";
/**
 * 初始化
 */
function initMenuNav() {
//debugger;
	// 全隐藏
	$("#menuLink>li").each(function(){
		$(this).hide();
	});
	
	// 点击事件
	$('.head-nav ul li').on('click', function() {
//		$(e.target).attr("id");       // e.target表示被点击的目标
		var cid = $(this).attr('id');
		Today = new Date(); 
		var NowHour = Today.getHours();
//		alert("NowHour：：："+NowHour);
		var NowMinute = Today.getMinutes(); 
//		alert("NowMinute：：："+NowMinute);
		var NowSecond = Today.getSeconds(); 
//		alert("NowSecond：：："+NowSecond);
		var mysec = (NowHour*3600)+(NowMinute*60)+NowSecond;
//		alert("preTime::::"+preTime + "mysec:::::"+mysec);
		//600只是一个时间值，就是5分钟内禁止重复提交，值随你高兴设 
		if((mysec-preTime)>5 || cid!=cId){ 
//			debugger;
			preTime=mysec;
			cId=cid;
//		debugger;
		// 样式切换
		$(this).addClass("hovers").siblings('li').removeClass('hovers');

		// 加载页面用数据
		var data = {};
		// 项目ID
		data.projectId = getProjectId();
		// 标段ID
		data.sectionId = getSectionId();
		// 组织ID
		data.orgId = getOrgId();
		// 组织类型
		data.orgType = getOrgType();

		// 菜单ID
		var ctrlId = $(this).attr('id');
		// 加载页面
		loadPage(data, ctrlId);
		}
	});
	
}

/**
 * 加载页面
 * 
 * @param data - 参数
 * @param ctrlId - 菜单ID
 */
function loadPage(data, ctrlId) {
//	$("#ldinfo").hide();
//	clearTimeout(functiontime);
//	clearTimeout(functionY);
	// 改变样式
	$('#' + ctrlId).addClass("hovers").siblings('li').removeClass('hovers');

	// CRC(中国铁路总公司 首页)
	if (ctrlId == MENU_LINK_ID.CENTER_HOME) {

		$('#mainContent').load("homeCRC", {}, function(){
			eval('initHomeCRC()');
		});
		
		return;
	}
	
	// 项目首页
	if (ctrlId == MENU_LINK_ID.PROJECT_HOME) {
		
		$('#mainContent').load("homeProject", data, function(){
			
			// 项目首页
			eval('initProject(' + data.projectId + ')');
			// 项目Echart
			eval('initProjectEchart(' + data.projectId + ')');
		});
		return;
	}
	// 标段首页
	if (ctrlId == MENU_LINK_ID.SECTION_HOME) {

		$('#mainContent').load("homeSection", data, function(){
			
			// 参数: 标段ID, 工程ID
			eval('initSectionInfo(' + data.sectionId + ',' + data.projectId + ')');
		});
		return;
	}
	
	// 观测人员
	if (ctrlId == MENU_LINK_ID.CENTER_OBSERVER
		|| ctrlId == MENU_LINK_ID.PROJECT_OBSERVER
		|| ctrlId == MENU_LINK_ID.SECTION_OBSERVER) {
		
		$('#mainContent').load("observer/getObserver", {}, function(){
			
			// 初始化观测人员
			// 参数 组织ID 组织类型
			eval('initObserver('+ data.orgId + ', ' + data.orgType + ')');
		});
		
		return;
	} 

	// 仪器设备
	if (ctrlId == MENU_LINK_ID.CENTER_EQUIPMENT
		|| ctrlId == MENU_LINK_ID.PROJECT_EQUIPMENT
		|| ctrlId == MENU_LINK_ID.SECTION_EQUIPMENT) {
		
		$('#mainContent').load("equipment/getEquipment", {}, function(){
			
			// 初始化仪器设备
			// 参数 组织ID 组织类型
			eval('initEquipment('+ data.orgId + ', ' + data.orgType + ')');
		});
		
		return;
	}

	// 桥梁(连续梁)首页
	if (ctrlId == MENU_LINK_ID.CON_BEAM_HOME) {

		$('#mainContent').load("homeBridge", data, function(){
			
			// 连续梁形象描画
			eval('initBridge(' + data.orgId + ')');
			// 连续梁偏差描画
			eval('initBridgeEchart(' + data.projectId + ', ' + data.orgId + ')');
		});
		return;
	}
	

	// 偏差超限
	if (ctrlId == MENU_LINK_ID.CON_BEAM_DEVIATION_OVERRUN) {

		$('#mainContent').load("pccx/getDeviationOverrunPage", data, function(){
			
			eval('initDeviationOverrun(' + data.orgId + ')');
		});
		return;
	}

	// 测量信息
	if (ctrlId == MENU_LINK_ID.CON_BEAM_MEASUREINFO) {
		
		$('#mainContent').load("measure/getMeasureMessage", data, function(){
			
			eval('initMeasureInifo('+ data.orgId + ')');
		});
		return;
	}

	// 梁段测点
	if (ctrlId == MENU_LINK_ID.CON_BEAM_LDSTATION) {
		
		$('#mainContent').load("ldstation/getLdStation", data, function(){
			
			eval('initPierItemList(' + data.orgId + ')');
		});
		return;
	}

	// 基点信息
	if (ctrlId == MENU_LINK_ID.CON_BEAM_DATUMPOINT) {
		
		$('#mainContent').load("datum/getDatumPoint", data, function(){

			eval('initDatumPoint(' + data.orgId + ')');
		});
		return;
	}

	// 维护理论值
	if (ctrlId == MENU_LINK_ID.CON_BEAM_THEORETICAL) {
		
		$('#mainContent').load("theoretical/getTheoreticalValue", data, function(){

			eval('initPierItemList(' + data.orgId + ')');
		});
		return;
	}
}