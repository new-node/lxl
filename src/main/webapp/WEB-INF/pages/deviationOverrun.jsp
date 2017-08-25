<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<script src="static/js/deviationOverrun.js"></script>
<div class="right-region">
	<div class="content-wrapper" id="deviationOverRun">
		<section class="content-observer">
			<div class="tablehead">
				<div class="head-left">
					<spring:message code="condition.overrunDate"></spring:message>&nbsp;
					<input type="text" name="dater-star" id="dater-star" class='dater-star' placeholder ='<spring:message code="placeholder.date"></spring:message>' onclick='startTime()' readonly="readonly">&nbsp;
					<spring:message code="condition.zhi"></spring:message>&nbsp;
					<input type="text" name="dater-end" id="dater-end" placeholder ='<spring:message code="placeholder.date"></spring:message>' onclick='end()' readonly="readonly">
				</div>
				<div class="head-right">
					<spring:message code="condition.tGouhao"></spring:message>:&nbsp; 
					<select id='pierSelect' class="Number">
						<option value=""><spring:message code="lxl.all"></spring:message></option>
					</select>&nbsp;&nbsp; 
					<spring:message code="condition.ldhao"></spring:message>:&nbsp; 
					<select id='ldSelect' class="segment">
						<option value=""><spring:message code="lxl.all"></spring:message></option>
					</select>&nbsp;&nbsp; 
					<spring:message code="condition.constructionCondition"></spring:message>:&nbsp; 
					<select id="sggkSelect" class="cons-segment">
						<option value=""><spring:message code="lxl.all"></spring:message></option>
					</select>&nbsp;&nbsp;
					<input type="button" value='<spring:message code="condition.search"></spring:message>' class="query-btn" id="searchBtn">
					<input type="button" value="同步" class="query-btn" id="synsBtn">
				</div>
			</div>
			<div class="tablebox">
				<div class="deviation-region tabDisplay">
					<ul>
						<li><a id= "notDeal"  class='close-deviation-list' onclick = "toggleDealFlg(0)"><spring:message code="pccx.overrunDiv"></spring:message></a></li>
						<li><a id= "deal" class="deviation-list" onclick = "toggleDealFlg(1)"><spring:message code="pccx.orerrinClosedDiv"></spring:message></a></li>
					</ul>
					<div class="region-list deviationOverrun-region" >
						<div class="over-list">
							<table class="table table-bordered" id = "tbl_Deal">
								<thead>
									<tr>
										<td><spring:message code="home.serialNumber"></spring:message></td>
										<td><spring:message code="pccx.tGou"></spring:message></td>
										<td><spring:message code="pccx.ld"></spring:message></td>
										<td><spring:message code="pccx.overrunMeasurePointNo"></spring:message></td>
										<td><spring:message code="pccx.overrun"></spring:message>(mm)</td>
										<td><spring:message code="pccx.normalRangeDeviation"></spring:message></td>
										<td><spring:message code="pccx.overrunConstructionCondition"></spring:message></td>
										<td><spring:message code="pccx.overrunDate"></spring:message></td>
										<td><spring:message code="pccx.overrunType"></spring:message></td>
										<td id="dealStatusName"><spring:message code="pccx.dealStatus"></spring:message></td>
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
		</section>
	</div>
	
</div>

