import { AnyCrudType, crudApiConfig } from '@2ppl/core/crud';
import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import { CrudRouteProps } from '../common';

export function makeFindOneRoute<T extends AnyCrudType>(props: CrudRouteProps<T>): RouteOptions {
  return {
    method: crudApiConfig.findOne.method as any,
    url: crudApiConfig.findOne.url,
    schema: {
      params: props.crudSchema.entityKey,
      response: {
        200: props.crudSchema.singleEntity,
      },
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const crudFastifyService = props.useCrudFastifyService();
        crudFastifyService.setRequest(request);
        return crudFastifyService.findOne(
          request.params as object,
        );
      } catch (e: any) {
        reply.code(e?.code || 500);
        throw e;
      }
    },
  };
}
