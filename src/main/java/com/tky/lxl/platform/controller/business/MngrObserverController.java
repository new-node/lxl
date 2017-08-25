/**
 * 
 */
package com.tky.lxl.platform.controller.business;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.tky.lxl.platform.aop.UserOperateLog;
import com.tky.lxl.platform.finals.Const;
import com.tky.lxl.platform.model.business.Observer;
import com.tky.lxl.platform.service.business.ObserverService;
import com.tky.lxl.platform.utils.FileUploadUtil;
import com.tky.lxl.platform.utils.ResultBean;

/**
 * <p>Title: SmObserverController</p>
 * <p>Description: 标段管理员 设置观测人员</p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年3月15日 下午1:12:34）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Controller
@RequestMapping("/mngrObserver")
public class MngrObserverController {

	@Resource
	private ObserverService observerService;

	/**
	 * 查询观测人员
	 * 
	 * @param session
	 * @param useFlag
	 * @return
	 */
	@RequestMapping(value = "searchObserver", method = RequestMethod.POST)
	@ResponseBody
	public ResultBean<List<Observer>> searchObserver(Long sectionId, Short useFlag) {

		ResultBean<List<Observer>> result = observerService.searchObserver(sectionId, useFlag);
		return result;
	}
	
	/**
	 * 设为观测人员
	 * 
	 * @param session
	 * @param file
	 * @param observer
	 * @return
	 */
    @UserOperateLog(description = "设为观测人员")
	@RequestMapping("saveObserver")
	@ResponseBody
	public ResultBean<List<Observer>> saveObserver(
		HttpSession session, 
		// value必须是小写, 前台如果加判断是否选择文件,这里可不加rerequired=false
		@RequestParam(value="certificatescan", required=false) MultipartFile file,
		Observer observer) throws IOException {

		// 前台如果加判断是否选择文件,这里可不加判断
		if (file != null) {
			// 上岗证书扫描件文件名: 用户登陆名-原始上传文件名
			String originalFileName = file.getOriginalFilename();
			
			// 只保留后缀名
			if (originalFileName.indexOf(Const.Observer.DOT + Const.Observer.SUFFIX_1) >= 0) {
				
				originalFileName = Const.Observer.DOT + Const.Observer.SUFFIX_1;
			}
			else if (originalFileName.indexOf(Const.Observer.DOT + Const.Observer.SUFFIX_2) >= 0) {

				originalFileName = Const.Observer.DOT + Const.Observer.SUFFIX_2;
			}
			else if (originalFileName.indexOf(Const.Observer.DOT + Const.Observer.SUFFIX_3) >= 0) {

				originalFileName = Const.Observer.DOT + Const.Observer.SUFFIX_3;
			}
			
			String certificateScanName = observer.getAccount() + "-certificate" + originalFileName;
			
			// 上传证书
			observerService.upload(file, certificateScanName);
			// 上岗证书文件名(上传后保存的文件名)
			observer.setCertificateScan(certificateScanName);
		}
		// 保存观测人员
		return observerService.saveObserver(observer);
	}

	/**
	 * 取消观测人员
	 * 
	 * @param session
	 * @param observer
	 * @return
	 */
	@UserOperateLog(description = "取消观测人员")
	@RequestMapping("cancelObserver")
	@ResponseBody
	public ResultBean<List<Observer>> cancelObserver(HttpSession session, Observer observer) {

		return observerService.cancelObserver(observer);
	}

	/**
	 * 查看证书(RESTFull接口)
	 * 
	 * @param response
	 * @param fileName
	 * @return
	 */
    @RequestMapping(value="viewCertificate/{fileName}", method=RequestMethod.GET)
	@ResponseBody
	public String viewCertificate(HttpServletRequest request, HttpServletResponse response, @PathVariable String fileName) {

		FileInputStream fis = null;
		OutputStream os = null;
		
		try {

			// 前台请求用时为了避免错误使用 特殊字符 代替 文件名中的点
			// 在此处还原为 点
			System.out.println(fileName);
			fileName = fileName.replace(Const.Observer.SP + Const.Observer.SUFFIX_1, Const.Observer.DOT + Const.Observer.SUFFIX_1);
			fileName = fileName.replace(Const.Observer.SP + Const.Observer.SUFFIX_2, Const.Observer.DOT + Const.Observer.SUFFIX_2);
			fileName = fileName.replace(Const.Observer.SP + Const.Observer.SUFFIX_3, Const.Observer.DOT + Const.Observer.SUFFIX_3);
			
			String fileFullPath = FileUploadUtil.ROOT_PATH.concat(fileName);
			System.out.println(fileFullPath);

			File f = new File(fileFullPath);
			// 文件不存在的情况,使用默认图片
			if (!f.exists()) {

				return String.valueOf(ResultBean.NG);
			}
			
			// 获取流
			fis = new FileInputStream(fileFullPath);
			os = response.getOutputStream();
			
			// 按字节读取写到Response中
			int count = 0;
			byte[] buffer = new byte[1024 * 8];
			while ((count = fis.read(buffer)) != -1) {
				os.write(buffer, 0, count);
				os.flush();
			}
		} catch (IOException e) {
			
			e.printStackTrace();
		}

		// 关闭对象
		try {
			if (fis != null ) { fis.close(); }
			if (os != null ) { os.close(); }
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return String.valueOf(ResultBean.OK);
	}
}
