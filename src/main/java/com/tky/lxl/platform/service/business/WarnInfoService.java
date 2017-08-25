package com.tky.lxl.platform.service.business;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.tky.lxl.platform.model.Page;
import com.tky.lxl.platform.model.business.WarnDeal;
import com.tky.lxl.platform.model.business.WarnPczInfo;

/**
 * <p>Title: WarnInfoService</p>
 * <p>Description: 偏差超限信息</p>
 * <p>Company: 铁科院</p> 
 *
 * @author liuzhenya（2017年3月2日 上午10:58:40）
 *
 * @version:1.0.0 copyright  2017-2018
 */
public interface WarnInfoService {

	/**
	 * 获取偏差超限信息
	 * @param conbeamID 连续梁ID
	 * @param pier	T构
	 * @param ldCode 梁段编码
	 * @param warnTimeL	超限日期 下限
	 * @param warnTimeU	超限日期上限
	 * @param gkbm	工况编码
	 * @param cdbm 测点编码
	 * @param dealFlg	处置FLG
	 * @param cdle 测点类型
	 * @return
	 */
	public Page getWarnInfoList(String conbeamID, String pier, String ldCode, String warnTimeL, String warnTimeU,
			String gkbm, String dealFlg, String cdbm, String pageFlg, Integer pageNo, String cdlx);

	/**
	 * 获取初期化T构下拉列表所用数据
	 * @param conbeamID 连续梁ID
	 * @return
	 */
	public List<Map<String, String>> getPierList(String conbeamID);

	/**
	 * 获取初期化梁段号下拉列表所用数据
	 * @param conbeamID 连续梁ID
	 * @return
	 */
	public List<Map<String, String>> getLdCodeList(String conbeamID, String pier);

	/**
	 * 获取初期化施工工况下拉列表所用数据
	 * @return
	 */
	public List<Map<String, String>> getGkbmAndContentList();

	/**
	 * 插入记录到偏差超限处置表
	 * @param record
	 * @return
	 */
	public String saveWarnDeal(WarnDeal record);

	/**
	 * 检索偏差超限处置信息
	 * @param gkbm 工况编码
	 * @param conbeamId 连续梁id
	 * @param partId 梁段id
	 * @return
	 */
	public List<WarnDeal> getWarnDeal(String gkbm, String conbeamId, String partId, String dealFlg);

	/**
	 * 获取高程偏差超限信息
	 * @param conbeamID 连续梁ID
	 * @return
	 */
	public List<WarnPczInfo> getDeltaWarnInfo(String conbeamID);

	/**
	 * 获取立模偏差超限信息
	 * @param conbeamID 连续梁ID
	 * @return
	 */
	public List<WarnPczInfo> getLmbgWarnInfo(String conbeamID);

	/**
	 * 获取中线偏差超限信息
	 * @param conbeamID 连续梁ID
	 * @return
	 */
	public List<WarnPczInfo> getOutlWarnInfo(String conbeamID);

	/**
	 * 获取梁段错台信息
	 * @param conbeamID 连续梁ID
	 * @return
	 */
	public List<WarnPczInfo> getLdctInfo(String conbeamID);
	/**
	 * 更新连续梁表梁段超限数量
	 * @param lxlid 连续梁ID
	 * @param ldcode 梁段ID
	 * @return
	 */
	public void updateLxlWarnCount(String lxlid,String ldcode,String gkbm);

	/**
	 * 关闭超限信息
	 * @param gkbm
	 * @param partId
	 * @param conbeamId
	 * @return
	 */
	public void warnClose(String gkbm, String partId, String conbeamId,HttpSession session);

	/**
	 * 判断该梁段是否可以关闭
	 * @param pier
	 * @param partid
	 * @param ldtype
	 * @return
	 */
	public boolean isCloseWarn(Long conbeamid,Long pier, Long partid, int ldtype,int mileageflag,Long seq);

}
