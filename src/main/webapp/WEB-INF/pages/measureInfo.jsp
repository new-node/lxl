<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<script src="static/js/measureInfo.js"></script>

<body>
	<div class="right-region ">
		<div class="content-wrapper">
			<div id="mainContent">
				<div class="content-observer">
					<div class="M-tablehead measureHeaderDiv">
						<spring:message code="condition.tGouhao"></spring:message>:&nbsp; <select name="categoryItem" class="categoryItem" id="pierSelect">
						</select>&nbsp;&nbsp;&nbsp; <spring:message code="condition.constructionBeamSection"></spring:message>:&nbsp; <select class="categoryItem" id="ldSelect">
						</select>&nbsp;&nbsp;&nbsp; <spring:message code="condition.constructionCondition"></spring:message>:&nbsp; <select class="categoryItem" id="sggkSelect">
						</select>
						<input type="button" class="measureSearchBtn" id="searchBtn" value='<spring:message code="condition.search"></spring:message>'>
					</div>
					<div class="m-search">
						<span id='clyM' class="measure-span"></span>
						<span id='mtimeM' class="measure-span"></span>
						<span id='weatherM' class="measure-span"></span>
						<span id='temperatureM' class="measure-span"></span>
						<span id='barometricM' class="measure-span"></span>
					</div>
					<div class="tablebox">
						<table class="table table-bordered" id="measureInfoTbl">
							<thead>
								<tr>
									<td style='display:none'><input type="checkbox" class="m-box" id="chkAll" onclick="checkAll()"></td>
									<td><spring:message code="measure.serialNumber"></spring:message></td>
									<td><spring:message code="measure.tGou"></spring:message></td>
									<td><spring:message code="measure.ld"></spring:message></td>
									<td><spring:message code="measure.measurePoint"></spring:message></td>
									<td><spring:message code="measure.constructionCondition"></spring:message></td>
									<td><spring:message code="measure.measurePointType"></spring:message></td>
									<td><spring:message code="measure.measureTime"></spring:message></td>
									<td><spring:message code="measure.theoryAltitude"></spring:message>(m)</td>
									<td><spring:message code="measure.realityAltitude"></spring:message>(m)</td>
									<td><spring:message code="measure.altitudeDeviation"></spring:message>(mm)</td>
									<td><spring:message code="measure.theoryCoordinate"></spring:message></td>
									<td><spring:message code="measure.realityCoordinate"></spring:message></td>
									<td>Δl<spring:message code="measure.deviationValue"></spring:message>(mm)</td>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
						
					</div>
					<div class="tableinfo" id="tableinfo">
					</div>
				</div>
			</div>
		</div>
	</div>

</body>
