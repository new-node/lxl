/**
 * 开发用测试画面
 */
/**
 * 同步
 * 
 * @param flag
 */
function sync(flag) {

	
	switch (flag) {

		case 0:
			// 用户
			var urlSync = "syncUser";
			getAjax(urlSync, {}, showResult);
			break;
		case 1:
			// 部门
			var urlSync = "syncDepartment";
			getAjax(urlSync, {}, showResult);
			break;
		case 2:
			// 片区
			var urlSync = "syncCategoryItem";
			getAjax(urlSync, {}, showResult);
			break;
		case 3:
			// 项目信息
			var urlSync = "syncProjectInfo";
			getAjax(urlSync, {}, showResult);
			break;
		case 4:
			// 标段
			var urlSync = "syncProjectSection";
			getAjax(urlSync, {}, showResult);
			break;
		case 5:
			// 连续梁
			var urlSync = "syncLxl";
			getAjax(urlSync, {}, showResult);
			break;
		case 11:
			// 构件-特殊结构
			var urlSync = "syncGjSpecialStructure";
			getAjax(urlSync, {}, showResult);
			break;
		case 12:
			// 构件-中跨
			var urlSync = "syncGjCentreSpan";
			getAjax(urlSync, {}, showResult);
			break;
		case 13:
			// 构件-T构
			var urlSync = "syncGjTStructure";
			getAjax(urlSync, {}, showResult);
			break;
		case 14:
			// 构件-墩
			var urlSync = "syncGjPier";
			getAjax(urlSync, {}, showResult);
			break;
		default:
			return;
	}
}

/**
 * 组织结构树
 */
function testGetTree(){
	
	var url = "getOrgTree";
	getAjax(url, {}, showResult);
}


/**
 * 显示登录画面
 */
function showLogin() {
	
	
	window.location.href = "login/showLogin";
}

/**
 * 显示结果
 * 
 * @param data
 */
function showTreeResult(data) {

//	var s = "result : " + JSON.stringify(data);
//	var s = "result : " + data.result;
	var s = "result : " + JSON.stringify(data.result)
	var sTmp = $('#info').html(); 
	sTmp = sTmp + "<br>" + s;
	
	$('#info').html(sTmp); 
	alert(s);
}

/**
 * 显示结果
 * 
 * @param data
 */
function showResult(data) {

//	var s = "result : " + JSON.stringify(data);
	var s = "result : " + data.result;

	var sTmp = $('#info').html(); 
	sTmp = sTmp + "<br>" + s;
	
	$('#info').html(sTmp); 
	alert(s);
}

