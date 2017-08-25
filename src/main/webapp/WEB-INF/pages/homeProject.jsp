<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<div class="content-wrapper">
	<section class="content">
		<aside class="main-sidebar">
			<div class='for-echart'>
				<!--echarts  -->
				<div class='projectHome-region'>
					<div class='mainHead'>	
						<div id="mainHead-bottom">				 
							<div class='fl transfiniteNumber'><spring:message code="home.sectionOverrunCount"></spring:message></div>
							<div class='fr timeQuery'>
								<p> 
									<span><spring:message code="home.startEndTime"></spring:message></span>
									<input type = 'text' id="startTime" name = 'startTime' class='time-view-start' placeholder='<spring:message code="condition.startTime"></spring:message>'  onclick="time1()" readonly="readonly">
									<em>&nbsp;~</em>
									<input type = 'text' id="endTime" name = 'endTime' class='time-view-end' placeholder='<spring:message code="condition.endTime"></spring:message>' onclick="time2()" readonly="readonly"> 
									<input type='button' value = '<spring:message code="condition.search"></spring:message>' class = 'timeView-btn' />
								</p>  
								
							</div>
							<div class="clear"></div>
						</div>
					</div>
					<div id="main">					
					</div>
					<div id='echartProgress'>
						<div class="progressHead">
								<h4>
								<spring:message code="home.dealProgress"></spring:message>
								</h4>
								<p class="pull-right tip"><i class="icon"></i><span><spring:message code="home.deal"></spring:message></span></p>
							</div>
							<div class="grayLine"></div>
						<div class="progress progress1">
							<div id="jqmeter-container1"></div>
							<div class="progressName">
								<spring:message code="home.OverrunBridge"></spring:message>
								<span id="lxl-overCount" ></span>
								<span id="lxl-notDisposed"></span>
							</div>
						</div>
						<div class="progress progress2">
							<div id="jqmeter-container2"></div>
							<div class="progressName">
								<spring:message code="home.OverrunLD"></spring:message>
								<span id="overCount" ></span>
								<span id="notDisposed"></span>
							</div>
						</div>	
					</div>
					</div>			
				</div>
				
				<div class="span-region">
					<div>
						<table class="span-list">
							<tr>
								<td style="width: 76%">
									<div>
										<div class="echartsRegionHead">
											<span><spring:message code="home.mainspan"></spring:message></span>
											<div
												style="display: inline-block; height: 15px; width: 24px; background-color: rgba(79, 129, 189, 1);position: absolute;top: 8px;right: 168px;">
											</div>
											<div
												style="display: inline; padding-right: 15px; font-size: 14px;position:absolute;top:6px;right:110px;color:#333;"><spring:message code="home.monitored"></spring:message></div>
											<div
												style="display: inline-block; height: 15px; width: 24px; background-color: rgba(192, 80, 77, 1);position: absolute;top: 8px;right: 93px;"></div>
											<div
												style="display: inline; font-size: 14px;position:absolute;top:5px;right:49px;color:#333;"><spring:message code="home.nomonitored"></spring:message></div>
										</div>
									
										<div class="echartsRegionBottom"></div>
										
										<ul class="circle-region">
											<li id="mainPie1"></li>
											<li id="mainPie2"></li>
											<li id="mainPie3"></li>
											<li id="mainPie4"></li>
											<li id="mainPie5"></li>
											<li class="clear"></li>
										</ul>
									</div>
								</td>
								<td style="width: 10%">
									<div style="height: 200px;">
										<div id="mainPie" ></div>
									</div>
								</td>
							</tr>
						</table>
					</div>

				</div>
				<div class="monitoring-statistics" >
					<div style="padding-top: 10px;">
						<div style="padding-left:3px;">
							<span style="font-size: 15px; font-weight:700;color:#1E1E1E;"><spring:message code="home.bridgestatus"></spring:message></span>
						</div>
						<div>
							<div style="background-color: #F2F2F2; width: 97%; padding-top: 2px; height: 3px; margin:2px 0 15px 0;"></div>
						</div>
						<div>
							<div class='allNum' style="background: #6CCAC9;margin-left:14px;">
								<span><spring:message code="home.total"></spring:message></span>
							</div>
							<div class="num">
								<span id="prolxlz"></span>
							</div>
							<div style="float: left; padding-left: 0.9%;">&nbsp;</div>

							<div class='allNum' style="background: #FF6C60;">
								<span><spring:message code="home.nomonitored"></spring:message></span>
							</div>
							<div class="num">
								<span id="prolxlw"></span>
							</div>

							<div style="float: left; padding-left: 0.9%;">&nbsp;</div>
							<div class='allNum' style="background: #F8D347;">
								<span><spring:message code="home.InMonitoring"></spring:message></span>
							</div>
							<div class="num">
								<span id="prolxlj"></span>
							</div>

							<div style="float: left; padding-left: 0.9%;">&nbsp;</div>
							<div class='allNum' style="background: #57C8F2;">
								<span><spring:message code="home.noclosed"></spring:message></span>
							</div>
							<div class="num">
								<span id="prolxld"></span>
							</div>
							<div style="float: left; padding-left: 0.9%;">&nbsp;</div>
							<div class='allNum' style="background: #A9D86E;">
								<span><spring:message code="home.closed"></spring:message></span>
							</div>
							<div class="num">
								<span id="prolxly"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="homeProject-region-list">
					<div style="padding-left: 2px;">
						<table class='table table-bordered home-table' id="smprojectTable">
							<thead>
								<tr id='projectPianQu'>
									<td rowspan='2' ><spring:message code="home.serialNumber"></spring:message></td>
									<td rowspan='2' style='width: 20%;'><spring:message code="home.section"></spring:message></td>
									<td colspan='5'><spring:message code="home.bridgestatus"></spring:message></td>
									<td colspan='2'><spring:message code="home.OverrunBridge"></spring:message></td>
									<td colspan='2'><spring:message code="home.OverrunLD"></spring:message></td>
									<td rowspan='2'><spring:message code="home.measureLdCount"></spring:message></td>
									<!-- <td rowspan='2'>测点总数</td> -->
<!-- 									<td rowspan='2'>工作基点总数</td> -->
								</tr>
								<tr>
									<td><spring:message code="home.total"></spring:message></td>
									<td><spring:message code="home.nomonitored"></spring:message></td>
									<td><spring:message code="home.InMonitoring"></spring:message></td>
									<td><spring:message code="home.noclosed"></spring:message></td>
									<td><spring:message code="home.closed"></spring:message></td>
									<td><spring:message code="home.indeal"></spring:message></td>
									<td><spring:message code="home.nodeal"></spring:message></td>
									<td><spring:message code="home.indeal"></spring:message></td>
									<td><spring:message code="home.nodeal"></spring:message></td>
								</tr>
							</thead>
							<tbody>
								
							</tbody>
						</table>
					</div>
				</div>
		
		</aside>
	</section>
</div>
<script src="static/js/homeProject.js"></script> 