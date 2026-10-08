# F3 — PC Parts Catalog

> Implementation plan. Source: [docs/MISSING_FEATURES.md](../docs/MISSING_FEATURES.md) §MVP Feature Inventory.

## Metadata

| Field | Value |
|---|---|
| **Feature ID** | F3 |
| **Section** | PC Parts |
| **Severity** | MAJOR |
| **Markets** | N/A — student project |
| **Status (today)** | MISSING |
| **Estimated effort** | S (1w) |
| **Owner (proposed)** | Me / project developer |
| **Depends on** | F1 |
| **Unblocks** | F4, F5 |

---

## 1. Problem Statement

A PC builder is not useful if users cannot see the parts they can choose from. VexRig needs a basic catalog of CPUs, GPUs, motherboards, RAM, storage, PSUs, cases, and coolers. The catalog should give enough information for users to understand what they are selecting.

## 2. Goals

- Store PC parts in the database.
- Display parts by category.
- Show useful information such as name, brand, price, and description.
- Give the frontend an API for getting parts.
- Have enough sample data to test the builder.

## 3. Non-Goals

- Live price tracking.
- Buying parts directly.
- Product reviews.
- User favorites.
- Advanced product recommendations.

## 4. Personas & User Stories

- **As a first-time PC builder**, I want to browse parts by category so that I can see what I can use.
- **As a gamer**, I want to see the price and basic information about a part so that I can decide if it fits my build.
- **As the project developer**, I want the parts in the database so that other features can use the same data.

## 5. Functional Requirements

- **FR-1.** The system MUST store PC parts with a name, category, brand, price, and description.
- **FR-2.** The system MUST support CPU, GPU, motherboard, RAM, storage, PSU, case, and cooler categories.
- **FR-3.** The system MUST allow users to get a list of parts.
- **FR-4.** The system MUST allow users to get one part by ID.
- **FR-5.** The system MUST allow users to get parts by category.
- **FR-6.** The catalog SHOULD contain enough sample parts to test each category.

## 6. Non-Functional Requirements

- **Performance** — Catalog requests should normally respond in under 500 ms locally.
- **Security** — Users should only be able to read catalog data; creating/editing catalog data is not part of the public MVP.
- **Privacy & Compliance** — No personal information is stored in parts.
- **Accessibility** — Part cards and controls must work with keyboard navigation.
- **Scalability** — Add indexes on category and other commonly searched fields if needed.
- **Reliability** — An empty category should return an empty list instead of an error.
- **Observability** — API errors should be logged.
- **Maintainability** — Keep catalog logic in its own backend module.
- **Internationalization** — English only for the MVP.
- **Backward compatibility** — Changes to the component schema should use Prisma migrations.

## 7. Acceptance Criteria

- **AC-1.** *Given* parts exist in the database, *when* I open the parts catalog, *then* the parts are displayed with their basic information.
- **AC-2.** *Given* parts exist in a category, *when* I request that category, *then* only parts from that category are returned.
- **AC-3.** *Given* a valid part ID, *when* I request it, *then* the API returns that part.
- **AC-4.** *Given* a part ID does not exist, *when* I request it, *then* the API returns a not-found response.
- **AC-5.** *Given* a category has no parts, *when* I request that category, *then* the website shows an empty state instead of breaking.

## 8. Data Model

`Component`:

- `id`
- `name`
- `category`
- `brand`
- `price`
- `description`
- Compatibility-related fields needed later, such as CPU socket, RAM type, wattage, form factor, or dimensions.

The category should be stored consistently so filters work later.

## 9. API Surface

- `GET /api/components` — public.
- `GET /api/components/:id` — public.
- `GET /api/components/category/:category` — public.

Example response:

```json
{
  "id": 1,
  "name": "Example CPU",
  "category": "cpu",
  "brand": "Example",
  "price": 199.99,
  "description": "Example processor"
}
```

## 10. UI / UX

- Add a parts catalog page.
- Show cards or rows for parts.
- Show name, brand, category, price, and description.
- Show loading while parts are being fetched.
- Show an empty state when there are no parts.
- Show an error if the API cannot load the catalog.
- Make the catalog responsive on mobile.
- Use buttons/links that can be reached with a keyboard.

## 11. AI / ML Considerations

Not part of this feature.

## 12. Integration Points

- PostgreSQL
- Prisma
- Express
- SvelteKit
- Component data source

## 13. Dependencies & Sequencing

- Must ship after: F1.
- Must ship before: F4 and F5.
- Shared infrastructure needed: PostgreSQL and Prisma.

## 14. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Parts have missing compatibility information | M | H | Decide on required fields before adding large amounts of data. |
| Data source is inconsistent | M | M | Normalize category names and prices when importing data. |
| Too much part data takes too long | M | M | Start with a small set of useful sample parts. |

## 15. Rollout Plan

- Feature flag: None needed.
- Add database structure, then seed sample data.
- Test all eight part categories.
- Rollback: remove test seed data or revert the development migration.

## 16. Test Plan

- **Unit** — Test category validation and any data conversion functions.
- **Integration** — Test each catalog API route.
- **End-to-end** — Open the catalog and view parts.
- **Security** — Confirm public users cannot modify catalog data.
- **Accessibility** — Test catalog navigation with keyboard controls.
- **Performance / load** — Test catalog requests with a larger sample dataset.
- **Manual exploratory** — Check that prices, categories, and names display correctly.

## 17. Documentation & Training

- Document the component fields.
- Document how sample data is seeded.
- Add API route information to the project documentation.

## 18. Open Questions

1. Which part data source should I use for the initial catalog?
2. How many parts should each category have for the MVP?

## 19. References

- `MVP-feature-inventory.md`
- `F1-project-infrastructure.md`
- Project VexRig specification
