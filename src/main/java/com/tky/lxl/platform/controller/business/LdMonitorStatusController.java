package com.tky.lxl.platform.controller.business;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tky.lxl.platform.service.business.LdMonitorStatusService;

/**
 * 
 * <p>Title:LdMonitorStatusController </p>
 * <p>Description: 连续梁 梁段的监测状态Controller</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年8月16日 上午10:29:12）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Controller
@RequestMapping("ldm")
public class LdMonitorStatusController {

	@Resource
	private LdMonitorStatusService ldMonitorStatusService;
	
	@RequestMapping(value="/ldMonitorStatus" , method = {RequestMethod.POST})
	@ResponseBody
	public Boolean ldMonitorStatus(String partidListJson){
		Boolean flag = ldMonitorStatusService.upLdMonitorStatus(partidListJson);
		return flag;
	}
}
