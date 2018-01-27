import { Character } from './Character'

export class Game {
  roster: Map<number, Character> = new Map()

  spawnCharacter() {
    const char = new Character()
    const id = this.roster.size
    this.roster.set(id, char)
    return { id, char }
  }

  attackCharacter(id: number, damage: number) {
    const char = this.roster.get(id)
    if (!char) throw new GameError(`Invalid char ${id}`)
    return char.receiveDamage(damage)
  }
}

export class GameError extends Error {
  constructor (message: string) {
    super(message)
  }
}