package com.cap.service;

import com.cap.domain.User;
import com.cap.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired private UserRepository userRepository;

    // 회원 정보 수정 서비스
    public User updateUserProfile(User updatedUser) {
        // 업데이트할 사용자 정보를 가져오거나 새로운 사용자 정보를 생성
        User user = userRepository.findById(updatedUser.getUserId()).orElse(new User());

        // 업데이트할 필드 설정
        user.setDepartment(updatedUser.getDepartment());
        user.setPassword(updatedUser.getPassword());
        user.setPhone(updatedUser.getPhone());
        user.setAddress(updatedUser.getAddress());
        user.setDetailsAddress(updatedUser.getDetailsAddress());

        // 사용자 정보 업데이트
        User updatedUserInfo = userRepository.save(user);

        return updatedUserInfo;
    }

    // 탈퇴 서비스
    public boolean deleteUser(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            User user = (User) session.getAttribute("user");
            if (user != null) {
                // DB에서 사용자 삭제
                userRepository.delete(user);

                // 세션 만료
                session.invalidate();
                return true;
            }
        }

        return false;
    }

}
