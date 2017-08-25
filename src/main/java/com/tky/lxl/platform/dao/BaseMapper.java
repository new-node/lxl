package com.tky.lxl.platform.dao;

import org.springframework.stereotype.Repository;

@Repository("mapper")
public interface BaseMapper<T> {

	public void saveOrUpdate(T bean);
}
