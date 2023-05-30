package com.example.demo.controller;

import com.example.demo.dao.ShoppingCart;
import com.example.demo.repository.ShoppingCartRepository;
import com.example.demo.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/api/v1/carts")
public class ShoppingCartController {
    private final ShoppingCartService service;

    @Autowired
    public ShoppingCartController(ShoppingCartService service) {
        this.service = service;
    }

    @GetMapping("/get_all")
    public List<ShoppingCart> getAllCarts() {
        return service.getAllCarts();
    }

    @PostMapping("/create")
    public ResponseEntity<ShoppingCart> createCart(@RequestBody ShoppingCart cart) {
        ShoppingCart createdCart = service.createCart(cart);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCart);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShoppingCart> getCartById(@PathVariable Long id) {
        Optional<ShoppingCart> cart = service.getCartById(id);
        return cart.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ShoppingCart> getCartByUserId(@PathVariable Long userId) {
        Optional<ShoppingCart> cart = shoppingCartRepository.findByUserId(userId);
        return cart.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCartById(@PathVariable Long id) {
        boolean isDeleted = service.deleteCartById(id);
        if (isDeleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{cartId}/add_artwork")
    public ResponseEntity<Void> addArtworkToCart(@PathVariable Long cartId, @RequestParam Long artworkId) {
        boolean isAdded = service.addArtwork(cartId, artworkId);
        if (isAdded) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{cartId}/remove_artwork")
    public ResponseEntity<Void> removeArtworkFromCart(@PathVariable Long cartId, @RequestParam Long artworkId) {
        boolean isDeleted = service.removeArtwork(cartId, artworkId);
        if (isDeleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

