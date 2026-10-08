# F4 — Parts Search & Filtering

> Implementation plan. Source: [docs/MISSING_FEATURES.md](../docs/MISSING_FEATURES.md) §MVP Feature Inventory.

## Metadata

| Field | Value |
|---|---|
| **Feature ID** | F4 |
| **Section** | PC Parts |
| **Severity** | MAJOR |
| **Markets** | N/A — student project |
| **Status (today)** | MISSING |
| **Estimated effort** | S (1w) |
| **Owner (proposed)** | Me / project developer |
| **Depends on** | F3 |
| **Unblocks** | F5 |

---

## 1. Problem Statement

A large list of PC parts can be annoying to look through, especially for someone who does not know much about PC parts yet. VexRig needs simple search and filtering so users can find the parts they actually want without scrolling through everything.

## 2. Goals

- Let users search parts by name or brand.
- Let users filter by category.
- Let users narrow results by useful information such as price.
- Keep the search simple enough for a beginner to understand.
- Make filters work on mobile.

## 3. Non-Goals

- Advanced AI recommendations.
- Price history.
- Live shopping results.
- Complicated comparison tools.

## 4. Personas & User Stories

- **As a first-time PC builder**, I want to filter parts by type so that I only see parts I can add to that slot.
- **As a gamer**, I want to search by name or brand so that I can quickly find a part I know I want.
- **As someone on a budget**, I want to filter by price so that I do not accidentally choose a part that is too expensive.

## 5. Functional Requirements

- **FR-1.** The system MUST allow searching parts by name.
- **FR-2.** The system MUST allow filtering by category.
- **FR-3.** The system SHOULD allow filtering by price range.
- **FR-4.** Search and filters MUST be able to work together.
- **FR-5.** The system MUST show an empty state when no parts match.
- **FR-6.** Clearing filters MUST return the normal catalog results.

## 6. Non-Functional Requirements

- **Performance** — Search requests should normally respond in under 500 ms locally for the MVP dataset.
- **Security** — Search input should be handled safely and not directly inserted into SQL.
- **Privacy & Compliance** — Search history does not need to be stored.
- **Accessibility** — Filter controls need labels and keyboard support.
- **Scalability** — The API should allow more parts to be added without changing the UI.
- **Reliability** — Bad filter values should return a useful validation error.
- **Observability** — API errors should be logged.
- **Maintainability** — Search/filter parsing should be kept separate from the UI.
- **Internationalization** — English only.
- **Backward compatibility** — Existing catalog routes should continue working.

## 7. Acceptance Criteria

- **AC-1.** *Given* parts exist, *when* I search for a part name, *then* matching parts are displayed.
- **AC-2.** *Given* parts from multiple categories exist, *when* I select a category, *then* only that category is displayed.
- **AC-3.** *Given* a price range is selected, *when* I apply it, *then* only parts inside the range are displayed.
- **AC-4.** *Given* multiple filters are selected, *when* I apply them, *then* the results match all selected filters.
- **AC-5.** *Given* no parts match, *when* the search finishes, *then* the page displays a message saying no parts were found.
- **AC-6.** *Given* filters are active, *when* I clear them, *then* the normal catalog results return.

## 8. Data Model

No new required table.

The `Component` model from F3 will be queried using fields such as:

- name
- brand
- category
- price

Indexes can be added if testing shows searches need them.

## 9. API Surface

The main route is:

- `GET /api/components?search=&category=&minPrice=&maxPrice=`

The response is a list of components matching the filters.

No authentication is required because browsing parts is public.

## 10. UI / UX

- Add a search box.
- Add category filter controls.
- Add optional minimum and maximum price controls.
- Show the number of results when useful.
- Show loading while results are being fetched.
- Show a no-results message.
- Show an error if the search request fails.
- Keep filters usable on a small screen.
- Make sure labels are connected to inputs.

## 11. AI / ML Considerations

Not part of this feature.

## 12. Integration Points

- F3 parts API
- SvelteKit catalog UI
- Express component route
- PostgreSQL/Prisma queries

## 13. Dependencies & Sequencing

- Must ship after: F3.
- Must ship before: F5.
- Shared infrastructure needed: Existing component database.

## 14. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Filters become too complicated | M | M | Start with name, category, and price only. |
| Search is slow with more data | L | M | Add database indexes if needed. |
| Mobile filters take up too much room | M | M | Use a collapsible filter section on small screens. |

## 15. Rollout Plan

- Feature flag: None needed.
- Add API filtering first, then connect the UI.
- Test each filter separately and together.
- Rollback: remove the filtering parameters while keeping the original catalog route.

## 16. Test Plan

- **Unit** — Test search/filter parameter parsing.
- **Integration** — Test combinations of search, category, and price filters.
- **End-to-end** — Search for a part and filter the results through the UI.
- **Security** — Test unusual search strings and invalid price values.
- **Accessibility** — Test filters with keyboard navigation.
- **Performance / load** — Test search with a larger sample dataset.
- **Manual exploratory** — Try empty searches, no results, and clearing filters.

## 17. Documentation & Training

- Document the component query parameters.
- Add a short explanation of the filter options if needed.

## 18. Open Questions

1. Should price filtering use exact numbers or preset ranges?
2. Should brand be a filter in the first version or just searchable?

## 19. References

- `MVP-feature-inventory.md`
- `F3-parts-catalog.md`
