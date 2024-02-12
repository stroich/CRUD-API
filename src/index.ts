import dotenv from 'dotenv';
import { createHorizontalScaling } from './servers/createHorizontalScaling';
import { createMyServer } from './servers/createMyServer';

dotenv.config();

const PORT = process.env.PORT;

export const isMulti = process?.argv.some((element) => element.startsWith('--isMulti'))
  ? true
  : false;

if (isMulti) {
  createHorizontalScaling(PORT);
} else {
  createMyServer(PORT, false);
}
