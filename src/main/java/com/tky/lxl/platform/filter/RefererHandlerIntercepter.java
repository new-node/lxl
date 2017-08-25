package com.tky.lxl.platform.filter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.tky.lxl.platform.finals.Const;
/**
 * 
 * <p>Title:RefererHandlerIntercepter </p>
 * <p>Description:  固定值： 验证“Referer”头的值，并对每个提交的表单使用 one-time-nonce</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年6月6日 下午1:48:25）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public class RefererHandlerIntercepter implements HandlerInterceptor{

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		
		String path = request.getServletPath();
//		String refererpath = "http://89.1.1.11:8080/jzlxl/";
//		String refererpath = "http://89.1.1.11:8180/jzlxl/";
//		String refererpath1 ="http://www.r93535.com/jzlxl/";
//		
		
		String refererpath = Const.REFERERPATHVALUE;
//		String refererpath = "https://localhost:8443/lxl/";
//		String refererpath = "http://10.30.1.81:8280/lxl/";
//		String refererpath = "http://10.30.1.81:8180/lxl/";
//		String refererpath = "https://10.30.1.81:8443/lxl";
//		String refererpath1 ="http://cars.crbim.win/lxl/";
		try {
			//不拦截的目录
			if(path.indexOf("/static") == 0 ||path.indexOf("/login") == 0 
					|| path.indexOf("/lg") == 0 || path.indexOf("/mobile") == 0
					|| path.indexOf("/appuser/login") == 0 || path.indexOf("/i18n") == 0
					|| path.indexOf("/gis/") == 0){
				return true;
			} else {//需要拦截的目录
				// 从 HTTP 头中取得 Referer 值
				 String referer=request.getHeader("Referer");

				 // 判断 Referer 是否以 bank.example 开头
				 
				 if((referer!=null) &&(referer.trim().startsWith(refererpath)/*||referer.trim().startsWith(refererpath1)*/)){
					 return true;
				 }else{
					 request.getRequestDispatcher("/error.jsp").forward(request,response);
					return false;
				 } 
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		
	}

	
}
