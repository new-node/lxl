package com.tky.lxl.platform.controller.business;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tky.lxl.platform.aop.UserOperateLog;
import com.tky.lxl.platform.finals.Const;
import com.tky.lxl.platform.model.Page;
import com.tky.lxl.platform.model.business.LxlProjectCount;
import com.tky.lxl.platform.model.business.Sggs;
import com.tky.lxl.platform.model.business.SggsList;
import com.tky.lxl.platform.model.business.Sgjd;
import com.tky.lxl.platform.model.business.WarnPczInfo;
import com.tky.lxl.platform.model.system.UserInfo;
import com.tky.lxl.platform.service.business.HomeConBeamService;
import com.tky.lxl.platform.service.business.MeasureInfoService;
import com.tky.lxl.platform.service.business.WarnInfoService;
import com.tky.lxl.platform.utils.ResultBean;

/**
 * 
 * <p>Title:HomeConBeamController </p>
 * <p>Description: 连续梁首页</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年3月13日 上午11:44:46）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Controller
@RequestMapping("/conbeam")
public class HomeConBeamController {

	@Resource
	private HomeConBeamService homeConBeamService;
	@Resource
	private WarnInfoService warnInfoService;
	@Resource
	private MeasureInfoService measureInfoService;

	/**
	 * 获取连续梁绘制的信息
	 * 
	 * @param id - 连续梁ID
	 * @return
	 */
	@RequestMapping("/selectLxlMessage/{id}")
	@ResponseBody
	public Map<String, Object> selectLxlMessage(@PathVariable Long id) {

		Map<String, Object> specialStructure = homeConBeamService.selectLxlMessage(id);

		return specialStructure;
	}

	/**
	 * 获取高程偏差信息
	 * 
	 * @param id - 连续梁ID
	 * @return
	 */
	@RequestMapping("/getDeltaWarnInfo/{conbeamID}")
	@ResponseBody
	public ResultBean<Map<String, Object>> getDeltaWarnInfo(@PathVariable String conbeamID) {

		Map<String, Object> data = new HashMap<String, Object>();
		try {
			List<WarnPczInfo> deltaWarnInfoList = warnInfoService.getDeltaWarnInfo(conbeamID);

			// 返回结果设定
			if (deltaWarnInfoList.size() > 0) {
				data.put("deltaWarnInfoList", deltaWarnInfoList);
				return new ResultBean<Map<String, Object>>(0, "获取成功！", data);
			} else {
				return new ResultBean<Map<String, Object>>(1, "查询失败！", data);
			}

		} catch (Exception e) {

			return new ResultBean<Map<String, Object>>(-1, "操作异常！请联系管理员", data);
		}
	}

	/**
	 * 获取中线偏差信息
	 * 
	 * @param id - 连续梁ID
	 * @return
	 */
	@RequestMapping("/getOutlWarnInfo/{conbeamID}")
	@ResponseBody
	public ResultBean<Map<String, Object>> getOutlWarnInfo(@PathVariable String conbeamID) {

		Map<String, Object> data = new HashMap<String, Object>();
		try {
			List<WarnPczInfo> outlWarnInfoList = warnInfoService.getOutlWarnInfo(conbeamID);

			// 返回结果设定
			if (outlWarnInfoList.size() > 0) {
				data.put("outlWarnInfoList", outlWarnInfoList);
				return new ResultBean<Map<String, Object>>(0, "获取成功！", data);
			} else {
				return new ResultBean<Map<String, Object>>(1, "查询失败！", data);
			}

		} catch (Exception e) {

			return new ResultBean<Map<String, Object>>(-1, "操作异常！请联系管理员", data);
		}
	}

	/**
	 * 获取立模偏差信息
	 * 
	 * @param id - 连续梁ID
	 * @return
	 */
	@RequestMapping("/getLmbgWarnInfo/{conbeamID}")
	@ResponseBody
	public ResultBean<Map<String, Object>> getLmbgWarnInfo(@PathVariable String conbeamID) {

		Map<String, Object> data = new HashMap<String, Object>();
		try {
			List<WarnPczInfo> lmbgWarnInfoList = warnInfoService.getLmbgWarnInfo(conbeamID);

			// 返回结果设定
			if (lmbgWarnInfoList.size() > 0) {
				data.put("lmbgWarnInfoList", lmbgWarnInfoList);
				return new ResultBean<Map<String, Object>>(0, "获取成功！", data);
			} else {
				return new ResultBean<Map<String, Object>>(1, "查询失败！", data);
			}

		} catch (Exception e) {

			return new ResultBean<Map<String, Object>>(-1, "操作异常！请联系管理员", data);
		}
	}

	/**
	 * 获取错台信息
	 * 
	 * @param id - 连续梁ID
	 * @return
	 */
	@RequestMapping("/getLdctInfo/{conbeamID}")
	@ResponseBody
	public ResultBean<Map<String, Object>> getLdctInfo(@PathVariable String conbeamID) {

		Map<String, Object> data = new HashMap<String, Object>();
		try {
			List<WarnPczInfo> ldctWarnInfoList = warnInfoService.getLdctInfo(conbeamID);

			// 返回结果设定
			if (ldctWarnInfoList.size() > 0) {
				data.put("ldctWarnInfoList", ldctWarnInfoList);
				return new ResultBean<Map<String, Object>>(0, "获取成功！", data);
			} else {
				return new ResultBean<Map<String, Object>>(1, "查询失败！", data);
			}

		} catch (Exception e) {

			return new ResultBean<Map<String, Object>>(-1, "操作异常！请联系管理员", data);
		}
	}

	/**
	 * 获取指定连续梁下的所有梁段
	 * 
	 * @param id - 连续梁ID
	 * @return
	 */
	@RequestMapping("/getLdInfo/{conbeamID}")
	@ResponseBody
	public ResultBean<Map<String, Object>> getLdInfo(@PathVariable String conbeamID) {

		Map<String, Object> data = new HashMap<String, Object>();
		try {
			List<WarnPczInfo> ldList = homeConBeamService.getLdInfo(conbeamID);

			// 返回结果设定
			if (ldList.size() > 0) {
				data.put("ldList", ldList);
				return new ResultBean<Map<String, Object>>(0, "获取成功！", data);
			} else {
				return new ResultBean<Map<String, Object>>(1, "查询失败！", data);
			}

		} catch (Exception e) {

			return new ResultBean<Map<String, Object>>(-1, "操作异常！请联系管理员", data);
		}
	}

	/**
	 * 获取测量信息
	 * @param conbeamID 连续梁ID
	 * @param pier	T构
	 * @param shortName 梁段号
	 * @param licheng 里程
	 * @return
	 */
	@RequestMapping("/getMeasureInfo")
	@ResponseBody
	public ResultBean<Map<String, Object>> getMeasureInfo(
			@RequestParam(value = "conbeamID", required = false) String conbeamID,
			@RequestParam(value = "pier", required = false) String pier,
			@RequestParam(value = "shortName", required = false) String shortName,
			@RequestParam(value = "gkbm", required = false) String gkbm,
			@RequestParam(value = "pageNo", required = false) Integer pageNo,
			@RequestParam(value = "licheng", required = false) String licheng) {
		Map<String, Object> data = new HashMap<String, Object>();
		try {
			// 获取偏差超限信息一览
			/*if (shortName != null && !shortName.isEmpty()) {
				shortName = "'" + shortName + "'";
			}*/
			Page page = measureInfoService.getMeasureInfoAllList(conbeamID, pier, shortName, gkbm, licheng);

			// 返回结果设定
			data.put("measureInfo", page);
			return new ResultBean<Map<String, Object>>(0, "获取成功！", data);

		} catch (Exception e) {
			return new ResultBean<Map<String, Object>>(-1, "操作异常！请联系管理员", data);
		}
	}

	/**
	 * 获取气候信息
	 * 
	 * @param sgjdid - 施工阶段ID
	 * @return
	 */
	@RequestMapping(value="/getQihou",method={RequestMethod.POST})
	@ResponseBody
	public ResultBean<Map<String, Object>> getQihou(@RequestParam(value = "sgjdid", required = false) String sgjdid) {

		Map<String, Object> data = new HashMap<String, Object>();
		try {
			Sgjd sgjd = homeConBeamService.getSgjdInfo(sgjdid);

			// 返回结果设定
			if (sgjd != null) {
				data.put("sgjd", sgjd);
				return new ResultBean<Map<String, Object>>(0, "获取成功！", data);
			} else {
				return new ResultBean<Map<String, Object>>(1, "查询失败！", data);
			}

		} catch (Exception e) {
			return new ResultBean<Map<String, Object>>(-1, "操作异常！请联系管理员", data);
		}
	}
	
	/**
	 * 查询总梁段数，总测点数，偏差超限数
	 */
	@RequestMapping("/selectLdCdWarnByLxl/{conbeamid}")
	@ResponseBody
	public LxlProjectCount selectLdCdWarnByLxl(@PathVariable  Long conbeamid) {
//	public LxlProjectCount selectLdCdWarnByLxl(@RequestParam(value = "conbeamid", required = false) Long conbeamid) {

		// 总梁段数，总测点数，偏差超限数查询
		return homeConBeamService.selectLdCdWarnByLxl(conbeamid);
	}

	/**
	 * 查询连续梁信息
	 * @param conbeamid 连续梁ID
	 * @return
	 */
	@RequestMapping("/showSggsInfo/{conbeamid}")
	@ResponseBody
	public SggsList showSggsInfo(@PathVariable Long conbeamid) {

		SggsList sggsList = new SggsList();
		// 查询连续梁信息
		sggsList = homeConBeamService.showSggsInfo(conbeamid);
		return sggsList;
	}

	/**
	 * 查询连续梁信息
	 * @param conbeamid 连续梁ID
	 * @return
	 */
	@RequestMapping("/showSggsLxl")
	@ResponseBody
	public Map<String, Object> showSggsLxl(@RequestParam(value = "conbeamid", required = false) Long conbeamid, HttpServletRequest request) {
		//获得登录用户信息
		HttpSession session = request.getSession();
		UserInfo userInfo =(UserInfo)session.getAttribute(Const.SessionKey.USER_INFO);
		Map<String, Object> map = new HashMap<String, Object>();
		//判断是不是标段级普通
		if(userInfo != null && userInfo.getUserLoginType().equals(Const.UserLoginType.SECTION_USER)){
			map.put("userType", userInfo.getUserLoginType());
			SggsList sggsList = new SggsList();
			// 查询连续梁信息
			sggsList = homeConBeamService.showSggsInfo(conbeamid);
			map.put("sggsList", sggsList);
		}else{
			map.put("userType", "");
		}
		return map;
	}
	
	/**
	 * 保存施工告示牌信息
	 * @param conbeamid 连续梁ID
	 * @param industrial 所属工区
	 * @param mainkdlength 跨度
	 * @param beamaspan 桥跨组合
	 * @param centermile 所在里程
	 * @param startdate 施工开始日期
	 * @param enddate 施工截止日期
	 * @param planjcunit 施工监测单位
	 * @param designunit 设计单位
	 * @return 
	 */
	@UserOperateLog(description = "施工告示牌信息保存")
	@RequestMapping("/saveSggsInfo")
	@ResponseBody
	public void saveSggsInfo(Long conbeamid, String industrial, String mainkdlength, String beamaspan,
			String centermile, String startdate, String enddate, String planjcunit, String designunit) {
		Sggs bean = new Sggs();
		// 连续梁ID
		bean.setConbeamid(conbeamid);
		// 所属工区
		bean.setIndustrial(industrial);
		// 跨度
		if (!"".equals(mainkdlength)) {
			bean.setMainkdlength(new BigDecimal(mainkdlength));
		} else {
			bean.setMainkdlength(new BigDecimal(0));
		}
		// 桥跨组合
		bean.setBeamaspan(beamaspan);
		// 所在里程
		bean.setCentermile(centermile);

		DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		try {
			// 施工开始日期
			if (!"".equals(startdate)) {
				bean.setStartdate(format.parse(startdate));
			}
			// 施工截止日期
			if (!"".equals(enddate)) {
				bean.setEnddate(format.parse(enddate));
			}
		} catch (ParseException e) {
			e.printStackTrace();
		}
		// 施工监测单位
		bean.setPlanjcunit(planjcunit);
		// 设计单位
		bean.setDesignunit(designunit);
		// 通过连续梁ID查询连续梁信息
		homeConBeamService.saveOrUpdate(bean);
	}
}
