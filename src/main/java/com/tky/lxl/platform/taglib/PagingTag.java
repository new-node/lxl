package com.tky.lxl.platform.taglib;

import java.io.IOException;

import javax.servlet.http.HttpSession;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.SimpleTagSupport;

/*
 * 自定义分页标签
 */
public class PagingTag extends SimpleTagSupport {

	/**
	 * 当前页码（已知）
	 */
	private int pageNo = 1;
	
	/**
	 * 每页记录数（已知）
	 */
	private int pageSize = 20;
	
	/**
	 * 指定查询条件下 的记录数（已知）
	 */
	private int totalCount = 0;
	
	/**
	 * 指定查询下的总页数（未知）
	 */
	private int totalPage = 1;
	
	/**
	 * 开始行号（未知）
	 */
	private int startNum = 0;
	
	/**
	 * 未知
	 */
	private int endNum = 0;
	
	

	@Override
	public void doTag() throws JspException, IOException {
		PageContext pageContext = (PageContext) this.getJspContext();
		HttpSession session = pageContext.getSession();
		String basePath = (String)session.getAttribute("basePath");
		JspWriter out = this.getJspContext().getOut();
		out.write("<script type=\"text/javascript\">function navigatorPage(pageNo) {$('#pageNo').val(pageNo);$('#form1').submit();}</script>");
		
		out.write("<span>检索到 "+totalCount+" 条记录，显示第 "+(startNum+1)+" 条 -  第 "+(pageNo == totalPage ? totalCount : endNum - 1)+" 条</span>");
		
		//首页
		out.write("<div class='pull-right'><a onclick='javascript:navigatorPage(1);'><img src='"+basePath+"static/images/btnl1.gif' /></a>");
		out.write("&nbsp;<a onclick='javascript:navigatorPage(" + (pageNo - 1) + ");'>" + (pageNo > 1 ? "<img src='"+basePath+"static/images/btnl2.gif'  />" : " <img src='"+basePath+"static/images/btnl1.gif'  style='display: none'/>")+"</a>");
//		out.write("<input type='button' value='第一页'  onclick='javascript:navigatorPage(1);'" + (pageNo > 1 ? "" : " disabled='true'") + " />&nbsp;&nbsp;");
//		out.write("<input type='button' value='上一页' onclick='javascript:navigatorPage(" + (pageNo - 1) + ");'" + (pageNo > 1 ? "" : " disabled='true'") + " />&nbsp;&nbsp;");
		
		out.write("<span>&nbsp;第&nbsp;"+pageNo + "&nbsp;页&nbsp;/&nbsp;共&nbsp;" + totalPage + "&nbsp;页&nbsp;</span>");
		
		out.write("&nbsp;<a onclick='javascript:navigatorPage(" + (pageNo + 1) + ");'>" + (pageNo < totalPage ? "<img src='"+basePath+"static/images/btnr1.gif' />" : " <img src='"+basePath+"static/images/btnr1.gif' style='display: none'/>") +" </a>");
		out.write("&nbsp;<a onclick='javascript:navigatorPage(" + totalPage + ");' ><img src='"+basePath+"static/images/btnr2.png' /></a>");
//		out.write("<input type='button' value='下一页' onclick='javascript:navigatorPage(" + (pageNo + 1) + ");'" + (pageNo < totalPage ? "" : " disabled='true'") + " />&nbsp;&nbsp;");
//		out.write("<input type='button' value='最后页' onclick='javascript:navigatorPage(" + totalPage + ");'" + (pageNo < totalPage ? "" : " disabled='true'") + " />");
		out.write("</div>");
		out.write("<input type='hidden' id='pageNo' name='pageNo' value='" + pageNo + "'/>");
		
	}
	
	
	
	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	public int getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	
	public int getStartNum() {
		return startNum;
	}

	public void setStartNum(int startNum) {
		this.startNum = startNum;
	}

	public int getEndNum() {
		return endNum;
	}

	public void setEndNum(int endNum) {
		this.endNum = endNum;
	}
}
