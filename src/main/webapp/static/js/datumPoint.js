var datumPointAll = [];
$("#addDatumPoint").hideModal();
$("#updateDatumPoint").hideModal();
$("#deleteDatumPoint").hideModal();
$("#watchRecord").hideModal();

var datumPointConBeamId;

/**
 * 初始化
 */
function initDatumPoint(conBeamId) {

	datumPointConBeamId = conBeamId;
	getDatumPoint();
}

//下一页触发
function navigatorPage(pageNo){
	 getDatumPoint(pageNo)	
}

//获取基点信息
function getDatumPoint(pageNo){
	
	var param={"pageNo":pageNo,"lxlid":datumPointConBeamId};
	var url="datum/getDatumPointList";//路径
	
	var totalCount,pageNo,totalPage,startNum,endNum;
	$("#datumPointList>tbody").empty();
	$.ajax({
		async : true,//是否异步
		//cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
		url :url,//请求的actio//n路径
		data:param,
		error : function(){
			return;
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
					//查看
					LDPOINT_DETAILS = $.i18n.prop('ldPoint.details');
					//正常
					DATUM_NORMAL = $.i18n.prop('datum.normal');
					//废弃
					DATUM_ABANDONED = $.i18n.prop('datum.abandoned');
				}
			});
			if(data.result.length == 0||data.result.list ==null){
				writeTable("tableinfo",0,-1,0,0,0);
				return;
			}
			$("#datumPointList>tbody").empty();
			totalCount = data.result.totalCount;//总条数
			pageNo = data.result.pageNo;//当前页数
			totalPage = data.result.totalPage;//总计页数
			if(totalCount==0){
				startNum = -1;
				endNum =0;
			}else{
				startNum = data.result.startNum;
    			endNum = data.result.endNum;
			}
			datumPointAll = data.result.list;
			if(data.result.list != null){
				for(i=0;i<data.result.list.length;i++){
	 				var datumPoint = data.result.list[i]; 
	 			
	 				var name=datumPoint.basename ==null?"":datumPoint.basename;
	 				var basexx=datumPoint.basexx ==null?"":datumPoint.basexx;
	 				var baseyy=datumPoint.baseyy ==null?"":datumPoint.baseyy;
	 				var basezz=datumPoint.basezz ==null?"":datumPoint.basezz;
					
	 				var updateDate=datumPoint.updatetime ==null?"":new Date(datumPoint.updatetime).Format("yyyy-MM-dd hh:mm:ss");
	 				var status = "";
	 				var disabledStr = "";
	 				if(datumPoint.useflag !=null){
	 					if(datumPoint.useflag=="0"){
	 						status = DATUM_NORMAL;//正常

	 					}else if(datumPoint.useflag=="1"){
	 						status = DATUM_ABANDONED;//废弃
	 						disabledStr = "disabled";
	 					}    				
	 				}
	 				$("#datumPointList").append("<tr>"+
						 	"<td><input type='checkbox' name='point' class='point' "+disabledStr+" onchange='selectCheckbox()' ></td>"+
					        "<td>"+(10*(pageNo-1)+i+1)+"</td>"+
					        "<td>"+name+"</td>"+
					        "<td>"+basexx+"</td>"+
					        "<td>"+baseyy+"</td>"+
					        "<td>"+basezz+"</td>"+
					        "<td>"+updateDate+"</td>"+
					        "<td><a href='javascript:watch("+datumPoint.baseid+","+datumPoint.conbeamid+","+datumPoint.partid+")'>"+LDPOINT_DETAILS+"</a> </td>"+
					        "<td>"+status+"</td>"+
				   		"</tr>");
	 			}
			}
 			
 			writeTable("tableinfo",totalCount,startNum,pageNo,totalPage,endNum);
		}
		
	})
}

//单击选择框
function selectCheckbox(){
	var trList = $("#datumPointList>tbody").find("tr");
	var checkflg = false;
	if(trList != null){
		for(i = 0;i<trList.length;i++){
			console.log($($(trList[i]).find("input[type = 'checkbox']")).attr("disabled"))
			if(!$($(trList[i]).find("input[type = 'checkbox']")).attr("disabled")&&!$($(trList[i]).find("input[type = 'checkbox']")).attr("checked")){
				checkflg = true;
				break;
			}
		}
		for(i = 0;i<trList.length;i++){
			console.log($($(trList[i]).find("input[type = 'checkbox']")).attr("disabled"))
			if(!$($(trList[i]).find("input[type = 'checkbox']")).attr("disabled")&&!$($(trList[i]).find("input[type = 'checkbox']")).attr("checked")){
				checkflg = true;
				break;
			}
		}
	}
	
	if(checkflg){
		$("#datum").removeAttr("checked");
	}else{
		$("#datum").attr("checked",true);
		
	}
	
}

function watch(baseid,lxlid,ldid){
	watchChangeRecord(baseid,lxlid,ldid);
}

//删除基点信息
function deleteDatumPoint(){
	var trList = $("#datumPointList>tbody").find("tr");
	var deleteDatumPoint=[];
	if(trList != null){
		for(i=0;i<trList.length;i++){
			if($($(trList[i]).find("input[type='checkbox']")).is(':checked')){
				datumPointAll[i].useflag=1;
				deleteDatumPoint.push(datumPointAll[i]);
			}
		}
	}
	
	var deleteDatumPointStr = JSON.stringify(deleteDatumPoint);
	var param={"deleteDatumPointStr":deleteDatumPointStr};//保存的数据
	var url="datum/deleteDatumPoint";//路径
	$.ajax({
			async : true,//是否异步
    		//cache : false,//是否使用缓存
    		type : 'POST',//请求方式：post
    		dataType : 'json',//数据传输格式：json
    		url :url,//请求的actio//n路径
    		data:param,
    		error : function(){
    			
    		},
    		success : function (data){
    			console.log("删除成功！");
    			$("#deleteDatumPoint").hideModal();
    			getDatumPoint();
    		}
    	})
}

//更新基点信息
function updateDatumPoint(){
	$("#saveDatumBtn").attr("disabled",true);
	var trList = $("#datumPointList>tbody").find("tr");
	var updateDatumPoint={};
	if(trList != null){
		for(i=0;i<trList.length;i++){
			if($($(trList[i]).find("input[type='checkbox']")).is(':checked')){
				//datumPointAll[i].useflag="0";
				updateDatumPoint=datumPointAll[i];
				break;
			}
		}
	}
	
	updateDatumPoint.basexx = $("#updateBasexx").val();
	updateDatumPoint.baseyy = $("#updateBaseyy").val();
	updateDatumPoint.basezz = $("#updateBasezz").val();
	if(updateDatumPoint.basexx == null || $.trim(updateDatumPoint.basexx) == ""){
		alert("基准点平面坐标x不能为空值！");
		$("#saveDatumBtn").removeAttr("disabled");
		return;
	}
	if(updateDatumPoint.basexx>999999999.9999||(updateDatumPoint.basexx.split('.').length>1&&updateDatumPoint.basexx.split('.')[1].length>4)){
		alert("基准点平面坐标x超出范围");
		$("#saveDatumBtn").removeAttr("disabled");
		return;
	}
	if(isNaN(updateDatumPoint.basexx)){
		alert("基准点平面坐标x格式不正确");
		$("#saveDatumBtn").removeAttr("disabled");
		return;
	}
	if(updateDatumPoint.baseyy == null || $.trim(updateDatumPoint.baseyy) == ""){
		alert("基准点平面坐标y不能为空值！");
		$("#saveDatumBtn").removeAttr("disabled");
		return;
	}
	if(updateDatumPoint.baseyy>999999999.9999||(updateDatumPoint.baseyy.split('.').length>1&&updateDatumPoint.baseyy.split('.')[1].length>4)){
		alert("基准点平面坐标y超出范围");
		$("#saveDatumBtn").removeAttr("disabled");
		return;
	}
	if(isNaN(updateDatumPoint.baseyy)){
		alert("基准点平面坐标y格式不正确");
		$("#saveDatumBtn").removeAttr("disabled");
		return;
	}
	if(updateDatumPoint.basezz == null || $.trim(updateDatumPoint.basezz) == ""){
		alert("基准点高程z不能为空值！");
		$("#saveDatumBtn").removeAttr("disabled");
		return;
	}
	if(updateDatumPoint.basezz>99999.9999||(updateDatumPoint.basezz.split('.').length>1&&updateDatumPoint.basezz.split('.')[1].length>4)){
		alert("基准点高程z超出范围");
		$("#saveDatumBtn").removeAttr("disabled");
		return;
	}
	if(isNaN(updateDatumPoint.basezz)){
		alert("基准点高程z格式不正确！");
		$("#saveDatumBtn").removeAttr("disabled");
		return;
	}
	if(parseFloat(updateDatumPoint.basezz) < 0){
    	alert("基准点高程z格式不正确！");
    	$("#saveDatumBtn").removeAttr("disabled");
        return;
    }
	var changeReason =$("#updateReason").val();
	if(changeReason ==""){
		alert("修正原因不能为空");
		$("#saveDatumBtn").removeAttr("disabled");
		return;
	}
	var updateDatumPointStr = JSON.stringify(updateDatumPoint);
	var param={"updateDatumPointStr":updateDatumPointStr,"changeReason":changeReason};//保存的数据
	var url="datum/updateDatumPoint";//路径
	$.ajax({
			async : true,//是否异步
    		//cache : false,//是否使用缓存
    		type : 'POST',//请求方式：post
    		dataType : 'json',//数据传输格式：json
    		url :url,//请求的actio//n路径
    		data:param,
    		error : function(){
    			$("#saveDatumBtn").removeAttr("disabled");
    		},
    		success : function (data){
    			alert("修改成功！");
    			$("#saveDatumBtn").removeAttr("disabled");
    			$("#updateDatumPoint").hideModal();
    			$("#updateBasexx").val("");
    			$("#updateBaseyy").val("");
    			$("#updateBasezz").val("");
    			$("#updateReason").val("");
    			getDatumPoint();
    		}
    	})
}

//向数据库插入数据
function addDatumPoint(){
	$("#addDatumBtn").attr("disabled",true);
	var addDatumPoint={};
	var basenames = $("#addBaseName").val();
	if(basenames.length>50){
		alert("基准点名称不能超过50个字符！");
		$("#addDatumBtn").removeAttr("disabled");
		return;
	}else if(basenames != null && $.trim(basenames) != ""){
		addDatumPoint.basename = basenames;
	}else{
		alert("基准点名称不能为空！");
		$("#addDatumBtn").removeAttr("disabled");
		return;
	} 
	addDatumPoint.basexx = $("#addBasexx").val();
	addDatumPoint.baseyy = $("#addBaseyy").val();
	addDatumPoint.basezz = $("#addBasezz").val();
	if(addDatumPoint.basexx == null || $.trim(addDatumPoint.basexx) == ""){
		alert("基准点平面坐标x不能为空值！");
		$("#addDatumBtn").removeAttr("disabled");
		return;
	}
	if(isNaN(addDatumPoint.basexx)){
		alert("基准点平面坐标x格式不正确");
		$("#addDatumBtn").removeAttr("disabled");
		return;
	}
	if(addDatumPoint.basexx>999999999.9999||(addDatumPoint.basexx.split('.').length>1&&addDatumPoint.basexx.split('.')[1].length>4)){
		alert("基准点平面坐标x超出范围");
		$("#addDatumBtn").removeAttr("disabled");
		return;
	}
	if(addDatumPoint.baseyy == null || $.trim(addDatumPoint.baseyy) == ""){
		alert("基准点平面坐标y不能为空值！");
		$("#addDatumBtn").removeAttr("disabled");
		return;
	}
	if(isNaN(addDatumPoint.baseyy)){
		alert("基准点平面坐标y格式不正确");
		$("#addDatumBtn").removeAttr("disabled");
		return;
	}
	if(addDatumPoint.baseyy>999999999.9999||(addDatumPoint.baseyy.split('.').length>1&&addDatumPoint.baseyy.split('.')[1].length>4)){
		alert("基准点平面坐标y超出范围");
		$("#addDatumBtn").removeAttr("disabled");
		return;
	}
	if(addDatumPoint.basezz == null || $.trim(addDatumPoint.basezz) == ""){
		alert("基准点高程不能为空值！");
		$("#addDatumBtn").removeAttr("disabled");
		return;
	}
	if(isNaN(addDatumPoint.basezz)){
		alert("基准点高程z格式不正确！");
		$("#addDatumBtn").removeAttr("disabled");
		return;
	}
	 if(addDatumPoint.basezz>99999.9999||(addDatumPoint.basezz.split('.').length >1&&addDatumPoint.basezz.split('.')[1].length>4)){
			alert("基点高程z超出范围");
			$("#addDatumBtn").removeAttr("disabled");
			return;
		}
	 if(parseFloat(addDatumPoint.basezz) < 0){
	    	alert("基准点高程z不能为负数！");
	    	$("#addDatumBtn").removeAttr("disabled");
	        return;
	    }
	addDatumPoint.conbeamid = datumPointConBeamId;
	//addDatumPoint.partid = "301";
	var addDatumPointStr = JSON.stringify(addDatumPoint);
	var param={"addDatumPointStr":addDatumPointStr};//保存的数据
	var url="datum/insertDatumPoint";//路径 
	$.ajax({
			async : true,//是否异步
    		//cache : false,//是否使用缓存
    		type : 'POST',//请求方式：post
    		dataType : 'json',//数据传输格式：json
    		url :url,//请求的actio//n路径
    		data:param,
    		error : function(){
    			$("#addDatumBtn").removeAttr("disabled");
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
    					//保存成功！
    					LDPOINT_PRESERVATION = $.i18n.prop('ldPoint.preservation');
    				}
    			});
    			alert(LDPOINT_PRESERVATION);//保存成功
    			$("#addDatumBtn").removeAttr("disabled");
    			getDatumPoint();
				$("#addDatumPoint").hideModal();
				$("#addBaseName").val("");
			 	$("#addBasexx").val("");
			 	$("#addBaseyy").val("");
				$("#addBasezz").val("");
    		}
    	})
	
}

//打开模态框
function openModel(domid){
	if(domid=="addDatumPoint"){
		$("#addBasexx").val(0);
		$("#addBaseyy").val(0);
		$("#addBasezz").val(0);
	}
	if(domid=="updateDatumPoint"){
		var trList = $("#datumPointList>tbody").find("tr");
		var count =0;
		if(trList != null){
			for(i=0;i<trList.length;i++){
				if($($(trList[i]).find("input[type='checkbox']")).is(':checked')){
					$("#updateBasename").val(datumPointAll[i].basename);
					$("#updateBasexx").val(datumPointAll[i].basexx);
					$("#updateBaseyy").val(datumPointAll[i].baseyy);
					$("#updateBasezz").val(datumPointAll[i].basezz);
					count++;
				}
		}
		
		}
		if(count==0||count>1){
			alert("请选中一条数据");
			count=0
			return;
		}
	}
	if(domid=="deleteDatumPoint"){
		var trList = $("#datumPointList>tbody").find("tr");
		var isSelect = false;
		if(trList != null){
			for(i=0;i<trList.length;i++){
				if($($(trList[i]).find("input[type='checkbox']")).is(':checked')){
					if(datumPointAll[i].useflag==1){
						alert("数据已废弃，不能再次废弃");
						return
					}
					isSelect =true;
					break;
				}
			}
		}
		
		if(!isSelect){
			alert("请选择数据");
			return;
		}
	}
	$("#"+domid).showModal();
}

//关闭模态框方法
function closeModel(domid){
	$("#"+domid).hideModal();
	$("#updateBasexx").val("");
	$("#updateBaseyy").val("");
	$("#updateBasezz").val("");
	$("#updateReason").val("");
	$("#addBaseName").val("");
 	$("#addBasexx").val("");
 	$("#addBaseyy").val("");
	$("#addBasezz").val("");
}

function watchChangeRecord(baseid,lxlid){
	var param={"baseid":baseid,"lxlid":lxlid};//保存的数据
	var url="datum/watchChangeRecord";//路径
	$.ajax({
		async : true,//是否异步
		//cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
		url :url,//请求的actio//n路径
		data:param,
		error : function(){
			
		},
		success : function (data){
			$("#showRecordTable>tbody").empty();
			var basename ="";
			if(datumPointAll != null){
				for(var i=0;i<datumPointAll.length;i++){
					if(datumPointAll[i].baseid==baseid){
						basename = datumPointAll[i].basename;
					}
				}
			}
			
			$("#watchSpan").text(((data.result.proinfoName)==null?"":(data.result.proinfoName))+"/"+((data.result.prosectionName)==null ? "":(data.result.prosectionName))+"/"+((data.result.lxlName)==null ? "":(data.result.lxlName)) +"/"+(basename==null ? "":basename));
			if(data.result.recordList != null){
				for(var i=0;i<data.result.recordList.length;i++){
					var record =  data.result.recordList[i];
					var reason = record.changereason==null?"":record.changereason;
					$("#showRecordTable").append("<tr>"+
							"<td>"+(i+1)+"</td>"+
							"<td>"+record.changeperson+"</td>"+
							"<td>"+record.basexx+"</td>"+
							"<td>"+record.baseyy+"</td>"+
							"<td>"+record.basezz+"</td>"+
							"<td>"+reason+"</td>"+
							"<td>"+new Date(record.createdate).Format("yyyy-MM-dd hh:mm:ss")+"</td>"+
							"</tr>")
				}
			}
			
			$("#watchRecord").showModal();
			//getDatumPoint();
		}
	})
}

function selectAll(){
	var trList = $("#datumPointList>tbody").find("tr");
	if($("#datum").attr("checked")){
		if(trList != null){
			for(i=0;i<trList.length;i++){
				if($($(trList[i]).find("input[type='checkbox']")).attr("disabled")){
					continue;
				}
				
				$($(trList[i]).find("input[type='checkbox']")).attr("checked",'true')
			}
		}
	}else{
		if(trList != null){
			for(i=0;i<trList.length;i++){
				if($($(trList[i]).find("input[type='checkbox']")).attr("disabled")){
					continue;
				}
				
				$($(trList[i]).find("input[type='checkbox']")).removeAttr("checked")
			}
		}
	}
}

/*弹窗的拖拽*/
$(function(){
	$('.managementPage').draggable({handle:'div.managementHead'});
	
});
//验证输入的值是非负浮点数
function checkFloat(num){
	var format = /^\d+(\.\d+)?$/;
	if(format.test(num)){
		return true;
	}
	return false;
}
