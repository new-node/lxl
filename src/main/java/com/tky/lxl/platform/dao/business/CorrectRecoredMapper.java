package com.tky.lxl.platform.dao.business;

import java.util.List;

import com.tky.lxl.platform.model.business.CorrectRecored;

/**
 * 
 * <p>Title:CorrectRecoredMapper </p>
 * <p>Description: 修正记录表Dao</p>
 * <p>Company: 铁科院</p> 
 *
 * @author lihongcui（2017年3月10日 上午10:42:22）
 *
 * @version:1.0.0 copyright  2017-2018
 */
public interface CorrectRecoredMapper {

    /**
     * 修正记录表插入
     */
    public void insert(CorrectRecored record);
    
    /**
     * 修正记录表更新
     */
    public void updateByPartid(CorrectRecored record);

    /**
     * 修正记录表查询
     */
    public List<CorrectRecored> selectByPartid(CorrectRecored record);

}