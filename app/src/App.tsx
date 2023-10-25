import "./App.css";
import Layout from "./components/Layout/Layout";
import {
  Button,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ImagesList from "./components/ImagesList";
import { useEffect, useState } from "react";
import api from "./lib/api";
import { enqueueSnackbar, closeSnackbar } from "notistack";
import { useImages } from "./hooks/useImages";
import { Close } from "@mui/icons-material";

function App() {
  const { mutate } = useImages("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [prompt, setPrompt] = useState<string>(searchValue);

  const handleGenerate = async () => {
    console.log("generating snackbar");
    const key = enqueueSnackbar(
      `Generating image for prompt "${prompt.slice(0, 20)}"...`,
      {
        variant: "info",
        persist: true,
      }
    );
    const { data } = await api.post("/generate", { prompt });
    setSearchValue("");
    closeSnackbar(key);
    mutate();
    enqueueSnackbar("Image generated!", { variant: "success" });
  };

  const handleSearch = async () => {
    setSearchValue(prompt);
  };

  useEffect(() => {
    mutate();
  }, [mutate, searchValue]);

  return (
    <Layout>
      <div className="App">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <Container>
            <Stack
              spacing={2}
              sx={{
                mt: "20%",
              }}
            >
              <Typography variant="h1">ImageStock 📷</Typography>
              <TextField
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt"
              />

              <Stack direction={"row"} justifyContent={"center"} spacing={2}>
                <Button size="large" variant="contained" onClick={handleSearch}>
                  Search
                </Button>
                <Button
                  onClick={handleGenerate}
                  variant="contained"
                  color="secondary"
                  size="large"
                >
                  Generate
                </Button>
              </Stack>
            </Stack>
          </Container>
          {searchValue && (
            <Typography variant="h4" sx={{ mt: 4 }}>
              Search results for: {searchValue}{" "}
              <IconButton onClick={() => setSearchValue("")}>
                <Close />
              </IconButton>
            </Typography>
          )}
          <ImagesList searchValue={searchValue} />
        </div>
      </div>
    </Layout>
  );
}

export default App;
