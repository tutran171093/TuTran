<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<title><tiles:insertAttribute name="title" /></title>


<tiles:importAttribute name="stylesInherit" />
<c:forEach items="${stylesInherit}" var="style">
	<link href="<c:url value='${style}' />" rel="stylesheet"
		type="text/css" />
</c:forEach>
<tiles:importAttribute name="styles" />
<c:forEach items="${styles}" var="style">
	<link href="<c:url value='${style}' />" rel="stylesheet"
		type="text/css" />
</c:forEach>

<script type="text/javascript">
    var contextPath="<%=request.getContextPath()%>";
    </script>
</head>

<body>
	<tiles:insertAttribute name="header" />
	<div class="page-content">
		<!-- WRAPPER -->
		<div id="wrapper">
			<tiles:insertAttribute name="body" ignore="true" />
		</div>
		<!-- /WRAPPER -->
	</div>
	<tiles:insertAttribute name="footer" />

	<!-- Placed at the end of the document so the pages load faster -->
	<tiles:importAttribute name="scriptsInherit" />
	<c:forEach items="${scriptsInherit}" var="script">
		<script type="text/javascript" src="<c:url value='${script}' />"></script>
	</c:forEach>

	<tiles:importAttribute name="scripts" />
	<c:forEach items="${scripts}" var="script">
		<script type="text/javascript" src="<c:url value='${script}' />"></script>
	</c:forEach>

</body>
</html>