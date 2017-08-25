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
import org.springframework.web.bind.annotation.ResponseBody;

import com.tky.lxl.platform.dao.business.LxlMapper;
import com.tky.lxl.platform.dao.business.ProjectInfoMapper;
import com.tky.lxl.platform.dao.business.ProjectSectionMapper;
import com.tky.lxl.platform.dao.business.SggsMapper;
import com.tky.lxl.platform.model.business.LxlDetailCount;
import com.tky.lxl.platform.model.business.LxlProjectCount;
import com.tky.lxl.platform.model.business.LxlTotalCount;
import com.tky.lxl.platform.model.business.WarnInfo;
import com.tky.lxl.platform.service.business.LxlCountService;
import com.tky.lxl.platform.utils.ResultBean;
/**
 * 
 * <p>Title:HomeProjectController </p>
 * <p>Description: 项目首页</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年3月28日 下午8:07:37）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Controller
@RequestMapping("/pro")
public class HomeProjectController {

	@Resource
	private LxlCountService lxlCountService;
	@Resource
	private LxlMapper lxlMapper;
	@Resource
	private SggsMapper sggsMapper;
	@Resource
	private ProjectSectionMapper projectSectionMapper;
	@Resource
	private ProjectInfoMapper projectInfoMapper;
	
	/**
	 * 按标段进行统计
	 */
	@RequestMapping("/getBiaoDuanInfo")
	@ResponseBody
	public ResultBean<List<LxlProjectCount>> getBiaoDuanInfo(WarnInfo condition){
		List<LxlProjectCount> lxlItem = new ArrayList<LxlProjectCount>();
		Map<String,Object> m = new HashMap<>();
		if (condition.getProjectid()!=null) {
			m.put("projectid", condition.getProjectid());
		}
			if(condition.getConbeamid()!=null){
			m.put("conbeamid", condition.getConbeamid().split(","));
		}
		try {
			lxlItem = lxlCountService.selectBiaoDuanInfo(m);
			if (lxlItem.size() > 0) {
				return new ResultBean<List<LxlProjectCount>>(0, "成功", lxlItem);
			} else {
				return new ResultBean<List<LxlProjectCount>>(1, "数据不存在！", lxlItem);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return new ResultBean<List<LxlProjectCount>>(1, "操作异常，请联系管理员！", lxlItem);
		}
	}
	
	/**
	 * 各标超限数 超限连续梁，超限梁段统计
	 */
	@RequestMapping(value = "/getWarnInfo", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public ResultBean<List<LxlProjectCount>> getWarnInfo(String projectid,String conbeamid,String sttime,String endtime) {
		Map<String,Object> m = new HashMap<>();
		// 偏差超限
//		WarnInfo condition = new WarnInfo();
		//项目ID
//		condition.setProjectid(projectid);
		m.put("projectid", projectid);
		//连续梁ID
//		condition.setConbeamid(conbeamid);
		if (conbeamid!=null&&!conbeamid.equals("")) {
			m.put("conbeamid", conbeamid.split(","));
		}
		//起始时间
		if(sttime!=null && !"".equals(sttime.trim())){
//			condition.setSttime(sttime);
			m.put("sttime",sttime);
		}
		//终了时间
		if(endtime!=null &&  !"".equals(endtime.trim())){
//			condition.setEndtime(endtime);
			m.put("endtime",endtime);
		}
		
		//超限连续梁统计
		ResultBean<List<LxlProjectCount>> lxlProItem = lxlCountService.selectWarnInfo(m);
		
		return lxlProItem;
	}
	
	/**
	 * 超限处置进度 超限连续梁梁段信息统计
	 * @param strBeamId
	 * @return
	 */
	@RequestMapping(value = "getCxlxlCount", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public ResultBean<LxlProjectCount> getCxlxlCount(String projectid,String conbeamid) {
		
		// 偏差超限
		WarnInfo condition = new WarnInfo();
		Map<String,Object> m = new HashMap<>();
		m.put("projectid", projectid);
		if (conbeamid!=null&&!conbeamid.equals("")) {
			m.put("conbeamid", conbeamid.split(","));
		}
		//项目ID
		condition.setProjectid(projectid);
		//连续梁ID
		condition.setConbeamid(conbeamid);
		ResultBean< LxlProjectCount> LxlItem = lxlCountService.selectCxlxlldCount(m);
		
		return LxlItem;
	}
	
	/**
	 * 查询主跨跨度小于60的数据
	 * @return
	 */
	@RequestMapping(value="/select60CountByPro/{conbeamid}",method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public LxlDetailCount select60CountByPro(Long projectId,@PathVariable String conbeamid){
//		condition.setCacheKey("proselect60CountByPro"+condition.getProjectid());
		Map<String,Object> m = new HashMap<>();
//		m.put("cacheKey", "proselect60CountByPro"+condition.getProjectid());
		m.put("projectid", projectId);
		if(conbeamid!=null&&!conbeamid.equals("")){
		m.put("conbeamid", conbeamid.split(","));	
		}
		LxlDetailCount lxlDetailCount=lxlCountService.select60Count(m);
		return lxlDetailCount;
	}
	
	/**
	 * 查询主跨跨度大于等于60小于80的数据
	 * @return
	 */
	@RequestMapping(value="/select80CountByPro/{conbeamid}", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public LxlDetailCount select80CountByPro(Long projectId, @PathVariable String conbeamid){
//		public LxlDetailCount select80CountByPro(HomeCondition condition){
//		condition.setCacheKey("proselect80CountByPro"+condition.getProjectid());
		Map<String,Object> m =new HashMap<>();
//		m.put("cacheKey","proselect80CountByPro"+condition.getProjectid());
		m.put("projectid",projectId);
		if(conbeamid!=null&&!conbeamid.equals("")){
			m.put("conbeamid", conbeamid.split(","));	
			}
		LxlDetailCount lxlDetailCount=lxlCountService.select80Count(m);
		return lxlDetailCount;
	}
	
	/**
	 * 查询主跨跨度大于等于80小于100的数据
	 * @return
	 */
	@RequestMapping(value="/select100CountByPro/{conbeamid}", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public LxlDetailCount select100CountByPro(Long projectid,@PathVariable String conbeamid){
//		condition.setCacheKey("proselect100CountByPro"+condition.getProjectid());
		Map<String,Object> m = new HashMap<>();
//		m.put("cacheKey", "proselect100CountByPro"+condition.getProjectid());
		m.put("projectid", projectid);
		if(conbeamid!=null&&!conbeamid.equals("")){
			m.put("conbeamid", conbeamid.split(","));	
			}
		LxlDetailCount lxlDetailCount=lxlCountService.select100Count(m);
		return lxlDetailCount;
	}
	
	/**
	 * 查询主跨跨度大于等于100小于120的数据
	 * @return
	 */
	@RequestMapping(value="/select120CountByPro/{conbeamid}", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public LxlDetailCount select120CountByPro(Long projectid,@PathVariable String conbeamid){
//		condition.setCacheKey("proselect120CountByPro"+condition.getProjectid());
		Map<String,Object> m = new HashMap<>();
//		m.put("cacheKey", "proselect120CountByPro"+condition.getProjectid());
		m.put("projectid", projectid);
		if(conbeamid!=null&&!conbeamid.equals("")){
			m.put("conbeamid", conbeamid.split(","));	
			}
		LxlDetailCount lxlDetailCount=lxlCountService.select120Count(m);
		return lxlDetailCount;
	}
	
	/**
	 * 查询主跨跨度大于120的数据
	 * @return
	 */
	@RequestMapping(value="/selectElseCountByPro/{conbeamid}", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public LxlDetailCount selectElseCountByPro(Long projectid,@PathVariable String conbeamid){
//		condition.setCacheKey("proselectElseCountByPro"+condition.getProjectid());
		Map<String,Object> m = new HashMap<>();
//		m.put("cacheKey", "proselectElseCountByPro"+condition.getProjectid());
		m.put("projectid", projectid);
		if(conbeamid!=null&&!conbeamid.equals("")){
			m.put("conbeamid", conbeamid.split(","));	
			}
		LxlDetailCount lxlDetailCount=lxlCountService.selectElseCount(m);
		return lxlDetailCount;
	}
	
	/**
	 * 查询连续梁主跨跨度的整体统计
	 * @return
	 */
	@RequestMapping(value="/selectLxlTotalCountByPro/{conbeamid}", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public LxlTotalCount selectLxlTotalCountByPro(Long projectid,@PathVariable String conbeamid){
//		condition.setCacheKey("proselectLxlTotalCountByPro"+condition.getProjectid());
		Map<String,Object> m = new HashMap<>();
//		m.put("cacheKey", "proselectLxlTotalCountByPro"+condition.getProjectid().split(","));
		m.put("projectid", projectid);
		if(conbeamid!=null&&!conbeamid.equals("")){
			m.put("conbeamid", conbeamid.split(","));	
			}
		LxlTotalCount lxlTotalCount = lxlCountService.selectLxlTotalCount(m);
		return lxlTotalCount;
	}

}
