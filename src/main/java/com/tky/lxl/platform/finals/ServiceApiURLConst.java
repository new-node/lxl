package com.tky.lxl.platform.finals;

/**
 *  <p>Title: ServiceApiURLConst</p>
 *  <p>Description: 服务接口 基础平台/桥梁形象化/基础服务(登录)</p>
 *  <p>Company: 铁科院</p> 
 *
 *  @author sunjiashu（2017年3月7日  上午10:45:32）
 *
 *  @version:1.0.0  copyright  2017-2018
 */
public class ServiceApiURLConst {

	/**
	 * 
	 * 服务接口
	 *   基础平台
	 *
	 */
	public static class BasePlatformURL {

		/**
		 * 服务接口
		 *  基础平台 RootURL 初始化工具类中赋值(从配置属性文件中读取)
		 */
		public static String ROOT_URL = "";
		public static final String ROOT_URL_KEY = "baseplatform.root.url";
		/**
		 * ApiKey
		 */
		public static String API_KEY = "";
		public static final String API_KEY_KEY = "baseplatform.apikey";
		/**
		 * 获取登录用户
		 */
		public static String GET_SSO = "";
		public static final String GET_SSO_KEY = "baseplatform.users.getSSOUserInfoByToken";
		/**
		 * 根据人员acccount信息获取人员信息
		 */
		public static String GET_USER_BY_ACCOUNT = "";
		public static final String GET_USER_BY_ACCOUNT_KEY = "baseplatform.users.getUserByAccount";
		/**
		 * 根据人员ID获取所在的部门类型（工管中心，路局/客专、二级公司、指挥部、标段项目部、工区项目部） 
		 */
		public static String GET_CURRENT_DEPT = "";
		public static final String GET_CURRENT_DEPT_KEY = "baseplatform.users.getJSDeptsByUserId";
		/**
		 * 根据部门ID获取所有的人员信息
		 */
		public static String GET_ALL_USERS_BY_DEPT_ID = "";
		public static final String GET_ALL_USERS_BY_DEPT_ID_KEY = "baseplatform.departments.getAllUsersByDeptId";
		/**
		 * 根据标段ID获得标段下的用户信息 
		 */
		public static String GET_USER_INFO_LIST = "";
		public static final String GET_USER_INFO_LIST_KEY = "baseplatform.projectSection.getUserInfoList";
	}

	/**
	 * 
	 * 服务接口
	 *   (桥梁形象化)
	 *
	 */
	public static class QlxxhURL {

		/**
		 * 服务接口
		 *  桥梁形象化 RootURL 初始化工具类中赋值(从配置属性文件中读取)
		 */
		public static String ROOT_URL = "";
		public static final String ROOT_URL_KEY = "qlxxh.root.url";
		/**
		 * ApiKey
		 */
		public static String API_KEY = "";
		public static final String API_KEY_KEY = "qlxxh.apikey";
		/**
		 * 获取连续梁
		 */
		public static String GET_LXL = "/lxl/getSpecialstructure/";
		public static final String GET_LXL_KEY  = "qlxxh.lxl.getSpecialstructure";
		/**
		 * 获取构件-中跨
		 */
		public static String GET_CENTRE_SPAN = "/ld/getCentrespan/";
		public static final String GET_CENTRE_SPAN_KEY  = "qlxxh.ld.getCentrespan";
		/**
		 * 获取构件-节段
		 */
		public static String GET_SEGMENT = "/ld/getSegment/";
		public static final String GET_SEGMENT_KEY  = "qlxxh.ld.getSegment";
		/**
		 * 获取墩身
		 */
		public static String GET_PIER_BODY = "/pier/selectPierBody/";
		public static final String GET_PIER_BODY_KEY  = "qlxxh.pier.selectPierBody";
	}
}
