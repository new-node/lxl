package com.tky.lxl.platform.model.business;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title:HomeCondition </p>
 * <p>Description: 首页查询条件</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年3月28日 下午8:13:55）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class HomeCondition extends BaseModel{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 缓存key
	 */
	private String cacheKey;
	/**
	 * 项目ID
	 */
	private String projectid;
	
	/**
	 * 连续梁ID
	 */
	private String conbeamid;
}
