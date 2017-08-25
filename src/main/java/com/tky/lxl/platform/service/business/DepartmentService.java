package com.tky.lxl.platform.service.business;

import java.util.List;

import com.tky.lxl.platform.model.business.Department;
import com.tky.lxl.platform.model.system.UserInfo;

/**
 *  <p>Title: DepartmentService</p>
 *  <p>Description: 部门</p>
 *  <p>Company: 铁科院</p> 
 *
 *  @author sunjiashu（2017年4月17日  下午12:43:56）
 *
 *  @version:1.0.0  copyright  2017-2018
 */
public interface DepartmentService {
	/**
	 * 通过主键获取部门表的数据
	 * 
	 * @param 部门表主键
	 * @return 一条部门表数据
	 */
	public Department selectDepartmentByID(Integer id);

	/**
	 * 根据用户列表取得部门列表
	 * 
	 * @param userInfoList - 用户信息列表
	 * @return
	 */
	public List<Department> getDepartmentByUserInfoList(List<UserInfo> userInfoList);
}
