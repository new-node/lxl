package com.tky.lxl.platform.service.business;

import java.util.List;
import java.util.Map;

import com.tky.lxl.platform.model.Page;

/**
 * <p>Title: MeasureInfoService</p>
 * <p>Description: 测量信息</p>
 * <p>Company: 铁科院</p> 
 *
 * @author liuzhenya（2017年3月2日 上午10:58:40）
 *
 * @version:1.0.0 copyright  2017-2018
 */
public interface MeasureInfoService {

	/**
	 * 获取测量信息
	 * @param conbeamID 连续梁ID
	 * @param pier	T构
	 * @param shortName 梁段号
	 * @param gkbm	工况编码
	 * @param licheng 里程
	 * @return
	 */
	public Page getMeasureInfoList(String conbeamID, String pier, String shortName, String gkbm, Integer pageNo,
			String licheng);

	/**
	 * 获取初期化T构下拉列表所用数据
	 * @param conbeamID 连续梁ID
	 * @return
	 */
	public List<Map<String, String>> getPierList(String conbeamID);

	/**
	 * 获取初期化梁段号下拉列表所用数据
	 * @param conbeamID 连续梁ID
	 * @param pier	T构
	 * @return
	 */
	public List<Map<String, String>> getLdCodeList(String conbeamID, String pier);

	/**
	 * 获取初期化施工工况下拉列表所用数据
	 * @return
	 */
	public List<Map<String, String>> getGkbmAndContentList();

	/**
	 * 获取测量信息
	 * @param conbeamID 连续梁ID
	 * @param pier	T构
	 * @param shortName 梁段号
	 * @param gkbm	工况编码
	 * @param licheng 里程
	 * @return
	 */
	public Page getMeasureInfoAllList(String conbeamID, String pier, String shortName, String gkbm, String licheng);
}
