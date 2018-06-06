package dao;

import java.util.ArrayList;
import java.util.List;

import com.mysql.jdbc.JDBC4ResultSet;
import com.mysql.jdbc.PreparedStatement;

import dto.Article;

public class ArticleDAO {

	final String GET_ALL_ARTICLE_SQL = "SELECT * FROM article";
	final String GET_ARTICLE_BY_ID_SQL = "SELECT * FROM article WHERE article.idarticle = ?";

	public List<Article> getAllArticle() {
		List<Article> articleLst = new ArrayList<Article>();
		try {
			PreparedStatement ps = (PreparedStatement) new MysqlConnect().getConnection().prepareStatement(GET_ALL_ARTICLE_SQL);
			JDBC4ResultSet rs = (JDBC4ResultSet) ps.executeQuery();
			while (rs.next()) {
				articleLst.add(new Article(rs.getInt("idarticle"), rs.getString("title"), rs.getString("content")));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return articleLst;
	}

	public Article getArticleById(int id) {
		Article article = new Article();
		try {
			PreparedStatement ps = (PreparedStatement) new MysqlConnect().getConnection().prepareStatement(GET_ARTICLE_BY_ID_SQL);
			ps.setInt(1, id);
			JDBC4ResultSet rs = (JDBC4ResultSet) ps.executeQuery();
			while (rs.next()) {
				article.setId(rs.getInt("idarticle"));
				article.setTitle(rs.getString("title"));
				article.setContent(rs.getString("content"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return article;
	}

}
