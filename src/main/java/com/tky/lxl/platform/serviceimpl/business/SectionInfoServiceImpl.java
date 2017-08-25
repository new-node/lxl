package com.tky.lxl.platform.serviceimpl.business;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tky.lxl.platform.dao.business.DictionaryMapper;
import com.tky.lxl.platform.dao.business.LxlMapper;
import com.tky.lxl.platform.dao.business.SectionInfoMapper;
import com.tky.lxl.platform.finals.Const.MileageFlag;
import com.tky.lxl.platform.model.business.CxLdCount;
import com.tky.lxl.platform.model.business.DbsxInfo;
import com.tky.lxl.platform.model.business.Deviation;
import com.tky.lxl.platform.model.business.Dictionary;
import com.tky.lxl.platform.model.business.LD;
import com.tky.lxl.platform.model.business.LxlDataException;
import com.tky.lxl.platform.model.business.LxlWarnInfo;
import com.tky.lxl.platform.model.business.NewLxl;
import com.tky.lxl.platform.model.business.SectionInfo;
import com.tky.lxl.platform.model.business.ZhDbsx;
import com.tky.lxl.platform.service.business.SectionInfoService;

/**
 * <p>Title:SectionInfoServiceImpl </p>
 * <p>Description: 标段信息</p>
 * <p>Company: 铁科院</p> 
 *
 * @author liuzhenya（2017年3月12日 上午10:58:40）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Service("SectionInfoService")
@Transactional
public class SectionInfoServiceImpl implements SectionInfoService {

	@Resource
	private SectionInfoMapper sectionInfoMapper;
	@Resource
	private DictionaryMapper dictionaryMapper;
	@Resource
	private LxlMapper lxlMapper;

	/**
	 * 获取测量信息
	 * @param conbeamID 连续梁ID
	 * @param pier	T构
	 * @param shortName 梁段号
	 * @param gkbm	工况编码
	 * @return
	 */
	@Override
	public List<SectionInfo> getSectionInfoList(String sectionId, String conbeamId) {
		Map<String,Object> m = new HashMap<>();
		m.put("sectionId",sectionId);
		m.put("conbeamId", conbeamId.split(","));
		if (conbeamId!=null&&conbeamId.equals("")) {
			m.put("conbeamId", conbeamId.split(","));
		}
		// 查询当前条件下的总记录数
		List<SectionInfo> sectionInfoList = sectionInfoMapper.selectSectionInfo(m);

		return sectionInfoList;
	}

	/**
	 * 获取连续梁下的偏差超限信息
	 * @param conbeamID 连续梁ID
	 * @return
	 */
	@Override
	public List<LxlWarnInfo> getLxlWarnInfo(String conbeamID) {
		List<LxlWarnInfo> lxlWarnInfo = sectionInfoMapper.selectLxlWarnInfo(conbeamID);
		return lxlWarnInfo;
	}

	/**
	 * 获取连续梁下的异常信息
	 * @param sectionId 标段ID
	 * @return
	 */
	@Override
	public List<LxlDataException> getLxlDataException(String sectionId) {
		List<LxlDataException> lxlDataException = sectionInfoMapper.selectLxlDataException(sectionId);
		return lxlDataException;
	}

	/**
	 * 获取偏差上下限值
	 * @param projectId 项目ID
	 * @return
	 */
	@Override
	public Deviation getPccxLimit(String projectId, String warnType) {
		Deviation deviation = sectionInfoMapper.selectPccxLimit(projectId, warnType);
		return deviation;
	}

	/**
	 * 获取施工状况列表
	 * 
	 * @return
	 */
	@Override
	public List<Dictionary> getGkbmItem() {
		List<Dictionary> list = new ArrayList<Dictionary>();
		Dictionary condition = new Dictionary();
		condition.setTypeid(new BigDecimal(1));
		list = dictionaryMapper.select(condition);
		return list;
	}

	/**
	 * 更新梁段的说明列
	 * @param recordList 梁段信息
	 * @return
	 */
	@Override
	public Integer updateLdRemarkByPrimaryKey(List<LD> recordList) {
		Integer result = 0;
		for (int i = 0; i < recordList.size(); i++) {
			LD ld = recordList.get(i);
			result = result + sectionInfoMapper.updateLdRemarkByPrimaryKey(ld.getLowerremarks(), ld.getUpperremarks(),
					ld.getPartid());
		}
		return result;
	}

	@Override
	public List<NewLxl> getNewLxl(String sectionid) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		Date today = new Date();
		Calendar rightNow = Calendar.getInstance();
		rightNow.setTime(today);
		String endDate = sdf.format(rightNow.getTime());
		rightNow.add(Calendar.DAY_OF_YEAR, -30);// 日期减30天
		String startDate = sdf.format(rightNow.getTime());
	List<NewLxl> newLxls = lxlMapper.getNewLxl(startDate, endDate, sectionid);

		return newLxls;
	}

	/**
	 * 根据标段统计梁段超限处置信息
	 * @param sectionId 标段ID
	 * @return
	 */
	@Override
	public CxLdCount getPccxldCount(String sectionId,String conbeamid) {
		Map<String,Object> m=new HashMap<>();
		m.put("sectionId", sectionId);
		if (conbeamid!=null&&!conbeamid.equals("")) {
			String[] conbeamidArray = conbeamid.split(",");
			m.put("conbeamid", conbeamidArray);
		}
		return sectionInfoMapper.selectPccxldCount(m);
	}

	/**
	 * 获取代办事项数据
	 * @param sectionId 标段ID
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<DbsxInfo>  getBdDbsxInfo(String sectionId, String conbeamId){
		//初始化返回值
		List<DbsxInfo> result = new ArrayList<DbsxInfo>();
		//偏差超限待办事项
		Map<String,Object> m = new HashMap<>();
		if (conbeamId!=null&&!conbeamId.equals("")) {
			m.put("conbeamId", conbeamId.split(","));
		}
		if (sectionId!=null&&!sectionId.equals("")) {
			m.put("sectionId", sectionId);
		}
		List<DbsxInfo> pccxDbsxList = sectionInfoMapper.selectPccxLdDbsx(m);
		if(pccxDbsxList.size() > 0){
			result = pccxDbsxList;
		}

		//仪器设备代办事项
		List<DbsxInfo> equimentDbsxList = sectionInfoMapper.selectEquimentLdDbsx(sectionId);
		if(equimentDbsxList.size() > 0){
			result.addAll(equimentDbsxList);
		}

		//边合代办事项
		List<DbsxInfo> bhList = sectionInfoMapper.selectBhDbsx(m);
		List<DbsxInfo> bhListTmp = new ArrayList<DbsxInfo>();
		for(int i = 0; i < bhList.size(); i++){
			DbsxInfo dbsxInfo = bhList.get(i);
			if((dbsxInfo.getMileageflag() == MileageFlag.small && dbsxInfo.getContent().indexOf("小里程") > 0)
					|| (dbsxInfo.getMileageflag() == MileageFlag.big && dbsxInfo.getContent().indexOf("大里程") > 0)) {
				bhListTmp.add(dbsxInfo);
			}
		}
		//处理中合数据
		List<ZhDbsx> zhDbsxList = new ArrayList<ZhDbsx>();
		zhDbsxList = sectionInfoMapper.selectZhDbsx(m);
		List<DbsxInfo> zhList = new ArrayList<DbsxInfo>();

		int zhListSize = zhDbsxList.size();
		for(int i = 0; i < zhListSize; i++){
			int indexNext = i + 1;

			if (indexNext < zhListSize){
				ZhDbsx current = zhDbsxList.get(i);
				ZhDbsx next = zhDbsxList.get(indexNext);
				Long tmpPier = current.getPier() + 1;
				//判断两个T构是否相邻
				if(tmpPier.equals(next.getPier())
						&& current.getConbeamid().equals(next.getConbeamid())
						&& current.getMileageflag() == MileageFlag.big
						&& next.getMileageflag() == MileageFlag.small){
					DbsxInfo mapTmp = new DbsxInfo();
					//判断实用当前T构的日期还是使用下一个T构的日期
					Long updateTimeTmp = current.getUpdatetime();
					if(next.getUpdatetime() > current.getUpdatetime()){
						updateTimeTmp = next.getUpdatetime();
					}
					//设置显示的内容
					mapTmp.setContent(next.getName() + "T构" + current.getPier() + "#与" + next.getPier() + "#即将中合");
					//设置排序用的日期
					mapTmp.setUpdatetime(updateTimeTmp);
					zhList.add(mapTmp);
				}
			}
		}
		if(zhList!=null && zhList.size()>0){
			bhListTmp.addAll(zhList);
		}
		Collections.sort(bhListTmp,new PriceComparator());
		Collections.reverse(bhListTmp);
		if(bhListTmp!=null && bhListTmp.size()>0){
			result.addAll(bhListTmp);
		}
		return result;
	}
	
	//自定义比较器：按时间排序
	@SuppressWarnings("rawtypes")
	static class PriceComparator implements Comparator {  
		public int compare(Object object1, Object object2) {// 实现接口中的方法  
			DbsxInfo p1 = (DbsxInfo) object1; // 强制转换  
			DbsxInfo p2 = (DbsxInfo) object2;  
			return new Double(p1.getUpdatetime()).compareTo(new Double(p2.getUpdatetime()));  
		}
	}
}
