package com.tky.lxl.platform.controller.mobile;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * 
 * <p>Title:MobileBridgeController </p>
 * <p>Description: 手机端桥梁首页</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年5月20日 上午5:35:48）
 *
 * @version:1.0.0 copyright © 2017-2018
 */

@Controller
public class MobileBridgeController {
	
	public static final String URL_BRIDGE_HOME = "../mobile/";

	@RequestMapping("mobileHomeBridge/{projectId}/{conbeamId}")
	public ModelAndView homeBridge(@PathVariable String projectId,@PathVariable String conbeamId) {

		ModelAndView mv = new ModelAndView(URL_BRIDGE_HOME+"bridge");
		mv.addObject("projectId", projectId);
		mv.addObject("conbeamId", conbeamId);
		return mv;
	}
	
//	@RequestMapping("bridgeHome")
//	public ModelAndView bridge(String projectId,String conbeamId) {
//
//		ModelAndView mv = new ModelAndView(URL_BRIDGE_HOME+"homeBridge");
//		
//		return mv;
//	}


}
