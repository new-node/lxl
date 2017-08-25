package com.tky.lxl.platform.service.business;

import java.util.List;

import com.tky.lxl.platform.model.system.SysUserRole;
import com.tky.lxl.platform.model.system.UserInfo;
import com.tky.lxl.platform.utils.ResultBean;

/**
 * <p>Title: SmRoleGrantService</p>
 * <p>Description: 角色授权</p>
 * <p>Company: 铁科院</p>
 *
 * @author sunjiashu（2017年3月27日 下午2:04:58）
 *
 * @version:1.0.0 copyright  2017-2018
 */
public interface MngrRoleGrantService {

	/**
	 * 中心级管理员 建指管理员
	 *   查询根部门下的所有用户
	 * 
	 * @param departmentId - 建设指挥部根部门ID
	 * @return
	 */
	public ResultBean<List<UserInfo>> getUserByDepartmentId(Long departmentId);

	/**
	 * 标段管理员
	 *   查询标段的所有用户
	 * 
	 * @param sectionId - 标段ID
	 * @return
	 */
	public ResultBean<List<UserInfo>> getUserBySectionId(Long sectionId);

	/**
	 * 查询用户的角色授权信息
	 * 
	 * @param userInfo - 用户信息
	 * @param managerLoginType - 管理员用户登陆类型
	 * @return
	 */
	public ResultBean<List<SysUserRole>> getRoleByAccount(UserInfo userInfo, String managerLoginType);
	
	/**
	 * 保存角色授权
	 * 
	 * @param jsonUserRoleList - 用户角色授权信息列表
	 * @param sectionManagerId - 标段管理员ID
	 * @return
	 */
	public ResultBean<String> saveUserRole(String jsonUserRoleList, Long sectionManagerId);

}
