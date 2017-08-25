package com.tky.lxl.platform.controller.mobile;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;
import com.tky.lxl.platform.finals.Const;
import com.tky.lxl.platform.model.business.LxlProjectCount;
import com.tky.lxl.platform.model.system.UserInfo;
import com.tky.lxl.platform.service.business.LxlCountService;
import com.tky.lxl.platform.service.mobile.MobileService;
import com.tky.lxl.platform.service.system.UserService;
import com.tky.lxl.platform.utils.ResultBean;

/**
 * <p>
 * Title: ForGisController
 * </p>
 * <p>
 * Description: GIS
 * </p>
 * <p>
 * Company: 铁科院
 * </p>
 * 
 * @author wk（2017年6月28日）
 */
@Controller
@RequestMapping("/gis")
public class ForGisController {
	@Resource
	private LxlCountService lxlCountService;
	@Resource
	private MobileService mobileService;
	@Resource
	UserService userService;

	/**
	 * 连续梁详情
	 */
	@RequestMapping(value = "/login/{id}/{sessionid}", method = { RequestMethod.GET, RequestMethod.POST })
	public ModelAndView bridgeInfo(HttpServletRequest request, @PathVariable("id") String id,
			@PathVariable("sessionid") String sessionid) throws Exception {
		ResultBean<UserInfo> userInfoResult = null;
		// 大平台登陆
		userInfoResult = userService.validate(sessionid);
		// 无用户信息,或者未通过验证
		if (userInfoResult == null || userInfoResult.getResult() == null
				|| Const.Auth.AUTHED != userInfoResult.getCode()) {
			return new ModelAndView("error.jsp");
		}
		UserInfo userInfo = userInfoResult.getResult();
		// 用户信息保存到Session
		request.getSession().setAttribute(Const.SessionKey.USER_INFO, userInfo);

		Long projectId = mobileService.getProjectIdByconbeamId(id);
		if (projectId == null)
			return new ModelAndView("error.jsp");
		ModelAndView mv = new ModelAndView("../mobile/gis-login");
		mv.addObject("projectId", projectId);
		mv.addObject("id", id);
		return mv;
	}

	/**
	 * 根据项目统计各个标段下的连续梁监测状态
	 */
	@RequestMapping(value = "/getcxList/{projectid}/{nodeType}/{token}", method = { RequestMethod.GET })
	@ResponseBody
	public ResultBean<List<JSONObject>> getBiaoDuanInfo(@PathVariable("projectid") String projectid,
			@PathVariable("nodeType") int nodeType, @PathVariable("token") String token) {
		List<JSONObject> list = new ArrayList<JSONObject>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		if (!token.equals(DigestUtils.md5Hex("xxjk" + sdf.format(new Date())))) {
			return new ResultBean<List<JSONObject>>(0, "令牌错误", list);
		}
		long proinfoId = 0, proSectionId = 0;
		List<LxlProjectCount> lxlItem = new ArrayList<LxlProjectCount>();
		try {
			if (nodeType == 3) {
				proSectionId = Long.valueOf(projectid.split("_")[0]);
				proinfoId = Long.valueOf(projectid.split("_")[1]);
			} else {
				proinfoId = Long.valueOf(projectid);
			}
			Map<String, Object> m = new HashMap<>();
			m.put("projectid", proinfoId);
			lxlItem = lxlCountService.selectBiaoDuanInfo(m);
			if (nodeType == 3) {
				for (LxlProjectCount item : lxlItem) {
					if (item.getSectionId() == proSectionId) {
						resultList(item, list, nodeType);
						break;
					}
				}
			}
			if (nodeType == 2) {
				for (LxlProjectCount item : lxlItem) {
					resultList(item, list, nodeType);
				}
			}
			return new ResultBean<List<JSONObject>>(0, "成功", list);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResultBean<List<JSONObject>>(1, "操作异常，请联系管理员！", list);
		}
	}

	/**
	 * 将查询的结果集转换成返回的数据格式
	 * 
	 * @param item
	 * @param list
	 * @param nodeType
	 */
	private void resultList(LxlProjectCount item, List<JSONObject> list, int nodeType) {
		JSONObject obj = new JSONObject();
		obj.put("nodeId", item.getSectionId());// 节点Id
		obj.put("nodeName", item.getSection());// 节点名称
		obj.put("nodeType", nodeType);// 节点类型
		obj.put("lxlnum",
				(item.getWjccount() == null ? 0 : item.getWjccount())
						+ (item.getJczcount() == null ? 0 : item.getJczcount())
						+ (item.getDhlcount() == null ? 0 : item.getDhlcount())
						+ (item.getYhlcount() == null ? 0 : item.getYhlcount()));// 连续梁数量
		obj.put("jcnum", item.getJczcount());// 监测数量
		obj.put("wjcnum", item.getWjccount());// 未监测数量
		obj.put("yhlnum", item.getYhlcount());// 已合龙数量
		obj.put("cxnum", (item.getWarnlxlcount() == null ? 0 : item.getWarnlxlcount())
				+ (item.getWarnlxlcountnodeal() == null ? 0 : item.getWarnlxlcountnodeal()));// 连续梁超限数量
		list.add(obj);
	}
}
