import type { IGuild } from '../../domain/Guild';
import type { IMember } from '../../domain/Member';
export class InvalidGuildError extends Error { }

export const createGuild = (
  name: string,
  description: string,
  level: number,
  gold: number
): IGuild => {
  const guildID: string = crypto.randomUUID();
  const members: IMember[] = [];
  if (!name.trim() || name.length > 25) throw new InvalidGuildError('Invalid Guild Name');
  if (!Number.isInteger(gold) || gold < 0) throw new InvalidGuildError('Gold cannot be negative or non int');
  if (!Number.isInteger(level) || level < 1) throw new InvalidGuildError('Level must be at least 1 and int');
  return { guildID, name, description, members, level, gold };
};
