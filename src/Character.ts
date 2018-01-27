export class Character {
  health = 1000
  level = 1
  alive = true

  receiveDamage(amount: number) {
    this.health = Math.max(0, this.health -= amount)
    this.alive = this.health > 0
    return this
  }

  receiveHealing(amount: number) {
    if (this.alive) {
      this.health = Math.min(1000, this.health += amount)
    }
    return this
  }
}