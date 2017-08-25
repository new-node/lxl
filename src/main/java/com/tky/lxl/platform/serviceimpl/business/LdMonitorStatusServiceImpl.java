package com.tky.lxl.platform.serviceimpl.business;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tky.lxl.platform.dao.business.LdMonitorStatusMapper;
import com.tky.lxl.platform.model.business.LdMonitorStatus;
import com.tky.lxl.platform.service.business.LdMonitorStatusService;
import com.tky.lxl.platform.sqlsession.MySqlSession;
import com.tky.lxl.platform.utils.BaseJSON;

@Service("ldMonitorStatusService")
public class LdMonitorStatusServiceImpl implements LdMonitorStatusService {

	@Override
	public Boolean upLdMonitorStatus(String partidListJson) {
		try {
			List<LdMonitorStatus> lists = BaseJSON.parseArray(partidListJson, LdMonitorStatus.class);
			// 批量导入数据
			MySqlSession<LdMonitorStatus> ldMonitorStatus = new MySqlSession<LdMonitorStatus>();
			ldMonitorStatus.saveSyncData(lists, LdMonitorStatusMapper.class);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		
		
	}

}
