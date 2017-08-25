package com.tky.lxl.platform.controller.business;

import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.tky.lxl.platform.aop.UserOperateLog;
import com.tky.lxl.platform.finals.Const;
import com.tky.lxl.platform.finals.URLConst;
import com.tky.lxl.platform.model.Page;
import com.tky.lxl.platform.model.business.Equipment;
import com.tky.lxl.platform.model.system.UserInfo;
import com.tky.lxl.platform.service.business.CategoryItemService;
import com.tky.lxl.platform.service.business.EquipmentService;
import com.tky.lxl.platform.service.business.ProjectInfoService;
import com.tky.lxl.platform.service.business.ProjectSectionService;
import com.tky.lxl.platform.utils.ResultBean;

/**
 * 
 * <p>Title: EquipmentController</p>
 * <p>Description: 仪器设备</p>
 * <p>Company: 铁科院</p> 
 *
 * @author yushanli（2017年3月5日 下午8:43:00）
 *
 * @version:1.0.0 copyright © 2017-2018
 */

@Controller
@RequestMapping("/equipment")
public class EquipmentController {

	// 片区service
	@Resource
	private CategoryItemService categoryItemService;
	// 项目信息service
	@Resource
	private ProjectInfoService projectInfoService;
	// 标段信息service
	@Resource
	private ProjectSectionService projectSectionService;
	@Resource
	private EquipmentService equipmentService;

	// private static
	@RequestMapping("getEquipment")
	public String getEquipment(Model model) {

		return URLConst.URL_EQUIPMENT;
	}

	/**
	 * 获取仪器设备列表的数据
	 * @return
	 */
	@RequestMapping(value = "getEquipmentList", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public ResultBean<Page> getAllEquipmentList(String cateId, String projectInfoId, String projectSectionId,
			Integer pageNo) {
		Equipment condition = new Equipment();
		Map<String,Object> m = new HashMap<>();
		// 设置检索条件
		if (cateId != null && !cateId.isEmpty() && !Const.CommonChar.ZERO.equals(cateId)) {
			condition.setCategoryid(cateId);// 设置片区
			m.put("categoryid", cateId.split(","));
		}
		if (projectInfoId != null && !projectInfoId.isEmpty() && !Const.CommonChar.ZERO.equals(projectInfoId)) {
			condition.setProjectid(Long.parseLong(projectInfoId));// 设置项目
			m.put("projectid", projectInfoId);
		}
		if (projectSectionId != null && !projectSectionId.isEmpty() && !Const.CommonChar.ZERO.equals(projectSectionId)) {
			condition.setSectionid(projectSectionId);// 设置标段
			if (projectSectionId!=null&&!projectSectionId.equals("")) {
				m.put("sectionid", projectSectionId.split(","));
			}
		}
		// 判断是否为第一页
		if (pageNo == null) {
			condition.setPageNo(Const.DEFAULT_PAGE);
			m.put("pageNo", Const.DEFAULT_PAGE);
		} else {
			condition.setPageNo(pageNo);
			m.put("pageNo",pageNo);
		}
		ResultBean<Page> result = new ResultBean<Page>(0, "成功", equipmentService.getEquipment(m));
		return result;
	}

	/**
	 * 向仪器设备表插入数据
	 * @param shebeiname设备名称
	 * @param type设备类型
	 * @param xinghao仪器型号
	 * @param changshang生产厂商
	 * @param dater下次校验日期
	 * @param biaoduan标段
	 * @param pianqu片区
	 * @param xiangmu项目
	 */
	@UserOperateLog(description = "向仪器设备表插入数据")
	@RequestMapping(value = "addEquipment", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public void addEquipment(String shebeiname, String type, String xinghao, String changshang, String dater,
			String biaoduan, String pianqu, String xiangmu,HttpSession session) {
		Equipment condition = new Equipment();
		
		UserInfo userInfo = (UserInfo)session.getAttribute(Const.SessionKey.USER_INFO);

		if (shebeiname != null && !shebeiname.isEmpty()) {
			condition.setName(shebeiname);// 设置设备名称
		}
		if (type != null && !type.isEmpty()) {
			condition.setEqutype(Short.parseShort(type));// 设备类型
		}
		if (xinghao != null && !xinghao.isEmpty()) {
			condition.setModelno(xinghao);// 设置型号
		}
		if (changshang != null && !changshang.isEmpty()) {
			condition.setMaker(changshang);// 设置生产厂商
		}
		if (dater != null && !dater.isEmpty()) {
			Date date = new Date(Long.parseLong(dater));
			condition.setCheckupdatetime(date);// 设置下次校验日期
		}
		if (biaoduan != null && !biaoduan.isEmpty()) {
			condition.setSectionid(biaoduan);// 设置标段ID
		}
		if (pianqu != null && !pianqu.isEmpty()) {
			condition.setCategoryid(pianqu);// 设置片区ID
		}
		if (xiangmu != null && !xiangmu.isEmpty()) {
			condition.setProjectid(Long.parseLong(xiangmu));// 设置项目ID
		}
		
		if(userInfo != null){
		    condition.setCreatename(userInfo.getName());
		    condition.setCreateaccount(userInfo.getAccount());
		}
		
		condition.setUseflag(Short.parseShort(Const.CommonChar.ZERO));
		equipmentService.addEquipment(condition);

	}

	/**
	 * 更新仪器设备表
	 * @param updateEquipmentStr仪器设备model的json字符串
	 */
    @UserOperateLog(description = "更新或删除仪器设备表")
	@RequestMapping(value = "updateEquipment", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public void updateEquipment(String updateEquipmentStr,HttpSession session) {
		List<Equipment> condition = JSON.parseArray(updateEquipmentStr, Equipment.class);// json转换为类型
		UserInfo userInfo = (UserInfo)session.getAttribute(Const.SessionKey.USER_INFO);
		for (Equipment record : condition) {
		    if(userInfo != null){
		        record.setUpdatename(userInfo.getName());
		        record.setUpdateaccount(userInfo.getAccount());
		    }
			equipmentService.updateEquipment(record);
		}

	}
}
