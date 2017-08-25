//连续梁ID取得 
var lxlId;
//查询参数数组
var conditionObjForMeasure = new Array(4);

//初期化Flg
var initFlgTmp = 1;

//初期化页面
function initMeasureInifo(conbeamidParam){
	//初期化参数设置
	initFlgTmp = 1;
	lxlId = conbeamidParam;
	//设置三个下拉列表
	getDropDownList(lxlId);
	//设置参数
	conditionObjForMeasure[0] = lxlId;

	if($("#pierSelect").val() != "" && $("#pierSelect").val()!=null){
		conditionObjForMeasure[1] = $("#pierSelect").val();
	}

	if($("#ldSelect").val() != "" && $("#ldSelect").val()!=null){
		conditionObjForMeasure[2] = $("#ldSelect").val();
	}

	if($("#sggkSelect").val() != "" && $("#sggkSelect").val()!=null){
		conditionObjForMeasure[3] = $("#sggkSelect").val();
	}
	//初期化画面
	writeTable("tableinfo",0,-1,0,0,0);

	//获取测量信息
	getMeasureInfo(conditionObjForMeasure, initFlgTmp);
}


//分页查询
function navigatorPage(pageNo) {
	$('#pageNo').val(pageNo);
	getMeasureInfo(conditionObjForMeasure, 0, pageNo);
}

//改变T构
$("#pierSelect").change(function() {

	pierChange();

});

//获取施工阶段信息
function getSgjdInfo(sgjdid){
	$.ajax({
		async : false,//是否异步
		cache : false,//是否使用缓存
		type : 'POST',//请求方式：POST
		dataType : 'json',//数据传输格式：json
		url : "conbeam/getQihou",//请求的actio//n路径
		data : {"sgjdid":sgjdid},
		error : function() {
			console.log("服务器异常！");
		},
		success : function(data) { //请求成功后处理函数
			if( data['code']!="1"&& data['code']!="-1"){
				var sgjd = data['result'].sgjd;
				if(sgjd.weather==0){
					$("#weatherM").text("天气:"+"晴");
				}else if(sgjd.weather==1){
					$("#weatherM").text("天气:"+"阴");
				}else if(sgjd.weather==2){
					$("#weatherM").text("天气:"+"雨(雪)");
				}
		
				$("#temperatureM").text("温度:"+sgjd.temperature+"℃");
				$("#barometricM").text("气压:"+sgjd.barometric+"hPa");
				$("#clyM").text("测量人员:" + sgjd.cly);
				$("#mtimeM").text("测量时间:" + sgjd.mtime);
			}
		}
	})
}

function pierChange(){
	$.ajax({
		async : false,//是否异步
		cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
		url : "measure/getLdList",//请求的actio//n路径
		data : {"conbeamID" : conditionObjForMeasure[0],"pier":$("#pierSelect").val()
		},
		error : function() {
			var language = $.getUrlParam(LOCAL_PARAM);
			if(language==null){
				language = $.i18n.browserLang();
			}
			jQuery.i18n.properties({//加载资浏览器语言对应的资源文件
				name:'strings', //资源文件名称
				path:'i18n/', //资源文件路径
				mode:'map', //用Map的方式使用资源文件中的值
				language:language,// 对应的语言
				callback: function() {//加载成功后设置显示内容
					MEASURE_SERVER = $.i18n.prop('measure.server');
				}
			});
			alert(MEASURE_SERVER);
		},
		success : function(data) { //请求成功后处理函数
			var language = $.getUrlParam(LOCAL_PARAM);
			if(language==null){
				language = $.i18n.browserLang();
			}
			jQuery.i18n.properties({//加载资浏览器语言对应的资源文件
				name:'strings', //资源文件名称
				path:'i18n/', //资源文件路径
				mode:'map', //用Map的方式使用资源文件中的值
				language:language,// 对应的语言
				callback: function() {//加载成功后设置显示内容
					MEASURE_SMALL = $.i18n.prop('measure.small');
					MEASURE_LARGE = $.i18n.prop('measure.large');
					MEASURE_IN = $.i18n.prop('measure.in');
					MEASURE_EDGE = $.i18n.prop('measure.edge');
					MEASURE_STRAIGHT = $.i18n.prop('measure.straight');
				}
			});
			var ldCodeList = data['result'].ldCodeListTmp;
			$("#ldSelect").empty();
			if(ldCodeList != null){
				for(var i=0; i<ldCodeList.length; i++){
					var ldName = ldCodeList[i].SHORTNAME.split("-");
					if(ldCodeList[i].TYPE == 3){
						$("#ldSelect").append("<option value='" +  ldCodeList[i].SHORTNAME.replace("'","AA") + "'>"+ ldName[0] + "（"+MEASURE_IN+"）" +"</option>");
					} else if(ldCodeList[i].TYPE == 4){
						$("#ldSelect").append("<option value='" +  ldCodeList[i].SHORTNAME.replace("'","AA") + "'>"+ ldName[0] + "（"+MEASURE_EDGE+"）" +"</option>");
					} else if(ldCodeList[i].TYPE == 5){
						$("#ldSelect").append("<option value='" +  ldCodeList[i].SHORTNAME.replace("'","AA") + "'>"+ ldName[0] + "（"+MEASURE_STRAIGHT+"）" +"</option>");
					} else{
						var tmpldname = ldName[0];
						if(ldCodeList[i].MILEAGEFLAG == 0){
							tmpldname = tmpldname + "（"+MEASURE_SMALL+"）"
						} else if(ldCodeList[i].MILEAGEFLAG == 1) {
							tmpldname = tmpldname + "（"+MEASURE_LARGE+"）"

						} else if(ldCodeList[i].MILEAGEFLAG == 2) {

						}
						$("#ldSelect").append("<option value='" +  ldCodeList[i].SHORTNAME.replace("'","AA") + "'>"+ tmpldname +"</option>");
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
	searchMeasure();
});

function searchMeasure(){
	//检索时清空列表
	emptyTable('measureInfoTbl');
	writeTable("tableinfo",0,-1,0,0,0);
	//设置检索条件
	conditionObjForMeasure = [];
	conditionObjForMeasure[0] = lxlId;
	if($("#pierSelect").val() != "" && $("#pierSelect").val()!=null){
		conditionObjForMeasure[1] = $("#pierSelect").val();
	}

	if($("#ldSelect").val() != "" && $("#ldSelect").val()!=null){
		conditionObjForMeasure[2] = $("#ldSelect").val();
	}

	if($("#sggkSelect").val() != "" && $("#sggkSelect").val()!=null){
		conditionObjForMeasure[3] = $("#sggkSelect").val();
	}

	getMeasureInfo(conditionObjForMeasure, 0);
}

//设置下拉列表
function getDropDownList(conbeamid) {
	$.ajax({
		async : false,//是否异步
		cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
		url : "measure/getDropDownList/"+conbeamid,//请求的action路径
//		data : {"conbeamID" : conbeamid},
		error : function() {
			var language = $.getUrlParam(LOCAL_PARAM);
			if(language==null){
				language = $.i18n.browserLang();
			}
			jQuery.i18n.properties({//加载资浏览器语言对应的资源文件
				name:'strings', //资源文件名称
				path:'i18n/', //资源文件路径
				mode:'map', //用Map的方式使用资源文件中的值
				language:language,// 对应的语言
				callback: function() {//加载成功后设置显示内容
					MEASURE_SERVER = $.i18n.prop('measure.server');
				}
			});
			alert(MEASURE_SERVER);
		},
		success : function(data) { //请求成功后处理函数
			var language = $.getUrlParam(LOCAL_PARAM);
			if(language==null){
				language = $.i18n.browserLang();
			}
			jQuery.i18n.properties({//加载资浏览器语言对应的资源文件
				name:'strings', //资源文件名称
				path:'i18n/', //资源文件路径
				mode:'map', //用Map的方式使用资源文件中的值
				language:language,// 对应的语言
				callback: function() {//加载成功后设置显示内容
					MEASURE_ALL = $.i18n.prop('measure.all');
					MEASURE_SMALL = $.i18n.prop('measure.small');
					MEASURE_LARGE = $.i18n.prop('measure.large');
					MEASURE_IN = $.i18n.prop('measure.in');
					MEASURE_EDGE = $.i18n.prop('measure.edge');
					MEASURE_STRAIGHT = $.i18n.prop('measure.straight');
				}
			});
			
			if(data['result'] != null){
				var pierList = data['result'].pierList;
				var ldCodeList = data['result'].ldCodeList;
				var gkList = data['result'].gkList;

				//初期化时设置三个下拉列表
				$("#pierSelect").empty();
				if(pierList != null){
					for(var i=0; i<pierList.length; i++){
						$("#pierSelect").append("<option value=" + pierList[i].PIER + ">"+ pierList[i].PIER +"</option>");
					}
				}
				
				//设置施工梁段下拉列表
				$("#ldSelect").empty();
				if(ldCodeList != null){
					for(var i=0; i<ldCodeList.length; i++){
						var ldName = ldCodeList[i].SHORTNAME.split("-");
						if(ldCodeList[i].TYPE == 3){
							$("#ldSelect").append("<option value='" +  ldCodeList[i].SHORTNAME.replace("'","AA") + "'>"+ ldName[0] + "（"+MEASURE_IN+"）" +"</option>");
						} else if(ldCodeList[i].TYPE == 4){
							$("#ldSelect").append("<option value='" +  ldCodeList[i].SHORTNAME.replace("'","AA") + "'>"+ ldName[0] + "（"+MEASURE_EDGE+"）" +"</option>");
						} else if(ldCodeList[i].TYPE == 5){
							$("#ldSelect").append("<option value='" +  ldCodeList[i].SHORTNAME.replace("'","AA") + "'>"+ ldName[0] + "（"+MEASURE_STRAIGHT+"）" +"</option>");
						} else{
							var tmpldname = ldName[0];
							if(ldCodeList[i].MILEAGEFLAG == 0){
								tmpldname = tmpldname + "（"+MEASURE_SMALL+"）"
							} else if(ldCodeList[i].MILEAGEFLAG == 1) {
								tmpldname = tmpldname + "（"+MEASURE_LARGE+"）"

							} else if(ldCodeList[i].MILEAGEFLAG == 2) {

							}
							$("#ldSelect").append("<option value='" +  ldCodeList[i].SHORTNAME.replace("'","AA") + "'>"+ tmpldname +"</option>");
						}
					}
				}
				
				//设置施工工况下拉列表
				$("#sggkSelect").empty();
				$("#sggkSelect").append("<option value=''>"+MEASURE_ALL+"</option>");
				if(gkList != null){
					for(var i=0; i<gkList.length; i++){
						$("#sggkSelect").append("<option value=" + gkList[i].GKBM + ">"+ gkList[i].NAME +"</option>");
					}
				}
			}
		}
	});
}
//获取 页面所需数据
function getMeasureInfo(condition, initFlg, pageNoObj) {
	$.ajax({
		async : false,//是否异步
		cache : false,//是否使用缓存
		type : 'POST',//请求方式：get
		dataType : 'json',//数据传输格式：json
		url : "measure/getMeasureInfo",//请求的actio//n路径
		data : {
			"conbeamID" : condition[0],
			"pier" : condition[1],
			"shortName" : condition[2],
			"gkbm" : condition[3],
			"pageNo" : pageNoObj
		},
		error : function() {
			$('#searchBtn').attr("disabled", false); 
			var language = $.getUrlParam(LOCAL_PARAM);
			if(language==null){
				language = $.i18n.browserLang();
			}
			jQuery.i18n.properties({//加载资浏览器语言对应的资源文件
				name:'strings', //资源文件名称
				path:'i18n/', //资源文件路径
				mode:'map', //用Map的方式使用资源文件中的值
				language:language,// 对应的语言
				callback: function() {//加载成功后设置显示内容
					MEASURE_SERVER = $.i18n.prop('measure.server');
				}
			});
			alert(MEASURE_SERVER);
		},
		success : function(data) { //请求成功后处理函数
			var language = $.getUrlParam(LOCAL_PARAM);
			if(language==null){
				language = $.i18n.browserLang();
			}
			jQuery.i18n.properties({//加载资浏览器语言对应的资源文件
				name:'strings', //资源文件名称
				path:'i18n/', //资源文件路径
				mode:'map', //用Map的方式使用资源文件中的值
				language:language,// 对应的语言
				callback: function() {//加载成功后设置显示内容
					MEASURE_SMALL = $.i18n.prop('measure.small');
					MEASURE_LARGE = $.i18n.prop('measure.large');
					MEASURE_TEMPORARY = $.i18n.prop('measure.temporary');
					MEASURE_MEASURINGSTAKE = $.i18n.prop('measure.measuringStake');
				}
			});
			
			$('#searchBtn').attr("disabled", false); 
			if (data['code'] != 0) {
				emptyTable('measureInfoTbl');
				$("#weatherM").text("");
				$("#temperatureM").text("");
				$("#barometricM").text("");
				$("#clyM").text("");
				$("#mtimeM").text("");
			} else {
				var measureInfoList = data['result'].measureInfo.list;
				var page = data['result'].measureInfo;
				var pageNo = page.pageNo;
				var pageSize = page.pageSize;
				var totalPage = page.totalPage;
				var startNum = page.startNum;
				var totalCount = page.totalCount;
				var endNum = page.endNum;

				//设置施工阶段信息
				if(condition[3] != "" && condition[3] != null) {
					getSgjdInfo(measureInfoList[0].sgjdid);
				} else {
					$("#weatherM").text("");
					$("#temperatureM").text("");
					$("#barometricM").text("");
					$("#clyM").text("");
					$("#mtimeM").text("");
				}

				if(totalCount == 0){
					writeTable("tableinfo",0,-1,0,0,0);
				} else{
					writeTable("tableinfo",totalCount,startNum,pageNo,totalPage,endNum);	
				}

				//清空table数据
				emptyTable('measureInfoTbl');

				//拼接tr
				if(measureInfoList != null){
					for(var i = 0; i < measureInfoList.length; i++) {
						$("#measureInfoTbl").append("<tr><td style='display:none'></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style='text-align:left'></td><td style='text-align:left'></td><td></td></tr>");
					}
				}

				$("#chkAll").removeAttr("checked");
				var tblTmp = '#measureInfoTbl';
				//设置一览数据
				$(tblTmp).find("tr:gt(0)").each(
					function(j) {
						if(j < measureInfoList.length){
							//显示当前行
							$(this).show();
							var tdArr = $(this).children();
							//选择框
							tdArr.eq(0).html("<input type='checkbox' name='measure_checkbox' class='m-boxs' id='chk"+ j + "'>");
							$("#"+"chk"+j).bind("click",function(){
								checkThis();
							});
							// 设置序号
							var measureInfoObj = measureInfoList[j];
							var noTmp = page.pageNo * pageSize - (pageSize - 1);
							tdArr.eq(1).html(10 * (page.pageNo - 1) + j + 1);
							// 设置T构
							tdArr.eq(2).html(
									measureInfoObj.pier);
							// 设置 梁段
							var ldName = measureInfoObj.ldName.split("-");
							var mileStr;
							if(measureInfoObj.mileageFlag == 0){
								mileStr = MEASURE_SMALL;
							}else{
								mileStr = MEASURE_LARGE;
							}							
							tdArr.eq(3).html(ldName[0] + "（" + mileStr + "）");
							// 设置测点 编号
							tdArr.eq(4).html(
									measureInfoObj.cdbm);
							// 施工工况
							tdArr.eq(5).html(measureInfoObj.gkName);
							// 测点类型
							var ptype='';
							if(measureInfoObj.ptype == 1){
								ptype = MEASURE_TEMPORARY;
							}else if(measureInfoObj.ptype == 2){
								ptype = MEASURE_MEASURINGSTAKE;
							}
							tdArr.eq(6).html(ptype);
							// 测量时间
							tdArr.eq(7).html(measureInfoObj.mtime);
							// 理论高程
							if(measureInfoObj.calculateht == "-500" || measureInfoObj.calculateht == "-500.0000"){
								measureInfoObj.calculateht = "-";
							}
							tdArr.eq(8).html(measureInfoObj.calculateht==null?"":(measureInfoObj.calculateht).toFixed(4));
							// 实测高程
							tdArr.eq(9).html(measureInfoObj.mavalue==null?"":(measureInfoObj.mavalue).toFixed(4));
							// 高程偏差
							tdArr.eq(10).html(measureInfoObj.pcz==null?"":(measureInfoObj.pcz).toFixed(1));
							// 理论坐标
							var llx = measureInfoObj.llx==null?"":(measureInfoObj.llx).toFixed(4);
							if(llx == "-99999999.0000" || llx == "-99999999"){
								llx = "-";
							}
							if(llx == null){
								llx = "";
							}
							var lly =measureInfoObj.lly==null?"": (measureInfoObj.lly).toFixed(4);
							if(lly == "-99999999.0000" || lly == "-99999999"){
								lly = "-";
							}	
							if(lly == null){
								lly = "";
							}
							tdArr.eq(11).html(" X : "+llx+"<br/>"+ " Y : "+lly);
							// 实测坐标
							var xxValue = measureInfoObj.xxValue==null?"":(measureInfoObj.xxValue).toFixed(4);
							if(xxValue==null){
								xxValue = "";
							}
							var yyValue =measureInfoObj.yyValue==null?"": (measureInfoObj.yyValue).toFixed(4);
							if(yyValue==null){
								yyValue = "";
							}
							tdArr.eq(12).html(" X : "+xxValue+"<br/>"+ " Y : "+yyValue);
							// X偏差
							tdArr.eq(13).html(measureInfoObj.xxPcz==null?"":(measureInfoObj.xxPcz).toFixed(1));
						}
					}
				);
			}
		}
	});
}

//清空表数据
function emptyTable(tableId){
	var tblTmp;
	tblTmp = '#'+tableId;
	$(tblTmp).find("tbody").empty();
}

//单击选择框
function checkThis(){
	var checkAllFlg = true;
	$("input[name=measure_checkbox]").each(function(){
		//由于复选框一般选中的是多个,所以可以循环输出 
		if($(this).attr("checked") != "checked"){
			$("#"+"chkAll").removeAttr("checked");
			checkAllFlg = false;
			return;
		}
	});

	if(checkAllFlg){
		$("#"+"chkAll").attr("checked",true);
	}

	return;
}

//全选全不选
function checkAll(){
	if($("#chkAll").attr("checked") == "checked"){
		$("#chkAll").attr("checked",true);
		$("input[name=measure_checkbox]").attr("checked",true);
	}else{
		$("#chkAll").removeAttr("checked");
		$("input[name=measure_checkbox]").removeAttr("checked");
	}
}
