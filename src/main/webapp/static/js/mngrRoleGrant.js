/**
 * 标段管理员 角色授权
 */
// 选择标志
var USER_SELECTED = "0";
// 未选择标志
var USER_NOT_SELECTED = "1";

// 用户信息保存
var userList ={};
// 选择的用户下标
var selectUserIndex = -1;
// 已授权的用户权限
var roleGrantedList = [];
// 未授权的用户权限
var roleNoGrantedList =[];

/**
 * 初始化函数
 */
function initRoleGrant() {
	
	$("div.role-grant").show();
	
	// 查询用户
	getRoleUser();
}

/**
 * 查询用户
 */
function getRoleUser() {

	var dat = { managerOrgId : getManagerOrgId() };
	var url = "mngrRoleGrant/getRoleUser";

	$.ajax({
		type : "post",  // 请求方式
		url : url, 		// 发送请求地址
		data : dat,
		dataType : 'json',//数据传输格式：json
		error : function(a, b, c) {
//			alert(c);
		},
		// 请求成功
		success : function(data, textStatus) {

//			console.log(data);
			
			// 未选择用户
			$("input[name='userSelectFlag']").val(USER_NOT_SELECTED);
			
			// 数据一览
			var list = data.result;
			if (!list|| list.length == 0) {
				alert("没有用户数据.");
				return;
			} 
			
			// 全局保存
			userList = list;
			// 绑定数据
			bindUserRole(list);
		}
	});
}

/**
 * 用户数据绑定
 */
function bindUserRole(list) {

	// 清空原有数据
	$("#userList>tbody").empty();
	
	// 数据一览
	for (var i = 0, len = list.length; i < len; i++) {
		
		var user = list[i]; 
	
		// 用户名(Acount)
		var account = user.account == null ? "" : user.account;
		// 真实姓名
		var userName = user.name == null ? "" : user.name;
		// 联系电话
		var mobile = user.mobile == null ? "" : user.mobile;
		// 部门
		var departmentName = user.departmentName == null ? "" : user.departmentName;
		
		// 
		var html = 
			"<tr>" +
			"<td style='width: 5%;'><input type='radio' name='rdoAccount' onchange='selectUser(" + i + ")' class='point' value='" + i + "' /></td>" + // value为原数据一览中的下标
			"<td style='width: 7%;'>" + (i + 1) + "</td>" + 
			"<td style='width: 20%;'>" + account + "</td>" + 
			"<td style='width: 20%;'>" + userName + "</td>" + 
			"<td style='width: 20%;'>" + mobile + "</td>" + 
			"<td >" + departmentName + "</td>" + 
			"</tr>";

		$("#userList>tbody").append(html);
		if($('#userList').height() > $('.role-grant-user-content').height()){
			$('.role-grant-user-head').css('padding-right','17px')
			
		}
	}
	
	// 默认选择第一个用户
	$("input[type='radio'][name='rdoAccount']").eq(0).attr("checked", "true");
	selectUser(0);
}

/*
 * 选择用户后
 *   获取用户对应的角色和未授权的角色
 */
function selectUser(index){

	var user = userList[index];
	selectUserIndex = index;

	var dat = {account : user.account};
	var url = "mngrRoleGrant/getRoleByAccount";

	$.ajax({
		type : "post", 	// 请求方式
		url : url, 		// 发送请求地址
		data : dat,
		dataType : 'json',//数据传输格式：json
		error : function(a, b, c) {
//			alert(12);
		},
		// 请求成功
		success : function(data, textStatus) {

//			console.log(data);
			// 数据一览
			var list = data.result;

			// 清空已授权权限(内存)
			roleGrantedList = [];
			// 清空未授权权限(内存)
			roleNoGrantedList = [];
			// 清空已授权权限
			$("#grantedRoleList>tbody").empty();
			// 清空未授权权限
			$("#noGrantRoleList>tbody").empty();
			
			// 无数据
			if (!list || list.length == 0) {

				return;
			}
			
			// 绑定数据
			bindRole(list);
		}
	});
}

/**
 * 绑定数据到角色权限
 */
function bindRole(userRoleList) {

	// 
	for(var i = 0; i < userRoleList.length; i++) {
		
		var userRole = userRoleList[i];
		
		// 授权角色 默认角色 观测人员
		if(userRole.grantState == GRANT_STATE.GRANTED
			|| userRole.grantState == GRANT_STATE.DEFAULT
			|| userRole.grantState == GRANT_STATE.OBSERVER){
			
			// 已授权角色
			roleGrantedList.push(userRole)
		}else{
			
			// 未授权角色
			roleNoGrantedList.push(userRole)
		}
	}

	// 绑定已授权角色
	bindGrantRole(roleGrantedList);
	// 绑定未授权角色
	bindNoGrantRole(roleNoGrantedList);
}

/**
 * 绑定当前角色已授权的权限
 */
function bindGrantRole(userRoleList){
	
	// 清空原有数据
	$("#grantedRoleList>tbody").empty();
	
	 for(var i = 0; i < userRoleList.length; i++){
		
		var userrole = userRoleList[i];
		var rolename = userrole.roleName;
		var description = userrole.description;
		
		var mark = "";
		if (ROLE_TYPE.OBSERVER == userrole.roleType) {
			
			mark = '<span>—</span>';
		} else {

			mark = '<span style="color:red;cursor:pointer;font-weight:bold;font-size:16px;" title="点击取消授权" onclick="closeRole(' + i + ')">×</span>';
		}
		
		var html =
			'<tr><td style="width: 47px;">' + (i + 1) + '</td>'+
			'<td style="width: 190px;">'+ rolename + '</td>'+
			'<td style="width: 100px;">'+ description + '</td>'+
			'<td style="width: 100px;">'+ mark + '</td></tr>';
		 
		 $("#grantedRoleList>tbody").append(html);
	}
}

/*
 * 绑定用户当前没有的权限
 */
function bindNoGrantRole(userRoleList){
	
	// 清空原有数据
	$("#noGrantRoleList>tbody").empty();
	
	for(var i = 0; i < userRoleList.length; i++){
		
		var userrole = userRoleList[i];
		var rolename = userrole.roleName;
		var description = userrole.description;
		 
		// 观测人员
		var mark = "";
		if (ROLE_TYPE.OBSERVER == userrole.roleType) {
			
			mark = '<span>—</span>';
		} else {

			mark = '<span style="color:green;cursor:pointer;font-weight:bold;font-size:16px;" title="点击授权" onclick="toRole(' + i + ')">√</span>';
		}
		
		var html =
			'<tr><td style="width: 47px;">' + (i + 1) + '</td>'+
			'<td style="width: 190px;">'+ rolename + '</td>'+
			'<td style="width: 100px;">'+ description + '</td>'+
			'<td style="width: 100px;">'+ mark + '</td></tr>';
		
		$("#noGrantRoleList>tbody").append(html);
		
//		$('span[name="spnGrantRole"]').tooltip();
	}
}

/**
 * 画面操作
 * 点击[x] 把对应授权角色从已授权角色列表中去掉, 添加到未授权角色列表中
 * @param index
 */
function closeRole(index){
	
	if (!confirm("是否要取消此用户的角色授权?")) {
		
		retrun;
	}
	
	var newnorole = roleGrantedList[index];
	
	roleNoGrantedList.push(newnorole);
	roleGrantedList.splice(index, 1)
	
	bindGrantRole(roleGrantedList);
	bindNoGrantRole(roleNoGrantedList);
	
	// 保存角色授权
	saveUserRole();
}

/**
 * 画面操作
 * 点击[√] 把对应授权角色从已授权角色列表中去掉, 添加到未授权角色列表中
 * @param index
 */
function toRole(index){

	if (!confirm("是否要将此角色授权给所选择的用户?")) {
		
		retrun;
	}
	
	var newnorole = roleNoGrantedList[index];
	
	roleGrantedList.push(newnorole);
	roleNoGrantedList.splice(index, 1)
	
	bindGrantRole(roleGrantedList);
	bindNoGrantRole(roleNoGrantedList);

	// 保存角色授权
	saveUserRole();
}

/**
 * 查询用户的所有角色
 */
function getRoleByUserId() {

	var dat = {account : account};
	var url = "mngrRoleGrant/getRoleByAccount";

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

			// 角色类型
			$("input[name='roleFlag']").val('');
			// 角色下标
			$("input[name='roleIndex']").val('');
			
			// 数据一览
			var list = data.result;

			// 绑定数据
			bindRole(list);
		}
	});
}

/**
 * 保存角色授权
 */
function saveUserRole() {
	
	var user = userList[selectUserIndex];
	var userRoleList = [];
	
	// 已授权权限
	for (var i = 0, len = roleGrantedList.length; i < len; i++) {

		// 观测人员不处理
		if (ROLE_TYPE.OBSERVER == roleGrantedList[i].roleType) {
			continue;
		}
		
		var userRole = {};
		// 用户登陆名
		userRole.account = user.account;
		// 用户姓名
		userRole.userName = user.name;
		// 角色ID
		userRole.roleId = roleGrantedList[i].roleId;
		// 授权状态
		userRole.grantState = roleGrantedList[i].grantState;
		// 在用(已授权)
		userRole.useFlag = USE_FLAG.USE;
		// 用户ID
		userRole.userId = user.id;
		
		userRoleList.push(userRole);
	}

	// 未授权权限
	for (var i = 0, len = roleNoGrantedList.length; i < len; i++) {

		// 观测人员不处理
		if (ROLE_TYPE.OBSERVER == roleNoGrantedList[i].roleType) {
			continue;
		}
		
		var userRole = {};
		// 用户登陆名
		userRole.account = user.account;
		// 用户姓名
		userRole.userName = user.name;
		// 角色ID
		userRole.roleId = roleNoGrantedList[i].roleId;
		// 授权状态
		userRole.grantState = roleNoGrantedList[i].grantState;
		// 删除(未授权)
		userRole.useFlag = USE_FLAG.DELETE;
		// 用户ID
		userRole.userId = user.id;
		
		userRoleList.push(userRole);
	}

//	console.log(userRoleList);
	// 
	var dat = { jsonUserRoleList : JSON.stringify(userRoleList) };
	var url = "mngrRoleGrant/saveUserRole";

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

//			alert("角色授权已保存");
		}
	});
}
