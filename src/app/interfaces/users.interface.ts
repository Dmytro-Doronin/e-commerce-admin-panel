
interface UsersInterface {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar: string;
}

interface ResponseUsersInterface {
  users: UsersInterface[]
}
