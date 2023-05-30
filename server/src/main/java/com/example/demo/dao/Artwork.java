package com.example.demo.dao;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "artworks")
public class Artwork {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ARTWORK_ID")
    private Long id;

    @Column(name = "TITLE")
    private String title;

    @Column(name = "PRICE")
    private BigDecimal price;

    @ManyToOne
    @JoinColumn(name = "ARTIST_ID")
    private Artist artist;

    @Column(name = "GENRE")
    private String genre;

    @Column(name = "DIMENSIONS")
    private String dimensions;

    @Column(name = "YEAR_CREATED")
    private Long yearCreated;

    @Column(name = "IS_SOLD")
    private Boolean isSold;
}
