/**
 * 观测人员
 *   中国铁路总公司 观测人员
 *   项目 观测人员
 *   标段 观测人员
 *   标段管理员 观测人员
 */

var isSearchFlg = false;//判断是否点击查询按钮
var cateIdParam,projectInfoIdParam,projectSectionIdParam,searchname,secId;//保存点击查询按钮的条件
var observarAllData = [];//保存列表数据
var orgTypeFlag;

// 标段管理员标志
var isSectionManager = false;

/**
 * 
*/
$(function(){
	
	// 弹窗的拖拽
	$('.managementPage').draggable();
});

/**
 * 初始化函数
 */
function initObserver(orgId, orgType) {

	// 中国铁路总公司 观测人员
	if (orgType == ORG_TYPE.CRC) {
		
		orgTypeFlag = ORG_TYPE.CRC;
		
		// 绑定下拉框数据
		getCategoryItemList();
		getAllObserver('','',secId);
	}
	// 项目 观测人员
	else if (orgType == ORG_TYPE.PROJECT) {

		orgTypeFlag = ORG_TYPE.PROJECT;
		$("#categoryItem").hide();
		$("#projectInfo").hide();
		$(".treeCheckHide").hide();
		
		//导航树点击的项目ID
		var projectId = orgId;

		// 绑定下拉框数据
		getProjectSectionList(projectId);
		projectInfoIdParam = orgId;
		projectSectionIdParam = secId;
		isSearchFlg = true;
		getAllObserver('', projectId,secId);
	}
	// 标段 观测人员
	else if (orgType == ORG_TYPE.SECTION) {

		orgTypeFlag = ORG_TYPE.SECTION;
		$(".tablehead").hide();
		$(".suoshuTD").hide();
		//导航树点击的标段ID
		var sectionId = orgId;
		projectSectionIdParam = orgId;
		isSearchFlg = true;
		getAllObserver('', '', sectionId);
	}
}

/**
 * 查询按钮点击触发方法
 */
function search(){
	
	// 项目 观测人员
	if (orgTypeFlag == ORG_TYPE.PROJECT) {
		cateIdParam = 0;//片区
		projectInfoIdParam = 0;//项目
		projectSectionIdParam = $("#projectSection").val();//标段
		searchname = $("#username").val();
	}
	// 标段 观测人员
	else if (orgTypeFlag == ORG_TYPE.SECTION) {
		cateIdParam = 0;//片区
		projectInfoIdParam = 0;//项目
		projectSectionIdParam = 0;//标段
		searchname = 0;
	}else{
		cateIdParam = $("#categoryItem").val();//片区
		projectInfoIdParam = $("#projectInfo").val();//项目
		projectSectionIdParam = $("#projectSection").val();//标段
		searchname = $("#username").val();
	}
	
	isSearchFlg = true;
	getAllObserver(cateIdParam,projectInfoIdParam,projectSectionIdParam,searchname);
}

/**
 * 片区下拉框改变值触发
 */
function cagegoryItemChange(){
	var cateId = $("#categoryItem").val();
	if (cateId == "0"){
		$("#projectInfo").empty();
		$("#projectInfo").append("<option value = '0'>全部项目</option>");
		$("#projectSection").empty();
		$("#projectSection").append("<option value = '0'>全部标段</option>");
		return;
	}
	getProjectInfoList(cateId);
}

/**
 * 项目下拉框改变值时触发
 */
function projectInfoChange(){
	var projectInfoId = $("#projectInfo").val();
	
	if (projectInfoId == "0"){
		$("#projectSection").empty();
		$("#projectSection").append("<option value = '0'>全部标段</option>");
		return;
	}
	getProjectSectionList(projectInfoId);
}

/**
 * 下一页触发
 */
function navigatorPage(pageNo){
	if (isSearchFlg){
		getAllObserver(cateIdParam,projectInfoIdParam,projectSectionIdParam,searchname,pageNo);
	} else {
		getAllObserver('','','','',pageNo);
	}		
}

/**
 * 查询仪器设备列表
 */
function getAllObserver(cateId,projectInfoId,projectSectionId,searchname,pageNo){
	
	if(projectSectionId == null || projectSectionId == 0){
		projectSectionId = secId;
	}
	
	var param = {"cateId":cateId,"projectInfoId":projectInfoId,"projectSectionId":projectSectionId,"username":searchname,"pageNo":pageNo};//参数
	var url = "observer/getObserverList";//路径
	var totalCount,pageNo,totalPage,startNum,endNum;
	
	$.ajax({
		async : true,//是否异步
		//cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
		url :url,//请求的actio//n路径
		data:param,
		error : function(){
			
		},
		success : function (data){
			
			$("#observerList>tbody").empty();
			totalCount = data.result.totalCount;//总条数
			pageNo = data.result.pageNo;//当前页数
			totalPage = data.result.totalPage;//总计页数
			if (totalCount == 0){
				startNum = -1;
				endNum  = 0;
			} else {
				startNum = data.result.startNum;
    			endNum = data.result.endNum;
			}
			observarAllData = data.result.list;
			
			if(data.result.list != null){
				for(i = 0;i<data.result.list.length;i++){
					var observer = data.result.list[i]; 
					var categoryname =  observer.categoryname == null?"":observer.categoryname;
					var projectname = observer.projectname == null?"":observer.projectname;
					var sectionName = observer.sectionName == null?"":observer.sectionName;
					var partname = observer.departmentName == null?"":observer.departmentName;
					var operator = observer.userName == null?"":observer.userName;
					var proName = observer.proName == null?"":observer.proName;
					var mobile = observer.mobile == null?"":observer.mobile;
					
					//向tbody写值
					$("#observerList").append(
							"<tr>"+
	    						"<td>"+(10*(pageNo-1)+i+1)+"</td>"+
								"<td class = 'suoshuTD treeCheckHide'>"+categoryname+"</td>"+
								"<td class = 'suoshuTD treeCheckHide'>"+projectname+"</td>"+
								"<td class = 'suoshuTD biaodunhide'>"+sectionName+"</td>"+
								"<td>"+partname+"</td>"+
								"<td>"+operator+"</td>"+
								"<td>"+proName+"</td>"+
								"<td>"+mobile+"</td>"+
							"</tr>")
				}
			}

			// 项目 观测人员
			if (orgTypeFlag == ORG_TYPE.PROJECT) {
				$("#categoryItem").hide();
				$("#projectInfo").hide();
				$(".treeCheckHide").hide();
			}
			// 标段 观测人员
			else if (orgTypeFlag == ORG_TYPE.SECTION) {
				$(".tablehead").hide();
				$(".suoshuTD").hide();
			}
			
			writeTable("tableinfo",totalCount,startNum,pageNo,totalPage,endNum);
		}
	})
}

/**
 * 绑定下拉框数据
 */
function getCategoryItemList(){

	var categoryItemList = JSON.parse(getGlobalCategoryItemList());
	var projectList = JSON.parse(getGlobalProjectList());
	var sectionList = JSON.parse(getGlobalSectionList());
	secId ="";
	
	// 片区
	$("#categoryItem").empty();
	$("#categoryItem").append("<option value = '0'>全部片区</option>");
	if (categoryItemList.length > 0) {
		for(var i = 0, len = categoryItemList.length; i < len; i++){
			$("#categoryItem").append("<option value = '" + categoryItemList[i].orgId + "'>" + categoryItemList[i].name + "</option>");
		}
	}
	
	// 项目
	$("#projectInfo").empty();
	$("#projectInfo").append("<option value = '0'>全部项目</option>");

	// 标段
	$("#projectSection").empty();
	$("#projectSection").append("<option value = '0'>全部标段</option>");
	
	if (sectionList.length > 0) {
		for(var i = 0, len = sectionList.length; i < len; i++){
			secId = secId + sectionList[i].orgId +',';
		}
		
		if(secId.length > 0){
			secId = secId.substring(0,secId.length-1);
		}
	}
}

/**
 * 获取项目下拉框信息
 */
function getProjectInfoList(cateId){

	var projectList = JSON.parse(getGlobalProjectList());
	var sectionList = JSON.parse(getGlobalSectionList());

	// 项目
	$("#projectInfo").empty();
	$("#projectInfo").append("<option value = '0'>全部项目</option>");

	if (projectList && projectList.length > 0) {
		for(var i = 0, len = projectList.length; i < len; i++){
			
			var project = projectList[i];
			if (project.parentOrgId == cateId) {

				$("#projectInfo").append("<option value = '" + project.orgId + "'>" + project.name + "</option>");
			}
		}
	}

	// 标段
	$("#projectSection").empty();
	$("#projectSection").append("<option value = '0'>全部标段</option>");
	
	secId ="";
	if (sectionList.length > 0) {
		for(var i = 0, len = sectionList.length; i < len; i++){
			secId = secId + sectionList[i].orgId +',';
		}
		
		if(secId.length > 0){
			secId = secId.substring(0,secId.length-1);
		}
	}
}

/**
 * 获取标段下拉框数据
 */
function getProjectSectionList(projectId){

	var sectionList = JSON.parse(getGlobalSectionList());

	// 标段
	$("#projectSection").empty();
	$("#projectSection").append("<option value = '0'>全部标段</option>");
	if (sectionList && sectionList.length > 0) {
		for(var i = 0, len = sectionList.length; i < len; i++){
			
			var section = sectionList[i];
			if (section.parentOrgId == projectId) {

				$("#projectSection").append("<option value = '" + section.orgId + "'>" + section.name + "</option>");
			}
		}
	}
	
	secId ="";
	if (sectionList.length > 0) {
		for(var i = 0, len = sectionList.length; i < len; i++){
			secId = secId + sectionList[i].orgId +',';
		}
		
		if(secId.length > 0){
			secId = secId.substring(0,secId.length-1);
		}
	}
}
