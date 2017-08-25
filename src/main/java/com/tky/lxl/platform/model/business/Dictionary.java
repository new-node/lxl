package com.tky.lxl.platform.model.business;

import java.math.BigDecimal;
import java.util.Date;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title:DICTIONARY </p>
 * <p>Description: 字典Model</p>
 * <p>Company: 铁科院</p> 
 *
 * @author lihongcui（2017年3月3日 下午5:08:38）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class Dictionary extends BaseModel{
    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    /**
     *  自增序列号
     */
    private Long no;

    /**
     * 类别ID
     */
    private BigDecimal typeid;

    /**
     * 字典ID
     */
    private String id;

    /**
     * 名称
     */
    private String name;

    /**
     * 删除标识
     */
    private Short useflag;

    /**
     * 更新时间
     */
    private Date updatedate;

}