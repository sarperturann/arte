package com.example.demo.service;

import com.example.demo.dao.Artwork;
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
    private final ArtworkService artworkService;

    @Autowired
    public OrderService(OrderRepository repository, ArtworkService artworkService){
        this.repository = repository;
        this.artworkService = artworkService;
    }

    public List<Order> getAllOrders() {
        return repository.findAll();
    }

    public void triggerOrder(ShoppingCart shoppingCart) throws IOException, ExecutionException, InterruptedException {
        Order order = convertOrder(shoppingCart);
        createOrder(order);
        OrderPublisher.orderPublish("*** ORDER RECEIVED: " + order.toString());
        OrderSubscriber.subscribeOrder();
    }

    public Order convertOrder(ShoppingCart shoppingCart) {
        Order order = new Order();
        order.setUserId(shoppingCart.getUserId());
        order.setOrderDate(LocalDateTime.now());
        order.setAddress("Bilkent University Main Campus");
        order.setPaymentId(43L);

        long totalAmount = 0L;
        long[] artworks = shoppingCart.getArtworks();
        for (long id : artworks) {
            Artwork artwork = artworkService.getArtworkById(id).orElse(null);
            if(artwork != null) {
                totalAmount += artwork.getPrice().longValue();
            }
        }
        order.setTotalAmount(totalAmount);
        order.setStatus("ACCEPTED");

        return order;
    }

    public void createOrder(Order order) {
        repository.save(order);
    }
}
