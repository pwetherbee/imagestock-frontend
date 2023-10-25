import "./App.css";
import Layout from "./components/Layout/Layout";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import ImagesList from "./components/ImagesList";

function App() {
  return (
    <Layout>
      <div className="App">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <Container>
            <Stack sx={{}} spacing={2}>
              <Typography variant="h1">ImgStock</Typography>
              <TextField placeholder="Enter your prompt" />

              <Stack direction={"row"} justifyContent={"center"} spacing={2}>
                <Button variant="contained">Search</Button>
                <Button variant="contained" color="secondary">
                  Generate
                </Button>
              </Stack>
            </Stack>
          </Container>
          <ImagesList />
        </div>
      </div>
    </Layout>
  );
}

export default App;
