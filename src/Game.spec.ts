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

    // it('should invoke Character.receiveDamage', () => {
    //   const { char } = game.spawnCharacter()
    //   const receiveDamage = spy(char, 'receiveDamage')
    //   game.attackCharacter(0, 0)
    //   expect(receiveDamage).to.be.calledOnce
    // })
  })
})