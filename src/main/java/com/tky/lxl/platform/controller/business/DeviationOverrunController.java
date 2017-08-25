package com.tky.lxl.platform.controller.business;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tky.lxl.platform.aop.UserOperateLog;
import com.tky.lxl.platform.finals.URLConst;
import com.tky.lxl.platform.model.Page;
import com.tky.lxl.platform.model.business.WarnDeal;
import com.tky.lxl.platform.service.business.WarnInfoService;
import com.tky.lxl.platform.utils.ResultBean;

/**
 * 
 * <p>Title: DeviationOverrunController</p>
 * <p>Description: 偏差超限</p>
 * <p>Company: 铁科院</p> 
 *
 * @author liuzhenya（2017年3月6日 下午2:39:02）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Controller
@RequestMapping("/pccx")
public class DeviationOverrunController {

	@Resource
	private WarnInfoService warnInfoService;

	@RequestMapping("/getDeviationOverrunPage")
	public String getDatumPoint(Model model) {

		return URLConst.URL_DEVIATION_OVERRUN;
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
	@RequestMapping(value="/getWarnInfo",method={RequestMethod.POST})
	@ResponseBody
	public ResultBean<Map<String, Object>> getWarnInfo(
			@RequestParam(value = "conbeamID", required = false) String conbeamID,
			@RequestParam(value = "pier", required = false) String pier,
			@RequestParam(value = "ldCode", required = false) String ldCode,
			@RequestParam(value = "warnTimeL", required = false) String warnTimeL,
			@RequestParam(value = "warnTimeU", required = false) String warnTimeU,
			@RequestParam(value = "gkbm", required = false) String gkbm,
			@RequestParam(value = "cdbm", required = false) String cdbm,
			@RequestParam(value = "dealFlg", required = false) String dealFlg,
			@RequestParam(value = "pageNo", required = false) Integer pageNo,
			@RequestParam(value = "pageFlg", required = false) String pageFlg,
			@RequestParam(value = "cdlx", required = false) String cdlx) {
		Map<String, Object> data = new HashMap<String, Object>();
		try {
			// 判断是否为第一页
			if (pageNo == null) {
				pageNo = 1;
			}


//			if (ldCode != null && !ldCode.isEmpty()) {
//				ldCode = "'" + ldCode + "'";
//			}
			
			
			pier = pier==null?"":pier.split("#")[0];
			// 获取偏差超限信息一览
			Page page = warnInfoService.getWarnInfoList(conbeamID, pier, ldCode, warnTimeL, warnTimeU, gkbm, dealFlg,
					cdbm, pageFlg, pageNo, cdlx);

			// 获取T构下拉列表数据
			List<Map<String, String>> pierList = warnInfoService.getPierList(conbeamID);
			// 获取梁段号下拉列表数据
			List<Map<String, String>> ldCodeList = warnInfoService.getLdCodeList(conbeamID, pier);
			// 获取施工工况下拉列表数据
			List<Map<String, String>> gkList = warnInfoService.getGkbmAndContentList();
			// 返回结果设定
			if (page.getTotalCount() != 0) {
				data.put("pierList", pierList);
				data.put("warnInfo", page);
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
			List<Map<String, String>> ldList = warnInfoService.getLdCodeList(conbeamID, pier);

			// 返回结果设定
			data.put("ldCodeListTmp", ldList);
			return new ResultBean<Map<String, Object>>(0, "获取成功！", data);
		} catch (Exception e) {

			return new ResultBean<Map<String, Object>>(-1, "操作异常！请联系管理员", data);
		}
	}

	/**
	 * 获取 偏差超限处置信息
	 * @param warnId 偏差超限ID
	 * @return
	 */
	@RequestMapping(value="/getWarnDeal",method={RequestMethod.POST})
	@ResponseBody
	public ResultBean<Map<String, Object>> getWarnDeal(@RequestParam(value = "gkbm", required = false) String gkbm,
			@RequestParam(value = "conbeamId", required = false) String conbeamId,
			@RequestParam(value = "partId", required = false) String partId,
			@RequestParam(value = "dealFlg", required = false) String dealFlg) {
		Map<String, Object> data = new HashMap<String, Object>();
		try {
			// 更改T构或者梁段号后，更新施工阶段下拉框
			List<WarnDeal> warnDeal = warnInfoService.getWarnDeal(gkbm, conbeamId, partId, dealFlg);

			// 返回结果设定
			data.put("warnDeal", warnDeal);
			if (warnDeal.size() > 0) {
				return new ResultBean<Map<String, Object>>(0, "获取成功！", data);
			} else {
				return new ResultBean<Map<String, Object>>(1, "查询超限处置信息失败！", data);
			}

		} catch (Exception e) {

			return new ResultBean<Map<String, Object>>(-1, "操作异常！请联系管理员", data);
		}
	}

	/**
	 * 插入偏差超限处置信息
	 * @param warnDeal 偏差超限处置信息
	 * @param ldcode 梁段ID
	 * @param lxlid 连续梁ID
	 * @return
	 */
	@UserOperateLog(description = "插入偏差超限处置信息")
	@RequestMapping("/saveWarnDeal")
	@ResponseBody
	public ResultBean<Map<String, Object>> saveWarnDeal(
			@RequestParam(value = "dealUserId", required = false) String dealUserId,
			@RequestParam(value = "dealcs", required = false) String dealcs,
			@RequestParam(value = "dealTime", required = false) String dealTime,
			@RequestParam(value = "remark", required = false) String remark,
			@RequestParam(value = "phone", required = false) String phone,
			@RequestParam(value = "gkbm", required = false) String gkbm,
			@RequestParam(value = "ldcode", required = false) String ldcode,
			@RequestParam(value = "lxlid", required = false) String lxlid,
			@RequestParam(value = "dealusername", required = false) String dealusername,
			@RequestParam(value = "isColse", required = false) String isColse) {
		Map<String, Object> data = new HashMap<String, Object>();
		try {
			// 更改T构或者梁段号后，更新施工阶段下拉框
			WarnDeal warnDeal = new WarnDeal();
			warnDeal.setDealuserid(dealUserId);
			warnDeal.setDealcs(dealcs);
			warnDeal.setDealtime(dealTime);
			warnDeal.setRemark(remark);
			warnDeal.setPhone(phone);
			warnDeal.setGkbm(gkbm);
			warnDeal.setLdcode(ldcode);
			warnDeal.setLxlid(lxlid);
			warnDeal.setAccountname(dealusername);
			warnDeal.setIsColse(isColse);
			String result = warnInfoService.saveWarnDeal(warnDeal);
			if("OK".equals(result)){
				return new ResultBean<Map<String, Object>>(0, "处置成功！", data);
			}else{
				return new ResultBean<Map<String, Object>>(1, "处置失败！", data);
			}
//			int insertResult=Integer.parseInt(result.split(",")[0]);
//			int updateResult=Integer.parseInt(result.split(",")[1]);
//			int updateLxl =Integer.parseInt(result.split(",")[2]);
//			
//			// 返回结果设定
//			data.put("result", result);
//			//更新连续梁
//			if(updateLxl == 1){
//				warnInfoService.updateLxlWarnCount(lxlid, ldcode,gkbm);
//			}
//			if (updateResult >0) {
//				return new ResultBean<Map<String, Object>>(0, "处置成功！", data);
//			} else {
//				if (insertResult==1) {
//					return new ResultBean<Map<String, Object>>(1, "已更新数据！", data);
//				}else{
//					return new ResultBean<Map<String, Object>>(1, "处置失败！", data);
//				}
//			}
		} catch (Exception e) {

			return new ResultBean<Map<String, Object>>(-1, "操作异常！请联系管理员", data);
		}
	}
	
	
	@RequestMapping("/warnClose")
	@ResponseBody
	public ResultBean<String> warnClose(@RequestParam(value = "gkbm", required = false) String gkbm,
			@RequestParam(value = "partId", required = false) String partId,
			@RequestParam(value = "conbeamId", required = false) String conbeamId,HttpSession session){
		try {
			warnInfoService.warnClose(gkbm,partId,conbeamId,session);
			return new ResultBean<String>(0, "处置完成", "OK");
		} catch (Exception e) {
			e.printStackTrace();
			return new ResultBean<String>(-1, "操作异常！请联系管理员", "NG");
		}
		
	}
	
	/**
	 * 判断是否可以关闭
	 * @param partid
	 * @return
	 */
	@RequestMapping("isCloseWarn")
	@ResponseBody
	public boolean isCloseWarn(Long conbeamid,Long pier,Long partid,int ldtype,int mileageflag,Long seq){
		boolean isClose = warnInfoService.isCloseWarn(conbeamid,pier,partid,ldtype,mileageflag,seq);
		return isClose;
	}
}
