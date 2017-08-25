//TODO:连续梁ID取得 
//查询参数数组
var conditionObj = new Array(7);
//初期化画面
function initPierItemList(conBeamId){
	getPierItemList(conBeamId);
}

//检索按钮
$('#search').bind('click',function(){
	Search();
});

//查看按钮
$('#chakan').bind('click',function(){
	chakan(conditionObj[0],conditionObj[1],conditionObj[2],conditionObj[3]);
});

//测点修正
$('#cdUpdate').bind('click',function(){
	cdUpdShow();
});

//修正记录
$('#cdRecord').bind('click',function(){
	cdRecord();
});
$("#cedian-Update").hideModal();
//获取 页面T构数据
function getPierItemList(conBeamId) {
	conditionObj[0] = conBeamId;
	$("#content-wrapper").show();
	var url = "ldstation/getPierItem";
	$.ajax({
		async : false,//是否异步
		//cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
		data : {"Conbeamid":conBeamId},
		url :url,//请求的actio//n路径
		error : function(){
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
		success : function (data){
			var pierItemList= data.result;
			$("#structure").empty();
			for(i=0;i<pierItemList.length;i++){
				$("#structure").append("<option value='"+pierItemList[i].pier+"'>"+pierItemList[i].pier+"</option>");
			}
			getPartNameList(conditionObj[0],pierItemList[0].pier);
		}
	})
}

//获取梁段信息
function getPartNameList(conBeamId,pier){
	var url = "ldstation/getPartNameItem";
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
					LDPOINT_DETAILS = $.i18n.prop('ldPoint.details');
					MEASURE_SMALL = $.i18n.prop('measure.small');
					MEASURE_LARGE = $.i18n.prop('measure.large');
					LDPOINT_ZERO = $.i18n.prop('ldPoint.zero');
					//悬臂浇筑梁段
					LDPOINT_CASTPLACECANTILEVER = $.i18n.prop('ldPoint.castplacecantilever');
					//中跨合龙段Midspan closure
					LDPOINT_MIDCLOSURE = $.i18n.prop('ldPoint.midclosure');
					//边跨合龙段Side span closure
					LDPOINT_SIDECLOSURE = $.i18n.prop('ldPoint.sideclosure');
					//边跨非对称梁段Asymmetry of side span
					LDPOINT_ASYMMETRYSIDE = $.i18n.prop('ldPoint.asymmetryside');
				}
			});
			$("#cedianInfo>tbody").empty();
			var cedianInfoList = data.result;
			for(i=0;i<cedianInfoList.length;i++){
				//测点表信息
				var cedian = cedianInfoList[i];
				//T构
				var pier= cedian.pier==null?"":cedian.pier;
				//测点名称
				var partnum=cedian.partnum==null?"":cedian.partnum;
				//测点略称
				var partshortname=cedian.shortname==null?"":cedian.shortname;
				//小里程高度
				var heights=cedian.heights==null?"":((cedian.heights)/100).toFixed(3);
				//大里程高度
				var heightb=cedian.heightb==null?"":((cedian.heightb)/100).toFixed(3);
				//长度
				var sectlength=cedian.sectlength==null?"":((cedian.sectlength)/100).toFixed(3);
				//梁段类型
				var type=cedian.type==null?"":cedian.type;
				var typename;
				if(type==0){
					typename=LDPOINT_ZERO;//"0号梁段"
				}else if(type==1 || type==2){
					typename=LDPOINT_CASTPLACECANTILEVER;//"悬臂浇筑梁段"
				}else if(type==3){
					typename=LDPOINT_MIDCLOSURE;//"中跨合龙段"
				}else if(type==4){
					typename=LDPOINT_SIDECLOSURE;//"边跨合龙段"
				}else if(type==5){
					typename=LDPOINT_ASYMMETRYSIDE;//"边跨非对称梁段"
				}else{
					typename=LDPOINT_CASTPLACECANTILEVER;//"悬臂浇筑梁段";
				}
				//梁段ID
				var partid=cedian.partid==null?"":cedian.partid;
				//大小里程类型
				var mileageflag=cedian.mileageflag==null?"":cedian.mileageflag;
				//梁段编号
				var ldName = partshortname.split("-");
				var ldbh;
				if(type != 0 && type != 5){
					var mileStr;
					if(mileageflag == 0){
						mileStr = MEASURE_SMALL;
					}else{
						mileStr = MEASURE_LARGE;
					}
					ldbh=ldName[0] + "（" + mileStr + "）";
				} else{
					ldbh=ldName[0];
				}
				
				//向tbody写值
				
				if(i==0){
					$("#cedianInfo").append(
							"<tr>"+
//								"<td><input type='checkbox' name='point' class='point'></td>"+
								"<td rowspan="+cedianInfoList.length+" style='vertical-align:middle;'>"+pier+"</td>"+
								"<td>"+ldbh+"</td>"+
								"<td>"+heights+"</td>"+
								"<td>"+heightb+"</td>"+
								"<td>"+sectlength+"</td>"+
								"<td>"+typename+"</td>"+
								"<td><a href='javascript:chakan("+conBeamId+","+pier+","+partid+","+mileageflag+","+type+")'>"+LDPOINT_DETAILS+"</a> </td>"+
							"</tr>");
				}else{
					$("#cedianInfo").append(
							"<tr>"+
//								"<td><input type='checkbox' name='point' class='point'></td>"+
								"<td>"+ldbh+"</td>"+
								"<td>"+heights+"</td>"+
								"<td>"+heightb+"</td>"+
								"<td>"+sectlength+"</td>"+
								"<td>"+typename+"</td>"+
								"<td><a href='javascript:chakan("+conBeamId+","+pier+","+partid+","+mileageflag+","+type+")'>"+LDPOINT_DETAILS+"</a> </td>"+
							"</tr>");
				}
				
			}
			writeTable("tableinfo",pier,partid,heights,heightb,sectlength,type);
		}
	})
}

//检索处理
function Search(){
	//T构
	var structureId = $("#structure").val();
	//测点信息的取得
	getPartNameList(conditionObj[0],structureId);
}

//查看处理
function chakan(conBeamId,pier,partid,mileageflag,type){
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
			LDPOINT_SMALLMILEAGE = $.i18n.prop('ldPoint.smallmileage');
			LDPOINT_LARGEMILEAGE = $.i18n.prop('ldPoint.largemileage');
		}
	});
	//连续梁
	conditionObj[0]=conBeamId;
	//T构
	conditionObj[1]=pier;
	//梁段编号
	conditionObj[2]=partid;
	//梁段类型
	conditionObj[3]=type;
	//梁段略称
	conditionObj[4] ="";
	
 	$("#content-wrapper").css("display","none");
 	$("#cedian-content").css("display","block");
 	
	if(type != 0 && type != 5){
		if(mileageflag ==0){
			$("#big-mileage").css("display","none");
			$("#small-mileage").css("display","none");
			$("#smalltext").text(':'+LDPOINT_SMALLMILEAGE);
			$("#largetext").text('');
		}else if(mileageflag == 1){
			$("#small-mileage").css("display","none");
			$("#big-mileage").css("display","none");
			$("#smalltext").text('');
			$("#largetext").text(':'+LDPOINT_LARGEMILEAGE);
		}
	}else{
		$("#smalltext").text(LDPOINT_SMALLMILEAGE);
		$("#largetext").text(LDPOINT_LARGEMILEAGE);
		$("#small-mileage").css("display","inline-block");
		$("#big-mileage").css("display","inline-block");
	}
	
	$.ajax({
		async : false,//是否异步
		//cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
		data:{"id":partid},
		url :"ldstation/getldShortname",//请求的actio//n路径
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
					LDPOINT_PROMPT = $.i18n.prop('ldPoint.prompt');
					LDPOINT_ABORTED = $.i18n.prop('ldPoint.aborted');
				}
			});
			$.messager.alert(LDPOINT_PROMPT, LDPOINT_ABORTED, 'error');
		},
		success : function(data) { //请求成功后处理函数
			var shortnameList = data.result;
			conditionObj[4] = shortnameList[0].shortname;
			$("#cedianTitleInfo").text(pier + '#-' + conditionObj[4]);
		}
	});
	
	//里程类型
	if(mileageflag == 2){
		mileageflag = 0;
	}
	conditionObj[5]=mileageflag;
	
	$.ajax({
		async : false,//是否异步
		//cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
		data:{
			"conbeamid":conBeamId,
			"pier":pier,
			"partid":partid,
			"mileage":conditionObj[5]
			},
		url :"ldstation/getldStationValue",//请求的actio//n路径
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
					LDPOINT_PROMPT = $.i18n.prop('ldPoint.prompt');
					LDPOINT_ABORTED = $.i18n.prop('ldPoint.aborted');
				}
			});
			$.messager.alert(LDPOINT_PROMPT, LDPOINT_ABORTED, 'error');
		},
		success : function(data) { //请求成功后处理函数
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
			  		if( gkbmList[i].llX == "-99999999.0000" || gkbmList[i].llX == "-99999999"){
			  			llX = "-";
			  		}else{
			  			llX = gkbmList[i].llX;
			  		}	
			  	}
			  	//理论Y值
			  	var llY = "";
			  	if(gkbmList[i].llY != null){
			  		if(gkbmList[i].llY == "-99999999.0000" || gkbmList[i].llY == "-99999999"){
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

function mileageChange(mileageflag){
	
	var conBeamId=conditionObj[0];
	var pier=conditionObj[1];
	var partid=conditionObj[2];
	
	conditionObj[5] = mileageflag;
	
	$.ajax({
		async : false,//是否异步
		//cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
		data:{
			"conbeamid":conBeamId,
			"pier":pier,
			"partid":partid,
			"mileage":mileageflag
			},
		url :"ldstation/getldStationValue",//请求的actio//n路径
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
					LDPOINT_PROMPT = $.i18n.prop('ldPoint.prompt');
					LDPOINT_ABORTED = $.i18n.prop('ldPoint.aborted');
				}
			});
			$.messager.alert(LDPOINT_PROMPT, LDPOINT_ABORTED, 'error');
		},
		success : function(data) { //请求成功后处理函数
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
					  if(gkbmList[i].llX == "-99999999" || gkbmList[i].llX == "-99999999.0000"){
						  llX = "-";
					  }else{
	  				  	llX = gkbmList[i].llX;						  
					  }
				  }
				  //理论Y值
				  var llY = "";
				  if(gkbmList[i].llY != null){
					  if(gkbmList[i].llY == "-99999999" || gkbmList[i].llY == "-99999999.0000"){
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
//关闭模态框方法
function closeModel(hideid,showid){
	
	if(hideid == 'cedian-Update'){
		//值清空处理
		$("#radio1").attr("checked", true);
		$("#theory").val('');
		$("#theoryX").val('');
		$("#theoryY").val('');
		$("#reason").val('');
	}
	$("#"+hideid).hideModal();
	if(showid!=null || showid!=""){
		$("#"+showid).show();
	}
}

//测点修正
function cdsave(){
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
			//理论高程不能为空！
			LDPOINT_THELENULL = $.i18n.prop('ldPoint.thelenull');
			//理论高程不能为非法数值！
			LDPOINT_THELEILLEGAL = $.i18n.prop('ldPoint.theleillegal');
			//理论X值不能为空！
			LDPOINT_THELEXNULL = $.i18n.prop('ldPoint.thelexnull');
			//理论X值不能为非法数值！
			LDPOINT_THELEXILLEGAL = $.i18n.prop('ldPoint.thelexillegal');
			//理论Y值不能为非法数值！
			LDPOINT_THELEYILLEGAL = $.i18n.prop('ldPoint.thelexillegal');
			LDPOINT_SMALLMILEAGE = $.i18n.prop('ldPoint.smallmileage');
			LDPOINT_LARGEMILEAGE = $.i18n.prop('ldPoint.largemileage');
			//理论高程超出范围！
			LDPOINT_THATION = $.i18n.prop('ldPoint.thation');
			//理论高程必须为非负数！
			LDPOINT_NOTIVE = $.i18n.prop('ldPoint.notive');
			//理论X值超出范围！
			LDPOINT_XBEYOND = $.i18n.prop('ldPoint.xbeyond');
			//理论Y值超出范围！
			LDPOINT_YBEYOND = $.i18n.prop('ldPoint.ybeyond');
			//修正原因不能为空！
			LDPOINT_CORRECT = $.i18n.prop('ldPoint.correct');
			//保存成功！
			LDPOINT_PRESERVATION = $.i18n.prop('ldPoint.preservation');
		}
	});
	var conBeamId=conditionObj[0];
	var pier=conditionObj[1];
	var partid=conditionObj[2];
	var gkbm=$("#condition").val();
	var point=$('.measuringPoint:checked').next().text();
	var theory=$("#theory").val();
	var theoryX=$("#theoryX").val();
	var theoryY=$("#theoryY").val();
	var reason=$("#reason").val();
	var miletype = conditionObj[3];
	var mileagetext = $('input:radio[name="mileage"]:checked').next().text();
	var mileageflag = conditionObj[5];
	var initpoint=''; //初期化测点ID
	var initpointname = '';//测点名称
	
	var pointval = 'radio' + point;
	initpoint = $("." +pointval).attr("id");
	initpointname = $("#"+initpoint).text();
	
	//理论高程空场合的判断
	if(theory == "" || theory == undefined){
		alert(LDPOINT_THELENULL);
		return;
	}
	//理论高程数值型判断
	if(isNaN(theory)){
		alert(LDPOINT_THELEILLEGAL);
		return;
	}
	//3号测点的高程和理论X必须填,其他的理论高程是必须录入的
	if(point == 3){
		//理论X值空场合的判断
		if(theoryX == "" || theory == undefined){
			alert(LDPOINT_THELEXNULL);
			return;
		}
	}
	//理论X值数值型的判断
	if(isNaN(theoryX)){
		alert(LDPOINT_THELEXILLEGAL);
		return;
	}
	//理论Y值数值型的判断
	if(isNaN(theoryY)){
		alert(LDPOINT_THELEYILLEGAL);
		return;
	}
	
	//理论高程校验
	if(theory>99999.9999||(theory.split('.').length >1&&theory.split('.')[1].length>4)){
		alert(LDPOINT_THATION);
		return;
	}
	if(parseFloat(theory) <= 0){
		alert(LDPOINT_NOTIVE);
		return;
	}
	
	//理论X值校验
	if(theoryX>999999999.9999||(theoryX.split('.').length >1&&theoryX.split('.')[1].length>4)||theoryX<-99999999.0000){
		alert(LDPOINT_XBEYOND);
		return;
	}
	
	//理论Y值校验
	if(theoryY>999999999.9999||(theoryY.split('.').length >1&&theoryY.split('.')[1].length>4)||theoryY<-99999999.0000){
		alert(LDPOINT_YBEYOND);
		return;
	}
	if(miletype == 0 || miletype==5){
		if(mileagetext == LDPOINT_SMALLMILEAGE){
			mileageflag = 0;
		}else if(mileagetext == LDPOINT_LARGEMILEAGE){
			mileageflag = 1;
		}
	}
	
	//修正原因
	if(reason == "" || reason == undefined){
		alert(LDPOINT_CORRECT);
		return;
	}
	
	var url = "ldstation/updateCDValue";
	
	$.ajax({
		async : false,//是否异步
		//cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
		data : {
			"conbeamid":conBeamId,
			"pier":pier,
			"partid":partid,
			"miletype":mileageflag,
			"gkbm":gkbm,
			"point":point,
			"theory":theory,
			"theoryX":theoryX,
			"theoryY":theoryY,
			"reason":reason,
			"initpoint":initpoint,
			"initpointname":initpointname},
		url :url,//请求的actio//n路径
		error : function(){
		},
		success : function (data){
			if(data.code==0){
				//值清空处理
				$("#radio1").attr("checked", true);
				$("#theory").val('');
				$("#theoryX").val('');
				$("#theoryY").val('');
				$("#reason").val('');
				$("#cedian-Update").hideModal();
				
				chakan(conBeamId,pier,partid,mileageflag,conditionObj[3]);
				alert(LDPOINT_PRESERVATION);
			}else if(data.code==2){
				alert(data.result);
				return;
			}
		}
	})
}

//施工工况的取得
function cdUpdShow(){
	//连续梁
	conBeamId=conditionObj[0];
	//T构
	pier=conditionObj[1];
	
	$('.measuring .measuringPoint').attr('disabled',false);
	$('.radio1').attr("checked",'checked');
	
	$("#cedian-Update").showModal();
	
	var url = "ldstation/getGkbmItem";
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
			var gkbmList = data.result;
			for(i=0;i<gkbmList.length;i++){
				$("#condition").append("<option value='"+gkbmList[i].id+"'>"+gkbmList[i].name+"</option>");
			}
		}
	})
	
	getInitPointInfo(conditionObj[2],conditionObj[5]);
}


//通过梁段ID获取初始化测点信息
function getInitPointInfo(partid,mileage){
	
	var url = "ldstation/getInitPointInfo";
	$.ajax({
		async : false,//是否异步
		//cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
		url :url,//请求的actio//n路径
		data:{"partid":partid,
			  "mileage":mileage},
		error : function(){
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
					//该梁段中的测点数据查询异常！
					LDPOINT_ABNORMAL = $.i18n.prop('ldPoint.abnormal');
				}
			});
			alert(LDPOINT_ABNORMAL);
		},
		success : function (data){
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
					//该梁段中的测点数据不存在！
					LDPOINT_NONEXISTENT = $.i18n.prop('ldPoint.nonexistent');
				}
			});
			var initPointInfo = data.result;
			if(initPointInfo != null && initPointInfo.length>0){
				for(var i=0;i<initPointInfo.length;i++){
					if(initPointInfo[i].mileageflag == mileage){
						if(initPointInfo[i].pointtype = 2){
							var point = 'radio'+ initPointInfo[i].pointplace;
							$('#'+$("."+point).attr("id")).text(initPointInfo[i].pointname);
							$("."+point).attr("id",initPointInfo[i].initpointid);
						}
					}
				}
			}else{
				alert(LDPOINT_NONEXISTENT);
			}
		}
	})
}

function cdRecord(){
	//连续梁
	conBeamId=conditionObj[0];
	//T构
	pier=conditionObj[1];
	//梁段编号
	partid=conditionObj[2];
	//里程类型
	var mileflag = conditionObj[5];
	
	$("#cedian-Record").showModal();
	
	var url = "ldstation/getCorrectRecordValue";
	var partname=$("#cedianTitleInfo").text();
	
	$.ajax({
		async : false,//是否异步
		//cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
		data : {"conBeamId":conBeamId,
				"partid":partid,
				"mileflag":mileflag},
		url :url,//请求的actio//n路径
		error : function(){
			
		},
		success : function (data){
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
					//墩
					LDPOINT_PIER = $.i18n.prop('ldPoint.pier');
					//号梁段
					LDPOINT_BEAMSEGMENT = $.i18n.prop('ldPoint.beamsegment');
					//测点修正
					LDPOINT_CORRECT = $.i18n.prop('ldPoint.correct');
					//理论值维护
					LDPOINT_MAINTAIN = $.i18n.prop('ldPoint.maintain');
				}
			});
			$("#recordList>tbody").empty();
			var miletext = "";
			if(conditionObj[5] == 1){
				miletext = MEASURE_LARGE;
			}else{
				miletext = MEASURE_SMALL;
			}
			
			var nametext = partname.split("#-");
			partname = nametext[0] + "#"+LDPOINT_PIER+"-" + nametext[1] + LDPOINT_BEAMSEGMENT;
			
			$("#recordTitleInfo").text(data.result.proinfoName+"/"+data.result.prosectionName+"/"+data.result.lxlName+"/"+partname+"(" + miletext +")");

			for(i=0;i<data.result.recordList.length;i++){
				var recordListInfo = data.result.recordList[i];
				//修正者
				var corrector = recordListInfo.corrector;
				//修正记录
				var record = recordListInfo.record;
				//修正类型
				var type = recordListInfo.correcttype;
				var recordtype;
				if(type==0){
					recordtype=LDPOINT_CORRECT;
				}else{
					recordtype=LDPOINT_MAINTAIN;
				}
				//修正时间
				var correcttime = recordListInfo.correcttime;
				if(correcttime != null && correcttime !=""){
					correcttime = new Date(correcttime);
					correcttime = correcttime.Format("yyyy-MM-dd hh:mm:ss");
				}
				
				$("#recordList").append(
						"<tr>"+
							"<td>"+(i+1)+"</td>"+
							"<td>"+corrector+"</td>"+
							"<td>"+record+"</td>"+
							"<td>"+recordtype+"</td>"+
							"<td>"+correcttime+"</td>"+
						"</tr>");
				
				writeTable("tableinfo",corrector,record,recordtype,correcttime);
			}
		}
	})
}