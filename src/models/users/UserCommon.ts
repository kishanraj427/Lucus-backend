export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  lastLogin: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
