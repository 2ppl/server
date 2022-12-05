import { AppModule } from '../../../app';
import { migration } from './migration';
import { plugin } from './plugin';

// test up major version

const module = new AppModule('example', {
  migration,
  plugin,
});
