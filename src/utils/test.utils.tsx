import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import type { AppStore, RootState } from "../store";
import userReducer from "../store/users/users.reducer";
import notificationReducer from "../store/notifications/notifications.reducer";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
  mockDispatch?: boolean;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { users: userReducer, notifications: notificationReducer },
      preloadedState,
    }),
    mockDispatch = false,
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const  Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    return <Provider store={store}>{children}</Provider>;
  }

  if (mockDispatch) {
    store.dispatch = jest.fn()
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
