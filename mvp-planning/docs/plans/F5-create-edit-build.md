# F5 — Create & Edit PC Build

> Implementation plan. Source: [docs/MISSING_FEATURES.md](../docs/MISSING_FEATURES.md) §MVP Feature Inventory.

## Metadata

| Field | Value |
|---|---|
| **Feature ID** | F5 |
| **Section** | PC Builder Edit/Create |
| **Severity** | BLOCKER |
| **Markets** | Anyone looking to build a computer |
| **Status (today)** | Not started |
| **Estimated effort** | 1-2 days |
| **Owner (proposed)** | Myself |
| **Depends on** | F2, F3 |
| **Unblocks** | F6, F7, F8 |

---

## 1. Problem Statement

This is the main part of my site. Users need to be able to choose parts and put them into a PC build. They should also be able to replace or remove parts while working on the build. Without this feature, the rest of the project does not have a real build to calculate or check.

## 2. Goals

- Let users start a PC build.
- Let users add one part to each main category.
- Let users replace and remove parts.
- Let users name their build.
- Store the build and its selected parts.
- Let users reopen and edit a build.

## 3. Non-Goals

- Saving builds permanently for every user — F8 handles the saved-build experience.
- Compatibility checking — F7.
- Recommendations based on budget.
- Sharing builds.
- 3D visualization.

## 4. Personas & User Stories

- **As a first-time PC builder**, I want to choose parts one at a time so that I can build a computer without knowing everything beforehand.
- **As a gamer**, I want to replace a part if I change my mind.
- **As a user**, I want to name my build so that I can tell my builds apart later.

## 5. Functional Requirements

- **FR-1.** The system MUST allow an authenticated user to create a build.
- **FR-2.** A build MUST support CPU, GPU, motherboard, RAM, storage, PSU, case, and cooler slots.
- **FR-3.** The system MUST allow a user to add a part to an empty slot.
- **FR-4.** The system MUST allow a user to replace a selected part.
- **FR-5.** The system MUST allow a user to remove a selected part.
- **FR-6.** The system MUST allow the user to give the build a name.
- **FR-7.** The system MUST prevent a user from editing another user's build.
- **FR-8.** The system SHOULD allow a build to be incomplete while the user is working on it.

## 6. Non-Functional Requirements

- **Performance** — Build updates should normally respond in under 500 ms locally.
- **Security** — All build creation/editing routes MUST require authentication and ownership checks.
- **Privacy & Compliance** — A user's build should only be visible to that user unless sharing is added later.
- **Accessibility** — Part selection and build controls must work with keyboard navigation.
- **Scalability** — The build-to-part relationship should allow multiple builds per user.
- **Reliability** — Failed saves should not erase the current build from the UI.
- **Observability** — Backend errors should include enough information to debug the failed operation.
- **Maintainability** — Build logic should be separated from authentication and catalog logic.
- **Internationalization** — English only.
- **Backward compatibility** — Existing builds should still work if optional fields are added later.

## 7. Acceptance Criteria

- **AC-1.** *Given* I am logged in, *when* I start a new build, *then* I see empty slots for the main PC part categories.
- **AC-2.** *Given* I am viewing the parts catalog, *when* I choose a part for a build slot, *then* that part appears in the correct slot.
- **AC-3.** *Given* a build already has a part selected, *when* I choose another part for that slot, *then* the old part is replaced.
- **AC-4.** *Given* a part is selected, *when* I remove it, *then* the slot becomes empty.
- **AC-5.** *Given* I am logged in, *when* I save/update my build, *then* the selected parts and build name are stored.
- **AC-6.** *Given* I am logged in as User A, *when* I try to edit User B's build, *then* the API rejects the request.

## 8. Data Model

`Build`:

- `id`
- `userId`
- `name`
- `totalPrice`
- `createdAt`
- `updatedAt`

A related `BuildComponent` relationship will connect a build to its selected components. This is cleaner than putting a single list of component IDs into one field because a build contains multiple parts.

Useful constraint:

- A build should not contain two components in the same main slot unless that slot is specifically allowed to contain multiple items, such as RAM or storage.

## 9. API Surface

- `POST /api/builds` — authenticated.
- `GET /api/builds/:id` — authenticated and owner only.
- `PUT /api/builds/:id` — authenticated and owner only.

Example request:

```json
{
  "name": "My Gaming PC",
  "components": [
    { "componentId": 1, "slot": "cpu" },
    { "componentId": 5, "slot": "gpu" }
  ]
}
```

The response should return the build, selected components, and current calculated price if available.

## 10. UI / UX

The main builder should have:

- Components on one side.
- “Your Build” on the other side.
- Slots for CPU, GPU, motherboard, RAM, storage, PSU, case, and cooler.
- Add, replace, and remove controls.
- Build name input.
- Save/update button.

States:

- Loading while a build is being loaded.
- Empty slots when no part is selected.
- Error message if a part cannot be added or saved.
- Unsaved changes should be clear to the user.

On mobile, the component list and build area should stack instead of staying side-by-side.

## 11. AI / ML Considerations

Not part of this feature.

## 12. Integration Points

- F2 authentication
- F3 parts catalog
- F4 search/filter
- PostgreSQL/Prisma
- SvelteKit builder UI
- Express build routes

## 13. Dependencies & Sequencing

- Must ship after: F2 and F3. F4 is helpful but not technically required.
- Must ship before: F6, F7, and F8.
- Shared infrastructure needed: Authentication and database.

## 14. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Build/component database relationship gets confusing | M | H | Use a separate build-component relationship and keep slot names consistent. |
| Users can edit another user's build | M | H | Check both authentication and build ownership. |
| Builder UI becomes too complicated | M | M | Start with one simple two-column layout and keep extra features out. |

## 15. Rollout Plan

- Feature flag: None needed.
- Create build tables/relationships first.
- Add backend routes.
- Connect the UI.
- Test creating and editing builds.
- Rollback: revert the build migration if necessary.

## 16. Test Plan

- **Unit** — Test build validation and slot rules.
- **Integration** — Test creating, reading, and updating builds.
- **End-to-end** — Log in, create a build, add parts, replace a part, and save it.
- **Security** — Try editing another user's build.
- **Accessibility** — Test all builder controls with a keyboard.
- **Performance / load** — Test saving a build with several selected parts.
- **Manual exploratory** — Try incomplete builds, removing parts, and changing parts multiple times.

## 17. Documentation & Training

- Explain the build API request format.
- Add a short explanation of how build slots work.

## 18. Open Questions

1. Should RAM and storage allow multiple selections in the MVP?
2. Should users be required to choose every part before saving?
3. Should the build name be required?

## 19. References

- `MVP-feature-inventory.md`
- `F2-authentication.md`
- `F3-parts-catalog.md`
- `F4-parts-search-filter.md`
