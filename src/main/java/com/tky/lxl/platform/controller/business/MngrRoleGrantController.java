/**
 * 
 */
package com.tky.lxl.platform.controller.business;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tky.lxl.platform.aop.UserOperateLog;
import com.tky.lxl.platform.finals.Const;
import com.tky.lxl.platform.model.system.SysUserRole;
import com.tky.lxl.platform.model.system.UserInfo;
import com.tky.lxl.platform.service.business.MngrRoleGrantService;
import com.tky.lxl.platform.utils.ResultBean;

/**
 * 
 * <p>Title: SmRoleGrantController</p>
 * <p>Description: 角色授权(管理员 管理员)</p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年3月27日 下午2:04:25）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Controller
@RequestMapping("/mngrRoleGrant")
public class MngrRoleGrantController {

	@Resource
	private MngrRoleGrantService smRoleGrantService;
	
	@Resource
	private HttpSession session;

	/**
	 * 查询所有用户
	 */
	@RequestMapping("getRoleUser")
	@ResponseBody
	public ResultBean<List<UserInfo>> getRoleUser(Long managerOrgId) {

		// 从Session取得管理员信息
		// Session中用户信息是否为空已在拦截器中判断
		UserInfo manager = (UserInfo)session.getAttribute(Const.SessionKey.USER_INFO);
		
		ResultBean<List<UserInfo>> userInfoList = null;
		// 中心级管理员 建设单位管理员 建指管理员
		if (Const.UserLoginType.CENTER_MANAGER.equals(manager.getUserLoginType())
			|| Const.UserLoginType.CONSTRUCTION_MANAGER.equals(manager.getUserLoginType())
			|| Const.UserLoginType.HEADQUARTER_MANAGER.equals(manager.getUserLoginType())) {

			userInfoList = smRoleGrantService.getUserByDepartmentId(managerOrgId);
		}
		// 标段管理员
		else if (Const.UserLoginType.SECTION_MANAGER.equals(manager.getUserLoginType())) {

			userInfoList = smRoleGrantService.getUserBySectionId(managerOrgId);
		}
		
		return userInfoList;
	}

	/**
	 * 查询用户的角色授权信息
	 */
	@RequestMapping("getRoleByAccount")
	@ResponseBody
	public ResultBean<List<SysUserRole>> getRoleByAccount(UserInfo userInfo) {

		// 从Session取得管理员信息
		// Session中用户信息是否为空已在拦截器中判断
		UserInfo manager = (UserInfo)session.getAttribute(Const.SessionKey.USER_INFO);
		
		return smRoleGrantService.getRoleByAccount(userInfo, manager.getUserLoginType());
	}

	/**
	 * 角色授权
	 */
	@UserOperateLog(description = "角色授权")
	@RequestMapping("saveUserRole")
	@ResponseBody
	public ResultBean<String> saveUserRole(String jsonUserRoleList) {

		// 从Session取得管理员信息
		UserInfo manager = (UserInfo)session.getAttribute(Const.SessionKey.USER_INFO);
		
		return smRoleGrantService.saveUserRole(jsonUserRoleList, manager.getId());
	}
}
