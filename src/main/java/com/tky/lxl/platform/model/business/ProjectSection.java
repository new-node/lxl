package com.tky.lxl.platform.model.business;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Id;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title:ProjectSection </p>
 * <p>Description: 项目标段Model</p>
 * <p>Company: 铁科院</p> 
 *
 * @author yushanli（2017年3月2日 上午11:09:08）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class ProjectSection extends BaseModel {

	private static final long serialVersionUID = 1L;
	/**
	 * 结果条数，用来判断更新还是插入
	 */
	private int count;
	/**
	 * 标段ID
	 */
	@Id
	private Long id;
	/**
	 * 标段编码
	 */
	private String code;
	/**
	 * 创建时间
	 */
	private Date createdate;
	/**
	 * 删除时间
	 */
	private Date deletedate;
	/**
	 * 线路长度
	 */
	private String linelength;
	/**
	 * 修改时间
	 */
	private Date modifydate;
	/**
	 * 标段名称
	 */
	private String name;
	/**
	 * 优先级
	 */
	private Double priority;
	/**
	 * 项目ID
	 */
	private Long projectinfoid;
	/**
	 * 标段类型
	 */
	private String projecttype;
	/**
	 * 远程数据ID
	 */
	private BigDecimal rid;
	/**
	 * 标段总长度
	 */
	private String totallength;

	private Date updateat;
	/**
	 * 是否在用
	 */
	private Long useflag;
	/**
	 * 工区ID
	 */
	private BigDecimal gqid;
	/**
	 * 工区名称
	 */
	private String gqname;
	/**
	 * 项目名称
	 */
	private String projectinfoname;
	/**
	 * 状态
	 */
	private Long state;
	/**
	 * 根部门ID
	 */
	private Long commandDep;
}
