//A guild is the primary organizational unit in the game (it is basically the player's "container" for progression).

import type { IMember } from "./Member";

//It has members, resources, and various attributes.
export interface IGuild {
  id: string; // Unique identifier for the guild
  name: string; // Name of the guild
  description: string; // Description of the guild
  members: IMember[]; // List of members in the guild
  level: number; // Level of the guild, which may affect its capabilities
  gold: number; // Amount of gold the guild has
}
