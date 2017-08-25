<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
	<div class="right-region ">
		   <div class='right-head-region'>
		  		<div id="mainContentPage">
				<div class="structure-number">
					<spring:message code="condition.tGouhao"></spring:message>:
					
					<select name="structure" id="structure" onchange = "structureChange()">
					</select>
				
				</div>
				<div class="beam-section">
					<spring:message code="condition.ldhao"></spring:message>:
					<select name="beam" id="beam" onchange="beamChange()">
					</select>
					<div class="mileage" id="mileage">
						<input type='radio' name='mileage' id="small-mileage" class='small-mileage' onchange='mileageChange(0)' checked='checked' value="0"><span><spring:message code="lxl.smallMileage"></spring:message></span>
						<input type='radio' name='mileage' id="big-mileage" class='big-mileage' onchange='mileageChange(1)' value="1"><span><spring:message code="lxl.largeMileage"></spring:message></span>
					</div>
					<span class='T-chaxun'>
						<input type = 'button' class = 'T-chaxun-btn' id='search' value = '<spring:message code="condition.search"></spring:message>'>
					</span>
				</div>
			   
				<div  id="drawing-area">
				<div class=" drawing-pic" >
					<canvas id="canvas">
						
					</canvas>
					<span></span>
				</div>
				<div class=" construction-condition">
					<p class="construction">
						<spring:message code="lxl.constructionCondition"></spring:message>
						<span>
					<select name="condition" id="condition">
					</select>
				</span>
					</p>
					<div class="measuring-point">
						<spring:message code="ldcd.selectMeaPoint"></spring:message>
						<p class="measuring select-measuring">
						<input type="radio" name="point" id="radio1" class="measuringPoint radio1"  value="1"><span class="measuring" ><em>1</em></span><span class="radio1" style="display:none"></span>
						<input type="radio" name="point" id="radio2" class="measuringPoint radio2" value="2"><span class="measuring"><em>2</em></span>&nbsp;<span class="radio2" style="display:none"></span>
						<input type="radio" name="point" id="radio3" class="measuringPoint radio3" value="3"><span class="measuring"><em>3</em></span>&nbsp;<span class="radio3" style="display:none"></span>
						<input type="radio" name="point" id="radio4" class="measuringPoint radio4" value="4"><span class="measuring"><em>4</em></span>&nbsp;<span class="radio4" style="display:none"></span>
						<input type="radio" name="point" id="radio5" class="measuringPoint radio5" value="5"><span class="measuring"><em>5</em></span><span class="radio5" style="display:none"></span>
						</p>
						<p class="circle-point">
							<input type="radio" name="point" id="radio6" class="measuringPoint radio6"  value="1"><span><e>1</e></span><span class="radio6" style="display:none"></span>
							<input type="radio" name="point" id="radio7" class="measuringPoint radio7" value="2"><span><e>2</e></span><span class="radio7" style="display:none"></span>
							<input type="radio" name="point" id="radio8" class="measuringPoint radio8" value="3"><span><e>3</e></span><span class="radio8" style="display:none"></span>
							<input type="radio" name="point" id="radio9" class="measuringPoint radio9" value="4"><span><e>4</e></span><span class="radio9" style="display:none"></span>
							<input type="radio" name="point" id="radio10" class="measuringPoint radio10" value="5"><span><e>5</e></span><span class="radio10" style="display:none"></span>
							<input type="radio" name="point" id="radio11" class="measuringPoint radio11" value="6"><span><e>6</e></span><span class="radio11" style="display:none"></span>
						</p>
					</div>
					<div class="theoretical">
						<spring:message code="measure.theoryAltitude"></spring:message> <p class="theoretical-elevation">
						<input type="text" class="theory" name="theory" id="theory" placeholder="m">
					</p>
					</div>
					<div class="elevation">
						<spring:message code="measure.theoryCoordinate"></spring:message> <p class="elevationX">
						<input type="text" class="theoryX" name="theoryX" id="theoryX" placeholder="X">
						 <input type="text" class="theoryY" name="theoryY" id="theoryY" placeholder="Y">
					</p>
					</div>
					<p class="add-list">
						<input type="button" name="list" class="list" value='<spring:message code="ldPoint.addToList"></spring:message>' onclick="setTheoreticalValue()">
					</p>
				</div>

			</div>
			<div class="test-table tab_le">
				<table id="celiangzhuang" class="table table-bordered table-responsive">
					<thead>
					<tr>
						<td rowspan="2" class="test-number gkTestTable" ><spring:message code="ldPoint.measuringPointNumber"></spring:message></td>
						<td rowspan="2" class="test-style gkTestStyle"><spring:message code="ldPoint.measurePointType"></spring:message></td>
						<td colspan="3" class='b-pouring'><spring:message code="ldPoint.beforePouring"></spring:message></td>
						<td colspan="3" class='a-pouring'><spring:message code="ldPoint.afterPouring"></spring:message></td>
						<td colspan="3" class='pre-stress'><spring:message code="ldPoint.preTensioned"></spring:message></td>
						<td colspan="3" class='a-stress'><spring:message code="ldPoint.afterTensioning"></spring:message></td>
						<td colspan="3" class='b-hanging'><spring:message code="ldPoint.beforeHangingBasket"></spring:message></td>
					</tr>
					<tr>
						<td class="lilun_gaocheng"><spring:message code="lxl.theoryAltitude"></spring:message></td>
						<td class="li_lunX"><spring:message code="ldPoint.theory"></spring:message>X</td>
						<td class="li_lunY"><spring:message code="ldPoint.theory"></spring:message>Y</td>
						<td class="lilun_gaocheng"><spring:message code="lxl.theoryAltitude"></spring:message></td>
						<td class="li_lunX"><spring:message code="ldPoint.theory"></spring:message>X</td>
						<td class="li_lunY"><spring:message code="ldPoint.theory"></spring:message>Y</td>
						<td class="lilun_gaocheng"><spring:message code="lxl.theoryAltitude"></spring:message></td>
						<td class="li_lunX"><spring:message code="ldPoint.theory"></spring:message>X</td>
						<td class="li_lunY"><spring:message code="ldPoint.theory"></spring:message>Y</td>
						<td class="lilun_gaocheng"><spring:message code="lxl.theoryAltitude"></spring:message></td>
						<td class="li_lunX"><spring:message code="ldPoint.theory"></spring:message>X</td>
						<td class="li_lunY"><spring:message code="ldPoint.theory"></spring:message>Y</td>
						<td class="lilun_gaocheng"><spring:message code="lxl.theoryAltitude"></spring:message></td>
						<td class="li_lunX"><spring:message code="ldPoint.theory"></spring:message>X</td>
						<td class="li_lunY"><spring:message code="ldPoint.theory"></spring:message>Y</td>
					</tr>
					</thead>
					<tbody>
					<tr>
						<td style="background:#fff;"><span class="measuring" ><em>1</em></span></td>
						<td class="measuring-pile" style="background:#fff;"><spring:message code="ldPoint.measuringStake"></spring:message></td>
						<td style="background:#fff;"></td>
						<td class="theory-color" ></td>
						<td></td>
						<td class="theory-color" style="background:#fff;"></td>
						<td></td>
						<td class="theory-color"></td>
						<td style="background:#fff;"> </td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color" style="background:#fff;"></td>
						<td></td>
						<td class="theory-color"></td>
						<td style="background:#fff;"></td>
						<td class="theory-color"></td>
						<td></td>
					</tr>
					<tr>
						<td style="background:#fff;"><span class="measuring"><em>2</em></span></td>
						<td class="measuring-pile" style="background:#fff;"><spring:message code="ldPoint.measuringStake"></spring:message></td>
						<td style="background:#fff;"></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color" style="background:#fff;"></td>
						<td></td>
						<td class="theory-color"></td>
						<td style="background:#fff;"></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color" style="background:#fff;"></td>
						<td></td>
						<td class="theory-color"></td>
						<td style="background:#fff;"></td>
						<td class="theory-color"></td>
						<td></td>
					</tr>
					<tr class="warning">
						<td style='background:#FFFFCC'><span class="measuring"><em>3</em></span></td>
						<td style='background:#FFFFCC' class="measuring-pile"><spring:message code="ldPoint.measuringStake"></spring:message></td>
						<td style='background:#FFFFCC'></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color" style='background:#FFFFCC'></td>
						<td></td>
						<td class="theory-color"></td>
						<td style='background:#FFFFCC'></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color" style='background:#FFFFCC'></td>
						<td></td>
						<td class="theory-color"></td>
						<td style='background:#FFFFCC'></td>
						<td class="theory-color"></td>
						<td></td>
					</tr>
					<tr>
						<td style="background:#fff;"><span class="measuring"><em>4</em></span></td>
						<td class="measuring-pile" style="background:#fff;"><spring:message code="ldPoint.measuringStake"></spring:message></td>
						<td style="background:#fff;"></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color" style="background:#fff;"></td>
						<td></td>
						<td class="theory-color"></td>
						<td style="background:#fff;"></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color" style="background:#fff;"></td>
						<td></td>
						<td class="theory-color"></td>
						<td style="background:#fff;"></td>
						<td class="theory-color"></td>
						<td></td>
					</tr>
					<tr>
						<td style="background:#fff;"><span class="measuring"><em>5</em></span></td>
						<td class="measuring-pile" style="background:#fff;"><spring:message code="ldPoint.measuringStake"></spring:message></td>
						<td style="background:#fff;"></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color" style="background:#fff;"></td>
						<td></td>
						<td class="theory-color"></td>
						<td style="background:#fff;"></td>
						<td class="theory-color"></td>
						<td></td>
						<td class="theory-color" style="background:#fff;"></td>
						<td></td>
						<td class="theory-color"></td>
						<td style="background:#fff;"></td>
						<td class="theory-color"></td>
						<td></td>
					</tr>
					</tbody>
				</table>
			</div>
				
			<div class="test-table">
				<table id="linshicedian" class="table table-bordered table-responsive test">
					<thead>
					<tr>
						<td rowspan="2" class="point-type"><spring:message code="ldPoint.measurePointType"></spring:message></td>
						<td rowspan="2" class="point-type"><spring:message code="measure.constructionCondition"></spring:message></td>
						<td rowspan="2" class="point-type"><spring:message code="ldPoint.theoreticalValue"></spring:message></td>
						<td colspan="6"><spring:message code="ldPoint.pointCoding"></spring:message></td>
					</tr>
					<tr >
						<td><span class="draw-circle">1</span></td>
						<td><span class="draw-circle">2</span></td>
						<td><span class="draw-circle">3</span></td>
						<td><span class="draw-circle">4</span></td>
						<td><span class="draw-circle">5</span></td>
						<td><span class="draw-circle">6</span></td>
					</tr>
					</thead>
					<tbody>
					<tr>
						<td rowspan="3" class="elevation-point" style="vertical-align:middle;"><spring:message code="ldPoint.dieMarkHigh"></spring:message></td>
						<td rowspan="3" class="elevation-point" style="vertical-align:middle;"><spring:message code="ldPoint.afterHangingBasket"></spring:message></td>
						<td class="altitude" ><spring:message code="ldPoint.altitude"></spring:message></td>
						<td ></td>
						<td style='background:#F2F2F2;'></td>
						<td ></td>
						<td ></td>
						<td style='background:#F2F2F2;'></td>
						<td ></td>
					</tr>
					<tr>
						<td class="altitude" >X<spring:message code="ldPoint.nalue"></spring:message></td>
						<td ></td>
						<td style='background:#F2F2F2;'></td>
						<td ></td>
						<td></td>
						<td style='background:#F2F2F2;'></td>
						<td ></td>
					</tr>
					<tr>
						<td class="altitude" >Y<spring:message code="ldPoint.nalue"></spring:message></td>
						<td ></td>
						<td style='background:#F2F2F2;'></td>
						<td ></td>
						<td ></td>
						<td style='background:#F2F2F2;'></td>
						<td ></td>
					</tr>
					</tbody>
				</table>
			</div>
			</div>
			</div>
	 </div>
<script src="static/js/theoretical.js"></script>
