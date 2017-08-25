package com.tky.lxl.platform.dao.system;

import java.util.List;

import com.tky.lxl.platform.model.system.SysResource;

/**
 * 
 * <p>Title:SysResourceMapper </p>
 * <p>Description: 用户资源Mapper</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年3月20日 下午6:51:54）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public interface SysResourceMapper {

	/**
	 * 根据用户ID获取资源信息
	 * @param userId
	 * @return
	 */
	List<SysResource> getResourceByUserId(Long userId);

}
