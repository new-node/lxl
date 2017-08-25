package com.tky.lxl.platform.aop;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import java.lang.annotation.ElementType;
import java.lang.annotation.RetentionPolicy;
/**
 * 
 * <p>Title:UserOperateLog </p>
 * <p>Description: 定义拦截用户操作日志的注解</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年2月28日 下午2:56:38）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Target({ElementType.PARAMETER, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface UserOperateLog {
	String description()  default "";
}
