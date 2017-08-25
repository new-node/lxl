package com.tky.lxl.platform.service.business;

import java.util.List;

import com.tky.lxl.platform.model.business.CategoryItem;

/**
 *  <p>Title: CategoryItemService</p>
 *  <p>Description: 片区</p>
 *  <p>Company: 铁科院</p> 
 *
 *  @author sunjiashu（2017年4月17日  下午12:43:19）
 *
 *  @version:1.0.0  copyright  2017-2018
 */
public interface CategoryItemService {
	
	/**
	 * 获取所有片区
	 * @return
	 */
	public List<CategoryItem> getCategoryItem();
}
