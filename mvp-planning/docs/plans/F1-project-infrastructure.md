# F1 — Project & Database Setup

> Implementation plan. Source: [docs/MISSING_FEATURES.md](../MISSING_FEATURES.md) §MVP Feature Inventory.

## Metadata

| Field | Value |
|---|---|
| **Feature ID** | F1 |
| **Section** | Project Setup |
| **Severity** | Blocker |
| **Markets** | People looking to build their own computers |
| **Status (today)** | In Progress |
| **Estimated effort** | 1 day |
| **Owner (proposed)** | Myself |
| **Depends on** | None |
| **Unblocks** | F2, F3 |

---

## 1. Problem Statement

Before I can build the actual PC builder, I need the basic project structure, database connection, and backend/frontend setup working. If this part is not done first, the other features will be harder to build and test. The goal is to have a simple foundation that the rest of my PC Builder can use.

## 2. Goals

- Set up the SvelteKit frontend.
- Set up the Node.js and Express backend.
- Connect the project to PostgreSQL using Prisma.
- Create the starting database models.
- Make sure the frontend and backend can communicate.

## 3. Non-Goals

- Building the finished PC builder UI.
- Adding login and registration.
- Adding compatibility rules.
- Adding extra features outside the MVP.

## 4. Personas & User Stories

- **As the project developer**, I want the project set up correctly so that I can build the other features without fighting the setup.
- **As a future user**, I want the website to load normally so that I can use the PC builder.

## 5. Functional Requirements

- **FR-1.** The project MUST have a SvelteKit frontend.
- **FR-2.** The project MUST have a Node.js/Express backend.
- **FR-3.** The backend MUST connect to PostgreSQL through Prisma.
- **FR-4.** The project MUST have environment variables for database connection information.
- **FR-5.** The backend SHOULD have a simple health-check route so I can tell if it is running.

## 6. Non-Functional Requirements

- **Performance** — Basic API requests should normally respond in under 500 ms locally.
- **Security** — Database credentials MUST stay in environment variables and not be committed to Git.
- **Privacy & Compliance** — This app will just use data to help build computers and only take personal data on their preferences for parts.
- **Accessibility** — UI Should be accessible for 
- **Scalability** — The database structure should be reasonable for a small project with hundreds or thousands of parts/builds.
- **Reliability** — The app should show a useful error instead of crashing when the database is unavailable.
- **Observability** — Backend errors should be logged clearly enough for debugging.
- **Maintainability** — Keep frontend, backend, database, and shared types organized in clear folders.
- **Internationalization** — English only for the MVP.
- **Backward compatibility** — Prisma migrations will be used when the database structure changes.

## 7. Acceptance Criteria

- **AC-1.** *Given* the project is installed, *when* I start the frontend, *then* the SvelteKit site loads without an error.
- **AC-2.** *Given* PostgreSQL is running and configured, *when* I start the backend, *then* Prisma can connect to the database.
- **AC-3.** *Given* the backend is running, *when* I request the health-check route, *then* it returns a successful response.
- **AC-4.** *Given* a database migration has been created, *when* I run the Prisma migration, *then* the required tables are created.

## 8. Data Model

The starting Prisma schema will include:

- `User`
- `Component`
- `Build`
- A build-to-component relationship for parts inside a build
- Compatibility information as needed for F7

The exact relationship between builds and components will be finalized before F5. Prisma migrations will be used instead of the SQL migration naming convention shown in the assignment template.

## 9. API Surface

- `GET /api/health` — public, returns backend status.
- The actual MVP API routes will be added in F2–F8.
- API responses should use JSON.
- No special rate limiting is needed for the local student project.
- The routes should be documented as they are added.

## 10. UI / UX

- Create the basic SvelteKit layout.
- Add a simple home page that proves the frontend works.
- There should be a basic loading state while the app is starting.
- A simple error message should be shown if an API request cannot connect.
- The layout should work on desktop and mobile.

## 11. AI / ML Considerations

Not part of this feature.

## 12. Integration Points

- SvelteKit frontend
- Node.js
- Express
- PostgreSQL
- Prisma
- Git/GitHub

## 13. Dependencies & Sequencing

- Must ship after: Nothing.
- Must ship before: F2 and F3.
- Shared infrastructure needed: PostgreSQL database and Prisma.

## 14. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Database connection does not work | M | H | Test the connection before starting other database features. |
| Project structure gets messy | M | M | Keep frontend, backend, and database code organized from the beginning. |
| Environment variables are committed | L | H | Use `.env` and `.gitignore`. |

## 15. Rollout Plan

- Feature flag: None needed.
- Run the database migration before running features that use it.
- Test the basic setup locally.
- Rollback: revert the migration or reset the development database if necessary.

## 16. Test Plan

- **Unit** — Test any setup/helper functions that are created.
- **Integration** — Test that Express can connect to PostgreSQL through Prisma.
- **End-to-end** — Open the site and make sure the frontend loads.
- **Security** — Check that secrets are not in Git.
- **Accessibility** — Check the basic page with an accessibility checker.
- **Performance / load** — Make a few health-check requests and confirm normal response times.
- **Manual exploratory** — Clone the project on a clean machine/environment and follow the setup instructions.

## 17. Documentation & Training

- Add setup instructions to the README.
- Explain required environment variables.
- Document how to run Prisma migrations.

## 18. Open Questions

1. Should the backend and frontend be in separate folders or one project?
2. What component data source will be used for the first version?
3. How much sample PC part data should be included for testing?

## 19. References

- `MVP-feature-inventory.md`
- Project specification for VexRig
- SvelteKit documentation
- Express documentation
- Prisma documentation
- PostgreSQL documentation
