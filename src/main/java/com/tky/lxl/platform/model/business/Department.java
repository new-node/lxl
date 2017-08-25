package com.tky.lxl.platform.model.business;

import javax.persistence.Id;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title:Department </p>
 * <p>Description: 部门表对应Model</p>
 * <p>Company: 铁科院</p> 
 *
 * @author yushanli（2017年3月2日 上午11:08:05）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class Department extends BaseModel {

	private static final long serialVersionUID = 1L;

	/**
	 * 结果条数，用来判断更新还是插入
	 */
	private int count;
	/**
	 * 部门ID
	 */
	@Id
	private Long id;
	/**
	 * rid
	 */
	private Long rId;
	/**
	 * 部门名称
	 */
	private String name;
	/**
	 * 部门简称
	 */
	private String shortname;
	/**
	 * 上级部门id
	 */
	private Long parentid;
	/**
	 * 优先级
	 */
	private String priority;
	/**
	 * 在用标记
	 */
	private Integer useFlag;
	/**
	 * 部门级别
	 */
	private Integer grade;
	/**
	 * 片区id
	 */
	private Long categoryId;
	/**
	 * 项目id
	 */
	private Long projectInfoId;
	/**
	 * 标段ID
	 */
	private Long projectSectionId;
	/**
	 * 工区ID
	 */
	private Long projectAreaId;
	/**
	 * 创建时间
	 */
	private Long createDate;
	/**
	 * 删除时间
	 */
	private Long deleteDate;
	/**
	 * 部门级别
	 */
	private Integer depLevel;
	/**
	 * 更新时间
	 */
	private Long udpateDate;

}
