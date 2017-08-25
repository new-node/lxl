package com.tky.lxl.platform.filter;

import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class InjectHandlerIntercepter implements HandlerInterceptor{

	private String failPage ="/error.jsp";//发生注入时，跳转页面
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
			String path = request.getServletPath();
			//不拦截的目录
			if(path.indexOf("/static") == 0 /*||path.indexOf("/login") == 0 */
					|| path.indexOf("/lg") == 0 || path.indexOf("/mobile/login") == 0
					|| path.indexOf("/appuser/login") == 0){
				return true;
			} else {//需要拦截的目录
				//判断是否有注入攻击字符
				HttpServletRequest req = (HttpServletRequest)request;
				String inj = injectInput(req);
				if(!inj.equals("")) {
					request.getRequestDispatcher(failPage).forward(request,response);
					return false;
				} else {
					// 传递控制到下一个过滤器
//					chain.doFilter(request,response);
					return true;
				}
			}
//			return false;
	}

	/**
	 * 判断request中是否含有注入攻击字符
	 * @param req
	 * @return
	 */
	private String injectInput(HttpServletRequest request) {
		 Enumeration<String> e =request.getParameterNames();
		 String attributeName;
		 String attributeValues[];
		 String inj = "";
		 		
		while (e.hasMoreElements()) {
			attributeName= (String)e.nextElement();
			//不对密码信息进行过滤，一般密码中可以包含特殊字符
			if(attributeName.equals("userPassword")||attributeName.equals("confirmPassword")||attributeName.equals("PASSWORD")
				||attributeName.equals("password")||attributeName.equals("PASSWORD2")||attributeName.equals("valiPassword")){
				continue;
			}
			attributeValues= request.getParameterValues(attributeName);
			for(int i = 0; i < attributeValues.length; i++) {
				if(attributeValues[i]==null||attributeValues[i].equals(""))
					continue;
					inj= injectChar(attributeValues[i]);
						if(!inj.equals("")) {
							return inj;
						}
				}
		}
		 	return inj;
	}

	/**
	 * 判断字符串中是否含有注入攻击字符
	 * @param string
	 * @return
	 */
	private String injectChar(String str) {
		String inj_str = "\" ) \' * %";
		String inj_stra[] = inj_str.split(" ");
	
		for (int i = 0 ; i < inj_stra.length ; i++ ){
			if (str.indexOf(inj_stra[i])>=0){
				return inj_stra[i];
			}
		}
		return "";
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
