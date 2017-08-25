package com.tky.lxl.platform.finals;

/**
 * <p>Title:Const </p>
 * <p>Description: 常量</p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年3月2日 下午7:56:50）
 *
 * @version:1.0.0 copyright  2017-2018
 */
public class Const {

    /**
     * 分页 默认页码
     */
    public static final int DEFAULT_PAGE = 1;
    
	/**
	 * 关键字
	 */
	public static class Keyword {
		
	}

	/**
	 * 常用字符串
	 */
	public static class CommonChar {

        /**
         * 0
         */
        public static final String ZERO = "0";
	}
    /**
     * 是否在用标志
     *  本数据库设计同桥梁形象化库统一(0:在用 1:删除)
     *  基础平台库的设计为(0:删除 1:在用)
     * 
     */
    public static class UseFlag {

        /**
         * 在用 : 0
         */
        public static final short USE = 0;

        /**
         * 删除 : 1
         */
        public static final short DELETE = 1;
    }

    /**
     * 授权信息
     * 
     */
    public static class GrantState {

        /**
         * 0 : 授权
         */
        public static final String GRANTED = "0";

        /**
         * 1 : 未授权
         */
        public static final String NOT_GRANTED = "1";

        /**
         * 3 : 默认角色
         */
        public static final String DEFAULT = "3";

        /**
         * 4 : 观测人员
         */
        public static final String OBSERVER = "4";
    }

	/**
	 * Session 键值
	 */
	public static class SessionKey {

		/**
		 * 用户信息
		 */
		public static final String USER_INFO = "userInfo";
		/**
		 * 用户的根部门信息
		 */
		public static final String USER_DEPARTMENT = "department";
	}
	
	/**
	 * 视图模型中的模型的键值
	 */
	public static class ModelKey {

		/**
		 * 管理员ID(标段管理员 建指管理员)
		 */
		public static final String MANAGER_ID = "managerId";
		/**
		 * 建指管理员 根部门ID
		 * 标段管理员 标段ID
		 */
		public static final String MANAGER_ORG_ID = "managerOrgId";
		/**
		 * 标段管理员 项目ID
		 */
		public static final String MANAGER_PROJECT_ID = "managerProjectId";
		/**
		 * 标段管理员 片区ID
		 */
		public static final String MANAGER_CATEGORY_ITEM_ID = "managerCategoryItemId";
		/**
		 * 用户名称
		 */
		public static final String ACCOUNT = "account";
		/**
		 * 用户名
		 */
		public static final String USER_NAME = "username";
		/**
		 * 用户登陆类型
		 */
		public static final String USER_LOGIN_TYPE = "loginType";
		/**
		 * 项目ID
		 */
		public static final String PROJECT_ID = "projectId";
		/**
		 * 标段ID
		 */
		public static final String SECTION_ID = "sectionId";
		/**
		 * 错误信息
		 */
		public static final String ERROR_MESSAGE = "errorMessage";
		/**
		 * 管理员页面标题
		 */
		public static final String MANAGER_TITLE = "managerTitle";
	}
	
	/**
	 * 用户登陆类型
	 */
	public static class UserLoginType {
		/**
		 * 中心级管理员
		 *   根部门 : 中国铁路总公司
		 */
		public static final String CENTER_MANAGER = "0";
		/**
		 * 中心级用户
		 *   根部门 : 中国铁路总公司
		 */
		public static final String CENTER = "1";
		/**
		 * 建设单位级用户
		 *   根部门 : 直管公司 或 路局
		 */
		public static final String CONSTRUCTION = "2";
		/**
		 * 建设单位级管理员
		 *   根部门 : 直管公司 或 路局
		 */
		public static final String CONSTRUCTION_MANAGER = "7";
		/**
		 * 指挥部级用户
		 *   根部门 : 指挥部/筹备组
		 *   用户类型 : 普通用户
		 */
		public static final String HEADQUARTERS_USER = "3";
        /**
         * 建指管理员
         *   根部门 : 指挥部级用户
         *   用户类型 : 应用管理员用户
         */
        public static final String HEADQUARTER_MANAGER = "4";
		/**
		 * 标段级用户
		 *   根部门 : 施工
		 *   用户类型 : 普通用户
		 */
		public static final String SECTION_USER = "5";
    	/**
    	 * 标段管理员
		 *   根部门 : 施工
		 *   用户类型 : 应用管理员用户
    	 */
        public static final String SECTION_MANAGER = "6";
	}
	
	/**
	 * 用户验证相关
	 */
	public static class Auth {
		
		/**
		 * 验证通过
		 */
		public static final int AUTHED = 0;
		/**
		 * 验证不通过
		 */
		public static final int NOT_AUTHED = 2;
		/**
		 * 单点验证成功密码标记
		 */
		public static final String SINGLE_LOGIN_OK_PASSWORD = "1";
		/**
		 * 标段管理员 建指管理员
		 */
		public static final int MANAGER = 3;
	}
	
	/**
	 * 部门级别
	 */
	public static class DepartmentGrade {
		/**
		 * 中国铁路总公司 : 10
		 * China Railway Corporation
		 */
		public static final int CRC = 10;
		/**
		 * 片区 : 20
		 */
		public static final int CATEGORY_ITEM = 20;
		/**
		 * 工管中心 : 30
		 */
		public static final int PJ_MANAGE_CENTER = 30;
		/**
		 * 路局 : 60
		 */
		public static final int RAILWAY_ADMINISTRATION = 60;
		/**
		 * 直管公司 : 130
		 */
		public static final int DIRECT_GOVERN = 130;
		/**
		 * 部门 : 90
		 */
		public static final int DEPARTMENT = 90;
		/**
		 * 项目 : 110
		 */
		public static final int PROJECT = 110;
		/**
		 * 指挥部/筹备组 : 145
		 */
		public static final int HEADQUARTER = 145;
		/**
		 * 二级公司 : 150
		 */
		public static final int SECONDARY = 150;
		/**
		 * 施工 : 175
		 */
		public static final int CONSTRUCTION = 175;
		/**
		 * 监理 : 180
		 */
		public static final int SUPERVISOR = 180;
		/**
		 * 工区 : 510
		 */
		public static final int AREA = 510;
	}

	/**
	 * 组织类型(组织导航树用)
	 */
	public class OrgType {
		
		/**
		 * 中国铁路总公司 : 0
		 */
		public static final String CRC = "0";
		/**
		 * 片区 : 1
		 */
		public static final String CATEGORY_ITEM = "1";
		/**
		 * 项目 : 3
		 */
		public static final String PROJECT = "2";
		/**
		 * 标段 : 4
		 */
		public static final String SECTION = "3";
		/**
		 * 连续梁 : 8
		 */
		public static final String CON_BEAM = "4";
	}
	
    /**
     * 用户类型
     *   1、系统管理员
     *   2、普通用户
     *   3：应用管理员
     *   4：公共账号
     *   5:内部账号
     */
    public static class UserType {
    	/**
    	 * 系统管理员 : 1
    	 */
        public static final int ADMIN = 1;
        /**
         * 普通用户 : 2
         */
        public static final int NORMAL = 2;
        /**
         * 应用管理员 : 3
         */
        public static final int APP_MANAGER = 3;
        /**
         * 公共账号 : 4
         */
        public static final int PUBLIC = 4;
        /**
         * 内部账号 : 5
         */
        public static final int INNER = 5;
    }
    
    /**
     * 角色等级
     */
    public static class RoleLevel {
    	/**
    	 * 中心级 : 0
    	 */
        public static final int CENTER = 0;
        /**
         * 建设单位级 : 1
         */
        public static final int CONSTRUCTION = 1;
        /**
         * 指挥部级 : 2
         */
        public static final int HEADQUARTER = 2;
        /**
         * 标段级 : 3
         */
        public static final int SECTION = 3;
    }

    /**
     * 角色类型
     */
    public static class RoleType {
    	/**
    	 * 默认角色 : 0
    	 */
        public static final int DEFAULT = 0;
        /**
         * 普通角色 : 1
         */
        public static final int NORMAL = 1;
        /**
         * 观测人员 : 2
         */
        public static final int OBSERVER = 2;
    }

    /**
     * 测点类型分类
     */
    public static class CDType {

        /**
         * 测点 :2
         */
        public static final Short CD = 2;

        /**
         * 临时测点 : 1
         */
        public static final Short LSCD = 1;
    }
    
    /**
     * 里程类型分类
     */
    public static class LCType {

        /**
         * 小里程 :0
         */
        public static final Short XIAO_LC = 0;

        /**
         * 大里程 : 1
         */
        public static final Short DA_LC = 1;
    }

    /**
     * 超限类型分类
     */
    public static class DealFlag {

        /**
         * 未处理 :0
         */
        public static final Long UN_DEAL = Long.parseLong("0");

        /**
         * 已关闭 : 1
         */
        public static final Long CLOSED = Long.parseLong("1");
        
        /**
         * 处理中 : 2
         */
        public static final Long DEALING = Long.parseLong("2");
        
        /**
         * 待关闭 ：3
         */
        public static final Long CLOSING = Long.parseLong("3");
    }

	/**
     * 梁段类型分类
     */
    public static class LDType {

        /**
         * 0号梁段 : 0
         */
        public static final int ZERO= 0;

        /**
         * 悬臂浇筑梁段 : 1
         */
        public static final int XBJZ = 1;
        
        /**
         * 中跨合龙段(中合) : 3
         */
        public static final int ZKHL = 3;
        
        /**
         * 边跨合龙段(边合) : 4
         */
        public static final int BKHL = 4;
        
        /**
         * 边跨非对称梁段(直线段) : 5
         */
        public static final int BKFDC = 5;
    }

	/**
	 * 大小里程区分
	 * 
	 * @author LZY
	 *
	 */
	public static class MileageFlag {
		/**
		 * 授权
		 */
		public static final int small = 0;
		/**
		 * 取消
		 */
		public static final int big = 1;
	}

	/**
	 * 各pageSize设定
	 *
	 */
	public static class PageSize {
		/**
		 * 连续梁偏差超限 每页数据条数
		 */
		public static final String BRIDGE_PCCX_PAGESIZE = "bridge.pccx.pagesize";
		/**
		 * 偏差超限 每页数据条数
		 */
		public static final String PCCX_PAGESIZE = "pccx.pagesize";
		/**
		 * 测量信息 每页数据条数
		 */
		public static final String MEASUREINFO_PAGESIZE = "measureinfo.pagesize";
	}

	/**
	 * 观测人员用
	 */
	public static class Observer {

		/**
		 * 上岗证书扫描件后缀名替换用特殊字符
		 */
		public static final String SP = "_=_=_";

		/**
		 * 上岗证书扫描件后缀名分隔符 .
		 */
		public static final String DOT = ".";
		
		/**
		 * 上岗证书扫描件后缀名
		 */
		public static final String SUFFIX_1 = "jpg";
		/**
		 * 上岗证书扫描件后缀名
		 */
		public static final String SUFFIX_2 = "jpeg";
		/**
		 * 上岗证书扫描件后缀名
		 */
		public static final String SUFFIX_3 = "png";
	}

	/**
	 * Referer验证路径
	 */
	
	public static final String REFERERPATH = "refererpath";
	public static  String REFERERPATHVALUE="";
	
	/**
	 * 连续梁监测状态
	 */
	public static class LDStatus{
		/**
		 * 白色
		 */
		public static final int nodata = 1;
		/**
		 * 红色
		 */
		public static final int warndata = 2;
		/**
		 * 浅蓝
		 */
		public static final int yesdata = 3;
		/**
		 * 黄色
		 */
		public static final int yellowdata = 4;
		/**
		 * 蓝色
		 */
		public static final int bluedata = 5;
	}
}
