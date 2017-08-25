package com.tky.lxl.platform.model.business;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;
/**
 * 
 * <p>Title:LxlMonitorStatusCount </p>
 * <p>Description: 连续梁监测状态统计</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年2月18日 下午5:42:22）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class LxlMonitorStatusCount extends BaseModel{

/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 总数量
	 */
	private Integer zcount;
	/**
	 * 未监测
	 */
	private Integer wjccount;
	/**
	 * 已监测
	 */
	private Integer jczcount;
	/**
	 * 待合龙
	 */
	private Integer dhlcount;
	/**
	 * 已合龙
	 */
	private Integer yhlcount;
}
