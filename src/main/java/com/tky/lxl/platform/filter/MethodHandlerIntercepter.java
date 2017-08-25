package com.tky.lxl.platform.filter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/**
 * 
 * <p>Title:MethodHandlerIntercepter </p>
 * <p>Description: 使用 HTTP 动词篡改的认证旁路</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年6月6日 下午1:49:06）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public class MethodHandlerIntercepter implements HandlerInterceptor{

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
			String path = request.getServletPath();
			//不拦截的目录
			if(path.indexOf("/static") == 0 ||path.indexOf("/login") == 0 
					|| path.indexOf("/lg") == 0 || path.indexOf("/mobile/login") == 0 || path.indexOf("/i18n") == 0
					|| path.indexOf("/appuser/login") == 0){
				return true;
			} else {//需要拦截的目录
				String method=request.getMethod();
				if(!"GET".equals(method)&&!"POST".equals(method)&&!"HEAD".equals(method) && !javax.servlet.DispatcherType.ERROR.equals(request.getDispatcherType())){
			//	log.error("The request with Method["+method+"] was forbidden by server!");
					response.setContentType("text/html;charset=UTF-8");
					response.setCharacterEncoding("UTF-8");
					response.setStatus(403);
					response.getWriter().print("<font size=6 color=red>对不起，您的请求非法，系统拒绝响应!</font>");
					return false;
				}
			}
			return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		// TODO Auto-generated method stub
		
	}

}
