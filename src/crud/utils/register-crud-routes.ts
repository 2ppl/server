import { AnyCrudType, CrudSchema, CrudService } from '@2ppl/core/crud';
import { FastifyInstance } from 'fastify';
import { makeFindOneRoute } from './make-find-one-route';
import { makeFindAllRoute } from './make-find-all-route';
import { makeCreateRoute } from './make-create-route';
import { makeUpdateRoute } from './make-update-route';
import { makeRemoveRoute } from './make-remove-route';

export type RegisterCrudRoutesProps<T extends AnyCrudType> = {
  fastifyInstance: FastifyInstance;
  crudSchema: CrudSchema;
  crudService: CrudService<T>;
};

export function registerCrudRoutes<T extends AnyCrudType>(props: RegisterCrudRoutesProps<T>) {
  const {
    fastifyInstance,
    crudSchema,
    crudService,
  } = props;

  fastifyInstance.route(
    makeFindOneRoute({
      crudSchema,
      crudService,
    }),
  );

  fastifyInstance.route(
    makeFindAllRoute({
      crudSchema,
      crudService,
    }),
  );

  fastifyInstance.route(
    makeCreateRoute({
      crudSchema,
      crudService,
    }),
  );

  fastifyInstance.route(
    makeUpdateRoute({
      crudSchema,
      crudService,
    }),
  );

  fastifyInstance.route(
    makeRemoveRoute({
      crudSchema,
      crudService,
    }),
  );
}
