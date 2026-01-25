import { MEMBER_STATUSES, type IMember, type MemberStatus } from '../../domain/Member';
export class InvalidMemberError extends Error { }

export const createMember = (
  guildID: string,
  name: string,
  upkeepCost: number,
  status: MemberStatus = 'Idle'
): IMember => {
  const trimmedName = name.trim();
  if (!trimmedName || name.trim().length > 25) throw new InvalidMemberError('Invalid Member name');
  if (upkeepCost < 0 || !Number.isInteger(upkeepCost)) throw new InvalidMemberError('Invalid Upkeep Cost');
  if (!MEMBER_STATUSES.includes(status)) throw new InvalidMemberError('Invalid Member Status');
  return { guildID, name, upkeepCost, status };
};
