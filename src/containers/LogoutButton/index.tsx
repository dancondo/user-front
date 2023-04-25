import React from "react";
import { Paper, Container, Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { NotificationCreators } from "../../store/notifications/notifications.actions";
import { UserCreators } from "../../store/users/users.actions";

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();

  const onSubmit = async () => {
    dispatch(UserCreators.logoutUser());
    dispatch(
      NotificationCreators.showNotification({
        title: "Sucess!",
        type: "success",
        message: "Logout successfully!",
      })
    );
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Container className="pa-2">
        <Grid
          gap={2}
          container
          justifyContent="center"
        >
          <Button variant="contained" onClick={onSubmit}>
            Logout
          </Button>
        </Grid>
      </Container>
    </Paper>
  );
};

export default LogoutButton;
