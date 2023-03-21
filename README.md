# Oppgave 1: Styling

> **Tags**: [Styling](https://remix.run/docs/en/1.14.3/guides/styling#regular-stylesheets)

Når du er her så forventer vi at du har klar å start opp applikasjonen ✨🍾

I nettleser, gå til `http://localhost:3000/profile`.
Akkurat nå ser applikasjonen broken ut fordi det mangler styling. Først, la oss se på `root.tsx` under `/app/routes`. Denne filen er root til applikasjonen vår.

## Oppgave 1.1: Legg til styling

Legg til en link funksjon for å hente inn styling:

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

Ta en refresh, ser det bedre ut nå?

Ja? Fortsett videre på **oppgave2** branchen.
