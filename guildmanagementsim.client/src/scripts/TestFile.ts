import type { IGuild } from '../domain/Guild.ts'; 
import { createGuild } from '../features/guild/createGuild.ts';

const practiceGuild: IGuild = createGuild("abc", "name", "description", ['Matt', 'Jake'], 1, 10);

console.log(practiceGuild);
