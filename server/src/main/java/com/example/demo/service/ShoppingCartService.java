package com.example.demo.service;

import com.example.demo.entity.ShoppingCart;
import com.example.demo.repository.ShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShoppingCartService {
    private final ShoppingCartRepository shoppingCartRepository;

    @Autowired
    public ShoppingCartService(ShoppingCartRepository shoppingCartRepository) {
        this.shoppingCartRepository = shoppingCartRepository;
    }

    public List<ShoppingCart> getAllCarts() {
        return shoppingCartRepository.findAll();
    }

    public ShoppingCart createCart(ShoppingCart cart) {
        return shoppingCartRepository.save(cart);
    }

    public Optional<ShoppingCart> getCartById(Long id) {
        return shoppingCartRepository.findById(id);
    }

    public boolean deleteCartById(Long id) {
        if (shoppingCartRepository.existsById(id)) {
            shoppingCartRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

