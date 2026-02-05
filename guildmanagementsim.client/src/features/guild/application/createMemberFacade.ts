import type { MemberStatus } from '../../../domain/Member';
import { createMember } from '../createMember';
import { InvalidMemberError } from '../removeMember';
import type { CreateMemberFacadeResult } from './createMemberFacadeResult';

export const createMemberFacade = ((guildID: string, name: string, upkeepCost: number, status: MemberStatus = 'Idle') => {
  try {
    const createdMember = createMember(guildID, name, upkeepCost, status);
    const createdMemberSuccess: CreateMemberFacadeResult = { ok: true, data: { member: createdMember } };
    return createdMemberSuccess;
  }
  catch (err) {
        const memberError: CreateMemberFacadeResult = {
          ok: false, error: { code: "UNEXPECTED", message: "Invalid member options" }
        }
        if (err instanceof InvalidMemberError) {
          switch (err.message) {
            case "Invalid Member Name":
              memberError.error.code = "VALIDATION"
              memberError.error.field = "name";
              memberError.error.message = "Invalid Member Name";
              break;
            case "Invalid Upkeep Cost":
              memberError.error.code = "VALIDATION"
              memberError.error.field = "upkeepCost";
              memberError.error.message = "Invalid Upkeep Cost";
              break;
            case "Invalid Member Status":
              memberError.error.code = "VALIDATION"
              memberError.error.field = "status";
              memberError.error.message = "Invalid Member Status";
              break;
          }
          return memberError;
        }
        memberError.error.message = "Invalid Member Error"
        return memberError
    }
})
