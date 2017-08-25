package com.tky.lxl.platform.serviceimpl.business;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tky.lxl.platform.dao.business.ProjectSectionMapper;
import com.tky.lxl.platform.dao.system.SysUserRoleMapper;
import com.tky.lxl.platform.finals.Const;
import com.tky.lxl.platform.model.business.Department;
import com.tky.lxl.platform.model.system.SysUserRole;
import com.tky.lxl.platform.model.system.UserInfo;
import com.tky.lxl.platform.service.business.DepartmentService;
import com.tky.lxl.platform.service.business.MngrRoleGrantService;
import com.tky.lxl.platform.utils.BaseJSON;
import com.tky.lxl.platform.utils.ResultBean;
import com.tky.lxl.platform.utils.ServiceApiUtil;

/**
 * <p>Title: MngrRoleGrantServiceImpl</p>
 * <p>Description: 管理员 角色授权</p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年3月15日 上午9:26:55）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Service
@Transactional
public class MngrRoleGrantServiceImpl implements MngrRoleGrantService {

	@Resource
	private SysUserRoleMapper sysUserRoleMapper;
	@Resource
	private ProjectSectionMapper sectionMapper;
	@Resource
	private DepartmentService departmentService;

	/*
	 * 中心级管理员 建指管理员
	 *   查询所有用户
	 */
	@Override
	public ResultBean<List<UserInfo>> getUserByDepartmentId(Long departmentId) {

		// 根据部门ID获取所有的人员信息
		List<UserInfo> userInfoList = ServiceApiUtil.getAllUsersByDeptId(departmentId);

		// 部门一览
		List<Department> deptList = departmentService.getDepartmentByUserInfoList(userInfoList);

		List<UserInfo> userInfoListResult = new ArrayList<UserInfo>();
		
		// 设置各用户信息
		for (UserInfo userInfo : userInfoList) {

			// 普通用户
			if (Const.UserType.NORMAL == userInfo.getUsertype() || userInfo.getUsertype() == 0) {
				
				// 取得部门名称
				for (Department dept : deptList) {
					
					if (dept.getId() == userInfo.getDepartmentid()) {

						userInfo.setDepartmentName(dept.getName());
						break;
					}
				}
				
				userInfoListResult.add(userInfo);
			}
		}
		
		return new ResultBean<List<UserInfo>>(ResultBean.OK, "OK", userInfoListResult);
	}

	/* 
	 * 标段管理员
	 *   查询所有用户
	 */
	@Override
	public ResultBean<List<UserInfo>> getUserBySectionId(Long sectionId) {
		
		// 调用服务接口,获取标段下的所有用户信息
		List<UserInfo> userInfoList = ServiceApiUtil.getUserInfoList(sectionId);

		// 部门一览
		List<Department> deptList = departmentService.getDepartmentByUserInfoList(userInfoList);

		List<UserInfo> userInfoListResult = new ArrayList<UserInfo>();
		
		// 设置各用户信息
		for (UserInfo userInfo : userInfoList) {

			// 普通用户
			if (Const.UserType.NORMAL == userInfo.getUsertype()) {
				
				// 取得部门名称
				for (Department dept : deptList) {
					
					if (dept.getId() == userInfo.getDepartmentid()) {

						userInfo.setDepartmentName(dept.getName());
						break;
					}
				}
				
				userInfoListResult.add(userInfo);
			}
		}
		
		return new ResultBean<List<UserInfo>>(ResultBean.OK, "OK", userInfoListResult);
	}

	/* 
	 * 获取用户的角色授权信息
	 */
	@Override
	public ResultBean<List<SysUserRole>> getRoleByAccount(UserInfo userInfo, String managerLoginType) {
		
		int roleLevel = -1;
		// 中心级管理员
		if (Const.UserLoginType.CENTER_MANAGER.equals(managerLoginType)) {
			
			// 中心级
			roleLevel = Const.RoleLevel.CENTER;
		}
		// 建设单位管理员
		else if (Const.UserLoginType.HEADQUARTER_MANAGER.equals(managerLoginType)) {

			// 建设单位级
			roleLevel = Const.RoleLevel.CONSTRUCTION;
		}
		// 建指管理员
		else if (Const.UserLoginType.HEADQUARTER_MANAGER.equals(managerLoginType)) {

			// 指挥部级
			roleLevel = Const.RoleLevel.HEADQUARTER;
		}
		// 标段管理员
		else if (Const.UserLoginType.SECTION_MANAGER.equals(managerLoginType)) {

			// 标段级
			roleLevel = Const.RoleLevel.SECTION;
		}

		String account = userInfo.getAccount();
		
		// 标段级
		List<SysUserRole> roleList = sysUserRoleMapper.selectRoleByAccount(account, roleLevel);

		return new ResultBean<List<SysUserRole>>(ResultBean.OK, "OK", roleList);
	}

	/* 
	 * 保存用户角色
	 */
	@Override
	public ResultBean<String> saveUserRole(String jsonUserRoleList, Long sectionManagerId) {
		
		// 
		List<SysUserRole> userRoleList = BaseJSON.parseArray(jsonUserRoleList, SysUserRole.class);
		
		// 
		if (userRoleList.size() == 0) {

			// 
			return new ResultBean<String>(ResultBean.OK, "OK", "未选择用户");
		}
		
		// 用户名相同,只取第一个元素
		SysUserRole userRole = userRoleList.get(0);
		
		userRole.setUpdateUserId(sectionManagerId);

		// 取消用户的所有角色授权
		sysUserRoleMapper.cancelUserAllRole(userRole);
		
		// 保存用户的已授权角色和未授权角色
		for (SysUserRole bean : userRoleList) {

			// 标段管理员ID
			bean.setUpdateUserId(sectionManagerId);
			sysUserRoleMapper.saveUserRole(bean);
		}
		
		// 
		return new ResultBean<String>(ResultBean.OK, "OK", "角色授权");
	}
}
