package com.tky.lxl.platform.dao.business;

import com.tky.lxl.platform.model.business.Sgjd;
/**
 * 
 * <p>Title:SgjdMapper </p>
 * <p>Description: 施工阶段</p>
 * <p>Company: 铁科院</p> 
 *
 * @author yushanli（2017年4月1日 上午9:53:11）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public interface SgjdMapper {

	/**
	 * 获取施工状况，天气，温度，气压
	 * @param stepid 施工阶段ID
	 * @return
	 */
	Sgjd selectByPrimaryKey(String stepid);

}