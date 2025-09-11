export interface ModuleItemsType {
  message: string;
  data: ModuleItemsTypeData;
}

export interface ModuleItemsTypeData {
  id: string;
  title: string;
  content: string;
  type: string;
  sourceUrl: string;
  createdAt: Date;
  updatedAt: Date;
  module: ModuleItemsTypeModuleElement[];
}

export interface ModuleItemsTypeModuleElement {
  id: string;
  title: string;
  content: string;
  order: string;
  items?: ModuleItemsTypeModuleElement[];
  type?: "1" | "2" | "3" | "4";
}
