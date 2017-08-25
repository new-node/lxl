package com.tky.lxl.platform.serviceimpl.business;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tky.lxl.platform.dao.business.MeasureInfoMapper;
import com.tky.lxl.platform.model.Page;
import com.tky.lxl.platform.model.business.MeasureInfo;
import com.tky.lxl.platform.service.business.MeasureInfoService;
import com.tky.lxl.platform.utils.PageUtil;

/**
 * <p>Title: MeasureInfoServiceImpl</p>
 * <p>Description: 测量信息</p>
 * <p>Company: 铁科院</p> 
 *
 * @author liuzhenya（2017年3月2日 上午10:58:40）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Service("MeasureInfoService")
@Transactional
public class MeasureInfoServiceImpl implements MeasureInfoService {

	@Resource
	private MeasureInfoMapper measureInfoMapper;

	/**
	 * 获取测量信息
	 * @param conbeamID 连续梁ID
	 * @param pier	T构
	 * @param shortName 梁段号
	 * @param gkbm	工况编码
	 * @param licheng 里程
	 * @return 
	 */
	@Override
	public Page getMeasureInfoList(String conbeamID, String pier, String shortName, String gkbm, Integer pageNo,
			String licheng) {
		// 查询当前条件下的总记录数
		//shortName = shortName.replaceAll("'", "");
		Integer totalCount = measureInfoMapper.selectMeasureInfoTotalCount(conbeamID, pier, shortName, gkbm, licheng);

		// 创建分页的page对象
		Page page = new Page();
		page.setPageNo(pageNo);
		page.setTotalCount(totalCount);
		page.setPageSize(Integer.parseInt(PageUtil.MEASUREINFO_PAGESIZE));
		// 获得开始行号和结束行号
		Integer startNum = page.getStartNum();
		Integer endNum = page.getEndNum();
		// 查询指定条件的偏差超限信息
		List<MeasureInfo> measureInfoList = measureInfoMapper.selectMeasureInfo(conbeamID, pier, shortName, gkbm,
				licheng, startNum, endNum);
		page.setList(measureInfoList);
		return page;
	}

	/**
	 * 获取初期化T构下拉列表所用数据
	 * @param conbeamID 连续梁ID
	 * @return
	 */
	@Override
	public List<Map<String, String>> getPierList(String conbeamID) {
		return measureInfoMapper.selectPierList(conbeamID);
	}

	/**
	 * 获取初期化梁段号下拉列表所用数据
	 * @param conbeamID 连续梁ID
	 * @param pier	T构
	 * @return
	 */
	@Override
	public List<Map<String, String>> getLdCodeList(String conbeamID, String pier) {
		return measureInfoMapper.selectLdCodeList(conbeamID, pier);
	}

	/**
	 * 获取初期化施工工况下拉列表所用数据
	 * @return
	 */
	@Override
	public List<Map<String, String>> getGkbmAndContentList() {
		return measureInfoMapper.selectGkbmAndContentList();
	}

	/**
	 * 获取测量信息
	 * @param conbeamID 连续梁ID
	 * @param pier	T构
	 * @param shortName 梁段号
	 * @param gkbm	工况编码
	 * @param licheng 里程
	 * @return 
	 */
	@Override
	public Page getMeasureInfoAllList(String conbeamID, String pier, String shortName, String gkbm, String licheng) {
		// 创建分页的page对象
		//shortName = shortName.replaceAll("'", "");
		Page page = new Page();
		// 查询指定条件的偏差超限信息
		List<MeasureInfo> measureInfoList = measureInfoMapper.selectAllMeasureInfo(conbeamID, pier, shortName, gkbm,
				licheng);
		page.setList(measureInfoList);

		return page;
	}
}
