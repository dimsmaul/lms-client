import type { MetaTypes } from "@/types";

export interface CourseListTypes {
  message: string;
  data: CourseListData;
}

export interface CourseListData {
  items: CourseListItem[];
  meta: MetaTypes;
}

export interface CourseListItem {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  passingScore: string;
  isPublic: boolean;
  createdBy: CourseListItemCreatedBy | null;
  isPublished: boolean;
  publishedAt: null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseListItemCreatedBy {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}
