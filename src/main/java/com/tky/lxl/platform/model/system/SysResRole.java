package com.tky.lxl.platform.model.system;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title:SysResRole </p>
 * <p>Description: 角色资源Model</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年3月19日 下午2:50:38）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class SysResRole extends BaseModel{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 角色资源ID
	 */
    private Long rrId;
    /**
     * 资源ID
     */
    private Long resId;
    /**
     * 组织类型
     *   同组织结构树节点类型
     *   Const.java/OrgType
     */
    private String orgType;
    /**
     * 资源名称
     */
    private String resName;
    /**
     * 角色ID
     */
    private Long roleId;
    
    /**
     * 角色名称
     */
    private String roleName;
}