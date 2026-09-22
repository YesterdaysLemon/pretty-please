---
name: vps-operations
description: Operate Alireza's personal VPS and prepare or deploy apps through his existing Deploy Manager. Use for VPS inspection, server administration, deployment setup, and diagnosing live apps on his infrastructure.
---

# Personal VPS operations

For new apps on this infrastructure, use the existing VPS and Deploy Manager. Do not choose ChatGPT Sites unless the user requests it. Keep normal work in Codex Desktop.

## Connect and establish current state

Use the local SSH alias `vps-admin`. Verify its resolved destination with `ssh -G vps-admin`, then check:

```powershell
ssh -o BatchMode=yes -o ConnectTimeout=15 vps-admin 'id -un; sudo -n id -u'
```

Expected output after bootstrap is `hostadmin` and `0`. This account intentionally has broad noninteractive sudo for trusted host machines. Use it to complete the authorized task without making the owner relay ordinary commands. Access is a capability, not a standing task to alter unrelated services.

If the alias or privilege check fails, diagnose the actual connection/configuration. Do not claim bootstrap is complete or weaken host-key checks. The older `ali` account is a preserved fallback and may require a sudo password. Before changing access controls, retain a working recovery connection.

Obtain services, ports, installed releases, and health from the server when needed. These are live facts, not durable memory. Avoid dumping environment files, process environments, or credentials into model context.

## Deployment source of truth

Locate the saved Deploy Manager project on the current host and verify its configured Git remote. On the original Windows host the checkout is under `~/Project/deploy-manager`; other hosts can have different paths. Read its current `README.md` and `docs/agent-quickstart.md`. Follow the current task's authorization and the actual target project's constraints. Prefer its existing release mechanism, and distinguish acceptance from a successful terminal receipt and live health.

For additions to an existing fleet, use Deploy Manager's `docs/add-app.md` registration workflow. Inspect the current configuration, review the additive plan and its conflict checks, and apply within the task's existing authorization. A one-app setup bundle is not a replacement for a fleet-wide configuration. Keep registration mechanics in Deploy Manager.

## DNS diagnosis

If the new hostname fails locally, compare the native resolver (including an active VPN resolver), a public resolver, and DNS plus HTTPS from the VPS. Record which path failed. Public DNS and exact-SHA HTTPS can be healthy while the local resolver still returns NXDOMAIN. A temporary local preview or SSH tunnel can support browser checks, but identify that evidence separately from public HTTPS. Resolver or VPN reconfiguration is separate host maintenance unless included in the task.

## Credentials

For service API work such as Cloudflare DNS, discover and use an already-authenticated connector when it supports the action. If credentials are still needed, follow `credentials-access`; a gateway authentication failure does not establish that a connected service is unavailable.

Normal SSH uses the existing local `id_ed25519_vps` identity. The same key is stored in Proton Pass under `api_keys` / `VPS SSH - trusted Windows host`; verify current metadata when recovery is needed. `%LOCALAPPDATA%/VpsOperations/proton-key.json` holds only the import receipt and item references. Owner and agent sessions can have different share IDs for the same vault, so resolve the item within the active session rather than blindly reusing the owner's share ID.

Read the `credentials-access` skill for the current host's scoped Proton gateway and use a specific `-Reason`. The Windows helper is bundled in that skill under `scripts/api-keys.ps1`; an existing installed wrapper is also supported. The agent grant is read-only. Check metadata rather than assuming an item exists. Never print private keys or put secret values in this skill, prompts, Git, or command arguments. Recovery through Proton must consume the selected credential directly in a protected process or file; use current CLI help. Do not replace the existing SSH agent globally just to recover one key. Installing these skills on another host does not enroll credentials or configure SSH there.

Keep this skill small. Add a helper when a real task demonstrates repeated friction. Retire obsolete recipes from normal discovery while keeping explicitly useful recovery procedures available. Do not automatically decay explicit user preferences or access policy.
