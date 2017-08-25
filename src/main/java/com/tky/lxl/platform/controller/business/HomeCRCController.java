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

import com.tky.lxl.platform.model.business.CategoryItem;
import com.tky.lxl.platform.model.business.HomeCondition;
import com.tky.lxl.platform.model.business.LxlDetailCount;
import com.tky.lxl.platform.model.business.LxlMonitorStatusCount;
import com.tky.lxl.platform.model.business.LxlPianquCount;
import com.tky.lxl.platform.model.business.LxlTotalCount;
import com.tky.lxl.platform.service.business.CategoryItemService;
import com.tky.lxl.platform.service.business.LxlCountService;
import com.tky.lxl.platform.utils.ResultBean;

/**
 * 
 * <p>Title: HomeCRCController</p>
 * <p>Description: 中国铁路总公司首页</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年2月11日 下午3:05:55）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Controller
@RequestMapping("/crc")
public class HomeCRCController {

	@Resource
	private LxlCountService lxlCountService;
	@Resource
	private CategoryItemService categoryItemService;
	
	/**
	 * 查询主跨跨度小于60的数据
	 * @return
	 */
	@RequestMapping(value="/select60Count/{conbeamid}",method={RequestMethod.POST})
	@ResponseBody
	public LxlDetailCount select60Count(@PathVariable String conbeamid){
//		HomeCondition condition = new HomeCondition();
//		condition.setCacheKey("crcselect60Count");
//		condition.setConbeamid(conbeamid);
		Map<String,Object> m = new HashMap<>();
		if (conbeamid!=null&&!conbeamid.equals("")) {
			m.put("conbeamid", conbeamid.split(","));
		}
		LxlDetailCount lxlDetailCount=lxlCountService.select60Count(m);
		return lxlDetailCount;
	}
	
	/**
	 * 查询主跨跨度大于等于60小于80的数据
	 * @return
	 */
	@RequestMapping(value="/select80Count/{conbeamid}",method={RequestMethod.POST})
	@ResponseBody
	public LxlDetailCount select80Count(@PathVariable String conbeamid){
		HomeCondition condition = new HomeCondition();
//		condition.setCacheKey("crcselect80Count");
		condition.setConbeamid(conbeamid);
		Map<String,Object> m =new HashMap<>();
		if (conbeamid!=null&&!conbeamid.equals("")) {
			m.put("conbeamid", conbeamid.split(","));
		}
		LxlDetailCount lxlDetailCount=lxlCountService.select80Count(m);
		return lxlDetailCount;
	}
	
	/**
	 * 查询主跨跨度大于等于80小于100的数据
	 * @return
	 */
	@RequestMapping(value="/select100Count/{conbeamid}",method={RequestMethod.POST})
	@ResponseBody
	public LxlDetailCount select100Count(@PathVariable String conbeamid){
		HomeCondition condition = new HomeCondition();
//		condition.setCacheKey("crcselect100Count");
		condition.setConbeamid(conbeamid);
		Map<String,Object> m =new HashMap<>();
		if (conbeamid!=null&&!conbeamid.equals("")) {
			m.put("conbeamid", conbeamid.split(","));
		}
		LxlDetailCount lxlDetailCount=lxlCountService.select100Count(m);
		return lxlDetailCount;
	}
	
	/**
	 * 查询主跨跨度大于等于100小于120的数据
	 * @return
	 */
	@RequestMapping(value="/select120Count/{conbeamid}",method={RequestMethod.POST})
	@ResponseBody
	public LxlDetailCount select120Count(@PathVariable String conbeamid){
		HomeCondition condition = new HomeCondition();
//		condition.setCacheKey("crcselect120Count");
		condition.setConbeamid(conbeamid);
		Map<String,Object> m = new HashMap<>();
		if (conbeamid!=null&&!conbeamid.equals("")) {
			m.put("conbeamid", conbeamid.split(","));
		}
		LxlDetailCount lxlDetailCount=lxlCountService.select120Count(m);
		return lxlDetailCount;
	}
	
	/**
	 * 查询主跨跨度大于120的数据
	 * @return
	 */
	@RequestMapping(value="/selectElseCount/{conbeamid}",method={RequestMethod.POST})
	@ResponseBody
	public LxlDetailCount selectElseCount(@PathVariable String conbeamid){
		HomeCondition condition = new HomeCondition();
//		condition.setCacheKey("crcselectElseCount");
		condition.setConbeamid(conbeamid);
		Map<String,Object> m = new HashMap<>();
		if (conbeamid!=null&&!conbeamid.equals("")) {
			m.put("conbeamid", conbeamid.split(","));
		}
		LxlDetailCount lxlDetailCount=lxlCountService.selectElseCount(m);
		return lxlDetailCount;
	}
	
	/**
	 * 查询连续梁主跨跨度的整体统计
	 * @return
	 */
	@RequestMapping(value="/selectLxlTotalCount/{conbeamid}",method={RequestMethod.POST})
	@ResponseBody
	public LxlTotalCount selectLxlTotalCount(@PathVariable String conbeamid){
		HomeCondition condition = new HomeCondition();
//		condition.setCacheKey("crcselectLxlTotalCount");
		condition.setConbeamid(conbeamid);
		Map<String,Object> m = new HashMap<>();
		if (conbeamid!=null&&!conbeamid.equals("")) {
			m.put("conbeamid", conbeamid.split(","));
		}
		LxlTotalCount lxlTotalCount = lxlCountService.selectLxlTotalCount(m);
		return lxlTotalCount;
	}
	/**
	 * 连续梁监控状态统计
	 * @return
	 */
	@RequestMapping("/lxlMonitorStatusCount")
	@ResponseBody
	public LxlMonitorStatusCount selectLxlMonitorStatusCount(){
		HomeCondition condition = new HomeCondition();
//		condition.setCacheKey("crcslxlMonitorStatusCount");
		LxlMonitorStatusCount  lxlMonitorStatusCount = lxlCountService.selectLxlMonitorStatusCount(condition);
		return lxlMonitorStatusCount;
	}
	
	
	/**
	 * 片区汇总
	 */
	@RequestMapping("/selectLxlCountbyPianqu")
	@ResponseBody
	public ResultBean<List<LxlPianquCount>> selectLxlCountbyPianqu(String conbeamid){
		List<LxlPianquCount> lxlPianqu = new ArrayList<LxlPianquCount>();
		
		try {
			
			Map<String,Object> m = new HashMap<>();
			if (conbeamid!=null && !"".equals(conbeamid)) {
				m.put("conbeamid", conbeamid.split(","));
			}
			lxlPianqu = lxlCountService.selectPianquInfo(m);
			
			if (lxlPianqu.size() > 0) {
				return new ResultBean<List<LxlPianquCount>>(0, "成功", lxlPianqu);
			} else {
				return new ResultBean<List<LxlPianquCount>>(1, "数据不存在！", lxlPianqu);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return new ResultBean<List<LxlPianquCount>>(1, "操作异常，请联系管理员！", lxlPianqu);
		}
	}
	
	
	/**
	 * 获取片区的数据
	 * @return
	 */
	@RequestMapping("/getCategoryItem")
	@ResponseBody
	public ResultBean<List<CategoryItem>> getCategoryItem() {
		List<CategoryItem> categoryItem = new ArrayList<CategoryItem>();
		try {
		 // 获取片区信息
			categoryItem = categoryItemService.getCategoryItem();
			
			if (categoryItem.size() > 0) {
				return new ResultBean<List<CategoryItem>>(0, "成功", categoryItem);
			} else {
				return new ResultBean<List<CategoryItem>>(1, "数据不存在！", categoryItem);
			}
		} catch (Exception e) {
			return new ResultBean<List<CategoryItem>>(1, "操作异常，请联系管理员！", categoryItem);
		}
	}
	
	
	/**
	 * 按项目进行统计
	 */
	@RequestMapping("/selectLxlCountbyProject")
	@ResponseBody
	public ResultBean<List<LxlPianquCount>> selectLxlCountbyProject(Integer id,String conbeamid){
		
		List<LxlPianquCount> lxlItem = new ArrayList<LxlPianquCount>();
		try {
			LxlPianquCount condition=new LxlPianquCount();
			condition.setCategoryid(id);
			condition.setConbeamid(conbeamid);
			Map<String,Object> m =new HashMap<>();
			if (conbeamid!=null&&conbeamid.equals("")) {
				m.put("conbeamid", conbeamid.split(","));
			}
			m.put("categoryid", id);
			lxlItem= lxlCountService.selectItemInfo(m);
			if (lxlItem.size() > 0) {
				return new ResultBean<List<LxlPianquCount>>(0, "成功", lxlItem);
			} else {
				return new ResultBean<List<LxlPianquCount>>(1, "数据不存在！", lxlItem);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return new ResultBean<List<LxlPianquCount>>(1, "操作异常，请联系管理员！", lxlItem);
		}
	}
}
