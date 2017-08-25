<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<div class="equipment-region">
	<div class="smEquipment-title">
		<ul class="smEquipment-title-left">
			<li onclick="openModel('equipmentModel',0)">
				<spring:message code="equipment.btn.add"></spring:message>
			</li>
			<li onclick="openModel('equipmentModel',1)">
				<spring:message code="equipment.btn.upd"></spring:message>
			</li>
			<li onclick="openModel('deleteModel')">
				<spring:message code="equipment.btn.del"></spring:message>
			</li>
		</ul>
	</div>
		
	<div class="tablehead">
		<!-- 片区下拉框 仅在中国铁路总公司下显示 -->
		<select name="categoryItem" id="categoryItem" class="categoryItem" onchange="cagegoryItemChange()">
		</select>
		<!-- 项目下拉框 仅在中国铁路总公司下显示 -->
		<select name="projectInfo" id="projectInfo" class="categoryItem" onchange="projectInfoChange()">
		</select> 
		<!-- 标段下拉框 中国铁路总公司 项目 下显示 -->
		<select name="projectSection" id="projectSection" class="categoryItem">
		</select> 
		<a class='observerEquipment'><input type="button" id="search" value='<spring:message code="condition.search"></spring:message>' onclick="search()"></a>
	</div>
	<div class="tablebox">
		<table id="shebeiList" class="table table-bordered">
			<thead>
				<tr>
					<td class="checkTD"><input type='checkbox' name="equipment" id="equip" onchange="selectAll()"></td>
					<td width='60'>
						<spring:message code="home.serialNumber"></spring:message>
					</td>
					<td class="suoshuTD treeCheckHide" width="100">
						<spring:message code="equipment.area"></spring:message>
					</td>
					<td class="suoshuTD treeCheckHide" width="100">
						<spring:message code="equipment.project"></spring:message>
					</td>
					<td class="suoshuTD biaodunhide" width="100">
						<spring:message code="equipment.section"></spring:message>
					</td>
					<td style="word-break:break-all">
						<spring:message code="equipment.name"></spring:message>
					</td>
					<td style="width:80px;">
						<spring:message code="equipment.type"></spring:message>
					</td>
					<td >
						<spring:message code="equipment.model"></spring:message>
					</td>
					<td style="word-break:break-all">
						<spring:message code="equipment.firm"></spring:message>
					</td>
					<td style="width:120px;">
						<spring:message code="equipment.nextCheckDate"></spring:message>
					</td>
				</tr>

			</thead>
			<tbody>
				<!-- 仪器设备的信息展示 -->
			</tbody>
		</table>
		<div id="tableinfo" class="tableinfo">
			
		</div>
	</div>
</div>

<script src="static/js/equipment.js"></script>