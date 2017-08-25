<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<script src="static/js/ldStation.js"></script>
<body>
	<div class="ldright-region" id="right-region" style="display:block">
		<div class="content-wrapper" id="content-wrapper" style="display:block">
			<div class="mainContent" id="mainContent">
				<section class="content-observer">
					<form id="form1" name="form1" action="" method="post">
						<div class="ld-tablehead">
							<div class="ld-head">
								<spring:message code="condition.tGouhao"></spring:message>:&nbsp;
								<select name="structure" id="structure"></select>
									<input type="button" value='<spring:message code="condition.search"></spring:message>' name="ld-btn" class="ld-cx" id="search">
							</div>
							<input type="button" value='<spring:message code="condition.export"></spring:message>'  name="ld-btn" id="ld-btn" style="display:none">
						</div>
						<div class="tablebox">
							<table class="table table-bordered" id="cedianInfo">
								<thead>
									<tr>

<!-- 										<td ><input type="checkbox" name="ld-box" id="ld-box"></td> -->
										<td><spring:message code="ldPoint.tGou"></spring:message></td>
										<td><spring:message code="ldPoint.ldNo"></spring:message></td>
										<td><spring:message code="ldPoint.heightOfSmallMileage"></spring:message>H(m)</td>
										<td><spring:message code="ldPoint.heightOfMileage"></spring:message>H(m)</td>
										<td><spring:message code="ldPoint.length"></spring:message>(m)</td>
										<td><spring:message code="ldPoint.beamSectionType"></spring:message></td>
										<td><spring:message code="ldPoint.detailsOfMeasurementPoints"></spring:message></td>
									</tr>
								</thead>
								<tbody>
									<tr>
<!-- 										<td><input type="checkbox" name="ld-box" class="ld-box"></td> -->
										<td rowspan="7" class="stru-T" style="vertical-align:middle;"></td>	
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td id="chakan"><a href=""></a> </td>
									</tr>
								</tbody>
							</table>
						</div>
					</form>
				</section>
			</div>
		</div>
	</div>
	
	
	<div class="cedian-content" id="cedian-content" style="display:none">
		<div class='cedian-head'>
			<h5><span style="font-size:16px;" id="cedianTitleInfo"></span>&nbsp;&nbsp;&nbsp;&nbsp;</h5>
			<h5><spring:message code="ldPoint.surveyList"></spring:message>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h5>
			<span style="font-size:16px;" id="mileInfo"></span>
			<div class="ldmileage" id="ldmileage" style="display:inline-block;font-size:14px;"><spring:message code="ldPoint.mileageDirection"></spring:message>
				<input type='radio' style="font-size:14px;" name='mileage' id="small-mileage" class='small-mileage' onchange="mileageChange(0)" checked='checked'><span id="smalltext"></span>
				<input type='radio' style="font-size:14px;" name='mileage' id="big-mileage" class='big-mileage' onchange="mileageChange(1)"><span id="largetext"></span>
			</div>
			<div class='ldStation'>
			<a id="cdUpdate"  href="javascript:"><spring:message code="ldPoint.measurePointUp"></spring:message>&nbsp;&nbsp;&nbsp;</a>
			<a id="cdRecord"  href="javascript:"><spring:message code="ldPoint.upRecord"></spring:message>&nbsp;&nbsp;&nbsp;</a>
			<input type="button" value='<spring:message code="condition.export"></spring:message>' name="ld-btn" id="ld-btn" style="display:none">
			</div>
		</div>
	 
		<div class="test-table tab_le">
			<table id="celiangzhuang" class="table table-bordered table-responsive test">
				<thead>
					<tr>
						<th rowspan="2" class="test-number gkTestTable"><spring:message code="ldPoint.measuringPointNumber"></spring:message></th>
						<th rowspan="2" class="test-style gkTestStyle"><spring:message code="ldPoint.measurePointType"></spring:message></th>
						<th colspan="3"><spring:message code="ldPoint.beforePouring"></spring:message></th>
						<th colspan="3"><spring:message code="ldPoint.afterPouring"></spring:message></th>
						<th colspan="3"><spring:message code="ldPoint.preTensioned"></spring:message></th>
						<th colspan="3"><spring:message code="ldPoint.afterTensioning"></spring:message></th>
						<th colspan="3"><spring:message code="ldPoint.beforeHangingBasket"></spring:message></th>
					</tr>
					<tr>
						<th class='lilun_gaocheng'><spring:message code="lxl.theoryAltitude"></spring:message></th>
						<th class='li_lunX'><spring:message code="ldPoint.coordinate"></spring:message>X</th>
						<th class='li_lunX'><spring:message code="ldPoint.coordinate"></spring:message>Y</th>
						<th class='lilun_gaocheng'><spring:message code="lxl.theoryAltitude"></spring:message></th>
						<th class='li_lunX'><spring:message code="ldPoint.coordinate"></spring:message>X</th>
						<th class='li_lunX'><spring:message code="ldPoint.coordinate"></spring:message>Y</th>
						<th class='lilun_gaocheng'><spring:message code="lxl.theoryAltitude"></spring:message></th>
						<th class='li_lunX'><spring:message code="ldPoint.coordinate"></spring:message>X</th>
						<th class='li_lunX'><spring:message code="ldPoint.coordinate"></spring:message>Y</th>
						<th class='lilun_gaocheng'><spring:message code="lxl.theoryAltitude"></spring:message></th>
						<th class='li_lunX'><spring:message code="ldPoint.coordinate"></spring:message>X</th>
						<th class='li_lunX'><spring:message code="ldPoint.coordinate"></spring:message>Y</th>
						<th class='lilun_gaocheng'><spring:message code="lxl.theoryAltitude"></spring:message></th>
						<th class='li_lunX'><spring:message code="ldPoint.coordinate"></spring:message>X</th>
						<th class='li_lunX'><spring:message code="ldPoint.coordinate"></spring:message>Y</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td ><span class="measuring"><em>1</em></span></td>
						<td class="measuring-pile"><spring:message code="ldPoint.measuringStake"></spring:message></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
					</tr>
					<tr>
						<td ><span class="measuring"><em>2</em></span></td>
						<td class="measuring-pile"><spring:message code="ldPoint.measuringStake"></spring:message></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
					</tr>
					<tr class="warning">
						<td ><span class="measuring"><em>3</em></span></td>
						<td class="measuring-pile"><spring:message code="ldPoint.measuringStake"></spring:message></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
					</tr>
					<tr>
						<td ><span class="measuring"><em>4</em></span></td>
						<td class="measuring-pile"><spring:message code="ldPoint.measuringStake"></spring:message></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
					</tr>
					<tr>
						<td ><span class="measuring"><em>5</em></span></td>
						<td class="measuring-pile"><spring:message code="ldPoint.measuringStake"></spring:message></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color"></td>
						<td></td>
					</tr>
				 </tbody>
			</table>
		</div>
	 
		<div  class = 'cedian-middleLine'>
			<p class='comment'><spring:message code="ldPoint.notes"></spring:message>：<spring:message code="ldPoint.measuringPointNumber"></spring:message><span class="measuring"><em>3</em></span><spring:message code="ldPoint.medianLine"></spring:message></p>
		</div>
		 
		 <div class="test-table">
			 <table id="linshicedian" class="table table-bordered table-responsive test">
				 <thead>
					<tr>
						<th rowspan="2" class="point-type"><spring:message code="ldPoint.measurePointType"></spring:message></th>
						<th rowspan="2" class="point-type"><spring:message code="measure.constructionCondition"></spring:message></th>
						<th rowspan="2" class="point-type"><spring:message code="ldPoint.theoreticalValue"></spring:message></th>
						<th colspan="6"><spring:message code="ldPoint.pointCoding"></spring:message></th>
					</tr>
					<tr >
						<th><span class="draw-circle">1</span></th>
						<th><span class="draw-circle">2</span></th>
						<th><span class="draw-circle">3</span></th>
						<th><span class="draw-circle">4</span></th>
						<th><span class="draw-circle">5</span></th>
						<th><span class="draw-circle">6</span></th>
					</tr>
				 </thead>
				 <tbody>
					<tr>
						<td rowspan="3" class="elevation-point" style="vertical-align:middle;"><spring:message code="ldPoint.dieMarkHigh"></spring:message></td>
						<td rowspan="3" class="elevation-point" style="vertical-align:middle;"><spring:message code="ldPoint.afterHangingBasket"></spring:message></td>
						<td class="altitude"><spring:message code="ldPoint.altitude"></spring:message></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td class="altitude">X<spring:message code="ldPoint.nalue"></spring:message></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td class="altitude">Y<spring:message code="ldPoint.nalue"></spring:message></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
				 </tbody>
			 </table>
		 </div>
		 <div class='cedian BottomButton'>
		 <input type='button' value='<spring:message code="ldPoint.closes"></spring:message>' class='cancelbtn' onclick="closeModel('cedian-content','content-wrapper')"/>
		 </div>
	</div>
	
</body>
