# VexRig MVP Plan

This folder contains the implementation plans for the VexRig MVP. I split the project into smaller features so I can actually finish them one at a time instead of trying to build the whole PC builder at once.

## Recommended order

1. **F1 — Project & Database Setup**
2. **F2 — User Registration & Authentication**
3. **F3 — PC Parts Catalog**
4. **F4 — Parts Search & Filtering**
5. **F5 — Create & Edit PC Build**
6. **F6 — Build Price Calculation**
7. **F7 — Build Compatibility Checking**
8. **F8 — Save & Delete Builds**

F2 and F3 could technically be worked on at the same time after F1. I put authentication first in my planned order because the build features will need to know which user owns a build.

## Dependency map

```text
F1
├── F2 ──────────────┐
│                    │
└── F3 → F4          │
       │             │
       └───────→ F5 ─┼→ F6 → F7 → F8
                     │
                     └────────────────→ F8
```

More specifically:

- F1 → F2
- F1 → F3
- F3 → F4
- F2 + F3 → F5
- F5 → F6
- F5 + F6 → F7
- F2 + F5 + F6 + F7 → F8

## First feature

The first feature should be **F1** because everything else depends on the project and database setup. There is not much point trying to build authentication or the PC builder UI if the frontend, backend, database, and Prisma connection are not working first.

## Biggest risks

The biggest risk is probably the compatibility checker. PC parts have a lot of different specifications, and it would be easy to keep adding rules until the feature becomes way too large. I am keeping the MVP focused on the most important checks and leaving more advanced compatibility checking for later.

Another risk is getting the build/database relationship right. A build can contain several different parts, so I want to keep that relationship simple and make sure it works before adding price and compatibility logic.

## Scope I am intentionally leaving out

The original project idea included some extra features that would be cool, but I do not think they need to be part of the MVP:

- Sharing builds through a link
- Budget-based build recommendations
- A separate wattage calculator
- Favorite/bookmark parts
- 3D visualization
- FPS estimates
- Reviews
- Live price tracking

These can be added later if the core PC builder is finished.

## Plan files

- [F1 — Project & Database Setup](./F1-project-infrastructure.md)
- [F2 — User Registration & Authentication](./F2-authentication.md)
- [F3 — PC Parts Catalog](./F3-parts-catalog.md)
- [F4 — Parts Search & Filtering](./F4-parts-search-filter.md)
- [F5 — Create & Edit PC Build](./F5-create-edit-build.md)
- [F6 — Build Price Calculation](./F6-build-price.md)
- [F7 — Build Compatibility Checking](./F7-compatibility.md)
- [F8 — Save & Delete Builds](./F8-save-delete-build.md)
