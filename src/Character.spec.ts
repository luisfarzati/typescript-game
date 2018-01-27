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
  })
})