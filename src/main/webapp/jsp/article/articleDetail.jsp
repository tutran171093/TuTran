<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>

<c:set var="object" value="${article}" />

<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<div class="wrapArticle">
	<div class="titleArticle">
		<h2><c:out value="${object.title}" ></c:out></h2>
	</div>
	</br>
	<div class="content">
		<c:out value="${object.content}"></c:out>
	</div>
</div>

<div class="facebookComment">
	<div class="fb-comments" data-href="http://localhost:8080/TuTran/ArticleDetail?idArticle=1" data-width="100%" data-numposts="5"></div>
</div>