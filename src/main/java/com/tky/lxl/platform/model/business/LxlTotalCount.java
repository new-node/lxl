package com.tky.lxl.platform.model.business;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title: LxlTotalCount</p>
 * <p>Description: 连续梁主跨度整体统计</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年2月16日 下午6:14:07）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class LxlTotalCount extends BaseModel{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * 
	 */
	private Integer zcount;
	/**
	 * 主跨跨度<60
	 */
	private Integer sixtycount;
	/**
	 * 主跨跨度>=60 <80
	 */
	private Integer eightycount;
	/**
	 * 主跨跨度 >=80 <100
	 */
	private Integer hundredcount;
	/**
	 * 主跨跨度>=100 <120
	 */
	private Integer hundredtwentycount;
	/**
	 * 主跨跨度>=120
	 */
	private Integer elsecount;
}
