package com.tky.lxl.platform.dao.business;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.tky.lxl.platform.model.business.DatumPointRecord;

public interface DatumPointRecordMapper {
	/**
	 * 向基准点履历表插入数据
	 * @param record插入对象
	 * @return
	 */
	int insertSelective(DatumPointRecord record);

	/**
	 * 通过主键查询数据
	 * @param baseid基准点ID
	 * @return
	 */
	List<DatumPointRecord> findById(@Param(value = "baseid") Long baseid);
}