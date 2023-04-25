import { UserCreators, UserTypes } from './users.actions';

const mockUser = {
  id: "xpto",
  token: "xpto",
  username: 'JohnColtrane'
}

describe('User Actions', () => {

  describe('LOGIN USER', () => {
    it('success login should return the expected action', () => {
      expect(UserCreators.loginUser()).toEqual({
        type: UserTypes.LOGIN_USER
      });
    });
  
    it('success login should return the expected action with NO error', () => {
      expect(UserCreators.loginUser(mockUser)).toEqual({
        type: UserTypes.LOGIN_USER,
        user: mockUser
      });
    });
  })

  describe('LOGOUT_USER', () => {
    it('logout user should return the expected action', () => {
      expect(UserCreators.logoutUser()).toEqual({
        type: UserTypes.LOGOUT_USER
      });
    });
  
  })

})