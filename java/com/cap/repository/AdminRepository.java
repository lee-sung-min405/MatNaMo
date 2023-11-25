package com.cap.repository;

import com.cap.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdminRepository extends JpaRepository<User, String> {

    // 모든 사용자 정보 
    List<User> findByUserIdNot(String admin);

    //  해당하는 사용자 아이디 찾아서 정보 삭제
    void deleteByUserId(String userId);
}
