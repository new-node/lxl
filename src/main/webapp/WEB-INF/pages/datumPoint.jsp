<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<script src="<%=basePath%>static/js/datumPoint.js"></script>
<style>
<!--基准点页面-->
</style>
<div class="right-region ">
	<div class="content-wrapper">
		<div id="mainContent">
			<section class="content-observer">
				<div id="form1">
					<div class="tablehead-btn">
						<button onclick="openModel('addDatumPoint')"><spring:message code="basePoint.btn.add"></spring:message></button>
						<button onclick="openModel('updateDatumPoint')"><spring:message code="basePoint.btn.upd"></spring:message></button>
						<button onclick="openModel('deleteDatumPoint')"><spring:message code="basePoint.btn.del"></spring:message></button>
					</div>
					<div class="tablebox">
						<table id="datumPointList" class="table table-bordered">
							<thead>
								<tr>
									<th><input type='checkbox' name="datum" id="datum" onchange="selectAll()"></th>
									<th><spring:message code="home.serialNumber"></spring:message></th>
									<th><spring:message code="basePoint.home.name"></spring:message></th>
									<th><spring:message code="basePoint.home.X"></spring:message></th>
									<th><spring:message code="basePoint.home.Y"></spring:message></th>
									<th><spring:message code="basePoint.home.Z"></spring:message></th>
									<th><spring:message code="basePoint.home.upTime"></spring:message></th>
									<th><spring:message code="basePoint.home.upRecord"></spring:message></th>
									<th><spring:message code="basePoint.home.status"></spring:message></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td><input type="checkbox" name="point" class="point"></td>
									<td>1</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td>2017-03-06</td>
									<td><a href="javascript:"><spring:message code="basePoint.home.search"></spring:message></a></td>
									<td><spring:message code="basePoint.home.ok"></spring:message></td>
								</tr>
							</tbody>
						</table>
						<div id="tableinfo"></div>
					</div>
				</div>
			</section>
		</div>
	</div>
</div>
