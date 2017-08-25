package com.tky.lxl.platform.model.business;

import java.util.Date;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 *  <p>Title: ViewLxl</p>
 *  <p>Description: </p>
 *  <p>Company: 铁科院</p> 
 *
 *  @author sunjiashu（2017年4月17日  下午12:02:37）
 *
 *  @version:1.0.0  copyright  2017-2018
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class ViewLxl extends BaseModel {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 工点ID
	 */
    private Long gdid;
    /**
     * 连续梁名称
     */
    private String conbeamname;
    /**
     * 桥梁跨度
     */
    private Float qlkd;
    /**
     * 桥梁主跨跨度
     */
    private Float mainkdlength;
    /**
     * 桥跨组合
     */
    private String beamaspan;
    /**
     * 创建时间
     */
    private Date createtime;
    /**
     * 工点ID
     */
    private Long siteid;
    /**
     * 工点名称
     */
    private String sitename;
    /**
     * 标段ID
     */
    private Long projectsectionid;
    /**
     * 标段名称
     */
    private String secname;
    /**
     * 项目ID
     */
    private Long projectinfoid;
    /**
     * 项目名称
     */
    private String proname;
    /**
     * 片区ID
     */
    private Long pianquid;
    /**
     * 片区名称
     */
    private String pianquname;
    /**
     * 
     */
    private Long projectareaid;
    /**
     * 
     */
    private String areaname;
    /**
     * 梁段总数
     */
    private Long ldcount;
    /**
     * 测点总数
     */
    private Long cdcount;
    /**
     * 超限梁段总数
     */
    private Long warnldcount;
    /**
     * 未处置超限梁段总数
     */
    private Long warnldcountnodeal;
    /**
     * 当前施工阶段ID
     */
    private Long currentsgjd;
    /**
     * 当前施工阶段描述
     */
    private String currentsgjdmc;
    /**
     * 状态
     *   0-未监控
     *   1-刚开始监控
     *   2-监控中
     *   3-待合龙
     *   4-已合龙
     */
    private Integer status;
    /**
     * 应测控制点总数
     */
    private Long kzdcount;
    /**
     * 已测控制点总数 
     */
    private Long kzdcountok;
}