package com.cap.controller;

import com.cap.domain.Article;
import com.cap.domain.User;
import com.cap.repository.ArticleRepository;
import com.cap.service.ArticleService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


/*
* 게시판 페이지 /board
* 게시글 작성 페이지 /board/detail
* 게시글 상세 페이지    /board/{articleId}
* 게시글 수정    /board/{articleId}/update
* 게시글 삭제    /board/{articleId}/delete
*/

@RestController
@RequestMapping("/board")
public class ArticleController {

    @Autowired private ArticleService articleService;
    @Autowired private ArticleRepository articleRepository;

    // 게시판 페이지
    @GetMapping
    public List<Article> getArticles(@RequestParam(name = "search", required = false) String search) {
        List<Article> articles = articleService.getAllArticles(); // 모든 게시글 가져오기

        if (search != null && !search.isEmpty()) {
            // 검색어가 제공된 경우, 게시글을 검색어로 필터링
            List<Article> filteredArticles = new ArrayList<>();
            for (Article article : articles) {
                if (article.getTitle().contains(search) || article.getContent().contains(search)) {
                    filteredArticles.add(article);
                }
            }
            return filteredArticles;
        } else {
            // 검색어가 없는 경우 모든 게시글 반환
            return articles;
        }
    }

    //  그룹 주문 링크를 포함하는 게시글만 보여주는 처리
    @GetMapping("/orderLink")
    public List<Article> getArticlesOrderLink() {
        List<Article> articles = articleService.getAllArticles(); // 모든 게시글 가져오기

        // orderLink가 null이 아닌 게시글만 필터링하여 반환
        return articles.stream()
                .filter(article -> article.getOrderLink() != null)
                .collect(Collectors.toList());
    }


    //  게시글 작성 페이지
    @GetMapping("/detail")
    public Map<String, String> Article(){
        Map<String, String> response = new HashMap<>();
        response.put("article", "게시글 작성 페이지");

        return response;
    }


    //  게시글 저장 처리
    @PostMapping("/detail")
    public ResponseEntity<String> createArticle(@RequestBody Article article, HttpSession session) {
        // 세션에서 현재 로그인한 사용자 정보 가져오기
        User loggedInUser = (User) session.getAttribute("user");

        if (loggedInUser != null) {
            // 게시글에 사용자 정보 설정
            article.setUser(loggedInUser);

            // 현재 날짜와 시간을 설정
            article.setCreatedAt(new Timestamp(System.currentTimeMillis()));

            // 게시글을 데이터베이스에 저장
            articleRepository.save(article);

            return ResponseEntity.ok("게시글이 작성되었습니다.");
        } else {
            // 로그인되지 않은 경우 로그인 페이지로 리디렉션
            return ResponseEntity.ok("로그인이 필요합니다.");
        }
    }


    // 게시글 상세 페이지
    @GetMapping("/{articleId}")
    public ResponseEntity<Article> getArticleDetail(HttpSession session, @PathVariable Long articleId) {
        User loggedInUser = (User) session.getAttribute("user"); // 로그인한 사용자 정보를 가져옴
        Article article = articleService.getArticleById(articleId); // 게시글 정보를 가져옴

        if (article != null) {
            // 게시글 정보를 항상 반환
            ResponseEntity<Article> response = ResponseEntity.ok(article);

            return response;
        } else {
            // 게시글을 찾을 수 없는 경우, 에러 반환
            return ResponseEntity.notFound().build();
        }
    }

    //  본인이 작성한 게시글인지 확인하는 처리
    @GetMapping("/check-login-Article/{articleId}")
    public ResponseEntity<String> checkLoginArticle(@PathVariable Long articleId, HttpSession session) {
        User loggedInUser = (User) session.getAttribute("user"); // 현재 로그인한 사용자 정보를 가져옴
        Article article = articleService.getArticleById(articleId); // 게시글 정보를 가져옴 (이 부분은 실제 서비스에 맞게 수정 필요)

        if (article != null && loggedInUser != null && loggedInUser.getUserId().equals(article.getUser().getUserId())) {
            // 게시글이 존재하고, 현재 로그인한 사용자와 게시글 작성자의 아이디가 동일한 경우
            return ResponseEntity.ok("loginArticle");
        } else {
            return ResponseEntity.ok("notLoginArticle");
        }
    }


    // 게시글 수정 페이지
    @GetMapping("/{articleId}/update")
    public ResponseEntity<String> getArticleUpdatePage(@PathVariable Long articleId, HttpSession session) {
        // 게시글 ID를 사용하여 해당 게시글을 찾음
        Article article = articleService.getArticleById(articleId);

        if (article == null) {
            // 게시글을 찾을 수 없는 경우, 에러 응답
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("게시글을 찾을 수 없습니다.");
        }

        User loggedInUser = (User) session.getAttribute("user");
        if (loggedInUser == null || !loggedInUser.getUserId().equals(article.getUser().getUserId())) {
            // 사용자가 로그인하지 않았거나 게시글 작성자가 아닌 경우, 권한 없음 응답
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("게시글을 수정할 권한이 없습니다.");
        }

        // 게시글 수정 페이지로 이동하는 로직 추가
        return ResponseEntity.ok("게시글 수정 페이지로 이동합니다.");
    }



    // 게시글 수정 처리
    @PostMapping("/{articleId}/update")
    public ResponseEntity<String> updateArticle(
            @PathVariable Long articleId,
            @RequestBody Article updatedArticle,
            HttpSession session
    ) {
        // 게시글 ID를 사용하여 해당 게시글을 찾음
        Article existingArticle = articleService.getArticleById(articleId);

        if (existingArticle == null) {
            // 게시글을 찾을 수 없는 경우, 에러 응답
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("게시글을 찾을 수 없습니다.");
        }

        User loggedInUser = (User) session.getAttribute("user");
        if (loggedInUser == null || !loggedInUser.getUserId().equals(existingArticle.getUser().getUserId())) {
            // 사용자가 로그인하지 않았거나 게시글 작성자가 아닌 경우, 권한 없음 응답
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("게시글을 수정할 권한이 없습니다.");
        }

        // 업데이트된 정보로 기존 게시글을 업데이트
        existingArticle.setTitle(updatedArticle.getTitle());
        existingArticle.setContent(updatedArticle.getContent());
        existingArticle.setOrderLink(updatedArticle.getOrderLink());
        existingArticle.setAddress(updatedArticle.getAddress());

        // 데이터베이스에 변경 사항을 저장
        articleService.createArticle(existingArticle);

        return ResponseEntity.ok("게시글이 성공적으로 수정되었습니다.");
    }


    // 게시글 삭제 처리
    @PostMapping("/{articleId}/delete")
    public ResponseEntity<String> deleteArticle(@PathVariable Long articleId, HttpSession session) {
        // 게시글 삭제 서비스 호출
        boolean deleted = false;

        // 현재 세션에서 로그인한 사용자 정보 가져오기
        User loggedInUser = (User) session.getAttribute("user");

        if (loggedInUser != null) {
            // 로그인한 사용자의 아이디와 게시글 작성자의 아이디 비교
            Article article = articleRepository.findById(articleId).orElse(null);
            if (article != null && article.getUser().getUserId().equals(loggedInUser.getUserId())) {
                // 게시글 삭제 서비스 호출
                deleted = articleService.deleteArticle(articleId);
            }
        }

        if (deleted) {
            return ResponseEntity.ok("게시글이 삭제되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("게시글 삭제 중 오류가 발생했습니다.");
        }
    }


}
