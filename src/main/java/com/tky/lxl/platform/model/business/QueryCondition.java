package com.tky.lxl.platform.model.business;

/**
 * <p>Title:QueryCondition </p>
 * <p>Description: 分页查询条件</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年3月28日 下午8:05:25）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public class QueryCondition {
	
	/**
	 * 数据分页开始位置
	 */
	private Integer startNum;
	/**
	 * 数据分页结束位置
	 */
	private Integer endNum;
	/**
	 * 页码
	 */
	private Integer pageNo;
	/**
	 * 
	 */
	private String name;

	public Integer getPageNo() {
		return pageNo;
	}

	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}

	public Integer getStartNum() {
		return startNum;
	}

	public void setStartNum(Integer startNum) {
		this.startNum = startNum;
	}

	public Integer getEndNum() {
		return endNum;
	}

	public void setEndNum(Integer endNum) {
		this.endNum = endNum;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	

}
