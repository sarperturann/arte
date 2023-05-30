package com.example.demo.controller;

import com.example.demo.dao.Artwork;
import com.example.demo.service.ArtworkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/api/v1/artwork")
public class ArtworkController {
    private final ArtworkService service;

    @Autowired
    public ArtworkController(ArtworkService service) {
        this.service = service;
    }

    @GetMapping("/get_all")
    public ResponseEntity<List<Artwork>> getAllArtworks() {
        return ResponseEntity.ok(service.getAllArtworks());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Artwork> getArtworkById(@PathVariable Long id) {
        return service.getArtworkById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public ResponseEntity<Artwork> createArtwork(@RequestBody Artwork artwork) {
        return ResponseEntity.ok(service.createArtwork(artwork));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteArtwork(@PathVariable Long id) {
        service.deleteArtwork(id);
        return ResponseEntity.ok().build();
    }

}
