import { FastifyInstance, FastifyRequest } from 'fastify';
import { Schema } from '@2ppl/core/examples';
import { registerCrudRoutes } from '../../../crud';
import { useExampleService } from './di';

export async function plugin(fastifyInstance: FastifyInstance) {
  const {
    crudSchema,
    entityApiConfig,
  } = Schema.Example;

  registerCrudRoutes({
    fastifyInstance,
    crudSchema,
    useCrudFastifyService: useExampleService,
  });

  fastifyInstance.route({
    method: entityApiConfig.superCreate.method as any,
    url: entityApiConfig.superCreate.url,
    schema: {},
    handler: async (request: FastifyRequest) => {
      const service = useExampleService();
      service.setRequest(request);
      return service.superCreate(
        request.body as Schema.Example.CreateEntity,
      );
    },
  });

  fastifyInstance.route({
    method: entityApiConfig.superUpdate.method as any,
    url: entityApiConfig.superUpdate.url,
    schema: {},
    handler: async (request: FastifyRequest) => {
      const service = useExampleService();
      service.setRequest(request);
      return service.superUpdate(
        request.body as Schema.Example.UpdateEntity,
        request.params as Schema.Example.EntityKey,
      );
    },
  });
}
