# F6 — Build Price Calculation

> Implementation plan. Source: [docs/MISSING_FEATURES.md](../docs/MISSING_FEATURES.md) §MVP Feature Inventory.

## Metadata

| Field | Value |
|---|---|
| **Feature ID** | F6 |
| **Section** | Pricing |
| **Severity** | MAJOR |
| **Markets** | Anyone looking to build a computer |
| **Status (today)** | Not started |
| **Estimated effort** | less than a day |
| **Owner (proposed)** | Myself |
| **Depends on** | F5 |
| **Unblocks** | F7, F8 |

---

## 1. Problem Statement

Users need to know roughly how much their PC build costs while they are choosing parts. My site should automatically add the prices of the selected parts and show the current estimated total.

## 2. Goals

- Calculate the total from selected part prices.
- Update the total when parts are added, replaced, or removed.
- Show the total clearly in the builder.
- Store or return the calculated total with the build.

## 3. Non-Goals

- Live price tracking.
- Sales or coupons.
- Tax and shipping calculations.
- Price comparison across stores.
- A separate budget recommendation system.

## 4. Personas & User Stories

- **As someone building an affordable PC**, I want to see the total price so that I know when my build is getting too expensive.
- **As a gamer**, I want the price to update when I change parts so that I can compare different builds.

## 5. Functional Requirements

- **FR-1.** The system MUST calculate the total price from selected components.
- **FR-2.** The total MUST update when a component is added, replaced, or removed.
- **FR-3.** The total MUST be based on the current database price of each selected component.
- **FR-4.** The system MUST display the total with normal currency formatting.
- **FR-5.** The system SHOULD show a total of `$0.00` when no parts are selected.

## 6. Non-Functional Requirements

- **Performance** — Price calculation should happen quickly enough that the user does not notice a delay.
- **Security** — The server should calculate the trusted total instead of trusting a price sent by the browser.
- **Privacy & Compliance** — No personal data is needed for price calculation.
- **Accessibility** — The total should have a clear label.
- **Scalability** — Calculation should work with builds containing several parts.
- **Reliability** — Missing/invalid component prices should produce an error instead of a wrong total.
- **Observability** — Log calculation errors.
- **Maintainability** — Keep calculation logic in one reusable function.
- **Internationalization** — Use standard USD formatting for the MVP.
- **Backward compatibility** — Existing builds should recalculate correctly if their parts are loaded.

## 7. Acceptance Criteria

- **AC-1.** *Given* a build contains parts costing $100 and $200, *when* the total is calculated, *then* the displayed total is $300.
- **AC-2.** *Given* a build has a selected part, *when* that part is removed, *then* its price is removed from the total.
- **AC-3.** *Given* a build has a part selected, *when* I replace it with a more expensive part, *then* the total increases to match the new part.
- **AC-4.** *Given* no parts are selected, *when* the total is shown, *then* it displays $0.00.
- **AC-5.** *Given* the browser sends a fake component price, *when* the build is saved, *then* the server uses the real database price.

## 8. Data Model

The `Build` model can have a `totalPrice` value for convenience, but the server should be able to recalculate it from the related components.

The `Component.price` field is the source of the current price.

## 9. API Surface

No new required route.

The build create/update responses from F5 should include:

```json
{
  "totalPrice": 1299.99
}
```

The server MUST calculate the total instead of trusting a value sent by the client.

## 10. UI / UX

- Show “Estimated Total” in the builder.
- Update it after adding/removing/replacing parts.
- Show loading while a saved build is being calculated.
- If calculation fails, show a useful error and do not silently display a wrong total.
- Keep the total visible on mobile.

## 11. AI / ML Considerations

Not part of this feature.

## 12. Integration Points

- F5 build data
- Component prices from F3
- Prisma
- Express build routes
- SvelteKit builder UI

## 13. Dependencies & Sequencing

- Must ship after: F5.
- Must ship before: F7 and F8.
- Shared infrastructure needed: Component prices and build relationships.

## 14. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Client sends a fake price | M | H | Always calculate the price on the server. |
| Price gets out of sync | M | M | Recalculate from current component data when the build changes. |

## 15. Rollout Plan

- Feature flag: None needed.
- Add calculation logic to the build service.
- Add the total to the builder UI.
- Test different combinations of parts.
- Rollback: remove the displayed calculation while keeping build creation working.

## 16. Test Plan

- **Unit** — Test totals with zero, one, and multiple components.
- **Integration** — Test that API responses contain the server-calculated total.
- **End-to-end** — Add and remove parts and watch the total change.
- **Security** — Send fake prices and confirm they are ignored.
- **Accessibility** — Confirm the total has a readable label.
- **Performance / load** — Test calculation with several components.
- **Manual exploratory** — Try replacing expensive and inexpensive parts.

## 17. Documentation & Training

- Document how build totals are calculated.
- Note that prices are estimates and are not live store prices.

## 18. Open Questions

1. Should the price be recalculated every time a build is loaded?
2. Should prices be stored as cents instead of decimal currency values?

## 19. References

- `MVP-feature-inventory.md`
- `F5-create-edit-build.md`
