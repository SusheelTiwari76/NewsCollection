package com.example.NewsCollection.Repositoy;

import com.example.NewsCollection.Entity.News;

import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
@Repository
public interface NewsRepository extends MongoRepository<News, String> {
    List<News> findByCategory(String category); // Method to find news by category
}

