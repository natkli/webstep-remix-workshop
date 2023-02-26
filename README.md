# Remix Lofi Stack

![The Remix Lofi Stack](/lofi-stack.png?raw=true)
Inspired by Remix Indie Stack, learn more about [Remix Stacks](https://remix.run/stacks).

## What's in the stack

- Production-ready [SQLite Database](https://sqlite.org)
- Email/Password Authentication with [cookie-based sessions](https://remix.run/docs/en/v1/api/remix#createcookiesessionstorage)
- Database ORM with [Prisma](https://prisma.io)
- Styling with [Tailwind](https://tailwindcss.com/) and [daisyUI](https://daisyui.com/)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)

## Development

- Getting started:

  ```
  npm install
  ```

- Initial setup:

  ```
  npm run setup
  ```

- Start dev server:

  ```
  npm run dev
  ```

## Test user

- Email: `rachel@remix.run`
- Password: `racheliscool`

## Known issue

- Read only database error. Error message in browser's console
  ```
  Failed to update database because the database is read only
  ```
  Reset your database, run:
  ```
  npm run setup
  ```
