package com.im.moobeing.domain.radish.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.im.moobeing.global.error.ErrorCode;
import com.im.moobeing.global.error.exception.BadRequestException;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;
import java.util.UUID;

@Service
public class S3Service {

    @Autowired
    private AmazonS3 s3Client;

    @Value("${MINIO_BUCKET}")
    private String bucketName;

    public String uploadFile(MultipartFile file, String fileName) {
        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType()); // MIME 타입 설정

            s3Client.putObject(new PutObjectRequest(bucketName, fileName, file.getInputStream(), metadata));
            URL fileUrl = s3Client.getUrl(bucketName, fileName);
            return fileUrl.toString();
        } catch (IOException e) {
            throw new RuntimeException("File upload failed", e);
        }
    }

    public String uploadImage(MultipartFile file) {
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new BadRequestException(ErrorCode.BAD_REQUEST);
        }

        String extension = FilenameUtils.getExtension(file.getOriginalFilename());
        if (extension == null || extension.isEmpty()) {
            throw new BadRequestException(ErrorCode.BAD_REQUEST);
        }

        String fileName = UUID.randomUUID().toString() + "." + extension;

        return uploadFile(file, fileName);
    }
}