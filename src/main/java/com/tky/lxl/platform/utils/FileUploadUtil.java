package com.tky.lxl.platform.utils;

import java.io.File;
import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

/**
 * <p>Title: FileUploadUtil</p>
 * <p>Description: 文件上传工具类</p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年3月16日 下午3:56:47）
 *
 * @version:1.0.0 copyright  2017-2018
 */
public class FileUploadUtil {
	
	/**
	 * 下划线 
	 */
	public static final String UNDER_BAR = "_";
	/**
	 * 点
	 */
	public static final String DOT = ".";
	
	/**
	 * 上传文件保存路径属性KEY
	 */
	public static String ROOT_PATH_KEY = "fileupload.path";
	/**
	 * 上传文件保存路径(系统初始化后,从配置文件读取)
	 */
	public static String ROOT_PATH = "";
	/**
	 * 上岗证书文件不存在的情况,使用默认图片(系统初始化后设置)
	 */
	public static String NO_IMG = "";
	

	/**
	 * 上传
	 *  上传成功的情况下,返回值为上传路径
	 *  上传失败的情况下,返回值为空字符串
	 * 
	 * @param file - 上传文件
	 * @param fileName - 保存用文件名
	 * @return
	 */
	public static String upload(MultipartFile file, String fileName) {

		// 初始化时,从配置文件读取上传目录
		String path = ROOT_PATH.concat(fileName);

		try {

			// 路径不存在则创建
			File filePath = new File(path);
			if (!filePath.exists()) {
				filePath.mkdirs();
			}

			// 上传
			file.transferTo(new File(path));
		} catch (IOException ex) {

			// 上传失败的情况下,返回值为空字符串
			path = "";
			ex.printStackTrace();
		}

		return path;
	}
}
