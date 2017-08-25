<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<div class="content-wrapper section-content-wrapper">
	<script src="static/js/homeSection.js"></script>
	<div class="content-wrapper-top">
		<div id='sectionHomeTop'>
			<div class="dbsx-title-left">
				<spring:message code="homesection.concernMessage"></spring:message>
			</div>
			<a class="dbsx-title-right" onclick="showMoreDbsx()"><spring:message code="homesection.more"></spring:message>&gt;&gt;</a>
			<p class=sectionHead-bottom></p>
			<div id="dbsxDiv">
				<img alt="<spring:message code='homesection.noConcernMessage'></spring:message>" src="static/images/congratulation .png">
			</div>
		</div>
		<div id='sectionHomeTop-second'>
			<h5><spring:message code="homesection.dealLdProgress"></spring:message></h5>
			<p class=sectionHead-bottom></p>
			<div id='sectionHomeTop-main'></div>
		</div>
		<div id='sectionHomeTop-third'>
			<h5><spring:message code="homesection.impBridgeData"></spring:message></h5>
			<p class=sectionHead-bottom></p>
			<div id="newLxlData">
				<ul>
				</ul>
			</div>
		</div>
	
	</div>
	<div class="content-wrapper-bottom">
		<div class="conBeam-info-title"><spring:message code="homesection.bridgeMessage"></spring:message></div>
		<div class="table-box-warnInfo">
			<table class="table-bordered table-conbeam" id="sectionInfoTbl">
				<thead>
					<tr>
						<td rowspan="2" style="width:44px"><spring:message code="home.serialNumber"></spring:message></td>
						<td rowspan="2"><spring:message code="homesection.bridge"></spring:message></td>
						<td colspan="3" style="width:222px"><spring:message code="home.OverrunLD"></spring:message></td>
						<td rowspan="2"><spring:message code="homesection.nowWorkCondition"></spring:message></td>
						<td rowspan="2" style="width:80px">
							<spring:message code="homesection.measured"></spring:message><br>
							<spring:message code="homesection.MeasurePointCount"></spring:message>
						</td>
						<td rowspan="2" style="width:80px">
							<spring:message code="homesection.measured"></spring:message><br>
							<spring:message code="homesection.basePointCount"></spring:message>
						</td>
						<td rowspan="2" style="width:80px">
							<spring:message code="homesection.measured"></spring:message><br>
							<spring:message code="homesection.ldCount"></spring:message>
						</td>
						<td rowspan="2" style="width:100px">
							<spring:message code="homesection.impstatus"></spring:message>
						</td>
						<!-- <td rowspan="2" style="width:110px" title="当前超限梁段数">当前超限梁段数</td> -->
					</tr>
					<tr>
						<td style="width:110px"><spring:message code="homesection.nowOverrunLDCount"></spring:message></td>
						<td style="width:56px"><spring:message code="home.nodeal"></spring:message></td>
						<td style="width:56px"><spring:message code="home.indeal"></spring:message></td>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
	</div>
</div>


