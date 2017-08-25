package com.tky.lxl.platform.model.business;

import lombok.Data;
import lombok.EqualsAndHashCode;
/**
 * 
 * <p>Title:LdMonitorStatus </p>
 * <p>Description: 连续梁梁段的监测状态</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年8月15日 下午5:02:33）
 *
 * @version:1.0.0 copyright © 2017-2018
 */

@Data
@EqualsAndHashCode(callSuper=false)
public class LdMonitorStatus {

	/**
	 * 连续梁ID
	 */
	private Long conbeamid;
	
	/**
	 * 梁段ID
	 */
	private Long partid;
	
	/**
	 * 墩
	 */
	private Long pier;
	
	/**
	 * 排序字段
	 */
	private Long seq;
	
	/**
	 * 连续梁的监测梁段的监测状态
	 */
	private Long status;
	
	/**
	 * 梁段类型
	 */
	private int ldtype;
	
	/**
	 * 大小里程区分
	 */
	private int mileageflag;
}
