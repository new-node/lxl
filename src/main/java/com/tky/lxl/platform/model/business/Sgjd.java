package com.tky.lxl.platform.model.business;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title: Sgjd</p>
 * <p>Description: 施工阶段</p>
 * <p>Company: 铁科院</p> 
 *
 * @author yushanli（2017年3月27日 下午2:20:59）
 *
 * @version:1.0.0 copyright © 2017-2018
 */

@Data
@EqualsAndHashCode(callSuper = false)
public class Sgjd extends BaseModel {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 气压
	 */
	private String barometric;
	/**
	 * 天气
	 */
	private String weather;
	/**
	 * 温度
	 */
	private String temperature;
	/**
	 * 测量时间
	 */
	private String mtime;
	/**
	 * 测量员
	 */
	private String cly;

}