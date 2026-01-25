import type { IMember } from '../../domain/Member';
import type { IGuild } from '../../domain/Guild';
export class InvalidMemberError extends Error { }

export const addMemberToGuild = (guild: IGuild, member: IMember): IGuild => {
  if (member.guildID !== guild.guildID) {
    throw new InvalidMemberError('Member guildId does not match Guild id');
  }

  const alreadyExists = guild.members.some(m => m.name === member.name);
  if (alreadyExists) {
    throw new InvalidMemberError('Member already exists in guild');
  }

  const updatedMemberArray = [...guild.members, member];

  return { ...guild, members: updatedMemberArray }

}
