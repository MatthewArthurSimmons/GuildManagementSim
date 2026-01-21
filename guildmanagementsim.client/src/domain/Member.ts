//Members are guild members with specific roles and attributes. They go on quests.
export const MEMBER_STATUSES = ['Idle', 'OnQuest', 'Recovering'] as const;
export type MemberStatus = typeof MEMBER_STATUSES[number];
export interface IMember {
  guildId: string; // ID of the guild the member belongs to
  name: string; // Name of the member
  upkeepCost: number; // Upkeep cost for the member
  status: MemberStatus; // Current status of the member'
}
