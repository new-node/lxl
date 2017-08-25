package com.tky.lxl.platform.model.mobile;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title: QSLDInfo</p>
 * <p>Description: 缺失梁段信息</p>
 * <p>Company: 铁科院</p> 
 *
 * @author wk（2017年5月20日）
 *
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class QSLDInfo extends BaseModel{
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 标段名称
	 */
	private String sectionName;
	/**
	 * 连续梁名称
	 */
    private String name;
    /**
     * 连续梁ID
     */
    private String conbeamid;
    /**
     * 缺失梁段数
     */
    private Integer cou;
}