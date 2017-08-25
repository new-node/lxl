package com.tky.lxl.platform.controller.business;

import java.util.ArrayList;
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

import com.alibaba.fastjson.JSON;
import com.tky.lxl.platform.aop.UserOperateLog;
import com.tky.lxl.platform.model.business.CxLdCount;
import com.tky.lxl.platform.model.business.DbsxInfo;
import com.tky.lxl.platform.model.business.Deviation;
import com.tky.lxl.platform.model.business.Dictionary;
import com.tky.lxl.platform.model.business.LD;
import com.tky.lxl.platform.model.business.LxlDataException;
import com.tky.lxl.platform.model.business.LxlWarnInfo;
import com.tky.lxl.platform.model.business.NewLxl;
import com.tky.lxl.platform.model.business.SectionInfo;
import com.tky.lxl.platform.service.business.SectionInfoService;
import com.tky.lxl.platform.utils.ResultBean;

/**
 * 
 * <p>Title: HomeSectionController</p>
 * <p>Description: 标段信息</p>
 * <p>Company: 铁科院</p> 
 *
 * @author liuzhenya（2017年3月5日 下午9:28:12）
 *
 * @version:1.0.0 copyright © 2017-2018
 */

@Controller
@RequestMapping("/homeSection")
public class HomeSectionController {

	@Resource
	private SectionInfoService sectionInfoService;

	/**
	 * 获取标段信息
	 * @param sectionId 标段ID
	 * @return
	 */
	@RequestMapping(value="/getSectionInfo/{sectionId}/{conbeamId}",method={RequestMethod.POST,RequestMethod.GET})
	@ResponseBody
	public ResultBean<Map<String, Object>> getSectionInfo(@PathVariable String sectionId,@PathVariable String conbeamId) {
		Map<String, Object> data = new HashMap<String, Object>();
		try {
			List<SectionInfo> sectionInfoList = sectionInfoService.getSectionInfoList(sectionId,conbeamId);
			if (sectionInfoList.size() > 0) {
				data.put("sectionInfoList", sectionInfoList);
				return new ResultBean<Map<String, Object>>(0, "获取成功！", data);
			} else {
				return new ResultBean<Map<String, Object>>(1, "数据不存在！", data);
			}

		} catch (Exception e) {

			return new ResultBean<Map<String, Object>>(-1, e.getMessage(), data);
		}
	}

	/**
	 * 获取连续梁下的偏差超限信息
	 * @param conbeamID 连续梁ID
	 * @return
	 */
	@RequestMapping("/getLxlWarnInfo")
	@ResponseBody
	public ResultBean<Map<String, Object>> getLxlWarnInfo(
			@RequestParam(value = "conbeamID", required = false) String conbeamID) {
		Map<String, Object> data = new HashMap<String, Object>();
		try {
			List<LxlWarnInfo> lxlWarnInfo = sectionInfoService.getLxlWarnInfo(conbeamID);
			if (lxlWarnInfo.size() > 0) {
				data.put("lxlWarnInfo", lxlWarnInfo);
				return new ResultBean<Map<String, Object>>(0, "获取成功！", data);
			} else {
				return new ResultBean<Map<String, Object>>(1, "数据不存在！", data);
			}

		} catch (Exception e) {

			return new ResultBean<Map<String, Object>>(-1, "操作异常！请联系管理员", data);
		}
	}

	/**
	 * 获取连续梁下的异常信息
	 * @param conbeamID 连续梁ID
	 * @return
	 */
	@RequestMapping("/getLxlExceptionInfo")
	@ResponseBody
	public ResultBean<Map<String, Object>> getLxlExceptionInfo(
			@RequestParam(value = "sectionId", required = false) String sectionId) {
		Map<String, Object> data = new HashMap<String, Object>();
		try {
			// 获取连续梁下的异常信息
			List<LxlDataException> lxlDataException = sectionInfoService.getLxlDataException(sectionId);
			if (lxlDataException.size() > 0) {
				data.put("lxlDataException", lxlDataException);
				return new ResultBean<Map<String, Object>>(0, "获取成功！", data);
			} else {// 数据不存在
				return new ResultBean<Map<String, Object>>(1, "数据不存在！", data);
			}

		} catch (Exception e) {

			return new ResultBean<Map<String, Object>>(-1, "操作异常！请联系管理员", data);
		}
	}

	/**
	 * 获取偏差超限的极限偏差
	 * @param conbeamID 连续梁ID
	 * @return
	 */
	@RequestMapping("/getPccxLimit")
	@ResponseBody
	public ResultBean<Map<String, Object>> getPccxLimit(
			@RequestParam(value = "projectId", required = false) String projectId) {
		Map<String, Object> data = new HashMap<String, Object>();
		try {
			Deviation deviation1 = sectionInfoService.getPccxLimit(projectId,"1");
			Deviation deviation2 = sectionInfoService.getPccxLimit(projectId,"2");
			Deviation deviation3 = sectionInfoService.getPccxLimit(projectId,"3");
			List<Deviation> deviation = new ArrayList<Deviation>();
			deviation.add(deviation1);
			deviation.add(deviation2);
			deviation.add(deviation3);

			data.put("deviation", deviation);
			return new ResultBean<Map<String, Object>>(0, "获取成功！", data);

		} catch (Exception e) {

			return new ResultBean<Map<String, Object>>(-1, "操作异常！请联系管理员", data);
		}
	}

	/**
	 * 获取工况信息
	 * @return
	 */
	@RequestMapping("/getGkList")
	@ResponseBody
	public ResultBean<Map<String, Object>> getGkList() {
		Map<String, Object> data = new HashMap<String, Object>();
		try {
			List<Dictionary> dictionaryList = sectionInfoService.getGkbmItem();
			if (dictionaryList.size() > 0) {// 获取指定工程ID的设定值
				data.put("dictionary", dictionaryList);
				return new ResultBean<Map<String, Object>>(0, "获取成功！", data);
			} else {
				return new ResultBean<Map<String, Object>>(1, "数据不存在！", data);
			}

		} catch (Exception e) {

			return new ResultBean<Map<String, Object>>(-1, "操作异常！请联系管理员", data);
		}
	}

	/**
	 * 更新说明
	 * 
	 * @param recordList 梁段信息
	 * @return
	 */
	@UserOperateLog(description = "更新说明")
	@RequestMapping("/updateLdRemarks")
	@ResponseBody
	public ResultBean<Map<String, Object>> updateLdRemarks(String remarkData) {
		Map<String, Object> data = new HashMap<String, Object>();
		try {
			List<LD> recordList = JSON.parseArray(remarkData, LD.class);
			Integer result = sectionInfoService.updateLdRemarkByPrimaryKey(recordList);
			if (result > 0) {// 获取指定工程ID的设定值
				data.put("result", result);
				return new ResultBean<Map<String, Object>>(0, "更新成功！", data);
			} else {
				return new ResultBean<Map<String, Object>>(1, "更新失败！", data);
			}

		} catch (Exception e) {

			return new ResultBean<Map<String, Object>>(-1, "操作异常！请联系管理员", data);
		}
	}

	/**
	 * 最新上传数据的连续梁
	 * @return
	 */
	@ResponseBody
	@RequestMapping("getNewLxl")
    public ResultBean<List<NewLxl>> getNewLxl(String sectionid) {
		List<NewLxl> newLxls = new ArrayList<NewLxl>();
		try {
	    newLxls = sectionInfoService.getNewLxl(sectionid);
			if (newLxls.size() > 0) {
				return new ResultBean<List<NewLxl>>(0, "获取成功！", newLxls);
			} else {
				return new ResultBean<List<NewLxl>>(1, "数据不存在！", newLxls);
			}

		} catch (Exception e) {

			return new ResultBean<List<NewLxl>>(-1, "操作异常！请联系管理员", newLxls);
		}
	}

	/**
	 * 根据标段统计梁段超限处置信息
	 * sectionId 标段ID
	 * @return
	 */
	@RequestMapping("/getPccxldCount/{sectionId}")
	@ResponseBody
	public ResultBean<Map<String, Object>> getPccxldCount(@PathVariable String sectionId,String conbeamid) {

		Map<String, Object> data = new HashMap<String, Object>();
//		Map<String,String> condition=new HashMap<String,String>();
		try {
			CxLdCount cxLdCount = sectionInfoService.getPccxldCount(sectionId,conbeamid);
			if (cxLdCount != null) {// 获取指定工程ID的设定值
				data.put("cxLdCount", cxLdCount);
				return new ResultBean<Map<String, Object>>(0, "获取成功！", data);
			} else {
				return new ResultBean<Map<String, Object>>(1, "数据不存在！", data);
			}

		} catch (Exception e) {

			return new ResultBean<Map<String, Object>>(-1, "操作异常！请联系管理员", data);
		}
	}

	/**
	 * 待办事项数据取得
	 * sectionId 标段ID
	 * @return
	 */
	@RequestMapping("/getBdDbsxInfo")
	@ResponseBody
	public ResultBean<Map<String,Object>> getBdDbsxInfo(
			@RequestParam(value = "sectionId", required = false) String sectionId,
			@RequestParam(value = "conbeamId", required = false) String conbeamId){
		
		Map<String, Object> data = new HashMap<String, Object>();
		
		try {
			List<DbsxInfo> dbsxList = sectionInfoService.getBdDbsxInfo(sectionId, conbeamId);
			
			if(dbsxList != null){//获取指定工程ID的设定值
				
				data.put("dbsxList", dbsxList);
				return new ResultBean<Map<String, Object>>(0, "获取成功！", data);
			}else {
				return new ResultBean<Map<String, Object>>(1, "数据不存在！", data);
			}
		} catch (Exception e) {

			return new ResultBean<Map<String, Object>>(-1, "操作异常！请联系管理员", data);
		}
	}
}
