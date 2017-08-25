package com.tky.lxl.platform.dao.system;

import java.util.List;

import com.tky.lxl.platform.model.system.SysRole;

/**
 * 
 * <p>Title:SysRoleMapper </p>
 * <p>Description: 用户角色Mapper</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年3月20日 下午6:50:55）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public interface SysRoleMapper {

	/**
	 * 根据用户ID获取角色信息
	 * @param userId
	 * @return
	 */
	List<SysRole> getRolesByUserId(Long userId);
	
	/**
	 * 获取默认角色
	 * 
	 * @return
	 */
	List<SysRole> selectRole(String orgType);
}
