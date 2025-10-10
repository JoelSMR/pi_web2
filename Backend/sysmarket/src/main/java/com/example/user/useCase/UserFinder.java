package com.example.user.useCase;

import java.util.List;
import org.springframework.stereotype.Component;
import com.example.user.entity.User;
import com.example.user.useCase.port.UserFinderPort;

@Component
public class UserFinder {

    private final UserFinderPort userFinderPort;

    public UserFinder(UserFinderPort userFinderPort) {
        this.userFinderPort = userFinderPort;
    }

    public List<User> findAllUsers() {
        
        return userFinderPort.findAll();
    }
}