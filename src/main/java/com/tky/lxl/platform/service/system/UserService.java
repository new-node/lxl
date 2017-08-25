package com.tky.lxl.platform.service.system;

import com.tky.lxl.platform.model.business.Department;
import com.tky.lxl.platform.model.system.UserInfo;
import com.tky.lxl.platform.utils.ResultBean;

/**
 * <p>Title: UserService</p>
 * <p>Description: </p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年3月10日 下午1:10:53）
 *
 * @version:1.0.0 copyright  2017-2018
 */
public interface UserService {

	/**
	 * 验证用户
	 * 
	 * @return
	 */
	public ResultBean<UserInfo> validate(String account, String password);
	/**
	 * 验证用户
	 * 
	 * @return
	 */
	public ResultBean<UserInfo> validate(String sessionId);
	
	/**
	 * 获取部门
	 * 
	 * @param userId
	 * @return
	 */
	public Department getCurrentDep(Long userId);
}
