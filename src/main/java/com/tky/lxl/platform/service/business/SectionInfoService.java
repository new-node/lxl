package com.tky.lxl.platform.service.business;

import java.util.List;

import com.tky.lxl.platform.model.business.CxLdCount;
import com.tky.lxl.platform.model.business.DbsxInfo;
import com.tky.lxl.platform.model.business.Deviation;
import com.tky.lxl.platform.model.business.Dictionary;
import com.tky.lxl.platform.model.business.LD;
import com.tky.lxl.platform.model.business.LxlDataException;
import com.tky.lxl.platform.model.business.LxlWarnInfo;
import com.tky.lxl.platform.model.business.NewLxl;
import com.tky.lxl.platform.model.business.SectionInfo;

/**
 * <p>Title: SectionInfoService</p>
 * <p>Description: 标段信息</p>
 * <p>Company: 铁科院</p> 
 *
 * @author liuzhenya（2017年3月2日 上午10:58:40）
 *
 * @version:1.0.0 copyright  2017-2018
 */
public interface SectionInfoService {

	/**
	 * 获取测量信息
	 * @param sectionId 标段ID
	 * @return
	 */
	public List<SectionInfo> getSectionInfoList(String sectionId, String conbeamId);

	/**
	 * 获取连续梁下的偏差超限信息
	 * @param conbeamID 连续梁ID
	 * @return
	 */
	public List<LxlWarnInfo> getLxlWarnInfo(String conbeamID);

	/**
	 * 获取连续梁下的异常信息
	 * @param sectionId 标段ID
	 * @return
	 */
	public List<LxlDataException> getLxlDataException(String sectionId);

	/**
	 * 获取偏差上下限值
	 * @param projectId 项目ID
	 * @param warnType 超限类型
	 * @return
	 */
	public Deviation getPccxLimit(String projectId,String warnType);

	/**
	 * 获取施工状况列表
	 * 
	 * @return
	 */
	 public List<Dictionary> getGkbmItem();

	/**
	 * 更新梁段的说明列
	 * @param recordList 梁段信息
	 * @return
	 */
	public Integer updateLdRemarkByPrimaryKey(List<LD> recordList);

	/**
	 * 最新上传数据的连续梁
	 * @param sectionid 标段ID
	 * @return
	 */
	public List<NewLxl> getNewLxl(String sectionid);

	/**
	 * 根据标段统计梁段超限处置信息
	 * @param sectionId 标段ID
	 * @return
	 */
	public CxLdCount getPccxldCount(String sectionId,String conbeamid);

	/**
	 * 获取代办事项数据
	 * @param sectionId 标段ID
	 * @return
	 */
	public List<DbsxInfo> getBdDbsxInfo(String sectionId, String conbeamId);
}
