/**
 * <p>Description: 共通js方法</p>
 *
 * @author duyanzhu（2017年2月18日 下午17:56:55）
 *
 * @version:1.0.0
 */

// 是否在用
var USE_FLAG = {
	USE : 0,	// 在用
	DELETE : 1	// 删除
};

// 共通常量
var CONST = {
	PAGE_SIZE : 10,		// 默认页码
	DEFAULT_PAGE_NO : 1	// //默认每页显示的数据数
	
};

// 组织类型
var ORG_TYPE = {
	CRC      : "0",			// 中国铁路总公司
	CATEGORY_ITEM  : "1",	// 片区
	PROJECT  : "2",			// 项目
	SECTION  : "3",			// 标段
	CON_BEAM : "4"			// 连续梁
};

// 用户登陆类型
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

//资源(菜单)表数据常量
//资源(菜单)名称: 资源ID
//!!!必须与资源表中数据保持一致!!!
var RESOURCE_DATA = {
	// 资源(菜单)名称: 资源ID
	CENTER : 2,				// 中心
	CENTER_HOME : 3,		// 中心首页
	CENTER_OBSERVER: 4,		// 中心 观测人员
	CENTER_EQUIPMENT : 5,	// 中心 仪器设备
	PROJECT : 6,			// 项目
	PROJECT_HOME : 7,		// 项目 首页
	PROJECT_OBSERVER : 8,	// 项目 观测人员
	PROJECT_EQUIPMENT : 9,	// 项目 仪器设备
	SECTION : 10,			// 标段
	SECTION_HOME : 11,		// 标段 首页
	SECTION_OBSERVER : 12,	// 标段 观测人员
	SECTION_EQUIPMENT : 13,	// 标段 仪器设备
	CON_BEAM : 14,						// 连续梁
	CON_BEAM_HOME : 15,					// 连续梁 桥梁首页
	CON_BEAM_DEVIATION_OVERRUN : 16,	// 连续梁 偏差超限
	CON_BEAM_MEASUREINFO : 17,			// 连续梁 测量信息
	CON_BEAM_LDSTATION : 18,			// 连续梁 梁段测点
	CON_BEAM_DATUMPOINT : 19,			// 连续梁 基点信息
	CON_BEAM_THEORETICAL : 20			// 连续梁 维护理论值
};

// 菜单栏 各链接ID
var MENU_LINK_ID = {
	CENTER_HOME : "homeCRC",			// 中心首页
	CENTER_OBSERVER: "observer",		// 中心 观测人员
	CENTER_EQUIPMENT : "equipment",		// 中心 仪器设备
	
	PROJECT_HOME : "homeProject",		// 项目 首页
	PROJECT_OBSERVER : "observer",		// 项目 观测人员
	PROJECT_EQUIPMENT : "equipment",	// 项目 仪器设备
	
	SECTION_HOME : "homeSection",		// 标段 首页
	SECTION_OBSERVER : "observer",		// 标段 观测人员
	SECTION_EQUIPMENT : "equipment",	// 标段 仪器设备
	
	CON_BEAM_HOME : "homeBridge",						// 连续梁 桥梁首页
	CON_BEAM_DEVIATION_OVERRUN : "deviationOverrun",	// 连续梁 偏差超限
	CON_BEAM_MEASUREINFO : "measureInfo",				// 连续梁 测量信息
	CON_BEAM_LDSTATION : "ldStation",					// 连续梁 梁段测点
	CON_BEAM_DATUMPOINT : "datumPoint",					// 连续梁 基点信息
	CON_BEAM_THEORETICAL : "theoretical"				// 连续梁 维护理论值
}

// 梁段类型
var LD_TYPE = {
    ZERO : 0,	// 0号梁段
    XBJZ : 1,	// 悬臂浇筑梁段
    ZKHL : 3,	// 中跨合龙段	(中跨)
    BKHL : 4,	// 边跨合龙段	(边跨合拢段)
    BKFDC : 5	// 边跨非对称梁段 (直线段)
};
var username = "";//用户名

// 偏差类型
var DEVIATION_TYPE = {
	MIDDLE : '1',		// 中线
	HIGH : '2',		// 高程
	VERTICAL : '3'		// 立模
};

// 大小量程区分
var MILEAGE_FLAG = {
	SMALL : 0,	// 小里程
	BIG : 1,	// 大里程
	NONE : 2	// 无测量数据
};

// 授权状态
var GRANT_STATE = {
	GRANTED : "0",			// 授权
	NOT_GRANTED : "1",		// 未授权
	DEFAULT : "3",			// 默认角色
	OBSERVER : "4"			// 观测人员
};

// 角色类型
var ROLE_TYPE = {
	DEFAULT : 0,	// 默认角色
	NORMAL : 1,		// 普通角色
	OBSERVER : 2	// 观测人员
};

// 偏差值
var PCZ = {
	MIN : 99999999,   // 小于此值的值设为最小值
	MAX : -99999999,  // 小于此值的值设为最大值
	ZERO : 0          // 无数据的偏差值(0)
};

// 是否超限标志
var IS_WARN_FLAG = {
	NOT_WARN : 0,	// 0 : 未超限
	WARN : 1		// 1 : 超限
};


/*ajax调用
 *
 *POST请求方式
 *
 * url :路径
 * 
 * parm:传入参数
 * 
 * callBack:回调方法
 * */
function getAjax(url, parm, callBack) {
	$.ajax({
		type : "post", // 请求方式
		url : url, // 发送请求地址
		data : parm,
		// 请求成功后的回调函数有两个参数
		success : function(data, textStatus) {
			callBack(data);
			// alert(data);
		},
		error : function(a, b, c) {
			alert(c);
		}
	});
}
/*
 * ajax调用
 * 
 * GET请求方式
 * 
 * url :路径
 * 
 * parm:传入参数
 * 
 * callBack:回调方法
 */
function getAjaxG(url, parm, callBack) {
	$.ajax({
	  type:"get", //请求方式
	  url:url, //发送请求地址
	  data:parm,
	  //请求成功后的回调函数有两个参数
	  success:function(data,textStatus){
	      callBack(data);
	      // alert(data); 
	   }
	});
}

/*日期插件*/
$(function(){
	$("#date_begin").jcDate({
		IcoClass : "jcDateIco",
		Event : "click",
		Speed : 100,
		Left : 0,
		Top : 28,
		format : "-",
		Timeout : 100
   });

	$("#date_end").jcDate({
		IcoClass : "jcDateIco",
		Event : "click",
		Speed : 100,
		Left : 0,
		Top : 28,
		format : "-",
		Timeout : 100
   });
})

/*偏差理论值日期*/
$(function(){
	$("#dater-star").jcDate({
		IcoClass : "jcDateIco",
		Event : "click",
		Speed : 100,
		Left : 0,
		Top : 28,
		format : "-",
		Timeout : 100
   });

	$("#dater-end").jcDate({
		IcoClass : "jcDateIco",
		Event : "click",
		Speed : 100,
		Left : 0,
		Top : 28,
		format : "-",
		Timeout : 100
   });
})






/*equipment页面js*/

$(function(){
	
	/*点击增加按钮*/
	$('#add-late').on('click',function(){
		$('.mask,.edit').show();
	});
	/*点击空白区隐藏*/
	$('.mask').on('click',function(){
		$('.edit').hide();
		$(this).hide();
	});
	/*点击取消按钮*/
	$('.edit .concel').on('click',function(){
		$('.add-equipment li input[type="text"]').val('');
		$('.edit').hide();
		$(this).hide();
	});
	/*点击确定按钮*/
	
	var figure=0;
	$('.edit .submit').on('click',function(){
		
		figure++;
		var trHtml="<tr><td><input name='checkbox' type='checkbox' value='checkbox' /></td><td>"+figure+"</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>"
		$('.add-equipments tbody').before(trHtml);
		$('.edit').hide();
		$('.mask').hide();
	})
})

/*编辑用户*/
$(function(){
	$('#edit-late').on('click',function(){
		$('.mask,.equipment-information').show();
	})
	$('.mask').on('click',function(){
		$('.equipment-information').hide();
	
	});
	/*点击确定按钮*/
	$('.equipment-information .submit').on('click',function(){
		$('.equipment-information,.mask').hide();
	});
	
})

/*删除按钮js*/
$(function(){
	$('#del-late').on('click',function(){
		$('.mask,.del-information').show();
	});
	$('.mask').on('click',function(){
		$('.del-information').hide();
	})
})
Date.prototype.Format = function(fmt)   
		{ //author: meizz   
		  var o = {   
		    "M+" : this.getMonth()+1,                 //月份   
		    "d+" : this.getDate(),                    //日   
		    "h+" : this.getHours(),                   //小时   
		    "m+" : this.getMinutes(),                 //分   
		    "s+" : this.getSeconds(),                 //秒   
		    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
		    "S"  : this.getMilliseconds()             //毫秒   
		  };   
		  if(/(y+)/.test(fmt))   
		    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
		  for(var k in o)   
		    if(new RegExp("("+ k +")").test(fmt))   
		  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
		  return fmt;   
}  
/**
 * 页面分页div书写方法 
 * @param tableID表格ID
 * @param totalCount总计条数
 * @param startNum开始条数
 * @param pageNo当前页数
 * @param totalPage总计页数
 * @param endNum结束条数
 * @returns
 */
function writeTable(tableID,totalCount,startNum,pageNo,totalPage,endNum){
	$("#"+tableID).empty();
		$("#"+tableID).append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>检索到 "+totalCount+" 条记录，显示第 "+(startNum+1)+" 条 -  第 "+(pageNo == totalPage ? totalCount : endNum - 1)+" 条</span>"+
					"<div class='pull-right'>"+
					"<a onclick='javascript:navigatorPage(1);'><img src='"+basePath+"static/images/btnl1.gif' /></a>"+
				    "&nbsp;<a onclick='javascript:navigatorPage(" + (pageNo - 1) + ");'>" + (pageNo > 1 ? "<img src='"+basePath+"static/images/btnl2.gif'  />" : " <img src='"+basePath+"static/images/btnl1.gif'  style='display: none'/>")+"</a>"+
					    "<span>&nbsp;第&nbsp;"+pageNo + "&nbsp;页&nbsp;/&nbsp;共&nbsp;" + totalPage + "&nbsp;页&nbsp;</span>"+
				    "&nbsp;<a onclick='javascript:navigatorPage(" + (pageNo + 1) + ");'>" + (pageNo < totalPage ? "<img src='"+basePath+"static/images/btnr1.gif' />" : " <img src='"+basePath+"static/images/btnr1.gif' style='display: none'/>") +" </a>"+
				    "&nbsp;<a onclick='javascript:navigatorPage(" + totalPage + ");' ><img src='"+basePath+"static/images/btnr2.png' /></a>"+
					"</div>"+
					"<input type='hidden' id='pageNo' name='pageNo' value='" + pageNo + "'/>"
					);
		
}
//模态隐藏
$.fn.hideModal = function() { 
	$(".allmask").hide();
	$(this).hide();

}
//模态框弹出
$.fn.showModal = function() { 
	$(".allmask").show();
	$(this).show();
}

//验证手机和固话
function checkMobiles(theForm) {
	return (/^(13|15|18|14|17)+\d{9}$/.test(theForm)) || (/^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/.test(theForm));
}

/**
 * 字符串长度
 */
function len(sValue) {

    var length = 0;
    if(sValue != null){
    	 for (var i = 0, l = sValue.length; i < l; i++) {
    	    	
    	        // full
    	        if (sValue.charCodeAt(i) < 0 ||  sValue.charCodeAt(i) > 255)
    	            length = length + 2;
    	        else
    	            length++;
    	    }
    }
    
    return length;
}






