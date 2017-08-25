package com.tky.lxl.platform.controller.business;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tky.lxl.platform.service.business.TaskUpWarnCloseStatusService;

/**
 * 
 * <p>Title:TaskUpWarnCloseStatusController </p>
 * <p>Description: 定时任务 定时更新连续梁 处置中的梁段是否可以关闭</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年8月16日 下午4:31:18）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Controller
@RequestMapping("/warnclose")
public class TaskUpWarnCloseStatusController {

	@Resource
	private TaskUpWarnCloseStatusService taskUpWarnCloseStatusService;
	
	@RequestMapping("/upWarnCloseStatus")
	public void upWarnCloseStatus(){
		taskUpWarnCloseStatusService.syncWarnCloseStatus();
	}
}
