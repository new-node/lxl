package com.tky.lxl.platform.serviceimpl.business;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tky.lxl.platform.dao.business.InitPointMapper;
import com.tky.lxl.platform.dao.business.QlxxhSyncMapper;
import com.tky.lxl.platform.dao.business.UserLxlMapper;
import com.tky.lxl.platform.finals.Const;
import com.tky.lxl.platform.model.business.Centrespan;
import com.tky.lxl.platform.model.business.Department;
import com.tky.lxl.platform.model.business.InitPoint;
import com.tky.lxl.platform.model.business.Lxl;
import com.tky.lxl.platform.model.business.PierBody;
import com.tky.lxl.platform.model.business.Segment;
import com.tky.lxl.platform.model.business.UserLxl;
import com.tky.lxl.platform.model.system.UserInfo;
import com.tky.lxl.platform.service.business.DepartmentService;
import com.tky.lxl.platform.service.business.MngrConBeamGrantService;
import com.tky.lxl.platform.sqlsession.MySqlSession;
import com.tky.lxl.platform.utils.BaseJSON;
import com.tky.lxl.platform.utils.ResultBean;
import com.tky.lxl.platform.utils.ServiceApiUtil;

/**
 * <p>Title: MngrConBeamGrantServiceImpl</p>
 * <p>Description: 标段管理员 连续梁授权</p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年3月15日 上午9:26:55）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Service
@Transactional
public class MngrConBeamGrantServiceImpl implements MngrConBeamGrantService{
	
	private Logger logger = Logger.getLogger(MngrConBeamGrantServiceImpl.class);
	
	@Resource
	private UserLxlMapper userLxlMapper;
	@Resource
	private DepartmentService departmentService;
	@Resource
	private QlxxhSyncMapper qlxxhSyncMapper;
	@Resource
	private InitPointMapper initPointMapper;
	
	/* 
	 * 查询标段的所有用户
	 */
	@Override
	public ResultBean<List<UserLxl>> getUserBySectionId(Long sectionId) {
		
		// 调用服务接口,获取标段下的所有用户信息
		List<UserInfo> userInfoList = ServiceApiUtil.getUserInfoList(sectionId);

		// 获取标段下的授权用户
		List<UserLxl> userList = userLxlMapper.selectUserBySectionId(sectionId);
		
		List<UserLxl> userLxlList = new ArrayList<UserLxl>();
		
		// 部门一览
		List<Department> deptList = departmentService.getDepartmentByUserInfoList(userInfoList);
		
		// 设置各用户信息
		for (UserInfo userInfo : userInfoList) {
			
			// 普通用户
			if (Const.UserType.NORMAL == userInfo.getUsertype()) {
				
				UserLxl userLxl = new UserLxl();
				
				// 用户登陆名称
				userLxl.setAccount(userInfo.getAccount());
				// 用户真实姓名
				userLxl.setUserName(userInfo.getName());
				// 联系电话
				userLxl.setMobile(userInfo.getMobile());
	
				// 取得部门名称
				for (Department dept : deptList) {
					
					if (dept.getId() == userInfo.getDepartmentid()) {
	
						userLxl.setDepartmentName(dept.getName());
						break;
					}
				}
				
				// 授权状态
				userLxl.setGrantState(Const.GrantState.NOT_GRANTED);
				
				// 用户的授权信息
				for (UserLxl user : userList) {
	
					if (userInfo.getAccount().equals(user.getAccount())) {
						
						// 授权状态:已授权
						userLxl.setGrantState(Const.GrantState.GRANTED);
						break;
					}
				}
				
				userLxlList.add(userLxl);
			}
		}
		
		return new ResultBean<List<UserLxl>>(ResultBean.OK, "OK", userLxlList);
	}

	/* 
	 * 查询标段的所有连续梁
	 */
	@Override
	public ResultBean<List<UserLxl>> getConBeamBySectionId(Long sectionId) {

		List<UserLxl> beanList = userLxlMapper.selectUserLxlBySectionId(sectionId);
		
		return new ResultBean<List<UserLxl>>(ResultBean.OK, "OK", beanList);
	}

	/* 
	 * 获取用户的授权连续梁信息
	 */
	@Override
	public ResultBean<List<UserLxl>> getGrantInfoByUser(String account) {

		List<UserLxl> beanList = userLxlMapper.selectGrantInfoByUser(account);
		
		return new ResultBean<List<UserLxl>>(ResultBean.OK, "OK", beanList);
	}
	
	/* 
	 * 连续梁授权
	 */
	@Override
	public ResultBean<String> grantConBeamToUser(String jsonUserLxlList) {
		
		List<UserLxl> userLxlList = BaseJSON.parseArray(jsonUserLxlList, UserLxl.class);
		
		// 
		if (userLxlList.size() == 0) {

			// 
			return new ResultBean<String>(ResultBean.OK, "OK", "未选择用户");
		}
		
		// 一次操作只能设置一个用户(所以所有数据的用户登陆名称是一样的)
		// 所以只取第一条数据用来取消授权
		UserLxl userLxl = userLxlList.get(0);

		// 取消用户的所有连续梁授权
		userLxlMapper.cancelGrant(userLxl);
		
		// 对授权连续梁进行授权
		for (UserLxl bean : userLxlList) {

			// 授权
			if (Const.GrantState.GRANTED.equals(bean.getGrantState())) {
			
				// 授权标志(是否在用 为 0:在用)
				bean.setUseFlag(Const.UseFlag.USE);
				userLxlMapper.grantConBeamToUser(bean);
			}
		}
		
		// 
		return new ResultBean<String>(ResultBean.OK, "OK", "连续梁授权");
	}

	/**
	 * 同步连续梁
	 */
	@Override
	public ResultBean<String> syncConBeam(Long sectionId) {
		
		ResultBean<String> result = null;
		
		boolean isNG = false;
		String errorTableName = "";
		
		// 同步连续梁
		result = this.syncLxl(sectionId);
		if (ResultBean.NG == result.getCode()) {
			isNG = true;
			errorTableName  = errorTableName + "连续梁 ";
		}
		
		// 同步构件-中跨
		result = this.syncCentrespan(sectionId);
		if (ResultBean.NG == result.getCode()) {
			isNG = true;
			errorTableName  = errorTableName + "构件-中跨 ";
		}
		// 同步构件-节段
		result = this.syncSegment(sectionId);
		if (ResultBean.NG == result.getCode()) {
			isNG = true;
			errorTableName  = errorTableName + "构件-节段 ";
		}
		
		// 同步墩身
		result = this.syncPierBody(sectionId);
		if (ResultBean.NG == result.getCode()) {
			isNG = true;
			errorTableName  = errorTableName + "墩身 ";
		}

		if (isNG) {
			return new ResultBean<String>(ResultBean.NG, "NG", errorTableName.trim() + " 未同步成功.");
		}
		
		//初始化测点
		try {
			
			initPoint(sectionId);
		} catch (RuntimeException e) {
			
			logger.error("测点生成失败");
			e.printStackTrace();
			
			return new ResultBean<String>(ResultBean.NG, "NG", errorTableName.trim() + " 连续梁同步成功，测点初始化失败.");
		}
		// 
		return new ResultBean<String>(ResultBean.OK, "OK", "同步连续梁完成.");
	}


	/**
	 * 同步连续梁
	 */
	private ResultBean<String> syncLxl(Long sectionId) {

		Long startTime = System.currentTimeMillis();
		int total = 0;

		try {
			// 取得接口数据
			List<Lxl> beanList = ServiceApiUtil.getLxl(sectionId);

			// 同步
			for (Lxl bean : beanList) {

				qlxxhSyncMapper.saveOrUpdateLxl(bean);
				total++;
			}

			Long endTime = System.currentTimeMillis();
			return new ResultBean<String>(ResultBean.OK, "操作成功！", "本次同步到本地：" + total + "条" + "耗时：" + (endTime - startTime));
		} catch (Exception e) {
			
			e.printStackTrace();
			return new ResultBean<String>(ResultBean.NG, "操作异常！", "同步失败，请联系管理员！");
		}
	}

	/**
	 * 同步构件-中跨
	 */
	private ResultBean<String> syncCentrespan(Long sectionId) {

		Long startTime = System.currentTimeMillis();
		int total = 0;

		try {
			// 取得接口数据
			List<Centrespan> beanList = ServiceApiUtil.getCentrespan(sectionId);

			// 同步
			for (Centrespan bean : beanList) {
				switch (bean.getType()) {
				case 0:// 直线段
					bean.setType(Const.LDType.BKFDC);
					break;
				case 1:// 边跨
					bean.setType(Const.LDType.BKHL);
					break;
				case 2:// 中跨
					bean.setType(Const.LDType.ZKHL);
					break;
				default:
					break;
				}
				
				if (bean.getPartnum() != null) {
					qlxxhSyncMapper.saveOrUpdateLdCentrespan(bean);
				}
				total++;
			}

			Long endTime = System.currentTimeMillis();
			return new ResultBean<String>(ResultBean.OK, "操作成功！", "本次同步到本地：" + total + "条" + "耗时：" + (endTime - startTime));
		} catch (Exception e) {
			
			e.printStackTrace();
			return new ResultBean<String>(ResultBean.NG, "操作异常！", "同步失败，请联系管理员！");
		}
	}

	/**
	 * 同步构件-节段
	 */
	private ResultBean<String> syncSegment(Long sectionId) {

		Long startTime = System.currentTimeMillis();
		int total = 0;

		try {
			// 取得接口数据
			List<Segment> beanList = ServiceApiUtil.getSegment(sectionId);

			// 同步
			for (Segment bean : beanList) {

				if (bean.getPartnum() != null) {
					qlxxhSyncMapper.saveOrUpdateLdSegment(bean);
					total++;
				}
			}

			Long endTime = System.currentTimeMillis();
			return new ResultBean<String>(ResultBean.OK, "操作成功！", "本次同步到本地：" + total + "条" + "耗时：" + (endTime - startTime));
		} catch (Exception e) {
			
			e.printStackTrace();
			return new ResultBean<String>(ResultBean.NG, "操作异常！", "同步失败，请联系管理员！");
		}
	}

	/**
	 * 同步墩身
	 */
	private ResultBean<String> syncPierBody(Long sectionId) {

		Long startTime = System.currentTimeMillis();
		int total = 0;

		try {
			// 取得接口数据
			List<PierBody> beanList = ServiceApiUtil.getPierBody(sectionId);

			// 同步
			for (PierBody bean : beanList) {

				qlxxhSyncMapper.saveOrUpdatePierBody(bean);
				total++;
			}

			Long endTime = System.currentTimeMillis();
			return new ResultBean<String>(ResultBean.OK, "操作成功！", "本次同步到本地：" + total + "条" + "耗时：" + (endTime - startTime));
		} catch (Exception e) {
			
			e.printStackTrace();
			return new ResultBean<String>(ResultBean.NG, "操作异常！", "同步失败，请联系管理员！");
		}
	}
	
	
	
	/**
	 * 初始化测点信息
	 * @throws RuntimeException
	 */
	
	private void initPoint(Long sectionid) throws RuntimeException{
		//获取要初始化测点的梁段信息
		List<InitPoint> pointlists = initPointMapper.queryInitPoint(sectionid);
		MySqlSession.mybatisSqlSession(pointlists);
	}
	

}
