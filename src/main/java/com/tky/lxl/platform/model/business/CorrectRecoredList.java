package com.tky.lxl.platform.model.business;

import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>CorrectRecoredList </p>
 * <p>Description: 修正记录表ListModel</p>
 * <p>Company: 铁科院</p> 
 *
 * @author lihongcui（2017年3月10日 上午10:42:44）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class CorrectRecoredList {

    /**
     *  履历list
     */
    private List<CorrectRecored> recordList;
    /**
     *  基准点所属项目
     */
    private String proinfoName;
    /**
     *  基准点所属标段
     */
    private String prosectionName;
    /**
     *  基准点所属连续梁
     */
    private String lxlName;
}