import { describe, it, expect } from 'vitest'
import { createGuild } from './createGuild'

describe('createGuild', () => {
  it('returns a guild with the provided fields', () => {
    const guild = createGuild(
      'abc',
      'Practice Guild',
      'A guild used for testing',
      ['Matt', 'Jake'],
      1,
      10
    )


    expect(guild).toEqual({
      id: 'abc',
      name: 'Practice Guild',
      description: 'A guild used for testing',
      members: ['Matt', 'Jake'],
      level: 1,
      gold: 10,
    })
  })
})


    it('throws if name is empty', () => {
      expect(() =>
        createGuild('id', '   ', 'desc', [], 1, 0)
      ).toThrow()
    })

    it('throws if gold is negative', () => {
      expect(() =>
        createGuild('id', 'Name', 'desc', [], 1, -1)
      ).toThrow()
    })
    it('throws if level is less than 1', () => {
      expect(() =>
        createGuild('id', 'Name', 'desc', [], 0, 10)
      ).toThrow()
    })
