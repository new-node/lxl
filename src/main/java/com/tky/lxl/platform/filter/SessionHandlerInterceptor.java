package com.tky.lxl.platform.filter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class SessionHandlerInterceptor implements HandlerInterceptor{

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
//		 HttpServletRequest req = (HttpServletRequest) request;
//			HttpServletResponse res = (HttpServletResponse) response;
			String clientSessionId = request.getParameter("ssid");
			String serverSessionId = request.getSession().getId();
			if (serverSessionId.equals(clientSessionId)) {
//				filterchain.doFilter(request, response);
				return true;
			} else {
//				response.sendRedirect("/common/dataError");
				request.getRequestDispatcher("/error.jsp").forward(request,response);
				return false;
			}
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
