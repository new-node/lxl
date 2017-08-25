/**
 * <p>Title:EquipmentService </p>
 * <p>Description: </p>
 * <p>Company: 铁科院</p> 
 *
 * @author yushanli（2017年3月6日 下午2:06:26）
 *
 * @version:1.0.0 copyright  2017-2018
 *
 */
package com.tky.lxl.platform.service.business;

import java.util.Map;

import com.tky.lxl.platform.model.Page;
import com.tky.lxl.platform.model.business.Equipment;

/**
 * <p>Title:EquipmentService </p>
 * <p>Description: 仪器设备service</p>
 * <p>Company: 铁科院</p> 
 *
 * @author yushanli（2017年3月6日 下午2:06:26）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public interface EquipmentService {
	/**
	 * 获取仪器设备列表
	 * @param condition检索条件
	 * @return
	 */
	public Page getEquipment(Map<String,Object> m);

	/**
	 * 向仪器设备表逻辑删除或者更新数据
	 * @param record更新对象
	 */
	public void updateEquipment(Equipment record);

	/**
	 * 向仪器设备表插入数据
	 * @param record插入对象
	 */
	public void addEquipment(Equipment record);
}
