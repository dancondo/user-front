import * as userServices from "./users.services";

import axios from 'axios';

const mockUser = {
  id: "xpto",
  token: "xpto",
  username: "JohnColtrane",
};

const mockError = "Error!";

describe("Users Services", () => {
  describe("Login User", () => {
    it("should return an users dto", async () => {
      const postRequest = jest
        .spyOn(axios, "post")
        .mockImplementation(() => Promise.resolve({ data: mockUser }));

      const users = await userServices.login({
        username: "JohnColtrane",
        password: "xpto",
      });

      expect(users).toEqual(mockUser);
      postRequest.mockClear();
    });

    it("should throw an error if api call fails", async () => {
      const postRequest = jest
        .spyOn(axios, "post")
        .mockImplementation(() => { throw new Error(mockError) });

      try {
        await userServices.login({
          username: "JohnColtrane",
          password: "xpto",
        });
      } catch (err: any) {
        expect(err.message).toEqual(mockError);
      }

      postRequest.mockClear();
    });
  });
});
