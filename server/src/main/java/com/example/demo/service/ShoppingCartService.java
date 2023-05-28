package com.example.demo.service;


import com.example.demo.dao.ShoppingCart;
import com.example.demo.repository.ShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShoppingCartService {
    private final ShoppingCartRepository repository;

    @Autowired
    public ShoppingCartService(ShoppingCartRepository repository) {
        this.repository = repository;
    }

    public List<ShoppingCart> getAllCarts() {
        return repository.findAll();
    }

    public ShoppingCart createCart(ShoppingCart cart) {
        return repository.save(cart);
    }

    public Optional<ShoppingCart> getCartById(Long id) {
        return repository.findById(id);
    }

    public boolean deleteCartById(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}