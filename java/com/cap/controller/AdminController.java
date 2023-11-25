package com.cap.controller;

import com.cap.domain.User;
import com.cap.repository.AdminRepository;
import com.cap.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
 * 사용자 관리 페이지 /management
 * 사용자 관리 페이지 - 회원 정보 삭제    /management/delete
*/

@RestController
public class AdminController {

    @Autowired private AdminRepository adminRepository;
    @Autowired private AdminService adminService;

    //  사용자 관리 페이지
    @GetMapping("/management")
    public List<User> getNonAdminUsers() {
        List<User> nonAdminUsers = adminService.getNonAdminUsers();
        return nonAdminUsers;
    }


    // 사용자 관리 페이지 - 회원 정보 삭제
    @PostMapping("/management/delete/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable String userId) {
        if (adminService.deleteUser(userId)) {
            return ResponseEntity.ok("사용자 삭제 성공");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("사용자 삭제 실패");
        }
    }

}
