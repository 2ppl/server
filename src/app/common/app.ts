import { FastifyInstance } from 'fastify';
import { AppModule } from './app-module';
import { Knex } from 'knex';

export type AppProps = {
  fastifyInstance: FastifyInstance;
  knex: Knex;
  modules: Array<AppModule>;
};

export type AppStartProps = {
  port: number;
};

export class App {
  private readonly fastifyInstance: FastifyInstance;
  private readonly knex: Knex;
  private readonly modules: Array<AppModule>;

  constructor(props: AppProps) {
    console.log('App constructor props 1', props);

    this.fastifyInstance = props.fastifyInstance;
    this.knex = props.knex;
    this.modules = props.modules;
  }

  private async registerFastify(): Promise<void> {
    this.modules.forEach((module) => {
      module.registerFastify(this.fastifyInstance);
    });
  }

  private async migrate(): Promise<void> {
    const migrations: Record<string, Knex.Migration> = {};

    for (const module of this.modules) {
      const moduleMigrations = module.getMigrations();
      for (const key in moduleMigrations) {
        migrations[key] = moduleMigrations[key];
      }
    }

    console.log('APP MIGRATIONS >>>', migrations);
  }

  async init(): Promise<void> {
    await this.registerFastify();
    await this.migrate();
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
