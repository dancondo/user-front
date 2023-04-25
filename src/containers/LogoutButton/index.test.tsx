import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import LogoutButton from "./";
import { renderWithProviders } from "../../utils/test.utils";
import { UserCreators } from "../../store/users/users.actions";
import { NotificationCreators } from "../../store/notifications/notifications.actions";

describe("Test logout button container", () => {
  const mockState = {
    users: {
      data: { id: "xpto", token: "xpto", username: "xpto" },
    },
    notifications: {
      notifications: [],
    },
  };

  it("renders logout button ", () => {
    const { container } = renderWithProviders(<LogoutButton />);

    expect(container.textContent).toBe("Logout");
  });

  it("should dispatch logout and show notification after click ", () => {
    
    const { getByText, store } = renderWithProviders(<LogoutButton />, {
      preloadedState: mockState, mockDispatch: true
    });

    fireEvent.click(getByText("Logout"));
    
    expect(store.dispatch).toHaveBeenNthCalledWith(1, UserCreators.logoutUser());
    expect(store.dispatch).toHaveBeenNthCalledWith(2, NotificationCreators.showNotification({
      title: "Sucess!",
      type: "success",
      message: "Logout successfully!",
    }));
  });

  it("should remove the user and add a notification after click ", () => {
    const { getByText, store } = renderWithProviders(<LogoutButton />, {
      preloadedState: mockState,
    });
    
    fireEvent.click(getByText("Logout"));

    expect(store.getState().users).toStrictEqual({ data: {} });
    expect(store.getState().notifications.notifications.length).toBeGreaterThanOrEqual(1);
  });
});
