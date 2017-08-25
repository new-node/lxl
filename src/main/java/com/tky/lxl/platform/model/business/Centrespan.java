package com.tky.lxl.platform.model.business;

import lombok.Data;

/**
 * <p>
 * Title: Centrespan
 * </p>
 * <p>
 * Description: 中跨
 * </p>
 * <p>
 * Company: 铁科院
 * </p>
 *  
 *
 * @author sunjiashu（2017年4月17日 上午10:47:47）
 *
 * @version:1.0.0 copyright 2017-2018
 */
@Data
public class Centrespan {

	/**
	 * 连续梁ID
	 */
	private int conbeamid;

	/**
	 * 梁段名称
	 */
	private String partnum;

	/**
	 * 梁段简介
	 */
	private String fullname;

	/**
	 * 和墩号对应的T构
	 */
	private int pier;

	/**
	 * 桥梁形象化T构
	 */
	private int qlpier;

	/**
	 * 墩号
	 */
	private String piername;

	/**
	 * 梁段长度
	 */
	private int sectlength;

	/**
	 * 小里程高度H
	 */
	private int heights;

	/**
	 * 大里程高度H
	 */
	private int heightb;

	/**
	 * 梁段类型 0直线段====5边跨非对称梁段 1边跨 =====4边跨合龙段 2中跨=====3中跨合龙段
	 */
	private int type;

	/**
	 * 大小里程区分标识
	 */
	private int mileageflag;

	/**
	 * 梁段简称
	 */
	private String shortname;

	/**
	 * 同步用
	 */
	private int count;

	/**
	 * 梁段ID
	 */
	private int partid;
	/**
	 * 直线段大小里程区分
	 */
	private Integer lineflag;
	/**
	 * 排序字段
	 */
	private Integer seq;

	public Centrespan() {
		super();
	}

	public Centrespan(int conbeamid, String fullname, int sectlength, int heights, int heightb, int type) {
		super();
		this.conbeamid = conbeamid;
		this.fullname = fullname;
		this.sectlength = sectlength;
		this.heights = heights;
		this.heightb = heightb;
		this.type = type;
	}
}
