package com.tky.lxl.platform.dao.business;

import com.tky.lxl.platform.model.business.PierDraw;
import com.tky.lxl.platform.model.business.PierQuery;

public interface PierMapper {

	/**
	 * 查询墩的信息
	 * @param lineQuery
	 * @return
	 */
	public PierDraw selectPierMessage(PierQuery pierQuery);

	
}
