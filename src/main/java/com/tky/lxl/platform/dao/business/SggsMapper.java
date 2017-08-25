package com.tky.lxl.platform.dao.business;

import com.tky.lxl.platform.model.business.Sggs;

public interface SggsMapper {

    /**
     * 通过梁段ID查询施工告示牌信息
     */
    public Sggs selectByPrimaryKey(Long conbeamid);
    
    /**
     * 施工告示牌信息更新
     * @param record
     */
    public void saveOrUpdate(Sggs record);
}