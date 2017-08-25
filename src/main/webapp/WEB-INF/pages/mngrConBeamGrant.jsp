<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!-- 标段管理员 连续梁授权 -->
<div class="lxl-grant">
	<div class="lxl-grant-left">
	
		<!-- 用户选择状态判断用 -->
		<input type="hidden" value="" name="userSelectFlag" />
		
		<div class="lxl-grant-user-head">
			<!-- 用户数据一览 -->
			<table>
				<thead>
					<tr class="select-user">
						<td colspan="7">选择用户</td>
					</tr>
					<tr class="selct-title">
						<td style="width: 5%;"></td>
						<td style="width: 7%;">序号</td>
						<td style='width: 19%;'>用户名</td>
						<td style='width: 19%;'>姓名</td>
						<td style='width: 19%;'>联系电话</td>
						<td style='width: 19%;'>部门</td>
						<td >状态</td>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
		<div class="lxl-grant-user-content">
			<table id="userList">
				<tbody>
				</tbody>
			</table>
		</div>
	</div>
	<div class="lxl-grant-right">

		<!-- 连续梁选择状态判断用 -->
		<input type="hidden" value="" name="conBeamSelectFlag" />
		
		<div class="lxl-grant-conbeam-head">
			 <span id="btnSyncConBeam" onclick="sysnConBeam()">同步连续梁信息</span>
			<table>
				<thead>
					<tr class="select-user">
						<td colspan="6">选择连续梁</td>
					</tr>
					<tr class="selct-title">
						<td style="width: 6%;"><input type="checkbox" name="selectLxl" id="selectLxl" onchange="selectAllConBeam()"></td>
						<td style="width: 9%;">序号</td>
						<td style='width: 35%;'>连续梁名称</td>
						<td style='width: 20%;'>开始里程</td>
						<td style='width: 17%;'>结束里程</td>
						<td>长度</td>
					</tr>
				</thead>
			</table>
		</div>
		<div class="lxl-grant-conbeam-content">
			<table id="conBeamList">
				<tbody>
				</tbody>
			</table>
		</div>
	</div>
	<div class="lxl-grant-grant-bottom">
		<input type="button" id="btnGrant" value="保存" class="grant-btn" onclick="grantConBeamToUser()" />
	</div>
</div>

<script src="static/js/mngrConBeamGrant.js"></script>