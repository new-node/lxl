package com.tky.lxl.platform.controller.business;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tky.lxl.platform.finals.URLConst;
import com.tky.lxl.platform.model.Page;
import com.tky.lxl.platform.service.business.MeasureInfoService;
import com.tky.lxl.platform.utils.ResultBean;

/**
 * 
 * <p>Title: MeasureMessageController</p>
 * <p>Description: 测量信息</p>
 * <p>Company: 铁科院</p> 
 *
 * @author liuzhenya（2017年3月5日 下午9:28:12）
 *
 * @version:1.0.0 copyright © 2017-2018
 */

@Controller
@RequestMapping("/measure")
public class MeasureInfoController {

	@Resource
	private MeasureInfoService measureInfoService;

	@RequestMapping("/getMeasureMessage")
	public String getMeasureMessage() {

		return URLConst.URL_MEASURE_INFO;
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
			// 判断是否为第一页
			if (pageNo == null) {
				pageNo = 1;
			}

			// 获取偏差超限信息一览
			/*if (shortName != null && !shortName.isEmpty()) {
				shortName = "'" + shortName + "'";
			}*/
			Page page = measureInfoService.getMeasureInfoList(conbeamID, pier, shortName, gkbm, pageNo, licheng);

			// 获取T构下拉列表数据
			List<Map<String, String>> pierList = measureInfoService.getPierList(conbeamID);
			// 获取梁段号下拉列表数据
			List<Map<String, String>> ldCodeList = measureInfoService.getLdCodeList(conbeamID, pier);
			// 获取施工工况下拉列表数据
			List<Map<String, String>> gkList = measureInfoService.getGkbmAndContentList();
			// 返回结果设定
			if (page.getTotalCount() != 0) {
				data.put("pierList", pierList);
				data.put("measureInfo", page);
				data.put("ldCodeList", ldCodeList);
				data.put("gkList", gkList);
				return new ResultBean<Map<String, Object>>(0, "获取成功！", data);
			} else {
				return new ResultBean<Map<String, Object>>(1, "数据不存在！", data);
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
	@RequestMapping(value="/getDropDownList/{conbeamID}",method={RequestMethod.GET,RequestMethod.POST})
	@ResponseBody
	public ResultBean<Map<String, Object>> getDropDownList(@PathVariable Long conbeamID) {
		String conbeamid=String.valueOf(conbeamID);
		Map<String, Object> data = new HashMap<String, Object>();

		// 获取T构下拉列表数据
		List<Map<String, String>> pierList = measureInfoService.getPierList(conbeamid);
		if(pierList.size() > 0) {
			// 获取梁段号下拉列表数据
			Map<String, String> pierTmp = pierList.get(0);
			String	pier = pierTmp.get("PIER").toString();
			List<Map<String, String>> ldCodeList = measureInfoService.getLdCodeList(conbeamid, pier);
			// 获取施工工况下拉列表数据
			List<Map<String, String>> gkList = measureInfoService.getGkbmAndContentList();
			// 返回结果设定
			data.put("pierList", pierList);
			data.put("ldCodeList", ldCodeList);
			data.put("gkList", gkList);
		}

		return new ResultBean<Map<String, Object>>(0, "获取成功！", data);
	}

	/**
	 * 获取梁段下拉列表
	 * @param conbeamID 连续梁ID
	 * @param pier	T构
	 * @return
	 */
	@RequestMapping("/getLdList")
	@ResponseBody
	public ResultBean<Map<String, Object>> getLdList(
			@RequestParam(value = "conbeamID", required = false) String conbeamID,
			@RequestParam(value = "pier", required = false) String pier) {
		Map<String, Object> data = new HashMap<String, Object>();
		try {
			// 更改T构或者梁段号后，更新施工阶段下拉框
			List<Map<String, String>> ldList = measureInfoService.getLdCodeList(conbeamID, pier);

			// 返回结果设定
			data.put("ldCodeListTmp", ldList);
			return new ResultBean<Map<String, Object>>(0, "获取成功！", data);
		} catch (Exception e) {

			return new ResultBean<Map<String, Object>>(-1, "操作异常！请联系管理员", data);
		}
	}
}
