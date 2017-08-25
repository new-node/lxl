// 组织结构树ID
// 组织类型
var ORG_TYPE = {
	CRC      : "0",			// 中国铁路总公司
	CATEGORY_ITEM  : "1",	// 片区
	PROJECT  : "2",			// 项目
	SECTION  : "3",			// 标段
	CON_BEAM : "4"			// 连续梁
};


//用户登陆类型
var USER_LOGIN_TYPE = {
	CENTER_MANAGER : "0",		// 中心级管理员
	CENTER : "1",				// 中心级用户
	CONSTRUCTION : "2",			// 建设单位级用户
	CONSTRUCTION_MANAGER : "7",	// 建设单位级管理员
	HEADQUARTERS_USER : "3",	// 指挥部级用户
	HEADQUARTER_MANAGER : "4",	// 建指管理员
	SECTION_USER : "5",			// 标段级用户
	SECTION_MANAGER : "6"		// 标段管理员
};

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
 * 初始化组织导航树
 */
function getOrgTree() {
	$.ajax({
		async : true,					//是否异步
		type : 'POST',					//请求方式：post
		dataType : 'json',				//数据传输格式：json
		url : "../getOrgTree",				//请求的actio//n路径
		error : function() {
			$('#resultMessage').html("无法获取用户的连续梁数据.");
		},
		success : function(data) { 	//请求成功后处理函数
			// 组织结构树数据获取失败 或者 无结果 情况
			if (data.code != 0 || data.result.length == 0) {
				$('#resultMessage').html("无法获取用户的连续梁数据.");
				return;
			}
			// 节点属性设置
			var nodes = data.result;	
			setIdsByNodesType(nodes);
			// 设置节点属性
			setNodeAttr(nodes);
			$('#resultMessage').html("");
			// 显示树
			var treeObj = $.fn.zTree.init($("#orgTree"), setting, nodes);
			
			var node = treeObj.getNodesByFilter(function (node) { return node.level == 0 }, true);
			var num = node.name.indexOf("</span>")>0?node.name.indexOf("</span>")+7:0
			var name = node.name.substring(num);
			loadContent(node.type,node.orgId,name);//加载主页内容
		}
	});
}

/**
 * 给全局变量片区、项目、标段、连续梁 赋值
 * @param nodes
 */
function setIdsByNodesType(nodes){
	var treeIdList = {
			categoryItemList:[],
			projectList:[],
			sectionList:[],
			conBeamList:[]
	};
	$.each(nodes,function(i,item){
		var org = {};
		org.orgId = item.orgId;
		org.name = item.text;
		org.type = item.type;
		org.parentOrgId = item.parentOrgId;
		switch (item.type) {
			 
			case ORG_TYPE.CATEGORY_ITEM:
				//保存所有片区对象
				treeIdList.categoryItemList.push(org);
				break;
			case ORG_TYPE.PROJECT:
				//保存所有项目对象
				treeIdList.projectList.push(org);
				break;
			case ORG_TYPE.SECTION:
				//保存所有标段对象
				treeIdList.sectionList.push(org);
				break;
			case ORG_TYPE.CON_BEAM:
				//保存所有连续梁对象
				treeIdList.conBeamList.push(org);
				break;
		}
	});
	$("#treeIdList").html(JSON.stringify(treeIdList));
}
/**
 * 节点属性设置 获取下拉框绑定用数据
 *  图标等
 *  
 * @param nodes
 */
function setNodeAttr(nodes) {
	//显示折叠
	for (var i = 0; i < nodes.length; i++) {
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
function clickNode(event,orgTree, node) {
	$(".tree").animate({
		"left" :$(".tree").width()
	}, 800,function(){
		//放在回调里面加载内容，防止页面收缩动画效果卡顿
		var num = node.name.indexOf("</span>")>0?node.name.indexOf("</span>")+7:0
		var name = node.name.substring(num);
		// 片区 无响应
		if (node.type == ORG_TYPE.CATEGORY_ITEM) { return; }
		loadContent(node.type,node.orgId,name);
	});
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
