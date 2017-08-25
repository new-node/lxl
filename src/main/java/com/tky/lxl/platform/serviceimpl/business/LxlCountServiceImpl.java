package com.tky.lxl.platform.serviceimpl.business;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tky.lxl.platform.dao.business.LxlCountMapper;
import com.tky.lxl.platform.emun.ResultCodeTypeEunm;
import com.tky.lxl.platform.model.business.HomeCondition;
import com.tky.lxl.platform.model.business.LxlDetailCount;
import com.tky.lxl.platform.model.business.LxlMonitorStatusCount;
import com.tky.lxl.platform.model.business.LxlPianquCount;
import com.tky.lxl.platform.model.business.LxlProjectCount;
import com.tky.lxl.platform.model.business.LxlTotalCount;
import com.tky.lxl.platform.service.business.LxlCountService;
import com.tky.lxl.platform.utils.ResultBean;

/**
 * <p>Title: LxlCountServiceImpl</p>
 * <p>Description: 连续梁统计信息</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年2月16日 上午10:58:56）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Service("lxlCountService")
public class LxlCountServiceImpl implements LxlCountService{

	@Resource
	private LxlCountMapper lxlCountMapper;
	
	/**
	 * 连续梁监测状态统计
	 */
	@Override
//	@Cacheable(value="lxl",key="#condition.cacheKey")
	public LxlMonitorStatusCount selectLxlMonitorStatusCount(HomeCondition condition) {
		return lxlCountMapper.selectLxlMonitorStatusCount(condition);
	}

	/**
	 * 查询主跨跨度小于60监测数据
	 */
	@Override
//	@Cacheable(value="lxl",key="#condition.cacheKey")
	public LxlDetailCount select60Count(Map<String,Object> m) {
		return lxlCountMapper.select60Count(m);
	}

	/**
	 * 查询主跨跨度小于80大于60监测数据
	 */
	@Override
//	@Cacheable(value="lxl",key="#condition.cacheKey")
	public LxlDetailCount select80Count(Map<String,Object> m) {
		return lxlCountMapper.select80Count(m);
	}

	/**
	 * 查询主跨跨度小于100大于80监测数据
	 */
	@Override
//	@Cacheable(value="lxl",key="#condition.cacheKey")
	public LxlDetailCount select100Count(Map<String,Object> m) {
		return lxlCountMapper.select100Count(m);
	}

	/**
	 * 查询主跨跨度小于120大于100监测数据
	 */
	@Override
//	@Cacheable(value="lxl",key="#condition.cacheKey")
	public LxlDetailCount select120Count(Map<String,Object> m) {
		return lxlCountMapper.select120Count(m);
	}

	/**
	 * 查询主跨跨度大于120监测数据
	 */
	@Override
//	@Cacheable(value="lxl",key="#condition.cacheKey")
	public LxlDetailCount selectElseCount(Map<String,Object> m) {
		return lxlCountMapper.selectElseCount(m);
	}

	/**
	 * 连续梁主跨度总体统计
	 */
	@Override
//	@Cacheable(value="lxl",key="#condition.cacheKey")
	public LxlTotalCount selectLxlTotalCount(Map<String,Object> m) {
		return lxlCountMapper.selectLxlTotalCount(m) ;
	}
	
	/**
	 * 各标超限数 超限连续梁，超限梁段统计
	 * @param 偏差超限bean
	 * @return
	 */
	@Override
	public ResultBean<List<LxlProjectCount>> selectWarnInfo(Map<String,Object> m) {
		ResultBean<List<LxlProjectCount>> resultBean;
		//超限连续梁梁段统计
		List<LxlProjectCount> lxlItem = null;
		try {
			lxlItem = lxlCountMapper.selectCxlxlldBySection(m);
			if(lxlItem.size()>0)
				resultBean = new ResultBean<List<LxlProjectCount>> (ResultCodeTypeEunm.scuss.getKey(),ResultCodeTypeEunm.scuss.getValue(),lxlItem);
			else
				resultBean = new ResultBean<List<LxlProjectCount>> (ResultCodeTypeEunm.scussButNull.getKey(),ResultCodeTypeEunm.scussButNull.getValue(),lxlItem);
				
		} catch (Exception e) {
			resultBean = new ResultBean<List<LxlProjectCount>> (ResultCodeTypeEunm.exception.getKey(),ResultCodeTypeEunm.exception.getValue(),lxlItem);
			e.printStackTrace();
		}
		return resultBean;
		
	}

	
	/**
	 * 超限处置进度 超限连续梁信息统计
	 * @param 偏差超限bean
	 */
	@Override
	public ResultBean<LxlProjectCount> selectCxlxlldCount(Map<String,Object> m ) {
		ResultBean<LxlProjectCount> resultBean;
		LxlProjectCount lxlProjectCount = null;
		try {
			lxlProjectCount = lxlCountMapper.selectCxlxlldCount(m);
			if(lxlProjectCount != null){
				int ldcount = 0;
				int ldcountdeal = 0;
				int ldcountnodeal = 0;
				int lxlcount = 0;
				int lxlcountdeal = 0;
				int lxlcountnodeal = 0;
				//梁段总数
				if(lxlProjectCount.getWarnldcount() != null){
					ldcount = lxlProjectCount.getWarnldcount();
				}
				
				//梁段处置中的数量
				if(lxlProjectCount.getWarnldcountdeal() != null){
					ldcountdeal = lxlProjectCount.getWarnldcountdeal();
				}
				
				//梁段未处置的数量
				if(lxlProjectCount.getWarnldcountnodeal() != null){
					ldcountnodeal = lxlProjectCount.getWarnldcountnodeal();
				}
				
				//连续梁总数
				if(lxlProjectCount.getWarnlxlcount() != null){
					lxlcount = lxlProjectCount.getWarnlxlcount();
				}
				
				//连续梁处置中的数量
				if(lxlProjectCount.getWarnlxlcountdeal() != null){
					lxlcountdeal = lxlProjectCount.getWarnlxlcountdeal();
				}
				
				//连续梁未处置的数量
				if(lxlProjectCount.getWarnlxlcountnodeal() != null){
					lxlcountnodeal = lxlProjectCount.getWarnlxlcountnodeal();
				}
				
				//梁段已处置的处理：梁段总数-处置中-未处置
				lxlProjectCount.setWarnldcountyesdeal(ldcount-ldcountdeal-ldcountnodeal);
				//连续梁已处置的处理：连续梁总数-处置中-未处置
				lxlProjectCount.setWarnlxlcountyesdeal(lxlcount-lxlcountdeal-lxlcountnodeal);
				resultBean = new ResultBean<LxlProjectCount> (ResultCodeTypeEunm.scuss.getKey(),ResultCodeTypeEunm.scuss.getValue(),lxlProjectCount);
				
			}
			else{
				resultBean = new ResultBean<LxlProjectCount> (ResultCodeTypeEunm.scussButNull.getKey(),ResultCodeTypeEunm.scussButNull.getValue(),lxlProjectCount);
			}
				
		} catch (Exception e) {
			resultBean = new ResultBean<LxlProjectCount> (ResultCodeTypeEunm.exception.getKey(),ResultCodeTypeEunm.exception.getValue(),lxlProjectCount);
			e.printStackTrace();
		}
		return resultBean;
	}

	/**
	 * 片区汇总
	 */
	@Override
	public List<LxlPianquCount> selectPianquInfo(Map<String,Object> m) {
			
		//根据片区统计连续梁的信息
		List<LxlPianquCount> lxlItem=lxlCountMapper.selectLxlInfobyPianqu(m);
		return lxlItem;

	}

	/**
	 * 按项目进行统计
	 */
	@Override
	public List<LxlPianquCount> selectItemInfo(Map<String,Object> m) {
			
	  //根据片区统计项目下连续梁的信息
		List<LxlPianquCount> lxlItem=lxlCountMapper.selectLxlInfobyItem(m);
		return lxlItem;
	}
	
	/**
	 * 按标段进行汇总
	 */
	@Override
	public List<LxlProjectCount> selectBiaoDuanInfo(Map<String,Object> m) {
			
		//根据项目统计各标段下连续梁的信息
		List<LxlProjectCount> lxlItem=lxlCountMapper.selectLxlInfobyPro(m);

		return lxlItem;

	}
}
