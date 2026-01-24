import type { IMember } from '../../domain/Member';
import type { IGuild } from '../../domain/Guild';

export class InvalidMemberError extends Error { }

export const removeMemberFromGuild = (guild: IGuild, member: IMember) => {
  const updatedGuild = guild.members.filter((m) => m["name"] !== member["name"]);
  if (guild.members.includes(member)) {
    return { ...guild, members: updatedGuild }
  } else throw new InvalidMemberError('There is no member to remove');
}   
  

