package de.jamarob.photowall.service;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import de.jamarob.photowall.model.Photo;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary = new Cloudinary();


    public Photo uploadImage(File image) throws IOException {
       Map response= cloudinary.uploader().upload(image, ObjectUtils.emptyMap());
        String id= response.get("public_id").toString();
        String url= response.get("url").toString();
        return Photo.builder().id(id).url(url).build();
    }

}
