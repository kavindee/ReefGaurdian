package com.ReefGaurdian.rp.service;

import com.ReefGaurdian.rp.DTO.UserDTO;
import com.ReefGaurdian.rp.model.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    ResponseEntity<Object> createUser(User user);
    UserDTO getUserById(String userId);
    List<UserDTO> getAllUsers();
    ResponseEntity<Object> followUser(String userId, String followedUserId);

    ResponseEntity<Object> loginUser(String email, String password);
}
