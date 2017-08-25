/**
 * 
 */
package com.tky.lxl.platform.controller.business;

import java.util.Enumeration;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.tky.lxl.platform.finals.Const;
import com.tky.lxl.platform.finals.URLConst;
import com.tky.lxl.platform.model.business.Department;
import com.tky.lxl.platform.model.system.UserInfo;

/**
 * <p>Title: HomeController</p>
 * <p>Description: 主页</p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年3月10日 下午2:54:19）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Controller
public class HomeController {

	/**
	 * 主页
	 * 
	 * @return
	 */
	@RequestMapping("home")
	public ModelAndView home(HttpSession session) {

		UserInfo userInfo = (UserInfo) session.getAttribute(Const.SessionKey.USER_INFO);

		if (userInfo == null) {

			ModelAndView mvError = new ModelAndView(URLConst.URL_ERROR);
			mvError.addObject(Const.ModelKey.ERROR_MESSAGE, "用户Session已过期");
			return mvError;
		}

		ModelAndView mv = new ModelAndView(URLConst.URL_HOME);
		// 登陆用户名称
		mv.addObject(Const.ModelKey.ACCOUNT, userInfo.getAccount());
		// 用户名
		mv.addObject(Const.ModelKey.USER_NAME, userInfo.getName());
		// 用户登陆类型
		mv.addObject(Const.ModelKey.USER_LOGIN_TYPE, userInfo.getUserLoginType());

		// 部门
		Department department = (Department) session.getAttribute(Const.SessionKey.USER_DEPARTMENT);
		if (department != null) {
			// 项目ID
			mv.addObject(Const.ModelKey.PROJECT_ID, department.getProjectInfoId());
			// 标段ID
			mv.addObject(Const.ModelKey.SECTION_ID, department.getProjectSectionId());
		}

		return mv;
	}

	/**
	 * 页面上部菜单导航
	 * 
	 * @return
	 */
	@RequestMapping("homeMenuNav")
	public ModelAndView homeMenuNav() {

		ModelAndView mv = new ModelAndView(URLConst.URL_HOME_MENU_NAV);
		return mv;
	}

	/**
	 * 中国铁路总公司 首页
	 * 
	 * @return
	 */
	@RequestMapping("homeCRC")
	public ModelAndView homeCRC() {

		ModelAndView mv = new ModelAndView(URLConst.URL_HOME_CRC);
		return mv;
	}

	/**
	 * 项目 首页
	 * 
	 * @return
	 */
	@RequestMapping("homeProject")
	public ModelAndView homeProject() {

		ModelAndView mv = new ModelAndView(URLConst.URL_HOME_PROJECT);
		return mv;
	}

	/**
	 * 标段 首页
	 * 
	 * @return
	 */
	@RequestMapping("homeSection")
	public ModelAndView homeSection() {

		ModelAndView mv = new ModelAndView(URLConst.URL_HOME_SECTION);
		return mv;
	} 

	/**
	 * 桥梁(连续梁) 首页
	 * 
	 * @return
	 */
	@RequestMapping("homeBridge")
	public ModelAndView homeBridge() {

		ModelAndView mv = new ModelAndView(URLConst.URL_HOME_BRIDGE);
		return mv;
	}



	/**
	 * 开发用测试画面
	 * 
	 * @return
	 */
	@RequestMapping("develop")
	public ModelAndView develop() {

		ModelAndView mv = new ModelAndView("develop");
		return mv;
	}

	/**
	 * 退出
	 * 
	 * @return
	 */
	@RequestMapping("logout")
	public ModelAndView logout(HttpSession session) {
		 Enumeration<String> enumer = session.getAttributeNames();
	        while (enumer.hasMoreElements()) {
	            String key = enumer.nextElement();
	            session.removeAttribute(key);
	        }
		ModelAndView mv = new ModelAndView("logout");
		return mv;
	}
}
