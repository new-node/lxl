<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!-- 组织结构树 -->
<aside class="main-sidebars">
	<div class='aside-head'>
		<!-- 条件分类下拉框 -->
		<select id="orgConditionType" onchange="showCondition()">
			<option value="0" selected><spring:message code="nav.bridgename"></spring:message></option>
			<option value="1"><spring:message code="nav.span"></spring:message></option>
		</select>
		<!-- 桥名条件输入框 -->
		<input type="text" id="orgConditionName" class="input-text" />
		<!-- 主跨跨度条件下拉框 -->
		<select id="orgConditionMainLength" class="input-text" >
			<option value="0"><spring:message code="nav.all"></spring:message></option>
			<option value="1">＜60</option>
			<option value="2">60～80</option>
			<option value="3">80～100</option>
			<option value="4">100～120</option>
			<option value="5">＞120</option>
		</select>
		<!-- 搜索 -->
		<input type="button" onclick="searchOrg()" class="btn btn-primary" value='<spring:message code="nav.search"></spring:message>'/>
	</div>
	<div id="left-menu" class='left-menu-tree'>
		<div class="content_wrap">
			<div class="zTreeDemoBackground left">
				<!-- 组织结构树展示 -->
				<ul id="orgTree" class="ztree orgTree"></ul>
				<div id="resultMessage"></div>
			</div>
		</div>
	</div>
</aside>

<script src="static/plugins/zTree/js/jquery.ztree.core.min.js"></script>
<script src="static/plugins/zTree/js/jquery.ztree.exhide.min.js"></script>
<script src="static/js/orgTree.js"></script>

