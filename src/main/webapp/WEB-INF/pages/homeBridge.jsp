<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
	<div >
		<div class="head">
			<a class="headshow headshow-first"><spring:message code="homebridge.totalLdCount"></spring:message>:&nbsp;<span id="ldzcount" style="font-size:15px;"></span></a>
			 <a class="headshow"><spring:message code="homebridge.totalMeasurePointCount"></spring:message>:&nbsp;<span id="cdzcount" style="font-size:15px;"></span></a>
			<a class="headshow"><spring:message code="homebridge.overrunMeasurePointCount"></spring:message>:&nbsp;<span class="head-num" id="warncount"></span></a>
			<a><span class="sggspai" id="sggspai"><spring:message code="homebridge.constructionBillboard"></spring:message></span></a>
		</div>
		<div id="tuliDiv">
			<ul id="tuliImg">
				<li><div class="sgover"></div>&nbsp;<span><spring:message code="homebridge.finish"></spring:message></span>&nbsp;&nbsp;&nbsp;&nbsp;</li><!-- 测完 -->
				<li><div class="sglost"></div>&nbsp;<span><spring:message code="homebridge.underTest"></spring:message></span>&nbsp;&nbsp;&nbsp;&nbsp;</li><!-- 欠测 -->
				<li><div class="sging"></div>&nbsp;<span><spring:message code="homebridge.inTest"></spring:message></span>&nbsp;&nbsp;&nbsp;&nbsp;</li><!-- 在侧 -->
				<li><div class="weisg"></div>&nbsp;<span><spring:message code="homebridge.notMeasured"></spring:message></span>&nbsp;&nbsp;&nbsp;&nbsp;</li><!-- 未测 -->
				<li><div class="warn"></div>&nbsp;<span><spring:message code="homebridge.overrun"></spring:message></span></li><!-- 超限 -->
			</ul>
			<ul class="addReduce" id="zoombtn">
				<li><button class="huaiyuan" onclick="huanyuan()"><spring:message code="homebridge.reset"></spring:message></button></li>
				<li><button class="add" onclick="fangda()">+</button></li>
				<li><button class="reduce" onclick="suoxiao()">-</button></li>
			</ul>
		</div>
		<div id="bridgediv" style="border: 1px solid black">
			<div id = "canvasDiv"> 
				<canvas id="lxlbridge" width="1050px" height="210px"  style='width:100%;height:100%'></canvas>
			</div>
		</div>
		
		<div class="bridge-content" id="bridgecontent">
			<ul>
				<li class="bridge-hover"><a href="javascript:"><spring:message code="homebridge.altitudeDeviation"></spring:message></a></li>
				<li><a href="javascript:"><spring:message code="homebridge.lineDeviation"></spring:message></a></li>
				<li><a href="javascript:"><spring:message code="homebridge.VerticalMoldDeviation"></spring:message></a></li>
				<li><a href="javascript:"><spring:message code="homebridge.wrongTable"></spring:message></a></li>
				<li><a href="javascript:"><spring:message code="homebridge.deviationOverrun"></spring:message></a></li>
			</ul>
			<div class="bridge-echart">
				<div class="altitude">
					<div id="hightDeviation"></div>
				</div>
				<div class="centerLine">
					
					<div id='middleLineDeviation'></div> 
				</div>
				<div class="verticalMold">
					<div id='elevationDeviation'></div> 
				</div>
				<div class="ld">
					<div id='ldCuoTai'></div>
				</div>
				<!-- 全桥偏差超限子页面 -->
				<div class="deviation-region">
					<div class="brige-table" >
						<table class="table table-bordered table-responsive"
							id="tblWarnInfo">
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
									<td><spring:message code="pccx.dealStatus"></spring:message></td>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
					<div class="tableinfo" id="tableinfo"></div>
				</div>
			</div>
		</div>
		<!-- 点击 连续梁梁段后选择相应的工况后显示 -->
		<div class = "bridge-content" id="cediancontent">
			<div>
					<span><spring:message code="lxl.constructionCondition"></spring:message>：</span>
					<select name="condition" id="condition" onchange="shigongchange()">
						<option value="" ><spring:message code="lxl.all"></spring:message></option>
					</select>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					 <span class="shikuang"><spring:message code="lxl.weather"></spring:message>：</span>
					 <span class="shikuang" id="tianqi">调取当地气象信息</span>
					 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					 <span class="shikuang"><spring:message code="lxl.Temp"></spring:message>：</span>
					 <span class="shikuang" id="wendu"></span>
					 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					 <span class="shikuang"><spring:message code="lxl.BP"></spring:message>：</span>
					 <span class="shikuang" id="qiya"></span>
					 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					 <span class="tipText"><spring:message code="lxl.TBT"></spring:message>：</span>
					 <span class="tipText" id="tipinfo"></span>
			</div>
			<div class="hrdiv"></div>
			<div>
				<table id="cediantable" class="table table-bordered table-responsive">
					<thead>
						<tr>
							<th><spring:message code="home.serialNumber"></spring:message></th>
							<th><spring:message code="lxl.measurePoint"></spring:message></th>
							<th><spring:message code="lxl.constructionCondition"></spring:message></th>
							<th><spring:message code="lxl.measurePointType"></spring:message></th>
							<th><spring:message code="lxl.measureTime"></spring:message></th>
							<th><spring:message code="lxl.theoryAltitude"></spring:message>(m)</th>
							<th><spring:message code="lxl.realityAltitude"></spring:message>(m)</th>
							<th><spring:message code="lxl.altitudeDeviation"></spring:message>(mm)</th>
							<th><spring:message code="lxl.theoryCoordinate"></spring:message></th>
							<th><spring:message code="lxl.realityCoordinate"></spring:message></th>
							<th>Δl<spring:message code="lxl.deviationValue"></spring:message>(mm)</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		</div>
	</div>	
<div style="display:none">
	<img id="warnimg" src="static/images/warn.png"/>
</div>
		<div  style="display:none" id="ldinfo">
			<div class="managementPage ">
				<div class="managementBody">
					<div>
						<span><spring:message code="lxl.selectedLd"></spring:message>：</span><span id="ldname"></span>
						&nbsp;&nbsp;&nbsp;<input type="radio" name="licheng" value="0" checked class="licheng" onchange="lichengChange()" id="xlicheng" />
						<span class="xlicheng"><spring:message code="lxl.smallMileage"></spring:message></span>
						<input type="radio" name="licheng" class="licheng" value="1" onchange="lichengChange()" id="dalicheng"  />
						<span class="dalicheng"><spring:message code="lxl.largeMileage"></spring:message></span>
						<div id="back" onclick="back()">
							<img src="static/images/back.png"/>
							
		<!-- 					<span class="back">返回全桥</span> -->
						</div>
					</div>
				<div>
					<canvas id = "cedian" width="360px" height="210px"></canvas>
				</div>
				</div>
			</div>
		</div>
<script src="static/js/homeBridge.js"></script>
<script src="static/js/homeBridgeEchart.js"></script>