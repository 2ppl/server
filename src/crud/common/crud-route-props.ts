import { AnyCrudType, CrudSchema } from '@2ppl/core/crud';
import { CrudFastifyService } from '../services';

export type CrudRouteProps<T extends AnyCrudType> = {
  crudSchema: CrudSchema;
  useCrudFastifyService: () => CrudFastifyService<T>;
};
