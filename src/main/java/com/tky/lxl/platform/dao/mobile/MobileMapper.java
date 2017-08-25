package com.tky.lxl.platform.dao.mobile;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.tky.lxl.platform.model.mobile.QSLDInfo;

/**
 * 
 * <p>MobileMapper </p>
 * <p>Company: 铁科院</p> 
 * @author wk（2017年5月20日）
 */
@Repository("mobileMapper")
public interface MobileMapper {

	/**
	 * 根据项目Id获取缺失梁段列表
	 * @param projectId
	 * @return
	 */
    public List<QSLDInfo> getQSLDInfoByprojectId(Map<String,Object> m);
    /**
     * 根据标段Id获取缺失梁段列表
     * @param sectionId
     * @return
     */
    public List<QSLDInfo> getQSLDInfoBysectionId(Map<String,Object> m);
    /**
     * 根据连续梁ID获取项目ID
     * @param conbeamId
     * @return
     */
    public Long getProjectIdByconbeamId(@Param(value="conbeamId") String conbeamId);
    /**
     * 根据连续梁ID获取缺失梁段数据详情
     * @param conbeamId
     * @return
     */
    public List<String>  getqsldinfoByconbeamid(@Param(value="conbeamId") String conbeamId);
}