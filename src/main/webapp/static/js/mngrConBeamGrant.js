/**
 * 标段管理员 连续梁授权
 */

// 选择标志
var USER_SELECTED = "0";
// 未选择标志
var USER_NOT_SELECTED = "1";

/* 用户信息保存用 */
var userList ={};
/* 连续梁信息保存用 */
var conBeamList ={};

/* 同步图片 */
var imgSync ="data:image/gif;base64,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";

/**
 * 初始化函数
 */
function initConBeamGrant() {
	
	$("div.lxl-grant").show();

	if (getSyncFlag() != '') {

		syncBtn('btnSyncConBeam');
	}
	
	// 查询标段的所有用户
	getUserBySectionId();
	
	// 查询标段的所有连续梁
	getConBeamBySectionId();
}

/**
 * 查询标段的所有用户
 */
function getUserBySectionId() {

	var sectionId = getManagerOrgId();
	var dat = {sectionId : sectionId};

	var url = "mngrConBeamGrant/getUserBySectionId";

	$.ajax({
		type : "post", // 请求方式
		url : url, // 发送请求地址
		data : dat,
		dataType : 'json',//数据传输格式：json
		error : function(a, b, c) {
//			alert(c);
		},
		// 请求成功
		success : function(data, textStatus) {

			// 未选择用户
			$("input[name='userSelectFlag']").val(USER_NOT_SELECTED);
			
			// 数据一览
			var list = data.result;

			// 全局保存
			userList = list;
			// 绑定数据
			bindUser(list);
		}
	});
}

/**
 * 查询标段的所有连续梁
 */
function getConBeamBySectionId() {

	var sectionId = getManagerOrgId();
	var dat = { sectionId : sectionId };

	var url = "mngrConBeamGrant/getConBeamBySectionId";

	$.ajax({
		type : "post", // 请求方式
		url : url, // 发送请求地址
		data : dat,
		dataType : 'json',//数据传输格式：json
		error : function(a, b, c) {
//			alert(c);
		},
		// 请求成功
		success : function(data, textStatus) {

			// 未选择连续梁
			$("input[name='conBeamSelectFlag']").val('');
			
			// 数据一览
			var list = data.result;

			// 全局保存
			conBeamList = list;
			// 绑定数据
			bindConBeam(list);
		}
	});
}

/**
 * 连续梁授权
 */
function grantConBeamToUser() {
	
	// 选择用户
	var selected = $('input:radio[checked]'); 
	var iUser = selected.val();
	if (!iUser) {
		alert("未选择用户.");
		return;
	}
	
	// 按钮禁用 防止二重提交
	$('#btnGrant').attr('disabled', true); 
	
	var user = userList[iUser];
	
	// 选择连续梁
	var chkList = $("#conBeamList>tbody input[type='checkbox']");

	var userLxlList = [];
	var iId = -1;
	for(var i = 0;i < chkList.length; i++){

		var userLxl = {};

		// 只处理被授权的连续梁
		// 已授权的连续梁先在表中统一取消授权
		// 然后再添加或者更新 为 授权
		if (chkList[i].checked) {
			// 用户登陆名称
			userLxl.account = user.account;
			// 真实姓名
			userLxl.userName = user.userName;
			
			// 选择的连续梁
			var conBeam = conBeamList[chkList[i].value];
			// 连续梁ID
			userLxl.conBeamId = conBeam.conBeamId;
			// 标段ID
			userLxl.sectionId = getManagerOrgId();
			// 工区ID
			userLxl.areaId = conBeam.areaId;
			// 授权
			userLxl.grantState = "0";

			iId++;
			userLxlList[iId] = userLxl;
		}
	}
	console.log(userLxlList);
	
	if (iId == -1) {

		var userLxl = {};
		// 用户登陆名称
		userLxl.account = user.account;
		// 取消授权
		userLxl.grantState = "1";

		userLxlList[0] = userLxl;
	}

	// 提交请求
	var url = "mngrConBeamGrant/grantConBeamToUser";
	var dat = {jsonUserLxlList : JSON.stringify(userLxlList)};
	
	$.ajax({
		type : "post", // 请求方式
		url : url, // 发送请求地址
		data : dat,
		dataType : 'json',//数据传输格式：json
		error : function(a, b, c) {
//			alert(c);
		},
		// 请求成功
		success : function(data, textStatus) {

			var selected = $('input:radio[checked]'); 
			var iUser = selected.val();
			getGrantInfoByUser(iUser);

			// 按钮恢复可用
			$('#btnGrant').removeAttr('disabled');
			
			alert("连续梁授权已保存");
		}
	});
}

/**
 * 用户数据绑定
 * 
 * @param list
 */
function bindUser(list) {

	// 清空原有数据
	$("#userList>tbody").empty();
	
	// 数据一览
	for (var i = 0, len = list.length; i < len; i++) {
		
		var user = list[i]; 
	
		// 用户名(Acount)
		var account = user.account == null ? "" : user.account;
		// 真实姓名
		var userName = user.userName == null ? "" : user.userName;
		// 联系电话
		var mobile = user.mobile == null ? "" : user.mobile;
		// 部门
		var departmentName = user.departmentName == null ? "" : user.departmentName;
		// 授权状态(0:已授权 0以外(1或null):未授权)
		var grantState = user.grantState == '0' ? "已授权" : "未授权";
		
		// 
		var html = 
			"<tr>" +
			"<td style='width: 5%;'><input type='radio' name='rdoUser' onclick='getGrantInfoByUser(" + i + ")' class='point' value='" + i + "'></td>" + // value为原数据一览中的下标
			"<td style='width: 7%;'>" + (i + 1) + "</td>" + 
			"<td style='width: 19%;'>" + account + "</td>" + 
			"<td style='width: 19%;'>" + userName + "</td>" + 
			"<td style='width: 19%;'>" + mobile + "</td>" + 
			"<td style='width: 19%;'>" + departmentName + "</td>" + 
			"<td >" + grantState + "</td>" +
			"</tr>";

		$("#userList>tbody").append(html);
		if($('#userList').height() > $('.lxl-grant-user-content').height()){
			$('.lxl-grant-user-head').css('padding-right','17px;')
		}
	}
}

/**
 * 连续梁数据绑定
 * 
 * @param list
 */
function bindConBeam(list) {

	// 清空原有数据
	$("#conBeamList>tbody").empty();
	
	// 数据一览
	for (var i = 0, len = list.length; i < len; i++) {
		
		var conBeam = list[i]; 

		// 连续梁ID
		var conBeamId = conBeam.conBeamId == null ? "&nbsp;" : conBeam.conBeamId;
		// 连续梁名称
		var conbeamName = conBeam.conBeamName == null ? "&nbsp;" : conBeam.conBeamName;
		// 开始里程
		var startMile = conBeam.startMile == null ? "&nbsp;" : conBeam.startMile;
		// 结束里程
		var endMile = conBeam.endMile == null ? "&nbsp;" : conBeam.endMile;
		// 长度
		var conBeamLenth = conBeam.conBeamLenth == null ? "&nbsp;" : conBeam.conBeamLenth;
		
		// 
		var html = 
			"<tr>" +
			"<td style='width: 6%;'>" +
				"<input type='hidden' name='conBeamId' value='" + conBeamId + "'>" +
				"<input type='checkbox' name='chkConBeam' onchange='selectConBeam()' class='point' value='" + i + "'></td>" + // value为原数据一览中的下标
			"<td style='width: 9%;'>" + (i + 1) + "</td>" + 
			"<td style='width: 35%;'>" + conbeamName + "</td>" + 
			"<td style='width: 20%;'>" + startMile + "</td>" + 
			"<td style='width: 17%;'>" + endMile + "</td>" + 
			"<td >" + conBeamLenth + "</td>" + 
			"</tr>";
			 
		$("#conBeamList>tbody").append(html);
		//如果出现滚动条则设置上方div的padding-right值
		if($('#conBeamList').height() > $('.lxl-grant-conbeam-content').height()){
			$('.lxl-grant-conbeam-head').css('padding-right','17px')
		}
		
		
	}
}

/**
 * 获取用户的授权连续梁信息
 */
function getGrantInfoByUser(iUser) {

	// 已选择用户
	var user = userList[iUser];
	
	var url = "mngrConBeamGrant/getGrantInfoByUser";
	var dat = { account : user.account };
	
	console.log(dat);
	$.ajax({
		type : "post", // 请求方式
		url : url, // 发送请求地址
		data : dat,
		dataType : 'json',//数据传输格式：json
		error : function(a, b, c) {
//			alert(c);
		},
		// 请求成功
		success : function(data, textStatus) {

			console.log(data);
			
			var userConBeamList = data.result;
			// 用户的连续梁信息
			bindConBeamByUser(userConBeamList);
		}
	});
}

/**
 * 用户连续梁数据绑定
 * 
 * @param userConBeamList
 */
function bindConBeamByUser(userConBeamList) {

	$('input[type="checkbox"][name="chkConBeam"]').each(function() {
		$(this).removeAttr("checked");
	});

	// 勾选用户绑定的连续梁
	for (var i = 0, len = userConBeamList.length; i < len; i++) {
		var conBeamId = userConBeamList[i].conBeamId;

		var ctrlConBeamId = $('input[name="conBeamId"][value="' + conBeamId + '"]');
		var chkConBeamId = ctrlConBeamId.siblings('input[type="checkbox"]');

		chkConBeamId.attr("checked",'true');
	}
}

/**
 * 选择所有连续梁
 */
function selectAllConBeam(){
	
	var trList = $("#conBeamList>tbody").find("tr");
	if($("#selectLxl").attr("checked")){
		
		for(var i = 0;i < trList.length; i++){
			$($(trList[i]).find("input[type='checkbox']")).attr("checked",'true');
		}
	}else{
		for(var i = 0;i < trList.length; i++){
			$($(trList[i]).find("input[type='checkbox']")).removeAttr("checked");
		}
	}
}

/**
 * 选择连续梁
 */
function selectConBeam() {

	var trList = $("#conBeamList>tbody").find("tr");
	
	var cntChked = 0;
	var cntUnChked = 0;
	var len = trList.length;
	for(var i = 0;i < len; i++){
		
		var chk = $($(trList[i]).find("input[type='checkbox']"));
		
		if (chk.attr("checked")) {
			cntChked++;
		} else {
			cntUnChked++;
		}
	}
	
	if (len == cntChked) {
		
		$("#selectLxl").attr("checked",'true');
		return;
	}

	if (len == cntUnChked) {

		$("#selectLxl").removeAttr("checked");
		return;
	}
}

/**
 * 同步连续梁
 */
function sysnConBeam() {

	var url = "mngrConBeamGrant/sysnConBeam";
	var dat = { sectionId : getManagerOrgId() };
	
	syncBtn('btnSyncConBeam');
	
	console.log(dat);
	
	$.ajax({
		type : "post", // 请求方式
		url : url, // 发送请求地址
		data : dat,
		dataType : 'json',//数据传输格式：json
		error : function(a, b, c) {
//			alert(c);
			$(".allmask").hide();
		},
		// 请求成功
		success : function(data, textStatus) {

			recoveryBtn('btnSyncConBeam');
			console.log(data);
			alert(data.result);
		}
	});
}

/**
 * 同步过程中按钮不可用
 */
function syncBtn(btnId){
	
//	$(".allmask").show();
	
	setSyncFlag('1');
	
	$("#" + btnId).attr("disabled",true);
	$("#" + btnId).html("<img src=" + imgSync + " /><label>同步中</label>");
}
/*
 * 恢复按钮可用
 */
function recoveryBtn(btnId){

	setSyncFlag('');
	
//	$(".allmask").hide();
	$("#" + btnId).removeAttr("disabled");
	$("#" + btnId).html("同步连续梁信息");
}
