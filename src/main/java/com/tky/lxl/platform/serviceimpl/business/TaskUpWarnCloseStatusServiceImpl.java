package com.tky.lxl.platform.serviceimpl.business;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tky.lxl.platform.dao.business.TaskUpWarnCloseStatusMapper;
import com.tky.lxl.platform.dao.business.WarnDealMapper;
import com.tky.lxl.platform.finals.Const;
import com.tky.lxl.platform.model.business.LdMonitorStatus;
import com.tky.lxl.platform.service.business.TaskUpWarnCloseStatusService;
import com.tky.lxl.platform.sqlsession.MySqlSession;

/**
 * 
 * <p>Title:TaskUpWarnCloseStatusServiceImpl </p>
 * <p>Description: 定时任务 定时更新连续梁 处置中的梁段是否可以关闭</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年8月16日 下午4:36:40）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Service("taskUpWarnCloseStatusService")
public class TaskUpWarnCloseStatusServiceImpl implements TaskUpWarnCloseStatusService {

	@Resource
	private TaskUpWarnCloseStatusMapper taskUpWarnCloseStatusMapper;
	
	@Resource
	private WarnDealMapper warnDealMapper;
	
	@Override
	public void syncWarnCloseStatus() {
		//存放可以关闭的梁段 信息
		List<LdMonitorStatus> ldList = new ArrayList<LdMonitorStatus>();
		//查询处置中的超限梁段的基本信息
		List<LdMonitorStatus> lists = taskUpWarnCloseStatusMapper.getDealingLd();
		//是否可以变成处置中
		if(lists != null && lists.size()>0){
			for (LdMonitorStatus ldMonitorStatus : lists) {//循环遍历超限信息
				List<LdMonitorStatus> list;
				if(ldMonitorStatus.getLdtype() == Const.LDType.BKFDC){//直线段
					//查找相邻的边跨合拢段
					list = warnDealMapper.isCloseWarn(ldMonitorStatus.getConbeamid(),ldMonitorStatus.getPier(),Const.LDType.BKHL,99);
					if(list != null && list.size()>0){
						if(list.get(0).getStatus()!=Const.LDStatus.nodata){
							LdMonitorStatus ldm = new LdMonitorStatus();
							ldm.setConbeamid(ldMonitorStatus.getConbeamid());
							ldm.setPartid(ldMonitorStatus.getPartid());
							ldList.add(ldm);
						}
					}
				}else if(ldMonitorStatus.getLdtype() == Const.LDType.XBJZ){//普通梁段
						if(ldMonitorStatus.getMileageflag() == Const.MileageFlag.small){//小里程
							list = warnDealMapper.isCloseWarn(ldMonitorStatus.getConbeamid(),ldMonitorStatus.getPier(),Const.LDType.XBJZ,Const.MileageFlag.small);
							
							for (int i=0;i<list.size()-1;i++) {
								LdMonitorStatus ldMonitorStatu = list.get(i);
								LdMonitorStatus ldMonitorStatupre = new LdMonitorStatus();
								if(i!=0){
									ldMonitorStatupre = list.get(i-1);
								}
								if((ldMonitorStatu.getLdtype() == Const.LDType.BKHL && ldMonitorStatu.getStatus()!= Const.LDStatus.nodata)||//边跨合龙段有数据
										(ldMonitorStatu.getLdtype() == Const.LDType.ZKHL && ldMonitorStatu.getStatus()!= Const.LDStatus.nodata)||//中跨合龙段有数据
										(ldMonitorStatu.getLdtype() == Const.LDType.XBJZ && ldMonitorStatu.getStatus()!= Const.LDStatus.nodata &&
												ldMonitorStatu.getStatus()!= Const.LDStatus.warndata && (ldMonitorStatus.getSeq()-ldMonitorStatu.getSeq()>1)&& 
														(ldMonitorStatupre.getStatus()!=null && ldMonitorStatupre.getStatus()!=Const.LDStatus.warndata))||//大于下两个梁段(n-2)有数据，并且下一个(n-1)梁段没有超限
										(ldMonitorStatu.getLdtype() == Const.LDType.XBJZ && ldMonitorStatu.getStatus()== Const.LDStatus.bluedata &&
										 (ldMonitorStatus.getSeq() - ldMonitorStatus.getSeq()==1))){//下一个梁段有六个工况的数据且没有超限
									LdMonitorStatus ldm = new LdMonitorStatus();
									ldm.setConbeamid(ldMonitorStatus.getConbeamid());
									ldm.setPartid(ldMonitorStatus.getPartid());
									ldList.add(ldm);
								}
							}
						}else{//大里程
							list = warnDealMapper.isCloseWarn(ldMonitorStatus.getConbeamid(),ldMonitorStatus.getPier(),Const.LDType.XBJZ,Const.MileageFlag.big);//大里程
							if(list.get(list.size()-1).getLdtype() != Const.LDType.BKFDC){//不是最后一个T构
								//查找下一个T构的中合
								List<LdMonitorStatus> list1 = warnDealMapper.isCloseWarn(ldMonitorStatus.getConbeamid(),ldMonitorStatus.getPier()+1,Const.LDType.ZKHL,99);
								if(list1 != null && list1.size()>0){
									if(list1.get(0).getStatus()!= Const.LDStatus.nodata){
										LdMonitorStatus ldm = new LdMonitorStatus();
										ldm.setConbeamid(ldMonitorStatus.getConbeamid());
										ldm.setPartid(ldMonitorStatus.getPartid());
										ldList.add(ldm);
									}
								}
								//查找普通梁段的下一个梁段是否有数据
								for(int i=list.size()-1;i>=0;i--){
									LdMonitorStatus ldMonitorStatu = list.get(i);
									LdMonitorStatus ldMonitorStatupre = new LdMonitorStatus();
									if(i!=0){
										ldMonitorStatupre = list.get(i-1);
									}
									if((ldMonitorStatu.getLdtype() == Const.LDType.XBJZ && ldMonitorStatu.getStatus()!= Const.LDStatus.nodata 
											&& ldMonitorStatu.getStatus()!= Const.LDStatus.warndata && (ldMonitorStatu.getSeq()-ldMonitorStatus.getSeq()>1)&& 
													(ldMonitorStatupre.getStatus()!=null && ldMonitorStatupre.getStatus()!=Const.LDStatus.warndata))||//大于下两个梁段（n-2）有数据，并且下一个(n-1)梁段没有超限
											(ldMonitorStatu.getLdtype() == Const.LDType.XBJZ && ldMonitorStatu.getStatus()== Const.LDStatus.bluedata 
											&& (ldMonitorStatu.getSeq()-ldMonitorStatus.getSeq()==1))){
										LdMonitorStatus ldm = new LdMonitorStatus();
										ldm.setConbeamid(ldMonitorStatus.getConbeamid());
										ldm.setPartid(ldMonitorStatus.getPartid());
										ldList.add(ldm);
									}
								}
							}else{//最后一个T构
								for(int i=list.size()-1;i>=0;i--){
									LdMonitorStatus ldMonitorStatu = list.get(i);
									if((ldMonitorStatu.getLdtype() == Const.LDType.BKHL && ldMonitorStatu.getStatus()!= Const.LDStatus.nodata)||
									(ldMonitorStatu.getLdtype() == Const.LDType.XBJZ && ldMonitorStatu.getStatus()!= Const.LDStatus.nodata && ldMonitorStatu.getStatus()!= Const.LDStatus.warndata)){
										LdMonitorStatus ldm = new LdMonitorStatus();
										ldm.setConbeamid(ldMonitorStatus.getConbeamid());
										ldm.setPartid(ldMonitorStatus.getPartid());
										ldList.add(ldm);
									}
								}
							}
						}
				}
			}
		}
		if(ldList!=null && ldList.size()>0){
			//将处置中变成待关闭
			// 批量导入数据
			MySqlSession<LdMonitorStatus> ldMonitorStatus = new MySqlSession<LdMonitorStatus>();
			ldMonitorStatus.saveSyncData(ldList, TaskUpWarnCloseStatusMapper.class);
//			taskUpWarnCloseStatusMapper.saveOrUpdate(ldList);
		}
	}

}
