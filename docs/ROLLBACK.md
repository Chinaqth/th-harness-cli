# Rollback and Uninstall

Run `harness uninstall` to remove the installed Runtime integration.

The command requires `~/.harness/manifest.json` and `~/.harness/state/install-record.json`. It removes only recorded Skill links whose targets still match, removes only the `<!-- harness:managed:* -->` block from Codex guidance, verifies installed Runtime checksums, then removes the managed Runtime and active records.

If an ownership record is missing, a projection target changed, or a Runtime file was modified, uninstall fails closed instead of guessing. User guidance, unmanaged Skills, product projects, source repositories, and the CLI package are preserved.

After resolving an ownership conflict, rerun `harness uninstall`. Remove the executable separately with:

```bash
npm uninstall -g @chinaqth/harness-cli
```
