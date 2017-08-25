package com.tky.lxl.platform.model.business;

import java.util.Date;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 *  <p>Title: UserLxl</p>
 *  <p>Description: 用户连续梁</p>
 *  <p>Company: 铁科院</p> 
 *
 *  @author sunjiashu（2017年4月17日  下午12:02:26）
 *
 *  @version:1.0.0  copyright  2017-2018
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class UserLxl extends BaseModel{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 更新插入判断用
	 */
	private int count;
	
	/**
	 * 
	 */
    private Long id;
    /**
     * 用户登陆名称
     */
    private String account;
    /**
     * 连续梁ID
     */
    private Long conBeamId;
    /**
     * 用户真实姓名
     */
    private String userName;
    /**
     * 联系电话
     */
    private String mobile;
    /**
     * 部门ID
     */
    private Long departmentId;
    /**
     * 部门名称
     */
    private String departmentName;
    /**
     * 连续梁名称
     */
    private String conBeamName;
    /**
     * 连续梁 开始里程
     */
    private String startMile;
    /**
     * 连续梁 结束里程
     */
    private String endMile;
    /**
     * 连续梁 长度
     */
    private String conBeamLenth;
    /**
     * 标段ID
     */
    private Long sectionId;
    /**
     * 工区ID 
     */
    private Long areaId;
    /**
     * 更新用户ID
     */
    private Long updateUserId;
    /**
     * 更新时间
     */
    private Date updateDateTime;
    /**
     * 是否在用
     */
    private Short useFlag;
    /**
     * 更新插入标志
     */
    private String updateFlag;
    /**
     * 授权状态
     */
    private String grantState;
}