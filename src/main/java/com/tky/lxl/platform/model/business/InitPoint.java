package com.tky.lxl.platform.model.business;

import java.util.Date;

import lombok.Data;
import lombok.EqualsAndHashCode;
/**
 * 
 * <p>Title:InitPoint </p>
 * <p>Description: 初始化测点ID model</p>
 * <p>Company: 铁科院</p> 
 *
 * @author lihongcui（2017年4月12日 下午5:32:54）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class InitPoint {
    /**
     * 初始化测点ID
     */
    private Long initpointid;
    /**
     * 连续梁ID
     */
    private Long conbeamid;
    /**
     * T构ID
     */
    private Long pier;
    /**
     * 梁段ID
     */
    private Long partid;
    /**
     * 创建时间
     */
    private Date createtime;
    /**
     * 删除标识
     * 0：在用
     * 1：删除
     */
    private Short useflag;
    /**
     * 梁段类型
     * 1：临时测量点
     * 2：测量桩
     */
    private Short ldtype;
    /**
     * 大小里程区分
     * 0：小里程
     * 1：大里程
     */
    private Short mileageflag;
    /**
     * 项目ID
     */
    private Long projectid;
    /**
     * 标段ID
     */
    private Long sectionid;
    /**
     * 工点ID
     */
    private Long siteid;
    /**
     * 测点名称
     */
    private String pointname;
    /**
     * 测点位置号
     */
    private Short pointplace;
    /**
     * 测点类型
     */
    private Short pointtype;
    
    /**
     * 梁段简称
     */
    private String shortname;
    
    /**
     * 更新时间
     */
    private Date updatetime;
    
    public InitPoint(Long conbeamid, Long pier, Long partid, Short ldtype, Long projectid, Long sectionid,
			Long siteid) {
		super();
		this.conbeamid = conbeamid;
		this.pier = pier;
		this.partid = partid;
		this.ldtype = ldtype;
		this.projectid = projectid;
		this.sectionid = sectionid;
		this.siteid = siteid;
	}

	public InitPoint() {
		super();
	}
}