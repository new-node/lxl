package com.tky.lxl.platform.utils;

import java.io.Serializable;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 
 * <p>Title: ResultBean</p>
 * <p>Description: 前台交互结果</p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年3月17日 上午10:40:17）
 *
 * @version:1.0.0 copyright  2017-2018
 * @param <T>
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class ResultBean<T>  implements Serializable{

	private static final long serialVersionUID = 1L;
	
	/**
	 * 处理正常结束 : 0
	 */
	public static final int OK = 0;
	/**
	 * 处理异常结束 : -1
	 */
	public static final int NG = -1;
	
	/**
	 * 提示信息
	 */
	private String msg;
	/**
	 * 结果标志Code
	 */
	private Integer code;
	/**
	 * 结果(泛型)
	 */
	private T result;

	public ResultBean() {

	}

	/**
	 * 构造函数
	 * 
	 * @param code
	 * @param msg
	 * @param result
	 */
	public ResultBean(Integer code, String msg, T result) {
		this.code = code;
		this.msg = msg;
		this.result = result;
	}
}
