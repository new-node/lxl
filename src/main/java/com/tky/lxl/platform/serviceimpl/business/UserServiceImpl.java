package com.tky.lxl.platform.serviceimpl.business;

import org.springframework.stereotype.Service;

import com.tky.lxl.platform.finals.Const;
import com.tky.lxl.platform.model.business.Department;
import com.tky.lxl.platform.model.system.UserInfo;
import com.tky.lxl.platform.service.system.UserService;
import com.tky.lxl.platform.utils.ResultBean;
import com.tky.lxl.platform.utils.ServiceApiUtil;

/**
 * <p>Title: MenuServiceImpl</p>
 * <p>Description: 生成组织结构树（菜单）</p>
 * <p>Company: 铁科院</p> 
 *
 * @author liuzhenya（2017年3月2日 上午10:58:40）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Service
public class UserServiceImpl implements UserService {
	/* 
	 * 验证用户
	 */
	@Override
	public ResultBean<UserInfo> validate(String account, String password) {
		// 因为密码无从获取，所以开发测试密码统一为 1的md5密文
		if (!"c4ca4238a0b923820dcc509a6f75849b".equals(password) && !"1".equals(password)) {
			UserInfo noAuth = new UserInfo();
			return new ResultBean<UserInfo>(Const.Auth.NOT_AUTHED, "密码错误！", noAuth);
		}
		try {
			// 密码是否验证成功
			UserInfo userInfo = ServiceApiUtil.getUserByAccount(account);
			return new ResultBean<UserInfo>(Const.Auth.AUTHED, "登录成功！", userInfo);
		} catch (Exception e) {
			UserInfo noAuth = new UserInfo();
			return new ResultBean<UserInfo>(Const.Auth.NOT_AUTHED, "用户不存在！", noAuth);
		}
	}

	/**
	 * 用户验证
	 */
	@Override
	public ResultBean<UserInfo> validate(String sessionId) {

		try {
			UserInfo userInfo = null;
			// 单点登录链接过来
			if (sessionId != null) {
				// 获取登录用户信息
				userInfo = ServiceApiUtil.getAuthInfo(sessionId);
				return new ResultBean<UserInfo>(Const.Auth.AUTHED, "登录成功！", userInfo);
			} else {
				//单点登录失败
				return new ResultBean<UserInfo>(Const.Auth.NOT_AUTHED, "SessionId验证失败！", new UserInfo());
			}
		} catch (Exception e) {
			return new ResultBean<UserInfo>(Const.Auth.NOT_AUTHED, "用户不存在！", new UserInfo());
		}
	}
	/* 
	 * 获取部门
	 */
	@Override
	public Department getCurrentDep(Long userId) {
		
		return ServiceApiUtil.getCurrentDep(userId);
	}


}
