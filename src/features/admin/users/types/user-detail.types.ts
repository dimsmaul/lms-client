export interface UserDetailsResponse {
  message: string;
  data: UserDetailsResponseData;
}

export interface UserDetailsResponseData {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  isActive: boolean;
  isEmailVerified: boolean;
  isSuperAdmin: boolean;
  isAllowedToCreateCourse: boolean;
  createdAt: Date;
  updatedAt: Date;
}
