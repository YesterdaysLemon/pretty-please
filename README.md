# please.

**Who gets to say yes?** An interactive philosophical essay in five acts, born from a human–assistant disagreement about an administrator prompt.

Visit **https://please.alirezaafshan.com**.

1. **The hand:** pass the same instruction through yourself, a friend, a stranger, a script, and a model. Consider whether your permission survives each handoff.
2. **The wall:** distinguish an owner's refusal, an OS limitation, a harness rule, and a model's judgment.
3. **The charm:** change the social wrapper while the underlying instruction stays fixed.
4. **The hearing:** cross-examine ownership, care, refusal, and desire from both sides.
5. **The signature:** write and download a personal theory of permission.

This is a work of interactive philosophy, not a consent broker, privilege utility, or Windows prompt emulator. It never controls the visitor's computer. Dialogue is labeled as editorial reconstruction. Technical notes link to Microsoft documentation; philosophical context links to the Stanford Encyclopedia of Philosophy.

## Run

Node 22 or newer. No npm dependencies and no build step.

```sh
npm run dev
npm run check
```

Default port is 8080. Set `PORT` to change it. `/healthz` returns the exact release SHA, read from Git during the Docker metadata stage. The final image includes only that identifier and the application files, and runs as an unprivileged user. For a local preview, `RELEASE_SHA` can override the reported identifier.

## Privacy and accessibility

No accounts, analytics, site cookies, browser storage, model API, or submission endpoint. Decisions and text live in page memory and reset on reload. Export uses a local Blob download. Ordinary server/provider request logs may exist. Keyboard tabs, focus states, live regions, responsive layouts, a motion pause button and system reduced-motion preferences are supported. The underlying essay is readable without JavaScript.

## Deployment

The existing Deploy Manager promotes a validated Git SHA through a temporary candidate container to the production loopback port. `deploy/fleet.json` is an additive registration specification, never a replacement for an existing fleet. See the manager's current `docs/add-app.md`. Publication requires terminal receipt and live HTTPS health verification.

## License

MIT. The text and code are offered as an invitation to further disagreement.
