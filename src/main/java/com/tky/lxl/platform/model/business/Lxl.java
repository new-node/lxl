package com.tky.lxl.platform.model.business;

import java.math.BigDecimal;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title:Lxl </p>
 * <p>Description: 连续梁Model</p>
 * <p>Company: 铁科院</p> 
 *
 * @author yushanli（2017年3月2日 上午11:08:29）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class Lxl extends BaseModel{

	private static final long serialVersionUID = 1L;
	/**
     * 件数统计
     */
    private Integer count;
	/**
	 * 连续梁ID
	 */
	private Long conbeamid;
	/**
	 * 连续梁编码
	 */
	private String code;
	/**
	 * 连续梁名称
	 */
	private String name;
	/**
	 * 中心里程
	 */
	private String centermile;
	/**
	 * 桥跨组和
	 */
	private String beamaspan;
	/**
	 * 桥梁主跨跨度
	 */
	private BigDecimal mainkdlength;
	/**
	 * 梁段总数
	 */
	private Long ldcount;
	/**测点总数
	 * 
	 */
	private Long cdcount;
	/**
	 * 超限梁段总数
	 */
	private Long warnldcountdeal;
	/**
	 * 未处置超限梁段总数
	 */
	private Long warnldcountnodeal;
	/**
	 * 状态
	 */
	private Short status;
	/**
	 * 备注
	 */
	private String remark;
	/**
	 * 使用标识 0在用 1删除
	 */
	private Short useflag;
	/**
	 * 项目ID
	 */
	private Long projectinfoid;
	/**
	 * 标段ID
	 */
	private Long sectionid;
	/**
	 * 工点ID
	 */
	private Long siteid;
	/**
	 * 连续梁长度
	 */
	private  Long length;
	/**
	 * 增加的测点数
	 */
	private Long cdaddcount;
	/**
	 * 工作基点总数
	 */
	private Long basecount;
	/**
	 * 同步用 连续梁ID
	 */
	private Long id;
	/**
	 * 同步用 项目ID
	 */
	private Long projectid;
	/**
	 * 同步用 连续梁名称
	 */
	private String structurename;
	/**
	 * 同步用 中心里程
	 */
	private String centerMileagestr;
	/**
	 * 
	 */
	private Float centerMileage;
	/**
	 * 连续梁用中心里程
	 */
	private String centerMilestr;
	
	private int iszh;
}