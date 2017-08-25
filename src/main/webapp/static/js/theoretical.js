$("#errorModel").hideModal();
//查询参数数组
var conditionObj = new Array(7);
//梁段数组
var partNameList;
//梁段类型
var partType;
//里程类型
var partmileType = 0;

//施工工况
var sggkList;

/**
 * 画面加载后初始化
 */
$(function(){
	$("#theory").on("focus",function(){
		$(this).attr('placeholder','m',"margin-left","95%")
	})
});

//检索按钮
$('#search').bind('click',function(){
	Search();
});

//初期表示
function initPierItemList(conBeamId){
	//初期化参数设置
	conditionObj[0] = conBeamId;
	//获取T构信息
	getPierItemList(conBeamId);
	//初始化T构信息
	getGkbmList();
}



//T-构列表的取得
function getPierItemList(conBeamId){
	var url = "theoretical/getPierItem";
	$.ajax({
		async : false,//是否异步
		//cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
		data : {"Conbeamid":conBeamId},
		url :url,//请求的actio//n路径
		error : function(){
			
		},
		success : function (data){
			var pierItemList= data.result;
			
			$("#structure").empty();
			for(i=0;i<pierItemList.length;i++){
				$("#structure").append("<option value='"+pierItemList[i].pier+"'>"+pierItemList[i].pier+"</option>");
			}
			//获取梁段信息
			getPartNameList(conBeamId,pierItemList[0].pier,0);
		}
	})
}
//梁段下拉列表的取得
function getPartNameList(conBeamId,pier,pirechangeflag){
	var url = "theoretical/getPartNameItem";
	$.ajax({
		async : false,//是否异步
		//cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
		url :url,//请求的actio//n路径
		data:{"Conbeamid":conBeamId,
				"Pier":pier},
		error : function(){
			
		},
		success : function (data){
			partNameList = data.result;
			
			//梁段ID
			var partid=0;
			//梁段类型
			var ldtype=0;
			debugger;
			for(i=0;i<partNameList.length;i++){
				if(partNameList[i].type == 0){
					partid=partNameList[i].partid;
					ldtype=0;
					break;
				}else{
					partid=partNameList[0].partid;
					ldtype=partNameList[0].type;
				}
			}
			
			$("#beam").empty();
			//梁段下拉框赋值
			for(i=0;i<partNameList.length;i++){
				var ldName = partNameList[i].shortname.split("-");
				if(partNameList[i].type == 3){//中合
					$("#beam").append("<option value='" +	partNameList[i].partid + "'>"+ partNameList[i].partnum +"</option>");
				} else if(partNameList[i].type == 4){ //边合
					$("#beam").append("<option value='" +	partNameList[i].partid + "'>"+ ldName[0] + "（边合）" +"</option>");
				} else if(partNameList[i].type == 5){//直线段
					$("#beam").append("<option value='" +	partNameList[i].partid + "'>"+ ldName[0] + "（直线段）" +"</option>");
				} else if(partNameList[i].type == 0){//0号梁段
					$("#beam").append("<option value='" +	partNameList[i].partid + "'>"+ ldName[0] +"</option>");
				} else {//普通梁段
					if(partNameList[i].mileageflag == 0){
						$("#beam").append("<option value='" +	partNameList[i].partid + "'>"+ ldName[0] + "（小）" +"</option>");
					}else if(partNameList[i].mileageflag == 1){
						$("#beam").append("<option value='" +	partNameList[i].partid + "'>"+ ldName[0] + "（大）" +"</option>");
					}
				}
			}
			
			
			$("select#beam").val(partid);
			partType=ldtype;
			//获取T构信息
//			getGkbmList(ldtype);
//		
			//根据梁段获取测点信息
//			if(ldtype == 0 || ldtype == 5){
//				getInitPointInfo(partid,0);
//			}else{
//				getInitPointInfo(partid);
//			}
			
			//测点列表表示处理
			if(pirechangeflag == 0){
				cdInfoShow();
			}
		}
	})
}
//施工工况的取得
function getGkbmList(){
	var url = "theoretical/getGkbmItem";
	$.ajax({
		async : false,//是否异步
		//cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
		url :url,//请求的actio//n路径
		data:{},
		error : function(){
			
		},
		success : function (data){
			$("#condition").empty();
			var dataPoint = [];
			var gkbmList = data.result;
			sggkList = data.result;
			for(var i=0;i<gkbmList.length;i++){
				$("#condition").append("<option value='"+gkbmList[i].id+"'>"+gkbmList[i].name+"</option>");
				dataPoint.push(gkbmList[i].id)
				
			} 
			//初始化设置 默认选择第一个按钮
			$('.measuringPoint.radio1:eq(0)').attr("checked",false);
			$('.measuringPoint.radio6').prop("checked",'checked');
			$('.circle-point').show();
			$('.select-measuring').hide();
		}
	})
}
//施工工况条件改变时测点的改变
$('#condition').on('change',function () {
	if($('#condition').val()=='1'){
		$('.measuringPoint.radio1:eq(0)').attr("checked",false);
		$('.measuringPoint.radio6').prop("checked",'checked');
		$('.circle-point').show();
		$('.select-measuring').hide();
		 
	}else {
		$('.measuringPoint.radio1:eq(0)').prop("checked",'checked');
		$('.measuringPoint.radio6').attr("checked",false);
		$('.circle-point').hide();
		$('.select-measuring').css('display','inline-block');
	}
});

/**
 * 大小里程选择改变
 * @param mileflag
 */
function mileageChange(mileflag){
	var partid = $("#beam").val();
	partmileType = mileflag;
}
//通过梁段ID获取初始化测点信息
//function getInitPointInfo(partid,mileage){
//	var url = "theoretical/getInitPointInfo";
//	$.ajax({
//		async : false,//是否异步
//		//cache : false,//是否使用缓存
//		type : 'POST',//请求方式：post
//		dataType : 'json',//数据传输格式：json
//		url :url,//请求的actio//n路径
//		data:{"partid":partid,
//				"mileage":mileage},
//		error : function(){
//			$("#errorModel").showModal();
//		},
//		success : function (data){
//			
//			var initPointInfo = data.result;
//	 		debugger;
//			if(initPointInfo != null && initPointInfo.length > 0){
//				for(var i=0;i<initPointInfo.length;i++){
//					partmileType = initPointInfo[i].mileageflag;
//					
//					if(initPointInfo[i].pointtype != null){
//						//测量桩设置
//						if(initPointInfo[i].pointtype ==2){
//							var point = 'radio'+ initPointInfo[i].pointplace;
//							
//							if($("."+point).attr("id").indexOf('radio') > 0){
//								$("."+$("."+point).attr("id")).text(initPointInfo[i].pointname);
//								$("."+point).attr("id",initPointInfo[i].initpointid);
//							}else{
//								$('#'+$("."+point).attr("id")).text(initPointInfo[i].pointname);
//								$("."+point).attr("id",initPointInfo[i].initpointid);
//							}
//						}else{//临时测点设置
//							var point = 'radio'+ (parseInt(initPointInfo[i].pointplace)+5);
//							
//							if($("."+point).attr("id").indexOf('radio') > 0){
//								$("."+$("."+point).attr("id")).text(initPointInfo[i].pointname);
//								$("."+point).attr("id",initPointInfo[i].initpointid);
//							}else{
//								$('#'+$("."+point).attr("id")).text(initPointInfo[i].pointname);
//								$("."+point).attr("id",initPointInfo[i].initpointid);
//							}
//						}
//					}else{
//						$("#errorModel").showModal();
//					}
//				}
//			}else{
//				$("#errorModel").showModal();
//			}
//		}
//	})
//}

//关闭模态框方法
function closeModel(domid){
	$("#"+domid).hideModal();
}

//列表的设置

/**
 * 添加到列表 同时将数据保存到数据库
 */
function setTheoreticalValue(){
	//变量取值
	var structure = $("#structure").val();//T-构
	var beam = $("#beam").val();//梁段
	//大小里程
	var miletype = $("input[name='mileage']:checked").val();
	var condition = $("#condition").val();//施工工况
	var pointVal=$('.measuringPoint:checked').next().text();//单选按钮选中的哪个的值
	var theory=$("#theory").val();//理论高程
	var theoryX=$("#theoryX").val();//理论X值
	var theoryY=$("#theoryY").val();//理论Y值
	
	//理论高程空场合的判断
	if(theory == "" || theory == undefined){
		alert("理论高程不能为空！");
		return;
	}
	//理论高程数值型判断
	if(isNaN(theory)){
		alert("理论高程不能为非法数值！");
		return;
	}
	
	//理论高程校验
	if(theory>99999.9999||(theory.split('.').length >1&&theory.split('.')[1].length>4)){
		alert("理论高程超出范围");
		return;
	}
	
	//理论高程数值型判断
	if(parseFloat(theory) <= 0){
		alert("理论高程必须为非负数！");
		return;
	}
	//3号测点的高程和理论X必须填,其他的理论高程是必须录入的
	if(pointVal == 3){
		//理论X值空场合的判断
		if(theoryX == "" || theory == undefined){
			alert("理论X值不能为空！");
			return;
		}
	}
	//理论X值数值型的判断
	if(isNaN(theoryX)){
		alert("理论X值不能非法数值！");
		return;
	}
	//理论X值是否为空的判断
//	if(theoryX == null || theoryX != undefined || $.trim(theoryX) != ""){
//		alert("理论X值不能为空值！");
//		return;
//	}
	//理论Y值数值型的判断
	if(isNaN(theoryY)){
		alert("理论Y值不能为非法数值！");
		return;
	}
	
	//理论X值校验
	if(theoryX>999999999.9999||(theoryX.split('.').length >1&&theoryX.split('.')[1].length>4)||theoryX<-99999999.0000){
		alert("理论X值超出范围");
		return;
	}
	//理论Y值是否为空的判断 
//	if(theoryY == null || theoryY != undefined || $.trim(theoryY) != ""){
//		alert("理论Y值不能为空值！");
//		return;
//	}
	
	//理论Y值校验
	if(theoryY>999999999.9999||(theoryY.split('.').length >1&&theoryY.split('.')[1].length>4)||theoryY<-99999999.0000){
		alert("理论Y值超出范围");
		return;
	}
	
	var url = "theoretical/setTheoreticalValue";//路径
	 
		$.ajax({
			async : false,//是否异步
			//cache : false,//是否使用缓存
			type : 'POST',//请求方式：post
			dataType : 'json',//数据传输格式：json
			data:{
				"conbeamid":conditionObj[0],
				"structure":structure,
				"beam":beam,//梁段ID
				"partType":partType,//梁段类型
				"miletype":miletype,//大小里程
				"condition":condition,//工况
				"point":pointVal,//测点位置号
				"theory":theory,//理论高程
				"theoryX":theoryX,//理论坐标X
				"theoryY":theoryY//理论坐标Y
				},
			url :url,//请求的actio//n路径
			error : function() {
				$.messager.alert('提示', '请求失败！', 'error');
			},
			success : function(data) {//请求成功后处理函数
			 
				if(data.code==0){
				 setTableValue(theory,theoryX,theoryY)
				}else if(data.code==2){
				alert(data.result);
				return;
				}
			 
				//理论值信息的清空处理
				$("#theory").val('');//理论高程
				$("#theoryX").val('');//理论X值
				$("#theoryY").val('');//理论Y值
				 
			}
		});
}
//设置列表的值
function setTableValue(calculateht,llX,llY){
		if(calculateht==null){
			calculateht="";
		}
		if(llX==null){
			llX="";
		}
		if(llY==null){
			llY="";
		}
		if(calculateht == "-500" || calculateht == "-500.0000"){
			calculateht = "-";
		}
		if(llX == "-99999999.0000" || llX == "-99999999"){
			llX = "-";
		}
		if(llY == "-99999999.0000" || llY == "-99999999"){
			llY = "-";
		}
	 var pointVal=parseInt($('.measuringPoint:checked').next().text());//按钮
	 var sggk = $("#condition").val();//施工工况
	 if(sggk==1){//施工工况挂篮后
		 $($($("#linshicedian>tbody").find("tr")[0]).find("td")[pointVal+2]).text(calculateht);
		 $($($("#linshicedian>tbody").find("tr")[1]).find("td")[pointVal]).text(llX);
		 $($($("#linshicedian>tbody").find("tr")[2]).find("td")[pointVal]).text(llY);
	 }else{
		 $($($("#celiangzhuang>tbody").find("tr")[pointVal-1]).find("td")[sggk*3-4]).text(calculateht);
		 $($($("#celiangzhuang>tbody").find("tr")[pointVal-1]).find("td")[sggk*3-3]).text(llX);
		 $($($("#celiangzhuang>tbody").find("tr")[pointVal-1]).find("td")[sggk*3-2]).text(llY);
	 }
}


//T-构下拉框改变事件
function structureChange(){
	var structureId = $("#structure").val();
	//获取相应T构下的梁段信息
	getPartNameList(conditionObj[0],structureId);
	
}

//梁段测点信息表示
function cdInfoShow(){
	//变量取值
	var structure = $("#structure").val();//T-构
	var beam = $("#beam").val();//梁段
	var mileage = $('input:radio[name="mileage"]:checked').next().text();
	var mileages = $("#mileage").css('display');
	var miletype = partmileType;
	var condition = $("#condition").val();//施工工况
	var pointVal=$('input:radio[name="point"]:checked').next().text();//按钮
	var theory=$("#theory").val();//理论高程
	var theoryX=$("#theoryX").val();//理论X值
	var theoryY=$("#theoryY").val();//理论Y值
	
	//大里程小里程的判断
	if(mileages != "none" ){
		if((partType == 0 || partType == 5) && mileage=="小里程"){
			miletype = 0;
		}else if((partType == 0 || partType == 5) && mileage=="大里程"){
			miletype = 1
		}
	}else{
		var url = "theoretical/getMiletype";
		$.ajax({
			async : false,//是否异步
			type : 'POST',//请求方式：post
			dataType : 'json',//数据传输格式：json
			data:{	 
				"beam":beam
				},
			url :url,//请求的actio//n路径
			error : function() {
				$.messager.alert('提示', '请求失败！', 'error');
			},
			success : function(data) {//请求成功后处理函数
				miletype = data;
			}
		});
	}
	var url = "theoretical/getTheoreticalInfo";//路径
		$.ajax({
			async : false,//是否异步
			//cache : false,//是否使用缓存
			type : 'POST',//请求方式：post
			dataType : 'json',//数据传输格式：json
			data:{
				"conbeamid":conditionObj[0],
				"structure":structure,
				"beam":beam,
				"miletype":miletype
				},
			url :url,//请求的actio//n路径
			error : function() {
				$.messager.alert('提示', '请求失败！', 'error');
			},
			success : function(data) {//请求成功后处理函数
				//测量桩的清空处理
					for(var m=0;m<5;m++){
						for(var n=2;n<17;n++){
							$($($("#celiangzhuang>tbody").find("tr")[m]).find("td")[n]).text('');
						}
					}
					
					//临时桩的清空处理
					for(var n=3;n<9;n++){
						$($($("#linshicedian>tbody").find("tr")[0]).find("td")[n]).text('');
					}
					
					for(var m=1;m<3;m++){
						for(var n=1;n<7;n++){
							$($($("#linshicedian>tbody").find("tr")[m]).find("td")[n]).text('');
						}
					}
				
				var gkbmList = data.result;
				for(i=0;i<gkbmList.length;i++){
					var type = gkbmList[i].ptype;
					var point = gkbmList[i].pointplace;
					var gkbm = gkbmList[i].gkbm;
					
					//理论高程
					var calculateht = "";
					if(gkbmList[i].calculateht != null){
						if(gkbmList[i].calculateht == "-500" || gkbmList[i].calculateht == "-500.0000"){
							calculateht = "-";
						}else{
							calculateht = gkbmList[i].calculateht;
						}	
					}
					//理论X值
					var llX = "";
					if(gkbmList[i].llX != null){
						if(gkbmList[i].llX=="-99999999.0000" || gkbmList[i].llX=="-99999999"){
							llX = "-";
						}else{
							llX = gkbmList[i].llX;
						}						
					}
					//理论Y值
					var llY = "";
					if(gkbmList[i].llY != null){
						if(gkbmList[i].llY == "-99999999"||gkbmList[i].llY == "-99999999.0000"){
							llY = "-";
						}else{
							llY = gkbmList[i].llY;
						}
					}
					
					if (type==2){
						$($($("#celiangzhuang>tbody").find("tr")[point-1]).find("td")[gkbm*3-4]).text(calculateht);
						$($($("#celiangzhuang>tbody").find("tr")[point-1]).find("td")[gkbm*3-3]).text(llX);
						$($($("#celiangzhuang>tbody").find("tr")[point-1]).find("td")[gkbm*3-2]).text(llY);
					}else if(type==1){
						$($($("#linshicedian>tbody").find("tr")[0]).find("td")[point+2]).text(calculateht);
						$($($("#linshicedian>tbody").find("tr")[1]).find("td")[point]).text(llX);
						$($($("#linshicedian>tbody").find("tr")[2]).find("td")[point]).text(llY);
					}
				}
			}
		});
}

//梁段下拉框改变事件
function beamChange(){
	var partid = $("#beam").val();
	debugger;
	for(i=0;i<partNameList.length;i++){
		if(partNameList[i].partid == partid){
			sggkSet(partNameList[i].type);
			partType = partNameList[i].type;
		}
	}
	//如果是0号梁段或者是直线段 默认选择0号梁段
	if(partType == 0 || partType == 5){
		$('#small-mileage').attr("checked",'checked');
	}
}

//根据梁段类型判断是否显示大小里程按钮
function sggkSet(partType){
		if(partType == 0 || partType == 5){
			$("#mileage").removeClass("mileage-region");
			$("#mileage").css("display","inline-block");
		}else{
			$("#mileage").addClass("mileage-region");
			$("#mileage").css("display","none");
		}
}

function Search(){
	var partid = $("#beam").val();
	
	//测点信息表示
	cdInfoShow();
}
