package com.ReefGaurdian.rp.service;

import com.ReefGaurdian.rp.DTO.ShareDTO;
import com.ReefGaurdian.rp.model.SharePostModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SharePostService {
    List<SharePostModel> getSharePosts();


    SharePostModel createSharePost(ShareDTO shareDTO);
    void deleteSharedPost(String id);

    List<SharePostModel> getSharePostsByuser(String id);
}
