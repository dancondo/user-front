import React from "react";
import LoginForm from "./containers/LoginForm";
import { Container, Grid } from "@mui/material";
import ToastManager from "./containers/ToastManager";
import { useAppSelector } from "./hooks/state.hooks";
import LogoutButton from "./containers/LogoutButton";

function App() {
  const { data } = useAppSelector((state) => state.users);

  return (
    <div>
      <Container>
        <Grid
          container
          style={{ height: "100vh" }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} md={4}>
            { data?.token ? <LogoutButton /> : <LoginForm /> }
            
          </Grid>
        </Grid>
      </Container>
      <ToastManager />
    </div>
  );
}

export default App;
