package com.tky.lxl.platform.dao.business;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.tky.lxl.platform.model.business.DatumPoint;

/**
 * <p>Title:TBaseMapper </p>
 * <p>Description: 基准点表mapper</p>
 * <p>Company: 铁科院</p> 
 *
 * @author yushanli（2017年3月7日 下午4:34:34）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public interface DatumPointMapper {
	/**
	 * 更新基准点表数据
	 * @param record
	 */
	void updateTBase(DatumPoint record);

	/**
	 * 插入基准点表数据
	 * @param record
	 */
	void insertTBase(DatumPoint record);

	/**
	 * 查询基准点表全部数据
	 * @param 检索条件
	 * @param 连续梁ID
	 * @return
	 */
    List<DatumPoint> queryTBase(DatumPoint condition);

	/**
	 * 获取基准点表数量
	 * @return
	 */
    int queryTBaseCount(@Param(value = "conbeamid") Long conbeamid);

}
