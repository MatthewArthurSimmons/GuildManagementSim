import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest'

vi.mock('../createMember', async () => {
  const actual = await vi.importActual<typeof import('../createMember')>('../createMember');
  return {
    ...actual,
    createMember: vi.fn(),
  };
})

import { createMemberFacade } from './createMemberFacade';
import { createMember, InvalidMemberError } from '../createMember';

const createMemberMock = vi.mocked(createMember);
let realCreateMember: typeof createMember;

beforeAll(async () => {
  const actual = await vi.importActual<typeof import('../createMember')>('../createMember')
  realCreateMember = actual.createMember
})

beforeEach(() => {
  createMemberMock.mockReset()
  createMemberMock.mockImplementation(realCreateMember)
})

describe('createMemberFacade', () => {
  it('creates a member successfully with valid inputs', () => {
    const memberFacadeSuccess = createMemberFacade("Guild Test", "Testing Member", 5, "Idle");
    expect(memberFacadeSuccess.ok).toBe(true);
    if (memberFacadeSuccess.ok) {
      expect(memberFacadeSuccess.data.member.guildID).toBe("Guild Test");
      expect(memberFacadeSuccess.data.member.name).toBe("Testing Member");
      expect(memberFacadeSuccess.data.member.upkeepCost).toBe(5);
      expect(memberFacadeSuccess.data.member.status).toBe("Idle");
    }
  })
})

describe('createMemberFacade – dependency failure handling', () => {
  it('returns ok:false when createMember throws InvalidMemberError (known domain error)', () => {
    createMemberMock.mockImplementationOnce(() => {
      throw new InvalidMemberError('bad input')
    })

    // ACT
    const result = createMemberFacade('Name', 'Desc', 1, "Idle")

    expect(result.ok).toBe(false)

    expect(createMemberMock).toHaveBeenCalledTimes(1)
  })

  it('returns ok:false with a generic message when createMember throws an unknown error', () => {
    createMemberMock.mockImplementationOnce(() => {
      throw new Error('boom')
    })

    const result = createMemberFacade('Name', 'Desc', 1, "Idle")

    expect(result.ok).toBe(false)

    expect(createMemberMock).toHaveBeenCalledTimes(1)
  })

  it('returns ok:true when createMember succeeds', () => {
    createMemberMock.mockImplementationOnce(() => {
      return {
        guildId: 'abc',
        name: 'Name',
        upkeepCost: 1,
        status: 10,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any
    })

    const result = createMemberFacade('GuildID', 'Name', 1, "Idle")

    expect(result.ok).toBe(true)
  })
})
