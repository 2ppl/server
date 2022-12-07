import { FastifyInstance } from 'fastify';
import { Knex } from 'knex';
import { AppModule } from './app-module';
import { MigrationSource } from './migration-source';

export type AppProps = {
  fastify: FastifyInstance;
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
  private readonly migrationSource: MigrationSource;

  constructor(props: AppProps) {
    this.fastifyInstance = props.fastify;
    this.knex = props.knex;
    this.modules = props.modules;

    const migrations: Record<string, Knex.Migration> = {};

    for (const module of this.modules) {
      const moduleMigrations = module.getMigrations();
      for (const key in moduleMigrations) {
        migrations[key] = moduleMigrations[key];
      }
    }

    this.migrationSource = new MigrationSource(migrations);
  }

  private async registerFastify(): Promise<void> {
    for (const module of this.modules) {
      module.registerFastify(this.fastifyInstance);
    }
  }

  private async migrate(): Promise<void> {
    const migrate = await this.knex.migrate.latest({
      migrationSource: this.migrationSource,
    });

    console.log('Migrate success!', migrate)
  }

  async init(): Promise<void> {
    await this.registerFastify();
    await this.migrate();
  }

  async start(props: AppStartProps): Promise<void> {
    await this.fastifyInstance.listen({ port: props.port });

    const address = this.fastifyInstance.server.address();
    const port = typeof address === 'string' ? address : address?.port;

    console.log('address >>>', address);
    console.log('port >>>', port);
  }
}
