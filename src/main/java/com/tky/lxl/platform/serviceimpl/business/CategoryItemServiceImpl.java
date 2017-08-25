package com.tky.lxl.platform.serviceimpl.business;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tky.lxl.platform.dao.business.CategoryItemMapper;
import com.tky.lxl.platform.model.business.CategoryItem;
import com.tky.lxl.platform.service.business.CategoryItemService;

/**
 *  <p>Title: CategoryItemServiceImpl</p>
 *  <p>Description: 片区</p>
 *  <p>Company: 铁科院</p> 
 *
 *  @author sunjiashu（2017年4月17日  下午12:46:35）
 *
 *  @version:1.0.0  copyright  2017-2018
 */
@Service("categoryItemService")  
public class CategoryItemServiceImpl  implements CategoryItemService{
	@Resource
	private CategoryItemMapper categoryItemMapper;

	@Override
	public List<CategoryItem> getCategoryItem() {
		return categoryItemMapper.selectCategoryItem();
	}
}
