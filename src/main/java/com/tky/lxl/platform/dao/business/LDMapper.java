package com.tky.lxl.platform.dao.business;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.tky.lxl.platform.model.business.LD;
import com.tky.lxl.platform.model.business.LdDraw;
import com.tky.lxl.platform.model.business.LdQuery;

/**
 * 
 * <p>Title:LDMapper </p>
 * <p>Description: 梁段Model</p>
 * <p>Company: 铁科院</p> 
 *
 * @author lihongcui（2017年3月6日 下午4:34:20）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Repository("ldMapper")
public interface LDMapper {

	/**
	 * 通过连续梁ID进行T-构列表检索
	 */
	public List<LD> selectByConBeamID(LD bean);

	/**
	 * 通过T-构进行梁段列表检索
	 * @param LDbean
	 * @return
	 */
	public List<LD> selectByPier(LD bean);

	/**
	 * 通过梁段ID进行梁段列表检索
	 * @param id梁段ID
	 * @return
	 */
	public List<LD> selectById(@Param(value = "id") Long id);

	/**
	 * 查询梁段表的信息
	 * @param ld
	 * @return
	 */
	public List<LdDraw> selectLdMessage(LdQuery ldQuery);
	
	/**
	 * 查询梁段里程标志
	 */
	public LD selectMileFlag(LD condition);
}