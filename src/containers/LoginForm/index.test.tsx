import React, { useState as useStateMock } from "react";
import { fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "./";
import { renderWithProviders } from "../../utils/test.utils";
import { UserCreators } from "../../store/users/users.actions";
import { NotificationCreators } from "../../store/notifications/notifications.actions";
import { RootState } from "../../store";
import * as userServices from "../../services/users/users.services";
import { act } from "react-dom/test-utils";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

const mockSetState = jest.fn();
const mockSetUsername = jest.fn();
const mockSetPassword = jest.fn();

const mockError = "Error!";

const mockUser: UserDto = {
  id: "xpto",
  token: "xpto",
  username: "johncoltrane",
};

const successNotification = {
  title: "Welcome!",
  type: "success",
  message: "User logged in successfully",
};

const ErrorNotification = {
  title: "Error!",
  type: "error",
  message: mockError,
}

const mockState: RootState = {
  users: {
    data: {} as UserDto,
  },
  notifications: {
    notifications: [],
  },
};

describe("Test Login Form", () => {
  beforeEach(() => {
    // @ts-ignore
    useStateMock.mockImplementation((init: any) => [init, mockSetState]);
  });

  it("renders login form ", () => {
    const { getByTestId } = renderWithProviders(<LoginForm />);

    expect(getByTestId("login-form")).toBeVisible();
    expect(getByTestId("username-input")).toBeVisible();
    expect(getByTestId("password-input")).toBeVisible();
    expect(getByTestId("login-form-submit-button")).toBeVisible();
  });

  it("should update username on input", () => {
    // @ts-ignore
    useStateMock.mockImplementation((init: any) => [init, mockSetUsername]);

    const inputUsername = "username";
    const { getByTestId } = renderWithProviders(<LoginForm />);

    const inputEl =
      getByTestId("username-input").getElementsByTagName("input")[0];

    act(() => {
      fireEvent.change(inputEl, { target: { value: inputUsername } });
    });

    expect(mockSetUsername).toHaveBeenCalledWith(inputUsername);
  });

  it("should update password on input", () => {
    // @ts-ignore
    useStateMock.mockImplementation((init: any) => [init, mockSetPassword]);

    const inputPassword = "password";
    const { getByTestId } = renderWithProviders(<LoginForm />);

    const inputEl =
      getByTestId("password-input").getElementsByTagName("input")[0];

    act(() => {
      fireEvent.change(inputEl, { target: { value: inputPassword } });
    });

    expect(mockSetPassword).toHaveBeenCalledWith(inputPassword);
  });

  it("should call login function after submit", () => {
    const sucessLogin = jest
      .spyOn(userServices, "login")
      .mockImplementation(() => Promise.resolve(mockUser));

    const { getByTestId } = renderWithProviders(<LoginForm />);

    act(() => {
      fireEvent.click(getByTestId("login-form-submit-button"));
    });

    expect(sucessLogin).toBeCalled();
  });

  it("should call login function with username and password after submit", () => {
    const sucessLogin = jest
      .spyOn(userServices, "login")
      .mockImplementation(() => Promise.resolve(mockUser));

    const { getByTestId } = renderWithProviders(<LoginForm />);

    act(() => {
      fireEvent.click(getByTestId("login-form-submit-button"));
    });

    expect(sucessLogin).toBeCalledWith({ username: "", password: "" });
  });

  it("should dispatch loginUser and show notification function with userDto after successfully call login", async () => {
    const sucessLogin = jest
      .spyOn(userServices, "login")
      .mockImplementation(() => Promise.resolve(mockUser));

    const { getByTestId, store } = renderWithProviders(<LoginForm />, {
      preloadedState: mockState,
      mockDispatch: true,
    });

    act(() => {
      fireEvent.click(getByTestId("login-form-submit-button"));
    });

    await waitFor(() => {
      expect(sucessLogin).toBeCalled();
    });

    expect(store.dispatch).toHaveBeenNthCalledWith(
      1,
      UserCreators.loginUser(mockUser)
    );
    expect(store.dispatch).toHaveBeenNthCalledWith(
      2,
      NotificationCreators.showNotification(successNotification)
    );
  });

  it("should dispatch show notification function after error call login", async () => {
    const errorLogin = jest
      .spyOn(userServices, "login")
      .mockImplementation(() => {
        throw { message: mockError};
      });

    const { getByTestId, store } = renderWithProviders(<LoginForm />, {
      preloadedState: mockState,
      mockDispatch: true,
    });

    act(() => {
      fireEvent.click(getByTestId("login-form-submit-button"));
    });

    await waitFor(() => {
      expect(errorLogin).toBeCalled();
    });

    expect(store.dispatch).toHaveBeenCalledWith(
      NotificationCreators.showNotification(ErrorNotification)
    );
  });
});
