package com.tky.lxl.platform.service.business;

import java.util.List;
import java.util.Map;

import com.tky.lxl.platform.model.business.HomeCondition;
import com.tky.lxl.platform.model.business.LxlDetailCount;
import com.tky.lxl.platform.model.business.LxlMonitorStatusCount;
import com.tky.lxl.platform.model.business.LxlPianquCount;
import com.tky.lxl.platform.model.business.LxlProjectCount;
import com.tky.lxl.platform.model.business.LxlTotalCount;
import com.tky.lxl.platform.utils.ResultBean;

/**
 * <p>Title: LxlCountService</p>
 * <p>Description: 连续梁统计信息</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年2月16日 上午10:59:36）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public interface LxlCountService {

	/**
	 * 连续梁监控状态统计
	 * @return
	 */
	public LxlMonitorStatusCount selectLxlMonitorStatusCount(HomeCondition condition);

	/**
	 * 查询主跨跨度小于60的数据
	 * @return
	 */
	public LxlDetailCount select60Count(Map<String,Object> m);

	/**
	 * 查询主跨跨度大于等于60小于80的数据
	 * @return
	 */
	public LxlDetailCount select80Count(Map<String,Object> m);

	/**
	 * 查询主跨跨度大于等于80小于100的数据
	 * @return
	 */
	public LxlDetailCount select100Count(Map<String,Object> m);

	/**
	 * 查询主跨跨度大于等于100小于120的数据
	 * @return
	 */
	public LxlDetailCount select120Count(Map<String,Object> m);

	/**
	 * 查询主跨跨度大于120的数据
	 * @return
	 */
	public LxlDetailCount selectElseCount(Map<String,Object> m);

	/**
	 * 查询连续梁主跨跨度的整体统计
	 * @return
	 */
	public LxlTotalCount selectLxlTotalCount(Map<String,Object> m);
	
	/**
	 * 根据片区综合统计
	 * @return
	 */
	public List<LxlPianquCount> selectPianquInfo(Map<String,Object> m);
	
	/**
	 * 按项目综合统计
	 */
	public List<LxlPianquCount> selectItemInfo(Map<String,Object> m);
	
	/**
	 * 按标段综合统计
	 */
	public List<LxlProjectCount> selectBiaoDuanInfo(Map<String,Object> m);
	
	/**
	 * 各标超限数 超限连续梁,超限梁段统计
	 * @param 连续梁bean
	 * @return
	 */
	public ResultBean<List<LxlProjectCount>> selectWarnInfo(Map<String,Object> m);
	
	/**
	 * 超限处置进度 超限连续梁梁段已处置信息统计
	 * @param 连续梁bean
	 * @return
	 */
	public ResultBean<LxlProjectCount> selectCxlxlldCount(Map<String,Object> m);
}
