export class Character {
  health = 1000
  level = 1
  alive = true

  receiveDamage(amount: number) {
    this.health -= amount
    return this
  }
}