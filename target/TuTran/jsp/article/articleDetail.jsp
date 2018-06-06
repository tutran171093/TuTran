<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>

<c:set var="object" value="${article}" />

<div class="titleArticle">
	<h2><c:out value="${object.title}" ></c:out></h2>
</div>
</br>
<div class="content">
	<c:out value="${object.content}"></c:out>
</div>