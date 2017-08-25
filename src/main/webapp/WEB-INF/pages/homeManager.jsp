<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!-- 标段管理员 -->
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${ managerTitle }</title>
<meta name=”viewport” content=”width=device-width; initial-scale=1.0″ />
<script type="text/javascript"></script>
</head>
<body>
	<!-- 主页头部 -->
	<header class="mainHeader">
		<div class='main-header'>
			<div id='logo'></div>
			<div id="tit">
				<ul class='tit'>
					<li style="margin-right: 50px;">
						<a onclick="logout()"><img src="static/images/exit.png"/>&nbsp;退出</a>
					</li>
					<li><img src="static/images/help.png">&nbsp;帮助文档</li>
					<li><img src="static/images/user.png">&nbsp;${ username }</li>
					<li class='clear'></li>
				</ul>
			</div>
			<div class="clear"></div>
		</div>
	</header>
	
	<div class="managerPage">
		<section class="all-region">
			
			<!-- 隐藏内容 -->
			<!-- 用户登陆类型 标段管理员 建指管理员  -->
			<input type="hidden" id="loginType" value="${ loginType }" />
			<!-- 管理员ID(标段管理员 建指管理员) -->
			<input type="hidden" id="managerId" value="${ managerId }" />
			<!-- 建指管理员 根部门ID -->
			<!-- 标段管理员 标段ID -->
			<input type="hidden" id="managerOrgId" value="${ managerOrgId }" />
			<!-- 标段管理员 项目ID -->
			<input type="hidden" id="managerProjectId" value="${ managerProjectId }" />
			<!-- 标段管理员 片区ID -->
			<input type="hidden" id="managerCategoryItemId" value="${ managerCategoryItemId }" />
			<!-- 同步标志 -->
			<input type="hidden" id="syncFlag" value="" />
			<!-- 菜单导航 -->
			<div class ="menuNav-manager">
				<nav class="menu-nav">
					<ul>
						<li id="linkObserver"><button onclick="manager(0)">设置观测人员</button></li>
						<li id="linkEuipment"><button onclick="manager(1)">设备仪器</button></li>
						<li id="linkRoleGrant"><button onclick="manager(2)">角色授权</button></li>
						<li id="linkConBeamGrant"><button onclick="manager(3)">连续梁授权</button></li>
						<li class="clear"></li>
					</ul>
				</nav>
			</div>
			
			<!-- 主体内容 -->
			<div id="mainContent" class="manager-content"></div>
			
		</section>
		<div class="clear"></div>
		<div class="allmask view-mask"></div>
		<div class="" id="equipmentModel" style="display:none">
			<div class="managementPage ">
				<div class="managementHead">
					<span class="head-font" id="modelTitle" style="float:left">新增设备</span> <span class="closePage"  style="cursor:pointer" onclick="closeModel('equipmentModel')">X</span>
				</div>
				<div class="managementBody equipmentBody">
					<table class="datumPoint-table">
						<tr>
							<td class="right-td">设备名称</td>
							<td>&nbsp;&nbsp;<input id="shebeiname" type="text" maxlength="25" placeholder="不超过25个字符"	class="datumPoint-input">
							</td>
							<td class="right-td">类型</td>
							<td>
								&nbsp;&nbsp;<select id="type">
								  <option value="1">水准仪</option>
								  <option value="2">全站仪</option>
								</select>
							</td>
						</tr>
						<tr>
							<td class="right-td">型号</td>
							<td>&nbsp;&nbsp;<input id="xinghao" type="text" maxlength="25" placeholder="不超过25个字符"	class="datumPoint-input">
							</td>
							<td class="right-td">厂商</td>
							<td>
								&nbsp;&nbsp;<input id="changshang" type="text"	maxlength="25" placeholder="不超过25个字符"	class="datumPoint-input">
							</td>
						</tr>
						<tr>
							<td class="right-td">下次校验日期</td>
							<td>&nbsp;&nbsp;<input type="text" id="dater" style="border: 1px solid #ABADB3;width:148px;cursor:pointer;">
							</td>
							<td class="right-td"></td>
							<td></td>
						</tr>
						
					</table>
				</div>
				<div class='managementBottom equipbottom'>
					<input type='button' value='保存' class='save-btn' onclick="addEquipment()"> 
					<input type='button' value='取消' class='cancel-btn' onclick="closeModel('equipmentModel')">
				</div>
			</div>
		</div>
		<div class=""id="deleteModel" style="display:none">
			<div class="managementPage">
				<div class="managementHead">
					<span class="head-font" style="float:left;">系统提示</span> <span class="closePage" style="cursor:pointer" onclick="closeModel('deleteModel')">X</span>
				</div>
				<div class="managementBody align equipdeleteBody">
					<div class="align">
						<img alt="" src="static/images/alert.png"><span
							class="warning-span">您确认要删除此设备吗？</span>
					</div>
				</div>
				<div class='managementBottom deleteequipbottom'>
					<input type='button' value='确定' class='save-btn'
						onclick="deleteEquipment()" /> <input type='button' value='取消'
						class='cancel-btn' onclick="closeModel('deleteModel')" />
				</div>
			</div>
		</div>
	</div>
	
	<!-- Bootstrap 3.3.4 -->
	<link href="static/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
	<!-- 共通 -->
	<link rel="stylesheet" href="static/css/total.css">
	<link rel="stylesheet" href="static/css/jcDate.css">
	<link rel="stylesheet" href="static/css/equipment.css">
	<link rel="stylesheet" href="static/css/manager.css">
	
	<script type="text/javascript" src="static/plugins/jQuery/jquery-2.1.4.js"></script>
	<script type="text/javascript" src="static/plugins/jQuery/jquery.min.js"></script>
	<script type="text/javascript" src="static/plugins/jQueryUI/jquery-ui-1.10.3.min.js"></script>
	<script type="text/javascript" src="static/plugins/datepicker/jQuery-jcDate.js"></script>
	<script type="text/javascript" src="static/plugins/datepicker/lyz.calendar.min.js"></script>
	<script type="text/javascript" src="static/plugins/jqmeter/jqmeter.js"></script>

	<!-- bootstrap -->
	<script src="static/plugins/bootstrap/js/bootstrap.min.js"></script>
	<!-- 共通 -->
	<script src="static/js/common.js"></script>
	<script src="static/js/homeManager.js"></script>
</body>
</html>