package com.tky.lxl.platform.serviceimpl.business;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tky.lxl.platform.dao.business.EquipmentMapper;
import com.tky.lxl.platform.model.Page;
import com.tky.lxl.platform.model.business.Equipment;
import com.tky.lxl.platform.service.business.EquipmentService;

/**
 * <p>Title: EquipmentServiceImpl</p>
 * <p>Description: 仪器设备service</p>
 * <p>Company: 铁科院</p> 
 *
 * @author yushanli（2017年3月6日 下午2:10:13）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Service("equipmentService")
public class EquipmentServiceImpl implements EquipmentService {

	@Resource
	private EquipmentMapper equipmentMapper;

	@Override
	public Page getEquipment(Map<String,Object> condition) {
		
		List<Equipment> list = new ArrayList<Equipment>();
		
		// 创建分页的page对象
		Page page = new Page();
		try {
			
			int count = equipmentMapper.queryEquipmentCount(condition);
			page.setPageNo((Integer)condition.get("pageNo"));
			page.setTotalCount(count);
			
			// 获得开始行号和结束行号
			Integer startNum = page.getStartNum();
			Integer endNum = page.getEndNum();
//			condition.setStartNum(startNum);
//			condition.setEndNum(endNum);
			condition.put("startNum", startNum);
			condition.put("endNum",endNum);
		/*
		 * 
		 * 	private int startNum = 0;
		 * 
		 * 
		 * 
		 */
			page.setStartNum(startNum);
			page.setEndNum(endNum);
			
			list = equipmentMapper.queryEquipment(condition);
			page.setList(list);
		} catch (Exception e) {
			e.printStackTrace();
			// return new ResultBean<String>(-1, "操作异常！", "同步失败，请联系管理员！");
		}
		return page;
	}

	@Override
	public void updateEquipment(Equipment record) {
		
		try {
			
			equipmentMapper.updateEquipment(record);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void addEquipment(Equipment record) {
		
		try {
			equipmentMapper.insertEquipment(record);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
