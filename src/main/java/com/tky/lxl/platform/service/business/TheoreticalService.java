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

import java.util.List;

import com.tky.lxl.platform.model.business.CD;
import com.tky.lxl.platform.model.business.Dictionary;
import com.tky.lxl.platform.model.business.InitPoint;
import com.tky.lxl.platform.model.business.LD;

/**
 * <p>Title: EquipmentService</p>
 * <p>Description: 维护理论值service</p>
 * <p>Company: 铁科院</p> 
 *
 * @author lihongcui（2017年3月6日 下午2:06:26）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public interface TheoreticalService {
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
	* @param condition更新条件
	* @return
	*/
	public void setCDItem(CD condition);
	
	/**
	* 取得测点表信息
	* @param condition更新条件
	* @return
	*/
	public List<CD> getCDItem(CD condition);
	
	/**
	* 更新梁段表
	*/
	public LD selectLdMileageflag(LD condition);

   /**
    * 通过梁段ID获取大小里程
    * @param beam
    * @return
    */
   public int getMiletype(int beam);

   /**
    * 判断该测点是否已经测量
    * @param conbeamid
    * @param beam  梁段ID
    * @param condition  工况
    * @return
    */
public Boolean isTest(Long conbeamid, Long beam, Short condition);

/**
 * 获取测点信息
 * @param conbeamid
 * @param beam
 * @param ptype
 * @param point
 * @return
 */
public InitPoint getInitPointMessage(Long conbeamid, Long beam, Short ptype, Short point,String miletype);
}
