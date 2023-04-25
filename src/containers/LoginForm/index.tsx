import React, { ChangeEvent, useState } from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Paper,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Container,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../../services/users/users.services";
import { NotificationCreators } from "../../store/notifications/notifications.actions";
import getErrorMessage from "../../utils/get-error-message";
import { UserCreators } from "../../store/users/users.actions";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onChangeUsername = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setUsername(event.target.value);

  const onChangePassword = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setPassword(event.target.value);

  const onClickShowPassword = () => setShowPassword(!showPassword);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const user = await login({ username, password });
      dispatch(UserCreators.loginUser(user));
      dispatch(
        NotificationCreators.showNotification({
          title: "Welcome!",
          type: "success",
          message: "User logged in successfully",
        })
      );
    } catch (err: any) {
      dispatch(
        NotificationCreators.showNotification({
          title: "Error!",
          type: "error",
          message: getErrorMessage(err),
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ padding: 2 }} data-testid="login-form">
      <Container className="pa-2">
        <Grid gap={2} container>
          <Grid item xs={12}>
            <Typography textAlign="center" variant="h6">
              Login
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="username-input">Username</InputLabel>
              <Input
                type="text"
                value={username}
                id="username-input"
                data-testid="username-input"
                onChange={onChangeUsername}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="password-input">Password</InputLabel>
              <Input
                value={password}
                id="password-input"
                onChange={onChangePassword}
                data-testid="password-input"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={onClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid container justifyContent="end">
            <Button data-testid="login-form-submit-button" variant="contained" onClick={onSubmit} disabled={loading}>
              {loading ? "Loading" : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default LoginForm;
