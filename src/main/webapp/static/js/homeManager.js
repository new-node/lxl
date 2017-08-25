/**
 * 管理员 首页
 */

/**
 * 初始化
 */
$(function() {

	$("#equipmentModel").hideModal();
	$("#deleteModel").hideModal();
	/*弹窗的拖拽*/
	$(function(){
		$('.managementPage').draggable({handle:'div.managementHead'});
	});
	// 管理员类型
	var loginType = getLoginType();

	// 中心级管理员 建设单位级管理员 建指管理员
	if (USER_LOGIN_TYPE.CENTER_MANAGER == loginType
		|| USER_LOGIN_TYPE.HEADQUARTER_MANAGER == loginType
		|| USER_LOGIN_TYPE.CONSTRUCTION_MANAGER == loginType) {

//		console.log("中心级管理员 建设单位级管理员 建指管理员");

		$('#linkRoleGrant').show();
		// 改变鼠标样式
		$('#linkRoleGrant').css('cursor', 'default');
		$('#linkRoleGrant').on('hover', function(){

			$(this).css('cursor', 'default');
			$(this).find("button").css('cursor', 'default');
		});
		// 取消点击事件
		$('#linkRoleGrant').find("button").attr('onclick', '').bind('click', function () { return; });
		
		manager(4);
		return;
	}
	
	// 标段管理员
	if (USER_LOGIN_TYPE.SECTION_MANAGER == loginType) {

//		console.log("标段管理员");
		
		// 显示所有Tab
		$('.menuNav-manager>nav>ul>li').css('display', 'block');

		// 样式切换
		$('#linkObserver button').addClass("active").siblings('button').removeClass('active');
		$('.menu-nav ul li').on('click', function() {
			$(this).find("button").addClass("active");
			$(this).siblings("li").find('button').removeClass('active');
		});

		manager(0);
		return;
	}
});

/**
 * 菜单点击事件
 * 
 * @param url
 */


function manager(flag) {
	
	var url = '';
	var init = '';
	
	if (flag == 0) { url = 'mngrObserver'; init = ''; }
	if (flag == 1) { url = 'mngrEquipment'; init = 'initManagerEquipment(' + getManagerOrgId() + ')'; }
	if (flag == 2) { url = 'mngrRoleGrant'; init = 'initRoleGrant()'; }
	if (flag == 3) { url = 'mngrConBeamGrant'; init = 'initConBeamGrant()'; }

	// 建指管理员
	if (flag == 4) { url = 'mngrRoleGrant'; init = 'initRoleGrant()'; }
	
	if (url == '') { return; }
	
	$('#mainContent').load(url,{}, function(){

		eval(init);
	});
}

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
 * 观测人员 上岗证书查看
 */
function showMask() {
	$(".allmask").show();
}


/**
 * 观测人员 上岗证书查看
 */
function viewImg(content) {
	$(".allmask").show();
	$('.allmask').html(content);
	
	$('.allmask>div').draggable();
	$('.allmask>div').click(function() {
		hideViewImg();
	})
}

/**
 * 关闭弹窗
 */
function hideMask() {
	$(".allmask").hide();
	
}



/**
 * 观测人员 隐藏上岗证书弹窗
 */
function hideViewImg() {
	$(".allmask").hide();
	$('.allmask').html('');
}

/**
 * 获取标段ID
 */
function getLoginType() { return $('#loginType').val(); }
/**
 * 获取管理员ID
 */
function getManagerId() { return $('#managerId').val(); }
/**
 * 建指管理员 获取根部门ID
 * 标段管理员 获取标段ID
 */
function getManagerOrgId() { return $('#managerOrgId').val(); }
/**
 * 标段管理员 获取项目ID
 */
function getManagerProjectId() { return $('#managerProjectId').val(); }
/**
 * 标段管理员 获取片区ID
 */
function getManagerCategoryItemId() { return $('#managerCategoryItemId').val(); }

/**
 * 获取同步标志
 */
function getSyncFlag() { return $('#syncFlag').val(); }
/**
 * 设置同步标志
 */
function setSyncFlag(syncFlag) { $('#syncFlag').val(syncFlag); }
