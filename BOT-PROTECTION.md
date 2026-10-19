# Bot protection

## Enforced
- Every interactive game mutation requires a fresh Turnstile token verified by Cloudflare on the server. Missing, invalid, expired, reused, wrong-action, and wrong-host tokens fail closed.
- Lesson completion, skip, rewards, streak, username, hints, promos, chat, remote execution and checkout are covered. Background energy sync and leaderboard reads remain challenge-free.
- Login guard, signup, Google login, password reset and password update UI flows request verification. Login-attempt clearing requires the authenticated owner.
- Canonical lesson identity and prerequisite checks prevent invented lessons and jumping ahead within a track. Skip charges energy and writes progress atomically.
- Canonical text checks are validated server-side using submitted files; readonly files are reconstructed from the catalog.

## Deployment and validation
- Publish to deploy the updated functions and stored Turnstile configuration to the live app.
- The Turnstile widget must allow the hostname where it is used. Add the actual preview hostname to Cloudflare if testing the hosted preview.
- A real signed-in rewards flow showed the Turnstile widget. A forged verification token was rejected and no reward was claimed. Unit tests pass.
- Successful human verification and reward completion on the allowed live domain still need manual confirmation; automated localhost verification did not complete.

## Remaining boundaries
- Auth-provider-native CAPTCHA settings could not be enabled through the available configuration tools. UI verification does not protect direct calls to the Auth provider; enable native CAPTCHA through supported hosted settings when available.
- Full authoritative execution, DOM and computed-style grading requires an external isolated sandbox/browser grader. Text verification alone cannot prove all lesson checks passed.
- Turnstile proves a challenge was accepted, not that an advertisement was watched. Ad energy still depends on existing cooldowns and claim limits, not a signed rewarded-ad provider receipt.
- No new ad-hoc rate limiter or automatic account ban was introduced. CAPTCHA cannot guarantee that all bots are stopped.