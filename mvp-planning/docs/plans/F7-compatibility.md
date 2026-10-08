# F7 — Build Compatibility Checking

> Implementation plan. Source: [docs/MISSING_FEATURES.md](../docs/MISSING_FEATURES.md) §MVP Feature Inventory.

## Metadata

| Field | Value |
|---|---|
| **Feature ID** | F7 |
| **Section** | Compatibility |
| **Severity** | BLOCKER |
| **Markets** | Anyone looking to build a computer |
| **Status (today)** | Not started |
| **Estimated effort** | 1-2 days |
| **Owner (proposed)** | Myself |
| **Depends on** | F5, F6 |
| **Unblocks** | F8 |

---

## 1. Problem Statement

One of the main reasons someone would use my site is to avoid buying PC parts that do not work together. The site needs to check the most important compatibility rules and tell the user what is wrong in a way that is easy to understand.

## 2. Goals

- Check the important compatibility rules between selected parts.
- Show clear messages when something does not work.
- Let compatible builds show that they are compatible.
- Run checks whenever the build changes.
- Keep the first version focused on the most useful compatibility checks.

## 3. Non-Goals

- Checking every possible technical issue.
- Real-world performance testing.
- FPS estimates.
- Advanced thermal simulation.
- Recommending replacement parts.

## 4. Personas & User Stories

- **As a first-time PC builder**, I want VexRig to tell me if parts are incompatible so that I do not buy the wrong parts.
- **As a PC enthusiast**, I want to see why something is incompatible so that I can fix my build.

## 5. Functional Requirements

- **FR-1.** The system MUST check CPU socket compatibility with the motherboard.
- **FR-2.** The system MUST check motherboard RAM type against selected RAM.
- **FR-3.** The system MUST check motherboard form factor against the selected case.
- **FR-4.** The system SHOULD check basic GPU/case compatibility when the needed dimensions are available.
- **FR-5.** The system MUST check that estimated power needs do not exceed the selected PSU's capacity when enough power data is available.
- **FR-6.** The system MUST return clear compatibility messages.
- **FR-7.** Compatibility checking MUST not prevent users from continuing to build an incomplete PC.

## 6. Non-Functional Requirements

- **Performance** — A compatibility check should normally finish in under 500 ms locally.
- **Security** — Compatibility results should be based on trusted component data.
- **Privacy & Compliance** — No extra personal information is needed.
- **Accessibility** — Compatibility messages must not rely only on color.
- **Scalability** — Rules should be easy to add later.
- **Reliability** — Missing data should be reported as “cannot verify” instead of incorrectly saying compatible.
- **Observability** — Compatibility errors should be logged.
- **Maintainability** — Each compatibility rule should be easy to test separately.
- **Internationalization** — English only.
- **Backward compatibility** — Adding new rules should not break existing builds.

## 7. Acceptance Criteria

- **AC-1.** *Given* a CPU and motherboard have matching socket types, *when* compatibility is checked, *then* no CPU socket error is shown.
- **AC-2.** *Given* a CPU and motherboard have different socket types, *when* compatibility is checked, *then* an incompatibility message explains the socket mismatch.
- **AC-3.** *Given* the motherboard supports DDR5 and the selected RAM is DDR4, *when* compatibility is checked, *then* a RAM compatibility error is shown.
- **AC-4.** *Given* the selected motherboard and case form factors are incompatible, *when* compatibility is checked, *then* a case/motherboard incompatibility message is shown.
- **AC-5.** *Given* the selected parts require more power than the PSU provides, *when* compatibility is checked, *then* a power warning/error is shown.
- **AC-6.** *Given* some compatibility information is missing, *when* the check runs, *then* the system does not claim the parts are definitely compatible.

## 8. Data Model

Compatibility information may be stored directly on `Component` for simple attributes such as:

- CPU socket
- RAM type
- motherboard form factor
- PSU wattage
- component wattage
- GPU/case dimensions

A separate compatibility table can be used for more complicated rules if needed.

## 9. API Surface

- `POST /api/compatibility/check` — authenticated or tied to a current build.

Example request:

```json
{
  "componentIds": [1, 4, 8, 12]
}
```

Example response:

```json
{
  "compatible": false,
  "issues": [
    "The CPU socket does not match the motherboard socket."
  ]
}
```

## 10. UI / UX

- Show a compatibility status in the builder.
- Show a success message when the current selections pass the checks.
- Show clear warning/error messages when something does not match.
- Do not use color alone to communicate compatibility.
- Show loading while the compatibility check runs.
- Show a useful error if the check cannot complete.
- On mobile, compatibility messages should fit the screen.

## 11. AI / ML Considerations

Not part of this feature.

## 12. Integration Points

- F5 build data
- F6 price/build information
- Component compatibility fields
- Prisma
- Express compatibility route
- SvelteKit builder UI

## 13. Dependencies & Sequencing

- Must ship after: F5 and F6.
- Must ship before: F8.
- Shared infrastructure needed: Component compatibility data.

## 14. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Compatibility rules become too large | M | H | Start with the most important rules only. |
| Component data is missing | M | H | Show “cannot verify” instead of guessing. |
| A rule is implemented incorrectly | M | H | Write tests for every compatibility rule. |

## 15. Rollout Plan

- Feature flag: None needed.
- Add compatibility data first.
- Add the rule functions.
- Add the API route.
- Connect the builder UI.
- Rollback: temporarily disable checks while keeping build creation available.

## 16. Test Plan

- **Unit** — Test every compatibility rule separately.
- **Integration** — Test the compatibility API with compatible and incompatible component combinations.
- **End-to-end** — Build a PC with both compatible and incompatible parts.
- **Security** — Make sure the API does not trust compatibility data supplied by the browser.
- **Accessibility** — Check that warnings are readable by screen readers and do not rely only on color.
- **Performance / load** — Test checks with a normal eight-part build.
- **Manual exploratory** — Try incomplete builds and missing compatibility data.

## 17. Documentation & Training

- Document which compatibility rules the MVP checks.
- Explain that the checker is not a guarantee of every possible real-world compatibility issue.

## 18. Open Questions

1. How much GPU/case dimension data will the chosen part data source provide?
2. Should power compatibility be a warning or a hard error?
3. Should compatibility be checked automatically after every change or only when the user clicks a button?

## 19. References

- `MVP-feature-inventory.md`
- `F5-create-edit-build.md`
- `F6-build-price.md`
