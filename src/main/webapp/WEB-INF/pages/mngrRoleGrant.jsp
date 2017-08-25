<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!-- 标段管理员 角色授权 -->
<div class="role-grant">
	<div class="role-grant-left">
	
		<!-- 用户选择状态判断用 -->
		<input type="hidden" value="" name="userSelectFlag" />
		
		<div class="role-grant-user-head">
			<!-- 用户数据一览 -->
			<table>
				<thead>
					<tr class="select-user">
						<td colspan="6">选择用户</td>
					</tr>
					<tr class="selct-title">
						<td style='width:5%;'></td>
						<td style='width:7%;'>序号</td>
						<td style='width: 20%;'>用户名</td>
						<td style='width: 20%;'>姓名</td>
						<td style='width: 20%;'>联系电话</td>
						<td >部门</td>
					</tr>
				</thead>
			</table>
		</div>	
		<div class="role-grant-user-content">
			<table id="userList">
				<tbody>
				</tbody>
			</table>
		</div>
	</div>
	<div class="role-grant-right">

		<!-- 连续梁选择状态判断用 -->
		<input type="hidden" value="" name="roleSelectFlag" />
		
			<table id="grantedRoleList">
				<thead>
					<tr class="select-user">
						<td colspan="4">已授权角色列表</td>
					</tr>
					<tr class="selct-title">
						<td style="width: 47px;">序号</td>
						<td style='width: 160px;'>角色名称</td>
						<td style='width: 190px;'>角色说明</td>
						<td style='width: 100px;'>操作</td>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
			
			<div style="margin-top:20px"></div>
			
			<table id="noGrantRoleList">
				<thead>
					<tr class="select-user">
						<td colspan="4">未授权角色列表</td>
					</tr>
					<tr class="selct-title">
						<td style="width: 48px;">序号</td>
						<td style='width: 190px;'>角色名称</td>
						<td style='width: 190px;'>角色说明</td>
						<td style='width: 100px;'>操作</td>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
	</div>
</div>

<script src="static/js/mngrRoleGrant.js"></script>