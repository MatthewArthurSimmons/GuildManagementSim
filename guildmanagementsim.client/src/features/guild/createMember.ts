import type { IMember, MemberStatus } from '../../domain/Member';
export class InvalidMemberError extends Error { }

export const createMember = (
  guildId: string,
  name: string,
  upkeepCost: number,
  status: MemberStatus = 'Idle'
): IMember => {
  if (!name.trim()) throw new InvalidMemberError('Member name is required');
  if (upkeepCost < 0) throw new InvalidMemberError('Upkeep cost cannot be negative');
  if (!['Idle', 'On Quest', 'Resting'].includes(status)) throw new InvalidMemberError('Member cannot have multiple statuses');
  return { guildId, name, upkeepCost, status };
};
