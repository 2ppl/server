import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { Knex } from 'knex';

export type AppModuleProps = {
  migrations?: Record<string, Knex.Migration>;
  plugin?: FastifyPluginAsync;
  modules?: Array<AppModule>;
};

export class AppModule {
  private readonly prefix: string | null;
  private readonly migrations?: Record<string, Knex.Migration>;
  private readonly plugin?: FastifyPluginAsync;
  private readonly modules?: Array<AppModule>;

  constructor(prefix: string | null, props: AppModuleProps) {
    console.log('AppModule constructor', prefix, props);

    this.prefix = prefix;
    this.migrations = props.migrations;
    this.plugin = props.plugin;
    this.modules = props.modules;
  }

  registerFastify(fastifyInstance: FastifyInstance): void {
    if (this.plugin || this.modules) {
      const scope = async (scopeFastifyInstance: FastifyInstance) => {
        if (this.modules) {
          this.modules.forEach((module) => {
            module.registerFastify(scopeFastifyInstance);
          });
        }

        if (this.plugin) {
          scopeFastifyInstance.register(this.plugin);
        }
      };

      fastifyInstance.register(scope, { prefix: this.prefix || undefined });
    }
  }

  getMigrations(): Record<string, Knex.Migration> {
    const migrations: Record<string, Knex.Migration> = {};

    if (this.migrations) {
      for (const key in this.migrations) {
        migrations[key] = this.migrations[key];
      }
    }

    if (this.modules) {
      for (const module of this.modules) {
        const moduleMigrations = module.getMigrations();
        for (const key in moduleMigrations) {
          migrations[key] = moduleMigrations[key];
        }
      }
    }

    return migrations;
  }
}
