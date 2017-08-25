package com.tky.lxl.platform.service.business;

import java.util.List;

import com.tky.lxl.platform.model.business.UserLxl;
import com.tky.lxl.platform.utils.ResultBean;

/**
 * <p>Title: SmConBeamGrantService</p>
 * <p>Description: 标段管理员 连续梁授权</p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年3月17日 下午3:49:05）
 *
 * @version:1.0.0 copyright  2017-2018
 */
public interface MngrConBeamGrantService {

	/**
	 * 查询标段的所有用户
	 * 
	 * @param sectionId - 标段ID
	 * @return
	 */
	public ResultBean<List<UserLxl>> getUserBySectionId(Long sectionId);

	/**
	 * 查询标段的所有连续梁
	 * 
	 * @param sectionId - 标段ID
	 * @return
	 */
	public ResultBean<List<UserLxl>> getConBeamBySectionId(Long sectionId);

	/**
	 * 获取用户的授权连续梁信息
	 * 
	 * @param account - 用户登陆名
	 * @return
	 */
	public ResultBean<List<UserLxl>> getGrantInfoByUser(String account);

	/**
	 * 连续梁授权
	 * 
	 * @param sectionId - 标段ID
	 * @return
	 */
	public ResultBean<String> grantConBeamToUser(String jsonUserLxlList);
	
	/**
	 * 同步连续梁
	 * 
	 * @param sectionId - 标段ID
	 * @return
	 */
	public ResultBean<String> syncConBeam(Long sectionId);
}
