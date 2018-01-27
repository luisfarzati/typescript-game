import { Game } from './Game'
import { Character } from './Character'
import { expect } from 'chai'
import 'mocha'

describe('Game', () => {
  let game: Game
  beforeEach(() => {
    game = new Game()
  })

  it('should start with empty roster', () => {
    expect(game).to.have.property('roster')
    expect(game.roster.size).to.equal(0)
  })

  describe ('spawn character', () => {
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
})