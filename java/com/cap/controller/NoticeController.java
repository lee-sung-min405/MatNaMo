package com.cap.controller;

import com.cap.domain.Notice;
import com.cap.domain.User;
import com.cap.repository.NoticeRepository;
import com.cap.service.NoticeService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*
 * 공지사항 페이지 /notice
 * 공지사항 작성 페이지 /notice/detail
 * 공지사항 상세 페이지    /notice/{noticeId}
 * 공지사항 수정    /notice/{noticeId}/update
 * 공지사항 삭제    /notice/{noticeId}/delete
 */

@RestController
@RequestMapping("/notice")
public class NoticeController {

    @Autowired private NoticeService noticeService;
    @Autowired private NoticeRepository noticeRepository;

    // 공지사항 페이지
    @GetMapping
    public List<Notice> getNotices() {
        // 공지사항 목록을 서비스를 통해 가져옵니다.
        List<Notice> notices = noticeService.getAllNotices();

        return notices;
    }


    //  공지사항 작성 페이지
    @GetMapping("/detail")
    public Map<String, String> Notice(){
        Map<String, String> response = new HashMap<>();
        response.put("notice", "공지사항 작성 페이지");

        return response;
    }


    //  공지사항 저장 처리
    @PostMapping("/detail")
    public ResponseEntity<String> createNotice(@RequestBody Notice notice, HttpSession session) {
        // 세션에서 현재 로그인한 사용자 정보 가져오기
        User loggedInUser = (User) session.getAttribute("user");

        if (loggedInUser != null) {
            // 공지사항에 사용자 정보 설정
            notice.setUser(loggedInUser);

            // 현재 날짜와 시간을 설정
            notice.setCreatedAt(new Timestamp(System.currentTimeMillis()));

            // 공지사항을 데이터베이스에 저장
            noticeRepository.save(notice);

            return ResponseEntity.ok("공지사항이 작성되었습니다.");
        } else {
            // 로그인되지 않은 경우 로그인 페이지로 리디렉션
            return ResponseEntity.ok("로그인이 필요합니다.");
        }
    }


    // 공지사항 상세 페이지
    @GetMapping("/{noticeId}")
    public ResponseEntity<Notice> getNoticeDetail(HttpSession session, @PathVariable Long noticeId) {
        User loggedInUser = (User) session.getAttribute("user"); // 로그인한 사용자 정보를 가져옴
        Notice notice = noticeService.getNoticeById(noticeId); // 공지사항 정보를 가져옴

        if (notice != null) {
            // 공지사항 정보를 항상 반환
            ResponseEntity<Notice> response = ResponseEntity.ok(notice);

            return response;
        } else {
            // 공지사항을 찾을 수 없는 경우, 에러 반환
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/check-login-Notice/{noticeId}")
    public ResponseEntity<String> checkLoginNotice(@PathVariable Long noticeId, HttpSession session) {
        User loggedInUser = (User) session.getAttribute("user"); // 현재 로그인한 사용자 정보를 가져옴
        Notice notice = noticeService.getNoticeById(noticeId); // 공지사항 정보를 가져옴 (이 부분은 실제 서비스에 맞게 수정 필요)

        if (notice != null && loggedInUser != null && loggedInUser.getUserId().equals(notice.getUser().getUserId())) {
            // 공지사항이 존재하고, 현재 로그인한 사용자와 공지사항 작성자의 아이디가 동일한 경우
            return ResponseEntity.ok("loginNotice");
        } else {
            return ResponseEntity.ok("notLoginNotice");
        }
    }


    // 공지사항 수정 페이지
    @GetMapping("/{noticeId}/update")
    public ResponseEntity<String> getNoticeUpdatePage(@PathVariable Long noticeId, HttpSession session) {
        // 공지사항 ID를 사용하여 해당 공지사항을 찾음
        Notice notice = noticeService.getNoticeById(noticeId);

        if (notice == null) {
            // 공지사항을 찾을 수 없는 경우, 에러 응답
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("공지사항을 찾을 수 없습니다.");
        }

        User loggedInUser = (User) session.getAttribute("user");
        if (loggedInUser == null || !loggedInUser.getUserId().equals(notice.getUser().getUserId())) {
            // 사용자가 로그인하지 않았거나 공지사항 작성자가 아닌 경우, 권한 없음 응답
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("공지사항을 수정할 권한이 없습니다.");
        }

        // 공지사항 수정 페이지로 이동하는 로직 추가
        return ResponseEntity.ok("공지사항 수정 페이지로 이동합니다.");
    }



    // 공지사항 수정 처리
    @PostMapping("/{noticeId}/update")
    public ResponseEntity<String> updateNotice(
            @PathVariable Long noticeId,
            @RequestBody Notice updatedNotice,
            HttpSession session
    ) {
        // 공지사항 ID를 사용하여 해당 공지사항을 찾음
        Notice existingNotice = noticeService.getNoticeById(noticeId);

        if (existingNotice == null) {
            // 공지사항을 찾을 수 없는 경우, 에러 응답
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("공지사항을 찾을 수 없습니다.");
        }

        User loggedInUser = (User) session.getAttribute("user");
        if (loggedInUser == null || !loggedInUser.getUserId().equals(existingNotice.getUser().getUserId())) {
            // 사용자가 로그인하지 않았거나 공지사항 작성자가 아닌 경우, 권한 없음 응답
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("공지사항을 수정할 권한이 없습니다.");
        }

        // 업데이트된 정보로 기존 공지사항을 업데이트
        existingNotice.setTitle(updatedNotice.getTitle());
        existingNotice.setContent(updatedNotice.getContent());

        // 데이터베이스에 변경 사항을 저장
        noticeService.createNotice(existingNotice);

        return ResponseEntity.ok("공지사항이 성공적으로 수정되었습니다.");
    }


    // 공지사항 삭제 처리
    @PostMapping("/{noticeId}/delete")
    public ResponseEntity<String> deleteNotice(@PathVariable Long noticeId, HttpSession session) {
        // 공지사항 삭제 서비스 호출
        boolean deleted = false;

        // 현재 세션에서 로그인한 사용자 정보 가져오기
        User loggedInUser = (User) session.getAttribute("user");

        if (loggedInUser != null) {
            // 로그인한 사용자의 아이디와 공지사항 작성자의 아이디 비교
            Notice notice = noticeRepository.findById(noticeId).orElse(null);
            if (notice != null && notice.getUser().getUserId().equals(loggedInUser.getUserId())) {
                // 공지사항 삭제 서비스 호출
                deleted = noticeService.deleteNotice(noticeId);
            }
        }

        if (deleted) {
            return ResponseEntity.ok("공지사항이 삭제되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("공지사항 삭제 중 오류가 발생했습니다.");
        }
    }


}
