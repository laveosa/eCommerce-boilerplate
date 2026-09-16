import { z } from "zod";

import type { ProductScheme } from "#src/const/scheme/zod-schemas/ProductScheme.js";

export type ProductModel = z.infer<typeof ProductScheme>;
