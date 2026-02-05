import type { IGuild } from "../../../domain/Guild";

export type addMemberFacadeResult = {
  ok: true;
  data: {
    guild: IGuild
  }
} | {
  ok: false;
  error: { code: "VALIDATION" | "UNEXPECTED", message: string, field?: "guildID" | "memberGuildID" }
}

