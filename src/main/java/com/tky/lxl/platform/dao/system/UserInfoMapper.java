package com.tky.lxl.platform.dao.system;

import com.tky.lxl.platform.model.system.UserInfo;
import java.math.BigDecimal;

public interface UserInfoMapper {
    int deleteByPrimaryKey(BigDecimal id);

    int insert(UserInfo record);

    int insertSelective(UserInfo record);

    UserInfo selectByPrimaryKey(BigDecimal id);

    int updateByPrimaryKeySelective(UserInfo record);

    int updateByPrimaryKey(UserInfo record);
}