export interface SigninResponse {
  message: string;
  status: number;
  data: SigninResponseData;
}

export interface SigninResponseData {
  token: string;
  user: SigninResponseUser;
}

export interface SigninResponseUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profile: string;
  isSuperAdmin: boolean;
  isAllowedToCreateCourse: boolean;
}
