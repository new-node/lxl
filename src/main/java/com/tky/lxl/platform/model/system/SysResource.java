package com.tky.lxl.platform.model.system;

import com.tky.lxl.platform.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>Title:SysResource </p>
 * <p>Description: 资源信息表--菜单、按钮</p>
 * <p>Company: 铁科院</p> 
 *
 * @author hanxiaofeng（2017年3月17日 下午2:57:48）
 *
 * @version:1.0.0 copyright © 2017-2018
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class SysResource extends BaseModel{
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
     *资源ID
     */
    private Integer resId;
    /**
     *资源名称
     */
    private String resName;
    /**
     *父资源ID
     */
    private Integer parentId;
    /**
     *URL
     */
    private String url;
    /**
     *资源类型：菜单、按钮
     */
    private String restype;
    /**
     *是否显示
     */
    private Integer isShow;
    /**
     *权限	
     */
    private String permission;
    /**
     *显示顺序
     */
    private Integer seq;
}