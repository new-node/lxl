package com.tky.lxl.platform.dao.business;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.tky.lxl.platform.model.business.Organization;

/**
 * 
 * <p>Title: OrgTreeMapper </p>
 * <p>Description: 获取组织结构树数据Mapper</p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年3月9日 下午4:37:29）
 *
 * @version:1.0.0 copyright  2017-2018
 */
public interface OrgTreeMapper {

	/**
	 * 取得组织结构树数据
	 *   中心级用户
	 * 
	 * @return
	 */
	public List<Organization> selectCenter();
	
	/**
	 * 取得组织结构树数据
	 *   建设单位级用户
	 * 
	 * @param id - 直管公司 或 路局 的部门ID
	 * @return
	 */
	public List<Organization> selectConstruction(Long id);
	
	/**
	 * 取得组织结构树数据
	 *   指挥部级用户
	 * 
	 * @param id - 指挥部/筹备组 的部门ID
	 * @return
	 */
	public List<Organization> selectHeadquarter(Long id);

	/**
	 * 取得组织结构树数据
	 *   标段级用户
	 * 
	 * @param account - 标段用户登陆名
	 * @param id - 标段ID
	 * @return
	 */
	public List<Organization> selectSection(@Param("account")String account, @Param("id")Long id);
}
