package com.tky.lxl.platform.controller.mobile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tky.lxl.platform.finals.Const;
import com.tky.lxl.platform.model.business.Department;
import com.tky.lxl.platform.model.system.UserInfo;
import com.tky.lxl.platform.service.system.UserService;
import com.tky.lxl.platform.utils.ResultBean;

/**
 * <p>Title: UserController </p>
 * <p>Description: 	用户登陆</p>
 * <p>Company: 铁科院</p> 
 * @author wk
 */
@RestController
@RequestMapping("/appuser")
public class AppUserController {

	@Resource
	UserService userService;

	/**
	 * 大平台登陆
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="login/loginCheck", method={RequestMethod.GET, RequestMethod.POST})
	public String login(HttpServletRequest request, HttpServletResponse response,
		String sessionid) throws Exception{

		return validate(request, sessionid, null, null);
	}
	
	/**
	 * 临时登陆(开发用)
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "login", method = { RequestMethod.GET, RequestMethod.POST })
	public String temp_login(HttpServletRequest request, HttpServletResponse response, String account, String pwd)
			throws Exception {
		return validate(request, null, account, pwd);
	}
	/**
	 * 登陆验证
	 * @param request
	 * @param sessionId
	 * @param account
	 * @param pwd
	 * @return
	 */
	private String validate(HttpServletRequest request, String sessionId, String account, String pwd) {

		try {
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

				return "err";
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
				return "adm";
			}
			return "ok";
		} catch (Exception e) {
			e.printStackTrace();
			return "err";
		}
	}
}
