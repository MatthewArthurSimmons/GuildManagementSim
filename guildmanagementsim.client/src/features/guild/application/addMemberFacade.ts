import type { IGuild } from '../../../domain/Guild';
import type { IMember } from '../../../domain/Member';
import type { addMemberFacadeResult } from './addMemberFacadeResult';
import { addMemberToGuild } from '../addMember';
import { InvalidMemberError } from '../createMember';

export const addMemberFacade = (guildID: IGuild, member: IMember) => {
  try {
    const updatedGuild = addMemberToGuild(guildID, member)
    const addedMemberSuccess: addMemberFacadeResult = { ok: true, data: { guild: updatedGuild } }
    return addedMemberSuccess;
  }
  catch (err) {
    const guildMemberError: addMemberFacadeResult = {
      ok: false, error: { code: "UNEXPECTED", message: "Invalid guild/member combination" }
    }
    if (err instanceof InvalidMemberError) {
      switch (err.message) {
        case "Invalid Guild ID":
          guildMemberError.error.code = "VALIDATION"
          guildMemberError.error.field = "guildID";
          guildMemberError.error.message = "Invalid GuildID";
          break;
        case "Invalid Member GuildID":
          guildMemberError.error.code = "VALIDATION"
          guildMemberError.error.field = "memberGuildID";
          guildMemberError.error.message = "Invalid Member GuildID";
          break;
      }
      return guildMemberError;
    }
    guildMemberError.error.message = "Invalid Guild Error"
    return guildMemberError
  }
}
