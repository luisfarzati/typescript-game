#!/usr/bin/env node
import { createInterface } from 'readline'
import { Game, GameError } from './Game'
import { parseTextCommand, InvalidCommandError } from './TextCommands'

const VERSION = process.env.VERSION || ''

const main = () => {
  let context = {
    game: new Game()
  }

  console.log(`This is a TypeScript game ${VERSION}\n`)
  console.log(`Type "help" for a list of commands; "quit" or ctrl-d to exit.`)

  const readline = createInterface(process.stdin)
  process.stdout.write('> ')

  readline.on('line', (line) => {
    try {
      const { command, args } = parseTextCommand(line)
      context = command(context, ...args)
    }
    catch (error) {
      if (error instanceof InvalidCommandError) {
        console.log(`${error.message}. Try "help" for a list of commands.`)
      }
      else throw error
    }
  })

  readline.on('line', () => {
    process.stdout.write('> ')
  })
}

main()
