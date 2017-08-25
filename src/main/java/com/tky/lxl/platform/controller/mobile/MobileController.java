package com.tky.lxl.platform.controller.mobile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.tky.lxl.platform.finals.Const;
import com.tky.lxl.platform.model.Page;
import com.tky.lxl.platform.model.mobile.QSLDInfo;
import com.tky.lxl.platform.model.system.UserInfo;
import com.tky.lxl.platform.service.mobile.MobileService;
import com.tky.lxl.platform.utils.ResultBean;

/**
 * <p>Title: LoginController</p>
 * <p>Description: 手机端</p>
 * <p>Company: 铁科院</p> 
 * @author wk（2017年5月15日）
 */
@Controller
@RequestMapping("/mobile")
public class MobileController {

	@Resource
	private MobileService mobileService;
	/**
	 * 登录页面
	 */
	@RequestMapping(value = "/login", method = { RequestMethod.GET, RequestMethod.POST })
	public ModelAndView temp_login(HttpServletRequest request)
			throws Exception {
		 String sessionid=request.getParameter("sessionid");
	ModelAndView mv = new ModelAndView("../mobile/login");
	mv.addObject("sessionid", sessionid);
	return mv;
	}
	/**
	 * 首页
	 */
	@RequestMapping(value = "/index", method = { RequestMethod.GET, RequestMethod.POST })
	public ModelAndView index(HttpServletRequest request)
			throws Exception {
	HttpSession session = request.getSession();
	UserInfo userInfo =(UserInfo)session.getAttribute(Const.SessionKey.USER_INFO);
	ModelAndView mv = new ModelAndView("../mobile/index");
	mv.addObject("loginType",userInfo.getUserLoginType());
	return mv;
	}
	/**
	 * 中心页面
	 */
	@RequestMapping(value = "/center", method = { RequestMethod.GET, RequestMethod.POST })
	public ModelAndView center()
			throws Exception {
		ModelAndView mv = new ModelAndView("../mobile/center");
		return mv;
	}
	/**
	 * 项目
	 */
	@RequestMapping(value = "/projectInfo", method = { RequestMethod.GET, RequestMethod.POST })
	public ModelAndView projectInfo()
			throws Exception {
		ModelAndView mv = new ModelAndView("../mobile/projectInfo");
		return mv;
	}
	/**
	 * 标段
	 */
	@RequestMapping(value = "/projectSection", method = { RequestMethod.GET, RequestMethod.POST })
	public ModelAndView projectSection()
			throws Exception {
		ModelAndView mv = new ModelAndView("../mobile/projectSection");
		return mv;
	}
	/**
	 * 连续梁
	 */
	@RequestMapping(value = "/lxlmain", method = { RequestMethod.GET, RequestMethod.POST })
	public ModelAndView lxlmain()
			throws Exception {
		ModelAndView mv = new ModelAndView("../mobile/lxlmain");
		return mv;
	}
	/**
	 * 连续梁详情
	 */
	@RequestMapping(value = "/bridgeInfo", method = { RequestMethod.GET, RequestMethod.POST })
	public ModelAndView bridgeInfo(HttpServletRequest request)
			throws Exception {
		 String id=request.getParameter("id");
		 Long projectId = mobileService.getProjectIdByconbeamId(id);
		ModelAndView mv = new ModelAndView("../mobile/bridgeInfo");
		 mv.addObject("projectId", projectId);
		return mv;
	}
	

	/**
	 * 获取偏差 超限信息
	 * @param conbeamID 连续梁ID
	 * @param pier	T构
	 * @param ldCode 梁段编码
	 * @param warnTimeL	超限日期 下限
	 * @param warnTimeU	超限日期上限
	 * @return
	 */
	@RequestMapping("/getWarnInfo")
	@ResponseBody
	public ResultBean<Map<String, Object>> getWarnInfo(
			@RequestParam(value = "conbeamID", required = false) String conbeamID,
			@RequestParam(value = "pageNo", required = false) Integer pageNo,
			@RequestParam(value = "pageSize", required = false) Integer pageSize) {
		Map<String, Object> data = new HashMap<String, Object>();
		try {
			// 判断是否为第一页
			if (pageNo == null) {
				pageNo = 1;
			}
			Page page = new Page();
			page.setPageNo(pageNo);
			page.setPageSize(pageSize);
			page = mobileService.getWarnInfoList(conbeamID, page);

			// 返回结果设定
			if (page.getTotalCount() != 0) {
				data.put("warnInfo", page);
				return new ResultBean<Map<String, Object>>(0, "获取成功！", data);
			} else {
				return new ResultBean<Map<String, Object>>(1, "数据不存在！", data);
			}

		} catch (Exception e) {

			return new ResultBean<Map<String, Object>>(-1, "操作异常！请联系管理员", data);
		}
	}
	
	/**
	 * 根据项目或者标段ID获取缺失梁段连续梁列表
	 * @param id		项目ID或者标段id
	 * @param type		1：项目  2：标段
	 * @return
	 */
	@RequestMapping("/qsldList")
	@ResponseBody
	public ResultBean<List<QSLDInfo>> getqsldinfoByprojectidOrsectionId(
			@RequestParam  Long id,
			@RequestParam Integer type,
			@RequestParam String conbeamid) {
		try {
			List<QSLDInfo> result = mobileService.getqsldinfoByprojectidOrsectionId(id, type,conbeamid);
			// 返回结果设定
			if (result.size() > 0) {
				return new ResultBean<List<QSLDInfo>>(0, "获取成功！", result);
			} else {
				return new ResultBean<List<QSLDInfo>>(1, "数据不存在！", result);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return new ResultBean<List<QSLDInfo>>(-1, "操作异常！请联系管理员", null);
		}
	}
	/**
	 * 根据连续梁ID获取缺失梁段数据详情
	 * @param conbeamid		连续梁ID
	 * @return
	 */
	@RequestMapping("/qsldInfo")
	@ResponseBody
	public ResultBean<List<String>> getqsldinfoByconbeamid(
			@RequestParam String conbeamid,
			@RequestParam String conbeamName) {
		try {
			List<String> result = mobileService.getqsldinfoByconbeamid(conbeamid);
			// 返回结果设定
			if (result.size() > 0) {
				return new ResultBean<List<String>>(0, conbeamName, result);
			} else {
				return new ResultBean<List<String>>(1, "数据不存在！", result);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return new ResultBean<List<String>>(-1, "操作异常！请联系管理员", null);
		}
	}
}
