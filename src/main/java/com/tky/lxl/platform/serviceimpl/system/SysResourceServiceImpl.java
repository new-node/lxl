package com.tky.lxl.platform.serviceimpl.system;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tky.lxl.platform.dao.system.SysResourceMapper;
import com.tky.lxl.platform.dao.system.SysRoleMapper;
import com.tky.lxl.platform.model.system.SysResource;
import com.tky.lxl.platform.service.system.SysResourceService;
import com.tky.lxl.platform.utils.CollectionUtils;

/**
 * <p>Title: SysResourceServiceImpl</p>
 * <p>Description: 资源Services实现</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年3月20日 下午4:11:41）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Service("sysResourceService")
public class SysResourceServiceImpl implements SysResourceService {

	@Resource
	private SysResourceMapper sysResourceMapper;
	@Resource
	private SysRoleMapper sysRoleMapper;
	
	@Override
	public Set<String> getResourceByUserId(Long userId) {
		
		//根据用户ID查资源
		List<SysResource> resources = sysResourceMapper.getResourceByUserId(userId);
		Set<String> permissions = new HashSet<String>(CollectionUtils.isNotEmpty(resources) ? resources.size() : 0);
		
		if (CollectionUtils.isNotEmpty(resources)) {
			for (SysResource resource : resources) {
				if(resource.getPermission()!=null && !"".equals(resource.getPermission())){
					permissions.add(resource.getPermission());
				}
			}
		}
		
		return permissions;
	}
}
