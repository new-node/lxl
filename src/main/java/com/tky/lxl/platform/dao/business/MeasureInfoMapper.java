package com.tky.lxl.platform.dao.business;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.tky.lxl.platform.model.business.MeasureInfo;

/**
 * 
 * <p>Title:MeasureInfoMapper </p>
 * <p>Description: 获取测量信息</p>
 * <p>Company: 铁科院</p> 
 *
 * @author liuzhenya（2017年3月7日 上午10:52:58）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public interface MeasureInfoMapper {
	/**
	 * 获取测量信息
	 * @param conbeamID 连续梁ID
	 * @param pier	T构
	 * @param shortName 梁段号
	 * @param gkbm	工况编码
	 * @return
	 */
	public List<MeasureInfo> selectMeasureInfo(@Param(value = "conbeamID") String conbeamID,
			@Param(value = "pier") String pier, @Param(value = "shortName") String shortName,
			@Param(value = "gkbm") String gkbm, @Param(value = "licheng") String licheng,
			@Param(value = "startNum") Integer startNum, @Param(value = "endNum") Integer endNum);

	/**
	 * 获取测量信息不分页
	 * @param conbeamID 连续梁ID
	 * @param pier	T构
	 * @param shortName 梁段号
	 * @param gkbm	工况编码
	 * @return
	 */
	public List<MeasureInfo> selectAllMeasureInfo(@Param(value = "conbeamID") String conbeamID,
			@Param(value = "pier") String pier, @Param(value = "shortName") String shortName,
			@Param(value = "gkbm") String gkbm, @Param(value = "licheng") String licheng);

	/**
	 * 获取测量信息总件数
	 * @param conbeamID 连续梁ID
	 * @param pier	T构
	 * @param shortName 梁段编码
	 * @param gkbm	工况编码
	 * @param dealFlg	处置FLG
	 * @param licheng 里程
	 * @return
	 */
	public Integer selectMeasureInfoTotalCount(@Param(value = "conbeamID") String conbeamID,
			@Param(value = "pier") String pier, @Param(value = "shortName") String shortName,
			@Param(value = "gkbm") String gkbm, @Param(value = "licheng") String licheng);

	/**
	 * 获取初期化T构下拉列表所用数据
	 * @param conbeamID 连续梁ID
	 * @return
	 */
	public List<Map<String, String>> selectPierList(@Param(value = "conbeamID") String conbeamID);

	/**
	 * 获取初期化梁段号下拉列表所用数据
	 * @param conbeamID 连续梁ID
	 * @param pier	T构
	 * @return
	 */
	public List<Map<String, String>> selectLdCodeList(@Param(value = "conbeamID") String conbeamID,
			@Param(value = "pier") String pier);

	/**
	 * 获取初期化施工工况下拉列表所用数据
	 * @return
	 */
	public List<Map<String, String>> selectGkbmAndContentList();
}