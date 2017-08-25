package com.tky.lxl.platform.dao.business;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.tky.lxl.platform.model.business.LdMonitorStatus;
import com.tky.lxl.platform.model.business.WarnDeal;

/**
 * 
 * <p>Title:WarnDealMapper </p>
 * <p>Description: 偏差超限处置</p>
 * <p>Company: 铁科院</p> 
 *
 * @author liuzhenya（2017年3月7日 上午10:52:58）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public interface WarnDealMapper {
	/**
	 * 插入记录到偏差超限处置表
	 * @param record
	 * @return
	 */
    public int insertSelective(WarnDeal record);

    /**
     * 根据warnId偏差超限处置信息
     * @param gkbm 工况编码
     * @param conbeamId 连续梁id
     * @param partId 梁段id
     * @return
     */
    public List<WarnDeal> selectWarnDeal(@Param(value = "gkbm")String gkbm, @Param(value = "conbeamId")String conbeamId, @Param(value = "partId")String partId, @Param(value = "dealFlg")String dealFlg);

    /**
     * 获取梁段超限信息
     * @param conbeamid 连续梁ID
     * @param pier  墩
     * @param ldtype  梁段类型  
     * @param mileageflag  里程区分
     * @return 
     */
	public List<LdMonitorStatus> isCloseWarn(@Param(value="conbeamid")Long conbeamid, @Param(value="pier")Long pier, @Param(value="ldtype")int ldtype,@Param(value="mileageflag")int mileageflag);
}