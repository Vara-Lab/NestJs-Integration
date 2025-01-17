# NestJS Vara Network

Simple application with NestJS to execute commands and queries in smart contracts on Vara Network.

This contains a "general" service which exposes functions to read the status of a contract or to send messages to it, it can be used in any other module, in this example, it was used in `contract-calls`.

## Routes

- /green (POST): send a message to the contract: `green`
- /yellow (POST): send a message to the contract: `yellow`
- /red (POST): send a message to the contract: `red`
- /currentlight (Get): Reads the contract state


## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```