export type LoginUserRequest = {
  email: string;
  password: string;
};

export type LoginUserResponse = {
  authToken: string;
  refreshToken: string;
};
