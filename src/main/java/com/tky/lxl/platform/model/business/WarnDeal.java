package com.tky.lxl.platform.model.business;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;
/**
 * <p>Title:WarnDeal </p>
 * <p>Description: 获取偏差处置信息</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年3月9日 下午1:52:37）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class WarnDeal extends BaseModel{
	private static final long serialVersionUID = 1L;
	/**
	 * 
	 */
    private String warndealid;
    /**
     * 
     */
    private String dealuserid;
    /**
     * 
     */
    private String dealcs;
    /**
     * 
     */
    private String dealtime;
    /**
     * 
     */
    private String remark;
    /**
     * 
     */
    private String useflag;
    /**
     * 
     */
    private String createtime;
    /**
     * 
     */
    private String warnid;
    /**
     * 
     */
    private String phone;
    /**
     * 
     */
    private String gkbm;
    /**
     * 
     */
    private String ldcode;
    /**
     * 
     */
    private String lxlid;
    /**
     * 
     */
    private String accountname;
    
    private String isColse;
}