import { AppModule } from '../../../app';
import { migration } from './migration';
import { plugin } from './plugin';

const module = new AppModule('example', {
  migration,
  plugin,
});
