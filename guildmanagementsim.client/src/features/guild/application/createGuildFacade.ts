import { createGuild, InvalidGuildError } from '../createGuild'
import type { CreateGuildFacadeResult } from './createGuildFacadeResult';

//On success, return createGuild wrapper values
//On failure, return error messages for each invariant

export const createGuildFacade = ((name: string, description: string, level: number, gold: number) => {
  try {
    const createdGuild = createGuild(name, description, level, gold)
    const createdGuildSuccess: CreateGuildFacadeResult = { ok: true, data: { guild: createdGuild } }
    return createdGuildSuccess

  }
  catch (err) {
    const guildError: CreateGuildFacadeResult = {
      ok: false, error: {code: "UNEXPECTED", message: "Invalid guild options"} }
    if (err instanceof InvalidGuildError) {
      switch (err.message) {
        case "Invalid Guild Name":
          guildError.error.code = "VALIDATION"
          guildError.error.field = "name";
          guildError.error.message = "Invalid Guild Name";
          break;
        case "Gold cannot be negative or non int":
          guildError.error.code = "VALIDATION"
          guildError.error.field = "gold";
          guildError.error.message = "Gold cannot be negative or non int";
          break;
        case "Level must be at least 1 and int":
          guildError.error.code = "VALIDATION"
          guildError.error.field = "level";
          guildError.error.message = "Level must be at least 1 and int";
          break;
      }
      return guildError;
    }
    guildError.error.message = "Invalid Guild Error"
    return guildError
  }
})
