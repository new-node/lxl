package com.tky.lxl.platform.model.business;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 *  <p>Title: PierDraw</p>
 *  <p>Description: 墩身描画类</p>
 *  <p>Company: 铁科院</p> 
 *
 *  @author yushanli（2017年4月17日  上午11:11:39）
 *
 *  @version:1.0.0  copyright  2017-2018
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class PierDraw extends BaseModel{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 墩ID
	 */
	private int pierid;
	/**
	 * 埻名称
	 */
	private String piername;
	/**
	 * 宽
	 */
	private Double width;
	/**
	 * 高
	 */
	private Double height;
	/**
	 * 中心里程
	 */
	private Double centermileage;
	/**
	 * 中心里程(字符串)
	 */
	private String centermileagestr;
	/**
	 * 
	 */
	private int tsid;
}
