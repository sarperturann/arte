package com.example.demo.controller;

import com.example.demo.service.CloudStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/images")
public class ImageController {

    private final CloudStorageService cloudStorageService;

    @Autowired
    public ImageController(CloudStorageService cloudStorageService) {
        this.cloudStorageService = cloudStorageService;
    }

    @GetMapping("/all")
    public List<String> getAllImageUrls() {
        return cloudStorageService.getAllImageUrls();
    }
}
