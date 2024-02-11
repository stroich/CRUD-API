import { myServer } from 'index';
import supertest from 'supertest';
import { mockUser, mockWrongUser } from './mocks/user';
import { myUserServices } from 'services/usersServices';
import * as uuid from 'uuid';

const request = supertest.agent(myServer);
const id = '5daa4161-5c3c-40c0-9646-ca7cb3d4adfe';
const newUser = { ...mockUser, id };

jest.mock('uuid');

describe('1 scenario: getAllUsers', () => {
  beforeEach(() => {
    jest.spyOn(uuid, 'v4').mockReturnValue(id);
    jest.spyOn(uuid, 'validate').mockReturnValue(true);
  });

  it('should get all users', async () => {
    const result = await request.get(`/api/users`);
    expect(result.body).toEqual([]);
    expect(result.status).toBe(200);
  });

  it('should get 404 status', async () => {
    const result = await request.get(`/`);
    expect(result.status).toBe(404);
  });
});

describe('2 scenario: createUser', () => {
  beforeEach(() => {
    jest.spyOn(uuid, 'v4').mockReturnValue(id);
    jest.spyOn(uuid, 'validate').mockReturnValue(true);
  });

  afterAll(() => {
    myUserServices.deleteUserById(id);
  });

  it('should get new user', async () => {
    const result = await request.post(`/api/users`).send(mockUser);
    expect(result.body).toEqual(newUser);
    expect(result.status).toBe(201);
  });

  it('should get the status 400 if required fields are missing', async () => {
    const result = await request.post(`/api/users`).send(mockWrongUser);
    expect(result.status).toBe(400);
    expect(result.body).toEqual({ message: 'Missing required fields' });
  });

  it('should get the status 400 if there are unnecessary fields', async () => {
    const result = await request.post(`/api/users`).send(newUser);
    expect(result.status).toBe(400);
    expect(result.body).toEqual({ message: 'Unnecessary fields present' });
  });
});

describe('3 scenario: getUser', () => {
  afterAll((done) => {
    myServer.close(done);
  });

  it('should get user', async () => {
    jest.spyOn(uuid, 'v4').mockReturnValue(id);
    jest.spyOn(uuid, 'validate').mockReturnValue(true);
    await request.post(`/api/users`).send(mockUser);
    const result = await request.get(`/api/users/${id}`);
    expect(result.body).toEqual(newUser);
    expect(result.status).toBe(200);
  });

  it('should get 404 status', async () => {
    jest.spyOn(uuid, 'v4').mockReturnValue(id);
    jest.spyOn(uuid, 'validate').mockReturnValue(true);
    await request.post(`/api/users`).send(mockUser);
    const result = await request.get(`/api/users/eb9aa3df-b002-420a-af23-7032b29b5138`);
    expect(result.body).toEqual({ message: 'User not found' });
    expect(result.status).toBe(404);
  });

  it('should get 400 status', async () => {
    jest.spyOn(uuid, 'v4').mockReturnValue(id);
    jest.spyOn(uuid, 'validate').mockReturnValue(false);
    await request.post(`/api/users`).send(mockUser);
    const result = await request.get(`/api/users/1`);
    expect(result.body).toEqual({ message: 'Invalid userId' });
    expect(result.status).toBe(400);
  });
});
