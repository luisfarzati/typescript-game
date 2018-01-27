import { Game } from './Game'

export class InvalidCommandError extends Error {
  constructor (name: string) {
    super(`Invalid command: "${name}"`)
  }
}

export const parseTextCommand = (line: string = '') => {
  const [name, ...args] = line.trim().toLowerCase().split(/\s+/)
  if (!name) return noopCommand

  const command = textInterfaceCommands.find(cmd => cmd.names.has(name))
  if (!command) throw new InvalidCommandError(name)

  return command.handler.bind(undefined, ...args)
}

type CommandContext = {
  game: Game
}

const spaces = (len: number) => (
  [...Array(len).keys()].map(() => '').join(' ')
)

const rpad = (s: string, len: number) => (
  `${s}${spaces(len)}`.slice(0, len)
)

const helpCommand = (ctx: CommandContext) => {
  const nameDescription =
    textInterfaceCommands.map(cmd => ({
      names: [...cmd.names.keys()].join(', '),
      description: cmd.description
    }))
  const lines =
    nameDescription.map(nd => `${rpad(nd.names, 30)}${nd.description}`)

  console.log(lines.join('\n').concat('\n'))
  return ctx
}

const quitCommand = () => {
  console.log('Quitting the game, hope you enjoyed it!')
  process.exit(0)
}

const newGameCommand = (ctx: CommandContext) => {
  ctx.game = new Game()
  console.log('Started new game.')
  return ctx
}

const spawnCharacterCommand = (ctx: CommandContext) => {
  const spawn = ctx.game.spawnCharacter()
  console.log(`Spawned char #${spawn.id}: ${JSON.stringify(spawn.char)}`)
  return ctx
}

const noopCommand = (ctx: any) => ctx

const textInterfaceCommands = [
  {
    names: new Set(['help']),
    description: 'shows available commands',
    handler: helpCommand
  },
  {
    names: new Set(['q', 'quit']),
    description: 'quits the game',
    handler: quitCommand
  },
  {
    names: new Set(['new', 'reset']),
    description: 'starts a new game',
    handler: newGameCommand
  },
  {
    names: new Set(['spawn']),
    description: 'spawns a character',
    handler: spawnCharacterCommand
  }
]