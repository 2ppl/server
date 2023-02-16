import { AnyCrudType, crudApiConfig } from '@2ppl/core/crud';
import { FastifyRequest, RouteOptions } from 'fastify';
import { CrudRouteProps } from '../common';

export function makeFindOneRoute<T extends AnyCrudType>(props: CrudRouteProps<T>): RouteOptions {
  return {
    method: crudApiConfig.findOne.method as any,
    url: crudApiConfig.findOne.url,
    schema: {
      tags: ['crud'],
      params: props.crudSchema.entityKey,
      response: {
        200: props.crudSchema.singleEntity,
      },
    },
    handler: async (request: FastifyRequest) => props.crudService.findOne(
      request.params as object,
    ),
  };
}
