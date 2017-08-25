package com.tky.lxl.platform.dao.business;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.tky.lxl.platform.model.business.Department;

/**
 * 
 * <p>Title:DepartmentMapper </p>
 * <p>Description: 部门DAO</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年3月3日 上午10:26:12）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Repository("departmentMapper")
public interface DepartmentMapper {

	/**
	 * 根据部门ID获取部门表数据
	 * @param id 部门ID
	 * @return
	 */
	public Department selectDepartmentByID(Integer id);
	
	/**
	 * 根据部门ID一览获取部门
	 * 
	 * @param idList
	 * @return
	 */
	public List<Department> selectDepartmentByIdList(Map<String,Object> m);

}
