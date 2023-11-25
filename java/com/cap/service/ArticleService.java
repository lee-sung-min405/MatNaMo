package com.cap.service;

import com.cap.domain.Article;
import com.cap.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArticleService {
    @Autowired private ArticleRepository articleRepository;

    // 게시글 목록 불러오는 서비스
    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    public void createArticle(Article article) {
        // 게시글 데이터를 데이터베이스에 저장
        articleRepository.save(article);
    }

    //  게시글 id로 데이터 찾는 서비스
    public Article getArticleById(Long articleId) {
        Optional<Article> articleOptional = articleRepository.findById(articleId);

        if (articleOptional.isPresent()) {
            return articleOptional.get();
        } else {
            return null; // 해당 ID에 매칭되는 게시글이 없을 경우 null을 반환하거나 예외 처리를 수행할 수 있습니다.
        }
    }



    //  게시글 삭제 처리 서비스
    public boolean deleteArticle(Long articleId) {
        Optional<Article> articleOptional = articleRepository.findById(articleId);

        if (articleOptional.isPresent()) {
            Article article = articleOptional.get();
            articleRepository.delete(article);
            return true; // 삭제 성공
        } else {
            return false; // 게시글을 찾을 수 없음
        }
    }


}
