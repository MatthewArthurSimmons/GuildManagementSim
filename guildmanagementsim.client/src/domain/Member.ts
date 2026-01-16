//Members are guild members with specific roles and attributes. They go on quests.

export interface Member {
  id: string; // Unique identifier for the member
  name: string; // Name of the member
  upkeepCost: number; // Upkeep cost for the member
  status: 'Idle'; // Current status of the member'
}
