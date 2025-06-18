import { Group, Text, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useState } from "react";
import axios from "axios";

export default function ImageDropzone({ props }) {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
 

  const VIDEO_MIME_TYPE = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime",
  "video/x-msvideo",
];
  function handleImageDrop(files) {
    console.log("Dropped Files:", files);
    
    files.forEach((file) => {
      if (!(file instanceof File)) {
        console.error("Invalid file type detected:", file);
      }
    });
  
    setImages((prev) => [...prev, ...files]);
  }

  async function handlePost() {
    if (images.length === 0) {
      console.error("No images to upload!");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", "a");
    formData.append("community", "a");
    formData.append("date", new Date().toISOString());
  
    images.forEach((file) => {
      formData.append("images[]", file); 
    });
  
    // Debug FormData
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    try {
      setUploading(true);
      // const response = await axios.post("http://localhost:3002/posts", formData);
      const response = await axios.post("http://wrottit-servers.onrender.com/posts", formData);
       
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <Dropzone
        onDrop={handleImageDrop}
        onReject={(files) => console.log("Rejected files:", files)}
        maxSize={100 * 1024 ** 2}
        accept={[...IMAGE_MIME_TYPE, ...VIDEO_MIME_TYPE]}
        {...props}
      >
        <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
          <Dropzone.Accept>
            <IconUpload
              style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-blue-6)" }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-red-6)" }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-dimmed)" }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            {images.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                height="100em"
                width="100em"
                style={{ margin: "1em" }}
                alt="preview"
              />
            ))}
          </div>
        </Group>
      </Dropzone>
      <button onClick={handlePost} disabled={uploading}>
        {uploading ? "Uploading..." : "Post Images"}
      </button>
    </div>
  );
}
