package com.tky.lxl.platform.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.util.StringUtils;

public class TokenVerify {

	private static Logger logger=Logger.getLogger(TokenVerify.class);
	/**  
	* 根据请求地址获取token-key  
	*/  
	public static String getTokenKey (HttpServletRequest request) { 
		String key = null ; 
		try { 
				MessageDigest mDigest = MessageDigest.getInstance( "MD5" ); //摘要算法可以自己选择  
				byte [] result = mDigest.digest(request.getRequestURL().toString().getBytes()); 
				key = bytesToHexString(result);
			} catch (NoSuchAlgorithmException e) { 
				logger.error( "get token key failed" ,e); 
		}
		return key;
	} 
	 
	/**  
	* 获取token-value并存储在session中  
	*/  
	public static String getTokenValue (HttpServletRequest request) { 
	String key = getTokenKey(request); 
	Map<String,String> tokenMap = null ; 
	Object obj = request.getSession().getAttribute( "tokenMap" ); 
	if (obj == null ){ 
		tokenMap = new HashMap<String,String>(); 
		request.getSession().setAttribute( "tokenMap" , tokenMap); 
	} else { 
		tokenMap = (Map<String,String>)obj; 
	} 
	if (tokenMap.containsKey(key)){ 
	return tokenMap.get(key); 
	} 
//	String value = GUID.generate(); //GUID实现可自行百度，其实弄个伪随机数也是可以的...  
	String value=UUID.randomUUID().toString();
	tokenMap.put(key,value); 
	return value; 
	} 
	 
	/**  
	* 验证token  
	*/  
	public static boolean verify (String key ,String value ,HttpServletRequest request) { 
	boolean result = false ; 
	if (StringUtils.isEmpty(key) || StringUtils.isEmpty(value)) { //key或value只要有一个不存在就验证不通过  
		return result; 
	} 
	 
	if (request.getSession() != null ) {
			Map<String,String> tokenMap = getTokenMap(request); 
			if (value.equals(tokenMap.get(key))){ 
				result = true ; 
				tokenMap.remove(key); //成功一次就失效  
			} 
		} 
		return result; 
	}

	public static String bytesToHexString(byte[] src){   
	    StringBuilder stringBuilder = new StringBuilder("");   
	    if (src == null || src.length <= 0) {   
	        return null;   
	    }   
	    for (int i = 0; i < src.length; i++) {   
	        int v = src[i] & 0xFF;   
	        String hv = Integer.toHexString(v);   
	        if (hv.length() < 2) {   
	            stringBuilder.append(0);   
	        }   
	        stringBuilder.append(hv);   
	    }   
	    return stringBuilder.toString();   
	}   
	private static Map<String, String> getTokenMap(HttpServletRequest request) {
		Map<String, String> tokenMap = new HashMap<String, String>();
		tokenMap.put(request.getSession().getAttribute("token_key").toString(), request.getSession().getAttribute("token_value").toString());
		return tokenMap;
	} 
}
