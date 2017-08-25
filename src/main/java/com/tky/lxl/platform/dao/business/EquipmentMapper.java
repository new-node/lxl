package com.tky.lxl.platform.dao.business;

import java.util.List;
import java.util.Map;

import com.tky.lxl.platform.model.business.Equipment;

/**
 * 
 * <p>Title:EquipmentMapper </p>
 * <p>Description: 仪器设备mapper</p>
 * <p>Company: 铁科院</p> 
 *
 * @author yushanli（2017年3月6日 下午1:28:26）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public interface EquipmentMapper {
	/**
	 * 检索仪器设备表
	 * @param condition检索条件
	 * @return
	 */
	List<Equipment> queryEquipment(Map<String,Object> m);

	/**
	 * 检索仪器设备数量
	 * @param condition检索条件
	 * @return
	 */
	int queryEquipmentCount(Map<String,Object> m);

	/**
	 * 向仪器设备表插入数据
	 * @param record插入对象
	 */
	void insertEquipment(Equipment record);

	/**
	 * 向仪器设备表更新数据
	 * @param record插入对象
	 */
	void updateEquipment(Equipment record);
}
