# F8 — Save & Delete Builds

> Implementation plan. Source: [docs/MISSING_FEATURES.md](../docs/MISSING_FEATURES.md) §MVP Feature Inventory.

## Metadata

| Field | Value |
|---|---|
| **Feature ID** | F8 |
| **Section** | Saved/Delete Builds |
| **Severity** | MAJOR |
| **Markets** | Anyone looking to build a computer |
| **Status (today)** | Not started |
| **Estimated effort** | 1 day |
| **Owner (proposed)** | Myself |
| **Depends on** | F2, F5, F6, F7 |
| **Unblocks** | None for MVP |

---

## 1. Problem Statement

Users should not have to rebuild their PC every time they come back to my site. They need a place where they can see their saved builds and delete builds they no longer want. This finishes the basic account/build workflow.

## 2. Goals

- Show a user's saved builds.
- Let a user open a saved build.
- Let a user delete a saved build.
- Make sure users can only access their own builds.
- Keep the saved-build page simple.

## 3. Non-Goals

- Sharing builds with other people.
- Public build profiles.
- Build recommendations.
- Favorite parts.
- Cloud syncing outside the normal account database.

## 4. Personas & User Stories

- **As a PC builder**, I want to see my saved builds so that I can come back to them later.
- **As a user with multiple builds**, I want to delete old builds so that my list stays organized.
- **As the project developer**, I want ownership checks so that users cannot see other users' private builds.

## 5. Functional Requirements

- **FR-1.** The system MUST allow an authenticated user to list their saved builds.
- **FR-2.** The system MUST allow an authenticated user to open one of their builds.
- **FR-3.** The system MUST allow an authenticated user to delete one of their builds.
- **FR-4.** The system MUST prevent a user from viewing or deleting another user's build.
- **FR-5.** The build list SHOULD show the build name and estimated price.
- **FR-6.** Deleting a build SHOULD require a confirmation step in the UI.

## 6. Non-Functional Requirements

- **Performance** — Saved build list requests should normally respond in under 500 ms locally.
- **Security** — All saved-build routes MUST require authentication and ownership checks.
- **Privacy & Compliance** — Saved builds are private to the account unless sharing is added later.
- **Accessibility** — Delete controls and confirmation dialogs must be keyboard accessible.
- **Scalability** — A user should be able to have multiple saved builds.
- **Reliability** — A failed delete should not make the build disappear from the UI unless the server confirms deletion.
- **Observability** — Log build deletion errors without logging sensitive information.
- **Maintainability** — Saved-build logic should reuse the same build model used by F5.
- **Internationalization** — English only.
- **Backward compatibility** — Existing builds should remain readable after future schema changes.

## 7. Acceptance Criteria

- **AC-1.** *Given* I am logged in and have saved builds, *when* I open my builds page, *then* I see my saved builds.
- **AC-2.** *Given* I have a saved build, *when* I select it, *then* I can open the build and see its parts and price.
- **AC-3.** *Given* I select a build I own, *when* I confirm deletion, *then* the build is deleted and removed from my list.
- **AC-4.** *Given* I try to delete a build owned by another user, *when* the request is sent, *then* the server rejects it.
- **AC-5.** *Given* I have no saved builds, *when* I open the builds page, *then* I see a message explaining that I have no saved builds yet.
- **AC-6.** *Given* deleting a build fails, *when* the request finishes, *then* the build remains visible and an error is shown.

## 8. Data Model

Uses the `Build` model created in F5.

Important fields:

- `id`
- `userId`
- `name`
- `totalPrice`
- `createdAt`
- `updatedAt`

A foreign key from `Build.userId` to `User.id` should enforce ownership at the database level.

## 9. API Surface

- `GET /api/builds` — authenticated; returns only the current user's builds.
- `DELETE /api/builds/:id` — authenticated and owner only.

`GET /api/builds/:id` is implemented as part of F5 so the builder can load an individual build.

Example list response:

```json
[
  {
    "id": 1,
    "name": "My Gaming PC",
    "totalPrice": 1299.99,
    "updatedAt": "2026-10-07T12:00:00Z"
  }
]
```

## 10. UI / UX

- Add a “My Builds” page.
- Show saved builds in cards or a simple list.
- Show build name and estimated price.
- Add an open/edit button.
- Add a delete button.
- Show a confirmation before deleting.
- Show loading while builds are being loaded.
- Show an empty state when there are no builds.
- Show an error if the list or delete request fails.
- Make the page responsive on mobile.
- Make buttons keyboard accessible.

## 11. AI / ML Considerations

Not part of this feature.

## 12. Integration Points

- F2 authentication
- F5 build data
- F6 price calculation
- F7 compatibility
- PostgreSQL/Prisma
- SvelteKit saved-build UI
- Express build routes

## 13. Dependencies & Sequencing

- Must ship after: F2, F5, F6, and F7.
- Must ship before: Nothing required for the MVP.
- Shared infrastructure needed: User/build database relationship.

## 14. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| User can access another user's build | M | H | Filter queries by authenticated user ID and check ownership. |
| Delete accidentally removes the wrong build | L | H | Show the build name in a confirmation step. |
| Saved build data gets out of date | M | M | Recalculate totals when the build is opened or updated. |

## 15. Rollout Plan

- Feature flag: None needed.
- Add the saved-build list after the earlier build features are working.
- Test deletion with multiple builds.
- Rollback: remove the delete UI while keeping saved builds available.

## 16. Test Plan

- **Unit** — Test ownership checks and delete logic.
- **Integration** — Test listing and deleting builds.
- **End-to-end** — Create a build, save it, find it in My Builds, open it, and delete it.
- **Security** — Try accessing and deleting another user's build.
- **Accessibility** — Test the build list and delete confirmation with keyboard navigation.
- **Performance / load** — Test a user with several saved builds.
- **Manual exploratory** — Test empty lists, failed requests, canceling deletion, and multiple builds.

## 17. Documentation & Training

- Document saved-build API routes.
- Explain how build ownership works.

## 18. Open Questions

1. Should deleted builds be permanently deleted or marked as deleted?
2. Should the My Builds page sort newest first?

## 19. References

- `MVP-feature-inventory.md`
- `F2-authentication.md`
- `F5-create-edit-build.md`
- `F6-build-price.md`
- `F7-compatibility.md`
