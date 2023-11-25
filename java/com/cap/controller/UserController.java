package com.cap.controller;

import com.cap.domain.User;
import com.cap.repository.UserRepository;
import com.cap.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/*
 * 메인 페이지 /
 * 회원가입 페이지 /signup
 * 로그인 페이지 /login
 * 로그아웃 페이지 /logout
 * 내 정보 페이지 /user/{userId}/profile
 * 정보 수정 페이지 /user/{userId}/update
 * 회원 탈퇴 /user/{userId}/delete
*/

@RestController
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserRepository userRepository; // UserRepository는 사용자 정보를 저장하기 위한 데이터베이스 관련 레포지토리

    @Autowired private UserService userService;

    // 메인 페이지
    @GetMapping("/")
    public Map<String, String> home(HttpServletRequest request) {
        Map<String, String> response = new HashMap<>();

        // 사용자 세션에서 로그인 정보를 확인
        User user = (User) request.getSession().getAttribute("user");

        if (user != null) {
            if ("admin".equals(user.getUserId())){
                response.put("message", "관리자 페이지");
            }
            // 로그인된 경우
            else response.put("message", "로그인 후 메인화면");
        } else {
            // 로그인되지 않은 경우
            response.put("message", "로그인 전 메인화면");
        }

        return response;
    }


    @GetMapping("/check-auth")
    public ResponseEntity<String> checkAuthentication(HttpServletRequest request) {
        // 사용자 세션에서 로그인 정보를 확인
        User user = (User) request.getSession().getAttribute("user");

        if (user != null) {
            return ResponseEntity.ok("authenticated");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("not authenticated");
        }
    }

    //  관리자 확인
    @GetMapping("/check-admin")
    public ResponseEntity<String> checkAdmin(HttpSession session) {
        User loggedInUser = (User) session.getAttribute("user"); // 현재 로그인한 사용자 정보를 가져옴

        if (loggedInUser != null && "admin".equals(loggedInUser.getUserId())) {
            // 사용자가 "admin"인 경우
            return ResponseEntity.ok("admin");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("not admin");
        }
    }

    // 회원 가입 페이지
    @GetMapping("/signup")
    public Map<String, String> signup(){
        Map<String, String> response = new HashMap<>();
        response.put("signup", "회원 가입");

        return response;
    }

    @PostMapping("/signup")
    public Map<String, String> signup(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();
        try {
            // 아이디 중복 검사
            if (userRepository.existsById(user.getUserId())) {
                // 이미 존재하는 아이디일 경우
                response.put("message", "회원 가입 실패: 이미 존재하는 아이디입니다.");
            } else {
                // 비밀번호 강력성 검사
                if (isPasswordStrong(user.getPassword())) {
                    // 중복 아이디가 아니고, 비밀번호가 강력한 경우, 데이터베이스에 사용자 정보 저장
                    userRepository.save(user);
                    response.put("message", "회원 가입 성공");
                } else {
                    response.put("message", "회원 가입 실패: 비밀번호는 숫자, 대소문자, 특수문자를 모두 포함해야 합니다.");
                }
            }
        } catch (Exception e) {
            response.put("message", "회원 가입 실패: " + e.getMessage());
        }
        return response;
    }

    private boolean isPasswordStrong(String password) {
        // 비밀번호가 숫자, 대문자, 소문자, 특수문자를 모두 포함하는지 검사
        boolean hasDigit = false;
        boolean hasUpperCase = false;
        boolean hasLowerCase = false;
        boolean hasSpecialChar = false;

        for (char c : password.toCharArray()) {
            if (Character.isDigit(c)) {
                hasDigit = true;
            } else if (Character.isUpperCase(c)) {
                hasUpperCase = true;
            } else if (Character.isLowerCase(c)) {
                hasLowerCase = true;
            } else if ("!@#$%^&*()_-+=<>?".contains(String.valueOf(c))) {
                hasSpecialChar = true;
            }
        }

        return hasDigit && hasUpperCase && hasLowerCase && hasSpecialChar;
    }


    // 로그인 페이지
    @GetMapping("/login")
    public Map<String, String> login(){
        Map<String, String> response = new HashMap<>();
        response.put("login", "로그인");

        return response;
    }

    // 로그인 처리
    @PostMapping("/login")
    public String login(@RequestBody User user, HttpSession session) {
        Optional<User> userOptional = userRepository.findById(user.getUserId());

        if (userOptional.isPresent()) {
            User existingUser = userOptional.get();
            if (user.getPassword().equals(existingUser.getPassword())) {
                // 로그인 성공 시 세션에 사용자 정보 저장
                session.setAttribute("user", existingUser);
                return "로그인 성공";
            }
        }

        return "로그인 실패";
    }

    // 로그인 성공 후 사용자 아이디 얻어옴
    @GetMapping("/get-user-id")
    public ResponseEntity<String> getUserId(HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");

        if (user != null) {
            return ResponseEntity.ok(user.getUserId());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("사용자 아이디 없음");
        }
    }

    // 로그인 성공 후 사용자 이름 얻어옴
    @GetMapping("/get-user-name")
    public ResponseEntity<String> getUsername(HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");

        if (user != null) {
            return ResponseEntity.ok(user.getUsername());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("사용자 이름 없음");
        }
    }

    // 로그인 성공 후 사용자 연락처 얻어옴
    @GetMapping("/get-user-phone")
    public ResponseEntity<String> getPhone(HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");

        if (user != null) {
            return ResponseEntity.ok(user.getPhone());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("사용자 이름 없음");
        }
    }

    // 로그아웃 처리
    @GetMapping("/logout")
    public String logout(HttpServletRequest request) {
        // 세션을 만료시킴
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        return "로그아웃 성공"; // 로그아웃 후 메인 페이지로 리다이렉트
    }


    // 내 정보 페이지
    @GetMapping("/profile")
    public Map<String, String> profile(HttpServletRequest request) {
        Map<String, String> response = new HashMap<>();

        // 세션에서 현재 사용자 정보를 가져옵니다
        User user = (User) request.getSession().getAttribute("user");

        if (user != null) {
            // 로그인된 경우, 사용자 정보를 활용하여 내 정보 페이지를 제공합니다.
            response.put("message", "마이페이지");
            response.put("userId", user.getUserId()); // 사용자 아이디
            response.put("username", user.getUsername()); // 사용자 이름
            response.put("password", user.getPassword()); // 비밀 번호
            response.put("department", user.getDepartment()); // 학과
            response.put("phone", user.getPhone()); // 전화 번호
            response.put("address", user.getAddress()); // 도로명 주소
            response.put("detailsAddress", user.getDetailsAddress()); // 상세 주소
        } else {
            // 로그인되지 않은 경우, 로그인 페이지로 리다이렉트
            response.put("message", "로그인이 필요한 페이지입니다.");
        }

        return response;
    }

    // 내 정보 수정 처리
    @PostMapping("/profile/update")
    public ResponseEntity<User> updateProfile(@RequestBody User updatedUser, HttpServletRequest request) {
        // 현재 로그인한 사용자 정보 가져오기
        User loggedInUser = (User) request.getSession().getAttribute("user");

        if (loggedInUser == null) {
            // 로그인되지 않은 경우, 권한 없음 응답 반환
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        // 업데이트할 사용자 정보에 로그인한 사용자의 ID 설정
        updatedUser.setUserId(loggedInUser.getUserId());

        // 사용자 정보 업데이트
        User updatedUserInfo = userService.updateUserProfile(updatedUser);

        if (updatedUserInfo != null) {
            // 세션에도 업데이트된 사용자 정보를 저장
            request.getSession().setAttribute("user", updatedUserInfo);
            return ResponseEntity.ok(updatedUserInfo);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


    // 회원 탈퇴 처리
    @DeleteMapping("/profile/delete")
    public ResponseEntity<String> deleteUser(HttpServletRequest request) {
        // 사용자를 실제로 삭제하고, 성공 또는 실패에 따라 응답을 반환합니다.

        // 사용자 삭제 동작 구현
        boolean deleted = userService.deleteUser(request);

        if (deleted) {
            return ResponseEntity.ok("사용자가 성공적으로 삭제되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("사용자 삭제 중 오류가 발생했습니다.");
        }
    }


}

