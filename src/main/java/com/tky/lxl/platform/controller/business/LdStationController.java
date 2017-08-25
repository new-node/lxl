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
import com.tky.lxl.platform.dao.business.InitPointMapper;
import com.tky.lxl.platform.dao.business.LxlMapper;
import com.tky.lxl.platform.dao.business.ProjectInfoMapper;
import com.tky.lxl.platform.dao.business.ProjectSectionMapper;
import com.tky.lxl.platform.emun.ResultCodeTypeEunm;
import com.tky.lxl.platform.finals.Const;
import com.tky.lxl.platform.finals.URLConst;
import com.tky.lxl.platform.model.business.CD;
import com.tky.lxl.platform.model.business.CorrectRecored;
import com.tky.lxl.platform.model.business.CorrectRecoredList;
import com.tky.lxl.platform.model.business.Dictionary;
import com.tky.lxl.platform.model.business.InitPoint;
import com.tky.lxl.platform.model.business.LD;
import com.tky.lxl.platform.model.business.Lxl;
import com.tky.lxl.platform.model.business.ProjectInfo;
import com.tky.lxl.platform.model.business.ProjectSection;
import com.tky.lxl.platform.model.system.UserInfo;
import com.tky.lxl.platform.service.business.LdStationService;
import com.tky.lxl.platform.service.business.TheoreticalService;
import com.tky.lxl.platform.utils.ResultBean;

/**
 * 
 * <p>Title: LdStationController</p>
 * <p>Description: 梁段测点</p>
 * <p>Company: 铁科院</p> 
 *
 * @author lihongcui（2017年3月5日 下午9:32:18）
 *
 * @version:1.0.0 copyright © 2017-2018
 */

@Controller
@RequestMapping("/ldstation")
public class LdStationController {
	
	//梁段测点Service
	@Resource
	private LdStationService ldStationService;
	@Resource
	private LxlMapper lxlMapper;
	@Resource
	private ProjectSectionMapper projectSectionMapper;
	@Resource
	private ProjectInfoMapper projectInfoMapper;
	@Resource
	private InitPointMapper initPointMapper;
	@Resource
	private TheoreticalService theoreticalService;	
	
	
	@RequestMapping("getLdStation")
	public String getLdStation(Model model){
	
		return URLConst.URL_LD_STATION;
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
		 try{
			 LD condition = new LD();
			 condition.setConbeamid(Long.parseLong(Conbeamid));
			 condition.setUseflag(Const.UseFlag.USE);
			 // 获取片区信息
			 LDItem = ldStationService.getPierItem(condition);
			 
			 if (LDItem.size() > 0) {
				 return new ResultBean<List<LD>>(0, "成功", LDItem);
			 } else {
				 return new ResultBean<List<LD>>(1, "数据不存在！", LDItem);
			 }
		 }catch (Exception e) {
			 return new ResultBean<List<LD>>(1, "操作异常，请联系管理员！", LDItem);
		}
		 
	 }
	
	 /**
	  * 通过T-构获取梁段列表信息
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
			 LDItem = ldStationService.getPartNameItem(condition);
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
	  * 获取测点信息
	  * @param strPier
	  * @return
	  */
	 @RequestMapping(value = "getldStationValue", method = { RequestMethod.GET, RequestMethod.POST })
	 @ResponseBody
	 public ResultBean<List<CD>> getldStationValue(String conbeamid,String pier,String partid,String mileage) {
		 
		 List<CD> LDItem = new ArrayList<CD>();
		 
		 try {
			 CD condition = new CD();
			 condition.setConbeamid(Long.parseLong(conbeamid));
			 condition.setPier(Long.parseLong(pier));
			 if("0".equals(mileage) || "1".equals(mileage)){
				 condition.setMileageflag(Short.parseShort(mileage));
			 }
			 condition.setPartid(Long.parseLong(partid));
			 condition.setUseflag(Const.UseFlag.USE);
			 // 获取片区信息
			 LDItem = ldStationService.getldStationValue(condition);
			 if (LDItem.size() > 0) {
				 return new ResultBean<List<CD>>(0, "成功", LDItem);
			 } else {
				 return new ResultBean<List<CD>>(1, "数据不存在！", LDItem);
			 }
		} catch (Exception e) {
			return new ResultBean<List<CD>>(1, "操作异常，请联系管理员！", LDItem);
		}
	 }
	 
	 /**
	  * 获取梁段略称
	  * @param strPier
	  * @return
	  */
	 @RequestMapping(value = "getldShortname", method = { RequestMethod.GET, RequestMethod.POST })
	 @ResponseBody
	 public ResultBean<List<LD>> getldShortname(String id) {
		 
		 
		 List<LD> LDItem = new ArrayList<LD>();
		 try {
			 if(!"".equals(id)){
				 LDItem = ldStationService.getldShortname(Long.parseLong(id));
			 }
			 
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
			 LDItem = ldStationService.getGkbmItem();
			 
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
			 initPointItem = ldStationService.getInitPointInfo(bean);
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
	  * 测点信息修正
	  * @param strPier
	  * @return
	  */
	 @UserOperateLog(description = "测点信息修正")
	 @RequestMapping(value = "updateCDValue", method = { RequestMethod.GET, RequestMethod.POST })
	 @ResponseBody
	 public ResultBean<String> updateCDValue(Long conbeamid,String pier,Long partid,
								String miletype,Short gkbm,String point,
								String theory,String theoryX,String theoryY,
								String reason,String initpoint,String initpointname,HttpSession session) {
		//判断该测点是否已经测量过
			Boolean istest = theoreticalService.isTest(conbeamid,partid,gkbm);
			if(istest){
				return new ResultBean<String>(ResultCodeTypeEunm.exitst.getKey(),ResultCodeTypeEunm.exitst.getValue(),"已经测量不能进行修改");
			}else{
				String bfCalculateht="";//更新前理论高程
				 String bfllX="";//更新前理论X值
				 String bfllY="";//更新前理论Y值
				 CD bean = new CD();
				 UserInfo userInfo = (UserInfo)session.getAttribute(Const.SessionKey.USER_INFO);
				 
				 //连续梁
				 bean.setConbeamid(conbeamid);
				 //测点别名
				 bean.setCdbm(initpointname);
				 
				 bean.setMileageflag(Short.parseShort(miletype));
				 //T-构
				 bean.setPier(Long.parseLong(pier));
				 //梁段
				 bean.setPartid(partid);
				 //施工工况
				 bean.setGkbm(gkbm);
				 //测点类型
				 if(!gkbm.equals("1")){
					 bean.setPtype(Const.CDType.CD);
				 }else{
					 bean.setPtype(Const.CDType.LSCD);
				 }
				 //初期化测点ID
				 try {
					 bean.setInitpointid(Long.parseLong(initpoint));
				 } catch (Exception e) {
					 bean.setInitpointid(null);
				 }
				 //删除标志
				 bean.setUseflag(Const.UseFlag.USE);
				 //测点
				 bean.setPointplace(Short.parseShort(point));
				 
				 List<CD> LDItem = ldStationService.getCDByPoint(bean);
				 
				 //理论高程值
				 if(!"".equals(theory)){
					 bean.setCalculateht(new BigDecimal(theory));
				 }
				 //理论X值
				 if(!"".equals(theoryX)){
					 bean.setLlX(new BigDecimal(theoryX));
				 }
				 //理论Y值
				 if(!"".equals(theoryY)){
					 bean.setLlY(new BigDecimal(theoryY));
				 }
				 
				 //测点表中存在的场合
				 CD cdList=new CD();
				 if(LDItem.size()>0){
					 bean.setUpdateuser(userInfo.getName());
					 
					 cdList = LDItem.get(0);
					 if(cdList.getCalculateht()!=null){
						 bfCalculateht=cdList.getCalculateht().toString();
					 }
					 if(cdList.getLlX()!=null){
						 bfllX=cdList.getLlX().toString();
					 }
					 if(cdList.getLlY()!=null){
						 bfllY=cdList.getLlY().toString();
					 }
					 
					 ldStationService.UpdateCD(bean);
					 
					 
				 }else{
					 //创建用户
					 bean.setCreateuser(userInfo.getName());
					 //更新用户
					 bean.setUpdateuser(userInfo.getName());
					 ldStationService.InsertCD(bean);
				 }
				 
				 CorrectRecored CRbean = new CorrectRecored();
				 
				 CRbean.setCorrector(userInfo.getName());
				 CRbean.setPartid(partid);
				 
				 CRbean.setCorrecttype(Short.parseShort("0"));
				 CRbean.setReason(reason);
				 
				 String updateRecord="";
				 
				 updateRecord="新测点"+point+":";
				 
				 if(!theory.equals(bfCalculateht)){
					 updateRecord=updateRecord+"理论高程为"+theory + ";";
				 }
				 
				 if(!theoryX.equals(bfllX)){
					 updateRecord=updateRecord+"理论X值为"+theoryX + ";";
				 }
				 
				 if(!theoryY.equals(bfllY)){
					 updateRecord=updateRecord+"理论Y值为"+theoryY + ";";
				 }
				 
				 CRbean.setRecord(updateRecord);
				 CRbean.setMileageflag(Short.parseShort(miletype));
				 ldStationService.Insert(CRbean);
				 
				 //测点表中更新时间的修正
				 InitPoint bInitPoint = new InitPoint();
				 if(bean.getInitpointid() != null){
					 bInitPoint.setInitpointid(bean.getInitpointid());
					 initPointMapper.UpdateByinitPoint(bInitPoint);
				 }

				 return new ResultBean<String>(0, "成功", "测点信息修正");
			}
		 
		 
	 }
	 
	 /**
	  * 获取修正记录信息
	  * @param strPier
	  * @return
	  */
	 @RequestMapping(value = "getCorrectRecordValue", method = { RequestMethod.GET, RequestMethod.POST })
	 @ResponseBody
	 public ResultBean<CorrectRecoredList> getCorrectRecordValue(String conBeamId,String partid,String mileflag) {
		 
		 CorrectRecoredList CRListItem = new CorrectRecoredList();
		 try {
			 
			 // 调用连续梁接口通过连续梁ID获取信息
			 Lxl lxl = lxlMapper.findById(Long.parseLong(conBeamId));
			 // 通过连续梁标的标段ID去标段表的标段name
			 ProjectSection projectSec = projectSectionMapper.selectProjectSectionByID(lxl.getSectionid());
			 // 通过连续梁表的项目ID去项表的项目name
			 ProjectInfo projectInfo = projectInfoMapper.findById(lxl.getProjectinfoid());
			 
			 CorrectRecored condition = new CorrectRecored();
			 condition.setPartid(Long.parseLong(partid));
			 condition.setMileageflag(Short.parseShort(mileflag));
			 // 获取片区信息
			 List<CorrectRecored> CRItem = ldStationService.selectByPartid(condition);
			 
			 CRListItem.setLxlName(lxl.getName());
			 CRListItem.setProinfoName(projectInfo.getNameabbr());
			 CRListItem.setProsectionName(projectSec.getName());
			 CRListItem.setRecordList(CRItem);
			 
			 return new ResultBean<CorrectRecoredList>(0, "成功", CRListItem);
		} catch (Exception e) {
			return new ResultBean<CorrectRecoredList>(1, "操作异常，请联系管理员！", CRListItem);
		}
		 
	 }
}
