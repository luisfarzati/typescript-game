import { App } from './start'
import { expect } from 'chai'
import 'mocha'

describe('App', () => {
  it('should return Hello World', () => {
    const greeting = App.start()
    expect(greeting).to.equal('Hello World')
  })
})