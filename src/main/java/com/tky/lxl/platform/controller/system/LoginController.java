package com.tky.lxl.platform.controller.system;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tky.lxl.platform.finals.Const;
import com.tky.lxl.platform.model.business.Department;
import com.tky.lxl.platform.model.system.UserInfo;
import com.tky.lxl.platform.utils.ResultBean;

/**
 * <p>Title: LoginController</p>
 * <p>Description: 登录</p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年3月25日 上午11:03:25）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@RestController
@RequestMapping("login")
public class LoginController {

	/**
	 * 测试用 TODO
	 */
	@RequestMapping(value="check", method=RequestMethod.POST)
	@ResponseBody
	public ResultBean<String> check(
		HttpServletRequest request,
		String account) throws Exception{
		
//		UserInfo userInfo = getUser(account);
//		Department department = getDeparment(account);

		UserInfo userInfo = new UserInfo();
		Department department = new Department();
		
		// 用户信息保存到Session
		request.getSession().setAttribute(Const.SessionKey.USER_INFO, userInfo);
		// 获取部门信息保存到Session
		request.getSession().setAttribute(Const.SessionKey.USER_DEPARTMENT, department);

		// 管理员
		String userLoginType = userInfo.getUserLoginType();
		if (Const.UserLoginType.CENTER_MANAGER.equals(userLoginType)
			|| Const.UserLoginType.HEADQUARTER_MANAGER.equals(userLoginType)
			|| Const.UserLoginType.SECTION_MANAGER.equals(userLoginType)) {

			// 管理员页面
			return new ResultBean<String>(Const.Auth.MANAGER, "登录成功！", "管理员");
		}

		// 主页
		return new ResultBean<String>(Const.Auth.AUTHED, "登录成功！", "非标段管理员");
	}
}
