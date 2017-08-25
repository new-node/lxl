/**
 * 
 */
package com.tky.lxl.platform.controller.business;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.tky.lxl.platform.finals.Const;
import com.tky.lxl.platform.finals.URLConst;
import com.tky.lxl.platform.model.business.Department;
import com.tky.lxl.platform.model.business.ProjectInfo;
import com.tky.lxl.platform.model.system.UserInfo;
import com.tky.lxl.platform.service.business.ProjectInfoService;

/**
 * <p>Title: HomeSMController</p>
 * <p>Description: 标段管理员</p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年3月14日 下午5:41:05）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Controller
public class HomeManagerController {

	private static final String TITLE_CENTER = "中心管理员";
	private static final String TITLE_CONSTRUCTION = "建设单位管理员";
	private static final String TITLE_HEADQUARTER = "建指管理员";
	private static final String TITLE_SECTION = "标段管理员";
	
	@Resource
	private ProjectInfoService projectInfoService;
	
	/**
	 * 标段管理员
	 * 
	 * @return
	 */
	@RequestMapping("homeManager")
	public ModelAndView homeSM(HttpSession session){
		
		ModelAndView mv = new ModelAndView(URLConst.URL_HOME_MANAGER);

		UserInfo userInfo = (UserInfo) session.getAttribute(Const.SessionKey.USER_INFO);
		
		// 用户ID
		Long userId = userInfo.getId();
		// 管理员ID(标段管理员 建指管理员)
		mv.addObject(Const.ModelKey.MANAGER_ID, userId);
		// 用户名
		mv.addObject(Const.ModelKey.USER_NAME, userInfo.getName());
		// 用户登陆类型
		mv.addObject(Const.ModelKey.USER_LOGIN_TYPE, userInfo.getUserLoginType());

		Department department = (Department) session.getAttribute(Const.SessionKey.USER_DEPARTMENT);

		// 中心级管理员
		if (Const.UserLoginType.CENTER_MANAGER.equals(userInfo.getUserLoginType())) {

			// 管理员页面标题
			mv.addObject(Const.ModelKey.MANAGER_TITLE, TITLE_CENTER);
			
			if (department != null && department.getId() != null) {

				// 中心级管理员的根部门ID
				mv.addObject(Const.ModelKey.MANAGER_ORG_ID, department.getId());
			}
		}
		// 建设单位管理员
		else if (Const.UserLoginType.CONSTRUCTION_MANAGER.equals(userInfo.getUserLoginType())) {

			// 管理员页面标题
			mv.addObject(Const.ModelKey.MANAGER_TITLE, TITLE_CONSTRUCTION);
			
			if (department != null && department.getId() != null) {

				// 建设单位管理员的根部门ID
				mv.addObject(Const.ModelKey.MANAGER_ORG_ID, department.getId());
			}
		}
		// 建指管理员
		else if (Const.UserLoginType.HEADQUARTER_MANAGER.equals(userInfo.getUserLoginType())) {

			// 管理员页面标题
			mv.addObject(Const.ModelKey.MANAGER_TITLE, TITLE_HEADQUARTER);
			
			if (department != null && department.getId() != null) {

				// 建指管理员的根部门ID
				mv.addObject(Const.ModelKey.MANAGER_ORG_ID, department.getId());
			}
		}
		// 标段管理员
		else if (Const.UserLoginType.SECTION_MANAGER.equals(userInfo.getUserLoginType())) {

			// 管理员页面标题
			mv.addObject(Const.ModelKey.MANAGER_TITLE, TITLE_SECTION);
			
			if (department != null) {
				
				Long projectdInfoId = department.getProjectInfoId();
				if (projectdInfoId != null) {
					
					// 获取项目信息
					ProjectInfo pjInfo = projectInfoService.findById(projectdInfoId);
					
					// 片区ID
					mv.addObject(Const.ModelKey.MANAGER_CATEGORY_ITEM_ID, pjInfo.getCategoryid());
				}
				
				// 项目ID
				mv.addObject(Const.ModelKey.MANAGER_PROJECT_ID, projectdInfoId);
				// 标段ID(标段管理员的根部门信息中的标段ID)
				mv.addObject(Const.ModelKey.MANAGER_ORG_ID, department.getProjectSectionId());
			}
		}
		
		return mv;
	}

	/**
	 * 设置观测人员
	 * 
	 * @return
	 */
	@RequestMapping("mngrObserver")
	public ModelAndView homeCRC(){
		
		ModelAndView mv = new ModelAndView(URLConst.URL_MANAGER_OBSERVER);
		return mv;
	}

	/**
	 * 设备仪器
	 * 
	 * @return
	 */
	@RequestMapping("mngrEquipment")
	public ModelAndView homeProject(){
		
		ModelAndView mv = new ModelAndView(URLConst.URL_EQUIPMENT);
		return mv;
	}

	/**
	 * 角色授权
	 * 
	 * @return
	 */
	@RequestMapping("mngrRoleGrant")
	public ModelAndView smRoleGrant(){
		
		ModelAndView mv = new ModelAndView(URLConst.URL_MANAGER_ROLE_GRANT);
		return mv;
	}

	/**
	 * 连续梁授权
	 * 
	 * @return
	 */
	@RequestMapping("mngrConBeamGrant")
	public ModelAndView smConBeamGrant(){
		
		ModelAndView mv = new ModelAndView(URLConst.URL_MANAGER_CON_BEAM_GRANT);
		return mv;
	}
	
}
