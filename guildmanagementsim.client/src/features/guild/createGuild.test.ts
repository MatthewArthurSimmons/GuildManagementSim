import { describe, it, expect, beforeEach } from 'vitest'
import { createGuild, InvalidGuildError } from './createGuild'
import type { IGuild } from '../../domain/Guild';

describe('createGuild', () => {
  let guild: IGuild

  beforeEach(() => {

    guild = createGuild(
      'Practice Guild',
      'A guild used for testing',
      1,
      10
  )

  })

  it('returns a guild with the provided fields', () => {


    expect(guild.name).toEqual(
      'Practice Guild'
    )
  })

    it('throws if name is empty', () => {
      expect(() =>
        createGuild('   ', 'desc', 1, 0)
      ).toThrow(InvalidGuildError)
    })

    it('throws if gold is negative', () => {
      expect(() =>
        createGuild('Name', 'desc', 1, -1)
      ).toThrow(InvalidGuildError)
    })
    it('throws if level is less than 1', () => {
      expect(() =>
        createGuild('Name', 'desc', 0, 10)
      ).toThrow(InvalidGuildError)
  })
})


