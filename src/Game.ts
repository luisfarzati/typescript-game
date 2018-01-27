import { Character } from './Character'

export class Game {
  roster: Map<number, Character> = new Map()

  spawnCharacter() {
    const char = new Character()
    const id = this.roster.size
    this.roster.set(id, char)
    return { id, char }
  }
}
