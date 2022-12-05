import { FastifyInstance } from 'fastify';
import { AppModule } from './app-module';

export type AppProps = {
  fastifyInstance: FastifyInstance;
  modules: Array<AppModule>;
};

export type AppStartProps = {
  port: number;
};

export class App {
  private readonly fastifyInstance: FastifyInstance;
  private readonly modules: Array<AppModule>;

  constructor(props: AppProps) {
    console.log('App constructor props 1', props);

    this.fastifyInstance = props.fastifyInstance;
    this.modules = props.modules;

    this.init();
  }

  private init(): void {
    this.modules.forEach((module) => {
      module.registerFastify(this.fastifyInstance);
    });
  }

  async start(props: AppStartProps): Promise<void> {
    console.log('App start');

    await this.fastifyInstance.listen({ port: props.port });

    const address = this.fastifyInstance.server.address();
    const port = typeof address === 'string' ? address : address?.port;

    console.log('address >>>', address);
    console.log('port >>>', port);
  }
}
