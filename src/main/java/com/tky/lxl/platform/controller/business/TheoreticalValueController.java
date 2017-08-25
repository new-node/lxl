package com.tky.lxl.platform.controller.business;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tky.lxl.platform.aop.UserOperateLog;
import com.tky.lxl.platform.emun.ResultCodeTypeEunm;
import com.tky.lxl.platform.finals.Const;
import com.tky.lxl.platform.finals.URLConst;
import com.tky.lxl.platform.model.business.CD;
import com.tky.lxl.platform.model.business.Dictionary;
import com.tky.lxl.platform.model.business.InitPoint;
import com.tky.lxl.platform.model.business.LD;
import com.tky.lxl.platform.model.system.UserInfo;
import com.tky.lxl.platform.service.business.TheoreticalService;
import com.tky.lxl.platform.utils.ResultBean;


/**
 * 
 * <p>Title: TheoreticalValueController</p>
 * <p>Description: 维护理论值</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年3月5日 下午9:39:58）
 *
 * @version:1.0.0 copyright © 2017-2018
 */

@Controller
@RequestMapping("/theoretical")
public class TheoreticalValueController {
	
	//维护理论值Service
	@Resource
	private TheoreticalService theoreticalService;

	
	@RequestMapping("/getTheoreticalValue")
	public String getTheoreticalValue(Model model){
	
		return URLConst.URL_THEORETICAL;
	}
	
	/**
	 * 通过连续梁ID获取T-构下拉列表
	 * @param strBeamId
	 * @return
	 */
	@RequestMapping(value = "getPierItem", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public ResultBean<List<LD>> getPierItem(String Conbeamid) {
		
		List<LD> LDItem = new ArrayList<LD>();
		try {
			LD condition = new LD();
			condition.setConbeamid(Long.parseLong(Conbeamid));
			condition.setUseflag(Const.UseFlag.USE);
			// 获取片区信息
			LDItem = theoreticalService.getPierItem(condition);
			if (LDItem.size() > 0) {
				return new ResultBean<List<LD>>(0, "成功", LDItem);
			} else {
				return new ResultBean<List<LD>>(1, "数据不存在！", LDItem);
			}
		} catch (Exception e) {
			return new ResultBean<List<LD>>(1, "操作异常，请联系管理员！", LDItem);
		}
	}
	/**
	 * 通过梁段ID获取大小里程
	 * @param beam
	 * @return
	 */
	@RequestMapping(value = "getMiletype", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public int getMiletype(int beam){
		int Miletype = 0;
		Miletype = theoreticalService.getMiletype(beam);
		return Miletype;
		
	}
	
	/**
	 * 通过T-构获取梁段下拉列表
	 * @param strPier
	 * @return
	 */
	@RequestMapping(value = "getPartNameItem", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public ResultBean<List<LD>> getPartNameItem(String Conbeamid,String Pier) {
		List<LD> LDItem = new ArrayList<LD>();
		try {
			LD condition = new LD();
			condition.setConbeamid(Long.parseLong(Conbeamid));
			condition.setPier(Long.parseLong(Pier));
			condition.setUseflag(Const.UseFlag.USE);
			// 获取片区信息
			LDItem = theoreticalService.getPartNameItem(condition);
			
			if (LDItem.size() > 0) {
				return new ResultBean<List<LD>>(0, "成功", LDItem);
			} else {
				return new ResultBean<List<LD>>(1, "数据不存在！", LDItem);
			}
		} catch (Exception e) {
			return new ResultBean<List<LD>>(1, "操作异常，请联系管理员！", LDItem);
		}
	}
	
	/**
	 * 通过梁段获取施工工况下拉列表
	 * @param strPier
	 * @return
	 */
	@RequestMapping(value = "getGkbmItem", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public ResultBean<List<Dictionary>> getGkbmItem() {
		
		List<Dictionary> LDItem = new ArrayList<Dictionary>();
		try {
		 // 获取片区信息
			LDItem = theoreticalService.getGkbmItem();
			if (LDItem.size() > 0) {
				return new ResultBean<List<Dictionary>>(0, "成功", LDItem);
			} else {
				return new ResultBean<List<Dictionary>>(1, "数据不存在！", LDItem);
			}
		} catch (Exception e) {
			return new ResultBean<List<Dictionary>>(1, "操作异常，请联系管理员！", LDItem);
		}
	}
	
	
	/**
	 * 通过梁段获取初始化测点ID
	 * @param 
	 * @return
	 */
	@RequestMapping(value = "getInitPointInfo", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public ResultBean<List<InitPoint>> getInitPointInfo(Long partid,Short mileage) {
		
		List<InitPoint> initPointItem = new ArrayList<InitPoint>();
		try {
			// 获取片区信息
			InitPoint bean = new InitPoint();
			bean.setPartid(partid);
			bean.setMileageflag(mileage);
			initPointItem = theoreticalService.getInitPointInfo(bean);
			if (initPointItem.size() > 0) {
				return new ResultBean<List<InitPoint>>(0, "成功", initPointItem);
			} else {
				return new ResultBean<List<InitPoint>>(1, "数据不存在！", initPointItem);
			}
		} catch (Exception e) {
			return new ResultBean<List<InitPoint>>(1, "操作异常，请联系管理员！", initPointItem);
		}
	}
	
	/**
	 * 里程类型的取得
	 * @param strPier
	 * @return
	 */
	@RequestMapping(value = "selectLdMileageflag", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public ResultBean<LD> selectLdMileageflag(String conbeamid,String pier,String partid) {
		
		LD LDItem = new LD();
		
		try {
		  //梁段bean
			LD ldBean = new LD();
			ldBean.setConbeamid(Long.parseLong(conbeamid));
			ldBean.setPier(Long.parseLong(pier));
			ldBean.setPartid(Long.parseLong(partid));
			LDItem = theoreticalService.selectLdMileageflag(ldBean);
			
			if (LDItem != null) {
				return new ResultBean<LD>(0, "成功", LDItem);
			} else {
				return new ResultBean<LD>(1, "数据不存在！", LDItem);
			}
		} catch (Exception e) {
			return new ResultBean<LD>(1, "操作异常，请联系管理员！", LDItem);
		}
	}
	
	/**
	 * 维护理论值更新
	 * @param conbeamid 连续梁
	 * @param structure  T构
	 * @param beam  梁段
	 * @param partType  梁段ID
	 * @param miletype  大小里程区分
	 * @param condition 施工工况
	 * @param point  测点位置号
	 * @param theory
	 * @param theoryX
	 * @param theoryY
	 * @param session
	 * @return
	 */
	@UserOperateLog(description = "维护理论值画面测点信息修正")
	@RequestMapping(value = "setTheoreticalValue", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public ResultBean<String> setTheoreticalValue(Long conbeamid,Long structure,Long beam,
													 int partType,String miletype,Short condition,
													 Short point,String theory,String theoryX,String theoryY,
													HttpSession session) {
		
//		List<CD> CDItem = new ArrayList<CD>();
		
		//判断该测点是否已经测量过
		Boolean istest = theoreticalService.isTest(conbeamid,beam,condition);
		if(istest){
			return new ResultBean<String>(ResultCodeTypeEunm.exitst.getKey(),ResultCodeTypeEunm.exitst.getValue(),"已经测量不能进行修改");
		}else{
			CD bean = new CD();
			//连续梁
			bean.setConbeamid(conbeamid);
			//T-构
			bean.setPier(structure);
			//梁段
			bean.setPartid(beam);
			//施工工况
			bean.setGkbm(condition);
			//理论高程值
			if(!"".equals(theory)){
				bean.setCalculateht(new BigDecimal(theory));
			}else{
				bean.setCalculateht(null);
			}
			//理论X值
			if(!"".equals(theoryX)){
				bean.setLlX(new BigDecimal(theoryX));
			}else{
				bean.setLlX(null);
			}
			//理论Y值
			if(!"".equals(theoryY)){
				bean.setLlY(new BigDecimal(theoryY));
			}else{
				bean.setLlY(null);
			}
			//测点类型
			if(!"1".equals(String.valueOf(condition))){
				bean.setPtype(Const.CDType.CD);
			}else{
				bean.setPtype(Const.CDType.LSCD);
			}
			
			InitPoint initPoint ;
			//大小里程
			if(partType == Const.LDType.BKFDC || partType == Const.LDType.ZERO){
				initPoint= theoreticalService.getInitPointMessage(conbeamid,beam,bean.getPtype(),point,miletype);
				bean.setMileageflag(Short.parseShort(miletype));
			}else{
				initPoint = theoreticalService.getInitPointMessage(conbeamid,beam,bean.getPtype(),point,null);
				bean.setMileageflag(initPoint.getMileageflag());
			}
			bean.setCdbm(initPoint.getPointname());
			//测点
			bean.setPointplace(point);
			//初始化测点ID
			bean.setInitpointid(initPoint.getInitpointid());

			UserInfo userInfo = (UserInfo)session.getAttribute(Const.SessionKey.USER_INFO);
			//创建用户
			bean.setCreateuser(userInfo.getName());
			//更新用户
			bean.setUpdateuser(userInfo.getName());
			
			// 获取片区信息
			theoreticalService.setCDItem(bean);
			
			return new ResultBean<String>(ResultCodeTypeEunm.scuss.getKey(),ResultCodeTypeEunm.scuss.getValue(),"修改完成");
		}
	
	}
	
	/**
	 * 通过梁段获取施工工况下拉列表
	 * @param strPier
	 * @return
	 */
	@RequestMapping(value = "getTheoreticalInfo", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public ResultBean<List<CD>> getTheoreticalInfo(String conbeamid,String structure,String beam,String miletype) {
		
		List<CD> CDItem = new ArrayList<CD>();
		try {
			CD bean = new CD();
			
			//连续梁
			bean.setConbeamid(Long.parseLong(conbeamid));
			//T-构
			bean.setPier(Long.parseLong(structure));
			//梁段
			bean.setPartid(Long.parseLong(beam));
			//里程类型
			if(!"2".equals(miletype)){
				bean.setMileageflag(Short.parseShort(miletype));
			}
			
			CDItem = theoreticalService.getCDItem(bean);
			
			if (CDItem.size() > 0) {
				return new ResultBean<List<CD>>(0, "成功", CDItem);
			} else {
				return new ResultBean<List<CD>>(1, "数据不存在！", CDItem);
			}
		} catch (Exception e) {
			return new ResultBean<List<CD>>(1, "操作异常，请联系管理员！", CDItem);
		}
	}

}
