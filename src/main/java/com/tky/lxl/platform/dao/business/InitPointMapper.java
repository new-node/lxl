package com.tky.lxl.platform.dao.business;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.tky.lxl.platform.model.business.InitPoint;

/**
 * 
 * <p>Title:InitPointMapper </p>
 * <p>Description: 初始化信息dao</p>
 * <p>Company: 铁科院</p> 
 *
 * @author lihongcui（2017年4月12日 下午6:01:46）
 *
 * @version:1.0.0 copyright  2017-2018
 */
public interface InitPointMapper {
    /**
     * 通过梁段ID获取测点初始化信息
     * @param ldid 梁段ID
     * @return
     */
    public List<InitPoint>selectInitPointInfo(InitPoint condition);
    
    /**
     * 更新测点表的更新时间
     * @param condition
     */
    public void UpdateByinitPoint(InitPoint condition);
    
    /**
	 * 查询需要初始化测点的梁段信息
	 * @return
	 */
	List<InitPoint> queryInitPoint(Long sectionid);

	/**
	 * 批量生成测点
	 * @param initPonitKeys
	 */
//	int createInitPoint(@Param(value="initPonitKeys")List<InitPoint> initPonitKeys);
	int createInitPoint(@Param(value="initPoint")InitPoint initPoint);

	public InitPoint getInitPointMessage(@Param(value="conbeamid")Long conbeamid, @Param(value="beam")Long beam, @Param(value="ptype")Short ptype, @Param(value="point")Short point,@Param(value="miletype")String miletype);
}