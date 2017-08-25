/**
 * 
 */
package com.tky.lxl.platform.controller.business;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tky.lxl.platform.aop.UserOperateLog;
import com.tky.lxl.platform.model.business.UserLxl;
import com.tky.lxl.platform.service.business.MngrConBeamGrantService;
import com.tky.lxl.platform.utils.ResultBean;

/**
 * <p>Title: SmConBeamAuthorizeController</p>
 * <p>Description: 标段管理员 连续梁授权</p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年3月17日 上午11:29:58）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Controller
@RequestMapping("/mngrConBeamGrant")
public class MngrConBeamGrantController {

	@Resource
	private MngrConBeamGrantService mngrConBeamGrantService;
	
	/**
	 * 查询标段的所有用户
	 * 
	 * @param session
	 * @param observer
	 * @return
	 */
	@RequestMapping("getUserBySectionId")
	@ResponseBody
	public ResultBean<List<UserLxl>> getUserBySectionId(Long sectionId) {

		return mngrConBeamGrantService.getUserBySectionId(sectionId);
	}

	/**
	 * 查询标段的所有连续梁
	 * 
	 * @param sectionId - 标段ID
	 * @return
	 */
	@RequestMapping("getConBeamBySectionId")
	@ResponseBody
	public ResultBean<List<UserLxl>> getConBeamBySectionId(Long sectionId) {

		return mngrConBeamGrantService.getConBeamBySectionId(sectionId);
	}

	/**
	 * 获取用户的授权连续梁信息
	 * 
	 * @param account - 用户登陆名
	 * @return
	 */
	@RequestMapping("getGrantInfoByUser")
	@ResponseBody
	public ResultBean<List<UserLxl>> getGrantInfoByUser(String account) {

		return mngrConBeamGrantService.getGrantInfoByUser(account);
	}
	
	/**
	 * 连续梁授权
	 * 
	 * @param usreId
	 * @param conId
	 * @return
	 */
	@UserOperateLog(description = "连续梁授权")
	@RequestMapping("grantConBeamToUser")
	@ResponseBody
	public ResultBean<String> grantConBeamToUser(String jsonUserLxlList) {
		
		return mngrConBeamGrantService.grantConBeamToUser(jsonUserLxlList);
	}

	/**
	 * 同步连续梁
	 * 
	 * @param usreId
	 * @param conId
	 * @return
	 */
	@UserOperateLog(description = "同步连续梁")
	@RequestMapping("sysnConBeam")
	@ResponseBody
	public ResultBean<String> syncConBeam(Long sectionId) {
		
		return mngrConBeamGrantService.syncConBeam(sectionId);
	}
}
