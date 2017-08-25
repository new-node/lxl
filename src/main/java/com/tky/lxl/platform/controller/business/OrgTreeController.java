package com.tky.lxl.platform.controller.business;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.tky.lxl.platform.finals.Const;
import com.tky.lxl.platform.finals.URLConst;
import com.tky.lxl.platform.model.business.Department;
import com.tky.lxl.platform.model.business.Node;
import com.tky.lxl.platform.model.system.SysResRole;
import com.tky.lxl.platform.model.system.UserInfo;
import com.tky.lxl.platform.service.business.OrgTreeService;
import com.tky.lxl.platform.utils.ResultBean;

/**
 * 
 * <p>Title:MenuController </p>
 * <p>Description: 菜单</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年2月14日 下午2:39:02）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Controller
public class OrgTreeController {

	@Resource
	private HttpSession session;
	@Resource
	private OrgTreeService orgTreeService;

	/**
	 * 显示组织结构树视图
	 * 
	 * @return
	 */
	@RequestMapping("showOrgTree")
	public ModelAndView showLogin(){

		ModelAndView mv = new ModelAndView(URLConst.URL_ORG_TREE);
		return mv;
	}

	/**
	 * 获取组织结构树数据
	 *   已设置父子关系
	 * 
	 * @return
	 */
	@RequestMapping(value = "getOrgTree")
	@ResponseBody
	public ResultBean<List<Node>> getOrgTree(){

		// 从Session中取得用户
		// UserInfo为空的判断 已在拦截器中 处理
		UserInfo userInfo = (UserInfo)session.getAttribute(Const.SessionKey.USER_INFO);
		
		// 从Session中取得用户的部门
		Department dept = (Department)session.getAttribute(Const.SessionKey.USER_DEPARTMENT);
		if (dept == null) {
			return new ResultBean<List<Node>>(ResultBean.NG, "无部门数据！", null);
		}
		
		// 获取组织结构树数据
		ResultBean<List<Node>> rs = orgTreeService.getTree(userInfo, dept);
		return rs;
	}
	

	/**
	 * 获取组织结构树节点权限
	 * 
	 * @return
	 */
	@RequestMapping(value = "getResourceRole")
	@ResponseBody
	public ResultBean<List<SysResRole>> getResourceRole(){

		// 从Session中取得用户
		// UserInfo为空的判断 已在拦截器中 处理
		UserInfo userInfo = (UserInfo)session.getAttribute(Const.SessionKey.USER_INFO);
		
		ResultBean<List<SysResRole>> resRoleList = orgTreeService.getResourceRole(userInfo);
		return resRoleList;
	}
}
