/**
 * 
 */
package com.tky.lxl.platform.model.business;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title: Organization</p>
 * <p>Description: 组织</p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年3月9日 下午4:14:44）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class Organization extends BaseModel{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 部门ID
	 */
	private String departmentId;
	/**
	 * 部门名称
	 */
	private String departmentName;
	/**
	 * 片区ID
	 */
	private String categoryItemId;
	/**
	 * 片区名称
	 */
	private String categoryItemName;
	/**
	 * 项目ID
	 */
	private String projectId;
	/**
	 * 项目名称
	 */
	private String projectName;
	/**
	 * 项目类型
	 */
	private String projectType;
	/**
	 * 项目 偏差超限数
	 */
	private Integer cntProjectWarn;
	/**
	 * 标段ID
	 */
	private String sectionId;
	/**
	 * 标段名称
	 */
	private String sectionName;
	/**
	 * 标段 偏差超限数
	 */
	private Integer cntSectionWarn;
	/**
	 * 连续梁ID
	 */
	private String conbeamId;
	/**
	 * 连续梁名称
	 */
	private String conbeamName;
	/**
	 * 桥梁主跨跨度
	 */
	private String mainKdLength;
	/**
	 * 连续梁 偏差超限数
	 */
	private Integer cntConBeamWarn;
}
