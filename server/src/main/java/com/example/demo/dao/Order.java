package com.example.demo.dao;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "orders")
public class Order {
    @SequenceGenerator(name = "ORDER_SEQUENCE", sequenceName = "ORDER_SEQUENCE", initialValue = 1, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ORDER_SEQUENCE")
    @Id
    private Long id;
    private Long userId;
    private LocalDateTime orderDate;
    private String address;
    private Long paymentId;
    private Long totalAmount;
    private Status status;

    public String getStatus() {
        return this.status.name();
    }

    public void setStatus(String status) {
        this.status = Status.valueOf(status);
    }
}



enum Status {
    ACCEPTED,
    PREPARATION,
    SHIPPED,
    DELIVERED,
    REFUND
}
