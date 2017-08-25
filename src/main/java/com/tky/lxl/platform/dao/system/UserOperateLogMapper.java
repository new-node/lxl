package com.tky.lxl.platform.dao.system;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import com.tky.lxl.platform.model.system.UserOperate;

/**
 * 
 * <p>Title:UserOperateLogMapper </p>
 * <p>Description: 用户操作记录的Mapper接口</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年2月28日 下午4:09:01）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Repository("userOperateLogMapper")
public interface UserOperateLogMapper {

	/**
	 * 将用户的操作信息记录到数据库
	 * @param userOperate
	 */
	public void add(@Param(value="userOperate")UserOperate userOperate);

}
