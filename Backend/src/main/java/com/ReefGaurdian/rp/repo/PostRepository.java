package com.ReefGaurdian.rp.repo;

import com.ReefGaurdian.rp.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {
    Post findPostById(String id);

    List<Post> findByUserId(String userId);
}