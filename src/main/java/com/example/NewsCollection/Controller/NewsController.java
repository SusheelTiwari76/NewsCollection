package com.example.NewsCollection.Controller;
import com.example.NewsCollection.Entity.News;
import com.example.NewsCollection.Service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@RestController
@RequestMapping("/api/news")
public class NewsController {

    @Autowired
    private NewsService newsService;

    // Endpoint to upload news (with media)
    @PostMapping("/upload")
    public News uploadNews(@RequestParam String title,
                           @RequestParam String content,
                           @RequestParam String category, // Added category
                           @RequestParam(required = false) MultipartFile media) throws IOException {
        return newsService.saveNews(title, content, category, media); // Pass category to the service
    }

    // Endpoint to get all news
    @GetMapping
    public List<News> getAllNews(@RequestParam(required = false) String category) {
        if (category != null && !category.isEmpty()) {
            return newsService.getNewsByCategory(category);
        }
        return newsService.getAllNews();
    }
}