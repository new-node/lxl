package com.tky.lxl.platform.dao.business;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.tky.lxl.platform.model.business.Lxl;
import com.tky.lxl.platform.model.business.NewLxl;

/**
 * 
 * <p>Title:LxlMapper </p>
 * <p>Description: 连续梁DAO</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年3月3日 上午10:29:29）
 *
 * @version:1.0.0 copyright  2017-2018
 */
public interface LxlMapper {

	/**
	 * 根据标段ID获取标段下的连续梁
	 * @param id 标段ID
	 * @return
	 */
	public List<Lxl> selectLxlBySectionId(@Param(value = "sectionId") Long sectionId);

	/**
	 * 根据连续梁ID获取连续梁
	 * @param lxlid连续梁ID 
	 * @return
	 */
	public Lxl findById(@Param(value = "id") Long id);

	/**
	 * 更新连续梁信息
	 */
	public void UpdateBySggs(Lxl condition);
	
	/**
	 * 更新连续梁测点总数
	 */
	public void UpdateCDCount(Lxl condition);

	/**
	 * 更新连续梁超限梁段数量
	 */
	public void updateWarnLDcount(Lxl condition);

	/**
	 * 获取最新上传数据的连续梁信息
	 * @return
	 */
	public List<NewLxl> getNewLxl(@Param(value = "startdate") String startdate,
	    @Param(value = "enddate") String enddate, @Param(value = "sectionid") String sectionid);
	/**
	 * 更新工作基点总数
	 * @param condition
	 */
	public void updateBasecount(Lxl condition);

	/**
	 * 根据连续梁ID获取连续梁的信息（包括中和是否有数据）
	 * @param id
	 * @return
	 */
	Lxl findByLxlId(@Param(value = "id") Long id);
}