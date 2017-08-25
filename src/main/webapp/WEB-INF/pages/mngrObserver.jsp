<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!-- 标段管理员 设置观测人员 -->
<div class="observer">
	<div class="smObserver-title">
		<ul class="smObserver-title-left">
			<li onclick="showAreaSaveObserver()" class="smObserver-observer">设为观测人员</li>
			<li onclick="cancelObserver()">取消观测人员</li>
		</ul>
		<div class="smObserver-cx">
			人员状态
			<select id="observerType">
				<option value="-1">全部</option>
				<option value="0">观测人员</option>
				<option value="1">非观测人员</option>
			</select>
			<span><input type="button" class="smObserver-btn" onclick="searchObserver()" value="查询"></span>
		</div>
<!--		 <div class="synchronization" onclick="syncObserver()"> -->
<!--		 	从基础平台同步信息 -->
<!--		 </div> -->
		<div class="clear"></div>
	</div>
	<div class="observer">
		<table id="observerList" class="table table-bordered table-responsive">
			<thead>
			<tr class="table-head">
				<td></td>
				<td>序号</td>
				<td>用户名</td>
				<td>真实姓名</td>
				<td>联系电话</td>
				<td>职务</td>
				<td>上岗证书编号</td>
				<td>上岗证书扫描件</td>
				<td>状态</td>
			</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
		<div id="tableinfo"></div>
	</di>
</div>
<!-- 查看上岗证书 弹窗 -->
<div id="viewImg" class="hideView">
	<div  class="smObserver-view">
	  <img alt="上岗证书扫描件" id="imgOrigionalSize">
	</div>
</div>

<!--设为观测人员 弹窗-->
<div class="smObserver-tc" id="areaSaveObserver">
	<div class="smObserver-tc-head">
		<span>设置观测人员</span>
		<span class="smObserver-tc-head-close" onclick="closeSaveObserver()">X</span>
	</div>
	<div class="smObserver-tc-content">
		
		<input type="hidden" value="" name="selectFlag" />
		<form id="formSaveObserver" method="post" enctype="multipart/form-data">  
			<input type="hidden" value="" name="id" />
			<input type="hidden" value="" name="sectionId" />
			<input type="hidden" value="" name="departmentId" />
			<ul>
				<li>用户名&nbsp;&nbsp;<input type="text" name="account" placeholder="zhangsan"></li>
				<li>真实姓名&nbsp;&nbsp;<input type="text" name="userName" placeholder="张三"></li>
				<li><span>*</span>持证上岗证书编号&nbsp;&nbsp;<input type="text" name="certificateNumber" maxlength="30"></li>
				<li>证书扫描件&nbsp;&nbsp;
					<!-- name 须为小写 -->
					<input type="file" name="certificatescan" class="certificate" accept=".png,.jpg,.jpeg,.PNG,.JPG,.JPEG" >
				</li>
			</ul>
		</form>
	</div>
	<div class="smObserver-tc-bottom">
		<input type="button" value="保存" class="smObserver-save" onclick="saveObserver()" />
		<input type="button" value="取消" class="smObserver-qx" onclick="closeSaveObserver()" />
	</div>
</div>
	<script type="text/javascript">
			var basePath="<%=basePath%>";
	</script>
<script src="static/plugins/jquery.form.js"></script>
<script src="static/js/mngrObserver.js"></script>