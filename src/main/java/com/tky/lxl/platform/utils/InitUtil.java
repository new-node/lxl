/**
 * 初始化处理工具类
 */
package com.tky.lxl.platform.utils;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Iterator;
import java.util.Properties;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import com.tky.lxl.platform.finals.Const;
import com.tky.lxl.platform.finals.Const.PageSize;
import com.tky.lxl.platform.finals.ServiceApiURLConst;

/**
 * <p>Title: InitUtil</p>
 * <p>Description: 初始化工具类</p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年3月14日 上午11:06:11）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Component
public class InitUtil implements ApplicationListener<ContextRefreshedEvent> {
	
	public static final String SETTING_FILE = "setting.properties";
	
	/**
	 * 初始化常量
	 */
	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {

		// root application context初始化完成后
		if (event.getApplicationContext().getParent() == null) {

			// 类加载的路径
			String classLoadPath = InitUtil.class.getClassLoader().getResource("").getPath();
			
			Properties prop = new Properties();
			try {
				String settingFile = classLoadPath.concat(SETTING_FILE);

				// 读取
				InputStream in = new BufferedInputStream(new FileInputStream(settingFile));
				prop.load(in);
				Iterator<String> it = prop.stringPropertyNames().iterator();

				while (it.hasNext()) {
					String strKey = it.next();
					
					// 基础平台
					if (ServiceApiURLConst.BasePlatformURL.ROOT_URL_KEY.equalsIgnoreCase(strKey)) {
						ServiceApiURLConst.BasePlatformURL.ROOT_URL = prop.getProperty(strKey);
					}
					if (ServiceApiURLConst.BasePlatformURL.API_KEY_KEY.equalsIgnoreCase(strKey)) {
						ServiceApiURLConst.BasePlatformURL.API_KEY = prop.getProperty(strKey);
					}
					if (ServiceApiURLConst.BasePlatformURL.GET_SSO_KEY.equalsIgnoreCase(strKey)) {
						ServiceApiURLConst.BasePlatformURL.GET_SSO = prop.getProperty(strKey);
					}
					if (ServiceApiURLConst.BasePlatformURL.GET_USER_BY_ACCOUNT_KEY.equalsIgnoreCase(strKey)) {
						ServiceApiURLConst.BasePlatformURL.GET_USER_BY_ACCOUNT = prop.getProperty(strKey);
					}
					if (ServiceApiURLConst.BasePlatformURL.GET_CURRENT_DEPT_KEY.equalsIgnoreCase(strKey)) {
						ServiceApiURLConst.BasePlatformURL.GET_CURRENT_DEPT = prop.getProperty(strKey);
					}
					if (ServiceApiURLConst.BasePlatformURL.GET_ALL_USERS_BY_DEPT_ID_KEY.equalsIgnoreCase(strKey)) {
						ServiceApiURLConst.BasePlatformURL.GET_ALL_USERS_BY_DEPT_ID = prop.getProperty(strKey);
					}
					if (ServiceApiURLConst.BasePlatformURL.GET_USER_INFO_LIST_KEY.equalsIgnoreCase(strKey)) {
						ServiceApiURLConst.BasePlatformURL.GET_USER_INFO_LIST = prop.getProperty(strKey);
					}
					// 桥梁形象化
					if (ServiceApiURLConst.QlxxhURL.ROOT_URL_KEY.equalsIgnoreCase(strKey)) {
						ServiceApiURLConst.QlxxhURL.ROOT_URL = prop.getProperty(strKey);
					}
					if (ServiceApiURLConst.QlxxhURL.API_KEY_KEY.equalsIgnoreCase(strKey)) {
						ServiceApiURLConst.QlxxhURL.API_KEY = prop.getProperty(strKey);
					}
					if (ServiceApiURLConst.QlxxhURL.GET_LXL_KEY.equalsIgnoreCase(strKey)) {
						ServiceApiURLConst.QlxxhURL.GET_LXL = prop.getProperty(strKey);
					}
					if (ServiceApiURLConst.QlxxhURL.GET_CENTRE_SPAN_KEY.equalsIgnoreCase(strKey)) {
						ServiceApiURLConst.QlxxhURL.GET_CENTRE_SPAN = prop.getProperty(strKey);
					}
					if (ServiceApiURLConst.QlxxhURL.GET_SEGMENT_KEY.equalsIgnoreCase(strKey)) {
						ServiceApiURLConst.QlxxhURL.GET_SEGMENT = prop.getProperty(strKey);
					}
					if (ServiceApiURLConst.QlxxhURL.GET_PIER_BODY_KEY.equalsIgnoreCase(strKey)) {
						ServiceApiURLConst.QlxxhURL.GET_PIER_BODY = prop.getProperty(strKey);
					}

					// 文件上传根路径
					if (FileUploadUtil.ROOT_PATH_KEY.equalsIgnoreCase(strKey)) {
						FileUploadUtil.ROOT_PATH = prop.getProperty(strKey);
					}

					// 偏差超限和桥梁首页偏差超限
					if (PageSize.BRIDGE_PCCX_PAGESIZE.equals(strKey)){
						PageUtil.BRIDGE_PCCX_PAGESIZE =  prop.getProperty(strKey);
					}

					if(PageSize.PCCX_PAGESIZE.equals(strKey)){
						PageUtil.PCCX_PAGESIZE =  prop.getProperty(strKey);
					}
					// 测量信息显示件数
					if(PageSize.MEASUREINFO_PAGESIZE.equals(strKey)){
						PageUtil.MEASUREINFO_PAGESIZE =  prop.getProperty(strKey);
					}
					
					if(Const.REFERERPATH.equals(strKey)){
						Const.REFERERPATHVALUE=prop.getProperty(strKey);
					}
				}
				in.close();
				
				/*************************************************************************/
				// 上岗证书文件不存在的情况下,默认显示图片的路径
				File loadPath = new File(classLoadPath);
				File parent = loadPath.getParentFile();
				String grade = parent.getParent();
				FileUploadUtil.NO_IMG = grade.concat("/static/images/alert.png");
				
			} catch (Exception e) {
				e.printStackTrace();
			}

			System.out.println("FileUploadUtil.ROOT_PATH : " + FileUploadUtil.ROOT_PATH);
			System.out.println("FileUploadUtil.NO_IMG : " + FileUploadUtil.NO_IMG);

			System.out.println("BasePlatformURL.ROOT_URL : " + ServiceApiURLConst.BasePlatformURL.ROOT_URL);
			System.out.println("BasePlatformURL.API_KEY : " + ServiceApiURLConst.BasePlatformURL.API_KEY);
			System.out.println("BasePlatformURL.GET_SSO : " + ServiceApiURLConst.BasePlatformURL.GET_SSO);
			System.out.println("BasePlatformURL.GET_USER_BY_ACCOUNT : " + ServiceApiURLConst.BasePlatformURL.GET_USER_BY_ACCOUNT);
			System.out.println("BasePlatformURL.GET_CURRENT_DEPT : " + ServiceApiURLConst.BasePlatformURL.GET_CURRENT_DEPT);
			System.out.println("BasePlatformURL.GET_ALL_USERS_BY_DEPT_ID : " + ServiceApiURLConst.BasePlatformURL.GET_ALL_USERS_BY_DEPT_ID);
			System.out.println("BasePlatformURL.GET_USER_INFO_LIST : " + ServiceApiURLConst.BasePlatformURL.GET_USER_INFO_LIST);
			
			System.out.println("QlxxhURL.ROOT_URL : " + ServiceApiURLConst.QlxxhURL.ROOT_URL);
			System.out.println("QlxxhURL.API_KEY : " + ServiceApiURLConst.QlxxhURL.API_KEY);
			System.out.println("QlxxhURL.GET_LXL : " + ServiceApiURLConst.QlxxhURL.GET_LXL);
			System.out.println("QlxxhURL.GET_CENTRE_SPAN : " + ServiceApiURLConst.QlxxhURL.GET_CENTRE_SPAN);
			System.out.println("QlxxhURL.GET_SEGMENT : " + ServiceApiURLConst.QlxxhURL.GET_SEGMENT);
			System.out.println("QlxxhURL.GET_PIER_BODY : " + ServiceApiURLConst.QlxxhURL.GET_PIER_BODY);
		}
	}
}
