package com.tky.lxl.platform.serviceimpl.business;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tky.lxl.platform.dao.business.OrgTreeMapper;
import com.tky.lxl.platform.dao.system.SysResRoleMapper;
import com.tky.lxl.platform.finals.Const;
import com.tky.lxl.platform.finals.Const.DepartmentGrade;
import com.tky.lxl.platform.model.business.Department;
import com.tky.lxl.platform.model.business.Node;
import com.tky.lxl.platform.model.business.Organization;
import com.tky.lxl.platform.model.system.SysResRole;
import com.tky.lxl.platform.model.system.UserInfo;
import com.tky.lxl.platform.service.business.OrgTreeService;
import com.tky.lxl.platform.utils.ResultBean;

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
public class OrgTreeServiceImpl implements OrgTreeService {

	/**
	 * 部门节点标记
	 */
	private static final String NODE_FLAG_DEPARTMENT = "DPT_";
	/**
	 * 片区节点标记
	 */
	private static final String NODE_FLAG_CATEGORY_ITEM = "CI_";
	/**
	 * 项目信息节点标记
	 */
	private static final String NODE_FLAG_PJ_INFO = "PJ_";
	/**
	 * 标段节点标记
	 */
	private static final String NODE_FLAG_SECTION = "SEC_";
	/**
	 * 连续梁节点标记
	 */
	private static final String NODE_FLAG_CON_BEAM = "CB_";
	/**
	 * 根节点标记
	 */
	private static final String ID_ROOT = "ROOT_0";

	@Resource
	private OrgTreeMapper orgTreeMapper;
	@Resource
	private SysResRoleMapper resRoleMapper;

	/**
	 * 获取组织结构树
	 */
	@Override
	public ResultBean<List<Node>> getTree(UserInfo userInfo, Department dept) {

		ResultBean<List<Node>> tree = new ResultBean<List<Node>>();

		// 部门Grade为空
		if (dept.getGrade() == null) {
			return tree;
		}
		
		// 中心级用户/部门级别:工管中心
		if (DepartmentGrade.PJ_MANAGE_CENTER == dept.getGrade()) {
			
			tree = this.getTreeCenter(dept);
		}
		// 建设单位级用户/部门级别:直管公司/路局/二级公司
		else if (DepartmentGrade.DIRECT_GOVERN == dept.getGrade()
			|| DepartmentGrade.RAILWAY_ADMINISTRATION == dept.getGrade()
			|| DepartmentGrade.SECONDARY == dept.getGrade()) {

			tree = this.getTreeConstruction(dept);
		}
		// 指挥部级用户/部门级别:指挥部/筹备组
		else if (DepartmentGrade.HEADQUARTER == dept.getGrade()) {

			tree = this.getTreeHeadquarter(dept);
		}
		// 标段级用户/ 部门级别:施工
		else if (DepartmentGrade.CONSTRUCTION == dept.getGrade()) {
			
			tree = this.getTreeSection(userInfo, dept);
		}
		
		return tree;
	}

	/**
	 * 组织结构树 : 中心级用户(中国铁路总公司)
	 */
	private ResultBean<List<Node>> getTreeCenter(Department dept) {

		List<Node> tree = new ArrayList<Node>();

		List<Organization> orgList = orgTreeMapper.selectCenter();
		
		// 无数据的情况
		if (orgList.size() == 0 ) {
			return new ResultBean<List<Node>>(0, "无数据", tree);
		}
		
		// 第一个元素
		Organization org0 = orgList.get(0);

		// 临时变量片区ID
		String catagoryItemId = org0.getCategoryItemId() == null ? "" : org0.getCategoryItemId();
		// 临时变量项目信息ID
		String pjInfoId = org0.getProjectId() == null ? "" : org0.getProjectId();
		// 临时变量标段ID
		String sectionId = org0.getSectionId() == null ? "" : org0.getSectionId();

		int idDepartment = 0;
		int idCataItem = 0;
		int idPjInfo = 0;
		int idSection = 0;
		int idConBeam = 0;

		// Node Id
		String nodeIdDepartment = "";
		String nodeIdCataItem = "";
		String nodeIdPjInfoId = "";
		String nodeIdSectionId = "";
		String nodeIdConBeam = "";
		
		int orgListSize = orgList.size();
		for (int i = 0; i < orgListSize; i++) {

			Node root = new Node();
			Node category = new Node();
			Node pjInfo = new Node();
			Node section = new Node();
			Node conBeam = new Node();
			
			Organization org = orgList.get(i);

			// 片区ID变化后
			if (!catagoryItemId.equals(org.getCategoryItemId())) {

				idCataItem++;
			}
			// 项目信息ID变化后
			if (!pjInfoId.equals(org.getProjectId())) {
				
				idPjInfo++;
			}
			// 标段ID变化后
			if(!sectionId.equals(org.getSectionId())) {
				
				idSection++;
			}
			
			// 连续梁ID
			idConBeam++;
			
			// ******************************************************************/
			// 根节点
			root.setOrgId(String.valueOf(dept.getId()));
			root.setName(org.getDepartmentName());
			root.setType(Const.OrgType.CRC);

			nodeIdDepartment = NODE_FLAG_DEPARTMENT + String.valueOf(idDepartment);
			// 根节点ID : 子节点的父节点ID
			root.setId(nodeIdDepartment);
			// 自己的父节点ID
			root.setPid(ID_ROOT);
			if (!tree.contains(root)) {
				tree.add(root);
			}

			// ******************************************************************/
			// 片区
			category.setOrgId(org.getCategoryItemId());
			category.setName(org.getCategoryItemName());
			category.setType(Const.OrgType.CATEGORY_ITEM);
			
			nodeIdCataItem = NODE_FLAG_CATEGORY_ITEM + String.valueOf(idCataItem);
			// 片区ID : 片区子节点的父节点ID
			category.setId(nodeIdCataItem);
			// 片区父节点ID
			category.setPid(nodeIdDepartment);
			if (!tree.contains(category)) {
				tree.add(category);
			}
			
			// ******************************************************************/
			// 项目信息
			pjInfo.setOrgId(org.getProjectId());
			pjInfo.setName(org.getProjectName());
//			pjInfo.setType(org.getProjectType());
			pjInfo.setType(Const.OrgType.PROJECT);
			// 项目的片区ID
			pjInfo.setParentOrgId(org.getCategoryItemId());
			// 偏差超限数
			int cntProjectWarn = org.getCntProjectWarn() == null ? 0 : org.getCntProjectWarn().intValue();
			pjInfo.setCntWarn(String.valueOf(cntProjectWarn));
			
			nodeIdPjInfoId = NODE_FLAG_PJ_INFO + String.valueOf(idPjInfo);
			// 项目信息ID : 项目信息子节点的父节点ID
			pjInfo.setId(nodeIdPjInfoId);
			// 项目信息父节点ID
			pjInfo.setPid(nodeIdCataItem);
			if (!tree.contains(pjInfo)) {
				tree.add(pjInfo);
			}

			// ******************************************************************/
			// 标段
			section.setOrgId(org.getSectionId());
			section.setName(org.getSectionName());
			section.setType(Const.OrgType.SECTION);
			// 标段的项目ID
			section.setParentOrgId(org.getProjectId());
			// 偏差超限数
			int cntSectionWarn = org.getCntSectionWarn() == null ? 0 : org.getCntSectionWarn().intValue();
			section.setCntWarn(String.valueOf(cntSectionWarn));

			nodeIdSectionId = NODE_FLAG_SECTION + String.valueOf(idSection);
			// 标段ID : 标段子节点的父节点
			section.setId(nodeIdSectionId);
			// 标段父节点ID
			section.setPid(nodeIdPjInfoId);
			if (!tree.contains(section)) {
				tree.add(section);
			}

			// ******************************************************************/
			// 连续梁
			conBeam.setOrgId(org.getConbeamId());
			conBeam.setName(org.getConbeamName());
			conBeam.setType(Const.OrgType.CON_BEAM);
			// 桥梁主跨跨度
			conBeam.setMainKdLength(org.getMainKdLength());
			// 偏差超限数
			int cntConBeam = org.getCntConBeamWarn() == null ? 0 : org.getCntConBeamWarn().intValue();
			conBeam.setCntWarn(String.valueOf(cntConBeam));
			
			nodeIdConBeam = NODE_FLAG_CON_BEAM  + String.valueOf(idConBeam);
			// 连续梁ID
			conBeam.setId(nodeIdConBeam);
			// 连续梁父节点ID
			conBeam.setPid(nodeIdSectionId);
			if (!tree.contains(conBeam)) {
				tree.add(conBeam);
			}

			// 保存用于下次循环判断
			catagoryItemId = org.getCategoryItemId();
			pjInfoId = org.getProjectId();
			sectionId = org.getSectionId();
		}

		return new ResultBean<List<Node>>(0, "获取成功！", tree);
	}

	/**
	 * 组织结构树 : 建设单位级用户
	 */
	private ResultBean<List<Node>> getTreeConstruction(Department dept) {

		// 直管公司或路局 的部门ID
		Long id = dept.getId();
		List<Organization> orgList = orgTreeMapper.selectConstruction(id);

		return toTreeForConstructionOrHeadQuarter(orgList);
	}
	
	/**
	 * 组织结构树 : 指挥部级用户
	 */
	private ResultBean<List<Node>> getTreeHeadquarter(Department dept) {

		// 指挥部/筹备组 的部门ID
		Long id = dept.getId();
		List<Organization> orgList = orgTreeMapper.selectHeadquarter(id);
		
		return toTreeForConstructionOrHeadQuarter(orgList);
	}

	/**
	 * 构建组织结构树 : 建设单位级用户 和 指挥部级的 组织结构树 的结构相同, 数据不同.
	 */
	private ResultBean<List<Node>> toTreeForConstructionOrHeadQuarter(List<Organization> orgList) {

		List<Node> tree = new ArrayList<Node>();

		// 无数据的情况
		if (orgList.size() == 0 ) {
			return new ResultBean<List<Node>>(0, "无数据", tree);
		}

		// 第一个元素
		Organization org0 = orgList.get(0);

		// 临时变量项目信息ID
		String pjInfoId = org0.getProjectId() == null ? "" : org0.getProjectId();
		// 临时变量标段ID
		String sectionId = org0.getSectionId() == null ? "" : org0.getSectionId();

		int idPjInfo = 0;
		int idSection = 0;
		int idConBeam = 0;

		// Node Id
		String nodeIdPjInfoId = "";
		String nodeIdSectionId = "";
		String nodeIdConBeam = "";
		
		int orgListSize = orgList.size();
		for (int i = 0; i < orgListSize; i++) {

			Node pjInfo = new Node();
			Node section = new Node();
			Node conBeam = new Node();
			
			Organization org = orgList.get(i);

			// 项目信息ID变化后
			if (!pjInfoId.equals(org.getProjectId())) {
				
				idPjInfo++;
			}
			// 标段ID变化后
			if(!sectionId.equals(org.getSectionId())) {
				
				idSection++;
			}
			
			// 连续梁ID
			idConBeam++;
			
			// ******************************************************************/
			// 项目信息
			pjInfo.setOrgId(org.getProjectId());
			pjInfo.setName(org.getProjectName());
			pjInfo.setType(Const.OrgType.PROJECT);
			// 项目的片区ID
			pjInfo.setParentOrgId(org.getCategoryItemId());
			// 偏差超限数
			int cntProjectWarn = org.getCntProjectWarn() == null ? 0 : org.getCntProjectWarn().intValue();
			pjInfo.setCntWarn(String.valueOf(cntProjectWarn));
			
			nodeIdPjInfoId = NODE_FLAG_PJ_INFO + String.valueOf(idPjInfo);
			// 项目信息ID : 项目信息子节点的父节点ID
			pjInfo.setId(nodeIdPjInfoId);
			// 项目信息父节点ID
			pjInfo.setPid(ID_ROOT);
			if (!tree.contains(pjInfo)) {
				tree.add(pjInfo);
			}

			// ******************************************************************/
			// 标段
			section.setOrgId(org.getSectionId());
			section.setName(org.getSectionName());
			section.setType(Const.OrgType.SECTION);
			// 标段的项目ID
			section.setParentOrgId(org.getProjectId());
			// 偏差超限数
			int cntSectionWarn = org.getCntSectionWarn() == null ? 0 : org.getCntSectionWarn().intValue();
			section.setCntWarn(String.valueOf(cntSectionWarn));

			nodeIdSectionId = NODE_FLAG_SECTION + String.valueOf(idSection);
			// 标段ID : 标段子节点的父节点
			section.setId(nodeIdSectionId);
			// 标段父节点ID
			section.setPid(nodeIdPjInfoId);
			if (!tree.contains(section)) {
				tree.add(section);
			}

			// ******************************************************************/
			// 连续梁
			conBeam.setOrgId(org.getConbeamId());
			conBeam.setName(org.getConbeamName());
			conBeam.setType(Const.OrgType.CON_BEAM);
			// 桥梁主跨跨度(只有连续梁设置了主跨跨度)
			conBeam.setMainKdLength(org.getMainKdLength());
			// 偏差超限数
			int cntConBeam = org.getCntConBeamWarn() == null ? 0 : org.getCntConBeamWarn().intValue();
			conBeam.setCntWarn(String.valueOf(cntConBeam));
			
			nodeIdConBeam = NODE_FLAG_CON_BEAM  + String.valueOf(idConBeam);
			// 连续梁ID
			conBeam.setId(nodeIdConBeam);
			// 连续梁父节点ID
			conBeam.setPid(nodeIdSectionId);
			if (!tree.contains(conBeam)) {
				tree.add(conBeam);
			}

			// 保存用于下次循环判断
			pjInfoId = org.getProjectId();
			sectionId = org.getSectionId();
		}

		return new ResultBean<List<Node>>(0, "获取成功！", tree);
	}

	/**
	 * 标段用户
	 * 
	 * @param userInfo - 用户信息
	 * @param dept - 部门
	 * @return
	 */
	private ResultBean<List<Node>> getTreeSection(UserInfo userInfo, Department dept) {

		List<Node> tree = new ArrayList<Node>();

		// 用户登陆名称
		String account = userInfo.getAccount();
		// 标段ID
		Long id = dept.getProjectSectionId();
		List<Organization> orgList = null;
		
		// 标段级用户
		orgList = orgTreeMapper.selectSection(account, id);

		// 无数据的情况
		if (orgList == null || orgList.size() == 0 ) {
			return new ResultBean<List<Node>>(0, "无数据", tree);
		}

		// 第一个元素
		Organization org0 = orgList.get(0);

		// 临时变量标段ID
		String sectionId = org0.getSectionId() == null ? "" : org0.getSectionId();

		int idSection = 0;
		int idConBeam = 0;

		// Node Id
		String nodeIdSectionId = "";
		String nodeIdConBeam = "";
		
		int orgListSize = orgList.size();
		for (int i = 0; i < orgListSize; i++) {

			Node section = new Node();
			Node conBeam = new Node();
			
			Organization org = orgList.get(i);

			// 标段ID变化后
			if(!sectionId.equals(org.getSectionId())) {
				
				idSection++;
			}
			
			// 连续梁ID
			idConBeam++;
			
			// ******************************************************************/
			// 标段
			section.setOrgId(org.getSectionId());
			section.setName(org.getSectionName());
			section.setType(Const.OrgType.SECTION);
			// 标段的项目ID
			section.setParentOrgId(org.getProjectId());
			
			// 偏差超限数
			int cntSectionWarn = org.getCntSectionWarn() == null ? 0 : org.getCntSectionWarn().intValue();
			section.setCntWarn(String.valueOf(cntSectionWarn));

			nodeIdSectionId = NODE_FLAG_SECTION + String.valueOf(idSection);
			// 标段ID : 标段子节点的父节点
			section.setId(nodeIdSectionId);
			// 标段父节点ID
			section.setPid(ID_ROOT);
			if (!tree.contains(section)) {
				tree.add(section);
			}

			// ******************************************************************/
			// 连续梁
			conBeam.setOrgId(org.getConbeamId());
			conBeam.setName(org.getConbeamName());
			conBeam.setType(Const.OrgType.CON_BEAM);
			// 桥梁主跨跨度
			conBeam.setMainKdLength(org.getMainKdLength());
			// 偏差超限数
			int cntConBeam = org.getCntConBeamWarn() == null ? 0 : org.getCntConBeamWarn().intValue();
			conBeam.setCntWarn(String.valueOf(cntConBeam));
			
			nodeIdConBeam = NODE_FLAG_CON_BEAM  + String.valueOf(idConBeam);
			// 连续梁ID
			conBeam.setId(nodeIdConBeam);
			// 连续梁父节点ID
			conBeam.setPid(nodeIdSectionId);
			if (!tree.contains(conBeam)) {
				tree.add(conBeam);
			}

			// 保存用于下次循环判断
			sectionId = org.getSectionId();
		}

		return new ResultBean<List<Node>>(ResultBean.OK, "获取成功！", tree);
	}

	/**
	 * 获取资源角色
	 */
	@Override
	public ResultBean<List<SysResRole>> getResourceRole(UserInfo userInfo) {
		
		// 用户登陆名
		String account = userInfo.getAccount();
		// 默认角色
		int defaultRoleType = Const.RoleType.DEFAULT;
		// 用户的角色等级
		int roleLevel = this.getRoleLevel(userInfo);
		
		List<SysResRole> resRoleList = resRoleMapper.selectResourceRole(account, defaultRoleType, roleLevel);
		
		return new ResultBean<List<SysResRole>>(ResultBean.OK, "获取成功！", resRoleList);
	}
	
	/**
	 * 根据用户的登陆类型获取用户的角色等级
	 * @param userInfo
	 */
	private int getRoleLevel(UserInfo userInfo) {

		int roleLevel = -1;
		
		String userLoginType = userInfo.getUserLoginType();
		// 中心级普通用户
		if (Const.UserLoginType.CENTER.equals(userLoginType)) {

			roleLevel = Const.RoleLevel.CENTER;
		}
		// 建设单位级普通用户
		if (Const.UserLoginType.CONSTRUCTION.equals(userLoginType)) {

			roleLevel = Const.RoleLevel.CONSTRUCTION;
		}
		// 指挥部级普通用户
		if (Const.UserLoginType.HEADQUARTERS_USER.equals(userLoginType)) {

			roleLevel = Const.RoleLevel.HEADQUARTER;
		}
		// 标段级普通用户
		if (Const.UserLoginType.SECTION_USER.equals(userLoginType)) {

			roleLevel = Const.RoleLevel.SECTION;
		}
		
		return roleLevel;
	}
}
