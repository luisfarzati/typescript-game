import { Character } from './Character'
import { expect } from 'chai'
import 'mocha'

describe('Character', () => {
  let char: Character
  beforeEach(() => {
    char = new Character()
  })

  it('should start with Health = 1000', () => {
    expect(char).to.have.property('health', 1000)
  })

  it('should start with Level = 1', () => {
    expect(char).to.have.property('level', 1)
  })

  it('should start alive', () => {
    expect(char).to.have.property('alive', true)
  })

  describe('receiveDamage', () => {
    it('should decrease health by amount of damage', () => {
      char.receiveDamage(100)
      expect(char.health).to.equal(1000 - 100)
    })

    it('should make health = 0 if damage exceeds the current health', () => {
      char.receiveDamage(1001)
      expect(char.health).to.equal(0)
    })

    it('should kill character if health drops to zero', () => {
      char.receiveDamage(1000)
      expect(char.alive).to.be.false
    })
  })

  describe('receiveHealing', () => {
    it('should increase health by amount of healing', () => {
      char.receiveDamage(500)
      char.receiveHealing(100)
      expect(char.health).to.equal(600)
    })

    it('should do nothing if character is dead', () => {
      char.receiveDamage(1001)
      char.receiveHealing(1)
      expect(char.health).to.equal(0)
      expect(char.alive).to.be.false
    })

    // it('should kill character if health drops to zero', () => {
    //   char.receiveDamage(1000)
    //   expect(char.alive).to.be.false
    // })
  })
})