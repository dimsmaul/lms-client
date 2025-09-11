import type { CreatedBy } from "./course-list.types";

export interface CourseDetailsResponse {
  message: string;
  data: CourseDetailsResponseData;
}

export interface CourseDetailsResponseData {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  passingScore: string;
  isPublic: boolean;
  status: string;
  trainers: CreatedBy[];
  createdBy: CreatedBy;
  participants: ParticipantsTypeUsers[];
  modules: Module[];
  isPublished: boolean;
  publishedAt: null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Module {
  id: string;
  title: string;
  content: string;
  order: string;
  items?: Module[];
  type?: string;
}

export interface ParticipantsTypeUsers {
  id: number;
  progress: number;
  user: CreatedBy;
}
