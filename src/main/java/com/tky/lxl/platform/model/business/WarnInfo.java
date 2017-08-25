package com.tky.lxl.platform.model.business;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title:WarnInfo </p>
 * <p>Description: 获取偏差信息</p>
 * <p>Company: 铁科院</p> 
 *
 * @author liuzhenya（2017年3月9日 下午1:52:37）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class WarnInfo extends BaseModel{

	private static final long serialVersionUID = 1L;
	/**
	 * 测点ID
	 */
	private Long pointid;
	/**
	 * 超限类型
	 */
	private String warntype;
	/**
	 * 超限类型名称
	 */
	private String warntypename;
	/**
	 * 高程偏差值
	 */
	private Double delta;
	/**
	 * 中线X偏差值
	 */
	private Double outl;
	/**
	 * 超限时间
	 */
	private String warntime;
	/**
	 * 处置标志
	 *   0：未处理
	 *   1：已关闭
	 *   2：处理中
	 */
	private Long dealflag;
	/**
	 * 偏差上下限
	 */
	private String lowerupper;
	/**
	 * 默认偏差上下限
	 */
	private String lowerupperdefault;
	/**
	 * 梁段编码
	 */
	private String code;
	/**
	 * 梁段ID
	 */
	private String partid;
	/**
	 * T构
	 */
	private Long pier;
	/**
	 * 施工工况内容
	 */
	private String content;
	/**
	 * 超限ID
	 */
	private Long warnId;
	/**
	 * 工况编码
	 */
	private Long gkbm;
	/**
	 * 测点编码
	 */
	private String cdCode;
	/**
	 * 梁段名称
	 */
	private String ldName;
	/**
	 * 梁段类型
	 */
	private String ldType;
	/**
	 * 偏差范围
	 */
	private String warnRange;
	/**
	 * 里程FLG
	 */
	private String mileageFlag;
	/**
	 * 项目ID
	 */
	private String projectid;
	/**
	 * 连续梁ID
	 */
	private String conbeamid;
	/**
	 * 删除标志
	 */
	private String useflag;
	/**
	 * 起始时间
	 */
	private String sttime;
	/**
	 * 终了时间
	 */
	private String endtime;
	
	/**
	 * 梁段排序
	 */
	private Long seq;
}