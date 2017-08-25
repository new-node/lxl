/**
 * 主页
 */

/**
 * 初始化
 */
$(function() {
	/*****************************隐藏模态框 start*********************************/
//	$("#addDatumPoint").hideModal();//新增基点模态框隐藏
//	$("#updateDatumPoint").hideModal();//更新基点模态框隐藏
//	$("#deleteDatumPoint").hideModal();//删除基点模态框隐藏
//	$("#watchRecord").hideModal();//查看修正记录模态框隐藏
	
	//处理措施
	$("#dealPlan").val('');
	//联系电话
	$("#dealPhone").val('');
	//备注
	$("#dealRemark").val('');
//	$("#modalDiv").hideModal();
//	//隐藏处置详情画面
//	$("#detailModalDiv").hideModal();
//	
//	//新增或更新仪器设备模态框
//	$("#equipmentModel").hideModal();
//	//废除仪器设备模态框
//	$("#deleteModel").hideModal();
//	//偏差超限模态框,连续梁也米娜
//	$("#piancha").hideModal();
//	//施工工况模态框
//	$("#sggsDiv").hideModal();
//	//梁段信息模态框，连续梁页面
//	$("#ldinfo").hideModal();
//	
//	//待办事项模态框
//	$("#dbsxDivMore").hideModal();
//	//偏差信息模态框
//	$("#warnInfoListDiv").hideModal();
//	//异常信息模态框
//	$("#exceptionListDiv").hideModal();
//	//测点修正模态框
//	$("#cedian-Update").hideModal();
//	//测点信息修正记录模态框
//	$("#cedian-Record").hideModal();
	/*****************************隐藏模态框 end*********************************/
	
	/*弹窗的拖拽*/
	$(function(){
		$('.managementPage').draggable({handle:'div.managementHead'});
		
	});

	/*弹窗的拖拽*/
	$(function(){
		$('.warnManagementPage').draggable({handle:'div.managementHead'});
	});
	$(function(){
		$('.cdUpdatePage').draggable({handle:'div.managementHead'});
	});
	/*弹窗的拖拽*/
	$(function(){
		$( ".ldWarnInfoDiv" ).draggable({handle:'div.managementHead'});
	});
	$(function(){
		$( ".cdUpdatePage" ).draggable({handle:'div.managementHead'});
	});
	$(function(){
		$( ".RecordPage" ).draggable({handle:'div.managementHead'});
	});
	/*弹窗的拖拽*/
	$(function(){
		$('.ldExceptionInfoDiv').draggable({ handle: "div.managementHead" });
	});
	
	// 加载组织结构树
	$('#menuOrgTree').load("showOrgTree", {}, function(){
		eval('initTree()');
	});
});

/**
 * 用户退出登陆
 */
function logout(){
	
	var msg = "确认要退出吗？";
	
	if (confirm(msg) == true){
		
		window.location.href = "logout";
		return true;
	}else{
		
		return false;
	}
}

/**
 * 用户登陆名
 */
function getGlobalAccount() { return $('#globalAccount').val(); }
function setGlobalAccount(orgId) { return $('#globalAccount').val(orgId); }
/**
 * 用户姓名
 */
function getGlobalUserName() { return $('#globalUserName').val(); }
function setGlobalUserName(orgId) { return $('#globalUserName').val(orgId); }
/**
 * 组织ID
 */
function getOrgId() { return $('#orgId').val(); }
function setOrgId(orgId) { return $('#orgId').val(orgId); }
/**
 * 组织类型
 */
function getOrgType() { return $('#orgType').val(); }
function setOrgType(orgType) { $('#orgType').val(orgType); }
/**
 * 组织名称
 */
function getOrgName() { return $('#orgName').val(); }
function setOrgName(orgName) { return $('#orgName').val(orgName); }
/**
 * 用户登陆类型
 */
function getLoginType() { return $('#loginType').val(); }
function setLoginType(loginType) { return $('#loginType').val(loginType); }
/**
 * 项目ID(标段用户用)
 */
function getProjectId() { return $('#projectId').val(); }
function setProjectId(projectId) { return $('#projectId').val(projectId); }
/**
 * 标段ID(标段用户用)
 */
function getSectionId() { return $('#sectionId').val(); }
function setSectionId(sectionId) { return $('#sectionId').val(sectionId); }
/**
 * 片区一览(下拉框绑定用)
 */
function getGlobalCategoryItemList() { return $('#globalCategoryItemList').val(); }
function setGlobalCategoryItemList(catagoryItemList) { return $('#globalCategoryItemList').val(catagoryItemList); }
/**
 * 项目一览(下拉框绑定用)
 */
function getGlobalProjectList() { return $('#globalProjectList').val(); }
function setGlobalProjectList(projectList) { return $('#globalProjectList').val(projectList); }
/**
 * 标段一览(下拉框绑定用)
 */
function getGlobalSectionList() { return $('#globalSectionList').val(); }
function setGlobalSectionList(sectionList) { return $('#globalSectionList').val(sectionList); }
/**
 * 片区一览(右侧检索条件, 点击组织导航树节点后设置)
 */
function getConditionCategoryItemList() { return $('#conditionCategoryItemList').val(); }
function setConditionCategoryItemList(catagoryItemList) { return $('#conditionCategoryItemList').val(catagoryItemList); }
/**
 * 项目一览(右侧检索条件, 点击组织导航树节点后设置)
 */
function getConditionProjectList() { return $('#conditionProjectList').val(); }
function setConditionProjectList(projectList) { return $('#conditionProjectList').val(projectList); }
/**
 * 标段一览(右侧检索条件, 点击组织导航树节点后设置)
 */
function getConditionSectionList() { return $('#conditionSectionList').val(); }
function setConditionSectionList(sectionList) { return $('#conditionSectionList').val(sectionList); }
/**
 * 连续梁一览(右侧检索条件, 点击组织导航树节点后设置)
 */
function getConditionConBeamList() { return $('#conditionConBeamList').val(); }
function setConditionConBeamList(sectionList) { return $('#conditionConBeamList').val(sectionList); }
