package com.tky.lxl.platform.model.business;

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
public class SggsList {

    /**
     *  施工告示牌list
     */
    private Sggs sggsList;
    /**
     *  基准点所属项目
     */
    private String proName;
    /**
     *  基准点所属标段
     */
    private String sectionName;
    /**
     *  基准点所属连续梁
     */
    private String lxlName;
}