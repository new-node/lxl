package com.tky.lxl.platform.dao.business;

import java.util.List;

import com.tky.lxl.platform.model.business.CD;

/**
 * 
 * <p>Title:CDMapper </p>
 * <p>Description: 测点Dao</p>
 * <p>Company: 铁科院</p> 
 *
 * @author lihongcui（2017年3月3日 下午2:30:40）
 *
 * @version:1.0.0 copyright  2017-2018
 */
public interface CDMapper {

    /**
     * 查询测点表的数据
     * 
     * @return
     */
    public List<CD> select(CD bean);
    
    /**
     * 通过测点号查询测点表的数据
     * 
     * @return
     */
    public List<CD> selectByPoint(CD bean);
    /**
     * 向测点表插入数据
     * 
     * @param bean - 测点
     */
    public void Insert(CD bean);
    
    /**
     * 更新测点表信息
     */
    public void UpdateByPoint(CD bean);
    
    /**
     * 通过梁段进行施工状况列表检索
     * @param LDbean
     * @return
     */
    public List<CD> selectByPartID(CD bean);

    /**
     * 通过梁段ID获取大小里程
     * @param beam
     * @return
     */
    public int getMiletype(int beam);
}