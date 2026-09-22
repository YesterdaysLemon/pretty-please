<!-- al-stack:project:start -->
## Al-stack project

Project: pretty-please. Profile: web. Status: experimental.

An interactive philosophical artwork about consent, delegation, and the authority to say yes.

`al-stack.toml` records this project's setup and dependencies. Work from the checkout selected for the task; other branches/worktrees are optional history. Use `al-stack register .` once when starting work here. Local registration does not change the project's lifecycle.

Project commands:
- dev: `npm run dev`
- check: `npm run check`

Edit project guidance outside this managed section. Use `al-stack configure` for its fields and `al-stack check .` for setup checks. Run the actual project checks for behavioral validation.
<!-- al-stack:project:end -->

## Purpose and scope

`please.` is an interactive philosophical artwork about consent, delegated will, and authority. The five acts explore the delegate, the source of a refusal, the rhetoric of politeness, competing arguments, and a visitor's own declaration. The user explicitly abandoned the native companion; do not revive it or turn the piece back into a product landing page.

## Working and checking

- `npm run dev`: dependency-free Node server on port 8080, or set `PORT`.
- `npm run check`: syntax checks and meaningful HTTP/asset/privacy route tests.
- Browser-check desktop and narrow layouts, delegation tabs and judgment persistence, refusal layers, courtesy range, hearing tabs, downloadable declaration, reset, reduced motion, and console errors.
- Source is ordinary HTML, CSS and JavaScript. No build step, API keys, analytics, model calls, local helper or permission API. All choices stay in page memory. A declaration is exported by a local browser Blob download.
- Public prose distinguishes constructed arguments from transcript quotations, evidence from interpretation, and technical inability from a policy or normative judgment. Do not imply access to a model's hidden reasoning or subjective experience.

## Release

Use `vps-operations` and the existing Deploy Manager. `deploy/fleet.json` describes the additive app registration. Exact-SHA Docker release, terminal manager receipt, public `/healthz`, and live browser checks are the completion evidence. `RELEASE_SHA` is baked into the Docker image. Port 3230 is production and 3231 candidate, both loopback only. Public hostname: `please.alirezaafshan.com`.

Frontend work uses `frontend-quality` and browser verification through `playwright`. New adoption uses `start-project`; DNS operations use `cloudflare`. Authenticated service work follows `credentials-access`.
