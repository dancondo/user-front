import { UserCreators } from './users.actions';
import usersReducer, { INITIAL_STATE } from './users.reducer';

const mockUser: UserDto = {
  id: "xpto",
  token: "xpto",
  username: 'john.coltrane',
}

describe('Users reducers', () => {
  test('should return the initial state', () => {
    expect(usersReducer(undefined, { type: '' })).toEqual(INITIAL_STATE)
  })
  
  test('should handle a user login', () => {
    const previousState = INITIAL_STATE
    expect(
      usersReducer(previousState, UserCreators.loginUser(mockUser))
    ).toEqual({
      ...previousState,
      data: mockUser
    })
  })
  
  test('should logout an user', () => {
    const previousState = { ...INITIAL_STATE, user: mockUser }
    expect(
      usersReducer(previousState, UserCreators.logoutUser())
    ).toEqual({
      ...previousState,
      data: {}
    })
  })
})