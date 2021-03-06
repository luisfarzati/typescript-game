import { Game } from './Game'
import { Character } from './Character';

export class InvalidCommandError extends Error {
  constructor (name: string) {
    super(`Invalid command: "${name}"`)
  }
}

export class GameCommandViolationError extends Error {
  constructor (message: string) {
    super(message)
  }
}

export const parseTextCommand = (line: string = '') => {
  const [name, ...args] = line.trim().toLowerCase().split(/\s+/)
  if (!name) return { command: noopCommand, args: [] }

  const command = textInterfaceCommands.find(cmd => cmd.names.has(name))
  if (!command) throw new InvalidCommandError(name)

  const handler = command.handler.bind(undefined)
  return { command: handler, args }
}

export type CommandContext = {
  game: Game,
  player?: {
    id: number,
    char: Character
  }
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
      args: (cmd.args || []).map(a => `<${a}>`).join(' '),
      description: cmd.description
    }))
  const lines =
    nameDescription.map(nd => `${rpad(nd.names, 12)}${rpad(nd.args, 20)}${nd.description}`)

  console.log(lines.join('\n').concat('\n'))
  return ctx
}

const quitCommand = () => {
  console.log('Quitting the game, hope you enjoyed it!')
  process.exit(0)
}

const newGameCommand = (ctx: CommandContext) => {
  ctx.game = new Game()
  ctx.player = undefined
  console.log('Started new game.')
  return ctx
}

const spawnCharacterCommand = (ctx: CommandContext) => {
  const spawn = ctx.game.spawnCharacter()
  console.log(`Spawned char #${spawn.id}: ${JSON.stringify(spawn.char)}`)
  return ctx
}

const listCharactersCommand = (ctx: CommandContext) => {
  for (let [id, char] of ctx.game.roster.entries()) {
    const isPlayer = ctx.player && ctx.player.id === id
    console.log(`#${id} ${isPlayer ? '(player)' : ''} ${JSON.stringify(char)}`)
  }
  return ctx
}

const attackCharacterCommand = (ctx: CommandContext, id: string, damage: string = '0') => {
  const charId = parseInt(id)
  let effectiveDamage = parseInt(damage)

  if (ctx.player && ctx.player.id === charId) {
    throw new GameCommandViolationError(`You cannot attack yourself, you maniac!`)
  }
  else if (ctx.player && !ctx.player.char.alive) {
    throw new GameCommandViolationError('You cannot attack anybody, you are dead!')
  }
  else if (ctx.player) {
    effectiveDamage = ctx.game.calculateDamage(ctx.player.id, charId, effectiveDamage)
  }

  const char = ctx.game.attackCharacter(charId, effectiveDamage)
  console.log(`Attacking char #${id} with ${effectiveDamage} damage points`)
  console.log(`#${id} ${JSON.stringify(char)}`)
  if (!char.alive) {
    console.log(`#${id} is dead!`)
  }
  return ctx
}

const healCharacterCommand = (ctx: CommandContext, id: string, amount: string = '0') => {
  const charId = parseInt(id)
  if (ctx.player && ctx.player.id !== charId) {
    throw new GameCommandViolationError(`You cannot heal others, you saint!`)
  }
  else if (ctx.player && !ctx.player.char.alive) {
    throw new GameCommandViolationError('You cannot heal yourself, you are dead!')
  }

  const char = ctx.game.healCharacter(charId, parseInt(amount))
  if (!char.alive) {
    console.log(`#${id} is dead!`)
  }
  else {
    console.log(`${ctx.player ? 'You healed yourself' : `Healing char #${id}`} with ${amount} health points`)
    console.log(`#${id} ${JSON.stringify(char)}`)
    }
  return ctx
}

const makeCharacterPlayerCommand = (ctx: CommandContext, id: string) => {
  const charId = parseInt(id)
  const char = ctx.game.roster.get(charId)
  if (!char) {
    console.log(`Char #${id} does not exist.`)
  }
  else {
    ctx.player = { id: charId, char }
  }
  return ctx
}

const noopCommand = (ctx: any) => ctx

type TextCommand = {
  names: Set<string>
  args?: string[],
  description: string
  handler: Function
}

const textInterfaceCommands: TextCommand[] = [
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
  },
  {
    names: new Set(['ls', 'list']),
    description: 'list characters',
    handler: listCharactersCommand
  },
  {
    names: new Set(['attack']),
    args: ['id', 'dmg'],
    description: 'attack a character',
    handler: attackCharacterCommand
  },
  {
    names: new Set(['heal']),
    args: ['id', 'amt'],
    description: 'heal a character',
    handler: healCharacterCommand
  },
  {
    names: new Set(['player']),
    args: ['id'],
    description: 'use a character as player',
    handler: makeCharacterPlayerCommand
  }
]
