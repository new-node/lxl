package com.tky.lxl.platform.model.business;

import lombok.Data;

/**
 *  <p>Title: LdQuery</p>
 *  <p>Description: </p>
 *  <p>Company: 铁科院</p> 
 *
 *  @author sunjiashu（2017年4月17日  上午10:58:43）
 *
 *  @version:1.0.0  copyright  2017-2018
 */
@Data
public class LdQuery {

	/**
     * 连续梁ID
     */
    private Long conbeamid;
	 /**
     * 梁段类型
     */
    private Integer type;
    /**
     * 大小里程区分标识
     */
    private Short mileageflag;
    /**
     * T构号
     */
    private Integer pier;
    /**
     * 直线段大小区分
     */
    private Short lineflag;
    
    public LdQuery() {
		super();
	}

	public LdQuery(Long conbeamid, Integer type) {
		super();
		this.conbeamid = conbeamid;
		this.type = type;
	}
}
