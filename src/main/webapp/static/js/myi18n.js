/**
 * 自定义国际化js
 * @param $
 */
	//路径参数
	var LOCAL_PARAM="locale";
	
//国际化中使用的常量

//合计
var HOME_SUM;
//线形良好，暂无超限
var HOME_NOWARN;
//超限连续梁
var HOME_OVERRUNBRIDGE;
//超限梁段
var HOME_OVERRUNLD;
//个数
var HOME_COUNT;
//处置中
var HOME_INDEAL;
//未处置
var HOME_NODEAL;
//个
var HOME_COUNT0;
//总计
var HOME_TOTAL;
//已监测
var HOME_MONITORED;
//小于
var HOME_LESSTHAN;
//大于、以上
var HOME_GREATERTHAN;
//暂无数据
var HOMESECTION_NODATA;
//正常
var HOMESECTION_OK;
//异常
var HOMESECTION_NG;
//超限处置进度
var HOMESECTION_DEALPROGRESS;
//顺利合龙
var HOMESECTION_SLHL;
//异常数据
var HOMESECTION_ERROR_ERRDATA;
/**
 * 测量信息自定义常量
 * 
 */
//下拉框展示全部
var MEASURE_ALL;
//服务器异常
var MEASURE_SERVER;
//下拉框小里程
var MEASURE_SMALL;
//下拉框大里程
var MEASURE_LARGE;
//下拉框中合
var MEASURE_IN;
//下拉框边合
var MEASURE_EDGE;
//下拉框直线段
var MEASURE_STRAIGHT;
//临时观测点
var MEASURE_TEMPORARY;
//测量桩
var MEASURE_MEASURINGSTAKE;

/**
 * 梁段测点自定义常量
 * 
 */
//0号梁段
var LDPOINT_ZERO;
//悬臂浇筑梁段
var LDPOINT_CASTPLACECANTILEVER;
//中跨合龙段
var LDPOINT_MIDCLOSURE;
//边跨合龙段
var LDPOINT_SIDECLOSURE;
//边跨非对称梁段
var LDPOINT_ASYMMETRYSIDE;
//查看按钮
var LDPOINT_DETAILS;
//小里程Small mileage
var LDPOINT_SMALLMILEAGE
//大里程Large mileage
var LDPOINT_LARGEMILEAGE
//提示
var LDPOINT_PROMPT;
//请求失败！
var LDPOINT_ABORTED;
//理论高程不能为空！
var LDPOINT_THELENULL;
//理论高程不能为非法数值！
var LDPOINT_THELEILLEGAL;
//理论X值不能为空！
var LDPOINT_THELEXNULL;
//理论X值不能为非法数值！
var LDPOINT_THELEXILLEGAL;
//理论Y值不能为非法数值！
var LDPOINT_THELEYILLEGAL;
//理论高程超出范围！
var LDPOINT_THATION;
//理论高程必须为非负数！
var LDPOINT_NOTIVE;
//理论X值超出范围！
var LDPOINT_XBEYOND;
//理论Y值超出范围！
var LDPOINT_YBEYOND;
//修正原因不能为空！
var LDPOINT_CORRECT;
//保存成功！
var LDPOINT_PRESERVATION;
//该梁段中的测点数据查询异常！
var LDPOINT_ABNORMAL;
//该梁段中的测点数据不存在！
var LDPOINT_NONEXISTENT;
//墩
var LDPOINT_PIER;
//号梁段
var LDPOINT_BEAMSEGMENT;
//测点修正
var LDPOINT_CORRECT;
//理论值维护
var LDPOINT_MAINTAIN;
/**
 * 基点信息常量
 */
//正常
var DATUM_NORMAL;
//废弃
var DATUM_ABANDONED;
//基准点平面坐标x不能为空值!
//var DATUM_
//基准点平面坐标x超出范围!
//var DATUM_
//基准点平面坐标x格式不正确!
//var DATUM_
//基准点平面坐标y不能为空值！
//var DATUM_
//基准点平面坐标y超出范围!
//var DATUM_
//基准点平面坐标y格式不正确!
//var DATUM_
//基准点高程z不能为空值！
//var DATUM_
//基准点高程z超出范围！
//var DATUM_
//基准点高程z格式不正确！
//var DATUM_
//修正原因不能为空！
//var DATUM_
//修改成功！
//var DATUM_
//基准点名称不能超过50个字符！
//var DATUM_
//基准点名称不能为空！
//var DATUM_
//基准点高程z不能为负数！
//var DATUM_
//请选中一条数据！
//var DATUM_
//数据已废弃，不能再次废弃！
//var DATUM_
//请选择数据！
//var DATUM_

/**
 * 连续梁e-chart
 */
//全桥高程偏差
var HOMEBRIDGE_ALTITUDEDEVIATION;
//无数据
var HOMEBRIDGE_NODATA;
//平均偏差
var HOMEBRIDGE_AVERAGEDEVIATION;
//极限偏差
var HOMEBRIDGE_LIMITDEVIATION;
//高程偏差
var HOMEBRIDGE_HEIGHTDEVIATION;
//直
var HOMEBRIDGE_STRAIGHT;
//合
var HOMEBRIDGE_MERGE;
//梁段
var HOMEBRIDGE_BEAMSEGMENT;
//全桥中线偏差
var HOMEBRIDGE_LINEDEVIATION;
//偏差值
var HOMEBRIDGE_DEVIATIONVALUE;
//中线偏差
var HOMEBRIDGE_LINEDEVIATIONS;
//全桥立模标高偏差
var HOMEBRIDGE_VERTICALMOLDDEVIATION;
//立模标高偏差
var HOMEBRIDGE_VERTICALMOLDDEVIATIONS;
//全桥梁段错台
var HOMEBRIDGE_WRONGTABLE;
//错台值
var HOMEBRIDGE_WRONGTABLEVALUE;
//错台
var HOMEBRIDGE_WRONGTAIWAN;
(function ($) {

	/**
	 * 获取访问url的参数
	 */
	$.getUrlParam = function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); return null;
	}

})(jQuery);