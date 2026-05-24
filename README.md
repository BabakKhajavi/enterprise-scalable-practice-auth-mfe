# Building Enterprise-Ready Micro Frontends with React and Module Federation

This repository is part of a practical micro frontend architecture built with React, TypeScript, Webpack 5 Module Federation, RTK Query, RxJS, Material UI, and Storybook.

## Repositories

- Shell App: https://github.com/BabakKhajavi/enterprise-scalable-practice-shell
- Auth Remote: https://github.com/BabakKhajavi/enterprise-scalable-practice-auth-mfe
- Dashboard Remote: https://github.com/BabakKhajavi/enterprise-scalable-practice-dashboard-mfe
- Data Remote: https://github.com/BabakKhajavi/enterprise-scalable-practice-data-mfe
- Design Remote: https://github.com/BabakKhajavi/enterprise-scalable-practice-design-mfe

## Architecture

The project is split into a thin shell app and multiple remotes.

- Shell App: composition, routing, layout, app bootstrap, remote loading
- Auth Remote: authentication pages and auth-related flows
- Dashboard Remote: dashboard features and authenticated pages
- Data Remote: API clients, RTK Query hooks, shared data access, RxJS events/state
- Design Remote: reusable UI components, design system, shared UI patterns

## Running Locally

Start the remotes first, then start the shell.

Recommended order:

```bash
# Data remote
npm install
npm start

# Design remote
npm install
npm start

# Auth remote
npm install
npm start

# Dashboard remote
npm install
npm start

# Shell app
npm install
npm start
```

For the full experience, all remotes should be running.

The most important shared remotes are:

- Data Remote
- Design Remote

If Auth or Dashboard are not running, the shell should still handle the failure through error boundaries or fallback UI, depending on the route.

## Purpose

This is a practice project focused on frontend architecture and Module Federation.

It demonstrates:

- Micro frontend boundaries
- Runtime composition
- Shared data access
- Shared design system
- White-label branding
- Remote loading
- Independent frontend ownership

## Related Article Series

This project supports the article series:

Building Enterprise-Ready Micro Frontends with React and Module Federation

Published parts:

1. Decoupling Frontend Layers with Module Federation
2. Data Management Across Micro Frontends
3. Design System Architecture in Micro Frontends
4. White-Labeling and Branding in Micro Frontends
