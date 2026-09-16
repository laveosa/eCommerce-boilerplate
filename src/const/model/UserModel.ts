import { z } from "zod";

import type { UserScheme } from "#src/const/scheme/zod-schemas/UserScheme.js";

export type UserModel = z.infer<typeof UserScheme>;
