package com.tky.lxl.platform.serviceimpl.system;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tky.lxl.platform.dao.system.UserOperateLogMapper;
import com.tky.lxl.platform.model.system.UserOperate;
import com.tky.lxl.platform.service.system.UserOperateLogService;
/**
 * <p>Title: UserOperateLogServiceImpl</p>
 * <p>Description: 用户操作记录的service实现类</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年2月28日 下午4:09:41）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Service("userOperateLogService")
public class UserOperateLogServiceImpl implements UserOperateLogService {

	@Resource
	private UserOperateLogMapper userOperateLogMapper;

	@Override
	public void add(UserOperate userOperate) {
		userOperateLogMapper.add(userOperate);
	}
}
