package com.example.demo.service;

import com.example.demo.dao.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository repository;

    @Autowired
    public UserService(UserRepository repository){
        this.repository = repository;
    }

    public List<User> getAllUsers() {
        return repository.findAll();
    }


    public Optional<User> getUserById(Long id) {
        return repository.findById(id);
    }


    public User createUser(User user) {
        return repository.save(user);
    }


    public User updateUser(User user) {
        return repository.save(user);
    }


    public void deleteUser(Long id) {
        repository.deleteById(id);
    }
}
