/**
 * 标段管理员 设置观测人员
 */

// 选择标志
var SELECTED = "0";
// 未选择标志
var NOT_SELECTED = "1";

/**
 * 标段管理员 观测人员
 */
var searchResult = {};

/**
 * 观测人员根URL
 */
var OBSERVER_ROOT_URL = "mngrObserver/";

/**
 * 初始化
 */
$(function(){
	
	// 弹窗的拖拽
	$('#areaSaveObserver').draggable();
	
	// 初期查询
	searchObserver();
});

/**
 * 查询
 */
function searchObserver(){

	// 默认页码
	var pageNo = CONST.DEFAULT_PAGE_NO;
	
	var dat = {
		sectionId : getManagerOrgId(),
		// value 和 是否在用 保持一致
		// 0:观测人员(在用) 1:非观测人员(删除) 非观测人员还包括观测人员表中没有的用户
		useFlag : $('#observerType').val()
	};
	
	var url = OBSERVER_ROOT_URL + "searchObserver";

	$.ajax({
		type : "post", // 请求方式
		url : url, // 发送请求地址
		data : dat,
		error : function(a, b, c) {
//			alert(c);
		},
		// 请求成功
		success : function(data, textStatus) {

			// 未选择用户
			$("input[name='selectFlag']").val(NOT_SELECTED);
			
			// 数据一览
			var list = data.result;

			// 全局保存
			searchResult = list;
			// 分页
			paging(list, pageNo);
		}
	});
}

/**
 * 显示 设为观测人员 画面
 */
function showAreaSaveObserver() {

	// 未选择用户
	if (!isUserSelected()) {
		
		alert("未选择用户.");
		return;
	}
	
	// 观测人员
	if (isObserver()) {
		
		alert("选择用户是观测人员,请选择非观测人员.");
		return;
	}
	
	showMask();
	$('#areaSaveObserver').show();
	
    $("input:text[name='certificateNumber']").val('');
    $("input:file[name='certificatescan']").val("");
}

/**
 * 关闭 设为观测人员 画面
 */
function closeSaveObserver() {

	$('#areaSaveObserver').hide();
    $('#maskViewImg').hide();
    
    hideMask();
}

/**
 * 设为观测人员
 */
function saveObserver() {
    var msg = "";
    
    // 证书编号
    var certificateNumber = $("input:text[name='certificateNumber']").val();
    // 证书编号未输入
    if ($.trim(certificateNumber) == "") {
    	msg = msg + "证书编号未输入." + "\r\n";
    	alert(msg);
    	return;
    }
    // 证书编号过长
    if (len(certificateNumber) > 30) {
    	msg = msg + "证书编号过长." + "\r\n";
    	alert(msg);
    	return;
    }
    // 证书扫描件
    var file = $("input:file[name='certificatescan']");
    
    var fileInput =file[0];
    if(fileInput.files.length != 0){
    	var byteSize  = fileInput.files[0].size;
    	if(byteSize/(1024*1024)>4){
        	alert("文件大小不能大于4M！");
        	return;
        }
    	var fileName = file.val();
    	if (fileName <= 4) {
        	msg = msg + "证书扫描件格式不正确."; + "\r\n";
        	alert(msg);
        	return;
    	}
    	else {
    		
    		var suffix = fileName.slice(-4).toUpperCase();
    		if (suffix != ".PNG" && suffix != ".JPG" && suffix != "JPEG" ) {
            	msg = msg + "证书扫描件格式不正确."; + "\r\n";
            	alert(msg);
            	return;
    		}
    	}
    }
    // 标段管理员ID
    var updateUserId = getManagerId();
    var updateData = {updateUserId : updateUserId};

	var url = OBSERVER_ROOT_URL + "saveObserver";
	// 利用jquery.form.js上传文件
	// 使用ajaxSubmit,如果除了文件之外的其它属性已在form,则不需要另外追加 data 选项.
	// 如果追加form中已存在的属性,会被重复追加.
    // 如果需要追加FORM中之外的的属性,则需要在data中指定
	$('#formSaveObserver').ajaxSubmit({
        type: 'post',
        data: updateData,
        url: url,
		error : function(a, b, c) {
			alert(c);
		},
        success: function(data) {
        	
        	// 重新查找数据
        	searchObserver();
        	// 上传成功,关闭弹窗
        	closeSaveObserver();
        }
    });
}

/**
 * 取消观测人员
 */
function cancelObserver() {

	// 未选择用户
	if (!isUserSelected()) {
		
		alert("未选择用户.");
		return;
	}
	
	// 非观测人员(是否在用 为 删除)
	if (!isObserver()) {
		
		alert("选择用户是非观测人员,请选择观测人员.");
		return;
	}
	// 观测人员ID
	var id = $("input[name='id']").val();
	// 标段ID
	var sectionId = $("input[name='sectionId']").val();
	// 部门ID
	var departmentId = $("input[name='departmentId']").val();
    // 标段管理员ID
    var updateUserId = getManagerId();

	var selected = $('input:radio[checked]'); 
	var iObserver = selected.val();
	var observer = searchResult[iObserver];
	
	var dat = {
		id : id,
		sectionId : sectionId,
		departmentId : departmentId,
		updateUserId : updateUserId,
		account : observer.account
	};

	var url = OBSERVER_ROOT_URL + "cancelObserver";
	$.ajax({
		type : "post", 	// 请求方式
		url : url, 		// 发送请求地址
		data : dat,
		error : function(a, b, c) {
//			alert(c);
		},
		// 请求成功
		success : function(data, textStatus) {

        	// 重新查找数据
        	searchObserver();
		}
	});
}

/**
 * 分页
 * 
 * @param data
 * @param pageNo
 */
function paging(list, pageNo) {

	// 每页显示数据数
	var pageSize = CONST.PAGE_SIZE;
	// 总数据数
	var totalCount = list.length;
	// 总页数
	var totalPage = Math.ceil(totalCount/pageSize);
	// 显示数据开始位置
	var startNum = (pageNo - 1) * pageSize;
	// 显示数据结束位置
	var endNum = pageNo * pageSize + 1; // +1 是为了适配共通的writeTable函数
	endNum = pageNo == totalPage ? totalCount + 1 : endNum;
	
	// 无数据
	if(totalCount == 0){
		pageNo = 0;
		startNum = -1;
		endNum =0;
	}

	// 分页组件
	var tableID = "tableinfo";
	
	// 清空原有数据
	$("#observerList>tbody").empty();
	
	// 数据一览
	for (var i = startNum, j = 0; i < endNum - 1; i++, j++) {
		
		var observer = list[i]; 
		
		// 用户名(Acount)
		var account = observer.account == null ? "" : observer.account;
		// 真实姓名
		var userName = observer.userName == null ? "" : observer.userName;
		// 职务
		var proName = observer.proName == null ? "" : observer.proName;
		// 联系电话
		var mobile = observer.mobile == null ? "" : observer.mobile;
		// 上岗证书编号
		var certificateNumber = observer.certificateNumber == null ? "" : observer.certificateNumber;
		// 上岗证书扫描件
		var certificateScan = observer.certificateScan;
		// 状态(0:观测人员 0以外(1或null):非观测人员)
		var state = observer.useFlag == 0 ? "观测人员" : "非观测人员";
		
		// 
		var part1 = 
			"<tr><td><input type='radio' name='rdoObserver' onchange='selectRadio()' class='point' value='" + i + "'></td>" + // value为原数据一览中的下标
			 "<td>" + ((pageNo - 1) * pageSize + j + 1) + "</td>" + 
			 "<td>" + account + "</td>" + 
			 "<td>" + userName + "</td>" + 
			 "<td>" + mobile + "</td>" + 
			 "<td>" + proName + "</td>";
		
		// 图片
		var img = "";
		var imgId;
		var certificateScanUrl;
		if (certificateNumber && certificateScan) {
			
			imgId = 'imgCertificate' + i;
			certificateScanUrl = OBSERVER_ROOT_URL + "viewCertificate/" + certificateScan;
			img = "<td>" + certificateNumber + "</td>" + 
			 	"<td>" +
			 	"<a href='javascript:viewCertificate(" + '"' + imgId + '"' + ")'>查看</a> " +
			 	"<img alt=''id='" + imgId + "' width='29px' height='15px' src='" + certificateScanUrl + "' > " +
		 		"</td>";

			// 无法获取上岗证书扫描件图片时, 显示提示信息
			if (imgId) {
				
				$.ajax({
					async : false,	// 同步方式
					type : "get", 	// 请求方式
					url : certificateScanUrl, 		// 发送请求地址
					data : {},
					// 请求成功
					success : function(data, textStatus) {

						if (data == '-1') {
							img =  "<td>" + certificateNumber + "</td>" + "<td>无法获取上岗证书扫描件</td>";
						}
					}
				});
			}
			
		} else {

			img =  "<td>"+certificateNumber+"</td><td></td>";
		}
		
		var part3 = "<td>" + state + "</td>" + "</tr>";
		
//		console.log(img);
		$("#observerList").append(part1 + img + part3);
	}
		
	// 调用共通方法描画翻页组件
	writeTable(tableID, totalCount, startNum, pageNo, totalPage, endNum);
}

/**
 * 下一页
 * 方法名固定(和共通保持一致)
 * 
 * @param pageNo
 */
function navigatorPage(pageNo){
	
	var data = searchResult;
	paging(data, pageNo);
}


/**
 * 单选按钮
 *   全选 反选
 */
function selectRadio() {

	var selected = $('input:radio[checked]'); 
	var iObserver = selected.val();
	
	var observer = searchResult[iObserver];
	if (observer) {
		$("input[name='id']").val(observer.id);
		// 用户登陆名(Acount)
		$("input[name='account']").val(observer.account);
		// 真实姓名
		$("input[name='userName']").val(observer.userName);
		// 上岗证书编号
		$("input[name='certificateNumber']").val(observer.certificateNumber);
		
		// 标段ID
		$("input[name='sectionId']").val(observer.sectionId);
		// 部门ID
		$("input[name='departmentId']").val(observer.departmentId);

		// 用户被选择
		$("input[name='selectFlag']").val(SELECTED);
	}
}

/**
 * 查看证书
 */
function viewCertificate(id) {

	$('#imgOrigionalSize').attr('src', $("#" + id)[0].src); 
	
	var divViewImg = $('#viewImg').html();
	viewImg(divViewImg);
}

/**
 * 同步
 */
function syncObserver() {
	
	// 从基础平台同步信息
}

/**
 * 用户是否被选择
 *   true : 被选择
 *   false : 未被选择
 */
function isUserSelected() {

	// 隐藏控件值判断
	var selectFlag = $("input[name='selectFlag']").val();
	if (SELECTED != selectFlag) {
		
		return false;
	}
	
	return true;
} 

/**
 * 选择用户是否为观测人员
 *   true : 观测人员
 *   false : 非观测人员
 */
function isObserver() {

	// 选择的单选框的value
	var selected = $('input:radio[checked]'); 
	var iObserver = selected.val();
	
	// 取得用户
	var observer = searchResult[iObserver];
	// 非观测人员(是否在用 为 删除)
	if (USE_FLAG.USE != observer.useFlag) {
		return false;
	}
	
	return true;
}
