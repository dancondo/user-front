import React from "react";
import { useAppDispatch } from "../../hooks/state.hooks";
import { useAppSelector } from "../../hooks/state.hooks";
import { Container, Grid, Portal } from "@mui/material";
import Toast from "../../components/Toast";
import { NotificationCreators } from "../../store/notifications/notifications.actions";

const ToastManager: React.FC = () => {
  const { notifications } = useAppSelector((state) => state.notifications);
  const dispatch = useAppDispatch();
  const onClose = (id: number) =>
    dispatch(NotificationCreators.closeNotification(id));

  return (
    <Portal>
      <Container
        data-testid="toast-manager"
        sx={{ padding: 2, position: "fixed", top: 0, right: 0 }}
        style={{ maxWidth: 300 }}
      >
        <Grid container gap={2}>
          {notifications.map((notification) => (
            <Grid
              item
              xs={12}
              key={notification.id}
              data-testid={`toast-${notification.id}`}
            >
              <Toast notification={notification} onClose={onClose} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Portal>
  );
};

export default ToastManager;
