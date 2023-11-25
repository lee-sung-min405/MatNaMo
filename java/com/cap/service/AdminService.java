package com.cap.service;

import com.cap.domain.User;
import com.cap.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdminService {

    @Autowired private AdminRepository adminRepository;


    // 관리자 권한을 가진 아이디를 제외한 나머지만 테이블 형식으로 보여준다.
    public List<User> getNonAdminUsers() {
        return adminRepository.findByUserIdNot("admin");
    }

    @Transactional
    public boolean deleteUser(String userId) {
        try {
            // 사용자 삭제
            adminRepository.deleteByUserId(userId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
