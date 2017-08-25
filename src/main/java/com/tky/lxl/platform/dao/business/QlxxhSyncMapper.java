package com.tky.lxl.platform.dao.business;

import com.tky.lxl.platform.model.business.Centrespan;
import com.tky.lxl.platform.model.business.Lxl;
import com.tky.lxl.platform.model.business.PierBody;
import com.tky.lxl.platform.model.business.Segment;

/**
 * 
 * <p>Title: QlxxhSyncMapper</p>
 * <p>Description: 桥梁形象化同步DAO</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年4月8日 上午10:19:12）
 *
 * @version:1.0.0 copyright  2017-2018
 */
public interface QlxxhSyncMapper {

	/**
	 * 同步连续梁
	 * @param lxl
	 */
	public void saveOrUpdateLxl(Lxl lxl);

	/**
	 * 同步梁段表--中跨的数据
	 * @param centrespan
	 */
	public void saveOrUpdateLdCentrespan(Centrespan centrespan);

	/**
	 * 同步梁段表--节段的数据
	 * @param segment
	 */
	public void saveOrUpdateLdSegment(Segment segment);

	/**
	 * 同步墩身信息
	 * @param pierBody
	 */
	public void saveOrUpdatePierBody(PierBody pierBody);

}
