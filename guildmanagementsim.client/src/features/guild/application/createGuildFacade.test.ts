import { describe, it, expect } from 'vitest'
import { createGuildFacade } from './createGuildFacade';

describe('createGuildFacade', () => {
  it('creates a guild successfully with valid inputs', () => {
    const guildFacadeSuccess = createGuildFacade("Guild Test", "Testing Guild", 1, 50);

    expect(guildFacadeSuccess.ok).toBe(true);
  })
})
