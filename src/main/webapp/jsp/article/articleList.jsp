<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>

<table class="table table-bordered table-hover">
<thead>
	<tr>
		<td class="text-center info">Title</td>
	</tr>
</thead>
<c:forEach var="article" items="${articleList}">
	<c:set var="object" value="${article}" />
	<tr>
		<td><a href="ArticleDetail?idArticle=${object.id}"><c:out value = "${object.title}"/></a></td>
	</tr>
</c:forEach>
</table>