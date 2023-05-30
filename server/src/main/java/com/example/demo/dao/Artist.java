package com.example.demo.dao;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "artists")
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ARTIST_ID")
    private Long id;

    @Column(name = "ARTIST_NAME")
    private String name;

    @Column(name = "ARTIST_YEARS")
    private Long years;

    @Column(name = "ARTIST_BIO")
    private String bio;

    @Column(name = "ARTIST_GENRE")
    private String genre;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getYears() {
        return years;
    }

    public void setYears(Long years) {
        this.years = years;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    @Column(name = "ARTIST_NATIONALITY")
    private String nationality;
}
