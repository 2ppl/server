import { AnyCrudType, CrudSchema, CrudService } from '@2ppl/core/crud';

export type CrudRouteProps<T extends AnyCrudType> = {
  crudSchema: CrudSchema;
  crudService: CrudService<T>;
};
