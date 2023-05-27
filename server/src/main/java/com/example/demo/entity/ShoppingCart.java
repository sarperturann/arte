package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class ShoppingCart {
    @SequenceGenerator(name = "CART_SEQUENCE", sequenceName = "CART_SEQUENCE", initialValue = 1, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CART_SEQUENCE")
    @Id
    private Long id;
    private Long userId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private long[] artworks;
}
