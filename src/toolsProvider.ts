import { tool, type ToolsProvider } from "@lmstudio/sdk";
import { z } from "zod";
import { create, all, type MathJsInstance } from "mathjs";

import { buildConfigSchematics } from "./configSchematics.js";

const configSchematics = buildConfigSchematics();

// ---------------------------------------------------------------------------
// Tools provider
// ---------------------------------------------------------------------------

export const toolsProvider: ToolsProvider = async (ctl) => {
  const config = ctl.getPluginConfig(configSchematics);
  const precision: number = config.get("precision");
  const useDegrees: boolean = config.get("useDegrees");

  const calcTool = tool({
    name: "calculate",
    description: [
      "Evaluate a mathematical expression with arbitrary precision.",
      "Supports: arithmetic, trigonometry, logarithms, statistics, unit conversions, and more.",
      "Examples:",
      '  "2 + 2", "sin(45 deg)" (or "sin(pi/4)"), "sqrt(144)", "3 mph to km/h", "mean(1,2,3,4,5)"',
      "",
      "Use this whenever you need exact calculations — the model cannot do math reliably on its own.",
    ].join(" "),
    parameters: {
      expression: z
        .string()
        .min(1)
        .max(2000)
        .describe("The mathematical expression to evaluate"),
    },
    async implementation({ expression }) {
      try {
        const math = create(all, { precision });

        if (useDegrees) {
          // Set default angle mode to degrees
          // math.config({ angle: 'deg' });
          // mathjs uses `math.Unit` with 'deg' suffix in expressions
        }

        const result = math.evaluate(expression);
        const formatted = math.format(result, { precision });
        return formatted;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        return `Error evaluating expression: ${msg}`;
      }
    },
  });

  return [calcTool];
};
