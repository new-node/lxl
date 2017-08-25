package com.tky.lxl.platform.model.business;

import lombok.Data;

/**
 *  <p>Title: NewLxl</p>
 *  <p>Description: </p>
 *  <p>Company: 铁科院</p> 
 *
 *  @author sunjiashu（2017年4月17日  上午11:09:16）
 *
 *  @version:1.0.0  copyright  2017-2018
 */
@Data
public class NewLxl {

	/**
	 * 连续梁名称
	 */
	private String name;

	/**
	 * 最新测量时间
	 */
	private String newdate;
}
