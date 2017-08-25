package com.tky.lxl.platform.serviceimpl.business;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tky.lxl.platform.dao.business.ProjectInfoMapper;
import com.tky.lxl.platform.model.business.ProjectInfo;
import com.tky.lxl.platform.service.business.ProjectInfoService;

/**
 *  <p>Title: ProjectInfoServiceImpl</p>
 *  <p>Description: 项目信息</p>
 *  <p>Company: 铁科院</p> 
 *
 *  @author sunjiashu（2017年4月17日  下午12:51:20）
 *
 *  @version:1.0.0  copyright  2017-2018
 */
@Service
public class ProjectInfoServiceImpl implements ProjectInfoService {

	@Resource
	private ProjectInfoMapper projectInfoMapper;

	/**
	 * 按照片区查找项目信息
	 */
	@Override
	public List<ProjectInfo> findByPqId(Long id) {
		return projectInfoMapper.findByPqId(id);
	}

	/**
	 * 按照建设单位ID查找项目信息
	 */
	@Override
	public List<ProjectInfo> findByJSdeptId(Long id) {
		return projectInfoMapper.findByJSdeptId(id);
	}

	/**
	 * 按照项目ID查找项目信息
	 */
	@Override
	public ProjectInfo findById(Long id) {
		return projectInfoMapper.findById(id);
	}
	
}
