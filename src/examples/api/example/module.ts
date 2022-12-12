import { AppModule } from '../../../app';
import { migrations } from './migrations';
import { plugin } from './plugin';

const module = new AppModule('example', {
  migrations,
  plugin,
});
