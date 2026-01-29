import type { IGuild } from "../../../domain/Guild";

export type CreateGuildFacadeResult = {
  ok: true;
  data: {
    guild: IGuild
    }
  } | {
  ok: false;
    error: { code: "VALIDATION" | "UNEXPECTED", message: string, field?: "name" | "gold" | "level" }
  }

