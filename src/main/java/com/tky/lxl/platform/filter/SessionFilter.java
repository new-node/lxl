package com.tky.lxl.platform.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SessionFilter implements Filter{

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void doFilter(ServletRequest servletrequest, ServletResponse servletresponse, FilterChain filterchain)
			throws IOException, ServletException {
		 HttpServletRequest request = (HttpServletRequest) servletrequest;
			HttpServletResponse response = (HttpServletResponse) servletresponse;
			String clientSessionId = servletrequest.getParameter("ssid");
			String serverSessionId = request.getSession().getId();
			if (serverSessionId.equals(clientSessionId)) {
				filterchain.doFilter(request, response);
			} else {
//				response.sendRedirect("/common/dataError");
				request.getRequestDispatcher("/error.jsp").forward(request,response);
			}
		
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

}
