#!/usr/bin/env node

export class App {
  static start() {
    return 'Hello World'
  }
}

if (module.parent == null) {
  console.log(App.start())
}
