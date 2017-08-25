package com.tky.lxl.platform.utils;

import java.util.List;

import org.springframework.web.client.RestTemplate;

import com.tky.lxl.platform.finals.ServiceApiURLConst.BasePlatformURL;
import com.tky.lxl.platform.finals.ServiceApiURLConst.QlxxhURL;
import com.tky.lxl.platform.model.business.Centrespan;
import com.tky.lxl.platform.model.business.Department;
import com.tky.lxl.platform.model.business.Lxl;
import com.tky.lxl.platform.model.business.PierBody;
import com.tky.lxl.platform.model.business.Segment;
import com.tky.lxl.platform.model.system.UserInfo;

/**
 * 
 * <p>Title: ServiceApiUtil</p>
 * <p>Description: 服务接口化工具类 参照轨道版精调的 WsClientForCenter.java </p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年3月13日 下午3:56:14）
 *
 * @version:1.0.0 copyright  2017-2018
 */
public class ServiceApiUtil {
	
	/**
	 * RestService服务接口化请求用
	 */
	private static RestTemplate restTemplate = new RestTemplate();

	/**
	 * 根据人员ID获取所在的部门类型（工管中心，路局/客专、二级公司、指挥部、标段项目部、工区项目部） 
	 * 
	 * @param userId
	 * @return
	 */
	public static Department getCurrentDep(Long userId){

		// java.util.List<Department>
		String urlRest = BasePlatformURL.ROOT_URL + String.format(BasePlatformURL.GET_CURRENT_DEPT, userId);
		urlRest = urlRest.concat(BasePlatformURL.API_KEY);
		System.out.println(urlRest);
		
		String jsonList = restTemplate.getForObject(urlRest, String.class);
		List<Department> beanList = BaseJSON.parseArray(jsonList, Department.class);

		if (beanList.size() == 0) {
			return null;
		}
		//510是工区用户，需要向上取到标段；150是二级公司，需要向上取到建设单位或路局
		for(Department item:beanList){
			if(510 == item.getGrade() || 150 == item.getGrade()){
				continue;
			}
			return item;
		}
		return null;
	}

	/**
	 * 根据用户account获取用户信息 
	 * 
	 * @param account - Account信息
	 * @return
	 */
	public static UserInfo getUserByAccount(String account) {
		
		// UserInfo
		String urlRest = BasePlatformURL.ROOT_URL + String.format(BasePlatformURL.GET_USER_BY_ACCOUNT, account);
		urlRest = urlRest.concat(BasePlatformURL.API_KEY);
		System.out.println(urlRest);
		
		UserInfo bean = restTemplate.getForObject(urlRest, UserInfo.class);

		return bean;
	}

	/**
	 * 根据部门ID获取所有的人员信息
	 * 
	 * @param jsDeptId
	 * @return
	 */
	public static List<UserInfo> getAllUsersByDeptId(Long departmentId) {
		
		// java.util.List<UserInfo>
		String urlRest = BasePlatformURL.ROOT_URL + String.format(BasePlatformURL.GET_ALL_USERS_BY_DEPT_ID, departmentId);
		urlRest = urlRest.concat(BasePlatformURL.API_KEY);
		System.out.println(urlRest);
		
		String jsonList = restTemplate.getForObject(urlRest, String.class);
		List<UserInfo> beanList = BaseJSON.parseArray(jsonList, UserInfo.class);

		return beanList;
	}

	/**
	 * 根据标段ID获取标段下的用户信息 
	 * 
	 * @param sectionId
	 * @return
	 */
	public static List<UserInfo> getUserInfoList(Long sectionId){
		
		// java.util.List<UserInfo>
		String urlRest = BasePlatformURL.ROOT_URL + String.format(BasePlatformURL.GET_USER_INFO_LIST, sectionId);
		urlRest = urlRest.concat(BasePlatformURL.API_KEY);
		System.out.println(urlRest);
		
		String jsonList = restTemplate.getForObject(urlRest, String.class);
		List<UserInfo> beanList = BaseJSON.parseArray(jsonList, UserInfo.class);

		return beanList;
	}

	/**
	 * 获取登录用户授权信息
	 * 
	 * @param sessionId
	 * @return
	 */
	public static UserInfo getAuthInfo(String sessionId) {

		String urlRest = BasePlatformURL.ROOT_URL + String.format(BasePlatformURL.GET_SSO, sessionId);
		urlRest = urlRest.concat(BasePlatformURL.API_KEY);
		System.out.println(urlRest);
		
		UserInfo user = restTemplate.getForObject(urlRest, UserInfo.class);
		
		return user;
	}

	/**
	 * 获取连续梁
	 * 
	 * @param sessionId
	 * @return
	 */
	public static List<Lxl> getLxl(Long secctionId) {

		String urlRest = QlxxhURL.ROOT_URL + String.format(QlxxhURL.GET_LXL, secctionId);
		urlRest = urlRest.concat(QlxxhURL.API_KEY);
		System.out.println(urlRest);
		
		String jsonList = restTemplate.getForObject(urlRest, String.class);
		List<Lxl> beanList = BaseJSON.parseArray(jsonList, Lxl.class);

		return beanList;
	}

	/**
	 * 获取构件-中跨
	 * 
	 * @param sessionId
	 * @return
	 */
	public static List<Centrespan> getCentrespan(Long secctionId) {

		String urlRest = QlxxhURL.ROOT_URL + String.format(QlxxhURL.GET_CENTRE_SPAN, secctionId);
		urlRest = urlRest.concat(QlxxhURL.API_KEY);
		System.out.println(urlRest);
		
		String jsonList = restTemplate.getForObject(urlRest, String.class);
		List<Centrespan> beanList = BaseJSON.parseArray(jsonList, Centrespan.class);

		return beanList;
	}

	/**
	 * 获取构件-节段
	 * 
	 * @param sessionId
	 * @return
	 */
	public static List<Segment> getSegment(Long secctionId) {

		String urlRest = QlxxhURL.ROOT_URL + String.format(QlxxhURL.GET_SEGMENT, secctionId);
		urlRest = urlRest.concat(QlxxhURL.API_KEY);
		System.out.println(urlRest);
		
		String jsonList = restTemplate.getForObject(urlRest, String.class);
		List<Segment> beanList = BaseJSON.parseArray(jsonList, Segment.class);

		return beanList;
	}

	/**
	 * 获取墩身
	 * 
	 * @param sessionId
	 * @return
	 */
	public static List<PierBody> getPierBody(Long secctionId) {

		String urlRest = QlxxhURL.ROOT_URL + String.format(QlxxhURL.GET_PIER_BODY, secctionId);
		urlRest = urlRest.concat(QlxxhURL.API_KEY);
		System.out.println(urlRest);
		
		String jsonList = restTemplate.getForObject(urlRest, String.class);
		List<PierBody> beanList = BaseJSON.parseArray(jsonList, PierBody.class);

		return beanList;
	}
}
