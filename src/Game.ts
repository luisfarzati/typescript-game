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

  healCharacter(id: number, amount: number) {
    const char = this.roster.get(id)
    if (!char) throw new GameError(`Invalid char ${id}`)
    return char.receiveHealing(amount)
  }

  calculateDamage(attackerId: number, foeId: number, damage: number) {
    const attacker = this.roster.get(attackerId)
    if (!attacker) throw new GameError(`Invalid attacker char ${attackerId}`)

    const foe = this.roster.get(foeId)
    if (!foe) throw new GameError(`Invalid foe char ${foeId}`)

    let multiplier = 1
    if (attacker.level <= foe.level - 5) {
      multiplier = .5
    }
    else if (attacker.level >= foe.level + 5) {
      multiplier = 1.5
    }
    return damage * multiplier
  }
}

export class GameError extends Error {
  constructor (message: string) {
    super(message)
  }
}