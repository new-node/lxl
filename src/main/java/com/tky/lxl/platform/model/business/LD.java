package com.tky.lxl.platform.model.business;

import java.math.BigDecimal;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title:LD </p>
 * <p>Description: 梁段表Model</p>
 * <p>Company: 铁科院</p> 
 *
 * @author lihongcui（2017年3月6日 下午4:33:34）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class LD extends BaseModel {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 梁段ID
	 */
	private Long partid;
	/**
	 * 梁段编码
	 */
	private String code;
	/**
	 * 梁段名称
	 */
	private String partnum;
	/**
	 * 梁段长度
	 */
	private BigDecimal sectlength;
	/**
	 * 小里程高度H
	 */
	private BigDecimal heights;
	/**
	 * 大里程高度H
	 */
	private BigDecimal heightb;
	/**
	 * 梁段类型
	 */
	private Short type;
	/**
	 * 大小里程类型
	 */
	private Short mileageflag;
	/**
	 * 连续梁ID
	 */
	private Long conbeamid;
	/**
	 * T构
	 */
	private Long pier;
	/**
	 * 虚删标志位
	 */
	private Short useflag;
	/**
	 * 缩略名
	 */
	private String shortname;
	/**
	 * 备注(小里程)
	 */
	private String lowerremarks;
	/**
	 * 备注(大里程)
	 */
	private String upperremarks;
}