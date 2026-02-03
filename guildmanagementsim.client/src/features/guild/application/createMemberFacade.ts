import type { MemberStatus } from '../../../domain/Member';
import { createMember } from '../createMember';
import { InvalidMemberError } from '../removeMember';
import type { CreateMemberFacadeResult } from './createMemberFacadeResult';

export const createMemberFacade = ((guildID: string, name: string, upkeepCost: number, status: MemberStatus = 'Idle') => {
  try {
    const createdMember = createMember(guildID, name, upkeepCost, status);
    const createdMemberSuccess: CreateMemberFacadeResult = { ok: true, data: { guild: createdMember } };
    return createdMemberSuccess;
  }
  catch (err) {
        const guildError: CreateMemberFacadeResult = {
          ok: false, error: { code: "UNEXPECTED", message: "Invalid member options" }
        }
        if (err instanceof InvalidMemberError) {
          switch (err.message) {
            case "Invalid Member Name":
              guildError.error.code = "VALIDATION"
              guildError.error.field = "name";
              guildError.error.message = "Invalid Member Name";
              break;
            case "Invalid Upkeep Cost":
              guildError.error.code = "VALIDATION"
              guildError.error.field = "upkeepCost";
              guildError.error.message = "Invalid Upkeep Cost";
              break;
            case "Invalid Member Status":
              guildError.error.code = "VALIDATION"
              guildError.error.field = "status";
              guildError.error.message = "Invalid Member Status";
              break;
          }
          return guildError;
        }
        guildError.error.message = "Invalid Guild Error"
        return guildError
    }
})
