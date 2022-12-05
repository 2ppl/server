import { AnyCrudType, crudApiConfig } from '@2ppl/core/crud';
import { FastifyRequest, RouteOptions } from 'fastify';
import { CrudRouteProps } from '../common';

export function makeCreateRoute<T extends AnyCrudType>(props: CrudRouteProps<T>): RouteOptions {
  return {
    method: crudApiConfig.create.method as any,
    url: crudApiConfig.create.url,
    schema: {
      body: props.crudSchema.createEntity,
      response: {
        200: props.crudSchema.singleEntity,
      },
    },
    handler: async (request: FastifyRequest) => props.crudService.create(
      request.body as object,
    ),
  };
}
