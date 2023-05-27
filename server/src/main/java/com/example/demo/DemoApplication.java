package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({"com.example.demo", "com.example.demo.controller"})
@RequestMapping
public class DemoApplication {
  public static void main(String[] args) {
    SpringApplication.run(DemoApplication.class, args);
  }
}

// Add the controller.
@RestController
class HelloWorldController {
  @GetMapping("/")
  public String hello() {
    return "Welcome to our application!";
  }

}
