package com.example.NewsCollection.Service;

import com.example.NewsCollection.Entity.News;
import com.example.NewsCollection.Repositoy.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
@Service
public class NewsService {

    @Autowired
    private NewsRepository newsRepository;

    private static final String UPLOAD_DIR = "uploads/";

    // Save news and media
    public News saveNews(String title, String content, String category, MultipartFile media) throws IOException {
        News news = new News();
        news.setTitle(title);
        news.setContent(content);
        news.setCategory(category); // Save category

        if (media != null) {
            String fileName = System.currentTimeMillis() + "_" + media.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR + fileName);
            Files.createDirectories(path.getParent()); // Create directories if not exist
            media.transferTo(path);
            news.setMediaUrl("/" + UPLOAD_DIR + fileName); // Save media URL in the news entry
        }

        return newsRepository.save(news);
    }

    // Get all news
    public List<News> getAllNews() {
        return newsRepository.findAll();
    }

    public List<News> getNewsByCategory(String category) {
        return newsRepository.findByCategory(category);
    }
}
