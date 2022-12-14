import { BaseCrudType, CrudFindAllQuery, CrudFindAllResult, CrudService } from '@2ppl/core/crud';
import { FastifyError } from '../../api';
import { CrudRepository } from '../repositories';

export abstract class FastifyCrudService<T extends BaseCrudType> implements CrudService<T> {
  protected repository?: CrudRepository<any>;

  async create(data: T['createEntity']): Promise<T['singleEntity']> {
    if (this.repository) {
      return this.repository.create(data);
    }
    throw new Error('Not Implemented');
  }

  async update(data: T['updateEntity'], params: T['entityKey']): Promise<T['singleEntity']> {
    if (this.repository) {
      const entity = await this.repository.update(data, (params as any).id);
      if (entity) return entity;
      throw new FastifyError('No Entity', 404);
    }
    throw new Error('Not Implemented');
  }

  async remove(params: T['entityKey']): Promise<void> {
    if (this.repository) {
      const deleted = await this.repository.remove((params as any).id);
      if (deleted) return;
      throw new FastifyError('No Entity', 404);
    }
    throw new Error('Not Implemented');
  }

  async findOne(params: T['entityKey']): Promise<T['singleEntity']> {
    if (this.repository) {
      const entity = await this.repository.findOne((params as any).id);
      if (entity) return entity;
      throw new FastifyError('No Entity', 404);
    }
    throw new Error('Not Implemented');
  }

  async findAll(query?: CrudFindAllQuery): Promise<CrudFindAllResult<T['listedEntity']>> {
    if (this.repository) {
      return this.repository.findAll(query || {});
    }
    throw new Error('Not Implemented');
  }
}
