export type Entity = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateEntity<T extends Entity> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateEntity<T extends Entity> = Partial<CreateEntity<T>>;

export type FilterValue = {
  equal?: string;
  like?: string;
  lte?: string;
  gte?: string;
  lt?: string;
  gt?: string;
} | string;

export type Filter<T extends Entity> = Partial<Record<keyof T, FilterValue>>;

export type ListedQuery<T extends Entity> = {
  limit?: number;
  offset?: number;
  order?: {
    field: string;
    direction: 'asc' | 'desc';
  };
  filter?: Filter<T>;
};

export type ListedResult<T extends Entity> = {
  list: Array<T>;
  total: number;
};

export interface CrudRepository<T extends Entity> {
  create(entity: CreateEntity<T>): Promise<T>;

  update(entity: UpdateEntity<T>, id: string): Promise<T | null>;

  remove(id: string): Promise<boolean>;

  findOne(id: string): Promise<T | null>;

  findAll(query: ListedQuery<T>): Promise<ListedResult<T>>;
}
