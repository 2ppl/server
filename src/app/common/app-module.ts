import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { Knex } from 'knex';

export type AppModuleProps = {
  migration?: Knex.Migration;
  plugin?: FastifyPluginAsync;
  modules?: Array<AppModule>;
};

export class AppModule {
  private readonly prefix: string | null;
  private readonly migration?: Knex.Migration;
  private readonly plugin?: FastifyPluginAsync;
  private readonly modules?: Array<AppModule>;

  constructor(prefix: string | null, props: AppModuleProps) {
    console.log('AppModule constructor', prefix, props);

    this.prefix = prefix;
    this.migration = props.migration;
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
}
