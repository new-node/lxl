package com.tky.lxl.platform.serviceimpl.business;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tky.lxl.platform.dao.business.DepartmentMapper;
import com.tky.lxl.platform.model.business.Department;
import com.tky.lxl.platform.model.system.UserInfo;
import com.tky.lxl.platform.service.business.DepartmentService;

/**
 *  <p>Title: DepartmentServiceImpl</p>
 *  <p>Description: 部门</p>
 *  <p>Company: 铁科院</p> 
 *
 *  @author sunjiashu（2017年4月17日  下午12:48:40）
 *
 *  @version:1.0.0  copyright  2017-2018
 */
@Service("departmentService")
public class DepartmentServiceImpl implements DepartmentService {

	@Resource
	private DepartmentMapper departmentMapper;

	@Override
	public Department selectDepartmentByID(Integer id) {
		return departmentMapper.selectDepartmentByID(id);
	}

	/**
	 * 根据用户列表取得部门列表
	 */
	@Override
	public List<Department> getDepartmentByUserInfoList(List<UserInfo> userInfoList) {

		// 部门列表
		List<Department> deptList = null;
		
		if (userInfoList == null || userInfoList.size() == 0) {
			return deptList;
		}
		
		// 部门ID一览
		StringBuilder sbDeptId = new StringBuilder("");
		for (UserInfo userInfo : userInfoList) {

			// 部门ID
			Integer deptId = userInfo.getDepartmentid();
			
			if (deptId != null) {
				sbDeptId.append(",").append(deptId);
			}
		}
		String deptIdList = sbDeptId.toString();
		
		// 去除开始的逗号
		if (deptIdList.length() > 0) {
			deptIdList = deptIdList.substring(1);
			Map<String,Object> m=new HashMap<String,Object>();
			m.put("departs", deptIdList.split(","));
			deptList = departmentMapper.selectDepartmentByIdList(m);
		}
		
		return deptList;
	}
}
