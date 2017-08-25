package com.tky.lxl.platform.dao.business;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.tky.lxl.platform.model.business.CxLdCount;
import com.tky.lxl.platform.model.business.DbsxInfo;
import com.tky.lxl.platform.model.business.Deviation;
import com.tky.lxl.platform.model.business.LxlDataException;
import com.tky.lxl.platform.model.business.LxlWarnInfo;
import com.tky.lxl.platform.model.business.SectionInfo;
import com.tky.lxl.platform.model.business.ZhDbsx;

/**
 * 
 * <p>Title:SectionInfoMapper </p>
 * <p>Description: 获取标段信息</p>
 * <p>Company: 铁科院</p> 
 *
 * @author liuzhenya（2017年3月14日 上午10:52:58）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public interface SectionInfoMapper {
	/**
	 * 获取标段信息
	 * @param sectionId 标段ID
	 * @return
	 */
	public List<SectionInfo> selectSectionInfo(Map<String,Object> m);

	/**
	 * 获取连续梁下的偏差超限信息
	 * @param conbeamID 连续梁ID
	 * @return
	 */
	public List<LxlWarnInfo> selectLxlWarnInfo(String conbeamID);

	/**
	 * 获取连续梁的异常信息
	 * @param conbeamID 连续梁ID
	 * @return
	 */
	public List<LxlDataException> selectLxlDataException(String sectionId);

	/**
	 * 获取偏差上下限值
	 * @param projectId 项目ID
	 * @param warnType 偏差超限类型
	 * @return
	 */
	public Deviation selectPccxLimit(@Param(value = "projectId")String projectId, @Param(value = "warnType")String warnType);

	/**
	 * 更新梁段的说明列
	 * @param remark 备注
	 * @param partId 梁段ID
	 * @return
	 */
	public Integer updateLdRemarkByPrimaryKey(@Param(value = "lowerremarks") String lowerremarks,
			@Param(value = "upperremarks") String upperremarks, @Param(value = "partId") Long partId);

	/**
	 * 根据标段统计梁段超限处置信息
	 * @param sectionId 标段ID
	 * @return
	 */
	public CxLdCount selectPccxldCount(Map<String,Object> m);

	/**
	 * 查询偏差超限待办事项
	 * @param sectionId 标段ID
	 * @return
	 */
	public List<DbsxInfo> selectPccxLdDbsx(Map<String,Object> m );

	/**
	 * 查询仪器设备待办事项
	 * @param sectionId 标段ID
	 * @return
	 */
	public List<DbsxInfo> selectEquimentLdDbsx(String sectionId);

	/**
	 * 查询边合待办事项
	 * @param sectionId 标段ID
	 * @return
	 */
	public List<DbsxInfo> selectBhDbsx(Map<String,Object> m);

	/**
	 * 查询中合待办事项
	 * @param sectionId 标段ID
	 * @return
	 */
	public List<ZhDbsx> selectZhDbsx(Map<String,Object> m);
}