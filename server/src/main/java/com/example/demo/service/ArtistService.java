package com.example.demo.service;

import com.example.demo.dao.Artist;
import com.example.demo.repository.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;


import java.util.List;

@Service
public class ArtistService {
    private final ArtistRepository repository;

    @Autowired
    public ArtistService(ArtistRepository repository){
        this.repository = repository;
    }

    public Optional<Artist> getArtistById(Long id) {
        return repository.findById(id);
    }

    public List<Artist> getAllArtists() {
        return repository.findAll();
    }

    public Artist createArtist(Artist artist) {
        return repository.save(artist);
    }

    public Artist updateArtist(Long id, Artist artist) {
        artist.setId(id);
        return repository.save(artist);
    }

    public void deleteArtist(Long id) {
        repository.deleteById(id);
    }



}
