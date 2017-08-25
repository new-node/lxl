package com.tky.lxl.platform.model.business;

import java.util.Date;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 
 * <p>Title: Observer</p>
 * <p>Description: 观测人员</p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年3月14日 下午7:49:51）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class Observer extends BaseModel{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 更新插入判断用
	 */
	private int count;
	/**
	 * ID
	 */
    private Long id;
	/**
	 * 片区名称
	 */
	private String categoryname;
	/**
	 * 片区ID
	 */
	private String categoryid;
	/**
	 * 项目名称
	 */
	private String projectname;
	/**
	 * 项目ID
	 */
	private String projectid;
	/**
	 * 标段ID
	 */
	private String sectionId;
	/**
	 * 部门ID
	 */
	private Integer departmentId;
	/**
	 * 标段名称
	 */
	private String sectionName;
	/**
	 * 部门名称
	 */
	private String departmentName;
	/**
	 * 用户登陆账号
	 */
	private String account;
	/**
	 * 用户名
	 */
	private String userName;
	/**
	 * 职务
	 */
	private String proName;
	/**
	 * 电话
	 */
	private String mobile;
	/**
	 * 上岗证书编号
	 */
    private String certificateNumber;
    /**
     * 上岗证书扫描件
     */
    private String certificateScan;
    /**
     * 更新用户
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
     * 当前页码（已知）
     */
     private int pageNo = 1;
     /**
     * 开始行号（未知）
     */
     private int startNum = 0;
     /**
     * 未知
     */
     private int endNum = 0;
     /**
 	 * 缓存key
 	 */
 	private String cacheKey;
 	/**
 	 * 标段ID
 	 */
 	private Long[] sectionids;
}
