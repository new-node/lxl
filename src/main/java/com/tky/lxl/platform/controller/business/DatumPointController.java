package com.tky.lxl.platform.controller.business;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.tky.lxl.platform.aop.UserOperateLog;
import com.tky.lxl.platform.finals.Const;
import com.tky.lxl.platform.finals.URLConst;
import com.tky.lxl.platform.model.Page;
import com.tky.lxl.platform.model.business.DatumPoint;
import com.tky.lxl.platform.model.business.DatumPointRecordList;
import com.tky.lxl.platform.model.system.UserInfo;
import com.tky.lxl.platform.service.business.DatumPointService;
import com.tky.lxl.platform.utils.ResultBean;

/**
 * 
 * <p>Title: DatumPointController</p>
 * <p>Description: 基点信息</p>
 * <p>Company: 铁科院</p> 
 *
 * @author yushanli（2017年3月5日 下午9:36:09）
 *
 * @version:1.0.0 copyright © 2017-2018
 */

@Controller
@RequestMapping("/datum")

public class DatumPointController {

	@Resource
	private DatumPointService datumPointService;

	@RequestMapping("/getDatumPoint")
	public String getDatumPoint(Model model) {

		return URLConst.URL_DATUM_POINT;
	}

	/**
	 * 获取基点信息列表
	 * @param pageNo当前页
	 * @param lxlid 连续梁ID
	 * @return
	 */
	@RequestMapping(value = "getDatumPointList", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public ResultBean<Page> getDatumPointList(Integer pageNo,Long lxlid) {
		DatumPoint condition = new DatumPoint();
		// 判断是否为第一页
		if (pageNo == null) {
			condition.setPageNo(Const.DEFAULT_PAGE);
		} else {
			condition.setPageNo(pageNo);
		}
		condition.setConbeamid(lxlid);
		ResultBean<Page> result = datumPointService.getTBase(condition);
		return result;
	}

	/**
	 * 逻辑删除基点信息，可以批量删除
	 * @param deleteDatumPointStr删除对象的json字符串
	 */
	@UserOperateLog(description = "逻辑删除基点信息，可以批量删除")
	@RequestMapping(value = "deleteDatumPoint", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public void deleteDatumPoint(String deleteDatumPointStr) {
		// json转为model对象
		List<DatumPoint> recordList = JSON.parseArray(deleteDatumPointStr, DatumPoint.class);
		for (DatumPoint record : recordList) {
			datumPointService.deleteTBase(record);
//			datumPointService.updateLxlPoint(record, false);
		}
	}

	/**
	 * 更新基点信息
	 * @param updateDatumPointStr基点信息更新对象的JSON字符串
	 * @param changeReason更新理由
	 */
	@UserOperateLog(description = "更新基点信息")
	@RequestMapping(value = "updateDatumPoint", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public void updateDatumPoint(String updateDatumPointStr, String changeReason,HttpSession session) {
		UserInfo userInfo = (UserInfo)session.getAttribute(Const.SessionKey.USER_INFO);
		DatumPoint record = JSON.parseObject(updateDatumPointStr, DatumPoint.class);
		datumPointService.updateTBase(record, changeReason,userInfo);
	}

	/**
	 * 向基点信息表新建一条数据
	 * @param addDatumPointStr新建model对象json字符串
	 */
	@UserOperateLog(description = "向基点信息表新建一条数据")
	@RequestMapping(value = "insertDatumPoint", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public void insertDatumPoint(String addDatumPointStr,HttpSession session) {
		UserInfo userInfo = (UserInfo)session.getAttribute(Const.SessionKey.USER_INFO);
		DatumPoint record = JSON.parseObject(addDatumPointStr, DatumPoint.class);
		record.setUsername(userInfo.getName());
	datumPointService.insertTBase(record, userInfo);
	}

	/**
	 * 查看数据的修正记录
	 * @param lxlid连续梁ID
	 * @param baseid基点信息ID
	 * @param ldid梁段ID
	 * @return
	 */
	@RequestMapping(value = "watchChangeRecord", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public ResultBean<DatumPointRecordList> watchChangeRecord(Long lxlid, Long baseid) {
		ResultBean<DatumPointRecordList> result = datumPointService.getChangeRecordHead(lxlid, baseid);
		return result;
	}
}
