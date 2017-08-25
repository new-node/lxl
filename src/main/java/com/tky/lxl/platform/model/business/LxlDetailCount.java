package com.tky.lxl.platform.model.business;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title:LxlDetailCount </p>
 * <p>Description: 按照主跨度的长度分区详细统计</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年2月16日 下午6:13:18）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class LxlDetailCount extends BaseModel{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 桥梁总数
	 */
	private Long zcount;
	/**
	 * 未监测的桥梁数量
	 */
	private Long wcount;
	/**
	 * 除未监测以外的桥梁数量
	 */
	private Long ycount;
	/**
	 * 未监测的百分比
	 */
	private float ypercent;
}
