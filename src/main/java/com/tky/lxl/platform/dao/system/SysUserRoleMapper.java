package com.tky.lxl.platform.dao.system;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.tky.lxl.platform.model.system.SysUserRole;

/**
 * 
 * <p>Title: SysUserRoleMapper</p>
 * <p>Description: 用户角色Mapper</p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年3月28日 下午2:58:39）
 *
 * @version:1.0.0 copyright  2017-2018
 */
public interface SysUserRoleMapper {
	
	/**
	 * 获取用户的角色授权信息
	 * @param ruId
	 * @return
	 */
    List<SysUserRole> selectRoleByAccount(@Param("account") String account, @Param("roleLevel") int roleLevel);
    
    /**
     *   角色授权
     * @param record - 用户角色信息
     * @return
     */
    int saveUserRole(SysUserRole record);
    
    /**
     *   取消用户的所有角色授权
     * @param record
     * @return
     */
    int cancelUserAllRole(SysUserRole record);
}