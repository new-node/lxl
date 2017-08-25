package com.tky.lxl.platform.model.business;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;
/**
 * <p>Title:SectionInfo </p>
 * <p>Description:获取连续了下的偏差超限信息 </p>
 * <p>Company: 铁科院</p> 
 *
 * @author liuzhenya（2017年3月14日 下午1:53:44）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class LxlWarnInfo extends BaseModel {
	
	private static final long serialVersionUID = 1L;
	/**
	 * T构
	 */
	private Long pier;
	/**
	 * 梁段名称简写
	 */
	private String shortname;
	/**
	 * 小里程偏差超限类型
	 */
	private String lowerwarntypes;
	/**
	 * 大里程偏差超限类型
	 */
	private String upperwarntypes;
	/**
	 * 梁段类型
	 */
	private String ldtype;
	/**
	 * 排序用
	 */
	private String ldindex;
}