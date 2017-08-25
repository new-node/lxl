package com.tky.lxl.platform.model.business;

import java.math.BigDecimal;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 
 * <p>Title:ProjectInfo </p>
 * <p>Description: 项目信息Model</p>
 * <p>Company: 铁科院</p> 
 *
 * @author yushanli（2017年3月2日 上午11:08:48）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class ProjectInfo extends BaseModel {

	private static final long serialVersionUID = 1L;
	/**
	 * 项目ID
	 */
	private Long id;
	/**
	 * 工程编码
	 */
	private String code;
	/**
	 * 是否在使用中
	 *  1为使用中
	 *   0为废弃
	 */
	private Long useflag;
	/**
	 * 排序
	 */
	private Double priority;
	/**
	 * 项目名称
	 */
	private String name;
	/**
	 * 预计开工时间
	 */
	private BigDecimal startdate;
	/**
	 * 预计结束日期
	 */
	private BigDecimal stopdate;
	/**
	 * 开始里程
	 */
	private String startmile;
	/**
	 * 结束里程
	 */
	private String stopmile;
	/**
	 * 类型
	 */
	private BigDecimal projectinfotypeid;
	/**
	 * 工程来源
	 *   ID外键（PBS_projectSource（Id））
	 */
	private BigDecimal projectinfosourceid;
	/**
	 * 项目所属的建设单位（路局、客专公司）
	 */
	private BigDecimal constructiondepid;
	/**
	 * 所属片区 ID外键
	 *   （BASE_SECURITY_common_categoryItem（ID））
	 */
	private BigDecimal categoryid;
	/**
	 * 创建时间
	 */
	private BigDecimal createdate;
	/**
	 * 修改时间
	 */
	private BigDecimal modifydate;
	/**
	 * 删除时间
	 */
	private BigDecimal deletedate;
	/**
	 * 项目简称
	 */
	private String nameabbr;
	/**
	 * 是否开通 
	 *   0、未开通
	 *   1、全部开通
	 *   2、部分开通
	 */
	private BigDecimal isfinish;
	/**
	 * 实际开工时间
	 */
	private BigDecimal actualstartdate;
	/**
	 * 计划投产时间
	 */
	private BigDecimal planoperationdate;
	/**
	 * 
	 */
	private BigDecimal length;
	/**
	 * 
	 */
	private BigDecimal rid;
}
