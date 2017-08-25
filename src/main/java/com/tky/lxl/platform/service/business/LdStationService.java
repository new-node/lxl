/**
 * <p>Title:EquipmentService </p>
 * <p>Description: </p>
 * <p>Company: 铁科院</p> 
 *
 * @author yushanli（2017年3月6日 下午2:06:26）
 *
 * @version:1.0.0 copyright	2017-2018
 *
 */
package com.tky.lxl.platform.service.business;

import java.util.List;

import com.tky.lxl.platform.model.business.CD;
import com.tky.lxl.platform.model.business.CorrectRecored;
import com.tky.lxl.platform.model.business.Dictionary;
import com.tky.lxl.platform.model.business.InitPoint;
import com.tky.lxl.platform.model.business.LD;

/**
 * <p>Title:LdStationService </p>
 * <p>Description: 梁段测点Service</p>
 * <p>Company: 铁科院</p> 
 *
 * @author lihongcui（2017年3月9日 上午11:11:46）
 *
 * @version:1.0.0 copyright	2017-2018
 */
public interface LdStationService {
	/**
	 * 获取T-构列表
	 * @param condition检索条件
	 * @return
	 */
	public List<LD> getPierItem(LD condition);
	
	/**
	* 获取梁段列表
	* @param condition检索条件
	* @return
	*/
	public List<LD> getPartNameItem(LD condition);
	
	/**
	 * 获取测点信息
	 * @param condition检索条件
	 * @return
	 */
	 public List<CD> getldStationValue(CD condition);
	 
	 /**
	* 通过测点号获取测点信息
	* @param condition检索条件
	* @return
	*/
	public List<CD> getCDByPoint(CD condition);

	/**
	 * 获取施工状况列表
	 * @param condition检索条件
	 * @return
	 */
 public List<Dictionary> getGkbmItem();
 
 /**
	* 获取初始化测点信息
	*/
 public List<InitPoint> getInitPointInfo(InitPoint condition);
 
 /**
	 * 更新测点表
	 * @param condition
	 */
	public void UpdateCD(CD condition);
	
	/**
	 * 插入测点表
	 * @param condition
	 */
	public void InsertCD(CD condition);

	/**
	* 检索修正记录表	
	* @param condition
	* @return
	*/
	public List<CorrectRecored> selectByPartid(CorrectRecored condition);

	/**
	* @param condition
	*/
	public void Insert(CorrectRecored condition);

	/**
	 * @param condition
	 */
	public void Update(CorrectRecored condition);
	
	/**
	 * 梁段略称取得
	 */
	public List<LD> getldShortname(Long id);
	
}
