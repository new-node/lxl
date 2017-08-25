package com.tky.lxl.platform.dao.business;

import java.util.List;

import com.tky.lxl.platform.model.business.UserLxl;

/**
 * 
 * <p>Title: UserLxlMapper</p>
 * <p>Description: 用户连续梁</p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年3月19日 上午9:45:39）
 *
 * @version:1.0.0 copyright  2017-2018
 */
public interface UserLxlMapper {
	
	/**
	 * 获取标段下的连续梁及授权信息
	 * 
	 * @return
	 */
	public List<UserLxl> selectUserLxlBySectionId(Long sectionId);
	
	/**
	 * 获取标段下的授权用户
	 * 
	 * @param sectionId
	 * @return
	 */
	public List<UserLxl> selectUserBySectionId(Long sectionId);

	/**
	 * 获取用户的授权连续梁信息
	 * 
	 * @param sectionId
	 * @return
	 */
	public List<UserLxl> selectGrantInfoByUser(String account);

	/**
	 * 连续梁授权
	 * 
	 * @return
	 */
	public int grantConBeamToUser(UserLxl userLxl);

	/**
	 * 取消连续梁授权
	 * 
	 * @return
	 */
	public int cancelGrant(UserLxl userLxl);
}