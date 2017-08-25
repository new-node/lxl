/**
 * <p>Description: 组织导航树</p>
 *
 * @author sunjiashu（2017年3月9日 下午15:41:55）
 *
 * @version:1.0.0
 */
// 组织结构树ID
var orgTreeId = "orgTree";
// 组织结构树数据保存用隐藏控件ID
var orgTreeData = {};
// 资源(菜单)角色列表
var resRoleList = [];
var preTime=0;
var tid="";
/**
 * ZTree设置
 */
var setting = {
	view : {
		showIcon: false,	// 不显示图标
		nameIsHTML: true,	// 允许节点名称支持 HTML 内容
		showTitle: false,	// 不显示提示信息Tooltip
		showLine : false,
		selectedMulti : false,	// 单选
		dblClickExpand : false
	},
	data : {
		key : {
			name : "name"
		},
		simpleData : {
			enable : true,	// 简单数据 根据idKey和pIdKey来确定父子关系
			idKey : "id",	// 节点ID的属性名(和POJO类里的属性一致)
			pIdKey : "pid", // 父节点ID的属性名(和POJO类里的属性一致)
			rootPId : 0		// 根节点的父节点ID
		}
	},
	callback : {

		onClick : clickNode
	}
	
};


/**
 * 初始化
 * 
 */
$(function(){

	var articleH = document.documentElement.clientHeight;
	// 获取可见区域的高度
	var h = articleH - 99;

	// 设定树的高度
	/*$('#left-menu').css('height', h);*/
	document.getElementById('left-menu').style.height = h + 'px';
	
	// 右侧内容区域的高度
	/*$(".echart-region").css('height', h);*/
	document.getElementById('echartRegionFirst').style.height = h + 'px';
	
}); 


/**
 * 初始化组织导航树
 * 
 */

function initTree() {

	// 获取登陆用户的资源(菜单)
	// !!同步方式获取!!
	getResourceRole();

	// 有权限信息
	if (resRoleList.length >= 1) {
		// 初始化组织导航树
		getOrgTree();
	}
}

/**
 * 初始化组织导航树
 */
function getOrgTree() {
	
	$.ajax({
		async : true,					//是否异步
		//cache : false,				//是否使用缓存
		type : 'POST',					//请求方式：post
		dataType : 'json',				//数据传输格式：json
		url : "getOrgTree",				//请求的actio//n路径
		error : function() {
			//$.messager.alert('提示', '请求失败！', 'error');
		},
		success : function(data) { 	//请求成功后处理函数
			
			// 组织结构树数据获取失败 或者 无结果 情况
			if (data.code != 0 || data.result.length == 0) {

//				$('.main-sidebars').show();
				$('#resultMessage').html("无法获取用户的连续梁数据.");
				return;
			}
			
			// 节点属性设置
			var nodes = data.result;	
			
			// 设置节点属性
			setNodeAttr(nodes);
			
			$('#resultMessage').html("");
			// 显示树
			$('.main-sidebars').show();

			// 保存组织结构树数据
			orgTreeData = nodes;
			
			// 表示组织结构树
			var t = $("#" + orgTreeId);
			var treeObj = $.fn.zTree.init(t, setting, nodes);
			
			// 树初始化后, 保存顶级节点下的条件
			var treeNodes = treeObj.getNodes();
			saveCondition(treeNodes[0]);
			
			// 加载菜单导航后 加载菜单 加载页面
			$('#menuNav').load("homeMenuNav", {}, function(){
				eval('initMenuNav()');

				// 加载菜单 加载页面
				loadMenuPageForNode(nodes);
			});
		}
	});
}

/**
 * 节点属性设置 获取下拉框绑定用数据
 *  图标等
 *  
 * @param nodes
 */
function setNodeAttr(nodes) {

	var loginType = getLoginType();

	//显示折叠
	for (var i = 0; i < nodes.length; i++) {
		
		// 追加属性,用于查找
		nodes[i].text = nodes[i].name;
		
		// 中国铁路总公司
		if (nodes[i].type == ORG_TYPE.CRC) {

			nodes[i].open = true;
			nodes[i].isParent = true;
		}
		// 片区
		else if (nodes[i].type == ORG_TYPE.CATEGORY_ITEM) {

			nodes[i].open = true;
			nodes[i].isParent = true;
		}
		// 项目
		else if (nodes[i].type == ORG_TYPE.PROJECT) {

			// 建设单位级用户
			// 指挥部级用户
			if (USER_LOGIN_TYPE.CONSTRUCTION == loginType
				|| USER_LOGIN_TYPE.HEADQUARTERS_USER == loginType) {

				nodes[i].open = true;
			} else {

				nodes[i].open = false;
			}
			
			nodes[i].isParent = true;
			setWarnStyle(nodes[i]);
		}
		// 标段
		else if (nodes[i].type == ORG_TYPE.SECTION) {

			// 标段级用户
			if (USER_LOGIN_TYPE.SECTION_USER == loginType) {

				nodes[i].open = true;
			} else {

				nodes[i].open = false;
			}
			
			nodes[i].isParent = true;
			setWarnStyle(nodes[i]);
		}
		// 连续梁
		else if (nodes[i].type = ORG_TYPE.CON_BEAM) {

			nodes[i].open = true;
			
			nodes[i].isParent = false;
			setWarnStyle(nodes[i]);
		}
		
	}
}

/**
 * 点击事件
 */
function clickNode(event, treeId, node) {
	
//	debugger;
	Today = new Date(); 
	var NowHour = Today.getHours();
//	alert("NowHour：：："+NowHour);
	var NowMinute = Today.getMinutes(); 
//	alert("NowMinute：：："+NowMinute);
	var NowSecond = Today.getSeconds(); 
//	alert("NowSecond：：："+NowSecond);
	var mysec = (NowHour*3600)+(NowMinute*60)+NowSecond;
//	alert("preTime::::"+preTime + "mysec:::::"+mysec);
	//600只是一个时间值，就是5分钟内禁止重复提交，值随你高兴设 
	var tId=node.tId;
	if((mysec-preTime)>5 || tid!=tId){ 
//		debugger;
		preTime=mysec;
		tid=tId;
			//连续梁模态框隐藏
	//		$("#ldinfo").hide();
	//		clearTimeout(functiontime);
	//		clearTimeout(functionY);
		//	
			// 保存右侧检索条件
			saveCondition(node);
			
			// 片区 无响应
			if (node.type == ORG_TYPE.CATEGORY_ITEM) { return; }
	
			// 保存到隐藏项目
			setOrgId(node.orgId);
			setOrgType(node.type);
			setOrgName(node.text);
			// 项目ID
			if (node.type == ORG_TYPE.PROJECT) { setProjectId(node.orgId); }
			// 标段 项目ID 标段ID
			if (node.type == ORG_TYPE.SECTION) { setProjectId(node.parentOrgId); setSectionId(node.orgId); }
			// 连续梁
			if (node.type == ORG_TYPE.CON_BEAM) { 
				
				// 连续梁的父节点是标段 标段的父节点是项目
				var p = node.getParentNode().getParentNode();
				if (p) {
					setProjectId(p.orgId);
				}
			}
			
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
			
	//		console.log(data);
			// 加载菜单 加载页面
			loadMenuPage(data);
		} 
		else 
		{ 
//			alert(' 按一次就够了，请勿重复提交！请耐心等待！谢谢合作！'); 
			return false; 
		} 
	
	
}

/**
 * 保存右侧检索条件
 */
function saveCondition(node) {
	
	
	// 片区列表
	var categoryItemList = [];
	// 项目列表
	var projectList = [];
	// 标段列表
	var sectionList = [];
	// 标段列表
	var conBeamList = [];

	// 中国铁路总公司
	if (node.type == ORG_TYPE.CRC) {

		//显示折叠
		for (var i = 0; i < orgTreeData.length; i++) {
			
			//*****************************************************************
			// 获取组织数据
			var org = {};
			org.orgId = orgTreeData[i].orgId;
			org.name = orgTreeData[i].text;
			org.type = orgTreeData[i].type;
			org.parentOrgId = orgTreeData[i].parentOrgId;

			// 片区 追加到片区列表
			if (org.type == ORG_TYPE.CATEGORY_ITEM) { categoryItemList.push(org); }
			// 项目 追加到项目列表
			if (org.type == ORG_TYPE.PROJECT) { projectList.push(org); }
			// 标段 追加到标段列表
			if (org.type == ORG_TYPE.SECTION) { sectionList.push(org); }
			// 连续梁 追加到连续梁列表
			if (org.type == ORG_TYPE.CON_BEAM) { conBeamList.push(org); }
		}

		// 转化为JSON
		var jsonCategoryItemList = JSON.stringify(categoryItemList);
		var jsonProjectList = JSON.stringify(projectList);
		var jsonSectionList = JSON.stringify(sectionList);
		var jsonConBeamList = JSON.stringify(conBeamList);
		
		// 下拉框 保存到隐藏项目
		// 片区
		setGlobalCategoryItemList(jsonCategoryItemList);
		// 项目
		setGlobalProjectList(jsonProjectList);
		// 标段
		setGlobalSectionList(jsonSectionList);
		
		// 右侧画面查找条件 保存到隐藏项目
		// 片区
		setConditionCategoryItemList(jsonCategoryItemList);
		// 项目
		setConditionProjectList(jsonProjectList);
		// 标段
		setConditionSectionList(jsonSectionList);
		// 连续梁
		setConditionConBeamList(jsonConBeamList);
		
		return;
	}
	
	// 项目
	if (node.type == ORG_TYPE.PROJECT) {
		
		// 项目下的标段
		for(var i = 0, len = node.children.length; i < len; i++) {

			var child = node.children[i];
			if (child) {
				
				// 获取组织数据
				var org = {};
				org.orgId = child.orgId;
				org.name = child.text;
				org.type = child.type;
				org.parentOrgId = child.parentOrgId;
				// 追加到标段列表
				sectionList.push(org);
				
				// 标段下的连续梁
				for(var j = 0, lenSec = child.children.length; j < lenSec; j++) {
	
					var grandChild = child.children[j];
					if (grandChild) {
						
						// 获取组织数据
						var org2 = {};
						org2.orgId = grandChild.orgId;
						org2.name = grandChild.text;
						org2.type = grandChild.type;
						org2.parentOrgId = grandChild.parentOrgId;
						// 追加到连续梁列表
						conBeamList.push(org2);
					}
				}
			}
		}

		// 标段
		var jsonSectionList = JSON.stringify(sectionList);
		setGlobalSectionList(jsonSectionList);
		setConditionSectionList(jsonSectionList);
		// 连续梁
		var jsonConBeamList = JSON.stringify(conBeamList);
		setConditionConBeamList(jsonConBeamList);
		return;
	}
	
	// 标段
	if (node.type == ORG_TYPE.SECTION) {
		
		// 标段下的连续梁
		for(var i = 0, len = node.children.length; i < len; i++) {

			var child = node.children[i];
			if (child) {

				// 获取组织数据
				var org = {};
				org.orgId = child.orgId;
				org.name = child.text;
				org.type = child.type;
				org.parentOrgId = child.parentOrgId;
				// 追加到连续梁列表
				conBeamList.push(org);
			}
		}

		// 连续梁
		var jsonConBeamList = JSON.stringify(conBeamList);
		setConditionConBeamList(jsonConBeamList);
		return;
	}
}

/**
 * 菜单权限
 * 页面加载
 * 
 *   * 方法为同步
 */
function getResourceRole() {

	var url = "getResourceRole";
	var dat = {};
	
	$.ajax({
		url : url,
		data : dat,
		async : false,		// 同步
		type : 'POST',
		dataType : 'json',
		error : function() {
		},
		success : function(datRes) { 	//请求成功后处理函数
			
			var roleList = datRes.result;
			if (!roleList || roleList.length == 0) {

				// 资源 菜单列表
				resRoleList = [];
				alert("用户没有对应等级的权限!");
				return;
			}
			
			// 资源 菜单列表
			resRoleList = [];
			for (var i = 0, len = roleList.length; i < len; i++) {
				
				var resId = roleList[i].resId;
				var resOrgType = roleList[i].orgType;
				var resRole = {};
				
				switch (resId) {
					// 中心首页
					case RESOURCE_DATA.CENTER_HOME:
						resRole = { ctrlId : MENU_LINK_ID.CENTER_HOME, orgType : resOrgType }; break;
					// 中心 观测人员
					case RESOURCE_DATA.CENTER_OBSERVER:
						resRole = { ctrlId : MENU_LINK_ID.CENTER_OBSERVER, orgType : resOrgType }; break;
					// 中心 仪器设备
					case RESOURCE_DATA.CENTER_EQUIPMENT:
						resRole = { ctrlId : MENU_LINK_ID.CENTER_EQUIPMENT, orgType : resOrgType }; break;
					
					// 项目首页
					case RESOURCE_DATA.PROJECT_HOME:
						resRole = { ctrlId : MENU_LINK_ID.PROJECT_HOME, orgType : resOrgType }; break;
					// 项目 观测人员
					case RESOURCE_DATA.PROJECT_OBSERVER:
						resRole = { ctrlId : MENU_LINK_ID.PROJECT_OBSERVER, orgType : resOrgType }; break;
					// 项目 仪器设备
					case RESOURCE_DATA.PROJECT_EQUIPMENT:
						resRole = { ctrlId : MENU_LINK_ID.PROJECT_EQUIPMENT, orgType : resOrgType }; break;
					
					// 标段首页
					case RESOURCE_DATA.SECTION_HOME:
						resRole = { ctrlId : MENU_LINK_ID.SECTION_HOME, orgType : resOrgType }; break;
					// 标段 观测人员
					case RESOURCE_DATA.SECTION_OBSERVER:
						resRole = { ctrlId : MENU_LINK_ID.SECTION_OBSERVER, orgType : resOrgType }; break;
					// 标段 仪器设备
					case RESOURCE_DATA.SECTION_EQUIPMENT:
						resRole = { ctrlId : MENU_LINK_ID.SECTION_EQUIPMENT, orgType : resOrgType }; break;
					
					// 连续梁首页
					case RESOURCE_DATA.CON_BEAM_HOME:
						resRole = { ctrlId : MENU_LINK_ID.CON_BEAM_HOME, orgType : resOrgType }; break;
					// 连续梁 偏差超限
					case RESOURCE_DATA.CON_BEAM_DEVIATION_OVERRUN:
						resRole = { ctrlId : MENU_LINK_ID.CON_BEAM_DEVIATION_OVERRUN, orgType : resOrgType }; break;
					// 连续梁 测量信息
					case RESOURCE_DATA.CON_BEAM_MEASUREINFO:
						resRole = { ctrlId : MENU_LINK_ID.CON_BEAM_MEASUREINFO, orgType : resOrgType }; break;
					// 连续梁 梁段测点
					case RESOURCE_DATA.CON_BEAM_LDSTATION:
						resRole = { ctrlId : MENU_LINK_ID.CON_BEAM_LDSTATION, orgType : resOrgType }; break;
					// 连续梁 基点信息
					case RESOURCE_DATA.CON_BEAM_DATUMPOINT:
						resRole = { ctrlId : MENU_LINK_ID.CON_BEAM_DATUMPOINT, orgType : resOrgType }; break;
					// 连续梁 维护理论值
					case RESOURCE_DATA.CON_BEAM_THEORETICAL:
						resRole = { ctrlId : MENU_LINK_ID.CON_BEAM_THEORETICAL, orgType : resOrgType }; break;
					
					default: break;
				}
				
				// 追加到资源(菜单)角色列表
				if (resRole.orgType) {
					resRoleList.push(resRole);
				}
			}

		}
	});
}

/**
 * 初始化加载时 取顶级节点对应的数据
 * @param nodes - 所有节点
 */
function loadMenuPageForNode(nodes) {
	
	// 使用顶级节点的信息
	var nodeTop = nodes[0];
	var loginType = getLoginType();
	
	// 保存到隐藏项目
	setOrgId(nodeTop.orgId);
	setOrgType(nodeTop.type);
	setOrgName(nodeTop.text);
	
	// 建设单位级用户
	// 指挥部级用户
	if (USER_LOGIN_TYPE.CONSTRUCTION == loginType
		|| USER_LOGIN_TYPE.HEADQUARTERS_USER == loginType) {
		
		setProjectId(nodeTop.orgId);
	}
	
	// 标段级用户
	if (USER_LOGIN_TYPE.SECTION_USER == loginType) {
		setProjectId(nodeTop.parentOrgId);
		setSectionId(nodeTop.orgId);
	}
	
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
	
//	console.log(data);
	loadMenuPage(data);
}

/**
 * 加载菜单
 * @param data
 */
function loadMenuPage(data) {
	
	// 全隐藏
	$("#menuLink>li").each(function(){
		$(this).hide();
	});
	
	// 资源(菜单)列表各元素循环
	var firstMenuId = "";
	for (var i = 0, len = resRoleList.length; i < len; i++) {
		
		var resRole = resRoleList[i];
		if (resRole.orgType == data.orgType) {

			// 显示 组织机构对应的菜单
			$('#' + resRole.ctrlId).show();

			// 各级别下第一个显示的菜单
			if (firstMenuId == "") {
				
				firstMenuId = resRole.ctrlId;
			}
		}
	}

//	console.log(firstMenuId);
//	// 清空加载信息
//	$('#mainContent').html('');
	// 加载第一个菜单
	if (firstMenuId != "") {
		loadPage(data, firstMenuId);
	} else {
		$('#mainContent').html('');
	}
}

/**
 * 查找组织结构节点
 */
function searchOrg() {

	// 重新绑定组织结构树的数据
	var treeData = orgTreeData;
	var zTreeObj =$.fn.zTree.init($('#' + orgTreeId), setting, treeData);
	
	// 查找条件项目
	var conditionType = $('#orgConditionType').val();
	// 查找条件
	var nodesFilter;

	// 桥名
	if (conditionType == 0) {

		// 按照定义规则查找
		nodesFilter = zTreeObj.getNodesByFilter(filterName);	
	}
	
	// 跨度
	if (conditionType == 1) {

		// 按照定义规则查找
		nodesFilter = zTreeObj.getNodesByFilter(filterMainLength);	
	}

	if (!nodesFilter){ return; }
	
	// 查找并显示
	showNodesFilter(orgTreeId, nodesFilter, treeData);
}

/**
 * 按条件查找节点，显示符合条件的目标节点（包括该节点的子节点，子节点可能不符合条件），隐藏其它节点
 * JS依赖
 *   jquery.ztree.core.js
 *   jquery.ztree.exhide.js
 * @param zTree
 * @param nodesFilter
 * @param treeData - JSON.parse(Tree的数据源的JSON字符串);
 */
function showNodesFilter(zTreeId, nodesFilter, treeData){

	// 目标节点列表
	var showNodes = [];
	var idAll = [];
	var k = 0;
	
	// 递归查找父节点至根节点，取得目标节点ID
	for(var i = 0, l = nodesFilter.length; i < l; i++) {

		var node = nodesFilter[i];

		// 符合条件的节点ID
		idAll[k] = node.id;
		k++;

		// 递归查找父节点至根节点
		while(node.getParentNode()) {

			var p = node.getParentNode();
			if ($.inArray(p.id, idAll) < 0) {
				
				// 保存ID
				idAll[k] = p.id;
				k++;
			}
			
			// 递归获取父节点
			node = node.getParentNode();
		}
	}

	// 递归查找子节点至叶子节点，取得目标节点ID
	for(var i = 0, l = nodesFilter.length; i < l; i++) {

		var node = nodesFilter[i];

		// 递归查找子节点至叶子节点
		while(node.children) {

			var nodeChildren = node.children;
			for (var j = 0, lChild = nodeChildren.length; j < lChild; j++) {
				
				if ($.inArray(nodeChildren[j], idAll) < 0) {
					
					// 保存ID
					idAll[k] = nodeChildren[j].id;
					k++;
				}
			}

			// 递归获取子节点
			node = node.children;
		}
	}	
	
	// 目标节点(去除目标外节点)
	var loginType = getLoginType();
	var showData = [];
	var iShow = 0;
	for(var i = 0, l = treeData.length; i < l; i++) {

		var node = treeData[i];
		
		// 目标节点
		if ($.inArray(node.id, idAll) >= 0) {
			showData[iShow] = treeData[i];
			
			// 展开状态
			showData[iShow].open = true;
			
			iShow++;
		}
	}

	// 无结果的情况
	if (showData.length == 0) {
		
		$('#resultMessage').html("没有符合搜索条件的数据.");
	} else {

		$('#resultMessage').html("");
	}
		
	// ZTree表示
	$.fn.zTree.init($('#' + zTreeId), setting, showData);
}

/**
 * 桥名过滤器
 * 
 * @param node - 节点
 * @returns {Boolean}
 */
function filterName(node) {

	// 查找条件项目值
	var nameValue = $('#orgConditionName').val();

	// 所有
	if ($.trim(nameValue) == "") {
		return true;
	}
	
	// 连续梁
	if (node.type != ORG_TYPE.CON_BEAM) {
		return false;
	}
	
	// 模糊查找
	if (node.text.indexOf(nameValue) >= 0) {
	
		return true;
	}
	
	return false;
}

/**
 * 主跨跨度过滤器
 * 
 * @param node - 节点
 * @returns {Boolean}
 */
function filterMainLength(node) {

	// 查找条件项目值
	var mainLengthConditionValue = $('#orgConditionMainLength').val();

	// 所有
	if (mainLengthConditionValue == 0) {
		return true;
	}

	// 只有连续梁设置了主跨跨度
	// 主跨跨度没有的数据不显示
	if (!node.mainKdLength) {
		return false;
	}
	// 转换为数值
	var mainLength = parseFloat(node.mainKdLength);
	
	// ＜60
	if (mainLengthConditionValue == 1) {
		return mainLength < 60.0;
	}
	// 60～80
	if (mainLengthConditionValue == 2) {
		return mainLength >= 60.0 && mainLength < 80.0;
	}
	// 80～100
	if (mainLengthConditionValue == 3) {
		return mainLength >= 80.0 && mainLength < 100.0;
	}
	// 100～120
	if (mainLengthConditionValue == 4) {
		return mainLength >= 100.0 && mainLength < 120.0;
	}
	// ＞120
	if (mainLengthConditionValue == 5) {
		return mainLength > 120.0;
	}

	return false;
}

/**
 * 查找条件项目切换
 */
function showCondition() {

	// 查找条件项目
	var conditionType = $('#orgConditionType').val();
	
	// 桥名
	if (conditionType == 0) {
		$('#orgConditionMainLength').hide();
		$('#orgConditionName').show();
		return;
	}

	// 主跨跨度
	if (conditionType == 1) {
		$('#orgConditionName').hide();
		$('#orgConditionMainLength').show();
		return;
	}
}

/**
 * 节点文本和样式
 *   偏差超限数 + 节点名
 * 
 * @param node
 * @returns {String}
 */
function setWarnStyle(node) {
	
	// 节点样式
	var span = '<span style="' + "font-family:'Arial Negreta', 'Arial Normal', 'Arial';font-weight:700;color:WARN_COLOR;" +  '">[CNT_WARN]</span>';
	
	// 偏差超限数 > 0 绿字
	if (node.cntWarn > 0) {
		span = span.replace("WARN_COLOR", "#FF0000");
	}
	// 之外 红字
	else {
		span = span.replace("WARN_COLOR", "#008000");
	}

	node.name = span.replace("CNT_WARN", node.cntWarn) + node.name;
}
