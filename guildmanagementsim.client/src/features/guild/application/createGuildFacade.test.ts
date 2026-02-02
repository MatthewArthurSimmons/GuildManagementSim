import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest'

vi.mock('../createGuild', async () => {
  const actual = await vi.importActual<typeof import('../createGuild')>('../createGuild');
  return {
    ...actual,
    createGuild: vi.fn(),
  };
})

import { createGuildFacade } from './createGuildFacade';
import { createGuild, InvalidGuildError } from '../createGuild';

const createGuildMock = vi.mocked(createGuild);
let realCreateGuild: typeof createGuild;

beforeAll(async () => {
  const actual = await vi.importActual<typeof import('../createGuild')>('../createGuild')
  realCreateGuild = actual.createGuild
})

// 4) Default behavior: real createGuild (so your “normal” tests keep working)
beforeEach(() => {
  createGuildMock.mockReset()
  createGuildMock.mockImplementation(realCreateGuild)
})

describe('createGuildFacade', () => {
  it('creates a guild successfully with valid inputs', () => {
    const guildFacadeSuccess = createGuildFacade("Guild Test", "Testing Guild", 1, 50);
    expect(guildFacadeSuccess.ok).toBe(true);
    if (guildFacadeSuccess.ok) {
      expect(guildFacadeSuccess.data.guild.name).toBe("Guild Test");
      expect(guildFacadeSuccess.data.guild.description).toBe("Testing Guild");
      expect(guildFacadeSuccess.data.guild.level).toBe(1);
      expect(guildFacadeSuccess.data.guild.gold).toBe(50);
    }
  })

  it('fails to create a guild with invalid name', () => {
    const guildFacadeFail = createGuildFacade("", "Testing Guild", 1, 50);
    expect(guildFacadeFail.ok).toBe(false);
    if (!guildFacadeFail.ok) {
      expect(guildFacadeFail.error.code).toBe("VALIDATION");
      expect(guildFacadeFail.error.message).toBe("Invalid Guild Name");
      expect(guildFacadeFail.error.field).toBe("name");
    }
  })

  it('fails to create a guild with invalid level', () => {
    const guildFacadeFail = createGuildFacade("Guild Test", "Testing Guild", 0, 50);
    expect(guildFacadeFail.ok).toBe(false);
    if (!guildFacadeFail.ok) {
      expect(guildFacadeFail.error.code).toBe("VALIDATION");
      expect(guildFacadeFail.error.message).toBe("Level must be at least 1 and int");
      expect(guildFacadeFail.error.field).toBe("level");
    }
  })

  it('fails to create a guild with invalid gold', () => {
    const guildFacadeFail = createGuildFacade("Guild Test", "Testing Guild", 1, -10);
    expect(guildFacadeFail.ok).toBe(false);
    if (!guildFacadeFail.ok) {
      expect(guildFacadeFail.error.code).toBe("VALIDATION");
      expect(guildFacadeFail.error.message).toBe("Gold cannot be negative or non int");
      expect(guildFacadeFail.error.field).toBe("gold");
    }
  })
})

describe('createGuildFacade – dependency failure handling', () => {
  it('returns ok:false when createGuild throws InvalidGuildError (known domain error)', () => {
    createGuildMock.mockImplementationOnce(() => {
      throw new InvalidGuildError('bad input')
    })

    // ACT
    const result = createGuildFacade('Name', 'Desc', 1, 10)

    expect(result.ok).toBe(false)

    expect(createGuildMock).toHaveBeenCalledTimes(1)
  })

  it('returns ok:false with a generic message when createGuild throws an unknown error', () => {
    createGuildMock.mockImplementationOnce(() => {
      throw new Error('boom')
    })

    const result = createGuildFacade('Name', 'Desc', 1, 10)

    expect(result.ok).toBe(false)

    expect(createGuildMock).toHaveBeenCalledTimes(1)
  })

  it('returns ok:true when createGuild succeeds (optional sanity test)', () => {
    createGuildMock.mockImplementationOnce(() => {
      return {
        guildId: 'abc',
        name: 'Name',
        description: 'Desc',
        members: [],
        level: 1,
        gold: 10,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any
    })

    const result = createGuildFacade('Name', 'Desc', 1, 10)

    expect(result.ok).toBe(true)
  })
})
