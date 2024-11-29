package com.example.NewsCollection.Entity;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Data
@Document(collection = "news")
public class News {
    @Id
    private String id;
    private String title;
    private String content;
    private String mediaUrl;
    private String createdAt;
    private String category; // New field for category
}
