import {
  CreateEntity,
  CrudRepository,
  Entity,
  ListedQuery,
  ListedResult,
  UpdateEntity,
} from './crud-repository';

export class OrmCrudRepository<T extends Entity> implements CrudRepository<T> {
  protected readonly mc: any;

  constructor(mc: any) {
    this.mc = mc;
  }

  async create(entity: CreateEntity<T>): Promise<T> {
    console.log('OrmCrudRepository CREATE');
    console.log('entity', entity);
    const now = (new Date()).toISOString();
    const result = await this.mc.query().insert({
      ...entity,
      createdAt: now,
      updatedAt: now,
    });
    console.log('result', result);
    return result;
  }

  async update(entity: UpdateEntity<T>, id: string): Promise<T | null> {
    console.log('OrmCrudRepository UPDATE');
    console.log('entity', entity);
    console.log('id', id);
    const now = (new Date()).toISOString();
    const result = await this.mc.query().findById(id).patch({
      ...entity,
      updatedAt: now,
    });
    console.log('result', result);
    if (result > 0) {
      return this.mc.query().findById(id);
    }
    return null;
  }

  async remove(id: string): Promise<boolean> {
    console.log('OrmCrudRepository REMOVE');
    console.log('id', id);
    const result = await this.mc.query().deleteById(id);
    console.log('result', result);
    return result > 0;
  }

  async findOne(id: string): Promise<T | null> {
    console.log('OrmCrudRepository FIND ONE');
    console.log('id', id);
    const result = await this.mc.query().findById(id);
    console.log('result', result);
    return result;
  }

  async findAll(query: ListedQuery<T>): Promise<ListedResult<T>> {
    console.log('OrmCrudRepository FIND ALL JKE');
    console.log('query', query);

    const request = this.mc.query();
    const count = this.mc.query().count();

    const offset = Number(query?.offset);

    if (offset) {
      request.offset(offset);
    }

    const limit = Number(query?.limit);

    if (limit) {
      request.limit(limit);
    }

    const list = await request;
    const total = await count;

    console.log('list', list);
    console.log('total', total[0].count);

    return {
      list,
      total: total[0]?.count,
    };
  }
}
