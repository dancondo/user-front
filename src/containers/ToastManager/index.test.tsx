import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import ToastManager from "./";
import { renderWithProviders } from "../../utils/test.utils";
import { UserCreators } from "../../store/users/users.actions";
import { NotificationCreators } from "../../store/notifications/notifications.actions";
import { RootState } from "../../store";

describe("Test Toast Manager", () => {
  const mockNotification: NotificationDto = {
    id: 1,
    message: "message",
    title: "title",
    type: "success",
  };

  const mockState: RootState = {
    users: {
      data: {} as UserDto,
    },
    notifications: {
      notifications: [mockNotification],
    },
  };

  it("renders toast manager ", () => {
    const { getByTestId } = renderWithProviders(<ToastManager />);

    expect(getByTestId("toast-manager")).toBeVisible();
  });

  it("renders toasts in the state", () => {
    const { getByTestId } = renderWithProviders(<ToastManager />, {
      preloadedState: mockState,
    });

    expect(getByTestId(`toast-${mockNotification.id}`)).toBeVisible();
  });

  it("should dispatch close notification after click ", () => {
    const { getByLabelText, store } = renderWithProviders(<ToastManager />, {
      preloadedState: mockState,
      mockDispatch: true,
    });

    fireEvent.click(getByLabelText("close"));

    expect(store.dispatch).toBeCalledWith(
      NotificationCreators.closeNotification(mockNotification.id)
    );
  });

  it("should remove the notification after click ", () => {
    const { queryByTestId, getByLabelText, store } = renderWithProviders(
      <ToastManager />,
      {
        preloadedState: mockState,
      }
    );

    fireEvent.click(getByLabelText("close"));

    expect(
      store.getState().notifications.notifications.length
    ).toBeLessThanOrEqual(0);

    expect(queryByTestId(`toast-${mockNotification.id}`)).toBeNull();
  });
});
