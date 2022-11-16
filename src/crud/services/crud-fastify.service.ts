import { BaseCrudType, CrudFindAllQuery, CrudFindAllResult, CrudService } from '@2ppl/core/crud';
import { FastifyError, FastifyService } from '../../api';
import { CrudRepository } from '../repositories';

export abstract class CrudFastifyService<T extends BaseCrudType> extends FastifyService implements CrudService<T> {
  protected repository?: CrudRepository<any>;

  async create(data: T['createEntity']): Promise<T['singleEntity']> {
    if (this.repository) {
      return this.repository.create(data);
    }
    throw new Error('Not Implemented');
  }

  async update(data: T['updateEntity'], params: T['entityKey']): Promise<T['singleEntity']> {
    if (this.repository) {
      const entity = await this.repository.update(data, params);
      if (entity) return entity;
      throw new FastifyError('No Entity', 404);
    }
    throw new Error('Not Implemented');
  }

  async remove(params: T['entityKey']): Promise<void> {
    if (this.repository) {
      const deleted = await this.repository.remove(params);
      if (deleted) return;
      throw new FastifyError('No Entity', 404);
    }
    throw new Error('Not Implemented');
  }

  async findOne(params: T['entityKey']): Promise<T['singleEntity']> {
    if (this.repository) {
      const entity = await this.repository.findOne(params);
      if (entity) return entity;
      throw new FastifyError('No Entity', 404);
    }
    throw new Error('Not Implemented');
  }

  async findAll(query?: CrudFindAllQuery<T>): Promise<CrudFindAllResult<T>> {
    if (this.repository) {
      const {
        filter,
        ...cursor
      } = query || {};
      return this.repository.findAll({
        limit: cursor.limit,
        offset: cursor.offset,
        order: cursor.order && [cursor.order],
      }, filter);
    }
    throw new Error('Not Implemented');
  }
}
