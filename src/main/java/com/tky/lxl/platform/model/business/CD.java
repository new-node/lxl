package com.tky.lxl.platform.model.business;

import java.math.BigDecimal;
import java.util.Date;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title:CD </p>
 * <p>Description: 测点表Model</p>
 * <p>Company: 铁科院</p> 
 *
 * @author lihongcui（2017年3月3日 下午2:29:47）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class CD extends BaseModel{
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
     * 
     */
    /**
     * 结果条数，用来判断更新还是插入
     */
    private int count;
    /**
     * 测点编号
     */
    private Long cdid;

    /**
     * 测点编码
     */
    private String cdbm;
    
    /**
     * 里程类型
     */
    private Short mileageflag;
    
    /**
     * 编码
     */
    private String code;

    /**
     * 测点类型
     */
    private Short ptype;

    /**
     * 测点位置号
     */
    private Short pointplace;

    /**
     * 工况编码
     */
    private Short gkbm;

    /**
     * 理论计算高程值
     */
    private BigDecimal calculateht;

    /**
     * 理论X值
     */
    private BigDecimal llX;
    /**
     * 理论Y值
     */
    private BigDecimal llY;

    /**
     * 标段编码
     */
    private Long conbeamid;

    /**
     * 墩
     */
    private Long pier;

    /**
     * 粱段编号
     */
    private Long partid;

    /**
     * 更新时间
     */
    private Date updatetime;
    
    /**
     * 更新用户
     */
    private String updateuser;
    
    /**
     * 创建时间
     */
    private Date createtime;
    
    /**
     * 创建用户
     */
    private String createuser;

    /**
     * 标志位
     */
    private Short useflag;
    
    /**
     * 施工工况名称
     */
    private String name;
    
    /**
     * 初始化测点ID
     */
    private Long initpointid;


}