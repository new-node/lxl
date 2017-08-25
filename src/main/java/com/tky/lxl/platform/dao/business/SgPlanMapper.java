package com.tky.lxl.platform.dao.business;

import java.util.List;

import com.tky.lxl.platform.model.business.SgPlan;
/**
 * 
 * <p>Title:SgPlanMapper </p>
 * <p>Description: 施工计划DAO</p>
 * <p>Company: 铁科院</p> 
 *
 * @author lihongcui（2017年3月2日 下午3:25:32）
 *
 * @version:1.0.0 copyright  2017-2018
 */
public interface SgPlanMapper {

    /**
     * 查询施工计划的数据
     * 
     * @return
     */
    public List<SgPlan> select(SgPlan bean);
    
    /**
     * 向施工计划表插入数据
     * 
     * @param bean - 施工计划
     */
    public void saveOrUpdate(SgPlan bean);
}