package com.tky.lxl.platform.model.business;

import java.io.Serializable;

import lombok.Data;

/**
 *  <p>Title: PierBody</p>
 *  <p>Description: 墩身</p>
 *  <p>Company: 铁科院</p> 
 *
 *  @author sunjiashu（2017年4月17日  上午11:10:55）
 *
 *  @version:1.0.0  copyright  2017-2018
 */
@Data
public class PierBody implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 同步用
	 */
	private int count;
	/**
	 * 墩ID
	 */
	private int pierid;
	/**
	 * 墩名称
	 */
	private String piername;
	/**
	 * 墩宽
	 */
	private Double width;
	/**
	 * 墩高
	 */
	private Double height;
	/**
	 * 中心里程
	 */
	private Double centermileage;
	/**
	 * 中心里程
	 */
	private String centermileagestr;
	/**
	 * 桥梁形象化T构ID
	 */
	private int tsid;
}
