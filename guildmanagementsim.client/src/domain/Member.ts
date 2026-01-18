//Members are guild members with specific roles and attributes. They go on quests.
export type MemberStatus = 'Idle' | 'Active';
export interface IMember {
  guildId: string; // ID of the guild the member belongs to
  name: string; // Name of the member
  upkeepCost: number; // Upkeep cost for the member
  status: MemberStatus; // Current status of the member'
}
