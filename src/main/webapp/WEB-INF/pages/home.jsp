<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page import="com.tky.lxl.platform.model.system.UserInfo" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%
	UserInfo userInfo =(UserInfo)session.getAttribute("userInfo");
	String username = userInfo.getName();
%>
<!-- 主页面 -->
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>连续梁线形监测系统</title>
	<meta name=”viewport” content=”width=device-width; initial-scale=1.0″ />
	<meta http-equiv="X-UA-Compatible" content="IE=11" />
	<!-- Bootstrap 3.3.4 -->
	<link href="static/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
	<!-- zTree -->
	<link rel="stylesheet" href="static/plugins/zTree/css/zTreeStyle/zTreeStyle.css" type="text/css">
	<link rel="stylesheet" href="static/css/total.css">
	<link rel="stylesheet" href="static/css/jcDate.css">
	<script type="text/javascript">
			var basePath="<%=basePath%>";
	</script>	
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
					<li><img src="static/images/user.png">&nbsp;${username }</li>
					<li><a href="?locale=zh_CN">中文</a> | <a href="?locale=en_US">English</a></li>
					<li class='clear'></li>
				</ul>
			</div>
			<div class="clear"></div>
		</div>
	</header>
	
	<article >
		<section class="all-region">
			
			<!-- 组织结构树 -->
			<div id="menuOrgTree"></div>
			
			<!-- 菜单导航 -->
			<div id="menuNav"></div>
			
			<!-- 主体内容 -->
			<div class="echart-region" id="echartRegionFirst">
				<div id="mainContent" class="mainContent"></div>
			</div>
			
		</section>

		<div class="clear"></div>
		
		<!-- 隐藏项目 -->
		<div class="hidden">
		
			<!-- 用户登陆名 -->
			<input type="text" id="globalAccount" value="${ account }" />
			<!-- 用户姓名 -->
			<input type="text" id="globalUserName" value="${ username }" />
			
			<!-- 组织ID -->
			<input type="text" id="orgId" value="" />
			<!-- 组织类型 -->
			<input type="text" id="orgType" value="" />
			<!-- 组织名称 -->
			<input type="text" id="orgName" value="" />
			<!-- 项目ID(标段用户用) -->
			<input type="text" id="projectId" value="${ projectId }" />
			<!-- 标段ID(标段用户用) -->
			<input type="text" id="sectionId" value="${ sectionId }" />
			<!-- 用户登陆类型 -->
			<input type="text" id="loginType" value="${ loginType }" />
			
			<!-- 下拉框JSON保存 -->
			<!-- 片区一览 -->
			<input type="text" id="globalCategoryItemList" value="" />
			<!-- 项目一览 -->
			<input type="text" id="globalProjectList" value="" />
			<!-- 标段一览 -->
			<input type="text" id="globalSectionList" value="" />
			
			<!-- 右侧画面条件保存 -->
			<!-- 片区一览 -->
			<input type="text" id="conditionCategoryItemList" value="" />
			<!-- 项目一览 -->
			<input type="text" id="conditionProjectList" value="" />
			<!-- 标段一览 -->
			<input type="text" id="conditionSectionList" value="" />
			<!-- 连续梁一览 -->
			<input type="text" id="conditionConBeamList" value="" />
		</div>
		<!-- 遮罩层 -->
		<div class="allmask"></div>
		<!-- 新增基准点 -->
		<div id="addDatumPoint" style="display:none">
			<div class="managementPage ">
				<div class="managementHead">
					<span class="head-font" style="float:left"><spring:message code="basePoint.add"></spring:message></span> <span class="closePage"  style="cursor:pointer" onclick="closeModel('addDatumPoint')">X</span>
				</div>
				<div class="managementBody modelBody">
					<table class="datumPoint-table">
						<tr>
							<td class="right-td"><span class="datumPoint-span"><spring:message code="basepoint.name"></spring:message></span></td>
							<td>&nbsp;&nbsp;<input id="addBaseName" type="text" placeholder='<spring:message code="placeholder.50size"></spring:message>'
								class="datumPoint-input"></td>
						</tr>
						<tr>
							<td class="right-td"><span class="datumPoint-span"><spring:message code="basepoint.X"></spring:message></span></td>
							<td>&nbsp;&nbsp;<input id="addBasexx" type="text"
								class="datumPoint-input"></td>
						</tr>
						<tr>
							<td class="right-td"><span class="datumPoint-span"><spring:message code="basepoint.Y"></spring:message></span></td>
							<td>&nbsp;&nbsp;<input id="addBaseyy" type="text"
								class="datumPoint-input"></td>
						</tr>
						<tr>
							<td class="right-td"><span class="datumPoint-span"><spring:message code="basepoint.Z"></spring:message></span></td>
							<td>&nbsp;&nbsp;<input id="addBasezz" type="text"
								class="datumPoint-input"></td>
						</tr>
					</table>
				</div>
				<div class='managementBottom modelBottom'>
					<input type='button' value='<spring:message code="div.save"></spring:message>' class='save-btn'
						onclick="addDatumPoint()" id="addDatumBtn"> 
						<input type='button' value='<spring:message code="div.cancle"></spring:message>'
						class='cancel-btn' onclick="closeModel('addDatumPoint')">
				</div>
			</div>
		</div>
		<!-- 基准点修正 -->
		<div style="display:none" id="updateDatumPoint" >
			<div class="managementPage ">
				<div class="managementHead">
					<span class="head-font" style="float:left"><spring:message code="basepoint.update"></spring:message></span> <span class="closePage" style="cursor:pointer" onclick="closeModel('updateDatumPoint')">X</span>
				</div>
				<div class="managementBody updatemodelBody">
					<table class="datumPoint-table">
						<tr>
							<td class="right-td"><span class="datumPoint-span"><spring:message code="basepoint.name"></spring:message></span></td>
							<td>&nbsp;&nbsp;<input type="text" id="updateBasename" placeholder='<spring:message code="placeholder.50size"></spring:message>' disabled class="datumPoint-input"></td>
						</tr>
						<tr>
							<td class="right-td"><span class="datumPoint-span"><spring:message code="basepoint.X"></spring:message></span></td>
							<td>&nbsp;&nbsp;<input type="text" id="updateBasexx" class="datumPoint-input"></td>
						</tr>
						<tr>
							<td class="right-td"><span class="datumPoint-span"><spring:message code="basepoint.Y"></spring:message></span></td>
							<td>&nbsp;&nbsp;<input type="text"  id="updateBaseyy" class="datumPoint-input"></td>
						</tr>
						<tr>
							<td class="right-td"><span class="datumPoint-span"><spring:message code="basepoint.Z"></spring:message></span></td>
							<td>&nbsp;&nbsp;<input type="text" id="updateBasezz" class="datumPoint-input"></td>
						</tr>
						<tr>
							<td class="right-td"><span class="datumPoint-span"><spring:message code="basepoint.updateReason"></spring:message></span></td>
							<td>&nbsp;&nbsp;<textarea id="updateReason" class="datumPoint-text" maxlength = "160" placeholder='<spring:message code="placeholder.160size"></spring:message>'></textarea></td>
						</tr>
					</table>
				</div>
				<div class='managementBottom modelBottom'>
					<input type='button' value='<spring:message code="div.save"></spring:message>' class='save-btn'
						onclick="updateDatumPoint()" id="saveDatumBtn" /> <input type='button' value='<spring:message code="div.cancle"></spring:message>'
						class='cancel-btn' onclick="closeModel('updateDatumPoint')" />
				</div>
			</div>
		</div>
		<!-- 废除基准点系统提示 -->
		<div style="display:none" id="deleteDatumPoint" >
			<div class="managementPage">
				<div class="managementHead">
					<span class="head-font" style="float:left"><spring:message code="basepoint.sysHint"></spring:message></span> 
					<span class="closePage" style="cursor:pointer" onclick="closeModel('deleteDatumPoint')">X</span>
				</div>
				<div class="managementBody deletemodelBody align">
					<div class="align">
						<img alt="" src="static/images/alert.png">
						<span class="warning-span"><spring:message code="basepoint.sysHintCont01"></spring:message></span>
					</div>
					<div>
						<span class="warning-ps"><spring:message code="basepoint.sysHintCont02"></spring:message></span>
					</div>
				</div>
				<div class='managementBottom modelBottom'>
					<input type='button' value='<spring:message code="div.confirm"></spring:message>' class='save-btn' onclick="deleteDatumPoint()" />
					<input type='button' value='<spring:message code="div.cancle"></spring:message>' class='cancel-btn' onclick="closeModel('deleteDatumPoint')" />
				</div>
			</div>
		</div>
		<!-- 基准点修正记录 -->
		<div style="display:none" id="watchRecord">
			<div  class="managementPage">
				<div class="managementHead">
					<span class="head-font" style="float:left"><spring:message code="basepoint.upRecord"></spring:message></span> <span class="closePage" style="cursor:pointer" onclick="closeModel('watchRecord')">X</span>
				</div>
				<div class="managementBody watchmodelBody">
					<div>
						<span id="watchSpan"></span>
					</div>
					<div class="showRecord">
						<table id="showRecordTable" width=98%>
							<thead>
								<tr>
									<th><spring:message code="home.serialNumber"></spring:message></th>
									<th><spring:message code="basepoint.upPeople"></spring:message></th>
									<th><spring:message code="basepoint.Xup"></spring:message></th>
									<th><spring:message code="basepoint.Yup"></spring:message></th>
									<th><spring:message code="basepoint.Zup"></spring:message></th>
									<th><spring:message code="basepoint.upReason"></spring:message></th>
									<th><spring:message code="basepoint.upTime"></spring:message></th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
				</div>
				<div class='managementBottom watchmodelBottom'>
					<input type='button' value='<spring:message code="div.closed"></spring:message>' class='cancel-btn' onclick="closeModel('watchRecord')" />
				</div>
			</div>
		</div>
		<!--超限处置页(处置信息-变成处置中)  -->
		<div style="display:none" id="modalDiv">
			<div class="managementPage" style="z-index:2">
				<div class="managementHead">
					<span class='head-font'><spring:message code="pccx.div"></spring:message></span>
					<span class='closePage' onclick="hideModalDiv()">X</span>
				</div>
				<div class="managementBody">
					<div class='mb-warn-head'>
						<span id="pierLdName"></span>
						<span id="warnGkbm"></span>
						<span id="dealUserName"></span>
					</div>
					<p class='remarks-region'>
						<span class="font14"><spring:message code="pccx.disposeWay"></spring:message>：</span>
						<textarea id="dealPlan" placeholder='<spring:message code="placeholder.240size"></spring:message>'></textarea>
					</p>
					<p class='contact-region'>
						<span class="font14"><spring:message code="pccx.phone"></spring:message>：</span>&nbsp;&nbsp;&nbsp;
						<input type='text' placeholder='<spring:message code="placeholder.phone"></spring:message>' style="margin-left:3px" id="dealPhone">
						<span class='contact-time font14'><spring:message code="pccx.disposeTime"></spring:message>：</span>
						<input  disabled="disabled" id ="dealDate" type='text' placeholder=''>
					</p>
					<p class='remarks-region'>
						<span class="font14"><spring:message code="pccx.remarks"></spring:message>：</span>
						<textarea id="dealRemark" placeholder='<spring:message code="placeholder.240size"></spring:message>'></textarea>
					</p>
				</div>
				<div class="switchBtn" id='switchBtn'>	
				 <span class='closeChaoxian'>关闭超限：</span>	
				 <div class="switch-container">
				    <input id="switch" type="checkbox" class="switch" />
				    <span class="yes">是</span>
				    <span class="no">否</span>
				    <label id ="switchLab" for="switch"></label>
				</div>
				 <span id="tishi" class='tishi'>提示:暂不满足关闭条件，待下一粱段正常后请再来操作关闭。</span>
				</div>
				<p class='managementBottom warn-managementBottom'>
					<input type='button' value='<spring:message code="div.save"></spring:message>'class='save-btn save-btn-section' id="warnSaveBtn" onclick="saveWarnDeal()">
					<input type='button' value='<spring:message code="div.cancle"></spring:message>' class='cancel-btn cancel-btn-section' id="warnCancelBtn" onclick="hideModalDiv()">
				</p>
				<input type="hidden" id="dealGkbm" value="">
				<input type="hidden" id="pier" value="">
				<input type="hidden" name="flag" id="flag">
				<input type="hidden" id="ldCode" value="">
				<input type="hidden" id="dealldcode" value="">
				<input type="hidden" id="dealFlag" value="">
			</div>
		</div>
		<!-- 已关闭处置信息的处置记录 -->
		<div style="display:none" id="detailModalDiv">
			<div class="warnManagementPage">
				<div class="managementHead">
					<span class='warnDealHeadFont'><spring:message code="pccx.detailDiv"></spring:message></span>
					<span class='closePage' onclick="hideModalDivDetail()">X</span>
				</div>
				<div class="warnManagementBody">
					<div class="warnDealDetailHeadDiv">
						<span class='warnDealDetail-head' id="detailPierAndLdName"></span>
						<span class='warnDealDetail-head' id="warnGkbmDetail"></span>
						<input type="hidden" id="gkbm" name="gkbm">
						<input type="hidden" id="conbeamId" name="conbeamId">
						<input type="hidden" id="partId" name="partId">
					</div>
					<div class="tablebox warnDealDetailDiv">
						<table class="table table-bordered" id = "tblWranDetail">
							<thead>
								<tr>
									<td style="width:47px"><spring:message code="home.serialNumbe"></spring:message></td>
									<td style="width:61px"><spring:message code="pccx.disposePeople"></spring:message></td>
									<td style="width:110px"><spring:message code="pccx.phone"></spring:message></td>
									<td style="width:100px"><spring:message code="pccx.disposeWay"></spring:message></td>
									<td style="width:150px"><spring:message code="pccx.disposeTime"></spring:message></td>
									<td><spring:message code="pccx.remarks"></spring:message></td>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
						<br>
						<span id="dealPeople" style="margin-top: 10px;"></span>
					</div>
				</div>
				<div class="warnManagementFooter">
					<input type='button' value='关闭超限' class='warnDealCloseBtn' id="warnCloseBtn" onclick="warnClose()">
					<input type='button' value='<spring:message code="div.cancle"></spring:message>' class='warnDealCancelBtn' id="warnCancelBtn" onclick="hideModalDivDetail()">
				</div>
			</div>
		</div>
		<!-- 施工告示牌 -->
		<div id="sggsDiv" style="display:none">
			<div class="managementPage">
				<div class="managementHead">
					<span class='head-font'><spring:message code="sggsp.div"></spring:message></span>
					<span class='closePage' onclick="hideSggsDiv()">X</span>
				</div>
				<div class="managementBody">
					<p class='mb-head'>
						<span class="title-name"><spring:message code="sggsp.basic"></spring:message>：</span>
						<span class="title-content" id="title">某某项目-站前1标（x局）-xxx连续梁</span>
					</p>
					<p class='mb-content'>
<!-- 						<span class="sggs-title">所属工区&nbsp;&nbsp;</span><input type='text' id="industrial" disabled="disabled"> -->
						<span class="sggs-title"><spring:message code="sggsp.beamaspan"></spring:message>&nbsp;&nbsp;</span>
						<input type='text' id="beamaspan" style="width:395px" placeholder='<spring:message code="placeholder.50size"></spring:message>' maxlength = "50">
					</p>
					<p class='mb-content'>
						<span class="sggs-title"><spring:message code="sggsp.mainkdlength"></spring:message>&nbsp;&nbsp;</span>
						<input type='text' id="mainkdlength" placeholder='<spring:message code="placeholder.beamaspanMax"></spring:message>' maxlength = "50">
						<span class="sggs-title"><spring:message code="sggsp.centermile"></spring:message>&nbsp;&nbsp;</span>
						<input type='text' id="centermile" disabled="disabled">
					</p>
					<p class='mb-content'>
						<span class="sggs-title"><spring:message code="sggsp.sgStTime"></spring:message>&nbsp;&nbsp;</span>
						<input type='text' class="startdate" id="startdate" readonly="readonly" onclick ='startTime()'>
						<span class="sggs-title"><spring:message code="sggsp.sgEnTime"></spring:message>&nbsp;&nbsp;</span>
						<input type='text' class="enddate" id="enddate" readonly="readonly" onclick ='end()'>
					</p>
					<p class='mb-content'>
						<span class="sggs-title"><spring:message code="sggsp.sgMonitorUnit"></spring:message>&nbsp;&nbsp;</span>
						<input type='text' id="planjcunit"  placeholder='<spring:message code="placeholder.50size"></spring:message>'>
						<span class="sggs-title"><spring:message code="sggsp.designUnit"></spring:message>&nbsp;&nbsp;</span>
						<input type='text' id="designunit" placeholder='<spring:message code="placeholder.50size"></spring:message>'>
					</p>
				</div>
				<p class='managementBottom'>
					<input type='button' value='<spring:message code="div.save"></spring:message>' class='save-btn' id="sggsSaveBtn" onclick = "saveSggsInfo()">
					<input type='button' value='<spring:message code="div.cancle"></spring:message>' class='cancel-btn' id="sggsCancelBtn">
				</p>
			</div>
		</div>
		<!-- 偏差超限  连续梁超限测点处置页 -->
		<div style="display:none" id="piancha">
			<div class="managementPage">
				<div class="managementHead">
					<span class='head-font'><spring:message code="pccx.div"></spring:message></span>
					<span class='closePage' onclick="closepiancha()">X</span>
				</div>
				<div class="managementBody" id="pianchabody">
					<table class="table table-bordered table-responsive"
						id="tblchaoxian">
						<thead>
							<tr>
								<td><spring:message code="home.serialNumber"></spring:message></td>
								<td><spring:message code="pccx.tGou"></spring:message></td>
								<td><spring:message code="pccx.ld"></spring:message></td>
								<td><spring:message code="pccx.overrunMeasurePointN"></spring:message></td>
								<td><spring:message code="pccx.overrun"></spring:message>(mm)</td>
								<td><spring:message code="pccx.normalRangeDeviation"></spring:message></td>
								<td><spring:message code="pccx.overrunConstructionCondition"></spring:message></td>
								<td><spring:message code="pccx.overrunDate"></spring:message></td>
								<td><spring:message code="pccx.overrunType"></spring:message></td>
								<td><spring:message code="pccx.dealStatus"></spring:message></td>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<!--标段首页  某某连续梁超限梁段未处置详情   -->
		<div style="display:none" id="warnInfoListDiv">
			<div class="ldWarnInfoDiv">
				<div class="managementHead">
					<span class='managementHeadTitle' id='warnInfoTitleSpan'></span>
					<span class='closePage' onclick="hideLdWrnInfoDiv()">X</span>
				</div>
				<div class="ldWarnInfoContent">
					<div class="warnTblHeaderDiv">
						<table class="table-bordered table-conbeam">
							<tr>
								<th style="width: 42px"><spring:message code="home.serialNumber"></spring:message></th>
								<th style="width: 132px"><spring:message code="homesection.error.tGou"></spring:message></th>
								<th style="width: 165px"><spring:message code="homesection.error.ldNo"></spring:message></th>
								<th style="width: 98px"><spring:message code="homesection.overrun.typeCount"></spring:message></th>
								<th><spring:message code="homesection.overrun.type"></spring:message></th>
							</tr>
						</table>
					</div>
					<div class="warnTblContentDiv">
						<table class="table-bordered table-conbeam" id="lxlWarnInfoTbl">
						</table>
					</div>
				</div>
			</div>
		</div>
		<!-- 标段首页 异常数据 -->
		<div style="display:none" id="exceptionListDiv">
			<div class="ldExceptionInfoDiv">
				<div class="managementHead">
					<span class='managementHeadTitle' id='exceptionListSpan'></span>
					<span class='closePage' onclick="hideLdExceptionListDiv()">X</span>
				</div>
				<div class="ldWarnInfoContent">
					<div class="warnTblHeaderDiv">
						<table class="table-bordered table-conbeam">
							<tr>
								<th style="width: 42px"><spring:message code="home.serialNumber"></spring:message></th>
								<th style="width: 82px"><spring:message code="homesection.error.tGou"></spring:message></th>
								<th style="width: 98px"><spring:message code="homesection.error.ldNo"></spring:message></th>
								<th style="width: 260px"><spring:message code="homesection.error.errReason"></spring:message></th>
								<th><spring:message code="homesection.error.explain"></spring:message></th>
							</tr>
						</table>
					</div>
					<div class="warnTblContentDiv">
						<table class="table-bordered table-conbeam" id="exceptionListTbl">
						</table>
					</div>
					<div class="exceptionDataFooterDiv">
						<input type='button' value='<spring:message code="div.save"></spring:message>' class='save-btn save-btn-section' id="remarkSaveBtn" onclick="saveLdExceptionList()">
						<input type='button' value='<spring:message code="div.cancel"></spring:message>' class='cancel-btn cancel-btn-section' id="remarkCancelBtn" onclick="hideLdExceptionListDiv()">
					</div>
				</div>
			</div>
		</div>
		<div style="display:none" id="dbsxDivMore">
			<div class="ldExceptionInfoDiv">
				<div class="managementHead">
					<span class='managementHeadTitle'><spring:message code="homesection.concernMessage"></spring:message></span>
					<span class='closePage' onclick="hideDbsxDivMore()">X</span>
				</div>
				<div class="ldWarnInfoContent">
					<div class="warnTblHeaderDiv">
						<table class="table-bordered table-conbeam">
							<tr>
								<th style="width: 55px"><spring:message code="home.serialNumber"></spring:message></th>
								<th style="width: 478px"><spring:message code="homesection.concernMessage"></spring:message></th>
								<th><spring:message code="concernMessage.creatDate"></spring:message></th>
							</tr>
						</table>
					</div>
					<div class="dbsxTblContentDiv">
						<table class="table-bordered table-conbeam" id="dbsxTbl">
						</table>
					</div>
				</div>
			</div>
		</div>
		<!--梁段测点下的测点修正-->
		 <div id="cedian-Update" style="display:none">
			<div class="cdUpdatePage">
				<div class="managementHead">
						<span class="head-font">
							<spring:message code="ldcd.measurePointUp"></spring:message>
						</span> 
						<span class="closePage" style="cursor:pointer" onclick="closeModel('cedian-Update','')">X</span>
				</div>
					
				<div class='right-head-region'>
					<div id="mainContent">
							<div class="drawing" id="drawing" >
							 
							</div>
							<div class="cdconstruction-condition">
								<p class="cdconstruction">
									<span class='ld-window' >
										<spring:message code="ldcd.isGK"></spring:message>
									</span>
									<span>
										<select name="condition" id="condition">
											<option value="choice">--请选择--</option>
											<option value="before-hanging">挂篮前</option>
											<option value="before-pouring">浇筑前</option>
											<option value="after-pouring">浇筑后</option>
											<option value="tensioning">预应力张拉前</option>
											<option value="post-tensioning">预应力张拉后</option>
											<option value="afer-hanging">挂篮后</option>
										</select>
									</span>
								</p>
								<div class="cdmeasuring-point">
									<span class='ld-window ld-cedian' >
										<spring:message code="ldcd.selectMeaPoint"></spring:message>
									</span>
									 <p class="measuring">
										<input type="radio" name="point" id="radio1" class="measuringPoint radio1"><span class="measuring" checked='checked'><em>1</em></span>
										<input type="radio" name="point" id="radio2" class="measuringPoint radio2"><span class="measuring"><em>2</em></span>
										<input type="radio" name="point" id="radio3" class="measuringPoint radio3"><span class="measuring"><em>3</em></span>
										<input type="radio" name="point" id="radio4" class="measuringPoint radio4"><span class="measuring"><em>4</em></span>
										<input type="radio" name="point" id="radio5" class="measuringPoint radio5"><span class="measuring"><em>5</em></span>
									</p>
								</div>
								<div class="ldtheoretical">
								<span class='ld-window'>
									<spring:message code="ldcd.meaPointTheoryAltitude"></spring:message>&nbsp;&nbsp;
								</span>
									<p class="ldtheoretical-elevation">
										<input type="text" name="theory" id="theory" >
									</p>
								</div>
								<div class="cdelevation">&nbsp;&nbsp;
									<span class='ld-window'>
										<spring:message code="ldcd.meaPointX"></spring:message>&nbsp;&nbsp;
									</span> 
									<p class="elevationX">
										<input type="text" name="theoryX" id="theoryX" >
									</p>
								</div>
								
								<div class="cdelevation">&nbsp;&nbsp;
									<span class='ld-window'>
										<spring:message code="ldcd.meaPointY"></spring:message>&nbsp;&nbsp;
									</span> 
									<p class="elevationX">
										<input type="text" name="theoryY" id="theoryY" >
									</p>
								</div>
								
								<div class="cdElevation">&nbsp;&nbsp;&nbsp;&nbsp;
									<span class='ld-window' style="left: 83px;">
										<spring:message code="ldcd.upReason"></spring:message>&nbsp;
									</span>
									<p class="elevationX">
										<textarea rows="" cols="" name="theoryY" id="reason" maxlength = "240" placeholder='<spring:message code="placeholder.240size"></spring:message>'></textarea>
									</p>
								</div>
								<p class='cdmanagementBottom' id="cdUpdate">
									<input type='button' value='<spring:message code="div.save"></spring:message>' class='save-btn' id="cdSaveBtn" onclick="cdsave()">
									<input type='button' value='<spring:message code="div.cancle"></spring:message>' class='cancel-btn' id="cdCancelBtn" onclick="closeModel('cedian-Update','')">
								</p>
							</div>
						</div>
				</div>
			</div>
		</div>
		
		
		<!-- 梁段测点  测点修正记录-->
		<div  id="cedian-Record" style="display:none">
			<div  class="RecordPage">
				 <div class="managementHead">
					 <span class="head-font"><spring:message code="ldcd.measurePointUpRecord"></spring:message></span> 
					 <span class="closePage" style="cursor:pointer" onclick="closeModel('cedian-Record','')">X</span>
				 </div>
				 <div class="managementBody watchmodelBody">
					 <div>
						 <span id="recordTitleInfo">贵阳枢纽小白联络线/站前1标（4局）标/下穿贵都高速双线大桥/123#墩-1号梁段</span>
					 </div>
					 <div class="showRecord">
						 <table id="recordList" width=100%>
							 <thead>
								 <tr>
									 <th><spring:message code="home.serialNumber"></spring:message></th>
									 <th><spring:message code="ldcd.upPeople"></spring:message></th>
									 <th><spring:message code="ldcd.upRecord"></spring:message></th>
									 <th><spring:message code="ldcd.upType"></spring:message></th>
									 <th><spring:message code="ldcd.upTime"></spring:message></th>
								 </tr>
							 </thead>
							 <tbody>
							  
							 </tbody>
						 </table>
					 </div>
				 </div>
				 <div class='managementBottom watchmodelBottom'>
					 <input type='button' value='<spring:message code="div.closed"></spring:message>' class='cancel-btn' onclick="closeModel('cedian-Record','')" />
				 </div>
			</div>
		</div>
		
		
		<div  id="errorModel" style="display:none">
			<div class="managePage">
				<div class="managementHead">
					<span class="head-font">系统提示</span> 
					<span class="closePage" style="cursor:pointer" onclick="closeModel('errorModel')">X</span>
				</div>
				<div class="managementBody align errorBody">
					<p id="errormsg">该梁段中的测点数据不存在！</p>
				</div>
				<div class='managementBottom errorbottom'>
					<input type='button' value='<spring:message code="div.confirm"></spring:message>' class='cancel-btn' onclick="closeModel('errorModel')" />
				</div>
			</div>
		</div>
		
	</article>
	
	
	<script type="text/javascript" src="static/plugins/jQuery/jquery-2.1.4.js"></script>
	<script type="text/javascript" src="static/plugins/jQuery/jquery.min.js"></script>
	<script type="text/javascript" src="static/plugins/i18n/jquery.i18n.properties-1.0.9.js"></script>

	<script type="text/javascript" src="static/plugins/jQueryUI/jquery-ui-1.10.3.min.js"></script>
	<script type="text/javascript" src="static/plugins/datepicker/jQuery-jcDate.js"></script>
	<script type="text/javascript" src="static/plugins/jqmeter/jqmeter.js"></script>
	
	<!-- echarts2.0 -->
	<script src="static/plugins/echarts2.0/echarts.js" type="text/javascript"></script>
	<!-- bootstrap -->
	<script src="static/plugins/bootstrap/js/bootstrap.min.js"></script>
	<script src="static/js/common.js"></script>
	<script src="static/js/myi18n.js"></script>
	<script src="static/js/menuNav.js"></script>
	<script src="static/js/homeProjectEchart.js"></script>
	<script src="static/js/homeCRC.js"></script>
	<script src="static/js/home.js"></script>
	

</body>
<script type="text/javascript">
	username = '<%=username %>';
</script>
</html>