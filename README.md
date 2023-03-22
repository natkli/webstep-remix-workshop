# Webstep remix kurs 💿
Velkommen til interaktiv fagkveld/kurs med tema [Remix.run](https://remix.run/)! 🎉

Hva er Remix? Remix er et fullstack rammeverk som hjelper deg levere "server side rendered" apps til sluttbrukerne dine, 
og lar deg skrive hele applikasjonen din i ett eneste språk. 
Eller som de så godt sier det selv: «Remix is a full stack web framework that lets you focus on the user interface and work back through web standards to deliver a fast, slick, and resilient user experience»

Hvis du leser dette skal du etter planen akkurat ha mottatt en rask introduksjon til Remix og server side rendering (SSR). 
Det vi nå skal gjøre er å bruke Remix til å bygge en super-duper-fresh [icing](https://en.wikipedia.org/wiki/Icing_(game))-app.

Sluttproduktet vil være er en enkel app som holder styr over hvem som har icet hvem, og på hvilket 
hvilket arrangement icingen tok sted. Applikasjonen skal vi naturligvis bygge ved hjelp av Remix og Typescript, 
og vil dekke alt fra database til sluttbruker (deployment holder vi utenfor scope i denne omgang).

Kurset består av et enkelt skjellett av en app som du finner her på `main`-branchen. Vi har valgt å kalle dette utgangspunktet for 
"The Remix Lofi Stack" – en enklere
utgave av [Remix indie Stack](https://github.com/remix-run/indie-stack).
Du kan starte første versjon av applikasjonen allerede nå ved å følge instruksjonene nede i seksjonen under (Oppgave 0: Sette opp "Remix Lofi Stack") 
(Naturligvis på engelsk, siden det er det alle kule tutorials går på).

## Hvordan gjennomføre kurset

Vi har delt kurset inn i forskjellige brancher. 
Du skal ikke gjøre noen endringer på disse, men skal gjøre endringer lokalt etterhvert som du følger oppgavene.
Oppgavene finner du i hver branchs respektive README (linker finner du under.) Du starter altså ved å lese `README.md` i branchen
heter `oppgave1`, gjør som du blir instruert der på din egen branch / lokalt, for så å lese README for `oppgave2`, osv.

Dersom du ikke kommer helt i mål har vi en branch som heter `final` som har koden til den ferdige applikasjonen.

### Oversikt over oppgaver
* [Oppgave 1](https://github.com/natkli/webstep-remix-workshop/tree/oppgave1#readme)
* [Oppgave 2](https://github.com/natkli/webstep-remix-workshop/tree/oppgave2#readme)
* [Oppgave 3](https://github.com/natkli/webstep-remix-workshop/tree/oppgave3#readme)
* [Oppgave 4](https://github.com/natkli/webstep-remix-workshop/tree/oppgave4#readme)
* [Oppgave 5](https://github.com/natkli/webstep-remix-workshop/tree/oppgave5#readme)
* [Oppgave 6](https://github.com/natkli/webstep-remix-workshop/tree/oppgave6#readme)

## Oppgave 0: Sette opp "Remix Lofi Stack"

![The Remix Lofi Stack](/lofi-stack.png?raw=true)
Inspired by Remix Indie Stack, learn more about [Remix Stacks](https://remix.run/stacks).

### What's in the stack

- Production-ready [SQLite Database](https://sqlite.org)
- Email/Password Authentication with [cookie-based sessions](https://remix.run/docs/en/v1/api/remix#createcookiesessionstorage)
- Database ORM with [Prisma](https://prisma.io)
- Styling with [Tailwind](https://tailwindcss.com/) and [daisyUI](https://daisyui.com/)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)
- Illustrations [unDraw](https://undraw.co/)
- Avatars [Boringavatars](https://boringavatars.com/)

### Development

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

Når du har fått applikasjonen til å kjøre på `http://localhost:3000` anbefaler vi at du tar deg litt tid til å klikke rundt, 
og ikke minst poke litt rundt i koden og for å gjøre deg kjent med det hele.

Når du føler klar kan du gyve løs på oppgavene. Du finner [oppgave 1 her.](https://github.com/natkli/webstep-remix-workshop/tree/oppgave1#readme)

#### Database error 🚨

If you get this error in console: `Failed to update database because the database is read only`

- Restart dev server:

  ```
  npm run dev
  ```

- Or run full database reset:
  ```
  npm run setup
  ```
