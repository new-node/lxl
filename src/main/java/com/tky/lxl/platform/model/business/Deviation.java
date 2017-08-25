package com.tky.lxl.platform.model.business;

import java.sql.Date;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;
/**
 * <p>Title:LxlDataException </p>
 * <p>Description:偏差范围设定</p>
 * <p>Company: 铁科院</p> 
 *
 * @author liuzhenya（2017年3月14日 下午1:53:44）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class Deviation extends BaseModel {
	private static final long serialVersionUID = 1L;
	
	/**
	 * 主键ID
	 */
	private Long id;
	/**
	 * 偏差类型
	 */
	private String type;
	/**
	 * 偏差上限
	 */
	private Long upper;
	/**
	 * 偏差下限
	 */
	private Long lower;
	/**
	 * 更新时间
	 */
	private Date updatetime;
	/**
	 * 项目ID
	 */
	private Long projectinfoid;
	/**
	 * 删除有效标识
	 */
	private Short useflag;
}