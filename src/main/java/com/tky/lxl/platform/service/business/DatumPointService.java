package com.tky.lxl.platform.service.business;

import com.tky.lxl.platform.model.Page;
import com.tky.lxl.platform.model.business.DatumPoint;
import com.tky.lxl.platform.model.business.DatumPointRecordList;
import com.tky.lxl.platform.model.system.UserInfo;
import com.tky.lxl.platform.utils.ResultBean;

/**
 * <p>Title:TBaseService </p>
 * <p>Description: 基准点表Service</p>
 * <p>Company: 铁科院</p> 
 *
 * @author yushanli（2017年3月7日 下午5:07:43）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public interface DatumPointService {
	/**
	 * 更新基准点表
	 * @param record更新对象
	 * @param 修正原因
	 */
	public void updateTBase(DatumPoint record, String changeReason,UserInfo userInfo);

	/**
	 * 插入基准点表
	 * @param record插入对象
	 */
	public void insertTBase(DatumPoint record, UserInfo userInfo);

	/**
	 * 获取基准点表所有数据
	 * @return
	 */
	public ResultBean<Page> getTBase(DatumPoint condition);

	/**
	 * 通过ID获取页面修正记录头部显示数据
	 * @Param lxlid连续梁ID
	 * @param baseid基准点ID
	 * @return
	 */
	public ResultBean<DatumPointRecordList> getChangeRecordHead(Long lxlid, Long baseid);

	/**
	 * 逻辑删除基准点表
	 * @param record更新对象
	 */
	public void deleteTBase(DatumPoint record);

	/**
	 * 更新连续梁工作基点总数
	 * 
	 * @param record 基点对象
	 * @param isAddFlg 判断基点删除还是插入，ture：插入 false：删除
	 */
//	public void updateLxlPoint(DatumPoint record,Boolean isAddFlg);
}
