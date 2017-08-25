package com.tky.lxl.platform.dao.business;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.tky.lxl.platform.model.business.ProjectInfo;

/**
 * 
 * <p>Title:ProjectInfoMapper </p>
 * <p>Description: 项目DAO</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年3月3日 上午10:11:48）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Repository("projectInfoMapper")
public interface ProjectInfoMapper {

	/**
	 * 根据片区ID获取项目信息
	 * @param id 片区ID
	 * @return
	 */
	public List<ProjectInfo> findByPqId(@Param(value = "categoryId") Long id);

	/**
	 * 根据建设单位ID获取项目信息
	 * 
	 * @return 建设单位ID
	 */
	public List<ProjectInfo> findByJSdeptId(@Param(value = "constructionDepId") Long id);

	/**
	 * 根据项目ID获取项目信息
	 * 
	 * @return 项目ID
	 */
	public ProjectInfo findById(@Param(value = "id") Long id);
}
