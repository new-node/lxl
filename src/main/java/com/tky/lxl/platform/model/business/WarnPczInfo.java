package com.tky.lxl.platform.model.business;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title:WarnInfo </p>
 * <p>Description: 获取高程偏差信息</p>
 * <p>Company: 铁科院</p> 
 *
 * @author liuzhenya（2017年3月9日 下午1:52:37）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class WarnPczInfo extends BaseModel{

	private static final long serialVersionUID = 1L;

	/**
	 * 梁段ID
	 */
	private Long partid;
	/**
	 * 超限偏差值
	 */
	private String pcz;
	/**
	 * 梁段名称简写
	 */
	private String shortname;
	/**
	 * T构
	 */
	private Long pier;
	/**
	 * 梁段类型
	 */
	private Long ldtype;
	/**
	 * 测点位置
	 */
	private Long pointplace;
	/**
	 * 里程FLG
	 */
	private Long mileageflag;
//	/**
//	 * 排序用
//	 */
//	private String ldindex;
	/**
	 * 排序用SEQ
	 */
	private Long seq;

	/**
	 * 是否超限
	 */
	private Long iswarn;
}