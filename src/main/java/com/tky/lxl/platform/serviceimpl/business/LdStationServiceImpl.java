package com.tky.lxl.platform.serviceimpl.business;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tky.lxl.platform.dao.business.CDMapper;
import com.tky.lxl.platform.dao.business.CorrectRecoredMapper;
import com.tky.lxl.platform.dao.business.DictionaryMapper;
import com.tky.lxl.platform.dao.business.InitPointMapper;
import com.tky.lxl.platform.dao.business.LDMapper;
import com.tky.lxl.platform.dao.business.LxlMapper;
import com.tky.lxl.platform.model.business.CD;
import com.tky.lxl.platform.model.business.CorrectRecored;
import com.tky.lxl.platform.model.business.Dictionary;
import com.tky.lxl.platform.model.business.InitPoint;
import com.tky.lxl.platform.model.business.LD;
import com.tky.lxl.platform.service.business.LdStationService;

/**
 * <p>Title:LdStationServiceImpl </p>
 * <p>Description: 梁段测点Impl</p>
 * <p>Company: 铁科院</p> 
 *
 * @author lihongcui（2017年3月9日 上午11:13:05）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Service("LdStationService")
public class LdStationServiceImpl implements LdStationService {

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
	 * 获取测点表信息
	 */
	@Override
	public List<CD> getldStationValue(CD condition) {
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
	 * 通过测点号查询测点表
	 */
	@Override
	public List<CD> getCDByPoint(CD condition) {
		List<CD> list = new ArrayList<CD>();
		try {
			list = cdMapper.selectByPoint(condition);
		} catch (Exception e) {
			e.printStackTrace();
			// return new ResultBean<String>(-1, "操作异常！", "同步失败，请联系管理员！");
		}
		return list;
	}
	
	/**
	 * 更新测点表
	 */
	@Override
	public void UpdateCD(CD condition) {
		try {
			cdMapper.UpdateByPoint(condition);
		} catch (Exception e) {
			e.printStackTrace();
			// return new ResultBean<String>(-1, "操作异常！", "同步失败，请联系管理员！");
		}
	}


	/**
	 * 插入测点表
	 */
	@Override
	public void InsertCD(CD condition) {
		try{
			cdMapper.Insert(condition);
		}catch(Exception e){
			e.printStackTrace();
		}
		
	}
	
	/**
	 * 修正记录表查询
	 */
	@Override
	public List<CorrectRecored> selectByPartid(CorrectRecored condition) {
		List<CorrectRecored> list = new ArrayList<CorrectRecored>();
		try{
			
			list=correctRecoredMapper.selectByPartid(condition);
		}catch(Exception e){
			e.printStackTrace();
		}
		return list;
		
	}
	
	/**
	 * 插入记录表
	 */
	@Override
	public void Insert(CorrectRecored condition) {
		try{
			correctRecoredMapper.insert(condition);
		}catch(Exception e){
			e.printStackTrace();
		}
		
	}
	
	/**
	 * 更新测点表
	 */
	@Override
	public void Update(CorrectRecored condition) {
		try{
			correctRecoredMapper.updateByPartid(condition);
		}catch(Exception e){
			e.printStackTrace();
		}
		
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
			condition.setId("1");
			list = dictionaryMapper.select(condition);
		} catch (Exception e) {
			e.printStackTrace();
			// return new ResultBean<String>(-1, "操作异常！", "同步失败，请联系管理员！");
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
	 * 梁段略称取得
	 */
	@Override
	public List<LD> getldShortname(Long id) {
		return ldMapper.selectById(id);
	}
}
