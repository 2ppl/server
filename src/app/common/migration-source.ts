import { Knex } from 'knex';

export class MigrationSource {
  private readonly migrations: Record<string, Knex.Migration>;

  constructor(migrations: Record<string, Knex.Migration>) {
    this.migrations = migrations;
  }

  async getMigrations(): Promise<Array<string>> {
    const keys = Object.keys(this.migrations).sort((a, b) => Number(a) - Number(b));

    console.log('Migration keys:', keys);

    return keys;
  }

  getMigrationName(name: string): string {
    return name;
  }

  getMigration<T extends keyof Record<string, Knex.Migration>>(name: T): any {
    return this.migrations[name];
  }
}
