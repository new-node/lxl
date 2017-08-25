package com.tky.lxl.platform.dao.business;

import java.util.List;

import com.tky.lxl.platform.dao.BaseMapper;
import com.tky.lxl.platform.model.business.LdMonitorStatus;

/**
 * 
 * <p>Title:TaskUpWarnCloseStatusMapper </p>
 * <p>Description: 定时任务 定时更新连续梁 处置中的梁段是否可以关闭</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年8月16日 下午4:54:41）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public interface TaskUpWarnCloseStatusMapper extends BaseMapper<LdMonitorStatus>{

	List<LdMonitorStatus> getDealingLd();

}
