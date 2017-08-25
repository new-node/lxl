package com.tky.lxl.platform.serviceimpl.business;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tky.lxl.platform.dao.business.CDMapper;
import com.tky.lxl.platform.dao.business.CorrectRecoredMapper;
import com.tky.lxl.platform.dao.business.DictionaryMapper;
import com.tky.lxl.platform.dao.business.InitPointMapper;
import com.tky.lxl.platform.dao.business.LDMapper;
import com.tky.lxl.platform.dao.business.LxlMapper;
import com.tky.lxl.platform.dao.business.XXKZDMapper;
import com.tky.lxl.platform.model.business.CD;
import com.tky.lxl.platform.model.business.CorrectRecored;
import com.tky.lxl.platform.model.business.Dictionary;
import com.tky.lxl.platform.model.business.InitPoint;
import com.tky.lxl.platform.model.business.LD;
import com.tky.lxl.platform.model.business.Lxl;
import com.tky.lxl.platform.service.business.TheoreticalService;

/**
 * <p>Title: TheoreticalServiceImpl</p>
 * <p>Description: 理论维护ServiceImpl</p>
 * <p>Company: 铁科院</p> 
 *
 * @author lihongcui（2017年3月9日 上午11:14:25）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Service("TheoreticalService")
public class TheoreticalServiceImpl implements TheoreticalService {

	@Resource
	private LxlMapper lxlmapper;
	@Resource
	private LDMapper ldMapper;
	@Resource
	private CDMapper cdMapper;
	@Resource
	private DictionaryMapper dictionaryMapper;
	@Resource
	private CorrectRecoredMapper correctRecoredMapper;
	@Resource
	private InitPointMapper initPointMapper;
	@Resource
	private XXKZDMapper xxkzdMapper;
	
	/**
	 * 通过连续梁ID获取T-构列表
	 */
	@Override
	public List<LD> getPierItem(LD condition) {
		List<LD> list = new ArrayList<LD>();
		try {
			list = ldMapper.selectByConBeamID(condition);
		} catch (Exception e) {
			e.printStackTrace();
			// return new ResultBean<String>(-1, "操作异常！", "同步失败，请联系管理员！");
		}
		return list;
	}

	/**
	 * 通过T-构获取梁段列表
	 */
	@Override
	public List<LD> getPartNameItem(LD condition) {
		List<LD> list = new ArrayList<LD>();
		try {
			list = ldMapper.selectByPier(condition);
		} catch (Exception e) {
			e.printStackTrace();
			// return new ResultBean<String>(-1, "操作异常！", "同步失败，请联系管理员！");
		}
		return list;
	}

	/**
	 * 通过梁段获取施工类型列表
	 */
	@Override
	public List<Dictionary> getGkbmItem() {
		List<Dictionary> list = new ArrayList<Dictionary>();
		try {
			Dictionary condition=new Dictionary();
			condition.setTypeid(new BigDecimal(1));
			list = dictionaryMapper.select(condition);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	/**
	 * 通过梁段ID获取初始化测点信息
	 */
	@Override
	public List<InitPoint> getInitPointInfo(InitPoint condition) {
		List<InitPoint> list = new ArrayList<InitPoint>();
		try {
			list = initPointMapper.selectInitPointInfo(condition);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
    
    /**
     * 通过梁段ID获取大小里程
     * @param beam
     * @return
     */
    @Override
    public int getMiletype(int beam){
    	int a = 0;
    	a=cdMapper.getMiletype(beam);
    	return a;
    }

	/**
	 * 更新测点表
	 */
	@Override
	public void setCDItem(CD condition) {
		String bfCalculateht="";//更新前理论高程
		String bfllX="";//更新前理论X值
		String bfllY="";//更新前理论Y值
		String calculateht="";//更新后理论高程
		String llX="";//更新后理论X值
		String llY="";//更新后理论Y值
		
		try{
			List<CD> CDItem=new ArrayList<CD>();
			Lxl bean = new Lxl();
			bean.setConbeamid(condition.getConbeamid());
			CDItem = cdMapper.selectByPoint(condition);
			
			if (CDItem.size() > 0) {
				// 变更前理论高程的取得
				if (CDItem.get(0).getCalculateht() != null) {
					bfCalculateht = CDItem.get(0).getCalculateht().toString();
				}
				// 变更前理论X值的取得
				if (CDItem.get(0).getLlX() != null) {
					bfllX = CDItem.get(0).getLlX().toString();
				}
				// 变更前理论Y值的取得
				if (CDItem.get(0).getLlY() != null) {
					bfllY = CDItem.get(0).getLlY().toString();
				}

				// 变更后理论高程值
				if (condition.getCalculateht() != null) {
					calculateht = condition.getCalculateht().toString();
				} else {
					calculateht = "空";
				}

				// 变更后理论X值
				if (condition.getLlX() != null) {
					llX = condition.getLlX().toString();
				} else {
					llX = "空";
				}

				// 变更后理论Y值
				if (condition.getLlY() != null) {
					llY = condition.getLlY().toString();
				} else {
					llY = "空";
				}
				
				CorrectRecored record = new CorrectRecored();
				//修正者
				record.setCorrector(condition.getCreateuser());
				//修正时间
				Date date=new Date();
				record.setCorrecttime(date);
				//修正类型
				record.setCorrecttype(Short.parseShort("1"));
				//梁段ID
				record.setPartid(condition.getPartid());
				//修正原因
				record.setReason("");
				//修正记录
				String updateRecord="";
				String type="";
				
				if("1".equals(condition.getGkbm().toString())){
					type="挂篮后";
				}else if("2".equals(condition.getGkbm().toString())){
					type="浇筑前";
				}else if("3".equals(condition.getGkbm().toString())){
					type="浇筑后";
				}else if("4".equals(condition.getGkbm().toString())){
					type="预应力张拉前";
				}else if("5".equals(condition.getGkbm().toString())){
					type="预应力张拉后";
				}else{
					type="挂篮前";
				}
				
				if("1".equals(condition.getGkbm().toString())){
					updateRecord="临时测点"+condition.getPointplace()+":";
				}else{
					updateRecord="测点"+condition.getPointplace()+":";
				}
				
				updateRecord= updateRecord + type;
				
				if(!calculateht.equals(bfCalculateht)){
					updateRecord=updateRecord+"理论高程"+bfCalculateht+"变更为"+calculateht + ";";
				}
				
				if(!llX.equals(bfllX)){
					updateRecord=updateRecord+"理论X值"+bfllX+"变更为"+llX + ";";
				}
				
				if(!llY.equals(bfllY)){
					updateRecord=updateRecord+"理论Y值"+bfllY+"变更为"+llY + ";";
				}
				
				record.setRecord(updateRecord);
				record.setMileageflag(condition.getMileageflag());
				correctRecoredMapper.insert(record);
		  
				condition.setCreatetime(null);
				condition.setCreateuser(null);
				cdMapper.UpdateByPoint(condition);
			}else{
				cdMapper.Insert(condition);
			}
			
			//测点表中更新时间的修正
			InitPoint bInitPoint = new InitPoint();
			if(condition.getInitpointid() != null){
				bInitPoint.setInitpointid(condition.getInitpointid());
				initPointMapper.UpdateByinitPoint(bInitPoint);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		
	}

	/**
	 * 取得测点表信息
	 */
	@Override
	public List<CD> getCDItem(CD condition) {
		
		List<CD> list = new ArrayList<CD>();
		try {
			list = cdMapper.select(condition);
		} catch (Exception e) {
			e.printStackTrace();
			// return new ResultBean<String>(-1, "操作异常！", "同步失败，请联系管理员！");
		}
		return list;
		
	}

	/**
	 * 更新梁段表
	 */
	@Override
	public LD selectLdMileageflag(LD condition) {
		
		return ldMapper.selectMileFlag(condition);
	}

	@Override
	public Boolean isTest(Long conbeamid, Long beam, Short condition) {
		int count = xxkzdMapper.getXXKZDCount(conbeamid,beam,condition);
		//已测量
		if(count > 0){
			return true;
		}else{
			return false;
		}
		
	}

	@Override
	public InitPoint getInitPointMessage(Long conbeamid, Long beam, Short ptype, Short point,String miletype) {
		
		return initPointMapper.getInitPointMessage(conbeamid,beam,ptype,point,miletype);
	}

	
}
