
/**
 * @param lr   参数为 left 或者 right 代表左右滑动 
 * @param fm  滑动过程中的回调函数
 * @param fe  滑动事件结束后的回调函数
 */
jQuery.fn.myslider = function(lr,fm,fe){
	//判断设备是否支持touch事件
	var isTouch = ('ontouchstart' in window) || window.DocumentTouch
			&& document instanceof DocumentTouch;
	var touchType = { //初始化事件类型
			start:'touchstart',
			move : 'touchmove',
			end : 'touchend'
		};
	var ismove = {v:0.6,t:100}; //是否触发划动事件的条件v:速度（像素/毫秒），t:时间（毫秒）
	var startPos = {x : 0,y : 0,time : 0}; //初始化按下时坐标
	var movePos = {x : 0,y : 0};//初始化移动变量
	var isScrolling = 0; //这个参数判断是垂直滚动还是水平滚动
	var moveCount = 0; //记录move触发次数
	var scrollY = 0; //Y轴滚动值
	if (!isTouch){ //不支持touch事件时改为鼠标事件
		touchType.start = 'mousedown';
		touchType.move = 'mousemove';
		touchType.end = 'mouseup';
	}
	var slider = $(this);//划动对象
	slider.on(touchType.start,function(e){
		start(e);
	});
	//触摸开始方法
	var start = function(e){
		//e.preventDefault();//阻止浏览器的默认事件
		var ev = e ;//默认JQuery事件对象
		if (isTouch) {
			//当屏幕有多个touch或者页面被缩放过，就不执行move操作
			if (e.originalEvent.targetTouches > 1 || e.scale
					&& e.scale !== 1)
				return;
			ev = e.originalEvent.targetTouches[0];//Touch时第一个手指事件对象
			ismove = {v:0.2,t:100};scrollY = 1;
		}
		startPos = {x:ev.pageX,y : ev.pageY,time : +new Date};
		movePos = {x : 0,y : 0};//还原移动变量
		isScrolling = 0;moveCount = 0;
		slider.on(touchType.move, function(e) {
			move(e);
		});
		slider.on(touchType.end, function(e) {
			end(e);
		});
	}
	//移动
	var move = function(e) {
		var ev = e ;//默认JQuery事件对象
		e.stopPropagation();    //  阻止事件冒泡
		if (isTouch) {
			//当屏幕有多个touch或者页面被缩放过，就不执行move操作
			if (e.originalEvent.targetTouches > 1 || e.scale
					&& e.scale !== 1)
				return;
			ev = e.originalEvent.targetTouches[0];//Touch时第一个手指事件对象
		} 
		movePos = {x : ev.pageX - startPos.x,y : ev.pageY - startPos.y};//设置移动变量
		
		if(moveCount === 0){
			//第一次move的手势方向
			isScrolling = Math.abs(movePos.x) > Math.abs(movePos.y)? 
					(Math.abs(movePos.y) >= scrollY ? -1 : 0) : 1;//（Math.abs(movePos.y) > 1）为了解决与横向滚动条冲突
			moveCount ++ ;
		}; 
		 //isScrolling为1时，表示纵向滑动，-1为横向滑动
		if (isScrolling === -1 && fm != null ) {
			e.preventDefault();//阻止触摸事件的默认行为，即阻止滚屏
			if ("right" == lr && movePos.x > 0) {
				fm(movePos);//右滑移动过程中的回调函数
			}
			if ("left" == lr && movePos.x < 0) {
				fm(movePos);//左滑移动过程中的回调函数
			}
		}
	}
	var end = function (e) {
		slider.off(touchType.move);
		slider.off(touchType.end);
		var duration = +new Date - startPos.time; //滑动的持续时间
		if (isScrolling === -1 && duration > 0) { //当为水平滚动时 并且按下和离开的时间差大于200ms
			//速度过快时触发划动｜｜ 划动距离大与page的五分之二时触发	
			if ((Math.abs(movePos.x / Number(duration)) > ismove.v && Number(duration) > ismove.t)
					|| Math.abs(movePos.x) > slider.width()*0.4) {
				if ("right" == lr && movePos.x > 0) {
					fe(true); // 右滑动回调
					return;
				}
				if ("left" == lr && movePos.x < 0) {
					fe(true);// 左滑动回调
					return;
				}
			}
			fe(false);//未触发划动事件回调
		}
	}
}
