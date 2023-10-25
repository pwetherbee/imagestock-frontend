import React, { useEffect, useState } from "react";
import api from "../lib/api";
import { ImageList, ImageListItem } from "@mui/material";

export interface Image {
  id: string;
  url: string;
  prompt: string;
}

export default function ImagesList() {
  const [images, setImages] = useState<Image[]>([]);
  useEffect(() => {
    const fetchImages = async () => {
      const { data } = await api.get("/images");
      return setImages(data);
    };
    fetchImages();
  }, []);

  return (
    <div>
      <ImageList variant="quilted" rowHeight={300}>
        {images.map((image) => (
          <ImageListItem key={image.id}>
            <img
              src={process.env.REACT_APP_API_URL + image.url}
              alt={image.prompt}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
