package com.tky.lxl.platform.dao.system;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.tky.lxl.platform.model.system.SysResRole;

/**
 * 
 * <p>Title: SysResRoleMapper</p>
 * <p>Description: 资源角色Mapper</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年3月20日 下午6:51:54）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public interface SysResRoleMapper {
	
	/**
	 * 获取资源角色
	 * 
	 * @return
	 */
	public List<SysResRole> selectResourceRole(@Param("account")String account, @Param("roleType")int roleType, @Param("roleLevel")int roleLevel);
}
