import { createConfigSchematics } from "@lmstudio/sdk";

export function buildConfigSchematics() {
  return createConfigSchematics()
    .field(
      "precision",
      "numeric",
      { min: 0, max: 100, int: true },
      15,
    )
    .field(
      "useDegrees",
      "boolean",
      {},
      false,
    )
    .build();
}
