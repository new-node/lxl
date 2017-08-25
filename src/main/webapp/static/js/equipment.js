/**
 * 仪器设备
 *   中国铁路总公司 仪器设备
 *   项目 仪器设备
 *   标段 仪器设备
 *   标段管理员 仪器设备
 */

var isSearchFlg = false;//判断是否点击查询按钮
var isUpdateFlg = false;//判断当前点击按钮时新增还是更新
var cateIdParam,projectInfoIdParam,projectSectionIdParam,proId,secId;//保存点击查询按钮的条件
var equipmentAllData = [];//保存列表数据
var orgTypeFlag;
// 标段管理员标志
var isSectionManager = false;



/**
 * 初始化函数
 */
function initEquipment(orgId, orgType) {

	$("#equipmentModel").hideModal();
	$("#deleteModel").hideModal();

	$(".smEquipment-title-left").hide();
	
	// 中国铁路总公司 仪器设备
	if (orgType == ORG_TYPE.CRC) {

		orgTypeFlag = ORG_TYPE.CRC;
		$("#equipmentOp").hide();
		$(".checkTD").hide();
		getCategoryItemList();
		getAllEquipment('','',secId);
	}
	// 项目 仪器设备
	else if (orgType == ORG_TYPE.PROJECT) {

		orgTypeFlag = ORG_TYPE.PROJECT;
		$("#categoryItem").hide();
		$("#projectInfo").hide();
		$(".treeCheckHide").hide();
		$(".checkTD").hide();

		$("#equipmentOp").hide();

		
		//导航树点击的项目ID
		var projectId = orgId;
	
		getProjectSectionList(projectId);
		projectInfoIdParam = orgId;
		projectSectionIdParam = secId;
		isSearchFlg = true;
		getAllEquipment('', projectId,secId);
	}
	// 标段 仪器设备
	else if (orgType == ORG_TYPE.SECTION) {

		orgTypeFlag = ORG_TYPE.SECTION;
		$("#equipmentOp").hide();
		$(".tablehead").hide();
		$(".checkTD").hide();
		$(".suoshuTD").hide();

		//导航树点击的标段ID
		var sectionId = orgId;
		projectSectionIdParam = orgId;
		isSearchFlg = true;
		getAllEquipment('', '', sectionId);
	}
}

/**
 * 标段管理员 仪器设备
 */
function initManagerEquipment(orgId) {

	$("#equipmentModel").hideModal();
	$("#deleteModel").hideModal();

	$(".tablehead").hide();
	$(".suoshuTD").hide();
	$(".smEquipment-title-left").show();

	// 标段管理员的标段ID
	var sectionId = orgId;
	projectSectionIdParam = orgId;
	isSearchFlg = true;
	isSectionManager = true;
	getAllEquipment("","",projectSectionIdParam);
}

/**
 * 查询按钮点击触发方法
 */
function search(){
	isSearchFlg = true;
	
	// 项目 观测人员
	if (orgTypeFlag == ORG_TYPE.PROJECT) {
		cateIdParam = 0;//片区
		projectInfoIdParam = 0;//项目
		projectSectionIdParam = $("#projectSection").val();//标段
		username = $("#username").val();
	}
	// 标段 观测人员
	else if (orgTypeFlag == ORG_TYPE.SECTION) {
		cateIdParam = 0;//片区
		projectInfoIdParam = 0;//项目
		projectSectionIdParam = 0;//标段
		username = 0;
	}else{
		cateIdParam = $("#categoryItem").val();//片区
		projectInfoIdParam = $("#projectInfo").val();//项目
		projectSectionIdParam = $("#projectSection").val();//标段
		username = $("#username").val();
	}
	

	getAllEquipment(cateIdParam,projectInfoIdParam,projectSectionIdParam);
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
		getAllEquipment(cateIdParam,projectInfoIdParam,projectSectionIdParam,pageNo);
	} else {
		getAllEquipment("","","",pageNo);
	}		
}

/**
 * 查询仪器设备列表
 */
function getAllEquipment(cateId, projectInfoId, projectSectionId, pageNo){
	
	if(projectSectionId == null || projectSectionId == 0){
		projectSectionId = secId;
	}
	
	var param = {"cateId":cateId,"projectInfoId":projectInfoId,"projectSectionId":projectSectionId,"pageNo":pageNo};//参数
	var url = "equipment/getEquipmentList";//路径
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
			
			$("#shebeiList>tbody").empty();
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
			equipmentAllData = data.result.list;
			if(data.result.list!=null){
				for(i = 0;i<data.result.list.length;i++){
					var shebei = data.result.list[i]; 
					var checkupdatedate = "";
					var pianquname =  shebei.pianquname == null?"":shebei.pianquname;
					var projectname = shebei.projectname == null?"":shebei.projectname;
					var biaoduanname = shebei.biaoduanname == null?"":shebei.biaoduanname;
					var name = shebei.name == null?"":shebei.name;
					var equtype = shebei.equtype == null?"":shebei.equtype;
					var equtypename = "";
					if (equtype == "1"){
						equtypename = "水准仪";
					} else {
						equtypename = "全站仪";
					}
					var modelno = shebei.modelno == null?"":shebei.modelno;
					var maker = shebei.maker == null?"":shebei.maker;
					
					var cssStr = ""
					if (shebei.checkupdatetime !=  null){
				        var jiaoyanDate = new Date(shebei.checkupdatetime);
						checkupdatedate =  new Date(jiaoyanDate.getFullYear(),jiaoyanDate.getMonth(),jiaoyanDate.getDate());
						var nowDate = new Date();
						if(checkupdatedate< new Date(nowDate.getFullYear(),nowDate.getMonth(),nowDate.getDate())){
							cssStr = "style='color:red'";
						}
					}
					//向tbody写值
					$("#shebeiList").append(
							"<tr>"+
								"<td class = 'checkTD'><input type = 'checkbox' name = 'equipment' onchange='selectCheckbox()' ></td>"+
	    						"<td>"+(10*(pageNo-1)+1+i)+"</td>"+
								"<td class = 'suoshuTD treeCheckHide'>"+pianquname+"</td>"+
								"<td class = 'suoshuTD treeCheckHide'>"+projectname+"</td>"+
								"<td class = 'suoshuTD biaodunhide'>"+biaoduanname+"</td>"+
								"<td style='word-break:break-all'>"+name+"</td>"+
								"<td  style='word-break:break-all'>"+equtypename+"</td>"+
								"<td  style='word-break:break-all'>"+modelno+"</td>"+
								"<td  style='word-break:break-all'>"+maker+"</td>"+
								"<td  "+cssStr+">"+checkupdatedate.Format("yyyy-MM-dd")+"</td>"+
							"</tr>")
				}
			}
			if (isSectionManager) {
				$(".suoshuTD").hide();
			}
			// 中国铁路总公司 仪器设备
			if (orgTypeFlag == ORG_TYPE.CRC) {
				$(".checkTD").hide();
			}else if (orgTypeFlag == ORG_TYPE.PROJECT) {

				$("#categoryItem").hide();
				$("#projectInfo").hide();
				$(".treeCheckHide").hide();
				$(".checkTD").hide();
				$("#equipmentOp").hide();
			}
			// 标段 仪器设备
			else if (orgTypeFlag == ORG_TYPE.SECTION) {

				$("#equipmentOp").hide();
				$(".tablehead").hide();
				$(".checkTD").hide();
				$(".suoshuTD").hide();
			}
			
			writeTable("tableinfo",totalCount,startNum,pageNo,totalPage,endNum);
		}
	})
}

//单击选择框
function selectCheckbox(){
	var trList = $("#shebeiList>tbody").find("tr");
	var checkflg = false;
	if(trList != null){
		for(i = 0;i<trList.length;i++){
			
			if(!$($(trList[i]).find("input[type = 'checkbox']")).attr("checked")){
				checkflg = true;
				break;
			}
		}
	}
	
	if(checkflg){
		$("#equip").removeAttr("checked");
	}else{
		$("#equip").attr("checked",true);
		
	}
	
}
/**
 * 获取片区下拉框数据
 */
function getCategoryItemList(){
	
	var categoryItemList = JSON.parse(getGlobalCategoryItemList());
	var projectList = JSON.parse(getGlobalProjectList());
	var sectionList = JSON.parse(getGlobalSectionList());
	
	// 片区
	$("#categoryItem").empty();
	$("#categoryItem").append("<option value = '0'>全部片区</option>");
	secId = "";
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

	secId ="";
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

	secId ="";
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

/**
 * 全选
 */
function selectAll(){
	var trList = $("#shebeiList>tbody").find("tr");
	if ($("#equip").attr("checked") && trList != null){
		
		for(i = 0;i<trList.length;i++){
			$($(trList[i]).find("input[type = 'checkbox']")).attr("checked",'true')
		}
	} else {
		if(trList != null){
			for(i = 0;i<trList.length;i++){
				$($(trList[i]).find("input[type = 'checkbox']")).removeAttr("checked")
			}
		}
	}
}

/**
 * 打开模态框
 */
function openModel(domid,clickbtn){
	var isSelect = false;
	var trList = $("#shebeiList>tbody").find("tr");
	if (domid == "equipmentModel" && clickbtn == "0"){
		isUpdateFlg = false;
	}else if (domid == "deleteModel" && trList != null){
		for(i = 0;i<trList.length;i++){
			if ($($(trList[i]).find("input[type = 'checkbox']")).is(':checked')){
				isSelect  = true;
				break;
			}
		}
		if (!isSelect){
			alert("请选择数据");
			return;
		}
	}else if (domid == "equipmentModel" && clickbtn == "1"){
		isUpdateFlg = true;
		var trList = $("#shebeiList>tbody").find("tr");
		var updateEquipment = {};
		var count = 0;
		if(trList != null){
			for(i = 0;i<trList.length;i++){
				if ($($(trList[i]).find("input[type = 'checkbox']")).is(':checked')){
					//datumPointAll[i].useflag = "0";
					updateEquipment = equipmentAllData[i];
					count++;
				}
			}
		}
		
		if (count == 0||count>1){
			alert("请选中一条数据");
			count = 0
			return;
		}
		$("#shebeiname").val(updateEquipment.name);
		$("#type").val(updateEquipment.equtype);
		$("#xinghao").val(updateEquipment.modelno);
		$("#changshang").val(updateEquipment.maker);
		$("#dater").val(new Date(updateEquipment.checkupdatetime).Format("yyyy-MM-dd"));
	} else {
		if (!isSelect){
			return;
		}
	}
	if(clickbtn == "0"){
		$("#modelTitle").text("新增设备");
	}else{
		$("#modelTitle").text("设备信息编辑");
	}
	
	$("#"+domid).showModal();
}

/**
 * 关闭模态框方法
 */
function closeModel(domid){
	$("#shebeiname").val("");
	$("#type").val("1");
	$("#xinghao").val("");
	$("#changshang").val("");
	$("#dater").val("");
	$("#"+domid).hideModal();
}

/**
 * 日期插件
*/
$(function(){
	$("#dater").jcDate({
		IcoClass : "jcDateIco",
		Event : "click",
		Speed : 100,
		Left : 0,
		Top : 28,
		format : "-",
		Timeout : 100
   });

})

/**
 * 调用后台更新DB的方法
 */
function addEquipment(){
	if (isUpdateFlg){//更新操作
		$("#modelTitle").text("设备信息编辑");
		updateEquipment();
		
	} else {
		$("#modelTitle").text("新增设备");
		insertEquipment();
	}
}

/**
 * 插入数据
 */
function insertEquipment(){
	var url = "equipment/addEquipment";
	var date;
	if($("#dater").val()!=""){
		if(dateCheck($("#dater").val())){

		}else{
			alert("日期格式不正确！");
			return;
		}
		date = new Date($("#dater").val().replace('-','/'));
	}else{
		alert("日期不能为空");
		return;
	}
	var shebeiname = $("#shebeiname").val();
	if(shebeiname==null || $.trim(shebeiname) == ""){
		alert("设备名称不能为空");
		return;
	}
	var xinghao = $("#xinghao").val();
	if(xinghao==null || $.trim(xinghao)==""){
		alert("型号不能为空");
		return;
	}
	var changshang = $("#changshang").val();
	if(changshang==null||$.trim(changshang)==""){
		alert("厂商不能为空");
		return;
	}
	
	var param  = {
			"shebeiname":$("#shebeiname").val(),
			"type":$("#type").val(),
			"xinghao":$("#xinghao").val(),
			"changshang":$("#changshang").val(),
			"dater":date.getTime(),
			"biaoduan":getManagerOrgId(),
			"pianqu":getManagerCategoryItemId(),
			"xiangmu":getManagerProjectId()
			}
	$.ajax({
		async : false,//是否异步
		//cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
		url :url,//请求的actio//n路径
		data:param,
		error : function(){
			
		},
		success : function (data){
			
			$("#equipmentModel").hideModal();
			clearData();
			getAllEquipment(cateIdParam,projectInfoIdParam,projectSectionIdParam);
		}
	})
}

/**
 * 更新数据
 */
function updateEquipment(){
	var url = "equipment/updateEquipment";
	var trList = $("#shebeiList>tbody").find("tr");
	var updateEquipment = [];
	var date = new Date($("#dater").val());
	var shebeiname = $("#shebeiname").val();
	if(shebeiname==null || $.trim(shebeiname) == ""){
		alert("设备名称不能为空");
		return;
	}
	var xinghao = $("#xinghao").val();
	if(xinghao==null || $.trim(xinghao)==""){
		alert("型号不能为空");
		return;
	}
	var changshang = $("#changshang").val();
	if(changshang==null||$.trim(changshang)==""){
		alert("厂商不能为空");
		return;
	}
	if(trList != null){
		for(i = 0;i<trList.length;i++){
			if ($($(trList[i]).find("input[type = 'checkbox']")).is(':checked')){
				
				//datumPointAll[i].useflag = "0";
				equipmentAllData[i].name = $("#shebeiname").val();
				equipmentAllData[i].equtype = $("#type").val();
				equipmentAllData[i].modelno = $("#xinghao").val();
				equipmentAllData[i].maker = $("#changshang").val();
				equipmentAllData[i].checkupdatetime = date.getTime();
				updateEquipment.push(equipmentAllData[i]);
				break;
			}
		}
	}
	
	var param = {"updateEquipmentStr":JSON.stringify(updateEquipment)}
	$.ajax({
		async : false,//是否异步
		//cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
		url :url,//请求的actio//n路径
		data:param,
		error : function(){
			
		},
		success : function (data){			
			$("#equipmentModel").hideModal();
			clearData();
			getAllEquipment(cateIdParam,projectInfoIdParam,projectSectionIdParam);
		}
	})
}

/**
 * 逻辑删除数据
 */
function deleteEquipment(){
	var url = "equipment/updateEquipment";
	var deleteEquipment = [];
	var trList = $("#shebeiList>tbody").find("tr");
	if(trList != null){
		for(i = 0;i<trList.length;i++){
			
			if ($($(trList[i]).find("input[type = 'checkbox']")).is(':checked')){
				
				equipmentAllData[i].useflag = "1";
				deleteEquipment.push(equipmentAllData[i]);
				console.log(equipmentAllData[i])
			}
		}
	}
	
	var param = {"updateEquipmentStr":JSON.stringify(deleteEquipment)};
	$.ajax({
		async : false,//是否异步
		//cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
		url :url,//请求的actio//n路径
		data:param,
		error : function(){
			alert(4)
		},
		success : function (data){	
			console.log(data);
			$("#deleteModel").hideModal();
			clearData();
			getAllEquipment(cateIdParam,projectInfoIdParam,projectSectionIdParam);
		}
	})
}

function clearData(){
	$("#shebeiname").val("");
	$("#xinghao").val("");
	$("#changshang").val("");
	$("#dater").val("");
	$("#type").val("1");
}
//验证日期
function dateCheck(RQ) {
	var date;
	if (RQ.length == 8 && RQ.indexOf("-") == -1 && RQ.indexOf('/') == -1) {
		date = RQ.substr(0, 4) + '-' + RQ.substr(4, 2) + '-'
				+ RQ.substr(6, 2);
	}else{
		date = RQ;
	}
	var result = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
	if (result == null)
		return false;
	var d = new Date(result[1], result[3] - 1, result[4]);

	return (d.getFullYear() == result[1] && (d.getMonth() + 1) == result[3] && d
			.getDate() == result[4]);

}