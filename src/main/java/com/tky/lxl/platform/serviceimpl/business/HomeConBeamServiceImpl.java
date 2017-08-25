package com.tky.lxl.platform.serviceimpl.business;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tky.lxl.platform.dao.business.LDMapper;
import com.tky.lxl.platform.dao.business.LxlCountMapper;
import com.tky.lxl.platform.dao.business.LxlMapper;
import com.tky.lxl.platform.dao.business.PierMapper;
import com.tky.lxl.platform.dao.business.ProjectInfoMapper;
import com.tky.lxl.platform.dao.business.ProjectSectionMapper;
import com.tky.lxl.platform.dao.business.SggsMapper;
import com.tky.lxl.platform.dao.business.SgjdMapper;
import com.tky.lxl.platform.dao.business.WarnInfoMapper;
import com.tky.lxl.platform.finals.Const;
import com.tky.lxl.platform.model.business.LdDraw;
import com.tky.lxl.platform.model.business.LdQuery;
import com.tky.lxl.platform.model.business.Lxl;
import com.tky.lxl.platform.model.business.LxlProjectCount;
import com.tky.lxl.platform.model.business.PierDraw;
import com.tky.lxl.platform.model.business.PierQuery;
import com.tky.lxl.platform.model.business.ProjectInfo;
import com.tky.lxl.platform.model.business.ProjectSection;
import com.tky.lxl.platform.model.business.Sggs;
import com.tky.lxl.platform.model.business.SggsList;
import com.tky.lxl.platform.model.business.Sgjd;
import com.tky.lxl.platform.model.business.WarnPczInfo;
import com.tky.lxl.platform.service.business.HomeConBeamService;

/**
 * <p>Title: HomeConBeamServiceImpl</p>
 * <p>Description: 连续梁首页</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年3月13日 下午3:58:53）
 *
 * @version:1.0.0 copyright © 2017-2018
 */

@Service("homeConBeamService")
public class HomeConBeamServiceImpl implements HomeConBeamService {

	@Resource
	private LxlMapper lxlMapper;
	@Resource
	private LDMapper ldMapper;
	@Resource
	private PierMapper pierMapper;
	@Resource
	private WarnInfoMapper warnInfoMapper;
	@Resource
	private SgjdMapper sgjdmapper;
	@Resource
	private SggsMapper sggsMapper;
	@Resource
	private LxlCountMapper lxlCountMapper;
	@Resource
	private ProjectSectionMapper projectSectionMapper;
	@Resource
	private ProjectInfoMapper projectInfoMapper;

	@Override
	public Map<String, Object> selectLxlMessage(Long id) {

		Map<String, Object> specialStructure = new HashMap<String, Object>();

		// 获取连续梁信息
		Lxl lxl = lxlMapper.findByLxlId(id);
		if(lxl!=null){
			specialStructure.put("conbeamid", lxl.getConbeamid());
			specialStructure.put("structurename", lxl.getName());
			specialStructure.put("length", lxl.getLength());
			//如果是否中和的值为0，中和存在 没有上传数据的梁段  0未中和
			specialStructure.put("iszh", lxl.getIszh());
			// 获取0号梁段信息即T构的信息
			LdQuery zeroldQuery = new LdQuery(lxl.getConbeamid(), Const.LDType.ZERO);
			List<Map<String, Object>> gjTStructureList = getCenterSpanList(zeroldQuery);
			for (Map<String, Object> gjTStructure : gjTStructureList) {// 遍历T构
	
				// 小里程的梁段
				LdQuery smallQuery = new LdQuery();
				smallQuery.setConbeamid(lxl.getConbeamid());
				smallQuery.setMileageflag(Const.LCType.XIAO_LC);
				smallQuery.setPier(Integer.valueOf(gjTStructure.get("pier").toString()));
				//梁段类型
				smallQuery.setType(Const.LDType.BKFDC);
				//直线段大小区分
				smallQuery.setLineflag(Const.LCType.XIAO_LC);
				List<Map<String, Object>> gjSmallSegmentList = getCenterSpanList(smallQuery);
				gjTStructure.put("smallGjSegments", gjSmallSegmentList);
	
				// 大里程的梁段
				LdQuery bigQuery = new LdQuery();
				bigQuery.setConbeamid(lxl.getConbeamid());
				bigQuery.setMileageflag(Const.LCType.DA_LC);
				// T构号
				bigQuery.setPier(Integer.valueOf(gjTStructure.get("pier").toString()));
				//梁段类型
				bigQuery.setType(Const.LDType.BKFDC);
				//直线段大小区分
				bigQuery.setLineflag(Const.LCType.DA_LC);
				List<Map<String, Object>> gjBigSegmentList = getCenterSpanList(bigQuery);
				gjTStructure.put("bigGjSegments", gjBigSegmentList);
	
				// 0号梁段
				LdQuery zeroQuery = new LdQuery(lxl.getConbeamid(), Const.LDType.ZERO);
				zeroQuery.setPier(Integer.valueOf(gjTStructure.get("pier").toString()));
				List<Map<String, Object>> gjZeroSegmentList = getCenterSpanList(zeroQuery);
				gjTStructure.put("zeroGjSegments", gjZeroSegmentList.get(0));
	
				// 墩 根据T构号查找墩的信息
				// T构号
				PierQuery pierQuery = new PierQuery(Integer.valueOf(gjTStructure.get("tsid").toString()),
						gjTStructure.get("piername") != null ? gjTStructure.get("piername").toString() : null);
				Map<String, Object> gjPier = getPierList(pierQuery);
				gjTStructure.put("gjPier", gjPier);
			}
			specialStructure.put("gjTStructures", gjTStructureList);
		}
		return specialStructure;
	}

	/**
	 * 获取中跨、直线、边跨、节段等梁段信息
	 * @param lineQuery
	 * @return
	 */
	private List<Map<String, Object>> getCenterSpanList(LdQuery ldQuery) {
		List<Map<String, Object>> centerSpanList = new ArrayList<Map<String, Object>>();
		List<LdDraw> lds = ldMapper.selectLdMessage(ldQuery);
		StringBuffer sfzhBuffer = new StringBuffer();
		
		for (LdDraw ldDraw : lds) {
			Map<String, Object> map = new HashMap<String, Object>();

			if (ldQuery.getType() != null && ldQuery.getType() == Const.LDType.ZERO) {
				if (ldQuery.getPier() != null) {// 0号梁段
					// 梁段名称
					map.put("partnum", ldDraw.getPartnum());
					// 梁段长度
					map.put("width", ldDraw.getSectlength());
					// 梁段简称
					map.put("shortname", ldDraw.getShortname());
					// 梁段小里程高
					map.put("heights", ldDraw.getHeights());
					// 梁段大里程高
					map.put("heightb", ldDraw.getHeightb());
					// 中心里程
					map.put("centermileage", ldDraw.getCenterMileage());
					// 中心高度
					map.put("centerheight", ldDraw.getCenterHeight());
					// 底宽（如没有则和墩宽一样）
					map.put("bottomwidth", ldDraw.getBottomWidth());
					//梁段类型
					map.put("type", ldDraw.getType());
					// 工况编码
					if (ldDraw.getGkbm() != null) {
						map.put("gkbm", Integer.valueOf(ldDraw.getGkbm().trim()));
					} else {
						map.put("gkbm", 0);
					}
					//是否超限
					map.put("iswarn", ldDraw.getIswarn());
					//排序字段
					map.put("seq",ldDraw.getSeq());
					//判断工况数量 0 没有上传数据 6 不缺少工况数据
					map.put("gkbmcount", ldDraw.getGkbmcount());
					map.put("partid", ldDraw.getPartid());
				} else {// T构
					map.put("tsid", ldDraw.getTsid());
					map.put("piername", ldDraw.getPiername());
				}
				// T构号
				map.put("pier", ldDraw.getPier());
				
			}//大小里程梁段的设定 
			else {
				
				if(ldDraw.getType()==Const.LDType.ZKHL ){
					
				}
				
				//1 代表中和    小里程
				if(ldDraw.getTiszh() ==1  && ldQuery.getMileageflag() == Const.LCType.XIAO_LC){
					String partnum = ldDraw.getPartnum();
					String[] partnums = partnum.split("-合-");
					sfzhBuffer.append(partnums[0]);
					map.put("tiszh", ldDraw.getTiszh());
				}
//				}else{
//					if(sfzhBuffer.indexOf(ldDraw.getPier().toString())!=-1){
//						map.put("tiszh", 1);
//					}
//				}
				
				
				// 梁段名称
				map.put("partnum", ldDraw.getPartnum());
				// 梁段长度
				map.put("width", ldDraw.getSectlength());
				// 梁段简称
				map.put("shortname", ldDraw.getShortname());
				// 梁段高度
				if(ldQuery.getMileageflag() == Const.LCType.XIAO_LC)
					map.put("height", ldDraw.getHeights());
				else
					map.put("height", ldDraw.getHeightb());
				//梁段类型
				map.put("type", ldDraw.getType());
				// 工况编码
				if (ldDraw.getGkbm() != null) {
					map.put("gkbm", Integer.valueOf(ldDraw.getGkbm().trim()));
				} else {
					map.put("gkbm", 0);
				}
				//是否超限
				map.put("iswarn", ldDraw.getIswarn());
				//排序字段
				map.put("seq",ldDraw.getSeq());
				
				map.put("gkbmcount", ldDraw.getGkbmcount());
				
				map.put("partid", ldDraw.getPartid());
				
				map.put("pier", ldDraw.getPier());
			}
			centerSpanList.add(map);
		}
		return centerSpanList;
	}

	/**
	 * 获取墩的信息
	 * @param lineQuery
	 * @return
	 */
	private Map<String, Object> getPierList(PierQuery pierQuery) {
		Map<String, Object> piermap = new HashMap<String, Object>();
		// 查询墩信息
		PierDraw piers = pierMapper.selectPierMessage(pierQuery);
		if (piers != null) {
			piermap.put("width", piers.getWidth());
			piermap.put("height", piers.getHeight());
			piermap.put("centermileage", piers.getCentermileage());
			piermap.put("piername", piers.getPiername());
		}
		return piermap;
	}

	/**
	 * 获取指定连续梁下的所有梁段
	 * @param conbeamID
	 * @return
	 */
	@Override
	public List<WarnPczInfo> getLdInfo(String conbeamID) {
		List<WarnPczInfo> ldList = warnInfoMapper.selectLdInfo(conbeamID);
		return ldList;
	}

	/**
	 * 获取此施工阶段的信息，天气，温度，气压
	 * @param stepid 施工阶段ID
	 * @return
	 */
	@Override
	public Sgjd getSgjdInfo(String stepid) {
		// 查询墩信息
		Sgjd sgjd = sgjdmapper.selectByPrimaryKey(stepid);
		return sgjd;
	}
	
	/**
	 * 施工告示牌信息表示
	 */
	@Override
	public SggsList showSggsInfo(Long conbeamid) {
		SggsList result = new SggsList();
		Sggs sggs = new Sggs();

		// 连续梁ID
		sggs.setConbeamid(conbeamid);

		// 施工告示牌信息查询
		Sggs sggsItem = sggsMapper.selectByPrimaryKey(conbeamid);
		// 通过连续梁ID查询连续梁信息
		Lxl lxlItem = lxlMapper.findById(conbeamid);

		// 通过连续梁标的标段ID去标段表的标段name
		ProjectSection projectSec = projectSectionMapper.selectProjectSectionByID(lxlItem.getSectionid());
		// 通过连续梁表的项目ID去项表的项目name
		ProjectInfo projectInfo = projectInfoMapper.findById(lxlItem.getProjectinfoid());

		if (lxlItem != null) {
			// 桥跨组合
			sggs.setBeamaspan(lxlItem.getBeamaspan());
			// 所在里程
			sggs.setCentermile(lxlItem.getCenterMilestr());
			// 跨度
			sggs.setMainkdlength(lxlItem.getMainkdlength());
		}

		if (sggsItem != null) {
			// 所属工区
			sggs.setIndustrial(sggsItem.getIndustrial());
			// 施工开始日期
			sggs.setStartdate(sggsItem.getStartdate());
			// 施工截止日期
			sggs.setEnddate(sggsItem.getEnddate());
			// 施工监测单位
			sggs.setPlanjcunit(sggsItem.getPlanjcunit());
			// 设计单位
			sggs.setDesignunit(sggsItem.getDesignunit());
		}
		// 返回结果设定
		// 施工告示牌信息
		result.setSggsList(sggs);
		// 连续梁名称
		result.setLxlName(lxlItem.getName());
		// 项目名称
	result.setProName(projectInfo.getNameabbr());
		// 标段名称
		result.setSectionName(projectSec.getName());

		return result;
	}

	/**
	 * 更新施工告示牌信息以及连续梁信息
	 */
	@Override
	public void saveOrUpdate(Sggs condition) {

		Lxl lxlbean = new Lxl();
		// 梁段ID
		lxlbean.setConbeamid(condition.getConbeamid());
		// 跨度
		lxlbean.setMainkdlength(condition.getMainkdlength());
		// 桥跨组合
		lxlbean.setBeamaspan(condition.getBeamaspan());

		// 更新施工告示牌信息
		sggsMapper.saveOrUpdate(condition);
		// 更新连续梁信息
		lxlMapper.UpdateBySggs(lxlbean);

	}

	/**
	 * 查询总梁段数，总测点数，偏差超限数
	 */
	@Override
	public LxlProjectCount selectLdCdWarnByLxl(Long conbeamid) {

		LxlProjectCount lxlProItem = new LxlProjectCount();
		// 测点总数查询
		LxlProjectCount lxlCdItem = lxlCountMapper.selectCdZCount(conbeamid);
		// 梁段总数查询
		LxlProjectCount lxlLdItem = lxlCountMapper.selectLdZCount(conbeamid);
//		// 偏差超限数查询
//		LxlProjectCount lxlWarnItem = lxlCountMapper.selectLxlWarnCount(conbeamid);
		LxlProjectCount lxlWarnItem = lxlCountMapper.selectCdWarnCount(conbeamid);
		// 测点总数设置
		if (lxlCdItem != null) {
			lxlProItem.setCdcount(lxlCdItem.getCdcount());
		}

		// 梁段总数设置
		if (lxlLdItem != null) {
			lxlProItem.setLdcount(lxlLdItem.getLdcount());
		}

//		// 偏差超限数设置
		if (lxlWarnItem != null) {
			lxlProItem.setWarncdcount(lxlWarnItem.getWarncdcount());
		}
		return lxlProItem;
	}
}
