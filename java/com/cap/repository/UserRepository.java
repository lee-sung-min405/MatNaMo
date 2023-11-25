package com.cap.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.cap.domain.User;

public interface UserRepository extends JpaRepository<User, String> {

}
