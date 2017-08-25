/**
 * 登录画面
 */

$(function() {
	login();
});

function login() {
	
	var url = "check";	// 测试用 TODO
	
	var dat = {
		account : $('#loginAccount').val()
	};

	$.ajax({
		type : "post",
		url  : url,
		data : dat,
		success : function(data, textStatus) {

			var basePath = $('#basePath').val();
			// 登录成功 标段管理员 建指管理员
			if (data.code == 3) {

				// 显示标段管理员 主页
				window.location.href = basePath + "homeManager";
			}
			
			// 登录成功 非标段管理员
			if (data.code == 0) {

				// 显示主页
				window.location.href = basePath + "home"; 
			}
		}
	});
}
