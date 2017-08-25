package com.tky.lxl.platform.model.business;

import java.math.BigDecimal;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title:MeasureInfo </p>
 * <p>Description:获取测量信息 </p>
 * <p>Company: 铁科院</p> 
 *
 * @author liuzhenya（2017年3月9日 下午1:53:44）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class MeasureInfo extends BaseModel {

	private static final long serialVersionUID = 1L;
	/**
	 * T构
	 */
	private Long pier;
	/**
	 * 梁段号
	 */
	private String ldName;
	/**
	 * 测点名称
	 */
	private String cdbm;
	/**
	 * 测点编码
	 */
	private String cdid;
	/**
	 * 测点类型
	 */
	private String pType;
	/**
	 * 测量时间
	 */
	private String mTime;
	/**
	 * 理论高程
	 */
	private BigDecimal calculateht;
	/**
	 * 实测高程
	 */
	private BigDecimal mavalue;
	/**
	 * 高程偏差值
	 */
	private BigDecimal pcz;
	/**
	 * 理论坐标X
	 */
	private BigDecimal llx;
	/**
	 * 理论坐标X
	 */
	private BigDecimal lly;
	/**
	 * 实测坐标X
	 */
	private BigDecimal xxValue;
	/**
	 * 实测坐标Y
	 */
	private BigDecimal yyValue;
	/**
	 * X偏差
	 */
	private BigDecimal xxPcz;
	/**
	 * 里程Flg
	 */
	private String mileageFlag;
	/**
	 * 梁段类型
	 */
	private String ldType;
	/**
	 * 施工工况编码
	 */
	private String gkbm;
	/**
	 * 施工工况
	 */
	private String gkName;
	/**
	 * 是否超限，大于0超限
	 */
	private String warncount;
	/**
	 * 施工阶段ID
	 */
	private String sgjdid;
}