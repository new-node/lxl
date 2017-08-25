package com.tky.lxl.platform.model.business;

/**
 * 
 * <p>Title:WarnLdCount </p>
 * <p>Description: 统计某连续梁的超限梁段数量</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年8月7日 下午2:18:52）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public class WarnLdCount {
	
	/**
	 * 连续梁ID
	 */
	private String conbeamid;
	
	/**
	 * 超限梁段未处置数量
	 */
	private Integer warnldcountnodeal;
	
	/**
	 * 超限梁段处置中
	 */
	private Integer warnldcountdeal;

	/**
	 * 超限梁段已处置
	 */
	private Integer warnldcountyesdeal;

	public String getConbeamid() {
		return conbeamid;
	}

	public void setConbeamid(String conbeamid) {
		this.conbeamid = conbeamid;
	}

	public Integer getWarnldcountnodeal() {
		return warnldcountnodeal;
	}

	public void setWarnldcountnodeal(Integer warnldcountnodeal) {
		this.warnldcountnodeal = warnldcountnodeal;
	}

	public Integer getWarnldcountdeal() {
		return warnldcountdeal;
	}

	public void setWarnldcountdeal(Integer warnldcountdeal) {
		this.warnldcountdeal = warnldcountdeal;
	}

	public Integer getWarnldcountyesdeal() {
		return warnldcountyesdeal;
	}

	public void setWarnldcountyesdeal(Integer warnldcountyesdeal) {
		this.warnldcountyesdeal = warnldcountyesdeal;
	}
	
	
}
