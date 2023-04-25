import { createActions } from 'reduxsauce'

export interface LoginUserAction {
  user: UserDto;
}

const { Types, Creators } = createActions({
  loginUser: ['user'],
  // LOGOUT
  logoutUser: []
}, { prefix: 'users' })

export {
  Types as UserTypes,
  Creators as UserCreators
}