export interface User {
  id: string;
  uid: string;
  username: string;
  nickname: string;
  phone?: string;
  email?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  status: number;
  role: string;
  permissions: string[];
}
export interface AppUser extends User {
  access_token: string;
}
