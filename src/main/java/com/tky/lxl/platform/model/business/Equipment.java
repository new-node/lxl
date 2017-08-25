package com.tky.lxl.platform.model.business;

import java.util.Date;

import javax.persistence.Id;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title:TEquiment 仪器设备</p>
 * <p>Description: 仪器设备页面model</p>
 * <p>Company: 铁科院</p> 
 *
 * @author yushanli（2017年3月6日 上午11:37:13）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class Equipment extends BaseModel {

	private static final long serialVersionUID = 1L;
	/**
	 *  证书编号
	 */
	@Id
	private Long equimentid;
	/**
	 * 仪器类型
	 */
	private Short equtype;
	/**
	 * 编码
	 */
	private String code;
	/**
	 * 名称
	 */
	private String name;
	/**
	 * 制造厂家
	 */
	private String maker;
	/**
	 * 仪器型号
	 */
	private String modelno;
	/**
	 * 校准人员
	 */
	private String checkuser;
	/**
	 * 校准时间
	 */
	private Date checkupdatetime;
	/**
	 * 
	 */
	private Short isverfify;
	/**
	 * 审核人员
	 */
	private String verifyuser;
	/**
	 * 审核时间
	 */
	private Date verifytime;
	/**
	 * 审核有效期
	 */
	private Date verifyday;
	/**
	 * 标段ID
	 */
	private String sectionid;
	/**
	 * 片区ID
	 */
	private String categoryid;
	/**
	 * 项目ID
	 */
	private Long projectid;
	/**
	 * 使用标志
	 */
	private Short useflag;
	/**
	 * 标段编码
	 */
	private Long conbeamid;
	/**
	 * 创建人
	 */
	private String createname;
	/**
	 * 创建时间
	 */
	private String createdate;
	/**
	 * 创建账户
	 */
    private String createaccount;
	/**
	 * 修改账户
	 */
    private String updateaccount;
	/**
	 * 修改人
	 */
	private String updatename;
	/**
	 * 修改时间
	 */
    private String updatedate;
    /**
     * 片区名称
     */
    private String pianquname;
    /**
     * 项目名称
     */
    private String projectname;
    /**
     * 标段名称
     */
    private String biaoduanname;
	/**
	 * 当前页码（已知）
	 */
	private int pageNo = 1;
	/**
	 * 开始行号（未知）
	 */
	private int startNum = 0;
	/**
	 * 未知
	 */
	private int endNum = 0;
}