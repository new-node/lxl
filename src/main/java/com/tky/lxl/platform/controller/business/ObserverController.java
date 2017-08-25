package com.tky.lxl.platform.controller.business;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tky.lxl.platform.finals.Const;
import com.tky.lxl.platform.finals.URLConst;
import com.tky.lxl.platform.model.Page;
import com.tky.lxl.platform.service.business.CategoryItemService;
import com.tky.lxl.platform.service.business.ObserverService;
import com.tky.lxl.platform.service.business.ProjectInfoService;
import com.tky.lxl.platform.service.business.ProjectSectionService;
import com.tky.lxl.platform.utils.ResultBean;
import com.tky.lxl.platform.utils.TypeChange;

/**
 * 
 * <p>Title: ObserverController</p>
 * <p>Description: 观测人员</p>
 * <p>Company: 铁科院</p> 
 *
 * @author yushanli（2017年3月5日 下午8:43:00）
 *
 * @version:1.0.0 copyright © 2017-2018
 */

@Controller
@RequestMapping("/observer")
public class ObserverController {

	// 片区service
	@Resource
	private CategoryItemService categoryItemService;
	// 项目信息service
	@Resource
	private ProjectInfoService projectInfoService;
	// 标段信息service
	@Resource
	private ProjectSectionService projectSectionService;
	@Resource
	private ObserverService observerService;

	// private static
	@RequestMapping("getObserver")
	public String getObserver(Model model) {

		return URLConst.URL_OBSERVER;
	}

	/**
	 * 获取观测人员列表的数据
	 * @return
	 */
	@RequestMapping(value = "getObserverList", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public ResultBean<Page> getObserverList(String cateId, String projectInfoId, String projectSectionId,String username,Integer pageNo) {
//		Observer condition = new Observer();
		Map<String,Object> m =new HashMap<>();
		cateId = cateId==null ? "" : cateId;
		projectInfoId = projectInfoId==null ? "" : projectInfoId;
		projectSectionId = projectSectionId==null ? "" : projectSectionId;
		username = username==null ? "" : username;
		pageNo = pageNo==null ? Const.DEFAULT_PAGE : pageNo;
		//设置缓存key
//		condition.setCacheKey("observergetObserverList"+cateId+projectInfoId+projectSectionId+username+pageNo);
		m.put("cacheKey", "observergetObserverList"+cateId+projectInfoId+projectSectionId+username+pageNo);
		// 设置检索条件
		if (cateId != null && !cateId.isEmpty() && !Const.CommonChar.ZERO.equals(cateId)) {
			m.put("categoryid", cateId.split(","));// 设置片区
		}
		if (projectInfoId != null && !projectInfoId.isEmpty() && !Const.CommonChar.ZERO.equals(projectInfoId)) {
			m.put("projectid", projectInfoId);// 设置项目
		}
		if (projectSectionId != null && !projectSectionId.isEmpty() && !Const.CommonChar.ZERO.equals(projectSectionId)) {
			Long[] sectionids =TypeChange.stringToInt(projectSectionId);
			m.put("sectionids", sectionids);
		}
		
		if (username != null && !username.isEmpty()) {
        	m.put("userName", username);// 设置用户名
        }
		// 判断是否为第一页
//		if (pageNo == null) {
//			condition.setPageNo(DEFAULT_PAGE);
//		} else {
			m.put("pageNo", pageNo);
			
//		}
		ResultBean<Page> result = observerService.getObserver(m);
		return result;
	}

}
