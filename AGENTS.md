<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Protected interactive server functions use per-action Turnstile middleware; verify tokens on every request and never cache successful verification, so login cannot authorize later automation.
- Public Turnstile configuration exposes only the widget site key; verification secrets stay inside server handlers.
- Lesson identities and progression are validated against the shared catalog; skips debit energy and write progress in one locked database transaction to prevent free skips.
