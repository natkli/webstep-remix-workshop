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
- Illustrations [uinDraw](https://undraw.co/)
- Avatars [Boringavatars](https://boringavatars.com/)

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

This starts your app in development mode, rebuilding assets on file changes.

The database seed script creates a new user with some data you can use to get started:

- Email: `rachel@remix.run`
- Password: `racheliscool`

## Database error

If you get this error in console: `Failed to update database because the database is read only`

- Restart dev server:

  ```
  npm run dev
  ```

- Or run full database reset:
  ```
  npm run setup
  ```
