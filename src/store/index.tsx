import {
  combineReducers,
  configureStore,
  PreloadedState
} from '@reduxjs/toolkit'
import usersReducer, { UserState } from "./users/users.reducer";
import notificationsReducer, { NotificationsState } from "./notifications/notifications.reducer";


const reducers = combineReducers({
  users: usersReducer,
  notifications: notificationsReducer,
})

const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: reducers,
    preloadedState
  })
}

export type RootState = ReturnType<typeof reducers>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export default setupStore