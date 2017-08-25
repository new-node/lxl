package com.tky.lxl.platform.model.system;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 *  <p>Title: UserOperate</p>
 *  <p>Description: </p>
 *  <p>Company: 铁科院</p> 
 *
 *  @author sunjiashu（2017年4月17日  下午12:42:30）
 *
 *  @version:1.0.0  copyright  2017-2018
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class UserOperate extends BaseModel{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 用户登陆账号
	 */
	private String account;
	/**
	 * 登陆用户的名字
	 */
	private String name;
	/**
	 * 登陆的IP
	 */
	private String ip;
	/**
	 * 登陆的日期
	 */
//	private Date operatedate;
	/**
	 * 操作的内容
	 */
	private String content;
}
