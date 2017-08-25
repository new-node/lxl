package com.tky.lxl.platform.service.system;

import java.util.Set;

/**
 * <p>Title: SysResourceService</p>
 * <p>Description: 资源Service接口</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年3月20日 下午4:11:14）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public interface SysResourceService {

	/**
	 * 根据用户ID获取资源信息
	 * @param userId
	 * @return
	 */
	Set<String> getResourceByUserId(Long userId);
}
