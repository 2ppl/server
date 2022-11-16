import { AnyCrudType, CrudSchema } from '@2ppl/core/crud';
import { FastifyInstance } from 'fastify';
import { CrudFastifyService } from '../services';
import { makeFindOneRoute } from './make-find-one-route';
import { makeFindAllRoute } from './make-find-all-route';
import { makeCreateRoute } from './make-create-route';
import { makeUpdateRoute } from './make-update-route';
import { makeRemoveRoute } from './make-remove-route';

export type RegisterCrudRoutesProps<T extends AnyCrudType> = {
  fastifyInstance: FastifyInstance;
  crudSchema: CrudSchema;
  useCrudFastifyService: () => CrudFastifyService<T>;
};

export function registerCrudRoutes<T extends AnyCrudType>(props: RegisterCrudRoutesProps<T>) {
  const {
    fastifyInstance,
    crudSchema,
    useCrudFastifyService,
  } = props;

  fastifyInstance.route(
    makeFindOneRoute({
      crudSchema,
      useCrudFastifyService,
    }),
  );

  fastifyInstance.route(
    makeFindAllRoute({
      crudSchema,
      useCrudFastifyService,
    }),
  );

  fastifyInstance.route(
    makeCreateRoute({
      crudSchema,
      useCrudFastifyService,
    }),
  );

  fastifyInstance.route(
    makeUpdateRoute({
      crudSchema,
      useCrudFastifyService,
    }),
  );

  fastifyInstance.route(
    makeRemoveRoute({
      crudSchema,
      useCrudFastifyService,
    }),
  );
}
