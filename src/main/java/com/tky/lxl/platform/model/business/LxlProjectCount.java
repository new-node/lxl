package com.tky.lxl.platform.model.business;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title:LxlProjectCount </p>
 * <p>Description: 综合总计表  --- 按照项目统计</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年2月19日 下午1:49:05）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class LxlProjectCount extends BaseModel{
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
	private Integer projectid;
	/**
	 * 项目名称
	 */
	private String projectname;
	/**
	 * 已测梁段数
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
	 * 连续梁超限处置中数量
	 */
    private Integer warnlxlcountdeal;
	/**
	 * 连续梁超限未处置数量
	 */
	private Integer warnlxlcountnodeal;
	/**
	 * 连续梁超限已处置数量
	 */
	private Integer warnlxlcountyesdeal;
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
     * 梁段超限已处置数量
     */
    private Integer warnldcountyesdeal;
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
	/**
	 * 标段ID
	 */
	private Integer sectionId;
	/**
	 * 标段名称
	 */
	private String section;
	
	private Integer warncdcount;
}
