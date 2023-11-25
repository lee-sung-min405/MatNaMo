package com.cap.service;

import com.cap.domain.Article;
import com.cap.domain.Notice;
import com.cap.repository.ArticleRepository;
import com.cap.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class NoticeService {
    @Autowired private NoticeRepository noticeRepository;

    // 공지사항 목록 불러오는 서비스
    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }

    public void createNotice(Notice notice) {
        // 공지사항 데이터를 데이터베이스에 저장
        noticeRepository.save(notice);
    }

    //  공지사항 id로 데이터 찾는 서비스
    public Notice getNoticeById(Long noticeId) {
        Optional<Notice> noticeOptional = noticeRepository.findById(noticeId);

        if (noticeOptional.isPresent()) {
            return noticeOptional.get();
        } else {
            return null; // 해당 ID에 매칭되는 공지사항이 없을 경우 null을 반환하거나 예외 처리를 수행할 수 있습니다.
        }
    }



    //  공지사항 삭제 처리 서비스
    public boolean deleteNotice(Long noticeId) {
        Optional<Notice> noticeOptional = noticeRepository.findById(noticeId);

        if (noticeOptional.isPresent()) {
            Notice notice = noticeOptional.get();
            noticeRepository.delete(notice);
            return true; // 삭제 성공
        } else {
            return false; // 공지사항을 찾을 수 없음
        }
    }


}
