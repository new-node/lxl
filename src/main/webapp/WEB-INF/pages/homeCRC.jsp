<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div class="content-wrapper">
	<section class="content">
		<aside class="main-sidebar">
			<div style="height: 500px;">
				<div class="span-region">
					<div>
						<table class="span-list">
							<tr>
								<td class="span-list-first">
									<div>
										<div class="echartsRegionHead">
											<span>主跨跨度分布及监测状态</span>
											<div
												style="display: inline-block; height: 15px; width: 24px; background-color: rgba(79, 129, 189, 1);position:absolute;right:167px;top:8px;">
											</div>
											<div
												style="display: inline; padding-right: 15px; font-size: 14px;position:absolute;top:5px;right:108px;color:#333;">已监测</div>
											<div
												style="display: inline-block; height: 15px; width: 24px; background-color: rgba(192, 80, 77, 1); position:absolute;top:8px;right:90px;"></div>
											<div
												style="display: inline; font-size: 14px;position:absolute;top:5px;right:47px;color:#333;">未监测</div>
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
										<div id="mainPie""></div>
									</div>
								</td>
							</tr>
						</table>
					</div>

				</div>
				<div class="monitoring-statistics">
					<div style="padding-top: 10px;">
						<div class="lxljcHead">
							<span style="font-size: 15px; font-weight:700; color:#1E1E1E">连续梁监测状态统计</span>
						</div>
						<div class="lxljcBottom"></div>
						<div>
							<div class='allNum' style="background: #6CCAC9;margin-left:14px;">
								<span>总数</span>
							</div>
							<div class="num">
								<span id="lxlz"></span>
							</div>
							<div style="float: left; padding-left: 0.9%;">&nbsp;</div>

							<div class='allNum' style="background: #FF6C60;">
								<span>未监测</span>
							</div>
							<div class="num">
								<span id="lxlw"></span>
							</div>

							<div style="float: left; padding-left: 0.9%;">&nbsp;</div>
							<div class='allNum' style="background: #F8D347;">
								<span>监测中</span>
							</div>
							<div class="num">
								<span id="lxlj"></span>
							</div>

							<div style="float: left; padding-left: 0.9%;">&nbsp;</div>
							<div class='allNum' style="background: #57C8F2;">
								<span>待合龙</span>
							</div>
							<div class="num">
								<span id="lxld"></span>
							</div>
							<div style="float: left; padding-left: 0.9%;">&nbsp;</div>
							<div class='allNum' style="background: #A9D86E;">
								<span>已合龙</span>
							</div>
							<div class="num">
								<span id="lxly"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="region-list">
					<div class="allRegionChina">
						<h4>综合统计表</h4>	
						<ul id="myTab">											
							<li ><a href="javascript:void(0)" onclick="getCategorySummary()" class="active">片区汇总</a></li>
							
						</ul>
						<div class='areaSummaryRegion'>
							<table class='table table-bordered home-table' id="areaSummary">
							  <thead>
								<tr id = 'projectPianQu'>
									<td rowspan='2' >序号</td>
									<td rowspan='2' style='width: 20%;' id="areaProject">片区</td>
									<td colspan='5'>连续梁监测状态统计</td>
									<td colspan='2'>超限连续梁</td>
									<td colspan='2'>超限梁段</td>
<!-- 									<td rowspan='2'>梁段总数</td>  -->
<!-- 									<td rowspan='2'>测点总数</td> -->
<!-- 									<td rowspan='2'>工作基点个数</td> -->
								</tr>
								<tr>
									<td>总数</td>
									<td>未监测</td>
									<td>监测中</td>
									<td>待合龙</td>
									<td>已合龙</td>
									<td>处置中</td>
									<td>未处置</td>
									<td>处置中</td>
									<td>未处置</td>
								</tr>
							 </thead>
							 <tbody>
		
							 </tbody>
						   </table>
						</div>
						
					</div>
				</div>
			</div>
		</aside>
	</section>
</div>

<script src="static/js/homeCRC.js"></script>