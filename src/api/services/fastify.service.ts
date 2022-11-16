import { FastifyRequest } from 'fastify';

export abstract class FastifyService {
  protected request?: FastifyRequest;

  setRequest(request: FastifyRequest): void {
    this.request = request;
  }
}
