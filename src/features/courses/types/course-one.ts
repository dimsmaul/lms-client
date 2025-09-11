import type { CourseListItemCreatedBy } from "./course-list";

export interface CourseOneType {
  message: string;
  data: CourseOneTypeData;
}

export interface CourseOneTypeData {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  passingScore: string;
  isPublic: boolean;
  trainers: any[];
  createdBy: CourseListItemCreatedBy;
  modules: CourseOneTypeModule[];
  isPublished: boolean;
  publishedAt: null;
  status: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseOneTypeModule {
  id: string;
  title: string;
  content: string;
  order: string;
  items?: CourseOneTypeModule[];
  type?:  "1" | "2" | "3" | "4";
}
