import { z } from "zod";

import type { OrderScheme } from "#src/const/scheme/zod-schemas/OrderScheme.js";

export type OrderModel = z.infer<typeof OrderScheme>;
