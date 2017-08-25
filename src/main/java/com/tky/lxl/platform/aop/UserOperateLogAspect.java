package com.tky.lxl.platform.aop;

import java.net.InetAddress;
import java.net.UnknownHostException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.tky.lxl.platform.finals.Const;
import com.tky.lxl.platform.model.system.UserInfo;
import com.tky.lxl.platform.model.system.UserOperate;
import com.tky.lxl.platform.service.system.UserOperateLogService;
import com.tky.lxl.platform.utils.MethodDescription; 

/**
 *  <p>Title: UserOperateLogAspect</p>
 *  <p>Description: 用户操作日志切面</p>
 *  <p>Company: 铁科院</p> 
 *
 *  @author sunjiashu（2017年4月17日  下午1:31:57）
 *
 *  @version:1.0.0  copyright  2017-2018
 */
@Aspect
@Component
public class UserOperateLogAspect {
	
	private static Logger logger = Logger.getLogger(UserOperateLogAspect.class);

	// 注入Service用于把日志保存数据库
	@Resource
	private UserOperateLogService userOperateLogService;

	/**
	 * 用户操作记录的Controller切点
	 */
	@Pointcut("@annotation(com.tky.lxl.platform.aop.UserOperateLog)")
	public void userOperateAspect() {
	}

	@Before("userOperateAspect()")
	public void doBefore(JoinPoint joinPoint) {

		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession();
		
		// 读取session中的用户
		UserInfo userInfo = (UserInfo) session.getAttribute(Const.SessionKey.USER_INFO);
		// 请求的IP
		String ip = null;
		try {
			
//			ip = InetAddress.getLocalHost().getHostAddress();
			ip=getIpAddress(request);
		} catch (Exception e1) {
			
			e1.printStackTrace();
		}
		
		try {
			// *========数据库日志=========*//
			UserOperate userOperate = new UserOperate();
			userOperate.setAccount(userInfo.getAccount());
			userOperate.setName(userInfo.getName());
			userOperate.setIp(ip);
			userOperate.setContent(MethodDescription.getControllerMethodDescription(joinPoint));

			// 保存数据库
			userOperateLogService.add(userOperate);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("==前置通知异常==");
		}
	}
	
	/**
	 * 获取客户端的IP地址
	 * @param request
	 * @return
	 */
	public static String getIpAddress(HttpServletRequest request){
		
		String ipAddress = request.getHeader("x-forwarded-for");
		
		if(ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getHeader("Proxy-Client-IP");
			logger.info("Proxy-Client-IP===="+ipAddress);
		}
		if (ipAddress == null || ipAddress.length() == 0 || "unknow".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getHeader("WL-Proxy-Client-IP");
			logger.info("WL-Proxy-Client-IP===="+ipAddress);
		}
		if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getRemoteAddr();
			logger.info("request.getRemoteAddr()===="+ipAddress);
			
			if(ipAddress.equals("127.0.0.1") || ipAddress.equals("0:0:0:0:0:0:0:1")){
				//根据网卡获取本机配置的IP地址
				InetAddress inetAddress = null;
				try {
					inetAddress = InetAddress.getLocalHost();
				} catch (UnknownHostException e) {
					e.printStackTrace();
				}
				ipAddress = inetAddress.getHostAddress();
				logger.info("inetAddress.getHostAddress()===="+ipAddress);
			}
		}
		logger.info("全部===="+ipAddress);
		//对于通过多个代理的情况，第一个IP为客户端真实的IP地址，多个IP按照','分割
		if(null != ipAddress && ipAddress.length() > 15){
			//"***.***.***.***".length() = 15
			if(ipAddress.indexOf(",") > 0){
				ipAddress = ipAddress.substring(0, ipAddress.indexOf(","));
				logger.info("截取===="+ipAddress);
			}
		}
		
		return ipAddress;
	}
}
