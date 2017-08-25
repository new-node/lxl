package com.tky.lxl.platform.dao.business;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.tky.lxl.platform.model.business.ProjectSection;

/**
 * 
 * <p>Title:ProjectSectionMapper </p>
 * <p>Description: 标段DAO</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年3月3日 上午10:19:12）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Repository("projectSectionMapper")
public interface ProjectSectionMapper {

	/**
	 * 获取标段信息
	 * 
	 * @param id 主键标段ID
	 * @return 标段数据
	 */
	ProjectSection selectProjectSectionByID(@Param(value = "sectionid") Long id);

	/**
	 * 根据项目ID获取标段
	 * 
	 * @param id 项目ID
	 * @return
	 */
	public List<ProjectSection> findByProjectId(Long projectinfoid);

	/**
	 * 根据部门ID获取标段 建指管理员用
	 * 
	 * @param id 项目ID
	 * @return
	 */
	public List<ProjectSection> selectSectionByDepartmentId(Long departmentId);
}
