import type { IGuild } from '../../domain/Guild';

export const createGuild = (
  id: string,
  name: string,
  description: string,
  members: string[],
  level: number,
  gold: number
): IGuild => {
  if (!name.trim()) throw new Error('Guild name is required');
  if (gold < 0) throw new Error('Gold cannot be negative');

  return { id, name, description, members, level, gold };
};
