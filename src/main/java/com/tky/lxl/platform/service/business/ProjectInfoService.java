package com.tky.lxl.platform.service.business;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.tky.lxl.platform.model.business.ProjectInfo;

/**
 * <p>Title: ProjectInfoService</p>
 * <p>Description: 项目信息</p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年3月10日 上午11:13:22）
 *
 * @version:1.0.0 copyright  2017-2018
 */
public interface ProjectInfoService {
	
	/**
	 * 按照片区查找项目信息
	 * @param id
	 * @return
	 */
	public List<ProjectInfo> findByPqId(@Param ("categoryId")Long id);
	
	/**
	 * 按照建设单位ID查找项目信息
	 * @param id
	 * @return
	 */
	public List<ProjectInfo> findByJSdeptId(@Param ("constructionDepId")Long id);
	
	/**
	 * 按照项目ID查找项目信息
	 * @param id
	 * @return
	 */
	public ProjectInfo findById(@Param ("id")Long id);
	
}
