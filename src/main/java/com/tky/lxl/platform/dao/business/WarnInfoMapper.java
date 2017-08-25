package com.tky.lxl.platform.dao.business;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.tky.lxl.platform.model.business.WarnInfo;
import com.tky.lxl.platform.model.business.WarnLdCount;
import com.tky.lxl.platform.model.business.WarnPczInfo;

/**
 * 
 * <p>Title:WarnInfoMapper </p>
 * <p>Description: 偏差超限</p>
 * <p>Company: 铁科院</p> 
 *
 * @author liuzhenya（2017年3月6日 上午10:52:58）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public interface WarnInfoMapper {
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
	 * @param cdlx 测点类型
	 * @return
	 */
	public List<WarnInfo> selectWarnInfo(@Param(value = "conbeamID") String conbeamID,
			@Param(value = "pier") String pier,
			@Param(value = "ldCode") String ldCode,
			@Param(value = "warnTimeL") String warnTimeL,
			@Param(value = "warnTimeU") String warnTimeU,
			@Param(value = "gkbm") String gkbm,
			@Param(value = "cdbm") String cdbm,
			@Param(value = "dealFlg") String dealFlg,
			@Param(value = "startNum") Integer startNum,
			@Param(value = "endNum") Integer endNum,
			@Param(value = "cdlx") String cdlx);

	/**
	 * 获取偏差超限信息总件数
	 * @param conbeamID 连续梁ID
	 * @param pier	T构
	 * @param ldCode 梁段编码
	 * @param warnTimeL	超限日期 下限
	 * @param warnTimeU	超限日期上限
	 * @param gkbm	工况编码
	 * @param cdbm 测点编码
	 * @param dealFlg	处置FLG
	 * @param cdlx 测点类型
	 * @return
	 */
	public Integer selectWarnInfoTotalCount(@Param(value = "conbeamID") String conbeamID,
			@Param(value = "pier") String pier,
			@Param(value = "ldCode") String ldCode,
			@Param(value = "warnTimeL") String warnTimeL,
			@Param(value = "warnTimeU") String warnTimeU,
			@Param(value = "gkbm") String gkbm,
			@Param(value = "cdbm") String cdbm,
			@Param(value = "dealFlg") String dealFlg,
			@Param(value = "cdlx") String cdlx);

	/**
	 * 获取初期化T构下拉列表所用数据
	 * @param conbeamID 连续梁ID
	 * @return
	 */
	public List<Map<String,String>> selectPierList(@Param(value = "conbeamID")String conbeamID);

	/**
	 * 获取初期化梁段号下拉列表所用数据
	 * @param conbeamID 连续梁ID
	 * @param pier	T构
	 * @return
	 */
	public List<Map<String,String>> selectLdCodeList(@Param(value = "conbeamID")String conbeamID, @Param(value = "pier") String pier);

	/**
	 * 获取初期化施工工况下拉列表所用数据
	 * @return
	 */
	public List<Map<String,String>> selectGkbmAndContentList();

	/**
     * 更新偏差超限的处置flg
     * 
     * @param gkbm 工况编码
     * @param ldcode 梁段编码
     * @param lxlid 连续梁ID
     * @return
     */
    public int updateWarnByPrimaryKey(@Param(value = "gkbm") String gkbm, @Param(value = "ldcode") String ldcode,@Param(value = "lxlid") String lxlid,@Param(value = "dealstatus") Long dealstatus);

    /**
     * 获取当前梁段的未处置的测点的数量
     * @param ldcode 梁段id
     * @param lxlid 连续梁ID
     * @return
     */
    public int selectChuzhiCount(@Param(value = "ldcode") String ldcode,@Param(value = "lxlid") String lxlid,@Param(value = "gkbm") String gkbm);
	/**
	 * 获取高程偏差超限信息
	 * @param conbeamID 连续梁ID
	 * @return
	 */
	public List<WarnPczInfo> selectDeltaWarnInfo(String conbeamID);

	/**
	 * 获取立模偏差超限信息
	 * @param conbeamID 连续梁ID
	 * @return
	 */
	public List<WarnPczInfo> selectLmbgWarnInfo(String conbeamID);

	/**
	 * 获取中线偏差超限信息
	 * @param conbeamID 连续梁ID
	 * @return
	 */
	public List<WarnPczInfo> selectOutlWarnInfo(String conbeamID);

	/**
	 * 获取梁段错台信息
	 * @param conbeamID 连续梁ID
	 * @return
	 */
	public List<WarnPczInfo> selectLdctInfo(String conbeamID);

	/**
	 * 获取指定连续梁下的梁段
	 * @param conbeamID 连续梁ID
	 * @return
	 */
	public List<WarnPczInfo> selectLdInfo(String conbeamID);

	/**
	 * 判断是否更新连续梁表
	 * @param ldcode
	 * @param lxlid
	 * @return
	 */
	public int selectDelLxlCount(@Param(value = "ldcode") String ldcode,@Param(value = "lxlid") String lxlid);

	/**
	 * 查询某连续梁超限梁段数量统计
	 * @param lxlid
	 * @return
	 */
	public WarnLdCount getDealMessage(@Param(value="lxlid")String lxlid);

	/**
	 * 更新连续梁表中间字段
	 * @param warnLdCount
	 */
	public void updateLxlDeal(@Param(value="warnLdCount")WarnLdCount warnLdCount);

	/**
	 * 关闭待关闭的处置信息
	 * @param gkbm
	 * @param partId
	 * @param conbeamId
	 * @return
	 */
	public int warnClose(@Param(value="gkbm")String gkbm, @Param(value="partId")String partId, @Param(value="conbeamId")String conbeamId);
}

