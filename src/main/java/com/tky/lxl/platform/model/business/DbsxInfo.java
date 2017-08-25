package com.tky.lxl.platform.model.business;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title:ZhDbsx </p>
 * <p>Description: 中跨合龙判断用</p>
 * <p>Company: 铁科院</p> 
 *
 * @author liuzhenya（2017年3月9日 下午1:52:37）
 *
 * @version:1.0.0 copyright  2017-2018
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class DbsxInfo  extends BaseModel implements Comparable<DbsxInfo>{

	private static final long serialVersionUID = 1L;

	/**
	 *  更新时间
	 */
	private Long updatetime;
	/**
	 *  内容
	 */
	private String content;
	/**
	 * 大小里程区分
	 */
	private int mileageflag;

	public DbsxInfo() {

	}
	
	/**
	 * 按照时间进行排序
	 */
	@Override
	public int compareTo(DbsxInfo o) {

		DbsxInfo dbsxInfo = o;

		Long compareTmp = dbsxInfo.getUpdatetime();

		return this.updatetime.compareTo(compareTmp);
	}
}