package com.tky.lxl.platform.service.business;

/**
 * 
 * <p>Title:TaskUpWarnCloseStatusService </p>
 * <p>Description: 定时任务 定时更新连续梁 处置中的梁段是否可以关闭</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年8月16日 下午4:33:49）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public interface TaskUpWarnCloseStatusService {

	/**
	 * 同步连续梁 超限处置中的 梁段是否可以关闭
	 */
	void syncWarnCloseStatus();

}
