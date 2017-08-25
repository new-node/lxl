package com.tky.lxl.platform.utils;

import com.alibaba.fastjson.serializer.JSONSerializer;
import com.alibaba.fastjson.serializer.PropertyPreFilter;
import com.alibaba.fastjson.serializer.SerialContext;


public class BasePropertyPreFilter implements PropertyPreFilter {

	/**
	 * 要过滤的表达式数组
	 */
	String[] filterProperties;
	/**
	 * 符合过滤表达式的字段是否要json序列号
	 */
	boolean flag = false;

	public BasePropertyPreFilter(String[] filterProperties, boolean flag) {
		this.filterProperties = filterProperties;
		this.flag = flag;
	}

	/**
	 * 判断过滤表达式中是否含有此属性值
	 * 
	 * @param ss
	 * @param s
	 * @return boolean
	 */
	private static boolean containInclude(String[] ss, String s) {
		if (ss == null || ss.length == 0 || s == null){
//			System.out.println("false");
			return false;
		}
		for (String st : ss){
			if (st.equalsIgnoreCase(s)) {
//				System.out.println("true");
				return true;
			}
		}
//		System.out.println("false");
		return false;
	}

	/**
	 * 获取处理当前元素的路径表达式
	 * 如：Object.name
	 * 
	 * @param serialContext
	 * @return String
	 */
	private static String getLinkPath(SerialContext serialContext) {
//		System.out.println(String.valueOf(serialContext.getFieldName()));
		if (serialContext.getParent() == null) {
			return null;
		} else {
			if (serialContext.getParent().getFieldName() instanceof Integer) {
				String parentPath = getLinkPath(serialContext.getParent().getParent());
				return parentPath == null ? String.valueOf(serialContext.getFieldName()) : (parentPath + "." + String.valueOf(serialContext.getFieldName()));
			} else {
				String parentPath = getLinkPath(serialContext.getParent());
				return parentPath == null ? String.valueOf(serialContext.getFieldName()) : (parentPath + "." + String.valueOf(serialContext.getFieldName()));
			}
		}
	}

	/**
	 * <p>
	 * 过滤条件的判断
	 * </p>
	 * 
	 * @param serializer
	 * @param source
	 * @param name
	 * @return
	 * @see com.alibaba.fastjson.serializer.PropertyPreFilter#apply(com.alibaba.fastjson.serializer.JSONSerializer, java.lang.Object, java.lang.String)
	 */
	@Override
	public boolean apply(JSONSerializer serializer, Object source, String name) {
		SerialContext nowContext = new SerialContext(serializer.getContext(), source, name);
		String nowPath = getLinkPath(nowContext);
//		System.out.println("path->" + nowPath);
		if(this.flag==true){
			return containInclude(filterProperties, nowPath);
		}else{
			return (!containInclude(filterProperties, nowPath));
		}
	}

}
