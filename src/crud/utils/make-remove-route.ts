import { AnyCrudType, crudApiConfig } from '@2ppl/core/crud';
import { CrudRouteProps } from '../common';
import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';

export function makeRemoveRoute<T extends AnyCrudType>(props: CrudRouteProps<T>): RouteOptions {
  return {
    method: crudApiConfig.remove.method as any,
    url: crudApiConfig.remove.url,
    schema: {
      params: props.crudSchema.entityKey,
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const crudFastifyService = props.useCrudFastifyService();
        crudFastifyService.setRequest(request);
        return crudFastifyService.remove(
          request.params as object,
        );
      } catch (e: any) {
        reply.code(e?.code || 500);
        throw e;
      }
    },
  };
}
