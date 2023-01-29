# Remix Indie Stack (Lite)
![The Remix Indie Stack (Lite)](/indie-stack-lite.png?raw=true)
Learn more about [Remix Stacks](https://remix.run/stacks).


## What's in the stack

- Production-ready [SQLite Database](https://sqlite.org)
- Email/Password Authentication with [cookie-based sessions](https://remix.run/docs/en/v1/api/remix#createcookiesessionstorage)
- Database ORM with [Prisma](https://prisma.io)
- Styling with [Tailwind](https://tailwindcss.com/)
- Local third party request mocking with [MSW](https://mswjs.io)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)

## Development

- Getting started:

  ```sh
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
