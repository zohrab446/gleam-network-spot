# Reference redesign
- [x] Add Community feed, persisted posts/comments/likes/saves, detail page and event registration; connect shared navigation.
- [x] Redesign Pro with clearly marked illustrative career panels, membership-gated previews and preserved checkout.
- [ ] Real AI code analysis — deferred by the user until model access is resolved.
- [ ] Verify Community and Pro interactions, permissions and desktop/mobile layouts — local preview client fails before hydration with a refresh-preamble error; successful writes also require a human Turnstile challenge on the allowed domain.
- [ ] Refresh the shared visual system and navigation to match uploaded references.
- [ ] Restyle landing/sign-in and dashboard while preserving auth, progress, rewards, and security.
- [ ] Verify desktop/mobile layouts and existing flows.
- [ ] Complete Projects, Exams, and Competitions: fix page errors, connect navigation, and verify their local interactions; stop after these three pages.

# Leaderboard period
- [x] Change leaderboard periods to the 15th-to-15th in Turkey time and restore current-period XP from recorded lesson rewards.
- [x] Update period labels and verify boundary tests and leaderboard results.

# Bot protection
- [x] Add fresh Turnstile verification to protected actions, with fail-closed server validation.
- [x] Reject fabricated lesson identities and locked lessons; make skips atomic.
- [x] Verify authenticated rejection, widget UI, and tests; document deployment requirements.
- [ ] Verify successful human claim on the allowed live domain — requires publishing and a human challenge completion.
- [ ] Protect direct Auth-provider calls — native CAPTCHA configuration is not exposed by available tools.
- [ ] Authoritative runtime/DOM/style grading and ad-completion receipts — require an external isolated grader and rewarded-ad provider.