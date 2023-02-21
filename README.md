# @2ppl/server

Server package helps integrate core api types and call with fastify adapters.

## 🌀 Structure

- api
- app
- crud

### 🔷 api

Includes server side parts of core/api module like `FastifyError`.

### 🔷 app

`App` adds module system to our application.

We can pack parts of code with same business logic in `AppModule`.

`AppModule` includes DB migration, fastify plugin and children modules.

Using `App` with `AppModule` seems like this:

```typescript
const app = new App({
  fastify,
  knex,
  modules: [
    Api.module.with([
      Page.module,
      Session.module,
    ]),
  ],
});
```

### 🔷 crud

Here is implementation of core `CrudService` which working with fastify and DB (or any other storage) adapter.

`FastifyCrudService` has `repository` property where we can add realisation of interface `CrudRepository` for create http handlers with CRUD interface.

`OrmCrudRepository` is preinstalled realisation of `CrudRepository` for working with SQL DB.

## 🌀 Dependencies

- `nodejs ^19`
- `yarn ^1.22`

## 🌀 Install

```shell
yarn install
```

## 🌀 Conventional Commits

https://www.conventionalcommits.org/en/v1.0.0/

### Project commit types

- `fix:` commit for `PATCH` bugs
- `feat:` commit for add `MINOR` features
- `BREAKING CHANGE:` commit for add `MAJOR` changes