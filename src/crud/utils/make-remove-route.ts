import { AnyCrudType, crudApiConfig } from '@2ppl/core/crud';
import { CrudRouteProps } from '../common';
import { FastifyRequest, RouteOptions } from 'fastify';

export function makeRemoveRoute<T extends AnyCrudType>(props: CrudRouteProps<T>): RouteOptions {
  return {
    method: crudApiConfig.remove.method as any,
    url: crudApiConfig.remove.url,
    schema: {
      tags: ['crud'],
      params: props.crudSchema.entityKey,
    },
    handler: async (request: FastifyRequest) => props.crudService.remove(
      request.params as object,
    ),
  };
}
