package com.tky.lxl.platform.model.business;

import java.util.Date;

import javax.persistence.Id;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title:TBase </p>
 * <p>Description: 基准点表</p>
 * <p>Company: 铁科院</p> 
 *
 * @author yushanli（2017年3月7日 下午3:59:36）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class DatumPoint extends BaseModel {

	private static final long serialVersionUID = 1L;
	/**
	 * 结果条数，用来判断更新还是插入
	 */
	private int count;
	/**
	 *  基准点ID
	 */
	@Id
	private Long baseid;
	/**
	 *  基准点名称
	 */
	private String basename;
	/**
	 *  基准点编码
	 */
	private String basecode;
	/**
	 *  工点编码
	 */
	private String siteid;
	/**
	 *  更新时间
	 */
	private Date updatetime;
	/**
	 *  创建时间
	 */
	private Date createtime;
	/**
	 *  标志位
	 */
	private String useflag;
	/**
	 *  基准点类型
	 */
	private String basetype;
	/**
	 *  基准点数量
	 */
	private String basenum;
	/**
	 *  基准点高程值
	 */
	private String baseheight;
	/**
	 *  基准值X
	 */
	private String basexx;
	/**
	 *  基准值Y
	 */
	private String baseyy;
	/**
	 *  基准值Z
	 */
	private String basezz;
	/**
	 *  连续梁ID
	 */
	private Long conbeamid;
	/**
	 *  梁段ID
	 */
//	private Long partid;
	/**
	 * 用户名
	 */
	private String username;
	/**
     * 当前页码（已知）
     */
    private int pageNo = 1;
    /**
     * 开始行号（未知）
     */
    private int startNum = 0;
     /**
     * 未知
     */
     private int endNum = 0;
}