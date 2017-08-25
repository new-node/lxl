package com.tky.lxl.platform.dao.business;

import com.tky.lxl.platform.model.business.LoginUserTemp;

/**
 * 
 * <p>Title: LoginUserTempMapper</p>
 * <p>Description: 登陆用户临时表Mapper</p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年4月8日 上午11:07:20）
 *
 * @version:1.0.0 copyright  2017-2018
 */
public interface LoginUserTempMapper {
	
    /**
     * 设为观测人员时添加更新数据
     */
    int saveLoginUserForObserver(LoginUserTemp record);
    
    /**
     * 取消观测人员时更新数据
     */
    int cancelLoginUserForObserver(LoginUserTemp record) ;
}