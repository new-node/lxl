package com.tky.lxl.platform.serviceimpl.mobile;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tky.lxl.platform.dao.business.WarnInfoMapper;
import com.tky.lxl.platform.dao.mobile.MobileMapper;
import com.tky.lxl.platform.model.Page;
import com.tky.lxl.platform.model.business.WarnInfo;
import com.tky.lxl.platform.model.mobile.QSLDInfo;
import com.tky.lxl.platform.service.mobile.MobileService;

/**
 * <p>Title: WarnInfoServiceImpl</p>
 * <p>Description: 偏差超限信息</p>
 * <p>Company: 铁科院</p> 
 *
 * @author wk（2017年5月18日 上午10:58:40）
 */
@Service("mobileService")
@Transactional
public class MobileServiceImpl implements MobileService {

	@Resource
	private WarnInfoMapper warnInfoMapper;
	@Resource
	private MobileMapper mobileMapper;

	/**
	 * 获取偏差超限信息
	 * @param conbeamID
	 * @param page
	 * @return
	 */
	@Override
	public Page getWarnInfoList(String conbeamID, Page page) {
		// 查询当前条件下的总记录数
		Integer totalCount = warnInfoMapper.selectWarnInfoTotalCount(conbeamID, null, null, null,null,
				null, null, null,null);
		page.setTotalCount(totalCount);
		// 获得开始行号和结束行号
		Integer startNum = page.getStartNum();
		Integer endNum = page.getEndNum();
		// 查询指定条件的偏差超限信息
		List<WarnInfo> warnInfoList = warnInfoMapper.selectWarnInfo(conbeamID, null,null,null,null,null,
				null,null, startNum, endNum,null);
		page.setList(warnInfoList);

		return page;
	}

	@Override
	public List<QSLDInfo> getqsldinfoByprojectidOrsectionId(Long id, Integer type,String conbeamid) {
	    Map<String,Object> m = new HashMap<>();
	    String[] conbeamids = (conbeamid!=null && conbeamid.length()>0)?conbeamid.split(","):new String[0];
	    if(type == 1){
		    m.put("projectId", id);
		    m.put("conbeamId", Arrays.asList(conbeamids));
			return mobileMapper.getQSLDInfoByprojectId(m);//根据项目获取
		}if(type == 2){
		    m.put("sectionId", id);
		    m.put("conbeamId", Arrays.asList(conbeamids));
			return mobileMapper.getQSLDInfoBysectionId(m);//根据标段获取
		}
		return null;
	}

	@Override
	public Long getProjectIdByconbeamId(String conbeamId) {
		return mobileMapper.getProjectIdByconbeamId(conbeamId);
	}

	@Override
	public List<String> getqsldinfoByconbeamid(String conbeamId) {
		return mobileMapper.getqsldinfoByconbeamid(conbeamId);
	}

	
}
