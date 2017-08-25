/**
 * 桥梁首页js
 */
/*************************定义常量start*********************************/


var LOCALY=40;//原点Y坐标，表示日期
var SCALE = 0.07; //放大比例
var LOCALXFUN = function (length){//原点X坐标，表示里程
	return 0-SCALE*length*100/2;
}
var LOCALX=0;
var HEIGHT_T_ZHIZUO = 15//支座与T构之间的高度
var HEIGHT_ZHIZUO= 30//支座的高度

var allStartKm =0;//全局变量：开始里程
var chuliData = [];//后台返回数据

var startKm=0//开始里程
var leftestX = 0;//最左边边段的X坐标
var rightestX= 0;//最右边边段的X坐标
var pageScale = 1;//为了显示全图的缩放倍率
var wheelScale = 1;//缩放初始倍率；
var addScale = 0.1;//每次缩放倍率
var mouseX = 0;//鼠标X坐标
var mouseY = 0;//鼠标Y坐标
var mousemoveX = 0;//鼠标位移的X距离
var mousemoveY =0;//鼠标位移的Y距离
//var divwidth = $("#mainContent").width();//页面宽度
var divheight = $("#bridgediv").height();//页面高度
var resultScalse = 1;//页面倍率和缩放倍率乘积
var strokecolor = "#999278";//梁段边框颜色
var fillcolor = "#70B8FF";//张拉后梁段填充颜色：深蓝色
var jiaozhufillcolor ="#B7DBFF";//浇筑后梁段填充颜色:浅蓝色
var whitefillcolor = "white";//其他梁段填充颜色
var yellowfillcolor="#FFCC66";//黄色
//object.style.fontSize="smaller" 
var fontstyle ="100 xx-small '微软雅黑', Arial";//梁段内字体显示样式
var fontcolor ="black";//梁段内字体颜色
var yscale = 1;//Y轴缩放比率
var minshowfont = 0.5;//缩放到此倍率以及以上，显示文字
var selectcolor = "#66FFFF";//选中块的颜色
var jinggaocolor = "red";//超限警告背景色
var zerolist = [];//存放0号块对象集合
var leftlist =[];//小里程梁段对象集合
var rightlist = [];//大里程梁段对象集合
var qiaodunlist=[];//桥墩对象集合
var c=document.getElementById("lxlbridge");
var context = c.getContext("2d");
var isShowFlg = false;//梁段信息是否显示，true：显示
var searchparam = {};//检索条件
var isMoveFlg =false;
var cedian=document.getElementById("cedian");
var cedianctx = cedian.getContext("2d");

var cedianzuobiao = [];//记录矩形框测点坐标
var ocedianzuobiao = [];//记录园框测点坐标
var isMoveFlg =false;//判断鼠标是否进行拖拽
var isShowJG = true;//判断测点超限警告是否停止显示
var isErrorFlg = false;//判断是否是异常数据

var functionTimeout = null;//停止settimeout
var functionY = null;//停止settimeout
var warncdCount = 0;

//记录鼠标上一次点击的梁段的鼠标坐标
var preMouseX = "";
var preMouseY = "";

//0号块的颜色判断
var zeroColor = 0;
//判断小里程的颜色;
var smallColor = 0;
//判断大里程的颜色;
var bigColor = 0;
//T构小里程
var smallgjTSeq;
//记录重绘时下一个T的小里程
var nexSmallTSeq=0;

//记录上一里程中大里程的3、4的点;
var preBigT = [];

//记录T构号、大里程的3、4点
var lxlBridgeObj = {};
//记录下一T构中小里程中1、2点
var nextLxlBridgeObj = {};

//记录下一T构中小里程的数组;
var nextSmallT = [];

//记录当前小里程中中tiszh的值
var itemColor;

getGaoShiPai()
//记录点击哪个日期
var flag = 0;

var lxlid="";

//该梁段无数据
var nodata=1; //白色
//该梁段有数据超限
var warndata=2;//红色
//该梁段有数据无超限并且后续梁段无数据
var yesdata=3;//浅蓝
//该梁段有数据 无超限 并且后续梁段有数据
var yellowdata=4;//黄色
//该梁段数据工况数据全 无超限 
var bluedata=5;//蓝色
//var partid = new Array();
var partidList = new Array();
var conbeamid;
/*************************定义常量  end*********************************/
$("#ldinfo").hide();
$("#cediancontent").hide();
$("#piancha").hideModal();
$("#sggsDiv").hideModal();

/*弹窗的拖拽*/
$(function(){
	$('#ldinfo').draggable();
});
/*日期插件*/

function startTime(){
	flag = 1;
	$(".startdate").jcDate({

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
		$("#startdate").val(oDate);
		$('#jcDate').hide();
	})
}

function end(){
	flag = 2;
	
	$(".enddate").jcDate({

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
		$("#enddate").val(oDate);
		$('#jcDate').hide();
	});
	
}

/**
 * 施工告示牌信息
 */
function getGaoShiPai(){
	
	startTime();
	end();
	$('#jcDateTt a#d_next').css('width','15px');
	
	$('#jcDate').on('click',function(){
		
		//起始时间
		var conditionStartTime = "";
		//终止时间	
		var conditionEndTime = "";
		
		if($('.startdate').val() != null && $('.startdate').val() != undefined){
			conditionStartTime = $('.startdate').val();
		}

		if($('.enddate').val() != null && $('.enddate').val() != undefined){
			conditionEndTime = $('.enddate').val();
		}
		
		//开始日期截止日期的判断
		if(conditionStartTime.length > 0 && conditionEndTime.length > 0){
			var startTmp = conditionStartTime.split("-");
			var endTmp = conditionEndTime.split("-");
			var sd = new Date(startTmp[0],startTmp[1],startTmp[2]);
			var ed = new Date(endTmp[0],endTmp[1],endTmp[2]);

			if(sd.getTime() > ed.getTime()){
				alert("开始日期不能大于结束日期");
				if(flag == 1){$('#startdate').val('');}
				if(flag == 2){$('#enddate').val('');}
				
				return;
			}
		}
	});
}
	//施工告示牌画面
	$('#sggspai').bind('click',function(){
		showsggsInfo(lxlid);
	});
	$(function(){
		//点击页面时日期插件隐藏
			
		$('#sggsDiv>.managementPage,.allmask ').on('click',function(){
			if($('#jcDate').is(':visible')){
				$("#jcDate").hide();
			}
		})
	})
/**
 * 初始化
 */
function initBridge(conbeamId) {
debugger;
	//施工告示牌信息取消
	$('#sggsCancelBtn').bind('click',function(){
		hideSggsDiv();
	});
	//隐藏模态窗口
	initHide();
	lxlid = conbeamId;
	/**************************计算画布世界渲染大小start***********************/
	jisuanCanvas();
	//c.width = divwidth;
	cedian.style.width = cedian.width;
	cedian.style.height = cedian.height;

	$("#ldinfo").css("left",(c.width-350)+"px")
	/**************************计算画布世界渲染大小  end***********************/
	/*************************设置拖拽放大操作 start ***********************************/
	//设置画布的事件监听
	c.addEventListener("mousedown",canvasMouseDown.bind(this),false);
	c.addEventListener("mousemove",canvasMouseMove.bind(this),false);
	c.addEventListener("mouseup",canvasMouseUp.bind(this),false);
	c.addEventListener("wheel",canvasMouseWheel.bind(this),false);
//	c.addEventListener("click",canvasMouseClick.bind(this),false);
	c.addEventListener("mouseout",canvasMouseout.bind(this),false);
	
	cedian.addEventListener("click",cedianClick.bind(this),false);
//	debugger;
	writeCanvas(conbeamId);
	getGkbmList();//获取施工工况下拉框值
	
	saveZuobiao();//保存测点坐标
//	writeCedian();//画测点

	//页面分页div书写方法  全桥偏差超限
//	writeTable("tableinfo",0,-1,0,0,0);
//	getWarnInfo(lxlid);
	
	//连续梁首页上的 梁段总数 总测点数 偏差超限测点数
	getldcdwarnInfo();
	
//	debugger;
//	console.log(partidList);
//	setTimeOut("initLdMonitorStatus","10000")
	initLdMonitorStatus(partidList);
}
/**
 * 计算画布大小
 * @returns
 */
function jisuanCanvas(){
	var scrwidth = $('#bridgecontent').width();
//	$("#canvasDiv").css('width','100%');
//	c.width = "1150";
//	alert(scrwidth);
	
	var canvasWidth = scrwidth * 0.98;
	
	$("#canvasDiv").css('width',canvasWidth);
	c.width = canvasWidth;
	
//	if(scrwidth==1900){
//		$("#canvasDiv").width(1620);
//		c.width = "1620";
//	}else if(scrwidth==1366){
//		$("#canvasDiv").width(1105);
//		c.width = "1105";
//	}else if(scrwidth==1024){
//		$("#canvasDiv").width(1040);
//		c.width = "1040";
//	}else{
//		$("#canvasDiv").css('width',canvasWidth);
//		c.width = canvasWidth;
//	}
	
	$(".bridgemask").width(c.width+30);

	c.style.width = c.width;
	c.style.height = c.height;
}
/**
 * 0号块对象
 *6个点坐标
 *当前文字XY坐标
 *0号对象DB数据
 *@param leftobj:0号块下一梁段，小里程方向
 *@param rightobj：0号块下一梁段，大里程方向
 */



var zerozuobiao = function (x1,x2,x3,x4,x5,x6,y1,y2,y3,y4,y5,y6,fontx,fonty,zeroobj,leftobj,rightobj,leftmaxseq,rightmaxseq,zeroColor){
	this.x1 = x1;
	this.x2 = x2;
	this.x3 = x3;
	this.x4 = x4;
	this.x5 = x5;
	this.x6 = x6;
	this.y1 = y1;
	this.y2 = y2;
	this.y3 = y3;
	this.y4 = y4;
	this.y5 = y5;
	this.y6 = y6;
	this.fontx = fontx;
	this.fonty = fonty;
	this.zeroobj = zeroobj;										//0号块数据对象json
	this.leftobj = leftobj;										//0号块相邻小里程数据对象
	this.rightobj = rightobj;									//0号块相邻大里程数据对象
	this.leftmaxseq = leftmaxseq;								//最大有数据上传的小里程梁段的seq
	this.rightmaxseq = rightmaxseq;								//最大有数据上传的大里程梁段的seq
	//curmousex 鼠标的X坐标
	//curmousey 鼠标的Y坐标

	this.draw = function (curmousex,curmousey,ctx){//重绘0号块
		ctx.beginPath();
		ctx.moveTo(this.x1,this.y1);
		ctx.lineTo(this.x2,this.y2);
		ctx.lineTo(this.x3,this.y3);
		ctx.lineTo(this.x4,this.y4);
		ctx.lineTo(this.x5,this.y5);
		ctx.lineTo(this.x6,this.y6);
		ctx.lineTo(this.x1,this.y1);
		//判断是否和上次点击是相同的梁段
		if(preMouseX!=null && curmousex!=null && ctx.isPointInPath(preMouseX,preMouseY) && ctx.isPointInPath(curmousex,curmousey) && isShowFlg==true){
			back();
		}//判断鼠标点击的是哪个梁段
		else if(curmousex!=null && ctx.isPointInPath(curmousex,curmousey)){//判断当前鼠标位置，在0号块上就重绘
			ctx.fillStyle = selectcolor;							//选中时0号块颜色
			ctx.strokeStyle = strokecolor;							//边框颜色
			ctx.stroke();
			ctx.fill();
			ctx.fillStyle = fontcolor;								//字体颜色
			ctx.font=fontstyle;										//字体类型
			ctx.fillText("0",this.fontx,this.fonty);				//填充内容及位置
			$("#ldname").text(this.zeroobj.partnum)
			showmodal();
			$(".licheng").show();
			$(".xlicheng").show();
			$(".dalicheng").show();
			searchparam = {
					"conbeamID" : lxlid,
					"pier" : this.zeroobj.pier,
					"shortName" : this.zeroobj.shortname.replace("'","AA"),
					"licheng" : "0"
				};
			getMeasureInfo(searchparam);//取得测点信息
			isShowFlg = true;
			writeCedian();
		}else{
			/*********************************设置0号块填充颜色 start****************************************************/
			
//			if(this.zeroobj.iswarn==1){//超限
//				context.fillStyle = "red";//红色
//			}else if(chuliData.iszh>0||(this.zeroobj.seq>leftmaxseq||this.zeroobj.seq<rightmaxseq)|| zeroColor==1){
//				context.fillStyle = fillcolor;//深蓝色
//			} else if(this.zeroobj.gkbm==6||(this.leftobj.gkbm>0&&this.rightobj.gkbm>0)){//如果当前梁段有数据上传（工况编码==6），或者下一梁段有数据
//				context.fillStyle = fillcolor;//深蓝色
//			}else if(this.zeroobj.gkbm==0){//如果当前梁段没有工况数据
//				context.fillStyle = whitefillcolor;//白色
//			}else{
//				context.fillStyle = jiaozhufillcolor;//浅蓝色
//			}
			
			if(zeroobj.iswarn==1){//超限
				context.fillStyle = "red";//红色
			}else if(zeroobj.gkbmcount==6){//6个工况的测量数据
				context.fillStyle = fillcolor;//深蓝色
			}else if(zeroobj.gkbmcount!=0 && ((zeroobj.seq >leftmaxseq||zeroobj.seq<rightmaxseq)||(zeroColor == 1 || itemColor == 1)||(bianColor==1)||zeroobj.gkbm==6)){//黄色  有测量数据但测量数据不全
				context.fillStyle = yellowfillcolor;//黄色
			}else if(zeroobj.gkbmcount==0 && zeroobj.gkbm==0){
				context.fillStyle = whitefillcolor;//白色
			}else{
				context.fillStyle = jiaozhufillcolor;//浅蓝色
			}
			/*********************************设置0号块填充颜色 end****************************************************/
			ctx.strokeStyle = strokecolor;
			ctx.stroke();
			ctx.fill();
			ctx.fillStyle = fontcolor;
			ctx.font=fontstyle;
			ctx.fillText("0",this.fontx,this.fonty);
		}
		
		
		ctx.closePath()
	}
}
/**
 * 小里程梁段对象
 *4个点坐标
 *当前文字XY坐标
 *小里程梁段DB数据
 *@param beforeobj : 相邻梁段信息
 *
 */
var leftobj = function (x1,x2,x3,x4,y1,y2,y3,y4,fontx,fonty,leftobj,pier,beforeobj,nextobj,maxseq,indexFontX){
	this.x1 = x1;
	this.x2 = x2;
	this.x3 = x3;
	this.x4 = x4;
	
	//记录当前梁段的3、4点的x值与上一T构大里程的3、4号测点的x值
//	this.x5 = smallThreeX;
//	this.x6 = smallFourX;
//	this.x7 = preBigThreeX;
//	this.x8 = preBigFourX;
	
	
	
	this.y1 = y1;
	this.y2 = y2;
	this.y3 = y3;
	this.y4 = y4;
	
	//记录当前梁段的3、4点的y值与上一T构大里程的3、4号测点的y值
//	this.y5 = smallThreeY;
//	this.y6 = smallFourY;
//	this.y7 = preBigThreeY;
//	this.y8 = preBigFourY;
	
//	this.fontx = fontx;
	this.fonty = fonty;
	
	
	this.leftobj = leftobj;
	this.pier = pier;
	this.beforeobj = beforeobj;
	this.nextobj = nextobj;
	this.maxseq = maxseq;
	
	this.draw = function (curmousex,curmousey,ctx,nexSmallTSeq,preBigT){//重绘小里程梁段
		this.fontx = fontx;
		ctx.beginPath();
		ctx.moveTo(this.x1,this.y1);
		ctx.lineTo(this.x2,this.y2);
		ctx.lineTo(this.x3,this.y3);
		ctx.lineTo(this.x4,this.y4);
		ctx.lineTo(this.x1,this.y1);
		
		indexFontX = this.fontx;
		//找出小里程方向的中合梁段进行绘图;
			
			if(this.leftobj.type == 3){
				ctx.beginPath();
				ctx.moveTo(this.x1,this.y1);
				ctx.lineTo(this.x2,this.y2);
				ctx.lineTo(this.x3,this.y3);
				ctx.lineTo(this.x4,this.y4);
				ctx.lineTo(this.x1,this.y1);
				
				//indexFontX = this.fontx;
				
				this.fontx = indexFontX - ((this.x1 - this.x4)/2);
			}
		if(preMouseX!=null && curmousex!=null && ctx.isPointInPath(preMouseX,preMouseY) && ctx.isPointInPath(curmousex,curmousey)&& isShowFlg==true){
			back();
		}//判断鼠标点击的是哪个梁段
		else if(curmousex!=null&&ctx.isPointInPath(curmousex,curmousey)){//判断当前鼠标位置，在小里程梁段上就重绘

			$(".licheng").hide();
			$(".xlicheng").hide();
			$(".dalicheng").hide();
			//2017/08/02 默认选择小里程
			$("#dalicheng").attr("checked",false);
			$("#xlicheng").prop("checked","checked");
			context.fillStyle = selectcolor;
			ctx.strokeStyle = strokecolor;
			ctx.stroke();
			ctx.fill();
			ctx.fillStyle = fontcolor;
			ctx.font=fontstyle;
			if(pageScale*wheelScale>minshowfont){
				var name=this.leftobj.shortname.indexOf('-')>0?this.leftobj.shortname.split('-')[0]:this.leftobj.shortname;//设置梁段显示的名称
				
				ctx.fillText(this.leftobj.shortname.indexOf('合')>0||this.leftobj.shortname.indexOf('边')>0?'合':name,this.fontx,this.fonty);
				
			}
			$("#ldname").text(this.leftobj.partnum)
			showmodal();
			if(this.leftobj.partnum.indexOf("直线段")>0){
				$(".licheng").show();
				$(".xlicheng").show();
				$(".dalicheng").show();
			}else{
				$(".xlicheng").show();
			}
			searchparam = {
					"conbeamID" : lxlid,
					"pier" : this.pier,
					"shortName" : this.leftobj.shortname.replace("'","AA"),
					"licheng" : "0"
				}
			getMeasureInfo(searchparam);//取得测点信息
			isShowFlg = true;
			writeCedian();
		}else{
			/****************************设置梁段填充颜色 start****************************************/
			
//			if(this.leftobj.iswarn==1){//超限
//				context.fillStyle = "red";//红色
//			} else if((chuliData.iszh>0&&this.leftobj.type != 3)||this.leftobj.seq>this.maxseq){
//				context.fillStyle = fillcolor;//深蓝色
//			} else if(this.leftobj.type == 5){//如果当前梁段是直线段
//				if(this.beforeobj!=null&&(this.beforeobj.gkbm>0&&this.beforeobj.gkbm<7)||(this.leftobj.gkbm==6)){//如果当前直线段的相邻梁段有数据（工况编码1~6）或者当前梁段的工况编码为6
//					context.fillStyle = fillcolor;//深蓝色
//				}else if(this.leftobj.gkbm==0){//如果没有工况数据
//					context.fillStyle = whitefillcolor;//白色
//				}else{
//					context.fillStyle = jiaozhufillcolor;//浅蓝色
//				}
//			}else if(this.leftobj.type == 4){//如果当前梁段是边合
//				if(chuliData.iszh>0||this.leftobj.gkbm==6){
//					context.fillStyle = fillcolor;//深蓝色
//				}else if(this.leftobj.gkbm==0){
//					context.fillStyle = whitefillcolor;//白色
//				}else{
//					context.fillStyle = jiaozhufillcolor;//浅蓝色
//				}
//			}else if(this.leftobj.type == 3){//如果是中和
//				if(chuliData.iszh>2 ){
//					context.fillStyle = fillcolor;//深蓝色
//				}else if(this.leftobj.gkbm==0){
//					context.fillStyle = whitefillcolor;//白色
//				}else{
//					context.fillStyle = jiaozhufillcolor;//浅蓝色
//				}
//			}else{//普通梁段
//				if((this.nextobj!=null&&this.nextobj.gkbm>0)||this.leftobj.gkbm==6){
//					context.fillStyle = fillcolor;//深蓝色
//				}else if(this.leftobj.gkbm==0){
//					context.fillStyle = whitefillcolor;//白色
//				}else{
//					context.fillStyle = jiaozhufillcolor;//浅蓝色
//				}
//			}
			
			if(leftobj.iswarn==1){//超限
				context.fillStyle = "red";//红色
			}else if(leftobj.gkbmcount==6){//6个工况的测量数据
				context.fillStyle = fillcolor;//深蓝色
			}else if(leftobj.gkbmcount!=0){//有测量数据但测量数据不全
				if((leftobj.type == 5)){//直线段
					if(i>0&&(beforeobj.gkbm>0&&beforeobj.gkbm<7)){//如果当前直线段的相邻梁段有数据（工况编码1~6）
						context.fillStyle = yellowfillcolor;//黄色
					}else{
						context.fillStyle = jiaozhufillcolor;//浅蓝色
					}
					
				}else if(leftobj.type == 1){//普通梁段
					if(leftobj.seq>maxseq || smallColor == 1 || bianColor == 1 || leftobj.gkbm==6){
						context.fillStyle = yellowfillcolor;//黄色
					}else{
						context.fillStyle = jiaozhufillcolor;//浅蓝色
					}
				}else{
					context.fillStyle = jiaozhufillcolor;//浅蓝色
				}
				
			}else if(leftobj.gkbmcount==0 && leftobj.gkbm==0){
				context.fillStyle = whitefillcolor;//白色
			}
			/****************************设置梁段填充颜色 end****************************************/
			ctx.strokeStyle = strokecolor;
			ctx.stroke();
			ctx.fill();
			ctx.fillStyle = fontcolor;
			ctx.font=fontstyle;
			if(pageScale*wheelScale>minshowfont){
				var name=this.leftobj.shortname.indexOf('-')>0?this.leftobj.shortname.split('-')[0]:this.leftobj.shortname;
				ctx.fillText(this.leftobj.shortname.indexOf('合')>0||this.leftobj.shortname.indexOf('边')>0?'合':name,this.fontx,this.fonty);//合 梁段显示合
				//ctx.fillText(this.leftobj.shortname.indexOf('-')>0?this.leftobj.shortname.split('-')[0]:this.leftobj.shortname,this.fontx,this.fonty);
			}
		}
		ctx.closePath()
	}
}
/**
 * 大里程梁段对象
 *4个点坐标
 *当前文字XY坐标
 *0号对象DB数据
 *@param beforeobj : 相邻梁段信息
 */
var rightobj = function (x1,x2,x3,x4,y1,y2,y3,y4,fontx,fonty,rightobj,pier,beforeobj,nextobj,maxseq,bigColor){
	var TbigSeq= 0;
	this.x1 = x1;
	this.x2 = x2;
	this.x3 = x3;
	this.x4 = x4;
	this.y1 = y1;
	this.y2 = y2;
	this.y3 = y3;
	this.y4 = y4;
	this.fontx = fontx;
	this.fonty = fonty;
	this.pier = pier;
	this.rightobj = rightobj;
	this.beforeobj = beforeobj;
	this.nextobj = nextobj;
	this.maxseq = maxseq;
	this.draw = function (curmousex,curmousey,ctx,nexSmallTSeq){//重绘大里程梁段
		ctx.beginPath();
		ctx.moveTo(this.x1,this.y1);
		ctx.lineTo(this.x2,this.y2);
		ctx.lineTo(this.x3,this.y3);
		ctx.lineTo(this.x4,this.y4);
		ctx.lineTo(this.x1,this.y1);
		////判断鼠标点击的是哪个梁段
		if(preMouseX!=null && curmousex!=null && ctx.isPointInPath(preMouseX,preMouseY) && ctx.isPointInPath(curmousex,curmousey) && isShowFlg==true){
			back();
		}//判断鼠标点击的是哪个梁段
		else if(curmousex!=null&&ctx.isPointInPath(curmousex,curmousey)){//判断当前鼠标位置，在大里程梁段上就重绘

			$(".licheng").hide();
			$(".xlicheng").hide();
			$(".dalicheng").hide();
			//2017/08/02 默认选择小里程
			$("#dalicheng").attr("checked",false);
			$("#xlicheng").prop("checked","checked");
			context.fillStyle = selectcolor;
			ctx.strokeStyle = strokecolor;
			ctx.stroke();
			ctx.fill();
			ctx.fillStyle = fontcolor;
			ctx.font=fontstyle;
			if(pageScale*wheelScale>minshowfont){
				var name=this.rightobj.shortname.indexOf('-')>0?this.rightobj.shortname.split('-')[0]:this.rightobj.shortname;
				ctx.fillText(this.rightobj.shortname.indexOf('合')>0||this.rightobj.shortname.indexOf('边')>0?'合':name,this.fontx,this.fonty);//合 梁段显示合
				//ctx.fillText(this.rightobj.shortname.indexOf('-')>0?this.rightobj.shortname.split('-')[0]:this.rightobj.shortname,this.fontx,this.fonty);
			}
			$("#ldname").text(this.rightobj.partnum);
			showmodal();

			if(this.rightobj.partnum.indexOf("直线段")>0){
				$(".licheng").show();
				$(".xlicheng").show();
				$(".dalicheng").show();
			}else{
				$(".dalicheng").show();
			}
			searchparam = {
					"conbeamID" : lxlid,
					"pier" : this.pier,
					"shortName" : this.rightobj.shortname.replace("'","AA"),
					"licheng" : "1"
				}
			getMeasureInfo(searchparam);//取得测点信息
			isShowFlg = true;
			writeCedian();
		}else{
			/****************************设置梁段填充颜色 start****************************************/
//			if(this.rightobj.iswarn==1){//超限
//				context.fillStyle = "red";//红色
//			} else if((chuliData.iszh>0&&this.rightobj.type != 3)||this.rightobj.seq<this.maxseq|| bigColor==1){
//				context.fillStyle = fillcolor;//深蓝色
//			} else if(this.rightobj.type == 5){//如果当前梁段是直线段
//				if(this.beforeobj!=null&&(this.beforeobj.gkbm>0&&this.beforeobj.gkbm<7)||(this.rightobj.gkbm==6)){//如果当前直线段的相邻梁段有数据（工况编码1~6）或者当前梁段的工况编码为6
//					context.fillStyle = fillcolor;//深蓝色
//				}else if(this.rightobj.gkbm==0){//如果没有工况数据
//					context.fillStyle = whitefillcolor;//白色
//				}else{
//					context.fillStyle = jiaozhufillcolor;//浅蓝色
//				}
//			}else if(this.rightobj.type == 4){//如果当前梁段是边合
//				if(chuliData.iszh>0||this.rightobj.gkbm==6){
//					context.fillStyle = fillcolor;//深蓝色
//				}else if(this.rightobj.gkbm==0){
//					context.fillStyle = whitefillcolor;//白色
//				}else{
//					context.fillStyle = jiaozhufillcolor;//浅蓝色
//				}
//			}else if(this.rightobj.type == 3){//如果是中和
//				if(chuliData.iszh>2){
//					context.fillStyle = fillcolor;//深蓝色
//				}else if(this.rightobj.gkbm==0){
//					context.fillStyle = whitefillcolor;//白色
//				}else{
//					context.fillStyle = jiaozhufillcolor;//浅蓝色
//				}
//			}else{//普通梁段
//				if((this.nextobj!=null&&this.nextobj.gkbm>0)||this.rightobj.gkbm==6){
//					context.fillStyle = fillcolor;//深蓝色
//				}else if(this.rightobj.gkbm==0){
//					context.fillStyle = whitefillcolor;//白色
//				}else{
//					context.fillStyle = jiaozhufillcolor;//浅蓝色
//				}
//			}
//			
			if(rightobj.iswarn==1){//超限
				context.fillStyle = "red";//红色
			}else if(rightobj.gkbmcount==6){//6个工况的测量数据
				context.fillStyle = fillcolor;//深蓝色
			}else if(rightobj.gkbmcount!=0){//有测量数据但测量数据不全
				if((rightobj.type == 5)){//直线段
					if(i>0&&nextobj.gkbm>0&&nextobj.gkbm<7){//如果当前直线段的相邻梁段有数据（工况编码1~6）
						context.fillStyle = yellowfillcolor;//黄色
					}else{
						context.fillStyle = jiaozhufillcolor;//浅蓝色
					}
					
				}else if(rightobj.type == 1){//普通梁段
					if(this.rightobj.seq<this.maxseq || bigColor == 1 || bianColor == 1 || rightobj.gkbm==6){
						context.fillStyle = yellowfillcolor;//黄色
					}else{
						context.fillStyle = jiaozhufillcolor;//浅蓝色
					}
				}else{
					context.fillStyle = jiaozhufillcolor;//浅蓝色
				}
				
			}else if(rightobj.gkbmcount==0 && rightobj.gkbm==0){
				context.fillStyle = whitefillcolor;//白色
			}
			/****************************设置梁段填充颜色 end****************************************/
			ctx.strokeStyle = strokecolor;
			ctx.stroke();
			ctx.fill();
			ctx.fillStyle = fontcolor;
			ctx.font=fontstyle;
			if(pageScale*wheelScale>minshowfont){
				var name=this.rightobj.shortname.indexOf('-')>0?this.rightobj.shortname.split('-')[0]:this.rightobj.shortname;
				ctx.fillText(this.rightobj.shortname.indexOf('合')>0||this.rightobj.shortname.indexOf('边')>0?'合':name,this.fontx,this.fonty);
				//ctx.fillText(this.rightobj.shortname.indexOf('-')>0?this.rightobj.shortname.split('-')[0]:this.rightobj.shortname,this.fontx,this.fonty);
			}
		}

		ctx.closePath()
	}
}
/**
 * 桥墩对象
 */
var qiaodunobj =function (x1,x2,x3,x4,y1,y2,y3,y4){
	this.x1 = x1;
	this.x2 = x2;
	this.x3 = x3;
	this.x4 = x4;
	this.y1 = y1;
	this.y2 = y2;
	this.y3 = y3;
	this.y4 = y4;
	this.draw = function (ctx){//重绘桥墩
		ctx.beginPath();
		ctx.moveTo(this.x1,this.y1);
		ctx.lineTo(this.x2,this.y2);
		ctx.lineTo(this.x3,this.y3);
		ctx.lineTo(this.x4,this.y4);
		ctx.lineTo(this.x1,this.y1);
		ctx.strokeStyle = "#A7A9D9";
		ctx.fillStyle = "#E5E7E5";
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
	}
}
/**
 * 矩形测点对象
 */
var cedianobj = function (x1,y1,w,h,cedianname,ischaoxian,pointtype){
	this.x1 = x1;
	this.y1 = y1;
	this.w = w;
	this.h = h;
	this.cedianname = cedianname;
	this.ischaoxian = ischaoxian;
	this.pointtype = pointtype;
	this.openChaoxian = function (curmousex,curmousey,ctx){
		ctx.beginPath();
		ctx.rect(this.x1,this.y1 ,this.w,this.h );
//		ctx.strokeStyle='#000';
//		ctx.stroke();
		if(ctx.isPointInPath(curmousex,curmousey)){//判断当前鼠标位置是否在此对象上
			if(this.ischaoxian){
				var pier = $("#ldname").text().split('-')[0];
				//AAAAAA
				var ldcode = $("#ldname").text().split('-')[1].replace("'","AA");
				showPiancha(pier,ldcode,$("#condition").val());
			}
		}
	}

	
}
/**
 * 矩形测点递归显示警告
 * @param showFlg 判断显示警告还是矩形的flg
 * @returns
 */

function drawFun(showFlg,x1,y1,w,h,cedianname){
	var img=document.getElementById("warnimg");

	if(showFlg){//显示警告
		cedianctx.clearRect(x1-1,y1-1,w+2,h+2);
		cedianctx.beginPath();	
		cedianctx.drawImage(img,x1-1,y1-1);
		cedianctx.closePath();
		showFlg = false;
	}
	else{//正常显示
		cedianctx.clearRect(0,0,cedian.width,cedian.height);
		writeCedian();
		showFlg = true;
	}
	if(isShowJG){
		return;
	}
	functionTimeout = setTimeout("drawFun("+showFlg+","+x1+","+y1+","+w+","+h+","+cedianname+")",600);//每600毫秒重新调用方法，
	//setTimeout("drawFun("+showFlg+","+x1+","+y1+","+w+","+h+","+cedianname+")",600);//每600毫秒重新调用方法，
}

/**
 * 圆形测点对象
 */
var ocedianobj = function (x1,y1,r,cedianname,ischaoxian,pointtype){
	this.x1 = x1;
	this.y1 = y1;
	this.r = r;
	this.cedianname = cedianname;
	this.ischaoxian = ischaoxian;
	this.pointtype = pointtype;
	this.openChaoxian = function (curmousex,curmousey,ctx){//鼠标点击当前测点触发事件
		ctx.beginPath();
		ctx.arc(this.x1,this.y1,this.r,0,Math.PI*2,true);
		if(ctx.isPointInPath(curmousex,curmousey)){//判断当前鼠标位置是否在此对象上
			if(this.ischaoxian){
				var pier = $("#ldname").text().split('-')[0];
				//AAAAAAAA
				var ldcode = $("#ldname").text().split('-')[1].replace("'","AA");
				showPiancha(pier,ldcode,$("#condition").val())
			}
		}
	}
}
/**
 * 园形测点递归显示警告
 * @param showFlg 判断显示警告还是矩形的flg
 * @returns
 */

function drawFunY(showFlg,x1,y1,r,cedianname){
	var img=document.getElementById("warnimg");
	if(showFlg){
		cedianctx.clearRect(x1-r-1,y1-r+1,2*r+2,2*r+2);
		cedianctx.beginPath();	
		cedianctx.drawImage(img,x1-10,y1-5,2*r,2*r);
		cedianctx.closePath();
		showFlg = false;
	}
	else{
		cedianctx.clearRect(0,0,cedian.width,cedian.height);
		writeCedian();
		showFlg = true;
	}
	if(isShowJG){
		return;
	}
	functionY = setTimeout("drawFunY("+showFlg+","+x1+","+y1+","+r+","+cedianname+")",600);//每600毫秒重新调用方法，
	//setTimeout("drawFunY("+showFlg+","+x1+","+y1+","+r+","+cedianname+")",600);//每600毫秒重新调用方法，
}


///**
// * 画布中鼠标按下方法
// * @param evt
// * @returns
// */
//function canvasMouseClick(evt){
//	
//}
/**
 * 画布中鼠标按下方法
 * @param evt
 * @returns
 */
function canvasMouseDown(evt){
	isMoveFlg = true;
	
	var rect = c.getBoundingClientRect();	//获取画布四个点的坐标
	mouseX =evt.clientX - rect.left;//获取当前鼠标X坐标
	mouseY =evt.clientY - rect.top;//获取当前鼠标Y坐标
}
/**
 * 画布鼠标移动是，图像跟随移动
 * @param evt
 * @returns
 */
var tuodongFlg  =false
function canvasMouseMove(evt){
	var rect = c.getBoundingClientRect();	
	if(isMoveFlg&&!isShowFlg){
		
		zerolist = [];
		leftlist = [];
		rightlist = [];
		qiaodunlist = [];
		preBigT = [];
		context.clearRect(0,0,c.width,c.height);//清空画布
		
		var movex= evt.clientX - rect.left-mouseX; 	//获取鼠标位移的X距离
		var movey= evt.clientY - rect.top-mouseY;//获取鼠标位移的Y坐标
		if(movex!=0||movey!=0){
			tuodongFlg = true;
		}
//		movex = divwidth/c.width*movex; //按比例设定为画布的X位移坐标
//		movey = divheight/c.height*movey;//按比例设定为画布的Y位移坐标
		jisuanParam(chuliData,movex,movey)
		mousemoveX = movex;		
		mousemoveY = movey;
	}
}
/**
 * 鼠标弹起时
 * @param evt
 * @returns
 */
function canvasMouseUp(evt){
	isMoveFlg =false;
	if(isOutFlg){//从画布鼠标按下的情况下移出画布，再移回画布，不重新计算原点
		isOutFlg = false;
		tuodongFlg = false;
		return;
	}

	if(tuodongFlg){
		resultScalse = pageScale*wheelScale;//记忆缩放比率
		LOCALX = LOCALX + mousemoveX/resultScalse;//记忆当前位移X坐标
		LOCALY = LOCALY + mousemoveY/(resultScalse*yscale);//记忆当前位移Y坐标
		tuodongFlg = false;
		return;
	}
	tuodongFlg = false;
	context.clearRect(0,0,c.width,c.height);
	
	$("#ldinfo").hide();
	$(".headshow").css("visibility","visible");
	$("#bridgecontent").show();
	$("#cediancontent").hide();
	$(".licheng").hide();
	$(".xlicheng").hide();
	$(".dalicheng").hide();
	//2017/08/02 默认选择小里程
	$("#dalicheng").attr("checked",false);
	$("#xlicheng").prop("checked","checked");
	$("#cediantable tbody").empty();

	var rect = c.getBoundingClientRect();
	if(zerolist != null){
		for(var i=0;i<zerolist.length;i++){//重绘0号块
			var zero = zerolist[i];
				//判断是否是ie9
			if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/9./i)=="9."){ 
				zero.draw(evt.clientX - rect.left,evt.clientY - rect.top + 15,context);
				//判断是否是ie10
			}else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/10./i)=="10."){
				zero.draw(evt.clientX - rect.left,evt.clientY - rect.top + 15,context);
			}else{
				zero.draw(evt.clientX - rect.left,evt.clientY - rect.top,context);
			}
			
		}
	}
	
	//console.log(leftlist);
	if(leftlist != null){
		for(var i=0;i<leftlist.length;i++){//重绘小里程梁段
			var left = leftlist[i];
			//判断是否是ie9
			if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/9./i)=="9."){ 
				left.draw(evt.clientX - rect.left,evt.clientY - rect.top + 15,context,nexSmallTSeq,preBigT);
			//判断是否是ie10	
			}else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/10./i)=="10."){
				left.draw(evt.clientX - rect.left,evt.clientY - rect.top + 15,context,nexSmallTSeq,preBigT);
			}else{
				left.draw(evt.clientX - rect.left,evt.clientY - rect.top,context,nexSmallTSeq,preBigT);
			}
				
		}
	}
	if(rightlist != null){
		for(var i=0;i<rightlist.length;i++){//重绘大里程梁段
			var right = rightlist[i];
			//判断是否是ie9
			if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/9./i)=="9."){ 
				right.draw(evt.clientX - rect.left,evt.clientY - rect.top + 15,context,nexSmallTSeq);
			//判断是否是ie10
			}else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/10./i)=="10."){
				right.draw(evt.clientX - rect.left,evt.clientY - rect.top + 15,context,nexSmallTSeq);
			}
			else{
				right.draw(evt.clientX - rect.left,evt.clientY - rect.top,context,nexSmallTSeq);
			}			
		}
	}
	if(qiaodunlist != null){
		for(var i=0;i<qiaodunlist.length;i++){//重绘桥墩
			var qiaodun = qiaodunlist[i];
			qiaodun.draw(context);
		}
	}
	
	$("#condition").val("");
	if($("#ldinfo").css("display")=="none"){
		isShowFlg = false;
	}
	if(isShowFlg==true){
		//记录本次鼠标坐标
		preMouseX = evt.clientX - rect.left;
		preMouseY = evt.clientY - rect.top;
	}
	isShowJG = true;//设置警告不再闪烁
}
/**
 * 鼠标移出画布时
 * @param evt
 * @returns
 */
var isOutFlg = false;//判断鼠标是否在按下的情况下移出画布
function canvasMouseout(evt){
	if(!isShowFlg){
		isOutFlg = true;
		isMoveFlg =false;
		resultScalse = pageScale*wheelScale;//记忆缩放比率
		LOCALX = LOCALX + mousemoveX/resultScalse;//记忆当前位移X坐标
		LOCALY = LOCALY + mousemoveY/(resultScalse*yscale);//记忆当前位移Y坐标
	}
}
/**
 * 鼠标滚动，画布缩放
 * @param evt
 * @returns
 */
function canvasMouseWheel(evt){

	if(!isShowFlg){
		///对img按下鼠标滚路，阻止视窗滚动
		evt = evt || window.event;

		if (evt.stopPropagation) {
			evt.stopPropagation();
		}

		else {
			evt.cancelBubble = true;
		}
		if (evt.preventDefault) {
			evt.preventDefault();
		}
		else {
			evt.returnValue = false;
		}
		zerolist = [];
		leftlist = [];
		rightlist = [];
		qiaodunlist = [];
		preBigT = [];
		context.clearRect(0,0,c.width,c.height);
		var rect = c.getBoundingClientRect(); 
		if(evt.wheelDelta){
			if(evt.wheelDelta>0){//放大
				wheelScale= wheelScale*(1+addScale);	
			}else{//缩小
				wheelScale= wheelScale*(1-addScale);
			}
		}else if(evt.deltaY){//firefox浏览器
			if(evt.deltaY<0){//放大
				wheelScale= wheelScale*(1+addScale);	
			}else{//缩小
				wheelScale= wheelScale*(1-addScale);
			}
		}
		
		jisuanParam(chuliData,mousemoveX,mousemoveY);
		resultScalse = pageScale*wheelScale;//记忆缩放比率
		LOCALX = LOCALX + mousemoveX/resultScalse;//记忆当前位移X坐标
		LOCALY = LOCALY + mousemoveY/(resultScalse*yscale);//记忆当前位移Y坐标
	}
}
window.onload = function () {

	c.addEventListener('DOMMouseScroll', canvasMouseWheel, false);
}
/**
 * 点击+号，放大
 * @returns
 */
function fangda(){
	if(!isShowFlg){
		zerolist = [];
		leftlist = [];
		rightlist = [];
		qiaodunlist = [];
		preBigT = [];
		context.clearRect(0,0,c.width,c.height);
		wheelScale= wheelScale*(1+addScale);//计算放大倍率
		jisuanParam(chuliData,mousemoveX,mousemoveY);
		resultScalse = pageScale*wheelScale;//记忆缩放比率
		LOCALX = LOCALX + mousemoveX/resultScalse;//记忆当前位移X坐标
		LOCALY = LOCALY + mousemoveY/(resultScalse*yscale);//记忆当前位移Y坐标
	}
}
/**
 * 点击-号缩小
 * @returns
 */
function suoxiao(){
	if(!isShowFlg){
		zerolist = [];
		leftlist = [];
		rightlist = [];
		preBigT = [];
		context.clearRect(0,0,c.width,c.height);
		wheelScale= wheelScale*(1-addScale);//计算缩小倍率
		
		jisuanParam(chuliData,mousemoveX,mousemoveY);
		resultScalse = pageScale*wheelScale;//记忆缩放比率
		LOCALX = LOCALX + mousemoveX/resultScalse;//记忆当前位移X坐标
		LOCALY = LOCALY + mousemoveY/(resultScalse*yscale);//记忆当前位移Y坐标
	}
}
/*************************设置拖拽操作 end ***********************************/

/************************** 画  桥 start******************************************/


/**
 * 写入画布
 */
function writeCanvas(conbeamId){
//	getQLData("22731");
//	debugger;
	getQLData(conbeamId);
}
/**
 * 获取桥梁点的数据
 * @param id连续梁ID
 * @returns
 */
function getQLData(id){
	var url=basePath+"conbeam/selectLxlMessage/"+id;//路径
	
	$.ajax({
		async : false,//是否异步
		//cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
		url :url,//请求的action路径
		error : function(){
			console.log("服务器异常！");
		},
		success : function (data){
			/*console.log(data);*/
			var movex = 0;
			var movey =0;
			chuliData = data;//记住数据
			//连续梁ID
			conbeamid = chuliData.conbeamid;
			//按照pier降序排列
			data.gjTStructures.sort(function(a,b){
				return a.pier - b.pier;
			});
			//将T构中的梁段按seq降序排列;（小里程）=========================
			if(data.gjTStructures != null){
				for(var i = 0, len = data.gjTStructures.length; i < len; i++){
					data.gjTStructures[i].smallGjSegments.sort(function(a,b){
						return a.seq - b.seq;
					})
				}
			}
			//确定左右墩
			var p1=data.gjTStructures[0];//小里程
			var p2=data.gjTStructures[data.gjTStructures.length-1];//大里程
			
			//确定左右墩，计算开始里程
			if(p1.gjPier.centermileage<p2.gjPier.centermileage){
				startKm=p1.gjPier.centermileage*100;
			}else{
				startKm=p2.gjPier.centermileage*100;
			}
			if(data.length==null){
				alert("该连续梁没有主跨长度，数据异常！");
				isErrorFlg = true;
				return;
			}
			//原点X坐标，表示里程 LOCALXFUN
			LOCALX = LOCALXFUN(data.length);//0号块中心线坐标点
			var smallGjSegments = [];
			var bigGjSegments = [];
			var gjPiers=[];
			//最左侧墩0号段
			var firseZeroJson =data.gjTStructures[0].zeroGjSegments;
			 
			//0号块左上节段的坐标原点
			var leftlocalx=LOCALX+(firseZeroJson.centermileage*100-startKm)*SCALE-firseZeroJson.width*SCALE/2;

			
			//循环小里程，获取最左侧X坐标
			if(data.gjTStructures[0].smallGjSegments != null){
				for(var i=0;i<data.gjTStructures[0].smallGjSegments.length;i++){
					var leftJson = data.gjTStructures[0].smallGjSegments[i];
					if(i==data.gjTStructures[0].smallGjSegments.length-1){
						leftestX = leftlocalx-leftJson.width*SCALE+movex-5;
						break;
					}
					leftlocalx=leftlocalx -leftJson.width*SCALE;
				}
			}
			
			//最右侧墩的0号段
			var lastZeroJson = p2.zeroGjSegments;
			//右边段坐标原点
			var rightlocalx=LOCALX+(lastZeroJson.centermileage*100-startKm)*SCALE+lastZeroJson.width*SCALE/2;
			//循环大里程，获取最右侧X坐标
			if(p2.bigGjSegments != null){
				for(var i=0;i<p2.bigGjSegments.length;i++){
					var rightJson = p2.bigGjSegments[i];
					
					if(i==data.gjTStructures[0].bigGjSegments.length-1){
						rightestX=rightlocalx+ rightJson.width*SCALE+movex+60;
						break;
					}
					rightlocalx=rightlocalx + rightJson.width*SCALE;
					
				}
			}
			
			pageScale = c.width/(rightestX-leftestX);	//页面上缩放的倍数
			context.clearRect(0,0,c.width,c.height);//清空画布
			jisuanParam(data);
			
		}
	})
}
/**
 * 微处理数据，调用书写画布的方法
 * @param data
 * @param movex
 * @param movey
 * @returns
 */
function jisuanParam(data,movex,movey){
	if(movex==null){
		movex=0;
	}
	if(movey==null){
		movey=0;
	}
	if(isErrorFlg){
		return;
	}
	
	//console.log(data)
	if(data.gjTStructures != null){
		for(var i = 0;i<data.gjTStructures.length;i++){
			var pierIndex = 0;
			zeroColor = 0;
			itemColor = 0;
			bianColor = 0;
			
			//声明一个对象，将上一T构中大里程最后一个梁段的信息存到对象中
			lxlBridgeObj={
					bridgeIndex:data.gjTStructures[i].pier,
					preBridgeFourX:'',
					preBridgeFourY:'',
					preBridgeThreeX:'',
					preBridgeThreeY:''
			};
			pierIndex = i;
			preBigT[pierIndex]= lxlBridgeObj;
			
			//将小里程中对象信息放到一个数组中;
//			nextSmallT[i] = nextLxlBridgeObj;
			var j = i;
			var len = data.gjTStructures.length - 1;
			//当取到最后一个T构时
			if(i == len){
				//zeroColor = data.gjTStructures[i].smallGjSegments[smallItemLen].tiszh;
				
				//取当前T构小里程
			
				var itemArry = data.gjTStructures[i].smallGjSegments;
				for(var m = 0; m < itemArry.length;m++){
//					if(itemArry[m].partnum.indexOf('合') >= 0){
//						itemColor = itemArry[m].tiszh;
//						zeroColor = itemArry[m].tiszh;
//					}
					if(itemArry[m].type==3){//中和
						itemColor = itemArry[m].tiszh;
						zeroColor = itemArry[m].tiszh;
					}else if(itemArry[m].type==4){//边和
						bianColor = itemArry[m].tiszh;
					}
				}
				
				smallgjTSeq = data.gjTStructures[i].smallGjSegments;
			}else{
				//取当前T构的下一个T构的小里程
				var smallArry = data.gjTStructures[i+1].smallGjSegments
				for(var k = 0;k < smallArry.length;k++){
					//判断小里程中是否包含中合
//					if(smallArry[k].partnum.indexOf('合') >=0){
//						//取当前中合的tiszh的值
//						zeroColor = smallArry[k].tiszh;
//					}
					if(smallArry[k].type==3){//中和
						zeroColor = smallArry[k].tiszh;
					}
				}
				//取当前T构的小里程
				var itemArry = data.gjTStructures[i].smallGjSegments;
				for(var m = 0; m < itemArry.length;m++){
					//判断当前T构的小里程中是否包含中合
//					if(itemArry[m].partnum.indexOf('合') >= 0){
//						//取当前中合的tiszh的值
//						itemColor = itemArry[m].tiszh;
//					}
					if(itemArry[m].type==3){//中和
						itemColor = itemArry[m].tiszh;
					}else if(itemArry[m].type==4){
						bianColor = itemArry[m].tiszh;
					}
				}
				smallgjTSeq = data.gjTStructures[i + 1].smallGjSegments;
				
			}			
			//根据下T构的中合判断该T构0号块的颜色
			
			writeZero(data.gjTStructures[j].zeroGjSegments,context,startKm,data.gjTStructures[j],movex,movey,zeroColor,itemColor,smallgjTSeq,pierIndex,lxlBridgeObj);
			
		}
	}
	
	
}
/**
 * 画0号块
 * @param zeroJson0号块json数据
 * @param context画布object
 * @param startKm开始里程
 * @param movex 横坐标位移距离
 * @param movey 纵坐标位移距离
 * @returns
 * 
 * 
 * @param zerolocalx 0号块中心线在画布上的横坐标位置
 */
function writeZero(zeroJson,context,startKm,gjTStructures,movex,movey,zeroColor,itemColor,smallgjTSeq,pierIndex,lxlBridgeObj){
	//console.log(itemColor);
	//0号块长度求localx，zeroJson.centermileage:中心里程，
	
	//特别注意：用最左边的T构的0号块的“centermileage”减去“startKm”相对于初始规定坐标原点达到局部坐标原点。
	
	var zerolocalx = LOCALX+(zeroJson.centermileage*100-startKm)*SCALE-leftestX;
	var zerolocaly = LOCALY;
	
	context.beginPath();
	context.strokeStyle = strokecolor;//设置边框颜色
	
//	if(zeroJson.gkbm==5||zeroJson.gkbm==6){//设置梁段颜色
//		context.fillStyle = fillcolor;
//	}else if(zeroJson.gkbm==3||zeroJson.gkbm==4){
//		c
//	}else{
//		context.fillStyle = whitefillcolor;
//	}
	var leftJsonList = sortList(gjTStructures.smallGjSegments);
	
	var rightJsonList = gjTStructures.bigGjSegments;
	
	var leftmaxseq = 0;//记录存在数据的最大seq
	
	if(leftJsonList != null){
		for(var i=0;i<leftJsonList.length;i++){
			var leftJson = leftJsonList[i];
			if(leftJson.gkbm>0&&leftJson.partnum.indexOf('直线段')< 0){
				leftmaxseq = leftJson.seq;
			}
		}
	}
	var rightmaxseq = 0;//记录存在数据的最大seq
	if(rightJsonList != null){
		for(var i=0;i<rightJsonList.length;i++){
			var rightJson = rightJsonList[i];
			if(rightJson.gkbm>0 &&rightJson.partnum.indexOf('直线段')< 0){
				rightmaxseq = rightJson.seq;
			}
		}
	}
	
	/*********************************设置0号块填充颜色 start****************************************************/
//	if(zeroJson.iswarn==1){//超限
//		context.fillStyle = "red";//红色
//	}else if(chuliData.iszh>0||(zeroJson.seq >leftmaxseq||zeroJson.seq<rightmaxseq)){//所有中合有数据  或者 0号梁段左右两侧有数据
//		context.fillStyle = fillcolor;//深蓝色
//	}else if(zeroColor == 1 || itemColor == 1){//当前T构有中合数据
//		context.fillStyle = fillcolor;//深蓝色
//	}else if(zeroJson.gkbm==6||(leftJsonList[0].gkbm>0&&rightJsonList[0].gkbm>0)){//如果当前梁段有数据上传（工况编码==6），或者下一梁段有数据
//		context.fillStyle = fillcolor;//深蓝色
//	}else if(zeroJson.gkbm==0){//如果当前梁段没有工况数据
//		context.fillStyle = whitefillcolor;//白色
//	}else{
//		context.fillStyle = jiaozhufillcolor;//浅蓝色
//	}
//	debugger;
	var partid = new Array();
	if(zeroJson.iswarn==1){//超限
		context.fillStyle = "red";//红色
		partid = [conbeamid,zeroJson.partid,zeroJson.pier,zeroJson.seq,zeroJson.type,warndata];
	}else if(zeroJson.gkbmcount==6){//6个工况的测量数据
		context.fillStyle = fillcolor;//深蓝色
		partid = [conbeamid,zeroJson.partid,zeroJson.pier,zeroJson.seq,zeroJson.type,bluedata];
	}else if(zeroJson.gkbmcount!=0 && ((zeroJson.seq >leftmaxseq||zeroJson.seq<rightmaxseq)||(zeroColor == 1 || itemColor == 1)||(bianColor==1) || zeroJson.gkbm==6)){//黄色  有测量数据但测量数据不全
		context.fillStyle = yellowfillcolor;//黄色
		partid = [conbeamid,zeroJson.partid,zeroJson.pier,zeroJson.seq,zeroJson.type,yellowdata];
	}else if(zeroJson.gkbmcount==0 && zeroJson.gkbm==0){
		context.fillStyle = whitefillcolor;//白色
		partid = [conbeamid,zeroJson.partid,zeroJson.pier,zeroJson.seq,zeroJson.type,nodata];
	}else{
		context.fillStyle = jiaozhufillcolor;//浅蓝色
		partid = [conbeamid,zeroJson.partid,zeroJson.pier,zeroJson.seq,zeroJson.type,yesdata];
	}
	partidList.push(partid);
	/*********************************设置0号块填充颜色 end****************************************************/
	
	
	/**
	 * 图1 0号块模型
	 *  1-----------2
	 *  |			|
	 *  |			|
	 *  3\		  /4
	 *	\		/
	 *	5 ------6
	 */
	//0号块坐标原点根据页面大小缩小相应的倍率，然后加上鼠标位移距离
	context.moveTo((zerolocalx-((zeroJson.width*SCALE)/2))*pageScale*wheelScale+movex,zerolocaly*wheelScale*pageScale*yscale+movey);//点  1
	//y:1号点纵坐标+0号块高度，再缩放相应的倍率，然后加上位移距离
	context.lineTo((zerolocalx-zeroJson.width*SCALE/2)*pageScale*wheelScale+movex,(zerolocaly+zeroJson.heights*SCALE)*wheelScale*pageScale*yscale+movey);//点3
	//x:坐标原点-0号块底宽，再缩放相应的倍率，加上鼠标位移距离；y:1号块+0号块中心高度，缩放相应的倍率，加上鼠标位移距离
	context.lineTo((zerolocalx-zeroJson.bottomwidth*SCALE/2)*pageScale*wheelScale+movex,(zerolocaly+zeroJson.centerheight*SCALE)*wheelScale*pageScale*yscale+movey);//点5
	//x:坐标原点+0号块底宽，再缩放相应的倍率，加上鼠标位移距离；y:同点五
	context.lineTo((zerolocalx+zeroJson.bottomwidth*SCALE/2)*pageScale*wheelScale+movex,(zerolocaly+zeroJson.centerheight*SCALE)*wheelScale*pageScale*yscale+movey);//点6
	//x:0号块坐标原点+0号块宽度，再缩放相应的倍率，加上鼠标位移距离；y:同点三
	context.lineTo((zerolocalx+zeroJson.width*SCALE/2)*pageScale*wheelScale+movex,(zerolocaly+zeroJson.heights*SCALE)*wheelScale*pageScale*yscale+movey);//点4
	//X：同点4，Y：同点1
	context.lineTo((zerolocalx+zeroJson.width*SCALE/2)*pageScale*wheelScale+movex,zerolocaly*wheelScale*pageScale*yscale+movey);//点2
	context.lineTo((zerolocalx-zeroJson.width*SCALE/2)*pageScale*wheelScale+movex,zerolocaly*wheelScale*pageScale*yscale+movey);
	
	context.stroke();
	context.fill();
	context.closePath()
	context.textAlign="center"; 
	var fontx = ((zerolocalx+zeroJson.width*SCALE/2)-(zerolocalx-(zeroJson.width*SCALE)/2))/2+(zerolocalx-(zeroJson.width*SCALE)/2);//文字X坐标，点1和点2的中间
	var fonty = ((zerolocaly+zeroJson.heights*SCALE)-zerolocaly)/2+zerolocaly;//文字Y坐标,点1和点3的中间
	context.fillStyle = fontcolor;
	context.font=fontstyle;
	//context.style.fontSize="smaller" 
	if(pageScale*wheelScale>minshowfont){
		context.fillText("0",fontx*pageScale*wheelScale+movex,fonty*wheelScale*pageScale*yscale+movey);//写入文字，按倍率计算文字XY坐标
	}
		
	//将当前0号块的信息保存到list
	zerolist.push(new zerozuobiao((zerolocalx-((zeroJson.width*SCALE)/2))*pageScale*wheelScale+movex,				//0号块1横坐标
			(zerolocalx-zeroJson.width*SCALE/2)*pageScale*wheelScale+movex,											//0号块3横坐标
			(zerolocalx-zeroJson.bottomwidth*SCALE/2)*pageScale*wheelScale+movex,									//0号块5横坐标
			(zerolocalx+zeroJson.bottomwidth*SCALE/2)*pageScale*wheelScale+movex,									//0号块6横坐标
			(zerolocalx+zeroJson.width*SCALE/2)*pageScale*wheelScale+movex,											//0号块4横坐标
			(zerolocalx+zeroJson.width*SCALE/2)*pageScale*wheelScale+movex,											//0号块2横坐标
			zerolocaly*wheelScale*pageScale*yscale+movey,															//0号块1纵坐标
			(zerolocaly+zeroJson.heights*SCALE)*wheelScale*pageScale*yscale+movey,									//0号块3纵坐标
			(zerolocaly+zeroJson.centerheight*SCALE)*wheelScale*pageScale*yscale+movey,								//0号块5纵坐标
			(zerolocaly+zeroJson.centerheight*SCALE)*wheelScale*pageScale*yscale+movey,								//0号块6纵坐标
			(zerolocaly+zeroJson.heights*SCALE)*wheelScale*pageScale*yscale+movey,									//0号块4纵坐标
			zerolocaly*wheelScale*pageScale*yscale+movey,															//0号块2纵坐标
			fontx*pageScale*wheelScale+movex,																		//0号字体横坐标位置
			fonty*wheelScale*pageScale*yscale+movey,																//0号字体纵坐标位置
			zeroJson,leftJsonList[0],rightJsonList[0],leftmaxseq,rightmaxseq,zeroColor));										//保存0号块对象
	
	writetLeft(zeroJson,startKm,leftJsonList,context,movex,movey,leftmaxseq);
	
	writeRight(zeroJson,startKm,rightJsonList,context,movex,movey,rightmaxseq,smallgjTSeq,pierIndex,lxlBridgeObj);

	writhPad(zeroJson,startKm,gjTStructures.gjPier,context,movex,movey)
}
/**
 * 画左边梁段
 * @param zeroJsonO号梁段对象
 * @param startKm开始里程
 * @param leftJsonList左梁段集合
 * @param context画布object
 * @returns
 * 
 * @param LOCALX 初始点
 */
function writetLeft(zeroJson,startKm,leftJsonList,context,movex,movey,maxseq){
	var nextSmallFour = 0;
	var nextSmallThree = 0;
	var nextLeftJson = 0;
	//中和
	smallColor = 0;
	//边和
	bianColor = 0;
	//左节段的坐标原点
	var leftlocalx=LOCALX+(zeroJson.centermileage*100-startKm)*SCALE-leftestX-zeroJson.width*SCALE/2;
		
	var leftlocaly=LOCALY;
	var prevHeight = zeroJson.heights*SCALE;
	
	//上一T构中大里程四号测点的X值
	var preBigFourX = 0;
	//上一T构中大里程四号测点的Y值
	var preBigFourY = 0;
	//上一T构中大里程三号测点的X值
	var preBigThreeX = 0;
	//上一T构中大里程三号测点的Y值
	var preBigThreeY = 0;
	
	//该T构中小里程的四号测点的X值
	var smallFourX = 0;
	//该T构中小里程的四号测点的Y值
	var smallFourY = 0;
	//该T构中小里程的三号测点的X值
	var smallThreeX = 0;
	//该T构中小里程的三号测点的Y值
	var smallThreeY = 0;
	//该T构中小里程的二号测点的X值
	var smallTwoX = 0;
	//该T构中小里程的二号测点的Y值
	var smallTwoY = 0;
	//该T构中小里程的一号测点的X值
	var samllOneX = 0;
	//该T构中小里程的一号测点的Y值
	var smallOneY = 0;
	
	var fontx = 0;
	
	var indexFontX = 0;
	
	var fontX = 0;
	if(leftJsonList != null){
		for(var j = 0; j < leftJsonList.length; j ++){
			if(leftJsonList[j].partnum.indexOf('合') >=0){
				//取小里程中中合的tiszh的值
				smallColor = leftJsonList[j].tiszh;
				
			}
		}
		for(var i=0;i<leftJsonList.length;i++){
			
			var leftJson = leftJsonList[i];
			
			if(leftJson.partnum.indexOf('合')>=0){
				smallColor=0;
			}
			
			//2017/08/14 han
			if(leftJson.type==4){//边和
				bianColor = leftJson.tiszh;
			}
			//console.log(leftJson)
			/**
			 * 图2 左节段模型
			 * 4--------1
			 * |		|
			 * |		|
			 * 3--------2
			 */
			context.beginPath();
			context.strokeStyle = strokecolor;//设置边框颜色
			
			/****************************设置梁段填充颜色 start****************************************/
			
//			if(leftJson.iswarn==1){//超限
//				context.fillStyle = "red";//红色
//			} else if((chuliData.iszh>0&&leftJson.type != 3)|| leftJson.seq>maxseq || smallColor == 1){
//				context.fillStyle = fillcolor;//深蓝色
//			}
//			else if(leftJson.type == 5){//如果当前梁段是直线段
//				if(i>0&&(leftJsonList[i-1].gkbm>0&&leftJsonList[i-1].gkbm<7)||(leftJson.gkbm==6)){//如果当前直线段的相邻梁段有数据（工况编码1~6）或者当前梁段的工况编码为6
//					context.fillStyle = fillcolor;//深蓝色
//				}else if(leftJson.gkbm==0){//如果没有工况数据
//					context.fillStyle = whitefillcolor;//白色
//				}else{
//					context.fillStyle = jiaozhufillcolor;//浅蓝色
//				}
//			}else if(leftJson.type == 4){//如果当前梁段是边合
//				if(chuliData.iszh>0||leftJson.gkbm==6){
//					context.fillStyle = fillcolor;//深蓝色
//				}else if(leftJson.gkbm==0){
//					context.fillStyle = whitefillcolor;//白色
//				}else{
//					context.fillStyle = jiaozhufillcolor;//浅蓝色
//				}
//			}else if(leftJson.type == 3){//如果是中和
//				if(chuliData.iszh>2 ){
//					context.fillStyle = fillcolor;//深蓝色
//				}else if(leftJson.gkbm==0){
//					
//					context.fillStyle = whitefillcolor;//白色
//					
//				}else{
//					context.fillStyle = jiaozhufillcolor;//浅蓝色
//				}
//			}else{//普通梁段
//				if((i<leftJsonList.length-1&&leftJsonList[i+1].gkbm>0)||leftJson.gkbm==6){
//					context.fillStyle = fillcolor;//深蓝色
//				}else if(leftJson.gkbm==0){
//					context.fillStyle = whitefillcolor;//白色
//				}else{
//					context.fillStyle = jiaozhufillcolor;//浅蓝色
//				}
//			}
			var partid = new Array();
			if(leftJson.iswarn==1){//超限
				context.fillStyle = "red";//红色
				partid = [conbeamid,leftJson.partid,leftJson.pier,leftJson.seq,leftJson.type,warndata];
			}else if(leftJson.gkbmcount==6){//6个工况的测量数据
				context.fillStyle = fillcolor;//深蓝色
				partid = [conbeamid,leftJson.partid,leftJson.pier,leftJson.seq,leftJson.type,bluedata];
			}else if(leftJson.gkbmcount!=0){//有测量数据但测量数据不全
				if((leftJson.type == 5)){//直线段
					if(i>0&&(leftJsonList[i-1].gkbm>0&&leftJsonList[i-1].gkbm<7)){//如果当前直线段的相邻梁段有数据（工况编码1~6）
						context.fillStyle = yellowfillcolor;//黄色
						partid = [conbeamid,leftJson.partid,leftJson.pier,leftJson.seq,leftJson.type,yellowdata];
					}else{
						context.fillStyle = jiaozhufillcolor;//浅蓝色
						partid = [conbeamid,leftJson.partid,leftJson.pier,leftJson.seq,leftJson.type,yesdata];
					}
					
				}else if(leftJson.type == 1){//普通梁段
					if(leftJson.seq>maxseq || smallColor == 1 || bianColor == 1 || leftJson.gkbm==6){
						context.fillStyle = yellowfillcolor;//黄色
						partid = [conbeamid,leftJson.partid,leftJson.pier,leftJson.seq,leftJson.type,yellowdata];
					}else{
						context.fillStyle = jiaozhufillcolor;//浅蓝色
						partid = [conbeamid,leftJson.partid,leftJson.pier,leftJson.seq,leftJson.type,yesdata];
					}
				}else{
					context.fillStyle = jiaozhufillcolor;//浅蓝色
					partid = [conbeamid,leftJson.partid,leftJson.pier,leftJson.seq,leftJson.type,yesdata];
				}
				
			}else if(leftJson.gkbmcount==0 && leftJson.gkbm==0){
				context.fillStyle = whitefillcolor;//白色
				partid = [conbeamid,leftJson.partid,leftJson.pier,leftJson.seq,leftJson.type,nodata];
			}
			partidList.push(partid);
			/****************************设置梁段填充颜色 end****************************************/
			
			/**
			 * 为了记录小里程方向倒数第二个梁段的3、4号测点的x、y值
			 * */
			smallFourX = (leftlocalx-leftJson.width*SCALE)*pageScale*wheelScale+movex;							 //4号测点x值
			
			smallFourY = leftlocaly*wheelScale*pageScale*yscale+movey;												//4号测点y值
			
			smallThreeX = (leftlocalx-leftJson.width*SCALE)*pageScale*wheelScale+movex;								//3号测点x值
			
			smallThreeY = (leftlocaly+leftJson.height*SCALE)*wheelScale*pageScale*yscale+movey;						//3号测点y值
			
			smallTwoX = leftlocalx*pageScale*wheelScale+movex;														//2号测点x值
			
			smallTwoY = (leftlocaly+prevHeight)*wheelScale*pageScale*yscale+movey;									//2号测点y值
			
			samllOneX = leftlocalx*pageScale*wheelScale+movex;														//1号测点x值
			
			smallOneY = leftlocaly*wheelScale*pageScale*yscale+movey;												//1号测点y值
			
			
			/**
			 * 判断数组preBigT的长度是为找出当前T构大里程最后一个梁段的3、4号测点;
			 * */
			
			if(preBigT.length > 1){
				
				for(var k = 0;k<preBigT.length-1;k++){
					preBigFourX = preBigT[k].preBridgeFourX;
					preBigFourY = preBigT[k].preBridgeFourY;
					preBigThreeX = preBigT[k].preBridgeThreeX;
					preBigThreeY = preBigT[k].preBridgeThreeY;
				};
				
				//判断是否为中合梁段
				if(leftJson.type==3){
					
					//var leftIndex = leftJsonList.length - 2;
					//画两个梁段4号测点开始
					
					smallFourX = preBigFourX;
					
					smallFourY = preBigFourY;
					
					smallThreeX = preBigThreeX;
					
					smallThreeY =preBigThreeY;
					
					//indexFontX = fontx;
					
					//fontx = fontx - (( smallFourX- samllOneX )/2);
					
				}
			}
			if(leftJson.type!=3){
				//字体X坐标
				fontx = (leftlocalx-(leftlocalx-leftJson.width*SCALE))/2+(leftlocalx-leftJson.width*SCALE);
				indexFontX = fontx- leftJson.width*SCALE/2;
			}else{
				fontx = indexFontX - 5*((samllOneX - smallFourX)*SCALE);
				
			}
						
			//字体Y坐标
			var fonty = (prevHeight)/2+leftlocaly;
			
			
			//坐标同0号块点1的坐标
			context.moveTo(samllOneX,smallOneY);//点  1
			//X：点1横坐标-梁段的宽度，再缩放相应倍率，进行相应的位移,Y：同点1
			context.lineTo(smallFourX,smallFourY);//点4
			//console.log((leftlocalx-leftJson.width*SCALE)*pageScale*wheelScale+movex,leftlocaly*wheelScale*pageScale*yscale+movey)
			//X:同点4  ，Y:点4的纵坐标+梁段高度，再缩放相应倍率，进行相应的位移
			context.lineTo(smallThreeX,smallThreeY);//点3
			//X:同点1；Y：点1的纵坐标+梁段大高度，再缩放相应倍率，进行相应的位移
			context.lineTo(smallTwoX,smallTwoY);//点2
			
			context.lineTo(samllOneX,smallOneY);//闭合
			
			context.stroke();
			context.fill();
			context.closePath()
			context.textAlign="center"; 
			//字体的位置
//			indexFontX = fontx  - leftJson.width*SCALE/2;
			
			context.fillStyle = fontcolor;
			context.font=fontstyle;
		
			
			if(pageScale*wheelScale>minshowfont){
				var name = leftJson.shortname.indexOf('-')>0?leftJson.shortname.split('-')[0]:leftJson.shortname;
				context.fillText(leftJson.shortname.indexOf('合')>0||leftJson.shortname.indexOf('边')>0?'合':name,fontx*pageScale*wheelScale+movex,fonty*wheelScale*pageScale*yscale+movey);
			}
			var beforejson = null;
			if(i>0){
				beforejson = leftJsonList[i-1];
			}
			var nextobj = null;
			if(i<leftJsonList.length-1){
				nextobj=leftJsonList[i+1];
			}

			//保存小里程梁段信息
			leftlist.push(new leftobj(samllOneX,
					smallFourX,
					smallThreeX,
					smallTwoX,
					smallOneY,
					smallFourY,
					smallThreeY,
					smallTwoY,
					fontx*pageScale*wheelScale+movex,
					fonty*wheelScale*pageScale*yscale+movey,
					leftJson,zeroJson.pier,beforejson,nextobj,maxseq,indexFontX
					));
			prevHeight = leftJson.height*SCALE;
			leftlocalx=leftlocalx -leftJson.width*SCALE;
		}
	}
	
}
/**
 * 画右边梁段
 * @param zeroJsonO号梁段对象
 * @param startKm开始里程
 * @param rightJsonList右梁段集合
 * @param context画布Object
 * @returns
 */
function writeRight(zeroJson,startKm,rightJsonList,context,movex,movey,maxseq,smallgjTSeq,pierIndex,lxlBridgeObj){
		
	var rightlocalx=LOCALX+(zeroJson.centermileage*100-startKm)*SCALE+zeroJson.width*SCALE/2-leftestX;		//确定大里程起始点---》左上节点
	
	var rightlocaly=LOCALY;
	
	var prevHeight = zeroJson.heightb*SCALE;
	
	//声明一个数组用于判断大里程是否为最后一个t构的大里程
	var rigthtArry = [];
	//找出不含直线段或边合的大里程
	if(rightJsonList != null){
		for(var j = 0; j < rightJsonList.length;j++){
			
			if(rightJsonList[j].partnum.indexOf('直线段') >= 0 || rightJsonList[j].partnum.indexOf('边') >=0 ){
				//将包含直线段与边合的梁段存在数组rigthtArry中
				rigthtArry.push(rightJsonList[j]);
			}
		}
	}
	
	//判断数组的长度 当数组长度等于0时
	if(rigthtArry.length == 0 && smallgjTSeq != null){
		for(var k = 0; k < smallgjTSeq.length; k++ ){
			//取当前小里程中包含中合的梁段
			if(smallgjTSeq[k].partnum.indexOf('合') >=0){
				//中合的tiszh的值
				bigColor = smallgjTSeq[k].tiszh;
			}
		}
	}
	if(rightJsonList != null){
		for(var i = 0;i<rightJsonList.length;i++){
			var rightJson = rightJsonList[i];
			//console.log(rightJson);
		
			/**
			 * 图3 右节段模型
			 * 1--------4
			 * |		|
			 * |		|
			 * 2--------3
			 */

			context.beginPath();
			context.strokeStyle = strokecolor;//设置边框颜色

			/****************************设置梁段填充颜色 start****************************************/
			
//			if(rightJson.iswarn==1){//超限
//				context.fillStyle = "red";//红色
//			} else if((chuliData.iszh>0&&rightJson.type != 3)|| rightJson.seq<maxseq || bigColor == 1){
//				context.fillStyle = fillcolor;//深蓝色
//			} else if(rightJson.type == 5){//如果当前梁段是直线段
//				if(i>0&&(rightJsonList[i-1].gkbm>0&&rightJsonList[i-1].gkbm<7)||(rightJson.gkbm==6)){//如果当前直线段的相邻梁段有数据（工况编码1~6）或者当前梁段的工况编码为6
//					context.fillStyle = fillcolor;//深蓝色
//				}else if(rightJson.gkbm==0){//如果没有工况数据
//					context.fillStyle = whitefillcolor;//白色
//				}else{
//					context.fillStyle = jiaozhufillcolor;//浅蓝色
//				}
//			}else if(rightJson.type == 4){//如果当前梁段是边合
//				if(chuliData.iszh>0||rightJson.gkbm==6){
//					context.fillStyle = fillcolor;//深蓝色
//				}else if(rightJson.gkbm==0){
//					context.fillStyle = whitefillcolor;//白色
//				}else{
//					context.fillStyle = jiaozhufillcolor;//浅蓝色
//				}
//			}else if(rightJson.type == 3){//如果是中和
//				if(chuliData.iszh>2){
//					context.fillStyle = fillcolor;//深蓝色
//				}else if(rightJson.gkbm==0){
//					context.fillStyle = whitefillcolor;//白色
//				}else{
//					context.fillStyle = jiaozhufillcolor;//浅蓝色
//				}
//			}else{//普通梁段
//				if((i<rightJsonList.length-1&&rightJsonList[i+1].gkbm>0)||rightJson.gkbm==6){
//					context.fillStyle = fillcolor;//深蓝色
//				}else if(rightJson.gkbm==0){
//					context.fillStyle = whitefillcolor;//白色
//				}else{
//					context.fillStyle = jiaozhufillcolor;//浅蓝色
//				}
//			}
			var partid = new Array();
			if(rightJson.iswarn==1){//超限
				context.fillStyle = "red";//红色
				partid = [conbeamid,rightJson.partid,rightJson.pier,rightJson.seq,rightJson.type,warndata];
			}else if(rightJson.gkbmcount==6){//6个工况的测量数据
				context.fillStyle = fillcolor;//深蓝色
				partid = [conbeamid,rightJson.partid,rightJson.pier,rightJson.seq,rightJson.type,bluedata];
			}else if(rightJson.gkbmcount!=0){//有测量数据但测量数据不全
				if((rightJson.type == 5)){//直线段
					if(i>0&&(rightJsonList[i-1].gkbm>0&&rightJsonList[i-1].gkbm<7)){//如果当前直线段的相邻梁段有数据（工况编码1~6）
						context.fillStyle = yellowfillcolor;//黄色
						partid = [conbeamid,rightJson.partid,rightJson.pier,rightJson.seq,rightJson.type,yellowdata];
					}else{
						context.fillStyle = jiaozhufillcolor;//浅蓝色
						partid = [conbeamid,rightJson.partid,rightJson.pier,rightJson.seq,rightJson.type,yesdata];
					}
					
				}else if(rightJson.type == 1){//普通梁段
					if(rightJson.seq<maxseq || bigColor == 1 || bianColor == 1 || rightJson.gkbm==6){
						context.fillStyle = yellowfillcolor;//黄色
						partid = [conbeamid,rightJson.partid,rightJson.pier,rightJson.seq,rightJson.type,yellowdata];
					}else{
						context.fillStyle = jiaozhufillcolor;//浅蓝色
						partid = [conbeamid,rightJson.partid,rightJson.pier,rightJson.seq,rightJson.type,yesdata];
					}
				}else{
					context.fillStyle = jiaozhufillcolor;//浅蓝色
					partid = [conbeamid,rightJson.partid,rightJson.pier,rightJson.seq,rightJson.type,yesdata];
				}
				
			}else if(rightJson.gkbmcount==0 && rightJson.gkbm==0){
				context.fillStyle = whitefillcolor;//白色
				partid = [conbeamid,rightJson.partid,rightJson.pier,rightJson.seq,rightJson.type,nodata];
			}
			partidList.push(partid);
			/****************************设置梁段填充颜色 end****************************************/
			
			//点4坐标同0号块点2坐标
			context.moveTo((rightlocalx+rightJson.width*SCALE)*pageScale*wheelScale+movex,rightlocaly*wheelScale*pageScale*yscale+movey);//点4
			
			//X:点4坐标+梁段的宽度，Y:同点4
			context.lineTo(rightlocalx*pageScale*wheelScale+movex,rightlocaly*wheelScale*pageScale*yscale+movey);//点  1
			
			//X:同点1；Y:点1的纵坐标+梁段高度
			context.lineTo(rightlocalx*pageScale*wheelScale+movex,(rightlocaly+prevHeight)*wheelScale*pageScale*yscale+movey);//点2
			//X:同点4，Y：点1的纵坐标+梁段小高度
			context.lineTo((rightlocalx+rightJson.width*SCALE)*pageScale*wheelScale+movex,(rightlocaly+rightJson.height*SCALE)*wheelScale*pageScale*yscale+movey);//点3
			
			context.lineTo((rightlocalx+rightJson.width*SCALE)*pageScale*wheelScale+movex,rightlocaly*wheelScale*pageScale*yscale+movey);//闭合
			
			context.stroke();
			context.fill();
			context.closePath();
			context.textAlign="center";
			
			//取大里程最后一个梁段点4/点3
			if(i == rightJsonList.length-1){
				var preRightJson = rightJsonList[i];
				//大里程中最后一个梁段的点4的横、纵坐标;
				lxlBridgeObj.preBridgeFourX = (rightlocalx+rightJson.width*SCALE)*pageScale*wheelScale+movex;
				lxlBridgeObj.preBridgeFourY = rightlocaly*wheelScale*pageScale*yscale+movey;
				//console.log(lxlBridgeObj.preBridgeFourX);
				//大里程中最后一个梁段的点3的横、纵坐标;
				lxlBridgeObj.preBridgeThreeX = (rightlocalx+rightJson.width*SCALE)*pageScale*wheelScale+movex;
				lxlBridgeObj.preBridgeThreeY = (rightlocaly+rightJson.height*SCALE)*wheelScale*pageScale*yscale+movey;
				preBigT[pierIndex]= lxlBridgeObj;
			}
//			console.log('整理之后的')
//			console.log(preBigT);
			var fontx = (rightlocalx-(rightlocalx+rightJson.width*SCALE))/2+(rightlocalx+rightJson.width*SCALE);
			var fonty = (prevHeight)/2+rightlocaly;
			context.fillStyle = fontcolor;
			context.font=fontstyle;
			if(pageScale*wheelScale>minshowfont){
				var name=rightJson.shortname.indexOf('-')>0?rightJson.shortname.split('-')[0]:rightJson.shortname;
				context.fillText(rightJson.shortname.indexOf('合')>0||rightJson.shortname.indexOf('边')>0?'合':name,fontx*pageScale*wheelScale+movex,fonty*wheelScale*pageScale*yscale+movey);
			}
			var beforejson = null;
			if(i>0){
				beforejson = rightJsonList[i-1]
			}
			var nextobj = null;
			if(i<rightJsonList.length-1){
				nextobj=rightJsonList[i+1];
			}
			//保存大里程信息
			rightlist.push(new rightobj((rightlocalx+rightJson.width*SCALE)*pageScale*wheelScale+movex,
					rightlocalx*pageScale*wheelScale+movex,
					rightlocalx*pageScale*wheelScale+movex,
					(rightlocalx+rightJson.width*SCALE)*pageScale*wheelScale+movex,
					rightlocaly*wheelScale*pageScale*yscale+movey,
					rightlocaly*wheelScale*pageScale*yscale+movey,
					(rightlocaly+prevHeight)*wheelScale*pageScale*yscale+movey,
					(rightlocaly+rightJson.height*SCALE)*wheelScale*pageScale*yscale+movey,
					fontx*pageScale*wheelScale+movex,
					fonty*wheelScale*pageScale*yscale+movey,
					rightJson,zeroJson.pier,beforejson,nextobj,maxseq,bigColor))
			prevHeight = rightJson.height*SCALE;
			rightlocalx=rightlocalx + rightJson.width*SCALE;
		}
	}
	
}
/**
 * 画T构支座
 * @param zeroJson0号块对象
 * @param startKm开始里程
 * @param pierJsonListT构支座集合
 * @param context画布Object
 * @returns
 */
function writhPad(zeroJson,startKm,pm,context,movex,movey){
		var bodywidth=pm.width*100;
	
		/**
		 * 图4 桥墩模型
		 * 1--------2
		 * |		|
		 * |		|
		 * 4--------3
		 */
		var startx =  LOCALX + (pm.centermileage*100-startKm)*SCALE - bodywidth*SCALE/2-leftestX;//点1x坐标
		var starty= LOCALY + zeroJson.centerheight*SCALE+(HEIGHT_T_ZHIZUO+HEIGHT_ZHIZUO)*SCALE ;//点1y坐标
		var endx = LOCALX + (pm.centermileage*100-startKm)*SCALE + bodywidth*SCALE/2-leftestX;//点4x坐标
		var endy = starty + pm.height*100*SCALE;//点4y坐标
		
		context.beginPath();
		context.strokeStyle = "#A7A9D9";
		context.fillStyle = "#E5E7E5";
		
		context.moveTo(startx*pageScale*wheelScale+movex,starty*wheelScale*pageScale*yscale+movey);//点  1
		context.lineTo(endx*pageScale*wheelScale+movex,starty*wheelScale*pageScale*yscale+movey);//点2
		context.lineTo(endx*pageScale*wheelScale+movex,endy*wheelScale*pageScale*yscale+movey);//点3
		context.lineTo(startx*pageScale*wheelScale+movex,endy*wheelScale*pageScale*yscale+movey);//点4
		context.lineTo(startx*pageScale*wheelScale+movex,starty*wheelScale*pageScale*yscale+movey);//闭合
		
		context.stroke();
		context.fill();
		context.closePath();
		qiaodunlist.push(new qiaodunobj(startx*pageScale*wheelScale+movex,
				endx*pageScale*wheelScale+movex,
				endx*pageScale*wheelScale+movex,
				startx*pageScale*wheelScale+movex,
				starty*wheelScale*pageScale*yscale+movey,
				starty*wheelScale*pageScale*yscale+movey,
				endy*wheelScale*pageScale*yscale+movey,
				endy*wheelScale*pageScale*yscale+movey
				))
}
/************************** 画  桥 end******************************************/
/**
 * 弹出层隐藏部分控件
 * @returns
 */
function showmodal(){
	$("#ldinfo").show();

	$(".headshow").css("visibility","hidden");
	$(".shikuang").hide();
	$(".tipText").hide();
	$("#tianqi").text("");
	$("#wendu").text("");
	$("#qiya").text("");
	$("#bridgecontent").hide();
	$("#cediancontent").show();
	
}
/**
 * 梁段信息的返回
 * @returns
 */
function back(){
	debugger;
	$("#ldinfo").hide();
	$(".headshow").css("visibility","visible");
	$("#bridgecontent").show();
	$("#cediancontent").hide();
	$(".licheng").hide();
	$(".xlicheng").hide();
	$(".dalicheng").hide();

	//2017/08/02 默认选择小里程
	$("#dalicheng").attr("checked",false);
	$("#xlicheng").prop("checked","checked");
	
	$("#cediantable tbody").empty();
	isShowFlg = false;
	//返回时，重新绘制桥梁
	context.clearRect(0,0,c.width,c.height);
	if(zerolist !=null){
		for(var i=0;i<zerolist.length;i++){
			var zero = zerolist[i];
			zero.draw(null,null,context);
		}
	}
	if(leftlist != null){
		for(var i=0;i<leftlist.length;i++){
			var left = leftlist[i];
			left.draw(null,null,context);
		}
	}	
	if(rightlist != null){
		for(var i=0;i<rightlist.length;i++){
			var right = rightlist[i];
			right.draw(null,null,context);
		}
	}
	if(qiaodunlist != null){
		for(var i=0;i<qiaodunlist.length;i++){
			var qiaodun = qiaodunlist[i];
			qiaodun.draw(context);
		}
	}
	
	$("#condition").val("");
	isShowJG = true;//设置警告不再闪烁
}

//施工工况的取得
function getGkbmList(){
	var url =basePath+ "theoretical/getGkbmItem";
	$.ajax({
		async : true,//是否异步
		//cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
		url :url,//请求的actio//n路径
		data:{},
		error : function(){
			console.log("服务器异常！");
		},
		success : function (data){
			var gkbmList = data.result;
			if(gkbmList != null){
				 for(i=0;i<gkbmList.length;i++){
					 $("#condition").append("<option value='"+gkbmList[i].id+"'>"+gkbmList[i].name+"</option>");
				 }
			}
		}
	})
	
	
}
/**
 * 施工工况值变更
 * @returns
 */
function shigongchange(){
	isShowJG = true;
	$("#condition").attr("disabled",true);
	$("#cediantable tbody").empty();
	cedianctx.clearRect(0,0,cedian.width,cedian.height);
	//绘制测点
	writeCedian();
	
	var skgk = $("#condition").val();
	searchparam.gkbm = skgk;
	searchparam.pageNo = 1;
	$("#tianqi").text("");
	$("#wendu").text("");
	$("#qiya").text("");
	$(".tipText").hide();
	if(skgk!=""){
		$(".shikuang").show();
		
	}else{
		$(".shikuang").hide();
	}
	//获取测点信息
	getMeasureInfo(searchparam);

}
//按照梁段名排序
function sortList(list){
	list.sort(function(a,b){
		return parseInt(b.seq)-parseInt(a.seq)});
	return list;
}
/**
 * 点击超限的测点，显示偏差超限modal
 * @param 测点编码
 * @returns
 */
function showPiancha(pier,ldCode,gkbm){
	$("#piancha").showModal();
	getWarnInfoByCondition(pier,ldCode,gkbm)
}
/**
 * 隐藏偏差测点数据
 * @returns
 */
function closepiancha(){
	$("#piancha").hideModal();
	emptyTableTr('tblchaoxian');
}
/**
 * 获取超限测点信息
 * @param pier T构
 * @param ldCode 梁段编码
 * @param gkbm 工况编码
 * @param cdbm 测点编码
 * @param cdlx 测点类型
 * @returns
 */
function getWarnInfoByCondition(pier,ldCode,gkbm){
//	debugger;
	$.ajax({
		async : true,//是否异步
		cache : false,//是否使用缓存
		type : 'POST',//请求方式：get
		dataType : 'json',//数据传输格式：json
		url : basePath + "pccx/getWarnInfo",//请求的actio//n路径
		data : {
			"conbeamID" : lxlid,//lxlID
			"pier" : pier,//T构
			"ldCode" : ldCode.replace("'","AA"),//梁段
			"gkbm" :gkbm//工况编码
		},
		error : function() {
			console.log("服务器异常！");
		},
		success : function(data) { //请求成功后处理函数
			 //请求成功后处理函数
			if (data['code'] != 0) {
				alert(data['msg']);
			} else {
				var warnInfoList = data['result'].warnInfo.list;
				var page = data['result'].warnInfo;
				//清空table数据
				emptyTableTr('tblchaoxian');

				//拼接tr
				if(warnInfoList != null){
					for(var i = 0; i < warnInfoList.length; i++) {
						$("#tblchaoxian").append("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
					}
				}

				var tblTmp = '#tblchaoxian';
				//设置一览数据
				$(tblTmp).find("tr:gt(0)").each(
					function(j) {
						if(j < warnInfoList.length){
							//显示当前行
							$(this).show();
							var tdArr = $(this).children();
							//页码设置
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

							// 设置序号
							tdArr.eq(0).html(j+1);
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
										(warnInfoList[j].delta).toFixed(3));
							} else {

								tdArr.eq(4).html(
										(warnInfoList[j].outl).toFixed(3));
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
							} else {
								status = "查看 ";
							}

							tdArr.eq(9).html("<a id='warnIdShow"+ warnInfoList[j].warnId +"'>" + status +"</a>");
							$("#warnIdShow"+warnInfoList[j].warnId).click(function(paramObj){
								return function(){
									showModalDiv(paramObj,1);
								}
							}(warnInfoList[j]));
						}

					});
			}
		
		}
	})
}

/**
 * 获取测点数据
 * @param pier T构
 * @param shortName 梁段号
 * @param gkbm 工况编码
 * @param pageNoObj 页码
 * @returns
 */
function getMeasureInfo(param) {

	$.ajax({
		async : true,//是否异步
		cache : false,//是否使用缓存
		type : 'POST',//请求方式：get
		dataType : 'json',//数据传输格式：json
		url : "conbeam/getMeasureInfo",//请求的actio//n路径
		data : param,
		error : function() {
			$("#condition").removeAttr("disabled");
			$("#xlicheng").removeAttr("disabled");
			console.log("服务器异常！");
		},
		success : function(data) { //请求成功后处理函数
			
			$("#cediantable tbody").empty();
			var ischaoxian = false;
			var chaoxianList = [];
			
			if( data['code']!="1"&& data['code']!="-1"){
				if(data['result'].measureInfo.list!=null&&data['result'].measureInfo.list.length>0){
					getQihou(data['result'].measureInfo.list[0].sgjdid);
				}
				var page = data['result'].measureInfo;
				var measureInfoList = data['result'].measureInfo.list;
				if(measureInfoList != null){
					for(var i=0;i<measureInfoList.length;i++){
						var measureInfo = measureInfoList[i];
						var calculateht = measureInfo.calculateht==null?"":(measureInfo.calculateht).toFixed(4);
						if(calculateht == "-500" || calculateht == "-500.0000"){
							calculateht = "-";
						}
						var mavalue = measureInfo.mavalue == null?"":(measureInfo.mavalue).toFixed(4);
						var pcz = measureInfo.pcz == null?"":(measureInfo.pcz).toFixed(1);
						var llx = measureInfo.llx == null?"":(measureInfo.llx).toFixed(4);
						if(llx == "-99999999" || llx == "-99999999.0000"){
							llx = "-";
						}
						var lly = measureInfo.lly == null?"":(measureInfo.lly).toFixed(4);
						if(lly == "-99999999" || lly == "-99999999.0000"){
							lly = "-";
						}
						var yyValue = measureInfo.yyValue ==null?"":(measureInfo.yyValue).toFixed(4);
						var xxValue = measureInfo.xxValue ==null?"":(measureInfo.xxValue).toFixed(4);
						var xxPcz = measureInfo.xxPcz == null?"":(measureInfo.xxPcz).toFixed(1);
						var ptype = "";
						var mtime = measureInfo.mtime==null?"":measureInfo.mtime;
						if(measureInfo.ptype==1){
							ptype = "临时观测点";
						}else if(measureInfo.ptype==2){
							ptype = "测量桩";
						}
						
						$("#cediantable").append("<tr>" +
								"<td>"+(i+1)+"</td>"+
								"<td>"+measureInfo.cdbm+"</td>"+
								"<td>"+getSGGK(measureInfo.gkbm)+"</td>"+
								"<td>"+ptype+"</td>"+
								"<td>"+mtime+"</td>"+
								"<td>"+calculateht+"</td>"+
								"<td>"+mavalue+"</td>"+
								"<td>"+pcz+"</td>"+
								"<td style='text-align:left'>"+" X : "+llx+"<br/>"+ " Y : "+lly+"</td>"+
								"<td style='text-align:left'>"+" X : "+xxValue+"<br/>"+ " Y : "+yyValue+"</td>"+
								"<td>"+xxPcz+"</td>"+
								"</tr>");
						if(measureInfo.warncount>0){
							chaoxianList.push(measureInfo);
							ischaoxian = true;
						}
						
					}
				}
				
			}
			if(functionTimeout!=null){
				clearTimeout(functionTimeout);
			}
			if(functionY!=null){
				clearTimeout(functionY);
			}
			isShowJG = true;

			setTimeout((function (){

				$("#condition").removeAttr("disabled");
				$("#xlicheng").removeAttr("disabled");
				
				if($("#condition").val()!=""){

					if(ischaoxian){

						$(".tipText").show();
						$("#tipinfo").text("本工况下有测点超限，位置已标出");
						isShowJG = false;
						if($("#condition").val()=="1"){//挂篮后，临时观测点判断超限
							if(ocedianzuobiao != null){
								for(var i=0;i<ocedianzuobiao.length;i++){
									
									var tmp = ocedianzuobiao[i];
									
									for(var j=0;j<chaoxianList.length;j++){
										
										if(tmp.cedianname==chaoxianList[j].cdid){
											
											ocedianzuobiao[i].ischaoxian = true;
										}
									}	
								}

								for(var i=0;i<ocedianzuobiao.length;i++){//弹出超限测点
									
									if(ocedianzuobiao[i].ischaoxian == true){//说明当前测点超限
										
										drawFunY(false,ocedianzuobiao[i].x1,ocedianzuobiao[i].y1,ocedianzuobiao[i].r,ocedianzuobiao[i].cedianname);
									}
								}
							}
							
							return;
						}else{
							
							if(cedianzuobiao != null){
								for(var i=0;i<cedianzuobiao.length;i++){
									
									var tmp = cedianzuobiao[i];
									
									for(var j=0;j<chaoxianList.length;j++){
										
										if(tmp.cedianname==chaoxianList[j].cdid){
											
											cedianzuobiao[i].ischaoxian = true;
										}
									}	
								}
								for(var i=0;i<cedianzuobiao.length;i++){//弹出超限测点
									if(cedianzuobiao[i].ischaoxian == true){//说明当前测点超限

										drawFun(false,cedianzuobiao[i].x1,cedianzuobiao[i].y1,cedianzuobiao[i].w,cedianzuobiao[i].h,cedianzuobiao[i].cedianname);
									}						
								}
							}
							
							return;
						}
						
					}else{
						//当选择挂篮后时要重绘将超限标志覆盖
						writeCedian();
						$(".tipText").hide();
					}
				}else{
					cedianctx.clearRect(0,0,cedian.width,cedian.height);
					writeCedian();
				}
			}),1200);

		}
	})
}
//获取施工工况显示text
function getSGGK(gkid){
	return $("#condition option[value=" + gkid + "]").text();
}

/**
 * 获取气候信息
 * @param sgjdid
 */
function getQihou(sgjdid){
	$.ajax({
		async : true,//是否异步
		cache : false,//是否使用缓存
		type : 'POST',//请求方式：get
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
					$("#tianqi").text("晴");
				}else if(sgjd.weather==1){
					$("#tianqi").text("阴");
				}else if(sgjd.weather==2){
					$("#tianqi").text("雨(雪)");
				}
		
				$("#wendu").text(sgjd.temperature+"℃");
				$("#qiya").text(sgjd.barometric+"hPa");
			}
		}
	})
}
/**
 * 点击测点画布触发事件
 * @param evt
 * @returns
 */
function cedianClick(evt){
	//cedianctx.clearRect(0,0,cedian.width,cedian.height);
	var rect = cedian.getBoundingClientRect(); 
	if($("#condition").val()==""){
		return;
	}
	if(cedianzuobiao != null){
		for(var i=0;i<cedianzuobiao.length;i++){//弹出超限测点
			cedianzuobiao[i].openChaoxian(evt.clientX - rect.left,evt.clientY - rect.top,cedianctx);
		}
	}
	if(ocedianzuobiao != null){
		for(var i=0;i<ocedianzuobiao.length;i++){//弹出超限测点
			ocedianzuobiao[i].openChaoxian(evt.clientX - rect.left,evt.clientY - rect.top,cedianctx);
		}
	}
	
}

/**
 * 保存各测点坐标
 * @returns
 */
function saveZuobiao(){
	//保存矩形测点信息
	cedianzuobiao.push(new cedianobj(40,15,20,20,1,false,2));
	cedianzuobiao.push(new cedianobj(85,15,20,20,2,false,2));
	cedianzuobiao.push(new cedianobj(155,15,20,20,3,false,2));
	cedianzuobiao.push(new cedianobj(220,15,20,20,4,false,2));
	cedianzuobiao.push(new cedianobj(265,15,20,20,5,false,2));
	//保存圆形矩形测点信息
	ocedianzuobiao.push(new ocedianobj(20,90,10,1,false,1));
	ocedianzuobiao.push(new ocedianobj(59,90,10,2,false,1));
	ocedianzuobiao.push(new ocedianobj(67,190,10,3,false,1));
	ocedianzuobiao.push(new ocedianobj(250,190,10,4,false,1));
	ocedianzuobiao.push(new ocedianobj(260,90,10,5,false,1));
	ocedianzuobiao.push(new ocedianobj(300,90,10,6,false,1));
}
/**
 * 绘制梁段测点图
 * @returns
 */
function writeCedian(){
	cedianctx.clearRect(0,0,cedian.width,cedian.height);
	if(cedian.getContext){
		var ctx = cedian.getContext("2d");
		ctx.save(); 
		ctx.translate(0.5,0.5); //为了缩小线的宽度
		//五个矩形开始
		ctx.beginPath();
		ctx.rect(40,15,20,20);
		ctx.stroke();
		ctx.closePath();
		
		ctx.beginPath();
		ctx.rect(85,15,20,20);
		ctx.stroke();
		ctx.closePath();
		
		ctx.beginPath();
		ctx.rect(155,15,20,20);
		ctx.stroke();
		ctx.closePath();
		
		ctx.beginPath();
		ctx.rect(220,15,20,20);
		ctx.stroke();
		ctx.closePath();
		
		ctx.beginPath();
		ctx.rect(265,15,20,20);
		ctx.stroke();
		ctx.closePath();
		//五个矩形结束

		//五个矩形数字开始
		ctx.fillText('1',45,30);
		ctx.fillText('5',270,30);
		ctx.fillText('4',225,30);
		ctx.fillText('3',160,30);
		ctx.fillText('2',90,30);
		//五个矩形数字结束
		ctx.restore(); 
		ctx.save();
		ctx.translate(0.5,0.5); 
		 //五个竖线开始
		ctx.beginPath();
		ctx.moveTo(50,40);
		ctx.lineTo(50,60);
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.moveTo(95,40);
		ctx.lineTo(95,60);
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.moveTo(165,40);
		ctx.lineTo(165,60);
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.moveTo(230,40);
		ctx.lineTo(230,60);
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.moveTo(275,40);
		ctx.lineTo(275,60);
		ctx.stroke();
		ctx.closePath();
		//五个竖线结束
		ctx.restore(); 

		// 绘制大折线开始
		ctx.save(); 
		ctx.translate(0.5,0.5); 
		ctx.beginPath();
		ctx.moveTo(20, 50);
		ctx.lineTo(300, 50);
		ctx.lineTo(300, 80);
		ctx.lineTo(248,80);
		ctx.lineTo(248,180);
		ctx.lineTo(70,180);
		ctx.lineTo(70,80);
		ctx.lineTo(20,80);
		ctx.lineTo(20,50);
		//按照绘制路径顺序连接各个坐标点
		ctx.stroke();
		//关闭绘制路径
		ctx.closePath();
		//绘制大折线结束
		ctx.restore(); 
		ctx.save(); 
		ctx.translate(0.5,0.5); 
		//绘制小折线结束
		ctx.beginPath();
		ctx.lineTo(100,80);
		ctx.lineTo(220,80);
		ctx.lineTo(220,160);
		ctx.lineTo(100,160);
		ctx.lineTo(100,80);
		ctx.stroke();
		ctx.closePath();
		//绘制小折线结束
		ctx.restore(); 

		//小圆型开始
		ctx.save(); 
		ctx.translate(0.5,0.5); 
		ctx.beginPath();
		ctx.arc(20,90,8,0,Math.PI*2,true);
		ctx.stroke();
		ctx.closePath();
		
		ctx.beginPath();
		ctx.arc(59,90,8,0,Math.PI*2,true);
		ctx.stroke();
		ctx.closePath();
		
		ctx.beginPath();
		ctx.arc(67,190,8,0,Math.PI*2,true);
		ctx.stroke();
		ctx.closePath();
		
		ctx.beginPath();
		ctx.arc(250,190,8,0,Math.PI*2,true);
		ctx.stroke();
		ctx.closePath();
		
		ctx.beginPath();
		ctx.arc(260,90,8,0,Math.PI*2,true);
		ctx.stroke();
		ctx.closePath();
		
		ctx.beginPath();
		ctx.arc(300,90,8,0,Math.PI*2,true);
		ctx.stroke();
		ctx.closePath();
		//小圆型结束
		ctx.restore(); 
		//小圆型中数字开始
		ctx.fillText('6',297,95);
		ctx.fillText('5',257,95);
		ctx.fillText('4',247,195);
		ctx.fillText('3',64,193);
		ctx.fillText('2',56,95);
		ctx.fillText('1',17,95);
		//小圆型中数字结束
	}
}

function getWarnInfo(conbeamID, pageNoObj) {
	$.ajax({
		async : false,//是否异步
		cache : false,//是否使用缓存
		type : 'POST',//请求方式：get
		dataType : 'json',//数据传输格式：json
		url : basePath+"pccx/getWarnInfo",//请求的actio//n路径
		data : {
			"conbeamID" : conbeamID,
			"dealFlg" : 0,
			"pageNo" : pageNoObj,
			"pageFlg":"bridge.pccx.pagesize"
		},
		error : function() {
			console.log("服务器异常！");
		},
		success : function(data) { //请求成功后处理函数
//			debugger;
			if (data['code'] != 0) {

			} else {
				var warnInfoList = data['result'].warnInfo.list;
				var page = data['result'].warnInfo;
				//清空table数据
				emptyTableTr('tblWarnInfo');

				//页码设置
				var pageNo = page.pageNo;
				var pageSize = page.pageSize;
				var totalPage = page.totalPage;
				var startNum = page.startNum;
				var totalCount = page.totalCount;
				var endNum = page.endNum;
				
				warncdCount = totalCount;

				if(totalCount == 0){
					writeTable("tableinfo",0,-1,0,0,0);
				} else{
					writeTable("tableinfo",totalCount,startNum,pageNo,totalPage,endNum);	
				}


				//拼接tr
				if(warnInfoList != null){
					for(var i = 0; i < warnInfoList.length; i++) {
						$("#tblWarnInfo").append("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
					}
				}
				var tblTmp = '#tblWarnInfo';
				//设置一览数据
				$(tblTmp).find("tr:gt(0)").each(
					function(j) {
						if(j < warnInfoList.length){
							//显示当前行
							$(this).show();
							var tdArr = $(this).children();

							// 序号
							tdArr.eq(0).html(pageSize*(pageNo-1)+j+1);
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
							}  else {
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

/**
 * 大小里程切换触发事件
 * @returns
 */
function lichengChange(){
	isShowJG = true;
	$("#xlicheng").attr("disabled",true);
	if($('#dalicheng').attr("checked")){
		searchparam.licheng = "1"
	}
	if($('#xlicheng').attr("checked")){
		searchparam.licheng = "0"
	}
	writeCedian();
	searchparam.pageNo =1;
	getMeasureInfo(searchparam);

}

//清空表数据（同时删除tr）
function emptyTableTr(tableId){
	var tblTmp;
	tblTmp = '#'+tableId;
	$(tblTmp).find("tbody").empty();
}

//分页查询
//分页查询
function navigatorPage(pageNo) {
	$('#pageNo').val(pageNo);
	//连续梁ID取得
	getWarnInfo(lxlid,pageNo);
}

//隐藏处置画面
function hideModalDiv(){
	//处理措施
	$("#dealPlan").val('');
	//联系电话
	$("#dealPhone").val('');
	//备注
	$("#dealRemark").val('');
	if($("#piancha").css("display")=="none"){
		$("#modalDiv").hideModal();
	}else{
		$("#modalDiv").hide();
	}
	
	
}
 

function initHide(){
	//处理措施
	$("#dealPlan").val('');
	//联系电话
	$("#dealPhone").val('');
	//备注
	$("#dealRemark").val('');
	$("#modalDiv").hideModal();
}
//保存处置信息
function saveWarnDeal(){
	var flag=$("#flag").val();
//	debugger;
	var pier = $("#pier").val();
	var pageNo=$('#pageNo').val();
	var ldcode = $("#ldCode").val();
	$("#warnSaveBtn").attr("disabled", true);
	//处置人员编码
	dealUserId = getGlobalAccount();
	var dealUsername = getGlobalUserName();
	//处理措施
	var dealPlan = $("#dealPlan").val();
	if (dealPlan == null || dealPlan == '' || dealPlan=="undefined"){
		alert("处置方案不能为空!");
		$("#warnSaveBtn").attr("disabled", false);
		$("#dealPlan").focus();
		return false;
	}
	if(dealPlan.length>240){
		alert("处置方案不能超过240个字符！");
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
		alert("备注不能超过240字符！");
		$("#warnSaveBtn").attr("disabled", false);
		$("#dealRemark").focus();
		return false;
	}
	//工况编码
	var gkbm =$("#dealGkbm").val();
	//梁段编码
	var ldid = $("#dealldcode").val();
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
			"ldcode":ldid,
			"lxlid":lxlid,
			"dealusername":dealUsername},
		error : function() {
			console.log("服务器异常！");
			$("#warnSaveBtn").attr("disabled", false);
		},
		success : function(data) { //请求成功后处理函数
			$("#warnSaveBtn").attr("disabled", false);
			if (data['code'] != 0) {
				alert(data['msg']);
			} else /*if(data['result'].result > 0)*/{
				//处理措施
				$("#dealPlan").val('');
				//联系电话
				$("#dealPhone").val('');
				//备注
				$("#dealRemark").val('');
//				debugger;
				if(flag==1){
					getWarnInfoByCondition(pier,ldcode,gkbm)
				}else{
//					debugger;
					getWarnInfo(lxlid, pageNo);
				}
				
			}
		}
	});

	if($("#piancha").css("display")=="none"){
		$("#modalDiv").hideModal();
	}else{
		$("#modalDiv").hide();
	}
}


//显示子画面
function showModalDiv(warnInfoObj,flag){
	if(flag==1){
		$("#flag").val(1);
	}
	
	debugger;
	//设置T构梁段
	var ldName = warnInfoObj.code.split("-");
	var pierLdNameTmp = "T构梁段:"+ warnInfoObj.pier + "#" + ldName[0];
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
	//设置墩号
	$("#pier").val(warnInfoObj.pier);
	$("#ldCode").val(ldName[0]);
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
		//韩晓凤 20170817
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
				"conbeamId":lxlid,
				"partId":warnInfoObj.partid,
				"dealFlg":2},
			error : function() {
				console.log("服务器异常！");
			},
			success : function(data) { //请求成功后处理函数
				if(data['result'].warnDeal.length > 0){
					var warnDeal = data['result'].warnDeal;
					//设置联系人
					$("#dealUserName").text("处置人：" + warnDeal[0].accountname);					//设置处置时间
					$("#dealDate").attr("placeholder",warnDeal[0].dealtime);
					//设置处置方案
					$("#dealPlan").val(warnDeal[0].dealcs);
					//设置备注
					$("#dealRemark").val(warnDeal[0].remark);
					//设置联系方式
					$("#dealPhone").val(warnDeal[0].phone);
					//设置超限施工工况
					$("#warnGkbm").text("超限施工工况：" + warnInfoObj.content);
					//韩晓凤 20170817
					//判断关闭超限的开关是否可以使用
					if(warnInfoObj.ldType==4 || warnInfoObj.ldType==3){//边合 、 中合 可以直接关闭
						$("#switch").attr("disabled",false);
						$("#tishi").html("提示:已满足关闭条件，可关闭。");
					}else{
						var warnFlag = isCloseWarn(warnInfoObj.conbeamid,warnInfoObj.pier,warnInfoObj.partid,warnInfoObj.ldType,warnInfoObj.mileageFlag,warnInfoObj.seq);
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
					alert(data['msg']);
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

// 验证日期
function dateCheck(RQ) {
	var date;
	if (RQ.length == 8) {
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

//施工告示牌画面表示
function showsggsInfo(conbeamid){
	//处理措施
	var url = "conbeam/showSggsInfo/"+conbeamid;
	$.ajax({
		async : false,//是否异步
		//cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
//		data : {"conbeamid":conbeamid},
		url :url,//请求的action//n路径
		error : function(){
			console.log("服务器异常！");
		},
		success : function (data){
			var title=data.proName + "-" + data.sectionName + "-" + data.lxlName;
			
			//基本信息
			$("#title").text(title);
			//所属工区
			$("#industrial").val(data.sggsList.industrial);
			//主跨长度
			$("#mainkdlength").val(data.sggsList.mainkdlength);
			//桥跨组合
			$("#beamaspan").val(data.sggsList.beamaspan);
			//所在里程
			$("#centermile").val(data.sggsList.centermile);
			//施工开始日期
			var stdate = data.sggsList.startdate;
			if(stdate != "" && stdate != null){
				stdate = new Date(stdate);
				stdate = stdate.Format("yyyy-MM-dd");
			}
			$("#startdate").val(stdate);
			//施工截止日期
			var eddate = data.sggsList.enddate;
			if(eddate != "" && eddate != null){
				eddate = new Date(eddate);
				eddate = eddate.Format("yyyy-MM-dd");
			}
			$("#enddate").val(eddate);
			//施工监测单位
			$("#planjcunit").val(data.sggsList.planjcunit);
			//设计单位
			$("#designunit").val(data.sggsList.designunit);
		}
	})
	$("#sggsDiv").showModal();
}

//关闭施工告示牌画面
function hideSggsDiv(){
	$("#sggsDiv").hideModal();
	$("#mainContent").show();
}

//保存施工告示牌信息
function saveSggsInfo(){
	
	//所属工区
	var industrial=$("#industrial").val();
	//主跨长度
	var mainkdlength=$("#mainkdlength").val();
	//桥跨组合
	var beamaspan=$("#beamaspan").val();
	//所在里程
	var centermile=$("#centermile").val();
	//施工开始日期
	var startdate=$("#startdate").val();
	//施工截止日期
	var enddate=$("#enddate").val();
	//施工监测单位
	var planjcunit=$("#planjcunit").val();
	//设计单位
	var designunit=$("#designunit").val();
	
	//判断桥跨组合格式是否正确
	var beamspan = [beamaspan];
	var checkValue = "";
//	if(beamaspan.indexOf("+")>0 || beamaspan.indexOf("+")>0 || beamaspan.indexOf("*")>0){
		beamspan = beamaspan.split(/[\\＋\\+\\*\\＊]/);
//	}
	if(beamspan != null){
		for(var i =0;i<beamspan.length;i++){
			var  beamNum = beamspan[i];
			if(!checkNumber(beamNum)){
				alert('桥跨组合格式不正确');
				return;
			}
			
		}
	}
	
	if(planjcunit.length>50){
		alert("施工监测单位不可超过50个字符！");
		return;
	}
	if(designunit.length>50){
		alert("设计单位不可超过50个字符！");
		return;
	}
	var max ="";//主跨跨度最大值
	if(beamspan.length > 0){
		
		max = parseFloat(beamspan[0]);
		// 使用for 循环从数组第一个值开始做遍历
		for (var i = 0; i < beamspan.length; i++) {
			// 如果元素当前值大于max,就把这个当前值赋值给max
			if (parseFloat(beamspan[i]) > max) {
				max = parseFloat(beamspan[i]);
			}
		}
	}
	

	if(max != $("#mainkdlength").val()){
		alert("主跨长度应该为桥跨组合的最大值");
		return;
	}
	//跨度数值check
	if($("#mainkdlength").val() != "" && $("#mainkdlength") != null){
		if(checkFloat(mainkdlength)){
			
		}else{
			alert("跨度格式不正确！")
			return;
		}
	}
	
	//施工开始日期，施工截止日期check
	var startDate = "";//开始日期
	var endDate = "";//截止日期
	if($("#startdate").val() != "" && $("#startdate").val()!=null){
		startDate = $("#startdate").val();
		//日期校验
		if(dateCheck(startDate)){

		}else{
			alert("开始日期格式不正确！");
			return;
		}
	}else{
		alert("开始日期不能为空");
		return ;
	}
	if($("#enddate").val() != "" && $("#enddate").val()!=null){
		endDate = $("#enddate").val();
		
		//日期校验
		if(dateCheck(endDate)){

		}else{
			alert("截止日期格式不正确！");
			return;
		}
	}else{
		alert("截止日期不能为空");
		return ;
	}
	
	//监测单位空值判断
	if($("#planjcunit").val() == "" || $("#planjcunit").val() == null){
		alert("监测单位不能为空");
		return;
	}
	
	//设计单位空值判断
	if($("#designunit").val() == "" || $("#designunit").val() == null){
		alert("设计单位不能为空");
		return;
	}
	
	//开始日期截止日期的判断
	if(startDate.length > 0 && endDate.length > 0){
		var startTmp = startDate.split("-");
		var endTmp = endDate.split("-");
		var sd = new Date(startTmp[0],startTmp[1],startTmp[2]);
		var ed = new Date(endTmp[0],endTmp[1],endTmp[2]);
		if(sd.getTime() >= ed.getTime()){
			alert("开始日期必须小于结束日期");
			return;
		}
	}
	
	
	var url = "conbeam/saveSggsInfo";
	$.ajax({
		async : false,//是否异步
		//cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
		data : {"conbeamid":lxlid,
				"industrial":industrial,
				"mainkdlength":mainkdlength,
				"beamaspan":beamaspan,
				"centermile":centermile,
				"startdate":startdate,
				"enddate":enddate,
				"planjcunit":planjcunit,
				"designunit":designunit},
		url :url,//请求的actio//n路径
		error : function(){
			console.log("服务器异常！");
		},
		success : function (data){
			console.log("执行成功！");
			alert("保存成功！")
			$("#sggsDiv").hideModal();
		}
	})
}

//验证输入的值是否是数值
function checkNumber(num) {  
	var reg = /^[0-9]+.?[0-9]*$/;  
	if (reg.test(num)) {  
		return true;  
	}  
	return false;  
}

//验证输入的值是非负浮点数
function checkFloat(num){
	var format = /^\d+(\.\d+)?$/;
	if(format.test(num)){
		return true;
	}
	return false;
}

//验证日期
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

//梁段总数，测点总数，偏差超限数的设置
function getldcdwarnInfo(){
	var conbeamid=lxlid;
	//处理措施
	var url =basePath+ "conbeam/selectLdCdWarnByLxl/"+conbeamid;
	$.ajax({
		async : true,//是否异步
		//cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
//		data : {"conbeamid":conbeamid},
		url :url,//请求的action//n路径
		error : function(){
			console.log("服务器异常！");
		},
		success : function (data){
			//梁段总数
			$("#ldzcount").text(data.ldcount);
			//测点总数
			$("#cdzcount").text(data.cdcount);
			//偏差超限数
			$("#warncount").text(data.warncdcount);
//			$("#warncount").text(warncdCount);
		}
	})
}
/**
 * 还原画布桥梁位置
 * @returns
 */
function huanyuan(){
	if(isShowFlg){
		return;
	}
	zerolist = [];
	leftlist = [];
	rightlist = [];
	qiaodunlist = [];
	preBigT= [];
	context.clearRect(0,0,c.width,c.height);
	LOCALX = LOCALXFUN(chuliData.length);//取得初始原点X坐标
	LOCALY=40;
	wheelScale = 1;//缩放初始倍率
	yscale = 1;//Y轴缩放比率；
	mousemoveX = 0;
	mousemoveY =0;//鼠标位移的Y距离
	yscale = 1;
	resultScalse = 1;
	jisuanParam(chuliData);

}

//$(function(){
//	partidList
function initLdMonitorStatus(){
//	debugger;
	var partidListJson = tojson(partidList);
	var url =basePath+ "ldm/ldMonitorStatus";
	$.ajax({
		async : true,//是否异步  true:异步 false:同步
		//cache : false,//是否使用缓存
		type : 'POST',//请求方式：post
		dataType : 'json',//数据传输格式：json
		data : {"partidListJson":partidListJson},
		url :url,//请求的action//n路径
		error : function(){
			console.log("服务器异常！");
		},
		success : function (data){
			
		}
	})
}
/**
 * 将数组转换成json格式的字符串
 * @param arr
 * @returns
 */
function tojson(arr){
	if(!arr.length)
		return null;

	var i = 0;
	len = arr.length,
	array=[];
	for(;i<len;i++){
		array.push({"conbeamid":arr[i][0],"partid":arr[i][1],"pier":arr[i][2],"seq":arr[i][3],"ldtype":arr[i][4],"status":arr[i][5]});
	}
	return JSON.stringify(array);
}

	
