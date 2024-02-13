import { UsersService } from '../services/usersServices';
import { mockUser } from './mocks/user';

const id = '5daa4161-5c3c-40c0-9646-ca7cb3d4adfe';
const newUser = { ...mockUser, id };

jest.mock('uuid', () => {
  return {
    v4: () => id,
  };
});

describe('myUserServices tests', () => {
  let myUserServices;

  beforeEach(() => {
    myUserServices = new UsersService();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('getAllUsers: should return an empty array', () => {
    const users = myUserServices.getAllUsers();
    expect(users).toHaveLength(0);
  });

  test('should add a user', () => {
    const addedUser = myUserServices.addUser(mockUser);
    expect(addedUser).toEqual(newUser);
    expect(myUserServices.getAllUsers()).toEqual([newUser]);
  });

  test('should get a user by ID', () => {
    myUserServices.addUser(mockUser);
    const retrievedUser = myUserServices.getUserById(id);
    expect(retrievedUser).toEqual(newUser);
  });

  test('should delete a user by ID', () => {
    myUserServices.addUser(mockUser);
    myUserServices.deleteUserById(id);
    expect(myUserServices.getAllUsers()).toEqual([]);
  });

  test('should update a user by ID', () => {
    myUserServices.addUser(mockUser);
    const updatedUser = {
      ...newUser,
      username: 'updateduser',
    };
    const updatedUserFromService = myUserServices.updateUserById(updatedUser, id);
    expect(updatedUserFromService).toEqual(updatedUser);
    expect(myUserServices.getUserById(id)).toEqual(updatedUser);
  });
});
