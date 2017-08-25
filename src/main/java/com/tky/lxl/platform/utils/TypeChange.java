package com.tky.lxl.platform.utils;
/**
 * 
 * <p>Title:TypeChange </p>
 * <p>Description: 类型转换的数组</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年4月3日 上午11:54:58）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
public class TypeChange {

	/**
	 * 将string类型的数组转换成int类型的数字
	 * @param val
	 * @return
	 */
	public static Long[] stringToInt(String val){
		String[] split = val.split(",");
		Long[] value=new Long[split.length];
		for(int i=0;i<split.length;i++){
			value[i]=Long.valueOf(split[i]);
		}
		return value;
	}
}
