package com.tky.lxl.platform.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {

	/**
	 * 获取当前时间 
	 * @return
	 */
	public static String getNowDate(){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
		return df.format(new Date());
	}
	
	/**
	 * 将日期格式的数据转换成String类型
	 * @param date
	 * @return
	 */
	public static String dateToString(Date date){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");//设置日期格式
		return df.format(date);
	}
	
	/**
	 * 将String类型转换成Date类型
	 * @param dateString
	 * @return
	 */
	public static Date stringToDate(String dateString){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");  
		Date date = null;
		try {
			date = sdf.parse(dateString);
		} catch (ParseException e) {
			e.printStackTrace();
		}  
		return date;
	}
}
