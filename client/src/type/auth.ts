export interface IAuth {
  role: string;
  token: string;
}

export interface IUser {
  u_id: number;
  u_name: string;
  u_age: number;
  u_gender: string;
  u_email: string;
  u_birthday: string;
  u_address: string;
  u_avatar: string;
  google_id: string | null;
  facebook_id: string | null;
  u_phone: string;
  u_role: string;
  username: string;
  token_remember: string | null;
}

export interface IUserLoginRequest {
  username: string;
  password: string;
}

export interface IUserLoginResponse {
  user: IUser | any;
  token: string | null;
}

export interface IUserRegisterRequest {
  name: string;
  username: string;
  password: string;
  email: string;
  gender: string;
  birthday: string;
  phone: string;
  address: string;
}
