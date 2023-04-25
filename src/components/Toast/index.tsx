import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, AlertTitle, IconButton } from "@mui/material";

interface ToastProps {
  notification: NotificationDto;
  onClose: (id: number) => void;
}

const Toast: React.FC<ToastProps> = ({ notification, onClose }) => {
  useEffect(() => {
    if (notification.timeout) {
      setTimeout(() => {
        onClose(notification.id)
      }, notification.timeout)
    }
  }, [notification, onClose])
  
  return (
  <Alert
    severity={notification.type}
    action={
      <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        onClick={() => {
          onClose(notification.id);
        }}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
    }
  >
    <AlertTitle>{notification.title}</AlertTitle>
    {notification.message}
  </Alert>
)};

export default Toast;
