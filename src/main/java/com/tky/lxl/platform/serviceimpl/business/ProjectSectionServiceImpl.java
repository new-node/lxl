package com.tky.lxl.platform.serviceimpl.business;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tky.lxl.platform.dao.business.ProjectSectionMapper;
import com.tky.lxl.platform.model.business.ProjectSection;
import com.tky.lxl.platform.service.business.ProjectSectionService;

/**
 *  <p>Title: ProjectSectionServiceImpl</p>
 *  <p>Description: 标段</p>
 *  <p>Company: 铁科院</p> 
 *
 *  @author sunjiashu（2017年4月17日  下午12:51:37）
 *
 *  @version:1.0.0  copyright  2017-2018
 */

@Service("projectSectionService")
public class ProjectSectionServiceImpl implements ProjectSectionService {

	@Resource
	private ProjectSectionMapper projectSectionMapper;

	@Override
	public List<ProjectSection> findByProjectId(Long projectinfoid) {
		return projectSectionMapper.findByProjectId(projectinfoid);
	}
}
