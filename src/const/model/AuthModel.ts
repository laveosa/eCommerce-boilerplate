import { z } from "zod";

import type { AuthScheme } from "#src/const/scheme/zod-schemas/AuthScheme.js";

export type AuthModel = z.infer<typeof AuthScheme>;
