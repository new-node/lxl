package com.tky.lxl.platform.serviceimpl.business;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.tky.lxl.platform.dao.business.DatumPointMapper;
import com.tky.lxl.platform.dao.business.DatumPointRecordMapper;
import com.tky.lxl.platform.dao.business.LDMapper;
import com.tky.lxl.platform.dao.business.LxlMapper;
import com.tky.lxl.platform.dao.business.ProjectInfoMapper;
import com.tky.lxl.platform.dao.business.ProjectSectionMapper;
import com.tky.lxl.platform.emun.ResultCodeTypeEunm;
import com.tky.lxl.platform.model.Page;
import com.tky.lxl.platform.model.business.DatumPoint;
import com.tky.lxl.platform.model.business.DatumPointRecord;
import com.tky.lxl.platform.model.business.DatumPointRecordList;
import com.tky.lxl.platform.model.business.Lxl;
import com.tky.lxl.platform.model.business.ProjectInfo;
import com.tky.lxl.platform.model.business.ProjectSection;
import com.tky.lxl.platform.model.system.UserInfo;
import com.tky.lxl.platform.service.business.DatumPointService;
import com.tky.lxl.platform.utils.ResultBean;

/**
 * <p>Title:DatumPointServiceImpl </p>
 * <p>Description: 基点信息service实现类</p>
 * <p>Company: 铁科院</p> 
 *
 * @author yushanli（2017年3月8日 上午10:02:29）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Service("datumPointService")
@Transactional
public class DatumPointServiceImpl implements DatumPointService {

	@Resource
	private DatumPointMapper datumPointMapper;
	@Resource
	private ProjectInfoMapper projectInfoMapper;
	@Resource
	private ProjectSectionMapper projectSectionMapper;
	@Resource
	private LxlMapper lxlMapper;
	@Resource
	private LDMapper lDMapper;
	@Resource
	private DatumPointRecordMapper datumPointRecordMapper;

	@Override
	public void updateTBase(DatumPoint record, String changeReason,UserInfo userInfo) {

		try {
			datumPointMapper.updateTBase(record);

			DatumPointRecord datumPointRecord = new DatumPointRecord();
			datumPointRecord.setBaseid(record.getBaseid());
			datumPointRecord.setBasexx(record.getBasexx());
			datumPointRecord.setBaseyy(record.getBaseyy());
			datumPointRecord.setBasezz(record.getBasezz());
			datumPointRecord.setChangereason(changeReason);
			datumPointRecord.setChangeperson(userInfo.getName());
			// datumPointRecord.setChangeperson(record.get);

			datumPointRecordMapper.insertSelective(datumPointRecord);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void deleteTBase(DatumPoint record) {
		
		try {
			datumPointMapper.updateTBase(record);
			//修改连续梁表的数据
			updateLxlPoint(record, false);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void insertTBase(DatumPoint record, UserInfo userInfo) {
		
		try {
			//新增时不往修正表里添加数据
//			DatumPointRecord datumPointRecord = new DatumPointRecord();
//			datumPointRecord.setBasexx(record.getBasexx());
//			datumPointRecord.setBaseyy(record.getBaseyy());
//			datumPointRecord.setBasezz(record.getBasezz());
//			datumPointRecord.setChangeperson(userInfo.getName());
		datumPointMapper.insertTBase(record);
//		datumPointRecord.setBaseid(record.getBaseid());
//		datumPointRecord.setChangereason("新增基点");
//			datumPointRecordMapper.insertSelective(datumPointRecord);
			//更新连续梁表数据
			updateLxlPoint(record,true);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public ResultBean<Page> getTBase(DatumPoint condition) {

		List<DatumPoint> list = new ArrayList<DatumPoint>();
		
		// 创建分页的page对象
		Page page = new Page();
		try {
			
			int count = datumPointMapper.queryTBaseCount(condition.getConbeamid());
			page.setPageNo(condition.getPageNo());
			page.setTotalCount(count);
			// 获得开始行号和结束行号
			Integer startNum = page.getStartNum();
			Integer endNum = page.getEndNum();
			condition.setStartNum(startNum);
			condition.setEndNum(endNum);
			page.setStartNum(startNum);
			page.setEndNum(endNum);
			list = datumPointMapper.queryTBase(condition);
			
			if (list.size() > 0) {
				page.setList(list);
				return new ResultBean<Page>(ResultCodeTypeEunm.scuss.getKey(),
					ResultCodeTypeEunm.scuss.getValue(),
					page);
			} else {
				return new ResultBean<Page>(ResultCodeTypeEunm.scussButNull.getKey(),
					ResultCodeTypeEunm.scussButNull.getValue(),
					page);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return new ResultBean<Page>(ResultCodeTypeEunm.exception.getKey(),
				ResultCodeTypeEunm.exception.getValue(),
				page);
		}
	}

	@Override
	public ResultBean<DatumPointRecordList> getChangeRecordHead(Long lxlid, Long baseid) {

		DatumPointRecordList result = new DatumPointRecordList();
		try {
			// 调用连续梁接口通过连续梁ID获取信息
			Lxl lxl = lxlMapper.findById(lxlid);
			// 通过连续梁标的标段ID去标段表的标段name
			ProjectSection projectSec = projectSectionMapper.selectProjectSectionByID(lxl.getSectionid());
			// 通过连续梁表的项目ID去项表的项目name
			ProjectInfo projectInfo = projectInfoMapper.findById(lxl.getProjectinfoid());
			// LD ldresult = lDMapper.selectById(ldid);

			List<DatumPointRecord> datumpointRecord = datumPointRecordMapper.findById(baseid);
			// result.setLdName(ldresult.getPartnum());
			result.setLxlName(lxl.getName());
			result.setProinfoName(projectInfo.getNameabbr());
			result.setProsectionName(projectSec.getName());
			result.setRecordList(datumpointRecord);
			return new ResultBean<DatumPointRecordList>(ResultCodeTypeEunm.scuss.getKey(),
					ResultCodeTypeEunm.scuss.getValue(), result);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResultBean<DatumPointRecordList>(ResultCodeTypeEunm.exception.getKey(),
					ResultCodeTypeEunm.exception.getValue(), result);
		}
	}

	/**
	 * 修改连续梁表的数据
	 * @param record
	 * @param isAddFlg  判断基点删除还是插入，ture：插入 false：删除
	 */
	public void updateLxlPoint(DatumPoint record, Boolean isAddFlg) {
		
		Lxl condition = lxlMapper.findById(record.getConbeamid());
		if (isAddFlg) {
			condition.setBasecount(condition.getBasecount() + 1);
		} else {
			condition.setBasecount(condition.getBasecount() - 1);
		}

		lxlMapper.updateBasecount(condition);
	}
}
