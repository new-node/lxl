package com.tky.lxl.platform.utils;

import java.lang.reflect.Method;

import org.aspectj.lang.JoinPoint;

import com.tky.lxl.platform.aop.UserOperateLog;

/**
 * 
 * <p>Title:MethodDescription </p>
 * <p>Description: 用于获取注解中的描述信息</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年2月28日 下午4:00:12）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public class MethodDescription {

	/**  
     * 获取注解中对方法的描述信息
     *  
     * @param joinPoint 切点  
     * @return 方法描述  
     * @throws Exception  
     */    
     public  static String getControllerMethodDescription(JoinPoint joinPoint)  throws Exception {
        String targetName = joinPoint.getTarget().getClass().getName();
        String methodName = joinPoint.getSignature().getName();
        Object[] arguments = joinPoint.getArgs();
        Class targetClass = Class.forName(targetName);
        Method[] methods = targetClass.getMethods();
        String description = "";
         for (Method method : methods) {
             if (method.getName().equals(methodName)) {
                Class[] clazzs = method.getParameterTypes();
                 if (clazzs.length == arguments.length) {
                    description = method.getAnnotation(UserOperateLog. class).description();
                     break;
                }
            }
        }
         return description;
    }   
}
