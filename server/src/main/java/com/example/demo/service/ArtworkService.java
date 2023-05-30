package com.example.demo.service;

import com.example.demo.dao.Artwork;
import com.example.demo.repository.ArtworkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ArtworkService {
    private final ArtworkRepository repository;

    @Autowired
    public ArtworkService(ArtworkRepository repository){
        this.repository = repository;
    }

    public List<Artwork> getAllArtworks() {
        return repository.findAll();
    }

    public Optional<Artwork> getArtworkById(Long id) {
        return repository.findById(id);
    }

    public Artwork createArtwork(Artwork artwork) {
        return repository.save(artwork);
    }

    public void deleteArtwork(Long id) {
        repository.deleteById(id);
    }


}
