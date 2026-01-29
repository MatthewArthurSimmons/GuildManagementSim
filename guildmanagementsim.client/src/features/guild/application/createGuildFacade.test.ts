import { describe, it, expect } from 'vitest'
import { createGuildFacade } from './createGuildFacade';

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
