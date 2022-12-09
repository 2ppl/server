import {
  CreateEntity,
  CrudRepository,
  Cursor,
  Entity,
  Filter,
  ListedResult,
  UpdateEntity,
} from './crud-repository';

export class OrmCrudRepository<T extends Entity> implements CrudRepository<T> {
  private readonly mc: any;

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

  async update(entity: UpdateEntity<T>, filter: Filter<T>): Promise<T | null> {
    console.log('OrmCrudRepository UPDATE');
    console.log('entity', entity);
    console.log('filter', filter);
    const now = (new Date()).toISOString();
    const result = await this.mc.query().findById(filter['id']).patch({
      ...entity,
      updatedAt: now,
    });
    console.log('result', result);
    return result;
  }

  async remove(filter: Filter<T>): Promise<boolean> {
    console.log('OrmCrudRepository REMOVE');
    console.log('filter', filter);
    const result = await this.mc.query().deleteById(filter['id']);
    console.log('result', result);
    return result;
  }

  async findOne(filter: Filter<T>): Promise<T | null> {
    console.log('OrmCrudRepository FIND ONE');
    console.log('filter', filter);
    const result = await this.mc.query().findById(filter['id']);
    console.log('result', result);
    return result;
  }

  async findAll(cursor: Cursor, filter?: Filter<T>): Promise<ListedResult<T>> {
    console.log('OrmCrudRepository FIND ALL');
    console.log('cursor', cursor);
    console.log('filter', filter);
    const result = await this.mc.query();
    console.log('result', result);
    return {
      list: result,
      total: result.length,
    };
  }
}
