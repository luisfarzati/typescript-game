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

const helpCommand = () => {
  const lines =
    textInterfaceCommands.map(cmd => `${[...cmd.names.keys()].join(', ')}\t\t\t${cmd.description}`)
  console.log(lines.join('\n').concat('\n'))
}

const quitCommand = () => {
  console.log('Quitting the game, hope you enjoyed it!')
  process.exit(0)
}

const noopCommand = () => {}

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
  }
]
