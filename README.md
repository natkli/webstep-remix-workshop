# Oppgave 1: Getting started – Styling

> **Tags**: [Styling](https://remix.run/docs/en/1.14.3/guides/styling#regular-stylesheets)

Hei 👋 Nå som du er her burde det være trygt å annta at du har klar å start opp applikasjonen ✨ Bra jobba! 🍾 
Vi skal nå starte med en enkel oppgave for å bli varme i trøya.

Sjekk ut applikasjonen på `http://localhost:3000` i nettleseren din.
Du legger kanskje merke til at akkurat nå ser applikasjonen ikke helt fin ut, og mangler styling litt styling? La oss fikse dette!
Først, ta en titt på filen `root.tsx` under `/app/routes`. Denne filen er det vi kaller "root" i Remix, altså landingsiden eller entry pointet til applikasjonen vår (`/`).
Om vi vil legge til global styling er det her vi må gjøre det.

## Oppgave 1.1: Legg til styling 

Gå til `root.tsx` og legg til følgende link-funksjon for å hente inn styling:

```ts
export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: indexStylesheetUrl },
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;700;900&display=swap",
    },
  ];
};
```

Gå deretter til browseren og refresh siden. Ser det bedre ut nå? Så bra 🖌

Fortsett videre til [Oppgave 2](https://github.com/natkli/webstep-remix-workshop/tree/oppgave2#readme).
