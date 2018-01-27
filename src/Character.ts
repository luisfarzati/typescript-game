export class Character {
  health = 1000
  level = 1
  alive = true

  receiveDamage(amount: number) {
    this.health = Math.max(0, this.health -= amount)
    this.alive = this.health > 0
    return this
  }
}