package com.tky.lxl.platform.service.system;

import java.util.Set;

/**
 * <p>Title: SysRoleService</p>
 * <p>Description: 角色Service</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年3月20日 下午4:10:55）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public interface SysRoleService {

	/**
	 * 根据用户ID获取角色信息
	 * @param userId
	 * @return
	 */
	Set<String> getRolesByUserId(Long userId);
}
