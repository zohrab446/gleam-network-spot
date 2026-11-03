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