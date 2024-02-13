import { User } from '../types/types';

export function validateUser(obj: any): obj is User {
  const requiredKeys = ['username', 'age', 'hobbies'];
  const hasAllRequiredKeys = requiredKeys.every((key) => key in obj);
  if (!hasAllRequiredKeys) {
    return false;
  }

  const usernameIsValid = typeof obj.username === 'string';
  const ageIsValid = typeof obj.age === 'number';
  const hobbiesIsValid =
    Array.isArray(obj.hobbies) && obj.hobbies.every((hobby) => typeof hobby === 'string');

  return usernameIsValid && ageIsValid && hobbiesIsValid;
}
