package com.tky.lxl.platform.model.business;

import lombok.Data;

/**
 *  <p>Title: ZeroPoint</p>
 *  <p>Description: </p>
 *  <p>Company: 铁科院</p> 
 *
 *  @author sunjiashu（2017年4月17日  下午12:37:43）
 *
 *  @version:1.0.0  copyright  2017-2018
 */
@Data
public class ZeroPoint {

	private Double point1[]=new Double[2];
	private Double point2[]=new Double[2];
	private Double point3[]=new Double[2];
	private Double point4[]=new Double[2];
	private Double point5[]=new Double[2];
	private Double point6[]=new Double[2];

	public ZeroPoint() {
		super();
	}
	
	public ZeroPoint(Double[] point1, Double[] point2, Double[] point3, Double[] point4, Double[] point5,
			Double[] point6) {
		super();
		this.point1 = point1;
		this.point2 = point2;
		this.point3 = point3;
		this.point4 = point4;
		this.point5 = point5;
		this.point6 = point6;
	}
}
