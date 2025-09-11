import type { MetaTypes } from "@/types";

// import { Pagination } from "@/types";
export interface CourseResponse {
  message: string;
  data: CourseResponseData;
}

export interface CourseResponseData {
  items: CourseResponseItem[];
  meta: MetaTypes;
}

export interface CourseResponseItem {
  id: string;
  title: string;
  description: string;
  isPublic: boolean;
  status: string;
  // trainers: CreatedBy[];
  // participants: CreatedBy[];
  createdBy: CreatedBy;
  isPublished: boolean;
  createdAt: Date;
  trainersCount: number;
  participantsCount: number;
  modulesCount: number;
}

export interface CreatedBy {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
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
// id:           string;
// title:        string;
// description:  string;
// isPublic:     boolean;
// status:       string;
// trainers:     any[];
// createdBy:    CreatedBy;
// participants: null;
// isPublished:  boolean;
// }

// export interface CreatedBy {
//     id:        string;
//     email:     string;
//     username:  string;
//     firstName: string;
//     lastName:  string;
// }

// export interface Meta {
//     total:      number;
//     page:       number;
//     limit:      number;
//     totalPages: number;
// }

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
