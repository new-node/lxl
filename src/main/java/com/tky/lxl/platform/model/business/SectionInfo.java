package com.tky.lxl.platform.model.business;

import java.math.BigDecimal;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;
/**
 * 
 * <p>Title:SectionInfo </p>
 * <p>Description:获取标段信息 </p>
 * <p>Company: 铁科院</p> 
 *
 * @author liuzhenya（2017年3月14日 下午1:53:44）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class SectionInfo extends BaseModel {
	
	private static final long serialVersionUID = 1L;
	/**
	 * 连续梁名称
	 */
	private String name;
	/**
	 * 连续梁ID
	 */
	private Long conbeamid;
	/**
	 * 状态
	 */
	private Long status;
	/**
	 * 未处理超限梁段数
	 */
	private BigDecimal nodealcount;
	/**
	 * 处理中超限梁段数
	 */
	private BigDecimal dealingcount;
	/**
	 * 当前工况：梁段类型!=0,3,4或者5
	 */
	private String normalld;
	/**
	 * 当前工况：梁段类型=0,3,4或者5
	 */
	private String specialld;
	/**
	 * 已测测点数
	 */
	private Long cdcount;
	/**
	 * 已测基点数
	 */
	private BigDecimal basecount;
	/**
	 * 已测梁段数
	 */
	private Long ldcount;

	/**
	 * 标段ID
	 */
	private String sectionid;
}