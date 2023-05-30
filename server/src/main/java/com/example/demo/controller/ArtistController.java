package com.example.demo.controller;

import com.example.demo.dao.Artist;
import com.example.demo.service.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.Optional;

import java.util.List;
@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/api/v1/artist")
public class ArtistController {
    private final ArtistService service;

    @Autowired
    public ArtistController(ArtistService service) {
        this.service = service;
    }

    @GetMapping("/get_all")
    public List<Artist> getAllArtists() {
        return service.getAllArtists();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Artist> getArtistById(@PathVariable Long id) {
        Optional<Artist> artist = service.getArtistById(id);
        return artist.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public Artist createArtist(@RequestBody Artist artist) {
        return service.createArtist(artist);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Artist> updateArtist(@PathVariable Long id, @RequestBody Artist artist) {
        Optional<Artist> updatedArtist = service.getArtistById(id);
        if (updatedArtist.isPresent()) {
            Artist result = service.updateArtist(id, artist);
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArtist(@PathVariable Long id) {
        Optional<Artist> artist = service.getArtistById(id);
        if (artist.isPresent()) {
            service.deleteArtist(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
