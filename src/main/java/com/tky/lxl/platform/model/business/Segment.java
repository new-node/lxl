package com.tky.lxl.platform.model.business;

import java.io.Serializable;
import java.math.BigDecimal;

import lombok.Data;

/**
 *  <p>Title: Segment</p>
 *  <p>Description: 节段</p>
 *  <p>Company: 铁科院</p> 
 *
 *  @author sunjiashu（2017年4月17日  上午11:25:07）
 *
 *  @version:1.0.0  copyright  2017-2018
 */
@Data
public class Segment implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 同步用
	 */
	private int count;
	/**
	 * 连续梁ID
	 */
	private int conbeamid;
	/**
	 * 根据墩号获取T构ID
	 */
	private int pier;
	/**
	 * 桥梁形象化T构ID
	 */
	private int qlpier;
	/**
	 * 梁段名称
	 */
	private String partnum;
	/**
	 * 梁段简介
	 */
	private String fullname;
	/**
	 * 梁段简称
	 */
	private String shortname;
	/**
	 * 梁段长度
	 */
	private int sectlength;
	/**
	 * 小里程高度H
	 */
	private Float heights;
	/**
	 * 大里程高度H
	 */
	private Float heightb;
	/**
	 * 大小里程区分标识
	 */
	private int mileageflag;
	/**
	 * 墩名称
	 */
	private String piername;
	/**
	 * 节段类型
	 */
	private int type;
	/**
	 * 中心高度
	 */
	private int centerheight;
	/**
	 * 底宽
	 */
	private int bottomwidth;
	/**
	 * 中心里程
	 */
	private String centermileagestr;
	/**
	 * 中心里程
	 */
	private BigDecimal centermileage;

	//排序字段
	private int seq;
	
	public Segment() {
		super();
	}
	
	public Segment(int conbeamid, int qlpier, int sectlength, Float heights,
			Float heightb,int centerheight,int bottomwidth) {
		super();
		this.conbeamid = conbeamid;
		this.qlpier = qlpier;
		this.sectlength = sectlength;
		this.heights = heights;
		this.heightb = heightb;
		this.centerheight = centerheight;
		this.bottomwidth = bottomwidth;
	}
}
