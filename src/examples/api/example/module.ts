import { AppModule } from '../../../app';
import { migrations } from './migrations';
import { plugin } from './plugin';

// test up major version 2

const module = new AppModule('example', {
  migrations,
  plugin,
});
