package com.tky.lxl.platform.service.business;

import java.util.List;
import java.util.Map;

import com.tky.lxl.platform.model.business.LxlProjectCount;
import com.tky.lxl.platform.model.business.Sggs;
import com.tky.lxl.platform.model.business.SggsList;
import com.tky.lxl.platform.model.business.Sgjd;
import com.tky.lxl.platform.model.business.WarnPczInfo;

/**
 * <p>Title:HomeConBeamService </p>
 * <p>Description: 连续梁首页</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年3月13日 下午3:58:39）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public interface HomeConBeamService {

	/**
	 * 获取连续梁绘制的信息
	 * @param id
	 * @return
	 */
	public Map<String, Object> selectLxlMessage(Long id);

	/**
	 * 获取指定连续梁下的所有梁段
	 * @param conbeamID
	 * @return
	 */
	public List<WarnPczInfo> getLdInfo(String conbeamID);

	/**
	 * 获取此施工阶段的信息，天气，温度，气压
	 * @param stepid 施工阶段ID
	 * @return
	 */
	public Sgjd getSgjdInfo(String stepid);
	
	/**
	* 根据主键检索连续梁信息
	*/
	public SggsList showSggsInfo(Long conbeamid);

	/**
	* 更新施工告示牌信息以及连续梁信息
	*/
	public void saveOrUpdate(Sggs condition);

	/**
	* 查询梁段总数，测点总数，偏差超限数
	* @param condition
	* @return
	*/
	public LxlProjectCount selectLdCdWarnByLxl(Long conbeamid);
}
