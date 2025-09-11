import type { MetaTypes } from "@/types";

// import { Pagination } from "@/types";
export interface UserResponse {
  message: string;
  status: number;
  data: UserResponseData;
}

export interface UserResponseData {
  items: UserResponseItem[];
  meta: MetaTypes;
}

export interface UserResponseItem {
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

// export interface Untitled1 {
//     message: string;
//     data:    Data;
// }

// export interface Data {
//     items: Item[];
//     meta:  Meta;
// }

// export interface Item {
// id:                      string;
// email:                   string;
// username:                string;
// firstName:               string;
// lastName:                string;
// profilePicture:          string;
// isActive:                boolean;
// isEmailVerified:         boolean;
// isSuperAdmin:            boolean;
// isAllowedToCreateCourse: boolean;
// createdAt:               Date;
// updatedAt:               Date;
// }

// export interface Meta {
//     total:      number;
//     page:       number;
//     limit:      number;
//     totalPages: number;
// }
