package com.tky.lxl.platform.dao.business;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.tky.lxl.platform.model.business.HomeCondition;
import com.tky.lxl.platform.model.business.LxlDetailCount;
import com.tky.lxl.platform.model.business.LxlMonitorStatusCount;
import com.tky.lxl.platform.model.business.LxlPianquCount;
import com.tky.lxl.platform.model.business.LxlProjectCount;
import com.tky.lxl.platform.model.business.LxlTotalCount;

/**
 * 
 * <p>Title:LxlCountMapper </p>
 * <p>Description: 连续梁信息统计</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年2月16日 上午10:52:58）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Repository("lxlCountMapper")
public interface LxlCountMapper {
    
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
	 * 根据片区统计连续梁监测状态,超限连续梁,超限梁段,梁段总数,测点总数,工作基点总数的信息
	 * @return
	 */
	public List<LxlPianquCount> selectLxlInfobyPianqu(Map<String,Object> m);
    
    /**
     * 根据项目统计连续梁监测状态,超限连续梁,超限梁段,梁段总数,测点总数,工作基点总数的信息
     * @return
     */
    public List<LxlPianquCount> selectLxlInfobyItem(Map<String,Object> m);
    
	/**
	 * 根据项目统计各标段连续梁监测状态,超限连续梁,超限梁段,梁段总数,测点总数,工作基点总数的信息
	 */
	public List<LxlProjectCount> selectLxlInfobyPro(Map<String,Object> m);
	
	/**
     * 各标超限数 超限连续梁梁段统计
     */
    public List<LxlProjectCount> selectCxlxlldBySection(Map<String,Object> m);
    
    /**
     * 超限处置进度 超限连续梁梁段信息统计
     * @return
     */
//    public List<LxlProjectCount> selectCxlxlldCount(WarnInfo condition);
    public LxlProjectCount selectCxlxlldCount(Map<String,Object> m );
    
	/**
	 * 桥梁首页 查询总梁段数
	 */
	public LxlProjectCount selectLdZCount(Long conbeamid);
	
	/**
	 * 桥梁首页 查询总测点数
	 */
	public LxlProjectCount selectCdZCount(Long conbeamid);
	
	/**
	 * 桥梁首页 查询偏差超限测点数
	 */
	public LxlProjectCount selectCdWarnCount(Long conbeamid);
	
}