package com.tky.lxl.platform.dao.business;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.tky.lxl.platform.model.business.CategoryItem;

/**
 * 
 * <p>Title:CategoryItemMapper </p>
 * <p>Description: 片区DAO</p>
 * <p>Company: 铁科院</p> 
 *
 * @author yushanli（2017年3月2日 下午3:23:38）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Repository("categoryItemMapper")
public interface CategoryItemMapper {

	/**
	 * 获取所有片区
	 */
	public List<CategoryItem> selectCategoryItem();
}
