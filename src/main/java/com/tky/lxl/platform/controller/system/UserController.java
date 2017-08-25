package com.tky.lxl.platform.controller.system;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.tky.lxl.platform.finals.Const;
import com.tky.lxl.platform.finals.URLConst;
import com.tky.lxl.platform.model.business.Department;
import com.tky.lxl.platform.model.system.UserInfo;
import com.tky.lxl.platform.service.system.UserService;
import com.tky.lxl.platform.utils.ResultBean;
import com.tky.lxl.platform.utils.TokenVerify;

/**
 * <p>Title: UserController </p>
 * <p>Description: 	用户登陆</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年2月9日 下午1:58:16）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Controller
@RequestMapping("login")
public class UserController {

	@Resource
	UserService userService;
	

	
	/**
	 * 大平台登陆
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="loginCheck", method={RequestMethod.GET, RequestMethod.POST})
	public ModelAndView login(HttpServletRequest request, HttpServletResponse response,
		String sessionid) throws Exception{

		return validate(request, sessionid, null, null);
	}
	
	/**
	 * 临时登陆(开发用)
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "temp_login/{account}/{pwd}/{token_key}/{token_value}", method = { RequestMethod.GET, RequestMethod.POST })
	public ModelAndView temp_login(@PathVariable String account,@PathVariable String pwd,@PathVariable String token_key,@PathVariable String token_value,HttpServletRequest request, HttpServletResponse response)
			throws Exception {

//		HttpSession session = request.getSession(false);  
//		if(session!=null){//让cookie过期  
//				 session.invalidate();  
//				 Cookie cookie = request.getCookies()[0];//获取cookie  
//				 cookie.setMaxAge(0);//让cookie过期  
//				 cookie.setSecure(true);
//		}  
//		request.getSession(true);//生成新会话  
		request.getSession().setAttribute("token_key", token_key);
		request.getSession().setAttribute("token_value",token_value );
		System.out.println(token_key);
		System.out.println(token_value);
		TokenVerify.verify(token_key, token_value, request);
		return validate(request, null, account, pwd);
	}
	/**
	 * 登陆验证
	 * 
	 * @param request
	 * @param sessionId
	 * @param account
	 * @param pwd
	 * @return
	 */
	private ModelAndView validate(HttpServletRequest request, String sessionId, String account, String pwd) {

		// 调用单点登录接口验证
		// ResultBean<UserInfo> userInfoResult = userService.validate(account, password, sessionId);
		ResultBean<UserInfo> userInfoResult = null;
		if (account == null) {
			// 大平台登陆
			userInfoResult = userService.validate(sessionId);
		} else {
			// 临时登陆(开发用)
			userInfoResult = userService.validate(account, pwd);
		}
		
		// 无用户信息,或者未通过验证
		if (userInfoResult == null
			|| userInfoResult.getResult() == null
			|| Const.Auth.AUTHED != userInfoResult.getCode()) {

			// 错误页面
			ModelAndView mvError = new ModelAndView(URLConst.URL_ERROR);
			mvError.addObject(Const.ModelKey.ERROR_MESSAGE, "无法获取用户的授权信息.");
			return mvError;
		}
		
		UserInfo userInfo = userInfoResult.getResult();

		// 获取根部门信息 保存到Session
		Department department = userService.getCurrentDep(userInfo.getId());
		request.getSession().setAttribute(Const.SessionKey.USER_DEPARTMENT, department);

		// ***************************************************************************************************
		// 确认用户登陆类型
		
		// 中心级用户
		if (Const.DepartmentGrade.PJ_MANAGE_CENTER == department.getGrade()) {
			
			// 普通用户
			if (Const.UserType.NORMAL == userInfo.getUsertype()) {

				userInfo.setUserLoginType(Const.UserLoginType.CENTER);
			}
			// 管理员
			else if (Const.UserType.APP_MANAGER == userInfo.getUsertype()) {

				userInfo.setUserLoginType(Const.UserLoginType.CENTER_MANAGER);
			}
		}
		// 建设单位级用户
		else if (Const.DepartmentGrade.DIRECT_GOVERN == department.getGrade()
			|| Const.DepartmentGrade.RAILWAY_ADMINISTRATION == department.getGrade()
			|| Const.DepartmentGrade.SECONDARY == department.getGrade()) {

			// 普通用户
			if (Const.UserType.NORMAL == userInfo.getUsertype()) {

				userInfo.setUserLoginType(Const.UserLoginType.CONSTRUCTION);
			}
			// 管理员
			else if (Const.UserType.APP_MANAGER == userInfo.getUsertype()) {

				userInfo.setUserLoginType(Const.UserLoginType.CONSTRUCTION_MANAGER);
			}
		}
		// 指挥部级用户
		else if (Const.DepartmentGrade.HEADQUARTER == department.getGrade()) {

			// 普通用户
			if (Const.UserType.NORMAL == userInfo.getUsertype()) {

				userInfo.setUserLoginType(Const.UserLoginType.HEADQUARTERS_USER);
			}
			// 管理员
			else if (Const.UserType.APP_MANAGER == userInfo.getUsertype()) {

				userInfo.setUserLoginType(Const.UserLoginType.HEADQUARTER_MANAGER);
			}
		}
		// 标段级用户
		else if (Const.DepartmentGrade.CONSTRUCTION == department.getGrade()) {
			
			// 普通用户
			if (Const.UserType.NORMAL == userInfo.getUsertype()) {

				userInfo.setUserLoginType(Const.UserLoginType.SECTION_USER);
			}
			// 管理员
			else if (Const.UserType.APP_MANAGER == userInfo.getUsertype()) {

				userInfo.setUserLoginType(Const.UserLoginType.SECTION_MANAGER);
			}
		}

		// 用户信息保存到Session
		request.getSession().setAttribute(Const.SessionKey.USER_INFO, userInfo);

		// ***************************************************************************************************
		// 画面跳转
		
		// 管理员(中心级 建设单位 建指 标段)
		String userLoginType = userInfo.getUserLoginType();
		if (Const.UserLoginType.CENTER_MANAGER.equals(userLoginType)
			|| Const.UserLoginType.CONSTRUCTION_MANAGER.equals(userLoginType)
			|| Const.UserLoginType.HEADQUARTER_MANAGER.equals(userLoginType)
			|| Const.UserLoginType.SECTION_MANAGER.equals(userLoginType)) {

			// 管理员页面
			ModelAndView mv = new ModelAndView(URLConst.URL_INDEX_MANAGER);
			
			mv.addObject(Const.ModelKey.USER_LOGIN_TYPE, userLoginType);
			return mv;
		}

		// 首页
		ModelAndView mv = new ModelAndView(URLConst.URL_INDEX);
		mv.addObject(Const.ModelKey.USER_LOGIN_TYPE, userLoginType);

		return mv;
	}
}
