import { describe, it, expect } from 'vitest'
import { createGuild } from './createGuild'
import { createMember } from './addMember'
import { addMemberToGuild } from './addMember'

describe('addMemberToGuild', () => {
  it('adds a member to the guild', () => {
    const guild = createGuild(
      'abc',
      'Practice Guild',
      'A guild used for testing',
      [],
      1,
      10,
    )
    const memberToBeAdded = createMember('abc', 'Ilona', 5, 'Idle')

    const updatedGuild = addMemberToGuild(guild, memberToBeAdded);

    expect(memberToBeAdded).toEqual({
      guildId: 'abc',
      name: 'Ilona',
      upkeepCost: 5,
      status: 'Idle',
    })

    expect(updatedGuild.members).toHaveLength(1);
    expect(updatedGuild.members[0]?.name).toBe('Ilona');
    expect(guild.members).toHaveLength(0); // Original guild remains unchanged)
  })

  it('throws on duplicate member (by Name)', () => {
    const guild = createGuild('g1', 'Guild', 'desc', [], 1, 10);
    const member1 = createMember('g1', 'Matt', 2, 'Idle');
    const member2 = createMember('g1', 'Matt', 5, 'Idle');
  

    const updated = addMemberToGuild(guild, member1);
    expect(() => addMemberToGuild(updated, member2)).toThrow('Member already exists in guild');

  })
})
