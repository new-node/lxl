package com.tky.lxl.platform.model.business;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title:CategoryItem </p>
 * <p>Description: 片区表对应Model</p>
 * <p>Company: 铁科院</p> 
 *
 * @author yushanli（2017年3月2日 上午11:07:37）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class CategoryItem extends BaseModel {

	private static final long serialVersionUID = 1L;
	/**
	 * 结果条数，用来判断更新还是插入
	 */
	private int count;
	/**
	 * 片区ID
	 */
	private Long id;
	/**
	 * 片区名称
	 */
	private String name;
	/**
	 * 片区编码
	 */
	private String code;
	/**
	 * 优先级
	 */
	private Integer priority;
	/**
	 * 在用标记
	 */
	private Integer useFlag;

	private Long rId;

}
