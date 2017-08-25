package com.tky.lxl.platform.serviceimpl.business;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tky.lxl.platform.dao.business.LxlMapper;
import com.tky.lxl.platform.dao.business.WarnDealMapper;
import com.tky.lxl.platform.dao.business.WarnInfoMapper;
import com.tky.lxl.platform.finals.Const;
import com.tky.lxl.platform.finals.Const.PageSize;
import com.tky.lxl.platform.model.Page;
import com.tky.lxl.platform.model.business.LdMonitorStatus;
import com.tky.lxl.platform.model.business.Lxl;
import com.tky.lxl.platform.model.business.WarnDeal;
import com.tky.lxl.platform.model.business.WarnInfo;
import com.tky.lxl.platform.model.business.WarnLdCount;
import com.tky.lxl.platform.model.business.WarnPczInfo;
import com.tky.lxl.platform.model.system.UserInfo;
import com.tky.lxl.platform.service.business.WarnInfoService;
import com.tky.lxl.platform.utils.DateUtil;
import com.tky.lxl.platform.utils.PageUtil;

/**
 * <p>Title: WarnInfoServiceImpl</p>
 * <p>Description: 偏差超限信息</p>
 * <p>Company: 铁科院</p> 
 *
 * @author liuzhenya（2017年3月2日 上午10:58:40）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Service("warnInfoService")
@Transactional
public class WarnInfoServiceImpl implements WarnInfoService {

	@Resource
	private WarnInfoMapper warnInfoMapper;
	@Resource
	private WarnDealMapper warnDealMapper;
	@Resource
	private LxlMapper lxlmapper;

	/**
	 * 获取偏差超限信息
	 * @param conbeamID 连续梁ID
	 * @param pier	T构
	 * @param ldCode 梁段编码
	 * @param warnTimeL	超限日期 下限
	 * @param warnTimeU	超限日期上限
	 * @param gkbm	工况编码
	 * @param cdbm 测点编码
	 * @param cdlx 测点类型
	 * @param dealFlg	处置FLG
	 * @return
	 */
	@Override
	public Page getWarnInfoList(String conbeamID, String pier, String ldCode, String warnTimeL, String warnTimeU,
			String gkbm, String dealFlg, String cdbm, String pageFlg, Integer pageNo, String cdlx) {
		// 查询当前条件下的总记录数
		Integer totalCount = warnInfoMapper.selectWarnInfoTotalCount(conbeamID, pier, ldCode, warnTimeL, warnTimeU,
				gkbm, cdbm, dealFlg, cdlx);

		// 创建分页的page对象
		Page page = new Page();
		if (pageFlg != null && !"".equals(pageFlg)) {
			if(pageFlg.equals(PageSize.BRIDGE_PCCX_PAGESIZE)){	//桥梁首页偏差超限显示件数设置
				page.setPageSize(Integer.parseInt(PageUtil.BRIDGE_PCCX_PAGESIZE));
			} else if(pageFlg.equals(PageSize.PCCX_PAGESIZE)){	//偏差超限显示件数设置
				page.setPageSize(Integer.parseInt(PageUtil.PCCX_PAGESIZE));
			}
		}

		page.setPageNo(pageNo);
		page.setTotalCount(totalCount);
		// 获得开始行号和结束行号
		Integer startNum = page.getStartNum();
		Integer endNum = page.getEndNum();
		// 查询指定条件的偏差超限信息
		List<WarnInfo> warnInfoList = warnInfoMapper.selectWarnInfo(conbeamID, pier, ldCode, warnTimeL, warnTimeU, gkbm,
				cdbm, dealFlg, startNum, endNum, cdlx);
		page.setList(warnInfoList);

		return page;
	}

	/**
	 * 获取初期化T构下拉列表所用数据
	 * @param conbeamID 连续梁ID
	 * @return
	 */
	@Override
	public List<Map<String, String>> getPierList(String conbeamID) {
		return warnInfoMapper.selectPierList(conbeamID);
	}

	/**
	 * 获取初期化梁段号下拉列表所用数据
	 * @param conbeamID 连续梁ID
	 * @param pier	T构
	 * @return
	 */
	@Override
	public List<Map<String, String>> getLdCodeList(String conbeamID, String pier) {
		return warnInfoMapper.selectLdCodeList(conbeamID, pier);
	}

	/**
	 * 获取初期化施工工况下拉列表所用数据
	 * @return
	 */
	@Override
	public List<Map<String, String>> getGkbmAndContentList() {
		return warnInfoMapper.selectGkbmAndContentList();
	}

	/**
	 * 插入记录到偏差超限处置表
	 * 
	 * @param record
	 * @return
	 */
	@Override
	public String saveWarnDeal(WarnDeal record) {
		
		
//		int insertResult;
		//更新warn表的状态
		int updateResult;
		try {
			
			//插入偏差超限处置数据
			warnDealMapper.insertSelective(record);
			if("on".equals(record.getIsColse())){//关闭
				updateResult = warnInfoMapper.updateWarnByPrimaryKey(record.getGkbm(),record.getLdcode(),record.getLxlid(),Const.DealFlag.CLOSED);
				WarnDeal records = new WarnDeal();
				records.setDealuserid(record.getDealuserid());
				records.setGkbm(record.getGkbm());
				records.setLdcode(record.getLdcode());
				records.setLxlid(record.getLxlid());
				records.setAccountname(record.getAccountname());
				records.setDealtime(record.getDealtime());
				warnDealMapper.insertSelective(records);
			}else{//处置中
				updateResult = warnInfoMapper.updateWarnByPrimaryKey(record.getGkbm(),record.getLdcode(),record.getLxlid(),Const.DealFlag.DEALING);
			}
			
			
			//更新连续梁表
			if(updateResult!=0){//t_warn表的数据有变化，更新连续梁表
				//获取某连续梁超限梁段数量
				WarnLdCount warnLdCount = warnInfoMapper.getDealMessage(record.getLxlid());
				//更新连续梁表
				warnInfoMapper.updateLxlDeal(warnLdCount);
			}
			return "OK";
		} catch (Exception e) {
			e.printStackTrace();
			return "NG";
		}
		
		
//		//要更新的t_warn表的数据条数
//		int isDeal = warnInfoMapper.selectChuzhiCount(record.getLdcode(), record.getLxlid(),record.getGkbm());
//		int updateResult = 0;
//		int updateLxl = 0;
//		//排除状态为处置中时，再次更新T_warn表
//		if (insertResult == 1&&isDeal>0) {
//			// 判断是否更新t_lxl表
//			int isDeallxl = warnInfoMapper.selectDelLxlCount(record.getLdcode(), record.getLxlid());
//			if (isDeallxl == 0) {
//				updateLxl = 1;
//			}
//			
//			updateResult = warnInfoMapper.updateWarnByPrimaryKey(record.getGkbm(),record.getLdcode(),record.getLxlid());
//			
//		}
//		return insertResult+","+updateResult+","+updateLxl;
	}

	/**
	 * 检索偏差超限处置信息
	 * @param gkbm 工况编码
	 * @param conbeamId 连续梁id
	 * @param partId 梁段id
	 * @return
	 */
	@Override
	public List<WarnDeal> getWarnDeal(String gkbm, String conbeamId, String partId, String dealFlg) {
		return warnDealMapper.selectWarnDeal(gkbm, conbeamId, partId, dealFlg);
	}

	/**
	 * 获取高程偏差超限信息
	 * @param conbeamID 连续梁ID
	 * @return
	 */
	@Override
	public List<WarnPczInfo> getDeltaWarnInfo(String conbeamID) {
		return warnInfoMapper.selectDeltaWarnInfo(conbeamID);
	}

	/**
	 * 获取立模偏差超限信息
	 * @param conbeamID 连续梁ID
	 * @return
	 */
	@Override
	public List<WarnPczInfo> getLmbgWarnInfo(String conbeamID) {
		return warnInfoMapper.selectLmbgWarnInfo(conbeamID);
	}

	/**
	 * 获取中线偏差超限信息
	 * @param conbeamID 连续梁ID
	 * @return
	 */
	@Override
	public List<WarnPczInfo> getOutlWarnInfo(String conbeamID) {
		return warnInfoMapper.selectOutlWarnInfo(conbeamID);
	}

	/**
	 * 获取梁段错台信息
	 * @param conbeamID 连续梁ID
	 * @return
	 */
	@Override
	public List<WarnPczInfo> getLdctInfo(String conbeamID) {
		return warnInfoMapper.selectLdctInfo(conbeamID);
	}

	@Override
	public void updateLxlWarnCount(String lxlid, String ldcode,String gkbm) {
		
		int result = warnInfoMapper.selectChuzhiCount(ldcode, lxlid,gkbm);
		if (result == 0) {
			
			Lxl condition = lxlmapper.findById(Long.parseLong(lxlid));
			
			Long warncountdeal = condition.getWarnldcountdeal() + 1;
			Long warncountnodeal = condition.getWarnldcountnodeal() - 1;
			
			condition.setWarnldcountdeal(warncountdeal);
			condition.setWarnldcountnodeal(warncountnodeal);
			
			lxlmapper.updateWarnLDcount(condition);
		}
	}

	@Override
	public void warnClose(String gkbm, String partId, String conbeamId,HttpSession session) {
		UserInfo userInfo = (UserInfo) session.getAttribute(Const.SessionKey.USER_INFO);
		int warnCloseCount = warnInfoMapper.warnClose(gkbm,partId,conbeamId);
		if(warnCloseCount>0){//插入超限处置人信息
			WarnDeal record = new WarnDeal();
			record.setDealuserid(userInfo.getAccount());
			record.setGkbm(gkbm);
			record.setLxlid(conbeamId);
			record.setLdcode(partId);
			record.setAccountname(userInfo.getName());
			record.setDealtime(DateUtil.getNowDate());
			warnDealMapper.insertSelective(record);
			
			//更新连续梁中间表信息
			//更新连续梁表
			
			//获取某连续梁超限梁段数量
			WarnLdCount warnLdCount = warnInfoMapper.getDealMessage(conbeamId);
			//更新连续梁表
			warnInfoMapper.updateLxlDeal(warnLdCount);
			
		}
	}

	@Override
	public boolean isCloseWarn(Long conbeamid,Long pier,Long partid, int ldtype,int mileageflag,Long seq) {
//		List<LdMonitorStatus> list = WarnDealMapper.isCloseWarn(conbeamid);
		List<LdMonitorStatus> list;
		if(ldtype == Const.LDType.BKFDC){//直线段
			//查找相邻的边跨合拢段
			list = warnDealMapper.isCloseWarn(conbeamid,pier,Const.LDType.BKHL,99);
			if(list != null && list.size()>0){
				if(list.get(0).getStatus()!=Const.LDStatus.nodata){
					return true;
				}
			}
		}else if(ldtype == Const.LDType.XBJZ){//普通梁段
			
				if(mileageflag == Const.MileageFlag.small){//小里程
					list = warnDealMapper.isCloseWarn(conbeamid,pier,Const.LDType.XBJZ,Const.MileageFlag.small);//小里程
					for (int i=0;i<list.size()-1;i++) {
						LdMonitorStatus ldMonitorStatus = list.get(i);
						LdMonitorStatus ldMonitorStatupre = new LdMonitorStatus();
						if(i!=0){
							ldMonitorStatupre = list.get(i-1);
						}
						if((ldMonitorStatus.getLdtype() == Const.LDType.BKHL && ldMonitorStatus.getStatus()!= Const.LDStatus.nodata)||//边跨合龙段有数据
								(ldMonitorStatus.getLdtype() == Const.LDType.ZKHL && ldMonitorStatus.getStatus()!= Const.LDStatus.nodata)||//中跨合龙段有数据
								(ldMonitorStatus.getLdtype() == Const.LDType.XBJZ && ldMonitorStatus.getStatus()!= Const.LDStatus.nodata &&
								ldMonitorStatus.getStatus()!= Const.LDStatus.warndata && (seq-ldMonitorStatus.getSeq()>1) && 
								(ldMonitorStatupre.getStatus()!=null && ldMonitorStatupre.getStatus()!=Const.LDStatus.warndata))||//大于下两个梁段(n-2)有数据，并且下一个(n-1)梁段没有超限
								(ldMonitorStatus.getLdtype() == Const.LDType.XBJZ && ldMonitorStatus.getStatus()== Const.LDStatus.bluedata &&
								 (seq - ldMonitorStatus.getSeq()==1))){//下一个梁段有六个工况的数据且没有超限
							return true;
						}
					}
				}else{//大里程
					list = warnDealMapper.isCloseWarn(conbeamid,pier,Const.LDType.XBJZ,Const.MileageFlag.big);//大里程
					if(list.get(list.size()-1).getLdtype() != Const.LDType.BKFDC){//不是最后一个T构
						//查找下一个T构的中合
						List<LdMonitorStatus> list1 = warnDealMapper.isCloseWarn(conbeamid,pier+1,Const.LDType.ZKHL,99);
						if(list1 != null && list1.size()>0){
							if(list1.get(0).getStatus()!= Const.LDStatus.nodata){
								return true;
							}
						}
						//查找普通梁段的下一个梁段是否有数据
						for(int i=list.size()-1;i>=0;i--){
							LdMonitorStatus ldMonitorStatus = list.get(i);
							LdMonitorStatus ldMonitorStatupre = new LdMonitorStatus();
							if(i!=0){
								ldMonitorStatupre = list.get(i-1);
							}
							if((ldMonitorStatus.getLdtype() == Const.LDType.XBJZ && ldMonitorStatus.getStatus()!= Const.LDStatus.nodata 
									&& ldMonitorStatus.getStatus()!= Const.LDStatus.warndata && (ldMonitorStatus.getSeq()-seq>1) && 
									(ldMonitorStatupre.getStatus()!=null && ldMonitorStatupre.getStatus()!=Const.LDStatus.warndata))||//大于下两个梁段（n-2）有数据，并且下一个(n-1)梁段没有超限
									(ldMonitorStatus.getLdtype() == Const.LDType.XBJZ && ldMonitorStatus.getStatus()== Const.LDStatus.bluedata 
									&& (ldMonitorStatus.getSeq()-seq==1))){//下一个梁段有6个工况的数据并且没有超限
								return true;
							}
						}
					}else{//最后一个T构
						for(int i=list.size()-1;i>=0;i--){
							LdMonitorStatus ldMonitorStatus = list.get(i);
							if((ldMonitorStatus.getLdtype() == Const.LDType.BKHL && ldMonitorStatus.getStatus()!= Const.LDStatus.nodata)||
							(ldMonitorStatus.getLdtype() == Const.LDType.XBJZ && ldMonitorStatus.getStatus()!= Const.LDStatus.nodata && ldMonitorStatus.getStatus()!= Const.LDStatus.warndata)){
								return true;
							}
						}
					}
				}
//			}
		}
		return false;
	}
}
