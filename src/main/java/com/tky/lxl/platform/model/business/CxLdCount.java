package com.tky.lxl.platform.model.business;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title:CxLdCount </p>
 * <p>Description: 超限处置进度    ---  超限梁段</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年2月19日 下午1:47:22）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class CxLdCount extends BaseModel{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 梁段超限数量
	 */
	private Integer warnldcount;
	/**
	 * 梁段超限未处置数量
	 */
	private Integer warnldcountnodeal;
	/**
	 * 梁段超限已处置百分比
	 */
	private Integer yczpercent;
	/**
	 * 梁段总数
	 */
	private Integer warnzcount;
	/**
	 * 各标段超限梁段数
	 */
    private Integer warnldbysection;
    /**
     * 标段
     */
    private String section;
    /**
     * 标段ID
     */
    private String sectionid;
}
