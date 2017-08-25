package com.tky.lxl.platform.model.business;

import lombok.Data;

/**
 *  <p>Title: LdDraw</p>
 *  <p>Description: 连续梁描画</p>
 *  <p>Company: 铁科院</p> 
 *
 *  @author yushanli（2017年3月17日  上午10:58:07）
 *
 *  @version:1.0.0  copyright  2017-2018
 */
@Data
public class LdDraw {

	/**
	 * 梁段ID
	 */
	private Long partid;
	/**
	 * 梁段名称
	 */
	private String partnum;
	/**
	 * 梁段长度
	 */
	private Double sectlength;
	/**
	 * 小里程高度H
	 */
	private Double heights;
	/**
	 * 大里程高度H
	 */
	private Double heightb;
	/**
	 * 梁段简称
	 */
	private String shortname;
	/**
	 * 中心里程
	 */
	private Double  centerMileage;
	/**
	 * 中心高度
	 */
	private Double centerHeight;
	/**
	 * 底宽
	 */
	private Double bottomWidth;
	/**
	 * 墩名
	 */
	private String piername;
	/**
	 * T构号
	 */
	private Integer pier;
	/**
	 * 桥梁形象化的T构ID
	 */
	private Integer tsid;
	/**
	 * 工况编码
	 */
	private String gkbm;
	
	/**
	 * 梁段类型
	 */
	private int type;
	
	/**
	 * 是否超限
	 * 0：未超限
	 * 1：超限
	 */
	private int iswarn;
	
	/**
	 * 排序字段
	 */
	private int seq;
	
	/**
	 * 判断T构的梁段是否中和
	 */
	private int tiszh;
	
	/**
	 * 上传工况编码的数量
	 */
	private int gkbmcount;
}
