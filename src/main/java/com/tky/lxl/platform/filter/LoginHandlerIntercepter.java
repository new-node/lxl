package com.tky.lxl.platform.filter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.tky.lxl.platform.finals.Const;
import com.tky.lxl.platform.model.system.UserInfo;

/**
 * 
 * <p>Title:LoginHandlerIntercepter </p>
 * <p>Description: 用户登陆拦截器</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年3月23日 上午10:40:36）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public class LoginHandlerIntercepter implements HandlerInterceptor{

	/**
	 * 在进入Handler方法之前执行了，使用于身份认证，身份授权，登陆校验等，比如身份认证，用户没有登陆，
	 * 拦截不再向下执行，返回值为 false ，即可实现拦截；否则，返回true时，拦截不进行执行；
	 */
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		HttpSession session = request.getSession();
		String path = request.getServletPath();
		UserInfo userInfo =(UserInfo)session.getAttribute(Const.SessionKey.USER_INFO);
		
		try{
			//不拦截的目录
			if(path.indexOf("/static") == 0 ||path.indexOf("/login") == 0 
					|| path.indexOf("/lg") == 0 || path.indexOf("/mobile/login") == 0
					|| path.indexOf("/appuser/login") == 0 || path.indexOf("/i18n") == 0
					|| path.indexOf("/gis/") == 0){
				return true;
			} else {//需要拦截的目录
				if(userInfo!=null){//用户登陆成功
					return true;
				}
				else if((path.indexOf("/home") == 0 ) && path.length() <= 5 ){
					request.getRequestDispatcher("/").forward(request,response);
					return false;
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

	/**
	 * 进入Handler方法之后，返回ModelAndView之前执行，使用场景从ModelAndView参数出发，
	 * 比如，将公用的模型数据在这里传入到视图，也可以统一指定显示的视图等；
	 */
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
	}

	/**
	 * 在执行Handler完成后执行此方法，使用于统一的异常处理，统一的日志处理等；
	 */
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
	}

}
