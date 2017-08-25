package com.tky.lxl.platform.model.business;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title: ResultAuthInfo</p>
 * <p>Description: 登录用户授权信息</p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年3月10日 上午11:43:31）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class ResultAuthInfo extends BaseModel {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 用户ID
	 */
	private Long userId;
	/**
	 * Account信息
	 */
	private String account;
	/**
	 * 错误码
	 */
	private String errorCode;
	/**
	 * 日期
	 */
	private String date;
}
