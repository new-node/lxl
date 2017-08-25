package com.tky.lxl.platform.model.business;

import java.util.Date;

import lombok.Data;

/**
 * <p>Title:CorrectRecored </p>
 * <p>Description: 修正记录表Model</p>
 * <p>Company: 铁科院</p> 
 *
 * @author lihongcui（2017年3月10日 上午10:42:44）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Data
public class CorrectRecored {
    /**
     * 修正ID
     */
    private Long correctid;
    /**
     * 修正者
     */
    private String corrector;
    /**
     * 修正记录
     */
    private String record;
    /**
     * 修正原因
     */
    private String reason;
    /**
     * 修正类型
     */
    private Short correcttype;
    /**
     * 修正时间
     */
    private Date correcttime;
    /**
     * 梁段ID
     */
    private Long partid;
    
    /**
     * 里程类型：0：小里程 1：大里程
     */
    private short mileageflag;
}