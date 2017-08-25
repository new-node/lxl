package com.tky.lxl.platform.emun;

public enum ResultCodeTypeEunm {
	exitst(2,"数据已存在"),
	scuss(0, "操作成功"),
	scussButNull(1,"无数据！"),
	exception(-1, "操作异常");
	 
	private int key;
	private String value ;

	private ResultCodeTypeEunm(int key, String value) {
		this.key = key;
		this.value = value;
	}

	public int getKey() {
		return key;
	}

	public void setKey(int key) {
		this.key = key;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
	
}
