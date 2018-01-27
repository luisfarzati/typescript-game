import { Game, GameError } from './Game'
import { Character } from './Character'
import { expect, use as useChaiPlugin } from 'chai'
import { spy } from 'sinon'
import * as sinon from 'sinon-chai'
import 'mocha'

useChaiPlugin(sinon)

describe('Game', () => {
  let game: Game
  beforeEach(() => {
    game = new Game()
  })

  it('should start with empty roster', () => {
    expect(game).to.have.property('roster')
    expect(game.roster.size).to.equal(0)
  })

  describe('spawn character', () => {
    it('should return a spawn id and character', () => {
      const spawn = game.spawnCharacter()
      expect(spawn).to.have.property('id')
      expect(spawn).to.have.property('char')
      expect(spawn.char).to.be.an.instanceOf(Character)
    })

    it('should add character to roster', () => {
      const spawn = game.spawnCharacter()
      expect(game.roster.size).to.equal(1)
      expect(game.roster).to.include(spawn.char)
    })
  })

  describe('attack character', () => {
    it('should throw if specified char does not exist', () => {
      expect(() => game.attackCharacter(0, 0)).to.throw(GameError)
    })

    it('should invoke Character.receiveDamage', () => {
      const { char } = game.spawnCharacter()
      const receiveDamage = spy(char, 'receiveDamage')
      game.attackCharacter(0, 0)
      expect(receiveDamage).to.be.calledOnce
    })
  })

  describe('heal character', () => {
    it('should throw if specified char does not exist', () => {
      expect(() => game.healCharacter(0, 0)).to.throw(GameError)
    })

    it('should invoke Character.receiveHealing', () => {
      const { char } = game.spawnCharacter()
      const receiveHealing = spy(char, 'receiveHealing')
      game.healCharacter(0, 0)
      expect(receiveHealing).to.be.calledOnce
    })
  })

  describe('damage calculation', () => {
    it('should throw if attacker char does not exist', () => {
      expect(() => game.calculateDamage(0, 0, 0)).to.throw(GameError)
    })

    it('should throw if foe char does not exist', () => {
      const attacker = game.spawnCharacter()
      expect(() => game.calculateDamage(0, 1, 0)).to.throw(GameError)
    })

    it('should return original damage when foe and attacker are within less than 5 levels away', () => {
      const attacker = game.spawnCharacter()
      const foe = game.spawnCharacter()
      for (let delta = 1; delta < 5; delta++) {
        foe.char.level = attacker.char.level + delta
        const damage = game.calculateDamage(0, 1, 10)
        expect(damage).to.equal(10)
      }
    })

    it('should return -50% when foe is 5 or more levels above the attacker', () => {
      const attacker = game.spawnCharacter()
      const foe = game.spawnCharacter()
      foe.char.level = attacker.char.level + 5

      const damage = game.calculateDamage(0, 1, 10)
      expect(damage).to.equal(5)
    })

    it('should return +50% when foe is 5 or more levels below the attacker', () => {
      const attacker = game.spawnCharacter()
      const foe = game.spawnCharacter()
      attacker.char.level = foe.char.level + 5

      const damage = game.calculateDamage(0, 1, 10)
      expect(damage).to.equal(15)
    })
  })
})