package com.tky.lxl.platform.model.business;

import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title:DatumPointList </p>
 * <p>Description: 页面基准点履历list</p>
 * <p>Company: 铁科院</p> 
 *
 * @author yushanli（2017年3月10日 上午9:39:13）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class DatumPointRecordList {
	/**
	 *  履历list
	 */
	private List<DatumPointRecord> recordList;
	/**
	 *  基准点所属项目
	 */
	private String proinfoName;
	/**
	 *  基准点所属标段
	 */
	private String prosectionName;
	/**
	 *  基准点所属连续梁
	 */
	private String lxlName;
	/**
	 *  基准点所属梁段
	 */
//	private String ldName;
}
