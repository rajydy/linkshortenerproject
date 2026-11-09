<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project Instructions

These rules apply to all work in this project:

- **CRITICAL — READ `/docs` INSTRUCTIONS BEFORE WRITING ANY CODE:** Before generating, editing, or proposing code, first identify and read every individual instruction file in [`docs/`](./docs/) that is relevant to the task. This is mandatory and must happen before code generation—not after implementation begins. When a task touches multiple areas, read each applicable guide. If it is unclear which guide applies, inspect the docs directory and read the likely relevant files before proceeding.
- Preserve the existing Next.js-generated rules above. Before using a Next.js API or changing framework behavior, consult the version-matched documentation in `node_modules/next/dist/docs/`.
- Keep changes focused, typed, and consistent with nearby code. Do not introduce a dependency or architectural pattern when the existing stack already provides a suitable solution.
- Do not assume the link-shortening product flow is implemented; inspect the current code and build on actual behavior rather than inferring it from the project name.
- Run the relevant checks from [`docs/agent-testing.md`](./docs/agent-testing.md) and report any checks that could not be run.

### Topic Guides

For detailed guidelines on specific topics, refer to the modular documentation in the `/docs` directory. ALWAYS refer to the relevant .md file BEFORE generating any code:

- Authentication: [`docs/authentication.md`](./docs/authentication.md)
- UI components: [`docs/ui-components.md`](./docs/ui-components.md)
