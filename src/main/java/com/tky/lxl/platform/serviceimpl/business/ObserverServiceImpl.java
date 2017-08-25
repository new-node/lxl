package com.tky.lxl.platform.serviceimpl.business;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.tky.lxl.platform.dao.business.LoginUserTempMapper;
import com.tky.lxl.platform.dao.business.ObserverMapper;
import com.tky.lxl.platform.emun.ResultCodeTypeEunm;
import com.tky.lxl.platform.finals.Const;
import com.tky.lxl.platform.model.Page;
import com.tky.lxl.platform.model.business.LoginUserTemp;
import com.tky.lxl.platform.model.business.Observer;
import com.tky.lxl.platform.model.system.UserInfo;
import com.tky.lxl.platform.service.business.ObserverService;
import com.tky.lxl.platform.utils.FileUploadUtil;
import com.tky.lxl.platform.utils.ResultBean;
import com.tky.lxl.platform.utils.ServiceApiUtil;

/**
 * <p>Title: ObserverServiceImpl</p>
 * <p>Description: 观测人员</p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年3月15日 上午9:26:55）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Service
@Transactional
public class ObserverServiceImpl implements ObserverService {

	@Resource
	private ObserverMapper observerMapper;
	@Resource
	private LoginUserTempMapper loginUserTempMapper;

	/**
	 * 获取观测人员列表
	 */
	@Override
//	@Cacheable(value="lxl",key="#condition.cacheKey")
	public ResultBean<Page> getObserver(Map<String,Object> m) {
		
		List<UserInfo> userInfoAll = new ArrayList<UserInfo>();
		
		// 调用服务接口,获取标段下的所有用户信息
		List<UserInfo> userInfoList = new ArrayList<UserInfo>();
		List<UserInfo> userList = null;
		for(int i = 0; i < ((Long[])m.get("sectionids")).length; i++){
			userList = ServiceApiUtil.getUserInfoList(((Long[])m.get("sectionids"))[i]);
			userInfoList.addAll(userList);
			if(userList != null){
				userList.clear();
			}
		}
		// 添加到所有用户信息的结果集中
		for (UserInfo user : userInfoList) {

			// 普通用户
			if (Const.UserType.NORMAL == user.getUsertype()) {
				
				userInfoAll.add(user);
			}
		}
		
		List<Observer> list = new ArrayList<Observer>();
		
		// 创建分页的page对象
		Page page = new Page();
		try {

			// 获取观测人员数量
			int count = observerMapper.findObserverCount(m);
			// 页码
			page.setPageNo((Integer)m.get("pageNo"));
			// 数据总数
			page.setTotalCount(count);
			
			// 获得开始行号和结束行号
			Integer startNum = page.getStartNum();
			Integer endNum = page.getEndNum();
			m.put("startNum", startNum);
			m.put("endNum",endNum);
			page.setStartNum(startNum);
			page.setEndNum(endNum);
			
			// 获取观测人员列表
			list = observerMapper.selectObserver(m);
			
			
			for (Observer bean : list) {

				// 从基础平台取得用户信息,补足
				for (UserInfo user : userInfoAll) {

					if (bean.getId().equals(user.getId())) {
						
						bean.setMobile(user.getMobile());
						// 职务
						bean.setProName(user.getProName());
					}
				}
			}	
			if(list.size()>0){
				page.setList(list);
				return new ResultBean<Page>(ResultCodeTypeEunm.scuss.getKey(), ResultCodeTypeEunm.scuss.getValue(), page);
			}else{
				return new ResultBean<Page>(ResultCodeTypeEunm.scussButNull.getKey(), ResultCodeTypeEunm.scussButNull.getValue(), page);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return new ResultBean<Page>(ResultCodeTypeEunm.exception.getKey(), ResultCodeTypeEunm.exception.getValue(), page);
		}
	}

	/* 
	 * 查询观测人员
	 */
	@Override
	public ResultBean<List<Observer>> searchObserver(Long sectionId, Short useFlag) {

		// 所有的标段下的所有用户信息的结果集变量
		List<UserInfo> userInfoAll = new ArrayList<UserInfo>();
		
		// 调用服务接口,获取标段下的所有用户信息
		List<UserInfo> userInfoList = ServiceApiUtil.getUserInfoList(sectionId);

		// 添加到所有用户信息的结果集中
		for (UserInfo user : userInfoList) {

			// 普通用户
			if (Const.UserType.NORMAL == user.getUsertype()) {
				
				userInfoAll.add(user);
			}
		}
		
		// 根据标段ID获取相关的观测人员信息
		useFlag = useFlag == null ? -1 : useFlag;
		List<Observer> observerList = observerMapper.searchObserverBySectionId(sectionId, useFlag);

		List<Observer> beanList = new ArrayList<Observer>();
		
		/********************************************************************************/
		// 观测人员(观测人员表中 是否在用 为 在用 的用户)
		if (Const.UseFlag.USE == useFlag.shortValue()) {

			// 补足用户信息
			for (Observer bean : observerList) {

				// 从基础平台取得用户信息,补足
				for (UserInfo user : userInfoAll) {

					if (bean.getId().equals(user.getId())) {
						
						// Account
						bean.setAccount(user.getAccount());
						// 用户名
						bean.setUserName(user.getName());
						// 联系电话
						bean.setMobile(user.getMobile());
						// 职务
						bean.setProName(user.getProName());
						// 部门ID
						bean.setDepartmentId(user.getDepartmentid());

						// 标段ID (标段ID非空)
						bean.setSectionId(String.valueOf(sectionId));

						// 上岗证书扫描件
						String certificateScanPath = bean.getCertificateScan();
						// 前台请求用 (文件名中的点替换为特殊字符)
						certificateScanPath = certificateScanPath == null ? "" : certificateScanPath;
						certificateScanPath = certificateScanPath.replace(Const.Observer.DOT + Const.Observer.SUFFIX_1, Const.Observer.SP + Const.Observer.SUFFIX_1);
						certificateScanPath = certificateScanPath.replace(Const.Observer.DOT + Const.Observer.SUFFIX_2, Const.Observer.SP + Const.Observer.SUFFIX_2);
						certificateScanPath = certificateScanPath.replace(Const.Observer.DOT + Const.Observer.SUFFIX_3, Const.Observer.SP + Const.Observer.SUFFIX_3);
						
						bean.setCertificateScan(certificateScanPath);
						
						beanList.add(bean);
					}
				}

			}

			// 返回结果
			return new ResultBean<List<Observer>> (0, "OK", beanList);
		}

		/********************************************************************************/
		// 全部
		// 或者 非观测用户(观测人员表中 是否在用 为 删除 的用户)
		boolean isObserver = false;
		
		// 全部用户 进行查询
		for (int i = 0, size = userInfoAll.size(); i < size; i++) {

			UserInfo user = userInfoAll.get(i);
			
			Observer bean = new Observer();
			
			// ID
			bean.setId(user.getId());
			// 标段ID
			bean.setSectionId(String.valueOf(sectionId));

			// 观测人员表中数据
			for (Observer observer : observerList) {
				
				if (user.getId().equals(observer.getId())) {

					// 如果观测人员表中 是否在用 为 在用,则是观测人员
					short obUserFlag = observer.getUseFlag() == null ? Const.UseFlag.DELETE : observer.getUseFlag().shortValue();
					if (Const.UseFlag.USE == obUserFlag) {

						// 上岗证书编号
						bean.setCertificateNumber(observer.getCertificateNumber());
						// 上岗证书扫描件
						String certificateScanPath = observer.getCertificateScan();
						// 前台请求用 (文件名中的点替换为特殊字符)
						certificateScanPath = certificateScanPath == null ? "" : certificateScanPath;
						certificateScanPath = certificateScanPath.replace(Const.Observer.DOT + Const.Observer.SUFFIX_1, Const.Observer.SP + Const.Observer.SUFFIX_1);
						certificateScanPath = certificateScanPath.replace(Const.Observer.DOT + Const.Observer.SUFFIX_2, Const.Observer.SP + Const.Observer.SUFFIX_2);
						certificateScanPath = certificateScanPath.replace(Const.Observer.DOT + Const.Observer.SUFFIX_3, Const.Observer.SP + Const.Observer.SUFFIX_3);
						
						bean.setCertificateScan(certificateScanPath);
						
						// 是否在用
						bean.setUseFlag(observer.getUseFlag());
						
						isObserver = true;
						break;
					}
				}
			}

			// 查找条件是 非观测人员, 但是观测人员表中数据为观测人员的情况
			if (Const.UseFlag.DELETE == useFlag.shortValue() && isObserver) {

				// 不追加到结果中
			} else {

				// Account
				bean.setAccount(user.getAccount());
				// 用户名
				bean.setUserName(user.getName());
				// 联系电话
				bean.setMobile(user.getMobile());
				// 职务
				bean.setProName(user.getProName());
				// 部门ID
				bean.setDepartmentId(user.getDepartmentid());
				
				beanList.add(bean);
			}
			
			// 必须还原
			isObserver = false;
		}
		
		ResultBean<List<Observer>> result = new ResultBean<List<Observer>> (0, "OK", beanList);
		return result;
	}

	/* 
	 * 设为观测人员
	 */
	@Override
	public ResultBean<List<Observer>> saveObserver(Observer observer) {
		
		// 是否在用 设为 在用
		observer.setUseFlag(new Short(Const.UseFlag.USE));
		
		// 保存数据到观测人员
		try {
		    observerMapper.saveObserver(observer);
        } catch (Exception e) {
            e.printStackTrace();
        }
		
		// 更新登陆用户临时表
		LoginUserTemp loginUserTemp = new LoginUserTemp();
		loginUserTemp.setAccount(observer.getAccount());
		loginUserTempMapper.saveLoginUserForObserver(loginUserTemp);
		
		ResultBean<List<Observer>> result = new ResultBean<List<Observer>> (0, "OK", null);
		return result;
	}

	/* 
	 * 设为非观测人员
	 */
	@Override
	public ResultBean<List<Observer>> cancelObserver(Observer observer) {

		// 设为非观测人员
		observerMapper.cancelObserver(observer);
		
		// 更新登陆用户临时表
		LoginUserTemp loginUserTemp = new LoginUserTemp();
		loginUserTemp.setAccount(observer.getAccount());
		loginUserTempMapper.cancelLoginUserForObserver(loginUserTemp);
		
		ResultBean<List<Observer>> result = new ResultBean<List<Observer>> (0, "OK", null);
		return result;
	}

	/* 
	 * 上传上岗证书文件
	 */
	@Override
	public String upload(MultipartFile file, String fileName) {
		
		return FileUploadUtil.upload(file, fileName);
	}
}
