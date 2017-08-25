package com.tky.lxl.platform.model.business;

import java.util.Date;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title:DatumPointRecord </p>
 * <p>Description: 基准点履历model</p>
 * <p>Company: 铁科院</p> 
 *
 * @author yushanli（2017年3月10日 上午8:58:28）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class DatumPointRecord {
	/**
	 *  基准点ID
	 */
	private Long baseid;
	/**
	 *  修正人
	 */
	private String changeperson;
	/**
	 *  X修正值
	 */
	private String basexx;
	/**
	 *  Y修正值
	 */
	private String baseyy;
	/**
	 *  Z修正值
	 */
	private String basezz;
	/**
	 *  修正原因
	 */
	private String changereason;
	/**
	 *  修正日期
	 */
	private Date createdate;
}