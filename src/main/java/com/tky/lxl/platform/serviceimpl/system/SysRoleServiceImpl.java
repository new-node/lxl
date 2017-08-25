package com.tky.lxl.platform.serviceimpl.system;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tky.lxl.platform.dao.system.SysRoleMapper;
import com.tky.lxl.platform.model.system.SysRole;
import com.tky.lxl.platform.service.system.SysRoleService;
import com.tky.lxl.platform.utils.CollectionUtils;

/**
 * <p>Title: SysRoleServiceImpl</p>
 * <p>Description: 角色Service实现</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年3月20日 下午4:12:10）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Service("sysRoleService")
public class SysRoleServiceImpl implements SysRoleService {

	@Resource
	private SysRoleMapper sysRoleMapper;
	
	@Override
	public Set<String> getRolesByUserId(Long userId) {
		List<SysRole> roles = sysRoleMapper.getRolesByUserId(userId);

		Set<String> roleSet = new HashSet<String>(CollectionUtils.isEmpty(roles) ? 0 : roles.size());
		if (CollectionUtils.isNotEmpty(roles)) {
			for (SysRole role : roles) {
				roleSet.add(role.getRoleName());
			}
		}
		return roleSet;
	}
}
