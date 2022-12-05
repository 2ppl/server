import { FastifyInstance, FastifyRequest } from 'fastify';
import { Schema } from '@2ppl/core/examples';
import { registerCrudRoutes } from '../../../crud';
import { useExampleService } from './di';

export async function plugin(fastifyInstance: FastifyInstance) {
  const crudService = useExampleService();

  const {
    crudSchema,
    entityApiConfig,
  } = Schema.Example;

  registerCrudRoutes({
    fastifyInstance,
    crudSchema,
    crudService,
  });

  fastifyInstance.route({
    method: entityApiConfig.superCreate.method as any,
    url: entityApiConfig.superCreate.url,
    schema: {},
    handler: async (request: FastifyRequest) => crudService.superCreate(
      request.body as Schema.Example.CreateEntity,
    ),
  });

  fastifyInstance.route({
    method: entityApiConfig.superUpdate.method as any,
    url: entityApiConfig.superUpdate.url,
    schema: {},
    handler: async (request: FastifyRequest) => crudService.superUpdate(
      request.body as Schema.Example.UpdateEntity,
      request.params as Schema.Example.EntityKey,
    ),
  });
}
