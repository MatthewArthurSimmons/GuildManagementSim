import type { IGuild } from '../../domain/Guild';
export class InvalidGuildError extends Error { }

export const createGuild = (
  id: string,
  name: string,
  description: string,
  members: string[],
  level: number,
  gold: number
): IGuild => {
  if (!name.trim()) throw new InvalidGuildError('Guild name is required');
  if (gold < 0) throw new InvalidGuildError('Gold cannot be negative');
  if (level < 1) throw new InvalidGuildError('Level must be at least 1');
  return { id, name, description, members, level, gold };
};
