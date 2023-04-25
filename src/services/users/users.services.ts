import axios from "axios";

export const USERS_API_BASE_URL =
  process.env.REACT_APP_USERS_API_BASE_URL || "";

export const login = async (user: UserRequestDto): Promise<UserDto> => {
  const { data } = await axios.post(`${USERS_API_BASE_URL}/auth/login`, user);
  return data;
};
