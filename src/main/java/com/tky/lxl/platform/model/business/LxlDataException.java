package com.tky.lxl.platform.model.business;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;
/**
 * <p>Title:LxlDataException </p>
 * <p>Description:获取连续梁异常信息 </p>
 * <p>Company: 铁科院</p> 
 *
 * @author liuzhenya（2017年3月14日 下午1:53:44）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class LxlDataException extends BaseModel {
	
	private static final long serialVersionUID = 1L;
	/**
	 * T构
	 */
	private Long pier;
	/**
	 * 当前梁段的工况编码(拼接)(小里程)
	 */
	private String lowergkbm;
	/**
	 * 高程偏差最大和最小值(小里程)
	 */
	private String lowerdelta;
	/**
	 * 中线偏差(小里程)
	 */
	private String loweroutl;
	/**
	 * 立模偏差数据(小里程)
	 */
	private String lowerlmpcz;
	/**
	 * 当前梁段的工况编码(拼接)(大里程)
	 */
	private String uppergkbm;
	/**
	 * 高程偏差最大和最小值(大里程)
	 */
	private String upperdelta;
	/**
	 * 中线偏差(大里程)
	 */
	private String upperoutl;
	/**
	 * 立模偏差数据(大里程)
	 */
	private String upperlmpcz;
	/**
	 * 梁段ID
	 */
	private String partid;
	/**
	 * 梁段名称简写
	 */
	private String shortname;
	/**
	 * 大小里程区分FLG
	 */
	private String mileageflag;
	/**
	 * 梁段类型
	 */
	private String ldtype;
	/**
	 * 备注(小里程)
	 */
	private String lowerremarks;
	/**
	 * 备注(大里程)
	 */
	private String upperremarks;
	/**
	 * 当前梁段最大工况
	 */
	private String maxgkbm;
	/**
	 * 排序seq
	 */
	private String seq;
	/**
	 * 连续梁id
	 */
	private String conbeamid;
	
	/**
	 * 直线段的大小里程区分
	 */
	private String lineflag;
}