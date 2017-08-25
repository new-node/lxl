package com.tky.lxl.platform.service.business;

import java.util.List;

import com.tky.lxl.platform.model.business.Department;
import com.tky.lxl.platform.model.business.Node;
import com.tky.lxl.platform.model.system.SysResRole;
import com.tky.lxl.platform.model.system.UserInfo;
import com.tky.lxl.platform.utils.ResultBean;

/**
 * <p>Title: OrgTreeService </p>
 * <p>Description: </p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年3月10日 上午11:13:22）
 *
 * @version:1.0.0 copyright  2017-2018
 */
public interface OrgTreeService {

	/**
	 * 获取组织结构树
	 * 
	 * @param dept - 部门
	 * 
	 * @return
	 */
	public ResultBean<List<Node>> getTree(UserInfo userInfo, Department dept);
	
	/**
	 * 获取资源角色
	 * 
	 * @param userInfo
	 * @return
	 */
	public ResultBean<List<SysResRole>> getResourceRole(UserInfo userInfo);
}
