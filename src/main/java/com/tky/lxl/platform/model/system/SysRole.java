package com.tky.lxl.platform.model.system;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title:SysRole </p>
 * <p>Description: 角色Model</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年3月16日 下午7:35:24）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class SysRole extends BaseModel{
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
     * 角色ID
     */
    private Long roleId;
    /**
     * 角色名称
     */
    private String roleName;
    /**
     * 是否显示
     */
    private Long isShow;
    /**
     * 角色描述
     */
    private String desription;
    /**
     * 角色英文名
     */
    private String role;
    /**
     * 权限级别
     *   0:中心级 1:项目级 2:标段级
     */
    private Long roleLevel;
    /**
     * 角色类型
     *   0:默认角色 1:普通角色 2:观测人员
     */
    private Short roleType;
}