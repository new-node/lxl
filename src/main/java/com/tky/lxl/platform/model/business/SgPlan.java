package com.tky.lxl.platform.model.business;

import java.math.BigDecimal;
import java.util.Date;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 
 * <p>Title:SgPlan </p>
 * <p>Description: 施工计划Model</p>
 * <p>Company: 铁科院</p> 
 *
 * @author lihongcui（2017年3月2日 下午3:27:15）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class SgPlan extends BaseModel {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
     * 结果条数，用来判断更新还是插入
     */
    private int count;
    /**
     * 计划Id
     */
    private BigDecimal id;
    /**
     * 构筑物Id
     */
    private BigDecimal buildid;
    /**
     * 状态 0未审核 1审核中 2通过
     */
    private Short state;
    /**
     * 开始日期
     */
    private Date startdate;
    /**
     * 完成日期
     */
    private Date finishdate;
    /**
     * 日历数据（json）(g)
     */
    private String calendars;
    /**
     * 项目日历UID (g)
     */
    private BigDecimal calendaruid;
    /**
     * 描述
     */
    private String describe;
    /**
     * 创建时间
     */
    private Date createdate;
    /**
     * 修改时间
     */
    private Date updatedate;
    /**
     * 创建人Id
     */
    private BigDecimal createuserid;
    /**
     * 修改人Id
     */
    private BigDecimal updateuserid;
    /**
     * 逻辑删除标识
     */
    private Short useflag;
    /**
     * 特殊结构Id
     */
    private BigDecimal specialstructureid;
    /**
     * 版本号
     */
    private BigDecimal versionno;
    /**
     * 版本变更原因
     */
    private String modifyreason;
    /**
     * 是否锁定
     */
    private Short islock;
    /**
     * 版本名
     */
    private String versionname;
    /**
     * 审核意见
     */
    private String verifycomment;
    /**
     * 审核人
     */
    private BigDecimal verifyid;
    /**
     * 架梁车通过日期
     */
    private Date passdate;
    /**
     * 铺轨开始日期
     */
    private Date laytrackbegindate;
    /**
     * 铺轨结束日期
     */
    private Date laytrackenddate;
    /**
     * 架梁车通过方向
     */
    private Short passdirection;
    /**
     * 铺轨方向
     */
    private Short laytrackdirection;
    /**
     * 计划类型
     */
    private Short plantype;
    /**
     * 标段ID,一个桥属于多个标段时用到
     */
    private BigDecimal sectionid;
}