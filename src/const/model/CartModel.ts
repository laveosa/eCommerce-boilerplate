import { z } from "zod";

import type { CartScheme } from "#src/const/scheme/zod-schemas/CartScheme.js";

export type CartModel = z.infer<typeof CartScheme>;
