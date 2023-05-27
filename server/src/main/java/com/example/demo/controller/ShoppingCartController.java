package com.example.demo.controller;

import com.example.demo.entity.ShoppingCart;
import com.example.demo.repository.ShoppingCartRepository;
import com.example.demo.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/cart")
public class ShoppingCartController {
    private final ShoppingCartService shoppingCartService;

    @Autowired
    public ShoppingCartController(ShoppingCartService shoppingCartService) {
        this.shoppingCartService = shoppingCartService;
    }

    @GetMapping("/get_all")
    public List<ShoppingCart> getAllCarts() {
        return shoppingCartService.getAllCarts();
    }

    @PostMapping("/create")
    public ResponseEntity<ShoppingCart> createCart(@RequestBody ShoppingCart cart) {
        ShoppingCart createdCart = shoppingCartService.createCart(cart);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCart);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShoppingCart> getCartById(@PathVariable Long id) {
        Optional<ShoppingCart> cart = shoppingCartService.getCartById(id);
        return cart.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCartById(@PathVariable Long id) {
        boolean isDeleted = shoppingCartService.deleteCartById(id);
        if (isDeleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

