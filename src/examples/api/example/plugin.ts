import { FastifyInstance, FastifyRequest } from 'fastify';
import { Schema } from '@2ppl/core/examples';
import { registerCrudRoutes } from '../../../crud';
import { useExampleService } from './di';

export async function plugin(fastifyInstance: FastifyInstance) {
  const crudService = useExampleService();

  registerCrudRoutes({
    fastifyInstance,
    crudSchema: Schema.Example.crudSchema,
    crudService,
  });

  fastifyInstance.route({
    method: Schema.Example.entityApiConfig.superCreate.method as any,
    url: Schema.Example.entityApiConfig.superCreate.url,
    schema: {
      body: Schema.Example.crudSchema.createEntity,
      response: {
        200: Schema.Example.crudSchema.singleEntity,
      },
    },
    handler: async (request: FastifyRequest) => crudService.superCreate(
      request.body as Schema.Example.EntityCrudType['createEntity'],
    ),
  });

  fastifyInstance.route({
    method: Schema.Example.entityApiConfig.superUpdate.method as any,
    url: Schema.Example.entityApiConfig.superUpdate.url,
    schema: {
      body: Schema.Example.crudSchema.updateEntity,
      params: Schema.Example.crudSchema.entityKey,
      response: {
        200: Schema.Example.crudSchema.singleEntity,
      },
    },
    handler: async (request: FastifyRequest) => crudService.superUpdate(
      request.body as Schema.Example.EntityCrudType['updateEntity'],
      request.params as Schema.Example.EntityCrudType['entityKey'],
    ),
  });
}
