export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  login: {
    access_token: string;
    refresh_token: string;
  };
};

export type AccountDetailResponse = {
  myProfile: {
    id: string;
    name: string;
    avatar: string;
  };
};
