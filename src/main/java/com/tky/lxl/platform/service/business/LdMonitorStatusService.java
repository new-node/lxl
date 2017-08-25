package com.tky.lxl.platform.service.business;

/**
 * 
 * <p>Title:LdMonitorStatusService </p>
 * <p>Description: 连续梁 梁段的监测状态 Service</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年8月16日 上午10:33:18）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public interface LdMonitorStatusService {

	/**
	 * 新增或更新连续梁梁段的监测状态
	 * @param partidListJson
	 * @return
	 */
	Boolean upLdMonitorStatus(String partidListJson);

}
