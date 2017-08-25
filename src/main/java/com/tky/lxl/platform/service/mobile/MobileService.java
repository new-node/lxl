package com.tky.lxl.platform.service.mobile;

import java.util.List;
import java.util.Map;

import com.tky.lxl.platform.model.Page;
import com.tky.lxl.platform.model.mobile.QSLDInfo;

/**
 * <p>Title: WarnInfoService</p>
 * <p>Description: 偏差超限信息</p>
 * <p>Company: 铁科院</p> 
 * @author wk（2017年5月18日）
 *
 */
public interface MobileService {

	/**
	 * 获取偏差超限信息
	 * @param conbeamID
	 * @param page
	 * @return
	 */
	public Page getWarnInfoList(String conbeamID, Page page);
	
	/**
	 * 根据项目或者标段ID获取缺失梁段连续梁列表
	 * @param id
	 * @param type
	 * @return
	 */
	public List<QSLDInfo>  getqsldinfoByprojectidOrsectionId(Long id,Integer type,String conbeamid);

	/**
	 * 根据连续梁ID获取缺失梁段数据详情
	 * @param conbeamid
	 * @return
	 */
	public List<String>  getqsldinfoByconbeamid(String conbeamid);

	
	/**
	 * 根据连续梁ID获取项目ID
	 * @param conbeamId
	 * @return
	 */
	public Long getProjectIdByconbeamId(String conbeamId);

}
