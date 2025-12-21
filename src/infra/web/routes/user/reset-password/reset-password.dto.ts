export type ResetPasswordRequest = {
  token: string;
  newPassword: string;
};

export type ResetPasswordResponse = {
  message: string;
};
