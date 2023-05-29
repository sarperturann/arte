package com.example.demo.service;

import com.example.demo.dao.Order;
import com.example.demo.dao.ShoppingCart;
import com.example.demo.pubsub.OrderPublisher;
import com.example.demo.pubsub.OrderSubscriber;
import com.example.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class OrderService {
    private final OrderRepository repository;

    @Autowired
    public OrderService(OrderRepository repository){
        this.repository = repository;
    }

    public List<Order> getAllOrders() {
        return repository.findAll();
    }

    public void triggerOrder(ShoppingCart shoppingCart) throws IOException, ExecutionException, InterruptedException {
        Order order = convertOrder(shoppingCart);
        createOrder(order);
        OrderPublisher.orderPublish("Order received:" + order.toString());
        OrderSubscriber.subscribeOrder();
    }

    public Order convertOrder(ShoppingCart shoppingCart) {
        // TODO: Add logic for payment calculation after artworks are ready
        // TODO: Add logic for address fetching after user is ready
        Order order = new Order();
        order.setUserId(shoppingCart.getUserId());
        order.setOrderDate(LocalDateTime.now());
        order.setAddress("Test Street, 3rd Avenue, Vocalism 5");
        order.setPaymentId(0L);
        order.setTotalAmount(0L);
        order.setStatus("ACCEPTED");

        return order;
    }

    public void createOrder(Order order) {
        repository.save(order);
    }
}
