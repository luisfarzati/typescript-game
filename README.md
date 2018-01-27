## typescript-game
### design 1

An exercise for a TypeScript meetup.

### Prerequisites

* Node 8+
* TypeScript 2.6+
* yarn 1.3+
* optionally, Docker if you want to build+run in a container

### Development

```bash
$ yarn            # will install deps
$ yarn start      # will start the game
$ yarn test       # will run unit tests
$ yarn test:watch # will run unit tests in watch mode
$ yarn build      # will build with tsc and output to ./dist
```

### Run in a container

```bash
$ ./scripts/run-docker
```

Will build the Docker image and run the app in a container. Useful if you just want to try the game without installing any deps.
