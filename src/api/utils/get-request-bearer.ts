import { FastifyRequest } from 'fastify';

export const getRequestBearer = (request: FastifyRequest) =>
  (request.headers['authorization'] || '').replace('Bearer ', '') || undefined;
