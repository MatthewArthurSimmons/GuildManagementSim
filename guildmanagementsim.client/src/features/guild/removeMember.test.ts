import { describe, it, expect } from 'vitest'
import { createGuild } from './createGuild'
import { createMember } from './createMember'
import { addMemberToGuild } from './addMember'
import { removeMemberFromGuild, InvalidMemberError } from './removeMember'

describe('remove member from guild', () => {

  it('removes a member from the guild', () => {
    const guild = createGuild(
      'abc',
      'Practice Guild',
      'A guild used for testing',
      [],
      1,
      10,
    )
      const memberToBeAdded1 = createMember('abc', 'Ilona', 5, 'Idle')
      const memberToBeAdded2 = createMember('abc', 'Matt', 3, 'Recovering')
      const updatedGuild = addMemberToGuild(guild, memberToBeAdded1);
      const updatedGuild2 = addMemberToGuild(updatedGuild, memberToBeAdded2);

      const guildWithRemovedMember = removeMemberFromGuild(updatedGuild2, memberToBeAdded1)

      expect(guildWithRemovedMember.members).toHaveLength(1);
      expect(guildWithRemovedMember.members[0].name).toBe('Matt');
  })

  it('Throws if guildIDs do not match', () => {
    const guild = createGuild(
      'abc',
      'Practice Guild',
      'A guild used for testing',
      [],
      1,
      10,
    )
    const memberToBeAdded1 = createMember('abc', 'Ilona', 5, 'Idle')
    const memberToBeAdded2 = createMember('abc', 'Matt', 3, 'Recovering')
    const falseMember = createMember('def', 'Matt', 3, 'Recovering')
    const updatedGuild = addMemberToGuild(guild, memberToBeAdded1);
    const updatedGuild2 = addMemberToGuild(updatedGuild, memberToBeAdded2);

    expect(() => removeMemberFromGuild(updatedGuild2, falseMember)).toThrow(InvalidMemberError)

  })
})
