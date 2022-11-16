export type Entity = {
  id: string;
  createdAt: number;
  updatedAt: number;
};

export type CreateEntity<T extends Entity> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateEntity<T extends Entity> = Partial<CreateEntity<T>>;

export type FilterValue = {
  equal?: string;
  like?: string;
  lt?: number;
  gt?: number;
} | string;

export type Filter<T extends Entity> = Partial<Record<keyof T, FilterValue>>;

export type Cursor = {
  limit?: number;
  offset?: number;
  order?: Array<{ field: string; direction: 'asc' | 'desc' }>;
};

export type ListedResult<T extends Entity> = {
  list: Array<T>;
  total: number;
};

export interface CrudRepository<T extends Entity> {
  create(entity: CreateEntity<T>): Promise<T>;

  update(entity: UpdateEntity<T>, filter: Filter<T>): Promise<T | null>;

  remove(filter: Filter<T>): Promise<boolean>;

  findOne(filter: Filter<T>): Promise<T | null>;

  findAll(cursor: Cursor, filter?: Filter<T>): Promise<ListedResult<T>>;
}
