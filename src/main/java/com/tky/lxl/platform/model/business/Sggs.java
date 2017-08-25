package com.tky.lxl.platform.model.business;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title: Sggs</p>
 * <p>Description: 施工告示牌</p>
 * <p>Company: 铁科院</p> 
 *
 * @author lihongcui（2017年3月20日 下午6:18:35）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class Sggs {
    
    /**
     * 件数统计
     */
    private Integer count;
    /**
     * 梁段ID
     */
    private Long conbeamid;
    /**
     * 所属工区
     */
    private String industrial;
    /**
     * 跨度
     */
    private BigDecimal mainkdlength;
    /**
     * 桥跨组合
     */
    private String beamaspan;
    /**
     * 所在里程
     */
    private String centermile;
    /**
     * 施工开始日期
     */
    private Date startdate;
    /**
     * 施工截止日期
     */
    private Date enddate;
    /**
     * 施工监测单位
     */
    private String planjcunit;
    /**
     * 设计单位
     */
    private String designunit;
}