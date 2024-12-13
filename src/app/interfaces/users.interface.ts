
export interface UsersInterface {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar: string;
}

export interface ResponseUsersInterface {
  users: UsersInterface[]
}
