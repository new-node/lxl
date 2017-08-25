//连续梁id
var lxlId;
//处理Flg
var dealFlg = 0;
//查询参数数组
var conditionObj = new Array(7);
//初期化Flg
var initFlgTmp = 1;
//声明记录点击日期的顺序
var flag = 0;

//初始化
getDeviationTime(conbeamid);
//初期话方法
function initDeviationOverrun(conbeamid){
	dealFlg = 0;
	//初期化参数设置
	lxlId = conbeamid;
	conditionObj[0] = lxlId;
	conditionObj[6] = dealFlg;
	initFlgTmp = 1;
	writeTable("tableinfo",0,-1,0,0,0);
	getWarnInfo(conditionObj, initFlgTmp);
	//隐藏模态窗口
	hideModalDiv();
}

/*Tab选项卡切换*/
$(function() {
	$('.deviation-region ul li').on('click', function() {

		$(this).find('a').addClass('close-deviation-list');
		$(this).find('a').removeClass('deviation-list');
		$(this).siblings('li').find('a').removeClass('close-deviation-list');
		$(this).siblings('li').find('a').addClass('deviation-list');
	})
})


/*日期插件*/
function startTime(){
	flag = 1;
	$(".dater-star").jcDate({

		IcoClass : "jcDateIco",

		Event : "click",

		Speed : 100,

		Left : 0,

		Top : 28,

		format : "-",

		Timeout : 100
   });
	$('#jcDateBtn samp').unbind('click');
	$('#jcDateBtn samp').bind('click',function(){
		var date = new Date();
		var oDate =  date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
		$(".dater-star").val(oDate);
		$('#jcDate').hide();
	})
	
}
function end(){
	flag = 2;
	$("#dater-end").jcDate({

		IcoClass : "jcDateIco",

		Event : "click",

		Speed : 100,

		Left : 0,

		Top : 28,

		format : "-",

		Timeout : 100
	  });
	$('#jcDateBtn samp').unbind('click');
	$('#jcDateBtn samp').on('click',function(){
		var date = new Date();
		var oDate =  date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
		$("#dater-end").val(oDate);
		$('#jcDate').hide();
	})
}
	
	function getDeviationTime(conbeamid){
			
		startTime();
		end();
		$('#jcDate').bind('click',function(){
			var conditionStartTime = "";
			//终止时间	
			var conditionEndTime = "";
			//起始时间
		 if($('#dater-star').val() != null || $('#dater-star').val() !=undefined){
				conditionStartTime = $('#dater-star').val();
			}
 			//终止时间	
			if($('#dater-end').val() !=null|| $('#dater-end').val() !=undefined){
				conditionEndTime = $('#dater-end').val();
			}
			if(conditionStartTime.length > 0 && conditionEndTime.length > 0){
				var startTmp = conditionStartTime.split("-");
				var endTmp = conditionEndTime.split("-");
				var sd = new Date(startTmp[0],startTmp[1],startTmp[2]);
				var ed = new Date(endTmp[0],endTmp[1],endTmp[2]);

				if(sd.getTime() > ed.getTime()){
					alert("开始日期不能大于结束日期");
					
					if( flag == 1) $('#dater-star').val("");
					   
					if( flag == 2) $('#dater-end').val("");
					
					return;
				}
			}
		
	 });
		//点击页面时日期插件隐藏
		$('.echart-region,#menuOrgTree').click(function () {
		
		if($('#jcDate').is(':visible')){
			$("#jcDate").hide();
			
			}
		});
		
		//点击起始时间
		$('#dater-star').on('click',function(){
		 	
			 //判断日期插件是否显示
			 if($('#jcDate').is(':visible')){
				 //取当前月份；
				 var month = $('#jcDateTt div samp').text();
				 month = month - 1;
				 var oMonth  = 0;
				 //初始化时将向下箭头隐藏
				 $('#jcDateTt a#d_next').css('width','0');
				 
				 //点击向上箭头使向下箭头出现
				 $('#d_prev').click(function(){
					 $('#jcDateTt a#d_next').css('width','15px')
				 });
				 
				 //点击向下箭头时取到此时月份，与初始化时月份进行对比
				 $('a#d_next').click(function(){
					  oMonth = $('#jcDateTt div samp').text();
					  if(oMonth==month){
							 $('#jcDateTt a#d_next').css('width','0');
						 }
				 });
				 
				 //取到当前visited所在位置，去掉其后对象的class中jcDateColor;
				 var num = 0;
				 var dateLth = $('.dateV li');
				 for(var i = 0;i<dateLth.length;i++){
					var objDate = dateLth[i];
					 if($(objDate).hasClass('visited')){
						num = i;
						break;
					 }
				 }
				 for(var k = num+1;k<dateLth.length;k++){
					 var subDate = dateLth[k];
					 $(subDate).removeClass('jcDateColor');
				 }
			 }
		 });
		
		
		//点击终止时间
		$('#dater-end').on('click',function(){
		 	
			 //判断日期插件是否显示
			 if($('#jcDate').is(':visible')){
				 //取当前月份；
				 var month = $('#jcDateTt div samp').text();
				 month = month - 1;
				 var oMonth  = 0;
				 //初始化时将向下箭头隐藏
				 $('#jcDateTt a#d_next').css('width','0');
				 
				 //点击向上箭头使向下箭头出现
				 $('#d_prev').click(function(){
					 $('#jcDateTt a#d_next').css('width','15px')
				 });
				 
				 //点击向下箭头时取到此时月份，与初始化时月份进行对比
				 $('a#d_next').click(function(){
					  oMonth = $('#jcDateTt div samp').text();
					  if(oMonth==month){
							 $('#jcDateTt a#d_next').css('width','0');
						 }
				 });
				 
				 //取到当前visited所在位置，去掉其后对象的class中jcDateColor;
				 var num = 0;
				 var dateLth = $('.dateV li');
				 for(var i = 0;i<dateLth.length;i++){
					var objDate = dateLth[i];
					 if($(objDate).hasClass('visited')){
						num = i;
						break;
					 }
				 }
				 for(var k = num+1;k<dateLth.length;k++){
					 var subDate = dateLth[k];
					 $(subDate).removeClass('jcDateColor');
				 }
			 }
		 });
	}
	
//分页查询
function navigatorPage(pageNo) {
	$('#pageNo').val(pageNo);
	getWarnInfo(conditionObj, 0, pageNo);
}

//dealFlg设置
function toggleDealFlg(dealFlgObj) {
	dealFlg= dealFlgObj;
	searchWarn();
}

//改变T构
$("#pierSelect").change(function() {
	if($("#pierSelect").val() == "") {
		$("#ldSelect").empty();
		$("#ldSelect").append("<option value=''>全部</option>");
	} else {
		pierChange();
	}

});

function pierChange(){
	$.ajax({
		async : false,//是否异步
		cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
		url : "pccx/getLdList",//请求的actio//n路径
		data : {"conbeamID" : conditionObj[0],"pier":$("#pierSelect").val()
		},
		error : function() {
			alert("服务器异常！");
		},
		success : function(data) { //请求成功后处理函数
			var ldCodeList = data['result'].ldCodeListTmp;
			$("#ldSelect").empty();
			$("#ldSelect").append("<option value=''>全部</option>");
			if(ldCodeList != null){
				for(var i=0; i<ldCodeList.length; i++){
					//设置梁段下拉列表
					var ldName = ldCodeList[i].CODE.split("-");
					if(ldCodeList[i].TYPE == 3){
						$("#ldSelect").append("<option value='" +  ldCodeList[i].CODE.replace("'","AA") + "'>"+ ldName[0] + "（中合）" +"</option>");
					} else if(ldCodeList[i].TYPE == 4){
						$("#ldSelect").append("<option value='" +  ldCodeList[i].CODE.replace("'","AA") + "'>"+ ldName[0] + "（边合）" +"</option>");
					} else if(ldCodeList[i].TYPE == 5){
						$("#ldSelect").append("<option value='" +  ldCodeList[i].CODE.replace("'","AA") + "'>"+ ldName[0] + "（直线段）" +"</option>");
					} else{
						var tmpldname = ldName[0];
						if(ldCodeList[i].MILEAGEFLAG == 0){
							tmpldname = tmpldname + "（小）";
						} else if(ldCodeList[i].MILEAGEFLAG == 1){
							tmpldname = tmpldname + "（大）";
						}
						$("#ldSelect").append("<option value='" +  ldCodeList[i].CODE.replace("'","AA") + "'>"+ tmpldname +"</option>");
					}
				}
			}
		}
	});
}

//
//检索按钮
$('#searchBtn').bind('click',function(){
	$('#searchBtn').attr("disabled", true); 
	searchWarn();
});

function searchWarn(){
	//检索时清空列表
	emptyTable('tbl_Deal');
	
	writeTable("tableinfo",0,-1,0,0,0);
	//设置检索条件
	conditionObj = [];
	conditionObj[0] = lxlId;
	if($("#pierSelect").val() != "" && $("#pierSelect").val()!=null){
		conditionObj[1] = $("#pierSelect").val();
	}
	if($("#ldSelect").val() != "" && $("#ldSelect").val()!=null){
		conditionObj[2] = $("#ldSelect").val();
	}

	if($("#dater-star").val() != "" && $("#dater-star").val()!=null){
		var dealDate = $("#dater-star").val();
		conditionObj[3] = $("#dater-star").val();
		if(dateCheck(dealDate)){

		}else{
			alert("日期格式不正确！");
			$('#searchBtn').attr("disabled", false); 
			return false;
		}
	}
	if($("#dater-end").val() != "" && $("#dater-end").val()!=null){
		var dealDate = $("#dater-end").val();
		conditionObj[4] = $("#dater-end").val();
		if(dateCheck(dealDate)){

		}else{
			alert("日期格式不正确！");
			$('#searchBtn').attr("disabled", false); 
			return false;
		}
	}

	var start=new Date($("#dater-star").val()).getTime();
	var end=new Date($("#dater-end").val()).getTime();
	if(end < start){
		$('.enddate').val('');
		alert('起始日期不能大于终止日期，请重新输入');
		$('#searchBtn').attr("disabled", false); 
		return;
	}

	if($("#sggkSelect").val() != "" && $("#sggkSelect").val()!=null){
		conditionObj[5] = $("#sggkSelect").val();
	}
	conditionObj[6] = dealFlg;
	getWarnInfo(conditionObj, 0);
}
//获取 页面所需数据
function getWarnInfo(condition, initFlg, pageNoObj) {
	
	$.ajax({
		async : false,//是否异步
		cache : false,//是否使用缓存
		type : 'POST',//请求方式：get
		dataType : 'json',//数据传输格式：json
		url : "pccx/getWarnInfo",//请求的actio//n路径
		data : {
			"conbeamID" : condition[0],
			"pier" : condition[1],
			"ldCode" : condition[2],
			"warnTimeL" : condition[3],
			"warnTimeU" : condition[4],
			"gkbm" : condition[5],
			"dealFlg" : condition[6],
			"pageNo" : pageNoObj,
			"pageFlg":"pccx.pagesize"
		},
		error : function() {
			alert("服务器异常！");
			$('#searchBtn').attr("disabled", false);
		},
		success : function(data) { //请求成功后处理函数
			$('#searchBtn').attr("disabled", false);
			if (data['code'] != 0) {
				emptyTable('tbl_Deal');
			} else {
				//根据处置flag设定表头
				if(dealFlg == 0) {
					$("#dealStatusName").html("处置状态");
				} else {
					$("#dealStatusName").html("处置记录");
				}
				var warnInfoList = data['result'].warnInfo.list;
				var page = data['result'].warnInfo;
				var pierList = data['result'].pierList;
				var ldCodeList = data['result'].ldCodeList;
				var gkList = data['result'].gkList;

				//初期化时设置三个下拉列表
				if(initFlg == 1)
				{	
					if(pierList != null){
						for(var i=0; i<pierList.length; i++){
							$("#pierSelect").append("<option value=" + pierList[i].PIER + ">"+ pierList[i].PIER +"</option>");
						}
				}
					if(gkList != null){
						for(var i=0; i<gkList.length; i++){
							$("#sggkSelect").append("<option value=" + gkList[i].GKBM + ">"+ gkList[i].NAME +"</option>");
						}
					}
				}

				var pageNo = page.pageNo;
				var pageSize = page.pageSize;
				var totalPage = page.totalPage;
				var startNum = page.startNum;
				var totalCount = page.totalCount;
				var endNum = page.endNum;

				if(totalCount == 0){
					writeTable("tableinfo",0,-1,0,0,0);
				} else{
					writeTable("tableinfo",totalCount,startNum,pageNo,totalPage,endNum);	
				}

				//清空table数据
				emptyTable('tbl_Deal');

				//拼接tr
				if(warnInfoList != null){
					for(var i = 0; i < warnInfoList.length; i++) {
						$("#tbl_Deal").append("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
					}
				}
				
				var tblTmp = '#tbl_Deal';
				//设置一览数据
				$(tblTmp).find("tr:gt(0)").each(
					function(j) {
						if(j < warnInfoList.length){
							//显示当前行
							$(this).show();
							var tdArr = $(this).children();

							// 序号
							tdArr.eq(0).html(10 * (pageNo - 1) + j + 1);
							// 设置T构
							tdArr.eq(1).html(
									warnInfoList[j].pier);
							// 设置 梁段
							var ldName = warnInfoList[j].code.split("-");
							var mileStr;
							if(warnInfoList[j].mileageFlag == 0){
								mileStr = "小";
							}else{
								mileStr = "大";
							}
							tdArr.eq(2).html(ldName[0] + "（" + mileStr + "）");
							// 设置测点 编号
							if(warnInfoList[j].gkbm == 1) {
								tdArr.eq(3).html("<span class='circle-point-span'>" +
										warnInfoList[j].cdCode + "</span>");
							} else {
								tdArr.eq(3).html("<span class='measuring' >" +
										warnInfoList[j].cdCode + "</span>");
							}

							// 超限偏差
							if (warnInfoList[j].warntype == 2
									|| warnInfoList[j].warntype == 3) {
								tdArr.eq(4).html(
										(warnInfoList[j].delta).toFixed(1));
							} else {

								tdArr.eq(4).html(
										(warnInfoList[j].outl).toFixed(1));
							}

							// 正常偏差范围
							var lowerTmp = '';
							var upperTmp = '';
							var lowerupper = new Array();
							var lowerupperdefault = new Array();
							//当前工程下的偏差上下限
							if(warnInfoList[j].lowerupper != '' && warnInfoList[j].lowerupper != null){
								lowerupper = warnInfoList[j].lowerupper.split(",");
							}

							//默认的偏差上下限
							if(warnInfoList[j].lowerupperdefault != '' && warnInfoList[j].lowerupperdefault != null){
								lowerupperdefault = warnInfoList[j].lowerupperdefault.split(",");
							}

							if(lowerupper[0] == null ||lowerupper[0] == ''){
								lowerTmp = lowerupperdefault[0];
							} else{
								lowerTmp = lowerupper[0];
							}

							if(lowerupper[1] == null ||lowerupper[1] == ''){
								upperTmp = lowerupperdefault[1];
							} else{
								upperTmp = lowerupper[1];
							}
							tdArr.eq(5).html(
									'[' + lowerTmp + '  ' + upperTmp + ']');
							// 超限施工工况
							tdArr.eq(6).html(
									warnInfoList[j].content);
							// 超限日期
							tdArr.eq(7).html(
									warnInfoList[j].warntime);
							// 偏差超限类别
							tdArr.eq(8).html(
									warnInfoList[j].warntypename);
							//处置状态
							var status;
							if (warnInfoList[j].dealflag == 0) {
								status = "未处置";
							} else if (warnInfoList[j].dealflag == 2) {
								status = "处置中 ";
							}else if (warnInfoList[j].dealflag == 3) {
								status = "待关闭 ";
							} else {
								status = "查看 ";
							}

							tdArr.eq(9).html("<a style='font-size:14px' id='warnId"+ warnInfoList[j].warnId +"'>" + status +"</a>");
							$("#warnId"+warnInfoList[j].warnId).click(function(paramObj){
								return function(){
									showModalDiv(paramObj);
								}
							}(warnInfoList[j]));
						}

					});
			}
		}
	});
}

//显示子画面
function showModalDiv(warnInfoObj){
	//判断是否选中
	if($('#switch').attr('checked')){
		$('#switch').attr('checked',false)
	}
	$('#switchBtn').load();
	//设置T构梁段
	var ldName = warnInfoObj.code.split("-");
	var pierLdNameTmp = "T构梁段："+ warnInfoObj.pier + "#" + ldName[0];

	var mileStr;
	if(warnInfoObj.mileageFlag == 0){
		mileStr = "小";
	}else{
		mileStr = "大";
	}
	pierLdNameTmp = (pierLdNameTmp + "（" + mileStr + "）");
	//设置当前超限测点的工况编码
	$("#dealGkbm").val(warnInfoObj.gkbm);
	//设置当前超限测点的所属梁段
	$("#dealldcode").val(warnInfoObj.partid);
	//设置处置flag
	$("#dealFlag").val(warnInfoObj.dealflag);
	if(warnInfoObj.dealflag == 0){
		//设置T构梁段
		$("#pierLdName").text(pierLdNameTmp);
		//设置处置时间
		var dealDate = new Date();
		$("#dealDate").attr("placeholder",dealDate.Format("yyyy-MM-dd hh:mm:ss"));
		//设置联系人
		$("#dealUserName").text("处置人：");
		//设置超限施工工况
		$("#warnGkbm").text("超限施工工况：" + warnInfoObj.content);
		
		//默认将开关关闭
		$('#switch').attr('checked',false);
		//判断关闭超限的开关是否可以使用
		if(warnInfoObj.ldType==4 || warnInfoObj.ldType==3){//边合 、 中合 可以直接关闭
			$("#switch").attr("disabled",false);
			$("#tishi").html("提示:已满足关闭条件，可关闭。");
		}else{
			var warnFlag = isCloseWarn(warnInfoObj.conbeamid,warnInfoObj.pier,warnInfoObj.partid,warnInfoObj.ldType,warnInfoObj.mileageFlag,warnInfoObj.seq)
			if(warnFlag){
				//控制关闭超限的开关是否可用
				$("#switch").attr("disabled",false);
				$("#tishi").html("提示:已满足关闭条件，可关闭。");
			}else{
				$("#switch").attr("disabled",true);
				$("#tishi").html("提示:暂不满足关闭条件，待下一粱段正常后请再来操作关闭。");
			}
		}	
		
		$("#modalDiv").showModal();
	} else if(warnInfoObj.dealflag == 2){
		//设置T构梁段
		$("#pierLdName").text(pierLdNameTmp);
		$.ajax({
			async : false,//是否异步
			cache : false,//是否使用缓存
			type : 'POST',//请求方式：post
			dataType : 'json',//数据传输格式：json
			url : "pccx/getWarnDeal",//请求的actio//n路径
			data : {"gkbm":warnInfoObj.gkbm,
				"conbeamId":lxlId,
				"partId":warnInfoObj.partid,
				"dealFlg":2},
			error : function() {
				alert("服务器异常！");
			},
			success : function(data) { //请求成功后处理函数
				if(data['result'].warnDeal.length > 0){
					var warnDeal = data['result'].warnDeal;
					//设置联系人
					$("#dealUserName").text("处置人：" + warnDeal[0].accountname);
					//设置处置时间
					$("#dealDate").attr("placeholder",warnDeal[0].dealtime);
					//设置处置方案
					$("#dealPlan").val(warnDeal[0].dealcs);
					//设置备注
					$("#dealRemark").val(warnDeal[0].remark);
					//设置联系方式
					$("#dealPhone").val(warnDeal[0].phone);
					//设置超限施工工况
					$("#warnGkbm").text("超限施工工况：" + warnInfoObj.content);
					debugger;
					//判断关闭超限的开关是否可以使用
					if(warnInfoObj.ldType==4 || warnInfoObj.ldType==3){//边合 、 中合 可以直接关闭
						$("#switch").attr("disabled",false);
						$("#tishi").html("提示:已满足关闭条件，可关闭。");
					}else{
						var warnFlag = isCloseWarn(warnInfoObj.conbeamid,warnInfoObj.pier,warnInfoObj.partid,warnInfoObj.ldType,warnInfoObj.mileageFlag,warnInfoObj.seq)
						if(warnFlag){
							//控制关闭超限的开关是否可用
							$("#switch").attr("disabled",false);
							$("#tishi").html("提示:已满足关闭条件，可关闭。");
						}else{
							$("#switch").attr("disabled",true);
							$("#tishi").html("提示:暂不满足关闭条件，待下一粱段正常后请再来操作关闭。");
						}
					}
					$("#modalDiv").showModal();
				} else{
					console.log(data['msg']);
				}
			}
		});
	}else{
		//设置T构梁段
		$("#detailPierAndLdName").text(pierLdNameTmp);
		$("#warnGkbmDetail").text("超限施工工况：" + warnInfoObj.content);
		$("#gkbm").val(warnInfoObj.gkbm);
		$("#conbeamId").val(lxlId);
		$("#partId").val(warnInfoObj.partid);
		var createTime;
		var dealPeople;
		$.ajax({
			async : false,//是否异步
			cache : false,//是否使用缓存
			type : 'POST',//请求方式：post
			dataType : 'json',//数据传输格式：json
			url : "pccx/getWarnDeal",//请求的actio//n路径
			data : {"gkbm":warnInfoObj.gkbm,
				"conbeamId":lxlId,
				"partId":warnInfoObj.partid,
				"dealFlg":1},
			error : function() {
				alert("服务器异常！");
			},
			success : function(data) { //请求成功后处理函数
				if(data['result'].warnDeal.length > 0){
					var warnDeal = data['result'].warnDeal;
					emptyTable('tblWranDetail');
					var warnDealTemp = new Array();
					//拼接tr
					if(warnDeal != null){
						for(var i = 0,m=0; i < warnDeal.length; i++) {
							
							if(warnDeal[i].dealcs!=null && warnDeal[i].dealcs!=""){
								warnDealTemp[m]=warnDeal[i];
								m++;
								$("#tblWranDetail").append("<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
							}else{
								createTime=warnDeal[i].dealtime;
								dealPeople=warnDeal[i].accountname;
							}
							
						}
					}

					$("#tblWranDetail").find("tr:gt(0)").each(
						function(j) {
							if(j < warnDealTemp.length){
								if(warnDealTemp[j].dealcs!=null &&warnDealTemp[j].dealcs!=""){
									$(this).show();
									var tdArr = $(this).children();
	
									// 序号
									tdArr.eq(0).html(j+1);
									// 处置人
									//处置人取得
									tdArr.eq(1).html(warnDealTemp[j].accountname);
									// 联系方式
									tdArr.eq(2).html(warnDealTemp[j].phone);
									// 处置方案
									tdArr.eq(3).html(warnDealTemp[j].dealcs);
									// 	处置时间
									tdArr.eq(4).html(warnDealTemp[j].dealtime);
									// 备注
									tdArr.eq(5).html(warnDealTemp[j].remark);
								}
							}
						}
					)
					//设置一览数据
//					$("#tblWranDetail").find("tr:gt(0)").each(
//						function(j) {
//							if(j < warnDeal.length){
//								if(warnDeal[j].dealcs!=null &&warnDeal[j].dealcs!=""){
//									$(this).show();
//									var tdArr = $(this).children();
//
//									// 序号
//									tdArr.eq(0).html(j+1);
//									// 处置人
//									//处置人取得
//									tdArr.eq(1).html(warnDeal[j].accountname);
//									// 联系方式
//									tdArr.eq(2).html(warnDeal[j].phone);
//									// 处置方案
//									tdArr.eq(3).html(warnDeal[j].dealcs);
//									// 	处置时间
//									tdArr.eq(4).html(warnDeal[j].dealtime);
//									// 备注
//									tdArr.eq(5).html(warnDeal[j].remark);
//								}
//							}
//						}
//					)
					//warnInfoObj.dealflag == 3 显示 关闭超限 按钮    warnInfoObj.dealflag == 1不显示
					if(warnInfoObj.dealflag == 1){
						$("#warnCloseBtn").hide();
						$("#dealPeople").text("关闭时间："+createTime+"　关闭人："+dealPeople);
					}else{
						$("#warnCloseBtn").show();
					}
					
					
					$("#detailModalDiv").showModal();
				} else{
					console.log(data['msg']);
				}
			}
		});
	}
}
/**
 * 判断是否可以关闭该超限
 */
function isCloseWarn(conbeamid,pier,partid,ldtype,mileageflag,seq){
	//标识未关闭状态下，处置超限时是否可以关闭该超限
	var warnFlag = false;
	$.ajax({
		async : false,//是否异步
		cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
		url : "pccx/isCloseWarn",//请求的actio//n路径
		data : {"conbeamid":conbeamid,
			"pier":pier,
			"partid":partid,
			"ldtype":ldtype,
			"mileageflag":mileageflag,
			"seq":seq},
		error : function() {
			alert("服务器异常！");
		},
		success : function(data) { //请求成功后处理函数
			warnFlag = data;
		}
	});
	return warnFlag;
}



/**
 * 手动关闭超限
 */
function warnClose(){
	debugger;
	var gkbm = $("#gkbm").val();
	var conbeamId = $("#conbeamId").val();
	var partId = $("#partId").val();
	$.ajax({
		async : false,//是否异步
		cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
		url : "pccx/warnClose",//请求的actio//n路径
		data : {"gkbm":gkbm,
			"conbeamId":conbeamId,
			"partId":partId},
		error : function() {
			alert("服务器异常！");
		},
		success : function(data) { //请求成功后处理函数
			alert("处置完成");
			$("#detailModalDiv").hideModal();
			
			getWarnInfo(conditionObj, 1, 1);
		}
	});
}
//隐藏处置画面
function hideModalDiv(){
	//处理措施
	$("#dealPlan").val('');
	//联系电话
	$("#dealPhone").val('');
	//备注
	$("#dealRemark").val('');
	$("#modalDiv").hideModal();
}

//隐藏处置详情画面
function hideModalDivDetail(){
	$("#detailModalDiv").hideModal();
}

//保存处置信息
function saveWarnDeal(){
	
	$("#warnSaveBtn").attr("disabled", true);
	//处置人员编码
	dealUserId = getGlobalAccount();
	var dealUsername = getGlobalUserName();
	//处理措施
	var dealPlan = $("#dealPlan").val();
	if(dealPlan.length>240){
		alert("处置方案不能超过240个字符!");
		$("#warnSaveBtn").attr("disabled", false);
		$("#dealPlan").focus();
		return false;
	}else if (dealPlan == null || dealPlan == '' || dealPlan=="undefined"){
		alert("处置方案不能为空!");
		$("#warnSaveBtn").attr("disabled", false);
		$("#dealPlan").focus();
		return false;
	}
	//处置时间
	var dealTime =  $("#dealDate").attr("placeholder");
	if($("#dealFlag").val() == 2){
		var dealDate = new Date();
		dealTime = dealDate.Format("yyyy/MM/dd hh:mm:ss");
	}
	//联系电话
	var dealPhone = $("#dealPhone").val();
	if (!checkMobiles(dealPhone)){
		alert("手机号或固话格式不正确！");
		$("#warnSaveBtn").attr("disabled", false);
		$("#dealPhone").focus();
		return false;
	}
	//备注
	var dealRemark = $("#dealRemark").val();
	if(dealRemark.length>240){
		alert("备注不能超过240个字符!");
		$("#warnSaveBtn").attr("disabled", false);
		$("#dealRemark").focus();
		return false;
	}
	//工况编码
	var gkbm =$("#dealGkbm").val();
	//梁段编码
	var ldcode = $("#dealldcode").val();
	
	var isColse = $("#switch").val();
	debugger;
	$.ajax({
		async : false,//是否异步
		cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
		url : "pccx/saveWarnDeal",//请求的actio//n路径
		data : {"dealUserId":dealUserId,
			"dealcs":dealPlan,
			"dealTime":dealTime,
			"remark":dealRemark,
			"phone":dealPhone,
			"gkbm":gkbm,
			"ldcode":ldcode,
			"lxlid":lxlId,
			"dealusername":dealUsername,
			"isColse":isColse},
		error : function() {
			alert("服务器异常！");
			$("#warnSaveBtn").attr("disabled", false);
		},
		success : function(data) { //请求成功后处理函数
			
			$("#warnSaveBtn").attr("disabled", false);
			if (data['code'] != 0) {
				alert(data['msg']);
			} else /*if(data['result'].length > 0)*/{
				//处理措施
				$("#dealPlan").val('');
				//联系电话
				$("#dealPhone").val('');
				//备注
				$("#dealRemark").val('');
				
				getWarnInfo(conditionObj, 0, $('#pageNo').val());
			}
		}
	});
	hideModalDiv();
}

// 验证日期
function dateCheck(RQ) {
	var date;
	if (RQ.length == 8 && RQ.indexOf("-") == -1 && RQ.indexOf('/') == -1) {
		date = RQ.substr(0, 4) + '-' + RQ.substr(4, 2) + '-'
				+ RQ.substr(6, 2);
	}else{
		date = RQ;
	}
	var result = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
	if (result == null)
		return false;
	var d = new Date(result[1], result[3] - 1, result[4]);

	return (d.getFullYear() == result[1] && (d.getMonth() + 1) == result[3] && d
			.getDate() == result[4]);

}

//清空表数据
function emptyTable(tableId){
	var tblTmp;
	tblTmp = '#'+tableId;
	$(tblTmp).find("tbody").empty();
}

/**
 * 同步处置中变成待关闭
 */
$('#synsBtn').bind('click',function(){
	$.ajax({
		async : false,//是否异步
		cache : false,//是否使用缓存
		type : 'POST',//请求方式：get
		dataType : 'json',//数据传输格式：json
		url : "warnclose/upWarnCloseStatus",//请求的actio//n路径
		/*data : {
			"conbeamID" : condition[0],
			"pier" : condition[1],
			"ldCode" : condition[2],
			"warnTimeL" : condition[3],
			"warnTimeU" : condition[4],
			"gkbm" : condition[5],
			"dealFlg" : condition[6],
			"pageNo" : pageNoObj,
			"pageFlg":"pccx.pagesize"
		},*/
		error : function() {
//			alert("服务器异常！");
//			$('#searchBtn').attr("disabled", false);
		},
		success : function(data) { 
			
		}
	});
});