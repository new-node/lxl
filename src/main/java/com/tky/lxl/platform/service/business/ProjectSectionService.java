package com.tky.lxl.platform.service.business;

import java.util.List;

import com.tky.lxl.platform.model.business.ProjectSection;

/**
 *  <p>Title: ProjectSectionService</p>
 *  <p>Description: </p>
 *  <p>Company: 铁科院</p> 
 *
 *  @author sunjiashu（2017年4月17日  下午12:44:50）
 *
 *  @version:1.0.0  copyright  2017-2018
 */
public interface ProjectSectionService {

	/**
	 * 
	 * @param projectinfoid
	 * @return
	 */
	public List<ProjectSection> findByProjectId(Long projectinfoid);
}
