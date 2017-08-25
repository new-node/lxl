package com.tky.lxl.platform.dao.business;

import org.apache.ibatis.annotations.Param;

public interface XXKZDMapper {

	/**
	 *根据条件获取测量的数据量
	 * @param conbeamid 
	 * @param beam  梁段
	 * @param condition 工况
	 * @return
	 */
	int getXXKZDCount(@Param(value="conbeamid") Long conbeamid, @Param(value="beam")Long beam, @Param(value="condition")Short condition);

	
}
