import React, { useEffect, useState } from "react";
import api from "../lib/api";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { useImages } from "../hooks/useImages";

export interface Image {
  id: string;
  url: string;
  prompt: string;
}

export default function ImagesList({ searchValue }: { searchValue: string }) {
  const { data: imgList } = useImages(searchValue);
  const [cols, setCols] = useState<number>(4);

  if (!imgList) return <div>Loading...</div>;

  return (
    <div>
      <Stack
        sx={{
          mt: 3,
        }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography>Number of columns</Typography>
        <Slider
          sx={{
            maxWidth: 300,
          }}
          aria-label="Temperature"
          value={cols}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={6}
          onChange={(e, value) => setCols(value as number)}
        />
      </Stack>

      <ImageList variant="quilted" rowHeight={"auto"} cols={cols}>
        {imgList?.reverse().map((image: Image) => (
          <ImageListItem key={image.id}>
            <img
              style={{
                borderRadius: "10px",
              }}
              src={process.env.REACT_APP_API_URL + image.url}
              alt={image.prompt}
            />
            <ImageListItemBar title={image.prompt} />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
