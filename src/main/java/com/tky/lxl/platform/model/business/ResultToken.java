package com.tky.lxl.platform.model.business;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title: ResultToken</p>
 * <p>Description: Token结果</p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年3月10日 上午11:34:42）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class ResultToken extends BaseModel {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * Token值
	 */
	private String token;
	/**
	 * 过期时间
	 */
	private Integer expireTime;
	/**
	 * 错误码
	 */
	private String errorCode;
	/**
	 * 错误信息
	 */
	private String errorMsg;
}
