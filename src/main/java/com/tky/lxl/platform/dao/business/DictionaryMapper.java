package com.tky.lxl.platform.dao.business;

import java.util.List;

import com.tky.lxl.platform.model.business.Dictionary;

/**
 * 
 * <p>Title:DICTIONARYMapper </p>
 * <p>Description: 字典Dao</p>
 * <p>Company: 铁科院</p> 
 *
 * @author lihongcui（2017年3月3日 下午5:07:43）
 *
 * @version:1.0.0 copyright  2017-2018
 */
public interface DictionaryMapper {

    /**
     * 字典表查询
     */
    public List<Dictionary> select(Dictionary condition);
}