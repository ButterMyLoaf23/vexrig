# F2 — User Registration & Authentication

> Implementation plan. Source: [docs/MISSING_FEATURES.md](../MISSING_FEATURES.md) §MVP Feature Inventory.

## Metadata

| Field | Value |
|---|---|
| **Feature ID** | F2 |
| **Section** | User Accounts |
| **Severity** | MAJOR |
| **Markets** | Anyone looking to build a computer |
| **Status (today)** | Working on |
| **Estimated effort** | 1 day |
| **Owner (proposed)** | Myself |
| **Depends on** | F1 |
| **Unblocks** | F5, F8 |

---

## 1. Problem Statement

Users need an account if they are going to save their PC builds. My app needs a simple way for someone to register, log in, and stay logged in while using the site. This also gives the backend a way to know which builds belong to which user.

## 2. Goals

- Let users create an account.
- Let users log in and log out.
- Protect build-related actions.
- Keep passwords stored safely.
- Let the frontend know who is currently logged in.

## 3. Non-Goals

- Social login.
- Password reset by email.
- User profiles.
- Admin accounts.
- Two-factor authentication.

## 4. Personas & User Stories

- **As a first-time PC builder**, I want to make an account so that I can save my build.
- **As a returning user**, I want to log in so that I can access my saved builds.
- **As the project developer**, I want protected routes so that one user cannot access another user's builds.

## 5. Functional Requirements

- **FR-1.** The system MUST allow a user to register with a username, email, and password.
- **FR-2.** The system MUST reject registration when the email is already in use.
- **FR-3.** The system MUST hash passwords with bcrypt before storing them.
- **FR-4.** The system MUST allow a registered user to log in.
- **FR-5.** The system MUST issue a JWT after successful login.
- **FR-6.** The system MUST provide a way to log out.
- **FR-7.** Protected build routes MUST require a valid authenticated user.
- **FR-8.** The system MUST NOT return a user's password in API responses.

## 6. Non-Functional Requirements

- **Performance** — Login and registration should normally respond in under 500 ms locally.
- **Security** — Passwords MUST be hashed. JWT secrets MUST be stored in environment variables.
- **Privacy & Compliance** — Only information needed for the account should be stored.
- **Accessibility** — Forms MUST have labels, useful error messages, and keyboard support.
- **Scalability** — The database should support many users without changing the basic design.
- **Reliability** — Invalid login attempts should return a clear error without crashing the server.
- **Observability** — Authentication errors should be logged without logging passwords or tokens.
- **Maintainability** — Authentication middleware should be kept separate from route handlers.
- **Internationalization** — English only for the MVP.
- **Backward compatibility** — Future auth changes should not require deleting existing users.

## 7. Acceptance Criteria

- **AC-1.** *Given* valid registration information, *when* I submit the registration form, *then* a new user is created and the password is stored as a hash.
- **AC-2.** *Given* an email already exists, *when* I try to register with it, *then* registration fails with a useful error.
- **AC-3.** *Given* valid login information, *when* I submit the login form, *then* I receive a valid authenticated session/JWT.
- **AC-4.** *Given* invalid login information, *when* I submit the login form, *then* the login fails without revealing whether the email or password was wrong.
- **AC-5.** *Given* I am logged in, *when* I request `/api/auth/me`, *then* I receive my account information without my password.
- **AC-6.** *Given* I am not logged in, *when* I try to use a protected build route, *then* the request is rejected.

## 8. Data Model

`User`:

- `id`
- `username`
- `email`
- `passwordHash`
- `createdAt`

Constraints:

- Email MUST be unique.
- Password hash MUST never be returned through the API.

## 9. API Surface

- `POST /api/auth/register` — public.
- `POST /api/auth/login` — public.
- `POST /api/auth/logout` — authenticated.
- `GET /api/auth/me` — authenticated.

Example registration request:

```json
{
  "username": "example",
  "email": "example@email.com",
  "password": "password"
}
```

The response should contain safe user information and authentication information, but never the password.

## 10. UI / UX

- Add registration page/form.
- Add login page/form.
- Add logout button when logged in.
- Show loading while submitting.
- Show a useful error when registration/login fails.
- On mobile, forms should fit the screen without horizontal scrolling.
- Inputs need visible labels and keyboard focus.
- Copy should be simple, such as “Email is already in use.”

## 11. AI / ML Considerations

Not part of this feature.

## 12. Integration Points

- SvelteKit authentication UI
- Express auth routes
- PostgreSQL `User` table
- Prisma
- bcrypt
- JWT

## 13. Dependencies & Sequencing

- Must ship after: F1.
- Must ship before: F5 and F8.
- Shared infrastructure needed: Database and Prisma.

## 14. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Passwords are stored incorrectly | L | H | Use bcrypt and test that plain passwords are never stored. |
| User accesses another user's build | M | H | Check the authenticated user ID on every protected build request. |
| JWT handling is confusing | M | M | Keep token creation and verification in one auth module. |

## 15. Rollout Plan

- Feature flag: None needed.
- Run the user migration first.
- Test registration and login locally.
- Rollback: revert the development migration if needed.

## 16. Test Plan

- **Unit** — Test password hashing and JWT verification.
- **Integration** — Test registration, login, logout, and `/me`.
- **End-to-end** — Register, log in, and log out through the UI.
- **Security** — Try accessing a protected route without a token and with another user's ID.
- **Accessibility** — Test form labels, focus, and errors.
- **Performance / load** — Test a small number of repeated login requests.
- **Manual exploratory** — Try invalid emails, wrong passwords, duplicate accounts, and empty fields.

## 17. Documentation & Training

- Document required auth environment variables.
- Add basic authentication setup instructions to the project README.

## 18. Open Questions

1. Should the JWT be stored in a secure cookie or another client-side method?
2. Should email validation be strict or just check for a reasonable email format?

## 19. References

- `MVP-feature-inventory.md`
- `F1-project-infrastructure.md`
- JWT documentation
- bcrypt documentation
