# lmstudio-calculator

Arbitrary-precision evaluation, unit conversion, and equation solving via mathjs.

| | |
|---|---|
| Type | tools |
| Tools | 1 |
| Requires network | no |
| Requires external service | no |
| Destructive | no |
| Version | 1.0.0 |

## Tools

| Tool | What it does |
|---|---|
| `calculate` | Evaluate an expression, convert units, or solve an equation |

## Requirements

| Requirement | Detail |
|---|---|
| None | Local computation via mathjs |

## Configuration

`precision`, `useDegrees`.

Configured in LM Studio under Integrations → lmstudio-calculator; field definitions live in `src/configSchematics.ts`.

## Privileged surface

None. Expressions are evaluated by mathjs, not `eval`.

## Failure modes

| Symptom | Cause |
|---|---|
| Unexpected units | Ambiguous unit symbol — spell it out |

## Example prompts

- "What is 17! / 13!?"
- "Convert 120 km/h to m/s."

## Development

```bash
npm install    # also runs `lms dev --install`
npm run build  # tsc
node scripts/smoke.mjs   # from the suite root
```

## Status

| Item | State |
|---|---|
| Compiles | yes — verified with `tsc --noEmit` against the current toolchain |
| Tests | smoke harness: manifest validation + tool inventory |
| Verified against | LM Studio 0.4.28 |
| Known gaps | no behavioural tests; docs written from source review |

## License

MIT
