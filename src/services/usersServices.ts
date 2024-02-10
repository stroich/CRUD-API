import { NewUser, User, Users } from 'types/types';
import { v4 as uuid } from 'uuid';

class UsersService {
  private readonly users: Users;

  constructor() {
    this.users = [];
  }

  getAllUsers() {
    return this.users;
  }

  getUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  addUser({ username, age, hobbies }: NewUser) {
    const user = {
      id: uuid(),
      username,
      age,
      hobbies,
    };
    this.users.push(user);
    return user;
  }

  deleteUserById(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    this.users.splice(userIndex, 1);
  }

  updateUserById({ username, age, hobbies }: User, id: string) {
    const user = this.getUserById(id);
    user.username = username;
    user.age = age;
    user.hobbies = hobbies;
    return user;
  }
}

export const myUserServices = new UsersService();
