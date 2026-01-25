import type { IMember } from '../../domain/Member';
import type { IGuild } from '../../domain/Guild';

export class InvalidMemberError extends Error { }

export const removeMemberFromGuild = (guild: IGuild, member: IMember) => {
  const updatedMembers = guild.members.filter((m) => m["name"] !== member["name"]);
  if (member.guildID !== guild.guildID) {
    throw new InvalidMemberError('There is no member to remove');
  } else if (guild.members.map((m) => m["name"] === member["name"]).length === updatedMembers.length) {
    throw new InvalidMemberError('names do not match')
  } else
    return { ...guild, members: updatedMembers }
}   
  

