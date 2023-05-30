package com.example.demo.controller;

import com.example.demo.dao.Order;
import com.example.demo.dao.ShoppingCart;
import com.example.demo.service.OrderService;
import com.example.demo.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/api/v1/order")
public class OrderController {
    private final OrderService service;
    private final ShoppingCartService cartService;

    @Autowired
    public OrderController(OrderService service, ShoppingCartService cartService) {
        this.service = service;
        this.cartService = cartService;
    }

    @GetMapping("/get_all")
    public List<Order> getAllOrders() {
        return service.getAllOrders();
    }

    @GetMapping("/trigger")
    public ResponseEntity ordered(@RequestParam Long id) throws IOException, ExecutionException, InterruptedException {
        Optional<ShoppingCart> shoppingCart = cartService.getCartById(id);

        if (shoppingCart.isPresent()) {
            service.triggerOrder(shoppingCart.get());
            return ResponseEntity.ok("Request Triggered");
        } else {
            return ResponseEntity.badRequest().body("ShoppingCart not found for id: " + id);
        }
    }


}
