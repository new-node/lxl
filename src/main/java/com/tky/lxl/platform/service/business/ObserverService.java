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
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.tky.lxl.platform.model.Page;
import com.tky.lxl.platform.model.business.Observer;
import com.tky.lxl.platform.utils.ResultBean;

/**
 * <p>Title: ObserverService</p>
 * <p>Description: 标段管理员 设置观测人员</p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年3月15日 上午09:04:44）
 *
 * @version:1.0.0 copyright  2017-2018
 */
public interface ObserverService {
	
	/**
	 * 获取观测人员列表
	 * 
	 * @param condition检索条件
	 * @return
	 */
	public ResultBean<Page> getObserver(Map<String,Object> m);
	/**
	 * 查询观测人员
	 * 
	 * @param managerUser - 标段管理员
	 * @param useFlag - 是否在用
	 * 
	 * @return
	 */
	public ResultBean<List<Observer>> searchObserver(Long sectionId, Short useFlag);
	
	/**
	 * 设为观测人员(保存)
	 * 
	 * @param observer - 观测人员
	 * @return
	 */
	public ResultBean<List<Observer>> saveObserver(Observer observer);

	/**
	 * 取消观测人员
	 * 
	 * @param observer - 观测人员
	 * @return
	 */
	public ResultBean<List<Observer>> cancelObserver(Observer observer);
	
	/**
	 * 上传上岗证书
	 * 
	 * @param file - 上岗证书文件
	 * @param fileName - 保存文件名
	 * @return
	 */
	public String upload(MultipartFile file, String fileName);
}
