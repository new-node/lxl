package com.tky.lxl.platform.model.system;

import java.sql.Date;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title: UserInfo</p>
 * <p>Description: 登陆用户信息</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年3月2日 下午4:14:13）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class UserInfo extends BaseModel{
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 用户ID
	 */
	private Long id;
	/**
	 * 账号
	 */
    private String account;
    /**
     * 用户姓名
     */
    private String name;
    /**
     * 性别
     */
    private String sex;
    /**
     * 排序
     */
    private int priority ;
    /**
     * 所属部门ID外键
     */
    private int departmentid;
    /**
     * 职务
     */
    private String proName;
    /**
     * 扩展定义
     *   0：删除
     *   1：在用
     *   2：停用
     *   3:封存
     */
    private int useFlag;
    /**
     * 创建日期
     */
    private Date createDate;
    /**
     * 修改日期, for 二院
     */
    private Date modifyDate;
    /**
     * 删除日期, for 二院
     */
    private Date deleteDate ;
    /**
     * 用户登陆账号，用于用户个性化登录
     */
    private String loginaccount;
    /**
     * 用户级别,管理平台 默认为3
     */
    private int userlevel;
    /**
     * 虚拟账号标示
     *   1:表示账号是主账号
     *   2:表示账号是虚拟账号
     */
    private int virtualaccount;
    /**
     * 用户类型
     *   2：普通用户
     *   3：管理管理员
     *   4：公共账号
     *   5:内部账号
     */
    private int usertype;
    /**
     * 电话
     */
    private String mobile;
    /**
     * 登陆用户类型(追加属性)
     *   中心级用户
     *   中心级管理员
     *   
     *   建设单位级用户
     *   建设单位级管理员
     *   
     *   指挥部级普通用户
     *   建指管理员
     *   
     *   标段级用户
     *   标段管理员
     */
    private String userLoginType;
    /**
     *  部门名称(追加属性)
     */
    private String departmentName;
}