<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<script src="static/js/observer.js"></script>

<div class="right-region">
	<div class="content-wrapper">
		<div id="mainContent">
			<section class="content-observer">
				<div id="form1" >
					<div class="tablehead">
						<!-- 片区下拉框 仅在中国铁路总公司下显示 -->
						<select name="categoryItem" id="categoryItem" class="categoryItem" onchange="cagegoryItemChange()">
						</select>
						<!-- 项目下拉框 仅在中国铁路总公司下显示 -->
						<select name="projectInfo" id="projectInfo" class="categoryItem" onchange="projectInfoChange()">
						</select> 
						<!-- 标段下拉框 中国铁路总公司 项目 下显示 -->
						<select name="projectSection" id="projectSection" class="categoryItem">
						</select>
																		姓名&nbsp;	<input id="username" type="text" name="username"/>
						<a><input type="button" id="search" value="查&nbsp;&nbsp;&nbsp;询" onclick="search()"></a>
					</div>
					<div class="tablebox">
						<table id="observerList" class="table table-bordered">
							<thead>
								<tr>
									<td width='5%'>序号</th>
									<td class="suoshuTD treeCheckHide">片区</td>
									<td class="suoshuTD treeCheckHide">项目</td>
									<td class="suoshuTD biaodunhide">标段</td>
									<td>部门</td>
									<td>姓名</td>
									<td>职务</td>
									<td>电话</td>
								</tr>

							</thead>
							<tbody>
								
							</tbody>
						</table>
						<div id="tableinfo" class="tableinfo">
							
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</div>