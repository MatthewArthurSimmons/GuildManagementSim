import { describe, it, expect } from 'vitest'
import { createGuild } from './createGuild'
import { createMember } from './createMember'
import { addMemberToGuild } from './addMember'
import { removeMemberFromGuild, InvalidMemberError } from './removeMember'

describe('tests remove member from guild', () => {

  it('removes a member from the guild', () => {
    const guild = createGuild(
      'Practice Guild',
      'A guild used for testing',
      1,
      10,
    )
      const memberToBeAdded1 = createMember(guild.guildID, 'Ilona', 5, 'Idle')
      const memberToBeAdded2 = createMember(guild.guildID, 'Matt', 3, 'Recovering')
      const updatedGuild = addMemberToGuild(guild, memberToBeAdded1);
      const updatedGuild2 = addMemberToGuild(updatedGuild, memberToBeAdded2);

      const guildWithRemovedMember = removeMemberFromGuild(updatedGuild2, memberToBeAdded1)

      expect(guildWithRemovedMember.members).toHaveLength(1);
  })

  it('Throws if member does not exist', () => {
    const guild = createGuild(
      'Practice Guild',
      'A guild used for testing',
      1,
      10,
    )
    const memberToBeAdded1 = createMember(guild.guildID, 'Ilona', 5, 'Idle')
    const memberToBeAdded2 = createMember(guild.guildID, 'Matt', 3, 'Recovering')
    const falseMember = createMember(guild.guildID, 'Simone', 3, 'Recovering')
    const updatedGuild = addMemberToGuild(guild, memberToBeAdded1);
    const updatedGuild2 = addMemberToGuild(updatedGuild, memberToBeAdded2);

    expect(() => removeMemberFromGuild(updatedGuild2, falseMember)).toThrow(InvalidMemberError)

  })
})
