import type { IMember } from "../../../domain/Member";

export type CreateMemberFacadeResult = {
  ok: true;
  data: {
    member: IMember
  }
} | {
  ok: false;
  error: { code: "VALIDATION" | "UNEXPECTED", message: string, field?: "guildID" | "name" | "upkeepCost" | "status" }
}
