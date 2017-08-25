package com.tky.lxl.platform.service.system;

import com.tky.lxl.platform.model.system.UserOperate;

/**
 * <p>Title: UserOperateLogService</p>
 * <p>Description: 用户操作记录的service接口</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年2月28日 下午4:03:48）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public interface UserOperateLogService {

	/**
	 * 将用户的操作信息记录到数据库
	 * @param userOperate
	 */
	public void add(UserOperate userOperate);
}
