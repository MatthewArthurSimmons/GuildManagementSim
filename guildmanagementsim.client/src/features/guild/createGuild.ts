import type { IGuild } from '../../domain/Guild';

export const createGuild = (id: string, name: string, description: string, members: string[], level: number, gold: number): IGuild => {
  return {
    id, name, description, members, level, gold
  }
}
