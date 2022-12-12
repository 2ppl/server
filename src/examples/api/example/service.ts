import { Schema } from '@2ppl/core/examples';
import { FastifyCrudService } from '../../../crud';

export class Service extends FastifyCrudService<Schema.Example.EntityCrudType> implements Schema.Example.EntityService {
  async superCreate(
    data: Schema.Example.EntityCrudType['createEntity'],
  ): Promise<Schema.Example.EntityCrudType['singleEntity']> {
    throw new Error('Not Implemented');
  }

  async superUpdate(
    data: Schema.Example.EntityCrudType['updateEntity'],
    params: Schema.Example.EntityCrudType['entityKey'],
  ): Promise<Schema.Example.EntityCrudType['singleEntity']> {
    throw new Error('Not Implemented');
  }
}
