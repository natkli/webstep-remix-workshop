# Remix Lofi Stack
![The Remix Lofi Stack](/lofi-stack.png?raw=true)
Inspired by Remix Indie Stack, learn more about [Remix Stacks](https://remix.run/stacks).


## What's in the stack

- Production-ready [SQLite Database](https://sqlite.org)
- Email/Password Authentication with [cookie-based sessions](https://remix.run/docs/en/v1/api/remix#createcookiesessionstorage)
- Database ORM with [Prisma](https://prisma.io)
- Styling with [Tailwind](https://tailwindcss.com/) and [daisyUI](https://daisyui.com/)
- Code formatting with [Prettier](https://prettier.io)
- Local third party request mocking with MSW
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)

## Development

- Getting started:
  ```sh
  npm install
  npx remix init
  ```

- Initial setup:

  ```sh
  npm run setup
  ```

- Start dev server:

  ```sh
  npm run dev
  ```

This starts your app in development mode, rebuilding assets on file changes.

The database seed script creates a new user with some data you can use to get started:

- Email: `rachel@remix.run`
- Password: `racheliscool`
