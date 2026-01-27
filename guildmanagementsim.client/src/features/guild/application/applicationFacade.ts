import { createGuild } from '../createGuild'

//On success, return createGuild wrapper values
//On failure, return error messages for each invariant

export const createGuildFacade = ((name: string, description: string, level: number, gold: number) => {
  try {
    const createdGuild = createGuild(name, description, level, gold)
    const createdGuildSuccess = { ok: true, data: { guild: createdGuild } }
    return createdGuildSuccess
       
  }
  catch {
    const guildError = { ok: false, error: { code: "VALIDATION", message: "Invalid guild options" } }
      
    return guildError
    
  }
})
