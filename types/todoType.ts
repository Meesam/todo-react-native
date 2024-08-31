export interface TODO {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isDeleted: boolean;
  createdDate: string;
  lastModifiedDate: string | null;
}
