package com.tky.lxl.platform.model.business;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 
 * <p>Title:LxlPianquCount </p>
 * <p>Description: 综合总计表  --- 按照片区统计</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年2月19日 下午1:54:34）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class LxlPianquCount extends BaseModel{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 片区ID
	 */
	private Integer categoryid;
	/**
	 * 片区名称
	 */
	private String categoryname;
	/**
	 * 项目ID
	 */
	private String itemid;
	/**
	 * 项目名称
	 */
	private String itemname;
	/**
	 * 连续梁ID
	 */
	private String conbeamid;
	/**
	 * 梁段数量
	 */
	private Integer ldcount;
	/**
	 * 测点数量
	 */
	private Integer cdcount;
	/**
	 * 连续梁超限数量
	 */
	private Integer warnlxlcount;
	/**
	 * 连续梁超限未处置数量
	 */
	private Integer warnlxlcountnodeal;
    /**
     * 连续梁超限处置中数量
     */
    private Integer warnlxlcountdeal;
	/**
	 * 梁段超限数量
	 */
	private Integer warnldcount;
	/**
	 * 梁段超限处置中数量
	 */
    private Integer warnldcountdeal;
	/**
	 * 梁段超限未处置数量
	 */
	private Integer warnldcountnodeal;
	/**
	 * 工作基点个数
	 */
	private Integer gzjdcount;
	/**
	 * 连续梁监测  -- 总数量
	 */
	private Integer zcount;
	/**
	 * 连续梁监测  -- 未监测数量
	 */
	private Integer wjccount;
	/**
	 * 连续梁监测  -- 监测中数量
	 */
	private Integer jczcount;
	/**
	 * 连续梁监测  -- 待合龙数量
	 */
	private Integer dhlcount;
	/**
	 * 连续梁监测  -- 已合龙数量
	 */
	private Integer yhlcount;
}
