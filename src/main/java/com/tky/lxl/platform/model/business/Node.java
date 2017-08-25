package com.tky.lxl.platform.model.business;

import com.tky.lxl.platform.model.BaseModel;

/**
 * <p>Title: Node</p>
 * <p>Description: 节点</p>
 * <p>Company: 铁科院</p> 
 *
 * @author sunjiashu（2017年3月9日 下午5:19:28）
 *
 * @version:1.0.0 copyright  2017-2018
 */
public class Node extends BaseModel{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 节点ID
	 * 父子关系用
	 */
	private String id;
	/**
	 * 父节点ID
	 * 父子关系用
	 */
	private String pid;
	/**
	 * 组织ID
	 *  部门ID/片区ID/项目ID/标段ID/连续梁ID
	 */
	private String orgId;
	/**
	 * 组织的父组织ID
	 *  标段取得项目ID用
	 */
	private String parentOrgId;
	/**
	 * 名称
	 *  部门名称/片区名称/项目名称/标段名称/连续梁名称
	 */
	private String name;
	/**
	 * 组织类型
	 */
	private String type;
	/**
	 * 桥梁主跨跨度
	 */
	private String mainKdLength;
	/**
	 * 偏差超限
	 */
	private String cntWarn;

    @Override
    public boolean equals(Object obj) {

        if (obj instanceof Node) {

        	Node other = (Node) obj;

            return this.id.equals(other.getId())
                && this.pid.equals(other.getPid())
                && this.orgId.equals(other.getOrgId());
        }
        
        return false;
    }

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the pid
	 */
	public String getPid() {
		return pid;
	}

	/**
	 * @param pid the pid to set
	 */
	public void setPid(String pid) {
		this.pid = pid;
	}

	/**
	 * @return the parentOrgId
	 */
	public String getParentOrgId() {
		return parentOrgId;
	}

	/**
	 * @param parentOrgId the parentOrgId to set
	 */
	public void setParentOrgId(String parentOrgId) {
		this.parentOrgId = parentOrgId;
	}

	/**
	 * @return the orgId
	 */
	public String getOrgId() {
		return orgId;
	}

	/**
	 * @param orgId the orgId to set
	 */
	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}

	/**
	 * @param type the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * @return the serialversionuid
	 */
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	/**
	 * @return the mainKdLength
	 */
	public String getMainKdLength() {
		return mainKdLength;
	}

	/**
	 * @param mainKdLength the mainKdLength to set
	 */
	public void setMainKdLength(String mainKdLength) {
		this.mainKdLength = mainKdLength;
	}

	/**
	 * @return the cntWarn
	 */
	public String getCntWarn() {
		return cntWarn;
	}

	/**
	 * @param cntWarn the cntWarn to set
	 */
	public void setCntWarn(String cntWarn) {
		this.cntWarn = cntWarn;
	}
}
