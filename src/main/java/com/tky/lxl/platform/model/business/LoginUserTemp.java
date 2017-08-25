package com.tky.lxl.platform.model.business;

import java.math.BigDecimal;
import java.util.Date;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title: loginUserTemp</p>
 * <p>Description: 手机端用户认证表</p>
 * <p>Company: 铁科院</p> 
 *
 * @author yushanli（2017年4月8日 上午11:08:29）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Data
@EqualsAndHashCode(callSuper = false)

public class LoginUserTemp extends BaseModel {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 插入更新判断用
	 */
	private int count;
	/**
     * id
     */
    private Long id;
    /**
     * 用户账号
     */
    private String account;
    /**
     * 随机码
     */
    private String randomcode;
    /**
     * 更新时间
     */
    private Date updatetime;
    /**
     * 私钥
     */
    private String privatekey;
    /**
     * 公钥
     */
    private String publickey;
    /**
     * des加密密钥
     */
    private String deskey;
    /**
     * 用户id
     */
    private BigDecimal userinfoid;
    /**
     * 状态标识符
     */
    private Short useflag;
    /**
     * 创建时间
     */
    private Date createtime;
    /**
     * 设备id
     */
    private String deviceno;
}