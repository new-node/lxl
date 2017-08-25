package com.tky.lxl.platform.model.business;

import lombok.Data;

/**
 * 
 * <p>Title:PierQuery </p>
 * <p>Description: 墩信息的查询条件</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年3月14日 下午4:45:04）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Data
public class PierQuery {

	/**
	 * 
	 */
	private int tsid;
	/**
	 * 
	 */
	private String piername;
	
	public PierQuery() {
		super();
	}

	public PierQuery(int tsid, String piername) {
		super();
		this.tsid = tsid;
		this.piername = piername;
	}
	
	
}
