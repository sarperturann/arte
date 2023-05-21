package com.example.demo.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
public class CloudStorageService {

    private Storage storage;
    private String bucketName;
    private String folderName;

    @PostConstruct
    public void initializeStorage() throws IOException {
        String keyPath = "arte-service-account-key.json";

        // Create a storage client object using the service account key file
        storage = StorageOptions.newBuilder()
                .setCredentials(GoogleCredentials.fromStream(new FileInputStream(keyPath)))
                .build()
                .getService();

        bucketName = "arte-386819.appspot.com";
        folderName = "temp-images";
    }

    public List<String> getAllImageUrls() {
        List<String> imageUrlList = new ArrayList<>();
        String folderPrefix = folderName + "/";

        Iterable<Blob> blobs = storage.list(bucketName, Storage.BlobListOption.prefix(folderPrefix),
                Storage.BlobListOption.currentDirectory()).iterateAll();
        for (Blob blob : blobs) {
            if(!blob.getName().equals(folderPrefix))
                imageUrlList.add(getImageUrl(blob.getName()));
        }

        return imageUrlList;
    }

    public String getImageUrl(String imageName) {
        String encodedImageName = URLEncoder.encode(imageName, StandardCharsets.UTF_8);

        return String.format("https://storage.googleapis.com/%s/%s", bucketName, encodedImageName);
    }
}
