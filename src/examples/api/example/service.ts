import { Schema } from '@2ppl/core/examples';
import { FastifyCrudService } from '../../../crud';

export class Service extends FastifyCrudService<Schema.Example.EntityCrudType> implements Schema.Example.EntityService {
  async superCreate(
    data: Schema.Example.CreateEntity,
  ): Promise<Schema.Example.SingleEntity> {
    throw new Error('Not Implemented');
  }

  async superUpdate(
    data: Schema.Example.UpdateEntity,
    params: Schema.Example.EntityKey,
  ): Promise<Schema.Example.SingleEntity> {
    throw new Error('Not Implemented');
  }
}
