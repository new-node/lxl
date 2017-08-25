package com.tky.lxl.platform.dao.business;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.tky.lxl.platform.model.business.Observer;

public interface ObserverMapper {
    
    /**
     * 获取观测人员列表
     * @param condition检索条件
     * @return
     */
    List<Observer> selectObserver(Map<String,Object> m);

    /**
     * 获取观测人员数量
     * @param condition检索条件
     * @return
     */
    int findObserverCount(Map<String,Object> m);


	/**
	 * 获取观测人员数量
	 * 
	 * @return
	 */
	int queryObserverCount();

	/**
	 * 根据状态查询观测人员
	 * @param state
	 * @return
	 */
	List<Observer> searchObserver(String useFlag);

	/**
	 * 根据标段ID一览查询该标段的观测人员信息
	 * 
	 * @param sectionIdList
	 * @param state
	 * @return
	 */
	List<Observer> searchObserverBySectionIdList(Map<String,Object> m);

	/**
	 * 根据标段ID查询该标段的观测人员信息
	 *   标段管理员 设置观测人员
	 *   
	 * @param sectionid
	 * @param useFlag
	 * @return
	 */
	List<Observer> searchObserverBySectionId(@Param("sectionId")Long sectionId, @Param("useFlag")Short useFlag);

	/**
	 * 设为观测人员
	 *   标段管理员 设置观测人员
	 *   
	 * @param observer
	 * @return
	 */
	int saveObserver(Observer observer);

	/**
	 * 取消观测人员
	 *   标段管理员 设置观测人员
	 *   
	 * @param observer
	 * @return
	 */
	int cancelObserver(Observer observer);
	
}
