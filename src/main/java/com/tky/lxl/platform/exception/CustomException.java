package com.tky.lxl.platform.exception;

/**
 * 
 * <p>Title:CustomException </p>
 * <p>Description: 系统自定义的异常类型，实际开发中可能要定义多种异常类型</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年2月10日 下午6:03:45）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public class CustomException extends Exception {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	//异常信息
	private String message;
	
	public CustomException(String message){
		super(message);
		this.message = message;
		
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	

}
