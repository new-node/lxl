package com.tky.lxl.platform.dao.business;

import com.tky.lxl.platform.dao.BaseMapper;
import com.tky.lxl.platform.model.business.LdMonitorStatus;

public interface LdMonitorStatusMapper extends BaseMapper<LdMonitorStatus>{

	void saveOrUpdate(LdMonitorStatus ldMonitorStatus);
}
