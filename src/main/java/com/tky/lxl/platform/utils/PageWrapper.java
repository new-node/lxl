package com.tky.lxl.platform.utils;

import java.util.List;


/**
 * 分页类<br/>
 * Copyright (c) 2014 , 北京可思云海科技有限公司<br/>
 * 2014-9-3 下午4:25:23
 * 
 * @author gyj@kscloud.com
 * @version V1.0
 */


public class PageWrapper<T> {

	/**
	 * 数据内容
	 */
	private List<T> content;
	/**
	 * 页码
	 */
	private int pageNumber;
	/**
	 * 每页条数
	 */
	private int pageSize;
	/**
	 * 总页数
	 */
	private int totalPage;
	/**
	 * 记录总条数
	 */
	private long totalSize;
	
	public PageWrapper(int pageNumber, int pageSize, long totalSize, int totalPage, List<T> content) {
		this.pageNumber = pageNumber;
		this.pageSize = pageSize;
		this.totalPage = totalPage;
		this.totalSize = totalSize;
		this.content = content;
	}

	public List<T> getContent() {
		return content;
	}

	public void setContent(List<T> content) {
		this.content = content;
	}

	public int getPageNumber() {
		return pageNumber + 1;
	}

	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	public long getTotalSize() {
		return totalSize;
	}

	public void setTotalSize(long totalSize) {
		this.totalSize = totalSize;
	}
	
	public long getTotal(){
		return this.getTotalSize();
	}
	
	/**
	 * 为了解决dataGrid表格的行格式
	  * @Title: getRows
	  * @return    
	  * @return List<T>    返回类型
	  * @throws
	 */
	public List<T> getRows(){
		return this.getContent();
	}
}
