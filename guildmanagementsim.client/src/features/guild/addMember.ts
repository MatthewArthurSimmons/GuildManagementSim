import type { IMember, MemberStatus } from '../../domain/Member';
import type { IGuild } from '../../domain/Guild';
export class InvalidMemberError extends Error { }

export const createMember = (
  guildId: string,
  name: string,
  upkeepCost: number,
  status: MemberStatus = 'Idle'
): IMember => {
  if (!name.trim()) throw new InvalidMemberError('Member name is required');
  if (upkeepCost < 0) throw new InvalidMemberError('Upkeep cost cannot be negative');
  return { guildId, name, upkeepCost, status };
};

export const addMemberToGuild = (guild: IGuild, member: IMember): IGuild => {
  if (member.guildId !== guild.id) {
    throw new InvalidMemberError('Member guildId does not match Guild id');
  }

  const alreadyExists = guild.members.some(m => m.name === member.name);
  if (alreadyExists) {
    throw new InvalidMemberError('Member already exists in guild');
  }

  const updatedMemberArray = [...guild.members, member];

  return { ...guild, members: updatedMemberArray }

}
