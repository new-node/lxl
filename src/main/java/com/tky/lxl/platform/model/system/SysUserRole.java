package com.tky.lxl.platform.model.system;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title: SysUserRole</p>
 * <p>Description: 用户角色</p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年3月20日 下午8:37:16）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class SysUserRole extends BaseModel{
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 保存判断用
	 */
	private Integer count;
	/**
     *用户角色ID
     */
    private Long ruId;
	/**
     *角色ID
     */
    private Long roleId;
	/**
     *角色名称
     */
    private String roleName;
    /**
     *用户登陆名称
     */
    private String account;
    /**
     * 是否在用
     */
    private Short useFlag;
    /**
     * 用户ID
     */
    private Long userId;
    /**
     * 用户姓名
     */
    private String userName;
    /**
     * 角色ID一览
     */
    private String roleIdList;
    /**
     * 关联状态
     */
    private Short grantState;
    /**
     * 角色说明
     */
    private String description;
    /**
     * 更新者ID
     */
    private Long updateUserId;
    /**
     * 角色类型
     *   0:默认角色 1:普通角色 2:观测人员
     */
    private Short roleType;
}